import type { StoryBriefing } from './types';

/** High-quality fixture briefings dated around September 2026. Marked isFixture. */
export const FIXTURE_BRIEFINGS: StoryBriefing[] = [
  {
    id: 'fx-pl-1',
    entityIds: ['pl', 'arsenal', 'liverpool'],
    pillar: 'football',
    headline: 'Premier League title race tightens after North London derby draw',
    whatHappened: [
      'Arsenal and Liverpool shared points in a high-tempo league fixture that left both within touching distance at the top.',
      'Managers emphasised set-piece defending and midfield control as the decisive themes.',
      'The result keeps several clubs mathematically in contention heading into the autumn run-in.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'Arsenal held as Premier League leaders drop points',
        outlet: 'BBC Sport',
        url: 'https://www.bbc.co.uk/sport/football',
        publishedAt: '2026-09-07T18:30:00Z',
        lean: 'centre',
      },
      {
        headline: 'Title race remains open after weekend results',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/sports/',
        publishedAt: '2026-09-07T20:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-08T08:00:00Z',
  },
  {
    id: 'fx-ucl-1',
    entityIds: ['ucl', 'man-city'],
    pillar: 'football',
    headline: 'Champions League group stage: City progress with controlled away win',
    whatHappened: [
      'Manchester City secured a second group win of the campaign with a measured away performance.',
      'European nights continue to favour squad depth as clubs rotate through a congested calendar.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'City take control of Champions League group',
        outlet: 'BBC Sport',
        url: 'https://www.bbc.co.uk/sport/football/champions-league',
        publishedAt: '2026-09-09T21:45:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-10T07:00:00Z',
  },
  {
    id: 'fx-uk-pol-1',
    entityIds: ['uk-politics'],
    pillar: 'politics',
    headline: 'UK government outlines autumn fiscal priorities ahead of Budget',
    whatHappened: [
      'Ministers signalled spending restraint alongside targeted support for housing and energy costs.',
      'Opposition parties criticised the pace of delivery on public services.',
      'Independent forecasters urged clearer medium-term fiscal rules.',
    ],
    factStatus: 'confirmed',
    sourcesDisagree:
      'Left-leaning outlets stress public-service pressure; right-leaning outlets emphasise fiscal discipline.',
    sources: [
      {
        headline: 'Treasury sets out Budget themes',
        outlet: 'BBC',
        url: 'https://www.bbc.co.uk/news/uk-politics',
        publishedAt: '2026-09-08T12:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Cuts risk deepening public service strain, critics say',
        outlet: 'The Guardian',
        url: 'https://www.theguardian.com/politics',
        publishedAt: '2026-09-08T14:00:00Z',
        lean: 'left',
      },
      {
        headline: 'Focus on debt and growth is the right call',
        outlet: 'The Telegraph',
        url: 'https://www.telegraph.co.uk/politics/',
        publishedAt: '2026-09-08T15:30:00Z',
        lean: 'right',
      },
      {
        headline: 'UK Budget preview: markets watch gilt yields',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/world/uk/',
        publishedAt: '2026-09-08T16:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-09T06:00:00Z',
  },
  {
    id: 'fx-us-pol-1',
    entityIds: ['us-politics'],
    pillar: 'politics',
    headline: 'US midterm campaigning intensifies over economy and border policy',
    whatHappened: [
      'Candidates in key states centred messages on inflation, wages and immigration enforcement.',
      'Poll averages show several competitive races within the margin of error.',
    ],
    factStatus: 'reported',
    sourcesDisagree:
      'MSNBC highlights cost-of-living framing; Fox News emphasises border and crime messaging.',
    sources: [
      {
        headline: 'Midterms: economy dominates voter concerns',
        outlet: 'Associated Press',
        url: 'https://apnews.com/politics',
        publishedAt: '2026-09-06T11:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Voters say prices still too high',
        outlet: 'MSNBC',
        url: 'https://www.msnbc.com/',
        publishedAt: '2026-09-06T18:00:00Z',
        lean: 'left',
      },
      {
        headline: 'Border remains top issue in swing districts',
        outlet: 'Fox News',
        url: 'https://www.foxnews.com/politics',
        publishedAt: '2026-09-06T19:00:00Z',
        lean: 'right',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-07T09:00:00Z',
  },
  {
    id: 'fx-eu-pol-1',
    entityIds: ['eu-politics', 'germany-politics', 'france-politics'],
    pillar: 'politics',
    headline: 'EU leaders discuss energy security and industrial competitiveness',
    whatHappened: [
      'Summit talks covered gas storage, renewables targets and support for strategic manufacturing.',
      'Berlin and Paris pressed for coordinated industrial policy without fragmenting the single market.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'EU summit focuses on energy and industry',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/world/europe/',
        publishedAt: '2026-09-05T17:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Brussels seeks common line on competitiveness',
        outlet: 'Financial Times',
        url: 'https://www.ft.com/',
        publishedAt: '2026-09-05T18:30:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-06T08:00:00Z',
  },
  {
    id: 'fx-bmw-1',
    entityIds: ['bmw', 'evs'],
    pillar: 'cars',
    headline: 'BMW expands electric lineup with refreshed i-series models',
    whatHappened: [
      'The manufacturer detailed range improvements and faster charging for its next electric models.',
      'Dealers expect European deliveries to ramp through late 2026.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'BMW updates electric range for 2027 model year',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/business/autos-transportation/',
        publishedAt: '2026-09-04T10:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-05T07:00:00Z',
  },
  {
    id: 'fx-tesla-cars-1',
    entityIds: ['tesla-cars', 'evs', 'recalls'],
    pillar: 'cars',
    headline: 'Tesla issues software update addressing camera calibration notice',
    whatHappened: [
      'An over-the-air update was released after regulators logged a camera calibration advisory.',
      'The company said the fix applies to a subset of recent vehicles and does not require a workshop visit.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'Tesla rolls out OTA fix for camera issue',
        outlet: 'Associated Press',
        url: 'https://apnews.com/business',
        publishedAt: '2026-09-03T15:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Regulators note Tesla software remedy',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/business/autos-transportation/',
        publishedAt: '2026-09-03T16:20:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-04T08:00:00Z',
  },
  {
    id: 'fx-f1-1',
    entityIds: ['motorsport'],
    pillar: 'cars',
    headline: 'Formula 1: constructors battle remains open after Italian Grand Prix',
    whatHappened: [
      'A late-race safety car reshuffled strategy and left the constructors standings tightly packed.',
      'Teams head to Asia with tyre management again expected to decide race weekends.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Italian GP leaves F1 title fight wide open',
        outlet: 'BBC Sport',
        url: 'https://www.bbc.co.uk/sport/formula1',
        publishedAt: '2026-09-07T16:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-08T09:00:00Z',
  },
  {
    id: 'fx-apple-1',
    entityIds: ['apple'],
    pillar: 'finance',
    headline: 'Apple shares steady as analysts digest services growth outlook',
    whatHappened: [
      'Investors focused on recurring revenue from services after the latest product cycle update.',
      'Broker notes highlighted margin resilience even as hardware volumes normalise.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Apple services strength supports valuation debate',
        outlet: 'Bloomberg',
        url: 'https://www.bloomberg.com/markets',
        publishedAt: '2026-09-08T13:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-09T07:30:00Z',
  },
  {
    id: 'fx-nvidia-1',
    entityIds: ['nvidia-fin', 'nvidia-ai', 'ai-hardware'],
    pillar: 'finance',
    headline: 'NVIDIA outlook buoyed by continued AI data-centre demand',
    whatHappened: [
      'Chip orders for training clusters remain elevated according to supply-chain trackers.',
      'Competitors are expanding capacity, but lead times for high-end GPUs stay extended.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'AI chip demand remains firm into autumn',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/technology/',
        publishedAt: '2026-09-09T11:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Data-centre GPU backlog still elevated',
        outlet: 'Bloomberg',
        url: 'https://www.bloomberg.com/technology',
        publishedAt: '2026-09-09T12:30:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-10T06:00:00Z',
  },
  {
    id: 'fx-ftse-1',
    entityIds: ['ftse100', 'rates', 'inflation'],
    pillar: 'finance',
    headline: 'FTSE 100 firms as rate-cut bets firm on cooler UK inflation print',
    whatHappened: [
      'A softer-than-expected inflation reading lifted expectations of earlier policy easing.',
      'Banking and consumer stocks led gains; exporters were mixed on sterling strength.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'UK inflation cools; markets price rate cuts',
        outlet: 'Financial Times',
        url: 'https://www.ft.com/markets',
        publishedAt: '2026-09-10T07:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'FTSE rises on inflation relief',
        outlet: 'BBC',
        url: 'https://www.bbc.co.uk/news/business',
        publishedAt: '2026-09-10T08:15:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-10T09:00:00Z',
  },
  {
    id: 'fx-btc-1',
    entityIds: ['bitcoin', 'gold'],
    pillar: 'finance',
    headline: 'Bitcoin holds range as gold hits fresh seasonal high',
    whatHappened: [
      'Crypto prices consolidated while traders awaited clearer macro cues from major central banks.',
      'Gold extended gains amid safe-haven flows and softer real yields.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Gold climbs; bitcoin trades sideways',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/markets/',
        publishedAt: '2026-09-09T14:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-10T05:00:00Z',
  },
  {
    id: 'fx-openai-1',
    entityIds: ['openai', 'gpt', 'ai-regulation'],
    pillar: 'ai',
    headline: 'OpenAI details next model safety evaluations ahead of product refresh',
    whatHappened: [
      'The company published evaluation summaries covering jailbreak resistance and hallucination rates.',
      'Policy groups called for independent audits alongside vendor self-reporting.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'OpenAI publishes updated model safety cards',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/technology/',
        publishedAt: '2026-09-08T16:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'AI labs face pressure for third-party audits',
        outlet: 'Associated Press',
        url: 'https://apnews.com/technology',
        publishedAt: '2026-09-08T17:30:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-09T08:00:00Z',
  },
  {
    id: 'fx-anthropic-1',
    entityIds: ['anthropic', 'claude'],
    pillar: 'ai',
    headline: 'Anthropic expands Claude enterprise tier with longer context tools',
    whatHappened: [
      'New workplace features target document analysis and controlled data retention for businesses.',
      'Pricing was updated for higher-volume API customers.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Anthropic updates Claude for enterprise',
        outlet: 'Bloomberg',
        url: 'https://www.bloomberg.com/technology',
        publishedAt: '2026-09-07T13:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-08T07:00:00Z',
  },
  {
    id: 'fx-google-ai-1',
    entityIds: ['google-ai', 'gemini', 'ai-research'],
    pillar: 'ai',
    headline: 'Google DeepMind papers spotlight efficiency gains in multimodal models',
    whatHappened: [
      'Researchers described training techniques that cut compute for comparable benchmark scores.',
      'The work feeds into Gemini product updates expected later in the year.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'DeepMind details multimodal efficiency research',
        outlet: 'BBC',
        url: 'https://www.bbc.co.uk/news/technology',
        publishedAt: '2026-09-06T10:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-07T06:30:00Z',
  },
  {
    id: 'fx-xai-1',
    entityIds: ['xai'],
    pillar: 'ai',
    headline: 'xAI opens limited API access for Grok developer preview',
    whatHappened: [
      'A developer preview invites selected partners to test Grok endpoints with rate limits.',
      'xAI said broader availability will depend on capacity and safety reviews.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'xAI launches Grok API preview',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/technology/',
        publishedAt: '2026-09-05T19:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-06T07:00:00Z',
  },
  {
    id: 'fx-meta-ai-1',
    entityIds: ['meta-ai', 'llama'],
    pillar: 'ai',
    headline: 'Meta releases Llama update focused on on-device inference',
    whatHappened: [
      'The open-weight release targets phones and laptops with reduced memory footprint.',
      'Developers noted improved tool-use scores versus the previous generation.',
    ],
    factStatus: 'confirmed',
    sources: [
      {
        headline: 'Meta ships smaller Llama for edge devices',
        outlet: 'Associated Press',
        url: 'https://apnews.com/technology',
        publishedAt: '2026-09-04T14:00:00Z',
        lean: 'centre',
      },
      {
        headline: 'Llama edge models gain developer interest',
        outlet: 'Bloomberg',
        url: 'https://www.bloomberg.com/technology',
        publishedAt: '2026-09-04T15:45:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-05T08:00:00Z',
  },
  {
    id: 'fx-ghana-pol-1',
    entityIds: ['ghana-politics'],
    pillar: 'politics',
    headline: 'Ghana parliament debates energy tariff reform package',
    whatHappened: [
      'Lawmakers reviewed proposals to rebalance tariffs while protecting low-income households.',
      'Business groups urged clarity on timelines for industrial users.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Ghana energy tariff bill under debate',
        outlet: 'Reuters',
        url: 'https://www.reuters.com/world/africa/',
        publishedAt: '2026-09-03T12:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-04T06:00:00Z',
  },
  {
    id: 'fx-nigeria-pol-1',
    entityIds: ['nigeria-politics'],
    pillar: 'politics',
    headline: 'Nigeria central bank reiterates inflation fight after policy meeting',
    whatHappened: [
      'Officials kept rates unchanged and stressed coordination with fiscal authorities.',
      'Analysts watch food prices and FX liquidity as key near-term risks.',
    ],
    factStatus: 'reported',
    sources: [
      {
        headline: 'Nigeria holds rates; inflation still elevated',
        outlet: 'Bloomberg',
        url: 'https://www.bloomberg.com/africa',
        publishedAt: '2026-09-02T15:00:00Z',
        lean: 'centre',
      },
    ],
    isFixture: true,
    gatheredAt: '2026-09-03T07:00:00Z',
  },
];

export function fixturesForEntities(entityIds: string[]): StoryBriefing[] {
  const set = new Set(entityIds);
  return FIXTURE_BRIEFINGS.filter((b) =>
    b.entityIds.some((id) => set.has(id)),
  );
}

export function fixturesForQuery(query: string): StoryBriefing[] {
  const q = query.toLowerCase();
  return FIXTURE_BRIEFINGS.filter(
    (b) =>
      b.headline.toLowerCase().includes(q) ||
      b.whatHappened.some((w) => w.toLowerCase().includes(q)) ||
      b.entityIds.some((id) => id.includes(q.replace(/\s+/g, '-'))),
  );
}
