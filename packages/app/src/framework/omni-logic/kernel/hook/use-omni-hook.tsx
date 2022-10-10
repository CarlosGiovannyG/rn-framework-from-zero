
import type { Provider } from '..';
import { OmniHook } from '../types/omni-hook';
import { mutationFetcher } from '../utils/default-fetcher';
import { HookFetcherFn, MutationHook } from '../utils/types';
import { useHook, useMutationHook } from '../utils/use-hook';

export type UseOmniHook<
  H extends MutationHook<OmniHook<any>> = MutationHook<OmniHook>
> = ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<OmniHook> = mutationFetcher;

const fn = (provider: Provider) => provider.hooks?.useOmniHook!;

const useOmniHook: UseOmniHook = (...args) => {
  const hook = useHook(fn);
  
  return useMutationHook({ fetcher, ...hook, template: args.length ? args[0] : {} })(...args);
};

export default useOmniHook;
