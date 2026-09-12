import { NextRequest, NextResponse } from 'next/server';
import { gatherForEntity, gatherForFollows } from '@/lib/gather';
import type { Pillar, PoliticsLean } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const follows = (sp.get('follows') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const entityId = sp.get('entity') || undefined;
  const pillar = (sp.get('pillar') as Pillar | null) || undefined;
  const politicsLean = (sp.get('lean') as PoliticsLean) || 'centre';

  try {
    const result = entityId
      ? await gatherForEntity({ entityId, politicsLean })
      : await gatherForFollows({ followIds: follows, politicsLean, pillar });

    return NextResponse.json({
      ok: true,
      stories: result.stories,
      usedFixtures: result.usedFixtures,
      cachedBriefing: result.usedFixtures,
    });
  } catch (err) {
    console.error('briefing error', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to gather briefing', stories: [] },
      { status: 500 },
    );
  }
}
