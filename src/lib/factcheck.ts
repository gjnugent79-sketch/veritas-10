import type { FactStatus, SourceRef, StoryBriefing } from './types';

const RELIABLE_WIRE = new Set([
  'reuters',
  'associated press',
  'ap',
  'ap news',
  'bbc',
  'bbc news',
  'financial times',
  'ft',
  'bloomberg',
]);

function isWire(outlet: string): boolean {
  const n = outlet.toLowerCase();
  return Array.from(RELIABLE_WIRE).some((w) => n.includes(w));
}

/**
 * Aggregate fact-check status from sources.
 * Confirmed: 2+ independent wire/centre sources, no clear conflict.
 * Reported: at least one source, no conflict.
 * Disputed: sources disagree on core facts.
 * Unclear: no sufficiently reliable sources.
 */
export function aggregateFactStatus(
  sources: SourceRef[],
  sourcesDisagree?: string,
): FactStatus {
  if (!sources.length) return 'unclear';

  if (sourcesDisagree) return 'disputed';

  const wireCount = sources.filter((s) => isWire(s.outlet)).length;
  if (wireCount >= 2) return 'confirmed';
  if (sources.length >= 1) return 'reported';
  return 'unclear';
}

export const NO_RELIABLE_SOURCE_MESSAGE =
  'No sufficiently reliable source was found to confirm this information.';

export function factStatusLabel(status: FactStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Confirmed';
    case 'reported':
      return 'Reported';
    case 'disputed':
      return 'Disputed';
    case 'unclear':
      return 'Unclear';
  }
}

export function withAggregatedStatus(
  story: Omit<StoryBriefing, 'factStatus'> & { factStatus?: FactStatus },
): StoryBriefing {
  const factStatus =
    story.factStatus ??
    aggregateFactStatus(story.sources, story.sourcesDisagree);
  return { ...story, factStatus };
}
