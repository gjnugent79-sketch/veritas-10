import type { CompanyProfile } from '@/lib/types';

export function FactStrip({ profile }: { profile: CompanyProfile }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-ink">Company profile</h2>
        <p className="text-sm text-muted mt-1">
          Checked by hand against company filings and public records — every line links to its source.
        </p>
      </div>
      <div className="card p-5 sm:p-6 space-y-5">
        <div>
          <p className="font-semibold text-ink">{profile.name}</p>
          <p className="text-sm text-muted mt-0.5">{profile.descriptor}</p>
        </div>
        {profile.facts.map((fact) => (
          <div key={fact.label} className="border-t border-border pt-4 first:border-0 first:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
              {fact.label}
            </p>
            <p className="text-[15px] leading-relaxed text-ink/90">{fact.text}</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {fact.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent underline underline-offset-2 hover:text-accent-dark focus-ring rounded"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
