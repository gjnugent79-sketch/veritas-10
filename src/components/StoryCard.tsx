'use client';

import { useState } from 'react';
import type { StoryBriefing } from '@/lib/types';
import { factStatusLabel } from '@/lib/factcheck';
import { labelSourceLean } from '@/lib/lean';

function relativeTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return '';
  const diff = Date.now() - t;
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

const statusStyles: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  reported: 'bg-sky-50 text-sky-800 border-sky-200',
  disputed: 'bg-amber-50 text-amber-900 border-amber-200',
  unclear: 'bg-slate-50 text-slate-700 border-slate-200',
};

export function StoryCard({ story }: { story: StoryBriefing }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[story.factStatus]}`}
        >
          {factStatusLabel(story.factStatus)}
        </span>
        {story.isFixture && (
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-800">
            Cached briefing
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-ink leading-snug">
        {story.headline}
      </h3>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          What happened
        </p>
        <ul className="space-y-2">
          {story.whatHappened.map((b, i) => (
            <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-ink/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {story.sourcesDisagree && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium mb-0.5">Sources disagree</p>
          <p className="text-amber-900/90">{story.sourcesDisagree}</p>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-accent hover:text-accent-dark focus-ring rounded-md"
          aria-expanded={open}
        >
          {open ? 'Hide sources' : `Sources (${story.sources.length})`}
        </button>
        {open && (
          <ul className="mt-3 space-y-2 border-t border-border pt-3">
            {story.sources.map((s, i) => (
              <li key={i} className="text-sm">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline-offset-2 hover:underline focus-ring rounded"
                >
                  {s.headline}
                </a>
                <p className="text-muted mt-0.5">
                  {s.outlet}
                  {s.lean && story.pillar === 'politics' ? (
                    <span className="text-muted"> · {labelSourceLean(s.lean)}</span>
                  ) : null}
                  {s.publishedAt ? (
                    <span> · {relativeTime(s.publishedAt)}</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
