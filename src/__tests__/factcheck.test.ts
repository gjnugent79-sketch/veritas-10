import { describe, expect, it } from 'vitest';
import {
  NO_RELIABLE_SOURCE_MESSAGE,
  aggregateFactStatus,
  factStatusLabel,
  withAggregatedStatus,
} from '@/lib/factcheck';
import type { SourceRef } from '@/lib/types';

const wire: SourceRef = {
  headline: 'Wire story',
  outlet: 'Reuters',
  url: 'https://reuters.com/x',
  publishedAt: '2026-09-01T00:00:00Z',
  lean: 'centre',
};

const wire2: SourceRef = {
  headline: 'AP story',
  outlet: 'Associated Press',
  url: 'https://apnews.com/x',
  publishedAt: '2026-09-01T01:00:00Z',
  lean: 'centre',
};

const single: SourceRef = {
  headline: 'Solo',
  outlet: 'The Guardian',
  url: 'https://theguardian.com/x',
  publishedAt: '2026-09-01T00:00:00Z',
  lean: 'left',
};

describe('aggregateFactStatus', () => {
  it('returns unclear with no sources', () => {
    expect(aggregateFactStatus([])).toBe('unclear');
  });

  it('returns confirmed with two wire sources', () => {
    expect(aggregateFactStatus([wire, wire2])).toBe('confirmed');
  });

  it('returns reported with a single source', () => {
    expect(aggregateFactStatus([single])).toBe('reported');
  });

  it('returns disputed when sources disagree', () => {
    expect(aggregateFactStatus([wire, wire2], 'They disagree')).toBe('disputed');
  });
});

describe('labels and helpers', () => {
  it('labels statuses', () => {
    expect(factStatusLabel('confirmed')).toBe('Confirmed');
    expect(factStatusLabel('reported')).toBe('Reported');
    expect(factStatusLabel('disputed')).toBe('Disputed');
    expect(factStatusLabel('unclear')).toBe('Unclear');
  });

  it('exposes no-reliable message', () => {
    expect(NO_RELIABLE_SOURCE_MESSAGE).toMatch(/No sufficiently reliable/);
  });

  it('withAggregatedStatus fills status', () => {
    const story = withAggregatedStatus({
      id: '1',
      entityIds: [],
      pillar: 'ai',
      headline: 'Test',
      whatHappened: ['x'],
      sources: [wire, wire2],
      gatheredAt: '2026-09-01T00:00:00Z',
    });
    expect(story.factStatus).toBe('confirmed');
  });
});
