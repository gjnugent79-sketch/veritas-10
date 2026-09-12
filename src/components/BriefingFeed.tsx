'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Pillar, PoliticsLean, StoryBriefing } from '@/lib/types';
import { gatherForEntity, gatherForFollows } from '@/lib/gather';
import { StoryCard } from './StoryCard';
import { NO_RELIABLE_SOURCE_MESSAGE } from '@/lib/factcheck';
import Link from 'next/link';

export function BriefingFeed({
  follows,
  lean,
  pillar,
  entityId,
  emptyHint = true,
}: {
  follows?: string[];
  lean: PoliticsLean;
  pillar?: Pillar;
  entityId?: string;
  emptyHint?: boolean;
}) {
  const [stories, setStories] = useState<StoryBriefing[] | null>(null);
  const [usedFixtures, setUsedFixtures] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const followsKey = useMemo(() => (follows ?? []).join(','), [follows]);

  useEffect(() => {
    let cancelled = false;
    setStories(null);
    setError(null);

    const followIds = followsKey ? followsKey.split(',') : [];

    if (!entityId && followIds.length === 0) {
      setStories([]);
      return;
    }

    const run = entityId
      ? gatherForEntity({ entityId, politicsLean: lean })
      : gatherForFollows({ followIds, politicsLean: lean, pillar });

    run
      .then((result) => {
        if (cancelled) return;
        setStories(result.stories || []);
        setUsedFixtures(!!result.usedFixtures);
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not gather the briefing.');
          setStories([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [followsKey, lean, pillar, entityId]);

  if (stories === null) {
    return (
      <div className="card p-6 text-sm text-muted animate-pulse">
        Gathering your briefing…
      </div>
    );
  }

  if (error) {
    return <div className="card p-6 text-sm text-muted">{error}</div>;
  }

  if (!follows?.length && !entityId) {
    return emptyHint ? (
      <div className="card p-6 space-y-3">
        <p className="text-ink font-medium">Your briefing is empty</p>
        <p className="text-sm text-muted">
          Follow a few subjects on Explore to build a personalised feed.
        </p>
        <Link
          href="/explore"
          className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark focus-ring"
        >
          Go to Explore
        </Link>
      </div>
    ) : null;
  }

  if (!stories.length) {
    return (
      <div className="card p-6 text-sm text-muted">
        {NO_RELIABLE_SOURCE_MESSAGE}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {usedFixtures && (
        <p className="text-xs text-muted">
          Some items are marked Cached briefing when live feeds are quiet or unreachable.
        </p>
      )}
      {stories.map((s) => (
        <StoryCard key={s.id} story={s} />
      ))}
    </div>
  );
}
