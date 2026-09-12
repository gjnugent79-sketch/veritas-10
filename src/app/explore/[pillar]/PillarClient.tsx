'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { BriefingFeed } from '@/components/BriefingFeed';
import { FollowButton } from '@/components/FollowButton';
import { useProfile } from '@/components/ProfileProvider';
import {
  getEntitiesByPillar,
  getPillarMeta,
  groupEntities,
} from '@/lib/catalogue';
import type { Pillar } from '@/lib/types';

export default function PillarPage() {
  const params = useParams();
  const pillar = params.pillar as Pillar;
  const meta = getPillarMeta(pillar);
  const { profile } = useProfile();
  const [q, setQ] = useState('');

  const entities = useMemo(() => getEntitiesByPillar(pillar), [pillar]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return entities;
    return entities.filter(
      (e) =>
        e.label.toLowerCase().includes(needle) ||
        e.group.toLowerCase().includes(needle),
    );
  }, [entities, q]);
  const grouped = groupEntities(filtered);

  if (!meta) {
    return (
      <AppShell>
        <p className="text-muted">Unknown pillar.</p>
        <Link href="/explore" className="text-accent text-sm">
          Back to Explore
        </Link>
      </AppShell>
    );
  }

  const followedInPillar = profile.follows.filter((id) =>
    entities.some((e) => e.id === id),
  );

  return (
    <AppShell>
      <p className="text-sm text-muted">
        <span aria-hidden>{meta.emoji}</span> {meta.label}
        {profile.name ? (
          <span className="text-ink font-medium"> · Hi {profile.name} 👋</span>
        ) : null}
      </p>
      <Link
        href="/explore"
        className="inline-flex items-center gap-1 text-sm text-muted mt-3 hover:text-ink focus-ring rounded"
      >
        <span aria-hidden>‹</span> All pillars
      </Link>
      <h1 className="text-3xl font-bold tracking-tight mt-2">{meta.label}</h1>
      <p className="text-muted mt-2 text-[15px]">{meta.description}</p>

      <div className="mt-6">
        <label htmlFor="pillar-search" className="sr-only">
          Search {meta.label}
        </label>
        <input
          id="pillar-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${meta.label.toLowerCase()}…`}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus-ring"
        />
      </div>

      <div className="mt-8 space-y-6">
        {Object.entries(grouped).map(([group, list]) => (
          <section key={group}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              {group}
            </h2>
            <ul className="space-y-2">
              {list.map((e) => (
                <li
                  key={e.id}
                  className="card flex items-center justify-between gap-3 px-4 py-3"
                >
                  <Link
                    href={`/entity/${e.id}`}
                    className="font-medium text-ink hover:text-accent focus-ring rounded"
                  >
                    {e.label}
                  </Link>
                  <FollowButton entityId={e.id} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        {!filtered.length && (
          <p className="text-sm text-muted">No subjects match that search.</p>
        )}
      </div>

      {followedInPillar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Latest briefing</h2>
          <BriefingFeed
            follows={followedInPillar}
            lean={profile.politicsLean}
            pillar={pillar}
            emptyHint={false}
          />
        </section>
      )}
    </AppShell>
  );
}
