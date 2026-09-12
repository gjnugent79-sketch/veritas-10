import type { CompanyProfile } from './types';

/** Sourced company fact strips — only include claims with real public citations. */
export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    entityId: 'openai',
    name: 'OpenAI',
    descriptor:
      'Private company (OpenAI Group PBC, controlled by the OpenAI Foundation)',
    facts: [
      {
        label: 'Who owns it',
        text: 'Not listed on any stock market. It began as a non-profit in 2015 and now operates as a public benefit corporation controlled by the OpenAI Foundation; Microsoft is the largest outside investor, with SoftBank and others also holding stakes.',
        sources: [
          {
            label: 'OpenAI structure',
            url: 'https://openai.com/about/',
          },
          {
            label: 'OpenAI — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/OpenAI',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in December 2015 in San Francisco by a group including Sam Altman, Elon Musk, Greg Brockman and Ilya Sutskever.',
        sources: [
          {
            label: 'OpenAI — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/OpenAI',
          },
        ],
      },
    ],
  },
  {
    entityId: 'anthropic',
    name: 'Anthropic',
    descriptor: 'Private AI safety company',
    facts: [
      {
        label: 'Who owns it',
        text: 'Anthropic is a privately held company. Amazon and Google are major strategic investors; it is not publicly listed.',
        sources: [
          {
            label: 'Anthropic company',
            url: 'https://www.anthropic.com/company',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in 2021 by former OpenAI researchers including Dario and Daniela Amodei.',
        sources: [
          {
            label: 'Anthropic — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Anthropic',
          },
        ],
      },
    ],
  },
  {
    entityId: 'apple',
    name: 'Apple',
    descriptor: 'Public company (NASDAQ: AAPL)',
    facts: [
      {
        label: 'Who owns it',
        text: 'Apple Inc. is a publicly traded company listed on the Nasdaq. Institutional investors hold the majority of shares.',
        sources: [
          {
            label: 'Apple investor relations',
            url: 'https://investor.apple.com/',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded on 1 April 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne; incorporated in 1977.',
        sources: [
          {
            label: 'Apple — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Apple_Inc.',
          },
        ],
      },
    ],
  },
  {
    entityId: 'microsoft',
    name: 'Microsoft',
    descriptor: 'Public company (NASDAQ: MSFT)',
    facts: [
      {
        label: 'Who owns it',
        text: 'Microsoft Corporation is publicly traded on the Nasdaq. It is one of the largest companies by market capitalisation.',
        sources: [
          {
            label: 'Microsoft investor relations',
            url: 'https://www.microsoft.com/en-us/investor',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in 1975 by Bill Gates and Paul Allen.',
        sources: [
          {
            label: 'Microsoft — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Microsoft',
          },
        ],
      },
    ],
  },
  {
    entityId: 'nvidia-ai',
    name: 'NVIDIA',
    descriptor: 'Public company (NASDAQ: NVDA)',
    facts: [
      {
        label: 'Who owns it',
        text: 'NVIDIA Corporation is publicly traded. It designs GPUs widely used for AI training and inference.',
        sources: [
          {
            label: 'NVIDIA investor relations',
            url: 'https://investor.nvidia.com/',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in 1993 by Jensen Huang, Chris Malachowsky and Curtis Priem.',
        sources: [
          {
            label: 'NVIDIA — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Nvidia',
          },
        ],
      },
    ],
  },
  {
    entityId: 'nvidia-fin',
    name: 'NVIDIA',
    descriptor: 'Public company (NASDAQ: NVDA)',
    facts: [
      {
        label: 'Who owns it',
        text: 'NVIDIA Corporation is publicly traded. It designs GPUs widely used for AI training and inference.',
        sources: [
          {
            label: 'NVIDIA investor relations',
            url: 'https://investor.nvidia.com/',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in 1993 by Jensen Huang, Chris Malachowsky and Curtis Priem.',
        sources: [
          {
            label: 'NVIDIA — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Nvidia',
          },
        ],
      },
    ],
  },
  {
    entityId: 'tesla-cars',
    name: 'Tesla',
    descriptor: 'Public company (NASDAQ: TSLA)',
    facts: [
      {
        label: 'Who owns it',
        text: 'Tesla, Inc. is publicly traded. Elon Musk is CEO and a major shareholder.',
        sources: [
          {
            label: 'Tesla investor relations',
            url: 'https://ir.tesla.com/',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in July 2003; Elon Musk joined as chairman in 2004 and later became CEO.',
        sources: [
          {
            label: 'Tesla — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Tesla,_Inc.',
          },
        ],
      },
    ],
  },
  {
    entityId: 'tesla-fin',
    name: 'Tesla',
    descriptor: 'Public company (NASDAQ: TSLA)',
    facts: [
      {
        label: 'Who owns it',
        text: 'Tesla, Inc. is publicly traded. Elon Musk is CEO and a major shareholder.',
        sources: [
          {
            label: 'Tesla investor relations',
            url: 'https://ir.tesla.com/',
          },
        ],
      },
      {
        label: 'When it was set up',
        text: 'Founded in July 2003; Elon Musk joined as chairman in 2004 and later became CEO.',
        sources: [
          {
            label: 'Tesla — Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Tesla,_Inc.',
          },
        ],
      },
    ],
  },
];

export function getCompanyProfile(entityId: string) {
  return COMPANY_PROFILES.find((p) => p.entityId === entityId);
}
