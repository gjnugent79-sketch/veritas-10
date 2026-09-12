export type Pillar = 'football' | 'politics' | 'cars' | 'finance' | 'ai';

export type PoliticsLean = 'left' | 'centre' | 'right' | 'both';

export type OutletLean = 'left' | 'centre' | 'right';

export type FactStatus = 'confirmed' | 'reported' | 'disputed' | 'unclear';

export interface Entity {
  id: string;
  label: string;
  query: string;
  pillar: Pillar;
  group: string;
}

export interface UserProfile {
  name: string;
  follows: string[];
  politicsLean: PoliticsLean;
  onboarded: boolean;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  outlet: string;
  summary: string;
  lean?: OutletLean;
  entityIds: string[];
  pillar?: Pillar;
  isFixture?: boolean;
}

export interface SourceRef {
  headline: string;
  outlet: string;
  url: string;
  publishedAt: string;
  lean?: OutletLean;
}

export interface StoryBriefing {
  id: string;
  entityIds: string[];
  pillar: Pillar;
  headline: string;
  whatHappened: string[];
  factStatus: FactStatus;
  sourcesDisagree?: string;
  sources: SourceRef[];
  isFixture?: boolean;
  gatheredAt: string;
}

export interface CompanyFact {
  label: string;
  text: string;
  sources: { label: string; url: string }[];
}

export interface CompanyProfile {
  entityId: string;
  name: string;
  descriptor: string;
  facts: CompanyFact[];
}

export interface PillarMeta {
  id: Pillar;
  label: string;
  emoji: string;
  description: string;
}
