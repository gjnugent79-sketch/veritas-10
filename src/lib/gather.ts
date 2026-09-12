import { CATALOGUE, getEntity } from './catalogue';
import { clusterToBriefings } from './cluster';
import {
  FIXTURE_BRIEFINGS,
  fixturesForEntities,
  fixturesForQuery,
} from './fixtures';
import {
  RSS_FEEDS,
  matchItemsToEntities,
  matchItemsToQuery,
  normaliseRssXml,
} from './feed';
import { filterSourcesByLean } from './lean';
import type { Pillar, PoliticsLean, StoryBriefing } from './types';

const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  at: number;
  items: Awaited<ReturnType<typeof fetchAllFeeds>>;
}

let feedCache: CacheEntry | null = null;

async function fetchFeed(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Veritas10Bot/1.0 (+https://github.com/gjnugent79-sketch/veritas-10)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchAllFeeds() {
  const results = await Promise.all(
    RSS_FEEDS.map(async (feed) => {
      const xml = await fetchFeed(feed.url);
      if (!xml) return [];
      return normaliseRssXml(xml, {
        outlet: feed.outlet,
        pillar: feed.pillar,
        entityIds: feed.entityIds,
      });
    }),
  );
  return results.flat();
}

async function getCachedFeeds() {
  if (feedCache && Date.now() - feedCache.at < CACHE_TTL_MS) {
    return feedCache.items;
  }
  const items = await fetchAllFeeds();
  feedCache = { at: Date.now(), items };
  return items;
}

function dedupeStories(stories: StoryBriefing[]): StoryBriefing[] {
  const seen = new Set<string>();
  return stories.filter((s) => {
    const key = s.headline.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function gatherForFollows(opts: {
  followIds: string[];
  politicsLean: PoliticsLean;
  pillar?: Pillar;
}): Promise<{ stories: StoryBriefing[]; usedFixtures: boolean }> {
  const { followIds, politicsLean, pillar } = opts;
  if (!followIds.length) {
    return { stories: [], usedFixtures: false };
  }

  const entities = followIds
    .map((id) => getEntity(id))
    .filter((e): e is NonNullable<typeof e> => !!e)
    .filter((e) => (pillar ? e.pillar === pillar : true));

  const liveItems = await getCachedFeeds();
  const relevant = matchItemsToEntities(
    liveItems,
    entities.map((e) => ({ id: e.id, query: e.query, pillar: e.pillar })),
  ).filter((item) => {
    if (pillar && item.pillar && item.pillar !== pillar) return false;
    // Keep items that match followed entities
    return item.entityIds.some((id) => followIds.includes(id));
  });

  let stories = clusterToBriefings(relevant);

  // Tag pillar from entities if missing
  stories = stories.map((s) => {
    if (s.pillar) return s;
    const ent = getEntity(s.entityIds[0]);
    return ent ? { ...s, pillar: ent.pillar } : s;
  });

  // Apply politics lean to politics stories only
  stories = stories.map((s) => filterSourcesByLean(s, politicsLean));

  // Drop politics stories that lost all sources after lean filter
  stories = stories.filter(
    (s) => s.pillar !== 'politics' || s.sources.length > 0,
  );

  let usedFixtures = false;
  if (stories.length < 2) {
    usedFixtures = true;
    const fx = fixturesForEntities(followIds)
      .filter((s) => (pillar ? s.pillar === pillar : true))
      .map((s) => filterSourcesByLean(s, politicsLean))
      .filter((s) => s.pillar !== 'politics' || s.sources.length > 0);
    stories = dedupeStories([...stories, ...fx]);
  }

  stories.sort(
    (a, b) => Date.parse(b.gatheredAt) - Date.parse(a.gatheredAt),
  );

  return { stories: stories.slice(0, 30), usedFixtures };
}

export async function gatherFreeText(opts: {
  query: string;
  politicsLean: PoliticsLean;
}): Promise<{ stories: StoryBriefing[]; usedFixtures: boolean }> {
  const q = opts.query.trim();
  if (!q) return { stories: [], usedFixtures: false };

  const liveItems = await getCachedFeeds();
  const matched = matchItemsToQuery(liveItems, q);

  // Also try matching catalogue entities by query
  const entityHits = CATALOGUE.filter(
    (e) =>
      e.label.toLowerCase().includes(q.toLowerCase()) ||
      e.query.toLowerCase().includes(q.toLowerCase()),
  );

  const fromEntities = matchItemsToEntities(
    liveItems,
    entityHits.map((e) => ({ id: e.id, query: e.query, pillar: e.pillar })),
  );

  const merged = [
    ...matched,
    ...fromEntities.filter((i) => !matched.some((m) => m.id === i.id)),
  ];

  let stories = clusterToBriefings(merged).map((s) =>
    filterSourcesByLean(s, opts.politicsLean),
  );

  let usedFixtures = false;
  if (stories.length < 1) {
    usedFixtures = true;
    const fx = [
      ...fixturesForQuery(q),
      ...fixturesForEntities(entityHits.map((e) => e.id)),
    ]
      .map((s) => filterSourcesByLean(s, opts.politicsLean))
      .filter((s) => s.sources.length > 0);
    stories = dedupeStories(fx);
  }

  // If still empty, return a clear empty signal (UI shows NO_RELIABLE message)
  return { stories: stories.slice(0, 20), usedFixtures };
}

export async function gatherForEntity(opts: {
  entityId: string;
  politicsLean: PoliticsLean;
}): Promise<{ stories: StoryBriefing[]; usedFixtures: boolean }> {
  return gatherForFollows({
    followIds: [opts.entityId],
    politicsLean: opts.politicsLean,
  });
}

/** Expose fixtures for tests / offline demos */
export function allFixtures(): StoryBriefing[] {
  return FIXTURE_BRIEFINGS;
}
