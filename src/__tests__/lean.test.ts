import { describe, expect, it } from 'vitest';
import {
  filterFeedByLean,
  filterSourcesByLean,
  outletAllowedForLean,
} from '@/lib/lean';
import type { FeedItem, StoryBriefing } from '@/lib/types';

describe('outletAllowedForLean', () => {
  it('never hides centre/wire', () => {
    expect(outletAllowedForLean('centre', 'left')).toBe(true);
    expect(outletAllowedForLean('centre', 'right')).toBe(true);
    expect(outletAllowedForLean('centre', 'centre')).toBe(true);
    expect(outletAllowedForLean('centre', 'both')).toBe(true);
    expect(outletAllowedForLean(undefined, 'left')).toBe(true);
  });

  it('left lean prefers left + centre', () => {
    expect(outletAllowedForLean('left', 'left')).toBe(true);
    expect(outletAllowedForLean('right', 'left')).toBe(false);
  });

  it('right lean prefers right + centre', () => {
    expect(outletAllowedForLean('right', 'right')).toBe(true);
    expect(outletAllowedForLean('left', 'right')).toBe(false);
  });

  it('both sides keeps left and right', () => {
    expect(outletAllowedForLean('left', 'both')).toBe(true);
    expect(outletAllowedForLean('right', 'both')).toBe(true);
  });

  it('centre lean keeps only centre', () => {
    expect(outletAllowedForLean('left', 'centre')).toBe(false);
    expect(outletAllowedForLean('right', 'centre')).toBe(false);
    expect(outletAllowedForLean('centre', 'centre')).toBe(true);
  });
});

describe('filterFeedByLean', () => {
  const items: FeedItem[] = [
    {
      id: '1',
      title: 'UK Budget',
      link: '#',
      publishedAt: '2026-09-01T00:00:00Z',
      outlet: 'Guardian',
      summary: '',
      lean: 'left',
      entityIds: ['uk-politics'],
      pillar: 'politics',
    },
    {
      id: '2',
      title: 'Arsenal win',
      link: '#',
      publishedAt: '2026-09-01T00:00:00Z',
      outlet: 'Guardian',
      summary: '',
      lean: 'left',
      entityIds: ['arsenal'],
      pillar: 'football',
    },
  ];

  it('does not lean-filter non-politics', () => {
    const filtered = filterFeedByLean(items, 'right');
    expect(filtered.find((i) => i.id === '2')).toBeTruthy();
    expect(filtered.find((i) => i.id === '1')).toBeFalsy();
  });
});

describe('filterSourcesByLean', () => {
  const story: StoryBriefing = {
    id: 's1',
    entityIds: ['uk-politics'],
    pillar: 'politics',
    headline: 'Budget',
    whatHappened: ['Ministers spoke'],
    factStatus: 'reported',
    sources: [
      {
        headline: 'A',
        outlet: 'The Guardian',
        url: '#',
        publishedAt: '2026-09-01T00:00:00Z',
        lean: 'left',
      },
      {
        headline: 'B',
        outlet: 'The Telegraph',
        url: '#',
        publishedAt: '2026-09-01T00:00:00Z',
        lean: 'right',
      },
      {
        headline: 'C',
        outlet: 'Reuters',
        url: '#',
        publishedAt: '2026-09-01T00:00:00Z',
        lean: 'centre',
      },
    ],
    gatheredAt: '2026-09-01T00:00:00Z',
  };

  it('both sides keeps left and right and labels disagreement', () => {
    const out = filterSourcesByLean(story, 'both');
    expect(out.sources).toHaveLength(3);
    expect(out.sourcesDisagree).toBeTruthy();
  });

  it('left lean drops right but keeps centre', () => {
    const out = filterSourcesByLean(story, 'left');
    expect(out.sources.map((s) => s.lean).sort()).toEqual(['centre', 'left']);
  });

  it('does not filter AI stories', () => {
    const ai: StoryBriefing = {
      ...story,
      pillar: 'ai',
      entityIds: ['openai'],
    };
    const out = filterSourcesByLean(ai, 'left');
    expect(out.sources).toHaveLength(3);
  });
});
