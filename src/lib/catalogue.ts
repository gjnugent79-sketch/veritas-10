import type { Entity, Pillar, PillarMeta } from './types';

export const PILLARS: PillarMeta[] = [
  {
    id: 'football',
    label: 'Football',
    emoji: '⚽',
    description: 'Leagues, competitions, clubs and the stories moving the game.',
  },
  {
    id: 'politics',
    label: 'Politics',
    emoji: '🏛️',
    description: 'Political news, policies and developments from around the world.',
  },
  {
    id: 'cars',
    label: 'Cars',
    emoji: '🚗',
    description: 'News, launches, reviews, technology and everything happening in the automotive world.',
  },
  {
    id: 'finance',
    label: 'Finance',
    emoji: '💰',
    description: 'Markets, money, companies and the global economy.',
  },
  {
    id: 'ai',
    label: 'AI',
    emoji: '🤖',
    description: 'Labs, models, chips, research and the rules shaping artificial intelligence.',
  },
];

export const CATALOGUE: Entity[] = [
  // Football — competitions
  { id: 'pl', label: 'Premier League', query: 'Premier League', pillar: 'football', group: 'Competitions' },
  { id: 'championship', label: 'Championship', query: 'EFL Championship', pillar: 'football', group: 'Competitions' },
  { id: 'fa-cup', label: 'FA Cup', query: 'FA Cup', pillar: 'football', group: 'Competitions' },
  { id: 'ucl', label: 'Champions League', query: 'UEFA Champions League', pillar: 'football', group: 'Competitions' },
  { id: 'world-cup', label: 'World Cup', query: 'FIFA World Cup', pillar: 'football', group: 'Competitions' },
  { id: 'euros', label: 'European Championship', query: 'UEFA Euro', pillar: 'football', group: 'Competitions' },
  { id: 'la-liga', label: 'La Liga', query: 'La Liga', pillar: 'football', group: 'Competitions' },
  { id: 'bundesliga', label: 'Bundesliga', query: 'Bundesliga', pillar: 'football', group: 'Competitions' },
  { id: 'serie-a', label: 'Serie A', query: 'Serie A', pillar: 'football', group: 'Competitions' },
  { id: 'ligue-1', label: 'Ligue 1', query: 'Ligue 1', pillar: 'football', group: 'Competitions' },
  { id: 'afcon', label: 'AFCON', query: 'Africa Cup of Nations', pillar: 'football', group: 'Competitions' },
  { id: 'ghana-league', label: 'Ghana Premier League', query: 'Ghana Premier League', pillar: 'football', group: 'African leagues' },
  { id: 'npfl', label: 'Nigeria Premier League', query: 'NPFL Nigeria', pillar: 'football', group: 'African leagues' },
  { id: 'arsenal', label: 'Arsenal', query: 'Arsenal FC', pillar: 'football', group: 'Clubs' },
  { id: 'liverpool', label: 'Liverpool', query: 'Liverpool FC', pillar: 'football', group: 'Clubs' },
  { id: 'man-city', label: 'Manchester City', query: 'Manchester City', pillar: 'football', group: 'Clubs' },
  { id: 'man-utd', label: 'Manchester United', query: 'Manchester United', pillar: 'football', group: 'Clubs' },
  { id: 'chelsea', label: 'Chelsea', query: 'Chelsea FC', pillar: 'football', group: 'Clubs' },
  { id: 'tottenham', label: 'Tottenham', query: 'Tottenham Hotspur', pillar: 'football', group: 'Clubs' },

  // Politics — countries / regions
  { id: 'uk-politics', label: 'United Kingdom', query: 'UK politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'eu-politics', label: 'European Union', query: 'EU politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'us-politics', label: 'United States', query: 'US politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'germany-politics', label: 'Germany', query: 'Germany politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'france-politics', label: 'France', query: 'France politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'ireland-politics', label: 'Ireland', query: 'Ireland politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'ghana-politics', label: 'Ghana', query: 'Ghana politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'nigeria-politics', label: 'Nigeria', query: 'Nigeria politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'india-politics', label: 'India', query: 'India politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'china-politics', label: 'China', query: 'China politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'japan-politics', label: 'Japan', query: 'Japan politics', pillar: 'politics', group: 'Countries & regions' },
  { id: 'australia-politics', label: 'Australia', query: 'Australia politics', pillar: 'politics', group: 'Countries & regions' },

  // Cars
  { id: 'bmw', label: 'BMW', query: 'BMW', pillar: 'cars', group: 'Brands' },
  { id: 'mercedes', label: 'Mercedes-Benz', query: 'Mercedes-Benz', pillar: 'cars', group: 'Brands' },
  { id: 'vw', label: 'Volkswagen', query: 'Volkswagen', pillar: 'cars', group: 'Brands' },
  { id: 'toyota', label: 'Toyota', query: 'Toyota', pillar: 'cars', group: 'Brands' },
  { id: 'tesla-cars', label: 'Tesla', query: 'Tesla cars', pillar: 'cars', group: 'Brands' },
  { id: 'jaguar', label: 'Jaguar', query: 'Jaguar cars', pillar: 'cars', group: 'Brands' },
  { id: 'land-rover', label: 'Land Rover', query: 'Land Rover', pillar: 'cars', group: 'Brands' },
  { id: 'evs', label: 'Electric vehicles', query: 'electric vehicles EV', pillar: 'cars', group: 'Topics' },
  { id: 'recalls', label: 'Recalls', query: 'car recall', pillar: 'cars', group: 'Topics' },
  { id: 'motorsport', label: 'Motorsport', query: 'Formula 1 motorsport', pillar: 'cars', group: 'Topics' },

  // Finance
  { id: 'apple', label: 'Apple', query: 'Apple stock', pillar: 'finance', group: 'Companies' },
  { id: 'nvidia-fin', label: 'NVIDIA', query: 'NVIDIA stock', pillar: 'finance', group: 'Companies' },
  { id: 'tesla-fin', label: 'Tesla', query: 'Tesla stock', pillar: 'finance', group: 'Companies' },
  { id: 'microsoft', label: 'Microsoft', query: 'Microsoft stock', pillar: 'finance', group: 'Companies' },
  { id: 'sp500', label: 'S&P 500', query: 'S&P 500', pillar: 'finance', group: 'Indices' },
  { id: 'ftse100', label: 'FTSE 100', query: 'FTSE 100', pillar: 'finance', group: 'Indices' },
  { id: 'nasdaq', label: 'Nasdaq', query: 'Nasdaq', pillar: 'finance', group: 'Indices' },
  { id: 'gbpusd', label: 'GBP/USD', query: 'GBP USD pound dollar', pillar: 'finance', group: 'Markets' },
  { id: 'gold', label: 'Gold', query: 'gold price', pillar: 'finance', group: 'Markets' },
  { id: 'oil', label: 'Oil', query: 'oil price Brent', pillar: 'finance', group: 'Markets' },
  { id: 'bitcoin', label: 'Bitcoin', query: 'Bitcoin', pillar: 'finance', group: 'Markets' },
  { id: 'inflation', label: 'Inflation', query: 'inflation CPI', pillar: 'finance', group: 'Economy' },
  { id: 'rates', label: 'Interest rates', query: 'interest rates central bank', pillar: 'finance', group: 'Economy' },
  { id: 'personal-finance', label: 'Personal finance', query: 'personal finance savings mortgages', pillar: 'finance', group: 'Economy' },

  // AI
  { id: 'openai', label: 'OpenAI', query: 'OpenAI', pillar: 'ai', group: 'Companies' },
  { id: 'google-ai', label: 'Google', query: 'Google AI DeepMind Gemini', pillar: 'ai', group: 'Companies' },
  { id: 'anthropic', label: 'Anthropic', query: 'Anthropic Claude', pillar: 'ai', group: 'Companies' },
  { id: 'meta-ai', label: 'Meta', query: 'Meta AI Llama', pillar: 'ai', group: 'Companies' },
  { id: 'xai', label: 'xAI', query: 'xAI Grok', pillar: 'ai', group: 'Companies' },
  { id: 'nvidia-ai', label: 'NVIDIA', query: 'NVIDIA AI chips GPUs', pillar: 'ai', group: 'Companies' },
  { id: 'gpt', label: 'GPT / ChatGPT', query: 'ChatGPT GPT OpenAI model', pillar: 'ai', group: 'Models' },
  { id: 'gemini', label: 'Gemini', query: 'Google Gemini AI', pillar: 'ai', group: 'Models' },
  { id: 'claude', label: 'Claude', query: 'Anthropic Claude', pillar: 'ai', group: 'Models' },
  { id: 'llama', label: 'Llama', query: 'Meta Llama', pillar: 'ai', group: 'Models' },
  { id: 'ai-research', label: 'AI research', query: 'artificial intelligence research papers', pillar: 'ai', group: 'Topics' },
  { id: 'ai-hardware', label: 'AI hardware', query: 'AI chips semiconductors GPUs', pillar: 'ai', group: 'Topics' },
  { id: 'ai-regulation', label: 'AI regulation', query: 'AI regulation EU Act policy', pillar: 'ai', group: 'Topics' },
];

export function getEntity(id: string): Entity | undefined {
  return CATALOGUE.find((e) => e.id === id);
}

export function getEntitiesByPillar(pillar: Pillar): Entity[] {
  return CATALOGUE.filter((e) => e.pillar === pillar);
}

export function getPillarMeta(pillar: Pillar): PillarMeta | undefined {
  return PILLARS.find((p) => p.id === pillar);
}

export function groupEntities(entities: Entity[]): Record<string, Entity[]> {
  return entities.reduce<Record<string, Entity[]>>((acc, e) => {
    (acc[e.group] ??= []).push(e);
    return acc;
  }, {});
}

export function searchCatalogue(q: string): Entity[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return CATALOGUE.filter(
    (e) =>
      e.label.toLowerCase().includes(needle) ||
      e.query.toLowerCase().includes(needle) ||
      e.group.toLowerCase().includes(needle) ||
      e.pillar.includes(needle),
  );
}
