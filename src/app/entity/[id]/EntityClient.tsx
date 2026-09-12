'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { BriefingFeed } from '@/components/BriefingFeed';
import { FactStrip } from '@/components/FactStrip';
import { FollowButton } from '@/components/FollowButton';
import { useProfile } from '@/components/ProfileProvider';
import { getEntity, getPillarMeta } from '@/lib/catalogue';
import { getCompanyProfile } from '@/lib/company-facts';

export default function EntityPage() {
  const params = useParams();
  const id = params.id as string;
  const entity = getEntity(id);
  const { profile } = useProfile();
  const company = getCompanyProfile(id);

  if (!entity) {
    return (
      <AppShell>
        <p className="text-muted">Subject not found.</p>
        <Link href="/explore" className="text-accent text-sm">
          Back to Explore
        </Link>
      </AppShell>
    );
  }

  const pillar = getPillarMeta(entity.pillar);

  return (
    <AppShell>
      <p className="text-sm text-muted">
        <span aria-hidden>{pillar?.emoji}</span>{' '}
        <span className="font-medium text-ink">{pillar?.label}</span>
        {profile.name ? (
          <span className="text-ink font-medium"> · Hi {profile.name} 👋</span>
        ) : null}
      </p>
      <Link
        href={`/explore/${entity.pillar}`}
        className="inline-flex items-center gap-1 text-sm text-muted mt-3 hover:text-ink focus-ring rounded"
      >
        <span aria-hidden>‹</span> All {entity.pillar}
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {entity.label}
          </h1>
          <p className="text-muted mt-1 text-sm">
            {entity.label} · {pillar?.label}
          </p>
        </div>
        <FollowButton entityId={entity.id} />
      </div>

      {company && (
        <div className="mt-10">
          <FactStrip profile={company} />
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Briefing</h2>
        <BriefingFeed
          entityId={entity.id}
          lean={profile.politicsLean}
          emptyHint={false}
        />
      </section>
    </AppShell>
  );
}
