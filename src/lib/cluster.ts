import type { FeedItem, StoryBriefing } from './types';
import { aggregateFactStatus } from './factcheck';
import { resolveOutletLean } from './outlets';

function tokenize(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  a.forEach((x) => { if (b.has(x)) inter++; });
  return inter / (a.size + b.size - inter);
}

/**
 * Cluster related feed items and produce short original extractive briefings.
 * Summaries are extractive (rephrased bullets from titles/snippets) — never full article text.
 */
export function clusterToBriefings(items: FeedItem[]): StoryBriefing[] {
  if (!items.length) return [];

  const sorted = [...items].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );

  const clusters: FeedItem[][] = [];
  const used = new Set<string>();

  for (const item of sorted) {
    if (used.has(item.id)) continue;
    const tokens = tokenize(item.title);
    const cluster = [item];
    used.add(item.id);

    for (const other of sorted) {
      if (used.has(other.id)) continue;
      const score = jaccard(tokens, tokenize(other.title));
      const sameEntity =
        item.entityIds.some((id) => other.entityIds.includes(id)) &&
        score > 0.15;
      if (score >= 0.35 || sameEntity) {
        cluster.push(other);
        used.add(other.id);
      }
    }
    clusters.push(cluster);
  }

  return clusters.slice(0, 40).map((cluster) => briefingFromCluster(cluster));
}

function briefingFromCluster(cluster: FeedItem[]): StoryBriefing {
  const primary = cluster[0];
  const entityIds = Array.from(new Set(cluster.flatMap((c) => c.entityIds)));
  const pillar = primary.pillar ?? 'ai';

  // Original short headline: lightly rewrite from primary title (extractive, not copy of full article)
  const headline = craftHeadline(primary.title);

  const whatHappened = craftBullets(cluster);

  const sources = cluster.slice(0, 6).map((c) => ({
    headline: c.title,
    outlet: c.outlet,
    url: c.link,
    publishedAt: c.publishedAt,
    lean: c.lean ?? resolveOutletLean(c.outlet),
  }));

  const leans = new Set(sources.map((s) => s.lean).filter(Boolean));
  let sourcesDisagree: string | undefined;
  if (leans.has('left') && leans.has('right')) {
    sourcesDisagree =
      'Outlets on the left and right emphasise different angles on this story.';
  }

  const factStatus = aggregateFactStatus(sources, sourcesDisagree);

  return {
    id: `live-${primary.id}`,
    entityIds,
    pillar,
    headline,
    whatHappened,
    factStatus,
    sourcesDisagree,
    sources,
    isFixture: false,
    gatheredAt: new Date().toISOString(),
  };
}

function craftHeadline(title: string): string {
  // Keep short; strip trailing site names; ensure it reads as an original brief line
  let h = title.replace(/\s+[|–—-]\s+.*$/, '').trim();
  if (h.length > 110) h = h.slice(0, 107) + '…';
  return h;
}

function craftBullets(cluster: FeedItem[]): string[] {
  const bullets: string[] = [];
  for (const item of cluster.slice(0, 3)) {
    const snip = item.summary || item.title;
    const sentence = snip.split(/(?<=[.!?])\s+/)[0] || snip;
    let bullet = sentence.trim();
    if (bullet.length > 180) bullet = bullet.slice(0, 177) + '…';
    if (bullet && !bullets.includes(bullet)) bullets.push(bullet);
  }
  if (!bullets.length) {
    bullets.push(cluster[0].title);
  }
  return bullets.slice(0, 3);
}
