/**
 * Veritas editorial outlet lean map.
 * This is our own curated map — not scraped from AllSides, MBFC, or similar.
 * Wire/centre outlets are never hidden regardless of lean preference.
 */
import type { OutletLean } from './types';

export interface OutletInfo {
  name: string;
  lean: OutletLean;
  aliases?: string[];
}

export const OUTLET_LEAN_MAP: OutletInfo[] = [
  // Left
  { name: 'The Guardian', lean: 'left', aliases: ['Guardian'] },
  { name: 'The Independent', lean: 'left', aliases: ['Independent'] },
  { name: 'HuffPost', lean: 'left', aliases: ['Huffington Post'] },
  { name: 'MSNBC', lean: 'left' },
  // Centre / wire
  { name: 'Reuters', lean: 'centre' },
  { name: 'Associated Press', lean: 'centre', aliases: ['AP', 'AP News'] },
  { name: 'BBC', lean: 'centre', aliases: ['BBC News', 'BBC Sport'] },
  { name: 'Financial Times', lean: 'centre', aliases: ['FT'] },
  { name: 'Bloomberg', lean: 'centre' },
  { name: 'Al Jazeera English', lean: 'centre', aliases: ['Al Jazeera'] },
  // Right
  { name: 'The Telegraph', lean: 'right', aliases: ['Telegraph'] },
  { name: 'The Times', lean: 'right', aliases: ['Times'] },
  { name: 'The Spectator', lean: 'right', aliases: ['Spectator'] },
  { name: 'Fox News', lean: 'right' },
  { name: 'Wall Street Journal', lean: 'right', aliases: ['WSJ', 'The Wall Street Journal'] },
];

export function resolveOutletLean(outletName: string): OutletLean | undefined {
  const normalised = outletName.trim().toLowerCase();
  for (const o of OUTLET_LEAN_MAP) {
    if (o.name.toLowerCase() === normalised) return o.lean;
    if (o.aliases?.some((a) => a.toLowerCase() === normalised)) return o.lean;
    // Partial match for feed titles like "BBC News - Politics"
    if (normalised.includes(o.name.toLowerCase())) return o.lean;
    if (o.aliases?.some((a) => normalised.includes(a.toLowerCase()))) return o.lean;
  }
  return undefined;
}

/** Human-readable labels for the lean map (shown in README / settings). */
export const LEAN_MAP_SUMMARY = {
  left: ['Guardian', 'Independent', 'HuffPost', 'MSNBC'],
  centre: ['Reuters', 'AP', 'BBC', 'FT', 'Bloomberg', 'Al Jazeera English'],
  right: ['Telegraph', 'Times', 'Spectator', 'Fox News', 'WSJ'],
} as const;
