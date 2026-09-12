'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { StoryCard } from '@/components/StoryCard';
import { FollowButton } from '@/components/FollowButton';
import { useProfile } from '@/components/ProfileProvider';
import { PILLARS, searchCatalogue } from '@/lib/catalogue';
import { NO_RELIABLE_SOURCE_MESSAGE } from '@/lib/factcheck';
import { gatherFreeText } from '@/lib/gather';
import type { StoryBriefing } from '@/lib/types';

export default function SearchPage() {
  const { profile } = useProfile();
  const [q, setQ] = useState('');
  const [stories, setStories] = useState<StoryBriefing[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usedFixtures, setUsedFixtures] = useState(false);

  const catalogueHits = useMemo(() => searchCatalogue(q), [q]);

  async function runGather(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setMessage(null);
    setStories(null);
    try {
      const result = await gatherFreeText({
        query: q.trim(),
        politicsLean: profile.politicsLean,
      });
      setStories(result.stories || []);
      setUsedFixtures(!!result.usedFixtures);
      setMessage(
        result.stories.length === 0 ? NO_RELIABLE_SOURCE_MESSAGE : null,
      );
    } catch {
      setStories([]);
      setMessage(NO_RELIABLE_SOURCE_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <p className="text-sm text-muted">Search</p>
      <h1 className="text-3xl font-bold tracking-tight mt-1">Search</h1>
      <p className="text-muted mt-2 text-[15px]">
        Filter the catalogue or run a free-text Gather across public feeds.
      </p>

      <form onSubmit={runGather} className="mt-6 flex flex-col sm:flex-row gap-2">
        <label htmlFor="search-q" className="sr-only">
          Search
        </label>
        <input
          id="search-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. OpenAI, Premier League, inflation…"
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm focus-ring"
        />
        <button
          type="submit"
          disabled={loading || !q.trim()}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-40 focus-ring"
        >
          {loading ? 'Gathering…' : 'Gather'}
        </button>
      </form>

      {q.trim() && catalogueHits.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Catalogue
          </h2>
          <ul className="space-y-2">
            {catalogueHits.slice(0, 12).map((e) => {
              const pillar = PILLARS.find((p) => p.id === e.pillar);
              return (
                <li
                  key={e.id}
                  className="card flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div>
                    <Link
                      href={`/entity/${e.id}`}
                      className="font-medium hover:text-accent focus-ring rounded"
                    >
                      {e.label}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {pillar?.emoji} {pillar?.label} · {e.group}
                    </p>
                  </div>
                  <FollowButton entityId={e.id} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {stories !== null && (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold">Gather results</h2>
          {usedFixtures && (
            <p className="text-xs text-muted">
              Including cached briefings where live feeds were quiet.
            </p>
          )}
          {message && !stories.length && (
            <div className="card p-6 text-sm text-muted">{message}</div>
          )}
          {stories.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </section>
      )}
    </AppShell>
  );
}
