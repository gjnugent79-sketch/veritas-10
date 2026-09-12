'use client';

import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { useProfile } from '@/components/ProfileProvider';
import { PILLARS } from '@/lib/catalogue';

export default function ExplorePage() {
  const { profile } = useProfile();

  return (
    <AppShell>
      <p className="text-sm text-muted">
        Explore
        {profile.name ? (
          <span className="text-ink font-medium"> · Hi {profile.name} 👋</span>
        ) : null}
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Explore</h1>
      <p className="text-muted mt-3 text-[15px] max-w-xl">
        Pick a pillar, then follow the leagues, countries, brands, markets and
        companies you care about.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <Link
            key={p.id}
            href={`/explore/${p.id}`}
            className="card p-5 sm:p-6 hover:border-accent/40 transition focus-ring block"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-2xl mb-4">
              <span aria-hidden>{p.emoji}</span>
            </div>
            <h2 className="text-lg font-semibold text-ink">{p.label}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">{p.description}</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
