import type { FeedItem, OutletLean, PoliticsLean, StoryBriefing } from './types';

/**
 * Politics lean filtering.
 * - Applies ONLY when pillar is politics.
 * - Left/Right: prefer matching lean + centre/wire.
 * - Both sides: keep left AND right (and centre if present).
 * - Never hide wire/centre sources.
 * - Non-politics items pass through untouched.
 */
export function outletAllowedForLean(
  outletLean: OutletLean | undefined,
  politicsLean: PoliticsLean,
): boolean {
  // Unknown outlets treated as centre/wire — never hidden
  if (!outletLean || outletLean === 'centre') return true;

  if (politicsLean === 'both') return true;
  if (politicsLean === 'centre') return false;
  if (politicsLean === 'left') return outletLean === 'left';
  if (politicsLean === 'right') return outletLean === 'right';
  return true;
}

export function filterFeedByLean(
  items: FeedItem[],
  politicsLean: PoliticsLean,
): FeedItem[] {
  return items.filter((item) => {
    if (item.pillar && item.pillar !== 'politics') return true;
    return outletAllowedForLean(item.lean, politicsLean);
  });
}

export function filterSourcesByLean(
  story: StoryBriefing,
  politicsLean: PoliticsLean,
): StoryBriefing {
  if (story.pillar !== 'politics') return story;

  const sources = story.sources.filter((s) =>
    outletAllowedForLean(s.lean, politicsLean),
  );

  let sourcesDisagree = story.sourcesDisagree;
  if (politicsLean === 'both') {
    const hasLeft = sources.some((s) => s.lean === 'left');
    const hasRight = sources.some((s) => s.lean === 'right');
    if (hasLeft && hasRight && !sourcesDisagree) {
      sourcesDisagree =
        'Outlets on the left and right emphasise different angles on this story.';
    }
  }

  return { ...story, sources, sourcesDisagree };
}

export function labelSourceLean(lean?: OutletLean): string | undefined {
  if (!lean) return undefined;
  if (lean === 'centre') return 'Centre / wire';
  if (lean === 'left') return 'Left';
  if (lean === 'right') return 'Right';
  return undefined;
}
