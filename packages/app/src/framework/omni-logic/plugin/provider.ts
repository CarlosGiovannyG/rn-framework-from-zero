import fetcher from './fetcher';

import { handler as useOmniHook } from './hook/use-omni-hook';

export type Provider = typeof localProvider;
export const localProvider = {
  locale: 'es-CO',
  fetcher: fetcher,
  hooks: { useOmniHook },
};
