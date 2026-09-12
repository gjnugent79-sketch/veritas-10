import { NextRequest, NextResponse } from 'next/server';
import { gatherFreeText } from '@/lib/gather';
import { NO_RELIABLE_SOURCE_MESSAGE } from '@/lib/factcheck';
import type { PoliticsLean } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  const politicsLean =
    (req.nextUrl.searchParams.get('lean') as PoliticsLean) || 'centre';

  if (!q.trim()) {
    return NextResponse.json({
      ok: true,
      stories: [],
      message: 'Enter a search query.',
    });
  }

  try {
    const result = await gatherFreeText({ query: q, politicsLean });
    return NextResponse.json({
      ok: true,
      stories: result.stories,
      usedFixtures: result.usedFixtures,
      cachedBriefing: result.usedFixtures,
      message:
        result.stories.length === 0 ? NO_RELIABLE_SOURCE_MESSAGE : undefined,
    });
  } catch (err) {
    console.error('gather error', err);
    return NextResponse.json({
      ok: false,
      stories: [],
      message: NO_RELIABLE_SOURCE_MESSAGE,
    });
  }
}
