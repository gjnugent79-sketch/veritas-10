import { describe, expect, it } from 'vitest';
import {
  matchItemsToQuery,
  normaliseRssXml,
} from '@/lib/feed';
import { clusterToBriefings } from '@/lib/cluster';
import type { FeedItem } from '@/lib/types';

const sampleRss = `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>BBC News - Politics</title>
    <item>
      <title>UK Budget preview: ministers set out priorities</title>
      <link>https://www.bbc.co.uk/news/uk-politics-1</link>
      <pubDate>Mon, 08 Sep 2026 12:00:00 GMT</pubDate>
      <description>The Treasury will outline spending themes ahead of the Budget.</description>
    </item>
    <item>
      <title>Another story about football transfer</title>
      <link>https://www.bbc.co.uk/sport/2</link>
      <pubDate>Mon, 08 Sep 2026 10:00:00 GMT</pubDate>
      <description>A club eyes a midfielder.</description>
    </item>
  </channel>
</rss>`;

describe('normaliseRssXml', () => {
  it('parses RSS items and resolves BBC lean', () => {
    const items = normaliseRssXml(sampleRss, {
      outlet: 'BBC',
      pillar: 'politics',
      entityIds: ['uk-politics'],
    });
    expect(items.length).toBe(2);
    expect(items[0].title).toMatch(/UK Budget/);
    expect(items[0].outlet).toBeTruthy();
    expect(items[0].lean).toBe('centre');
    expect(items[0].publishedAt).toMatch(/^2026-09-08/);
  });

  it('returns empty on bad xml', () => {
    expect(normaliseRssXml('not xml at all')).toEqual([]);
  });
});

describe('matchItemsToQuery', () => {
  const items: FeedItem[] = [
    {
      id: 'a',
      title: 'OpenAI releases safety cards',
      link: '#',
      publishedAt: '2026-09-01T00:00:00Z',
      outlet: 'Reuters',
      summary: 'Model evaluations published',
      entityIds: ['openai'],
      pillar: 'ai',
    },
    {
      id: 'b',
      title: 'Premier League weekend round-up',
      link: '#',
      publishedAt: '2026-09-01T00:00:00Z',
      outlet: 'BBC Sport',
      summary: 'Goals and tables',
      entityIds: ['pl'],
      pillar: 'football',
    },
  ];

  it('filters by query terms', () => {
    const hit = matchItemsToQuery(items, 'OpenAI safety');
    expect(hit.map((i) => i.id)).toEqual(['a']);
  });
});

describe('clusterToBriefings', () => {
  it('builds briefings with sources and fact status', () => {
    const items: FeedItem[] = [
      {
        id: '1',
        title: 'NVIDIA demand remains firm for AI chips',
        link: 'https://example.com/1',
        publishedAt: '2026-09-09T11:00:00Z',
        outlet: 'Reuters',
        summary: 'Data-centre orders stay elevated into autumn.',
        lean: 'centre',
        entityIds: ['nvidia-fin'],
        pillar: 'finance',
      },
      {
        id: '2',
        title: 'NVIDIA AI chip backlog still elevated',
        link: 'https://example.com/2',
        publishedAt: '2026-09-09T12:00:00Z',
        outlet: 'Bloomberg',
        summary: 'Supply remains tight for high-end GPUs.',
        lean: 'centre',
        entityIds: ['nvidia-fin'],
        pillar: 'finance',
      },
    ];
    const stories = clusterToBriefings(items);
    expect(stories.length).toBeGreaterThanOrEqual(1);
    expect(stories[0].sources.length).toBeGreaterThanOrEqual(1);
    expect(stories[0].whatHappened.length).toBeGreaterThanOrEqual(1);
    expect(['confirmed', 'reported', 'disputed', 'unclear']).toContain(
      stories[0].factStatus,
    );
  });
});
