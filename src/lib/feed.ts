import { XMLParser } from 'fast-xml-parser';
import { resolveOutletLean } from './outlets';
import type { FeedItem, Pillar } from './types';
import { createHash } from 'crypto';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) =>
    ['item', 'entry', 'link', 'category', 'author'].includes(name),
});

function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function textOf(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object' && v !== null) {
    const o = v as Record<string, unknown>;
    if ('#text' in o) return textOf(o['#text']);
    if ('@_href' in o) return textOf(o['@_href']);
  }
  return '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashId(parts: string[]): string {
  return createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 16);
}

export function normaliseRssXml(
  xml: string,
  defaults: { outlet?: string; pillar?: Pillar; entityIds?: string[] } = {},
): FeedItem[] {
  let parsed: unknown;
  try {
    parsed = parser.parse(xml);
  } catch {
    return [];
  }

  const root = parsed as Record<string, unknown>;
  const channel =
    (root.rss as Record<string, unknown> | undefined)?.channel ??
    root.channel ??
    root.feed;

  if (!channel || typeof channel !== 'object') return [];

  const ch = channel as Record<string, unknown>;
  const channelTitle = textOf(ch.title) || defaults.outlet || 'Unknown';
  const items = asArray(ch.item ?? ch.entry);

  return items
    .map((raw) => {
      const item = raw as Record<string, unknown>;
      const title = stripHtml(textOf(item.title));
      if (!title) return null;

      let link = '';
      const links = asArray(item.link);
      if (links.length) {
        const first = links[0];
        link =
          typeof first === 'string'
            ? first
            : textOf((first as Record<string, unknown>)?.['@_href']) ||
              textOf(first);
      }
      if (!link) link = textOf(item.guid) || textOf(item.id);

      const publishedAt =
        textOf(item.pubDate) ||
        textOf(item.published) ||
        textOf(item.updated) ||
        new Date().toISOString();

      const summary = stripHtml(
        textOf(item.description) ||
          textOf(item.summary) ||
          textOf(item.content) ||
          textOf((item['content:encoded'] as string) || ''),
      ).slice(0, 400);

      const outlet =
        textOf(item.source) ||
        defaults.outlet ||
        channelTitle.split(' - ')[0].trim();

      const lean = resolveOutletLean(outlet);

      const id = hashId([title, link, publishedAt]);

      const feedItem: FeedItem = {
        id,
        title,
        link: link || `#${id}`,
        publishedAt: safeIso(publishedAt),
        outlet,
        summary,
        lean,
        entityIds: defaults.entityIds ?? [],
        pillar: defaults.pillar,
      };
      return feedItem;
    })
    .filter((x): x is FeedItem => x !== null);
}

function safeIso(d: string): string {
  const t = Date.parse(d);
  if (Number.isNaN(t)) return new Date().toISOString();
  return new Date(t).toISOString();
}

/** Public RSS feed catalogue keyed by entity id / pillar. */
export const RSS_FEEDS: {
  url: string;
  outlet: string;
  pillar: Pillar;
  entityIds: string[];
}[] = [
  // Football
  {
    url: 'https://feeds.bbci.co.uk/sport/football/rss.xml',
    outlet: 'BBC Sport',
    pillar: 'football',
    entityIds: ['pl', 'fa-cup', 'ucl', 'championship'],
  },
  {
    url: 'https://www.theguardian.com/football/rss',
    outlet: 'The Guardian',
    pillar: 'football',
    entityIds: ['pl', 'ucl'],
  },
  // Politics
  {
    url: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
    outlet: 'BBC',
    pillar: 'politics',
    entityIds: ['uk-politics'],
  },
  {
    url: 'https://www.theguardian.com/politics/rss',
    outlet: 'The Guardian',
    pillar: 'politics',
    entityIds: ['uk-politics'],
  },
  {
    url: 'https://feeds.reuters.com/Reuters/worldNews',
    outlet: 'Reuters',
    pillar: 'politics',
    entityIds: ['us-politics', 'eu-politics', 'china-politics'],
  },
  {
    url: 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml',
    outlet: 'BBC',
    pillar: 'politics',
    entityIds: ['us-politics'],
  },
  // Cars / tech-business adjacent
  {
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    outlet: 'BBC',
    pillar: 'finance',
    entityIds: ['ftse100', 'inflation', 'rates'],
  },
  {
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    outlet: 'BBC',
    pillar: 'ai',
    entityIds: ['openai', 'google-ai', 'ai-regulation'],
  },
  {
    url: 'https://www.theguardian.com/technology/rss',
    outlet: 'The Guardian',
    pillar: 'ai',
    entityIds: ['openai', 'google-ai', 'meta-ai'],
  },
];

export function matchItemsToQuery(items: FeedItem[], query: string): FeedItem[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (!terms.length) return items;
  return items.filter((item) => {
    const hay = `${item.title} ${item.summary}`.toLowerCase();
    return terms.some((t) => hay.includes(t));
  });
}

export function matchItemsToEntities(
  items: FeedItem[],
  entityQueries: { id: string; query: string; pillar: Pillar }[],
): FeedItem[] {
  return items
    .map((item) => {
      const hay = `${item.title} ${item.summary}`.toLowerCase();
      const matched = entityQueries.filter((e) => {
        const terms = e.query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
        return terms.some((t) => hay.includes(t));
      });
      if (!matched.length && item.entityIds.length) return item;
      if (!matched.length) return null;
      return {
        ...item,
        entityIds: Array.from(
          new Set([...item.entityIds, ...matched.map((m) => m.id)]),
        ),
        pillar: item.pillar ?? matched[0].pillar,
      };
    })
    .filter((x): x is FeedItem => x !== null);
}
