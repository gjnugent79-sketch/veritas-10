'use client';

import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { FollowButton } from '@/components/FollowButton';
import { useProfile } from '@/components/ProfileProvider';
import { getEntity, PILLARS } from '@/lib/catalogue';
import type { PoliticsLean } from '@/lib/types';

const LEANS: { id: PoliticsLean; label: string }[] = [
  { id: 'left', label: 'Left' },
  { id: 'centre', label: 'Centre' },
  { id: 'right', label: 'Right' },
  { id: 'both', label: 'Both sides' },
];

export default function FollowingPage() {
  const { profile, setLean } = useProfile();
  const followed = profile.follows
    .map((id) => getEntity(id))
    .filter((e): e is NonNullable<typeof e> => !!e);

  const byPillar = PILLARS.map((p) => ({
    pillar: p,
    entities: followed.filter((e) => e.pillar === p.id),
  })).filter((g) => g.entities.length > 0);

  return (
    <AppShell>
      <p className="text-sm text-muted">Following</p>
      <h1 className="text-3xl font-bold tracking-tight mt-1">Following</h1>
      <p className="text-muted mt-2 text-[15px]">
        Manage subjects and your politics source lean (politics only).
      </p>

      <section className="mt-8 card p-5 space-y-3">
        <h2 className="font-semibold">Politics source lean</h2>
        <p className="text-sm text-muted">
          Our editorial map — not AllSides or MBFC. Wire sources are never
          hidden.
        </p>
        <div className="flex flex-wrap gap-2">
          {LEANS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLean(l.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium focus-ring ${
                profile.politicsLean === l.id
                  ? 'bg-accent text-white'
                  : 'bg-surface-2 text-ink hover:bg-border'
              }`}
              aria-pressed={profile.politicsLean === l.id}
            >
              {l.label}
            </button>
          ))}
        </div>
      </section>

      {!followed.length ? (
        <div className="mt-8 card p-6 space-y-3">
          <p className="font-medium">You are not following anything yet</p>
          <Link
            href="/explore"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white focus-ring"
          >
            Explore subjects
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {byPillar.map(({ pillar, entities }) => (
            <section key={pillar.id}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                <span aria-hidden>{pillar.emoji}</span> {pillar.label}
              </h2>
              <ul className="space-y-2">
                {entities.map((e) => (
                  <li
                    key={e.id}
                    className="card flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <Link
                      href={`/entity/${e.id}`}
                      className="font-medium hover:text-accent focus-ring rounded"
                    >
                      {e.label}
                    </Link>
                    <FollowButton entityId={e.id} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </AppShell>
  );
}
