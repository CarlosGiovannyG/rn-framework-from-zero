import { Provider, useCommerce } from '../../kernel';
import { useCallback } from 'react';
import type { MutationHook, PickRequired, SWRHook } from './types';
import useData from './use-data';
import Storage from './async-storage'
import { useStyleguide } from '../../../styleguide/context';
import { useGlobalState } from '../../../state-machine';
import { useLinkTo } from '@react-navigation/native';
export function useFetcher() {
  const { providerRef, fetcherRef } = useCommerce();
  return providerRef.current.fetcher ?? fetcherRef.current;
}

export function useHook<
  P extends Provider,
  H extends MutationHook<any> | SWRHook<any>
>(fn: (provider: P) => H) {
  const { providerRef } = useCommerce<P>();
  const provider = providerRef.current;
  return fn(provider);
}

export function useSWRHook<H extends SWRHook<any>>(
  hook: PickRequired<H, 'fetcher'>
) {
  const fetcher = useFetcher();

  return hook.useHook({
    useData(ctx) {
      const response = useData(
        hook,
        ctx?.input ?? [],
        fetcher,
        ctx?.swrOptions
      );
      return response;
    },
  });
}

export const useCommons = () => {
  const { sharedComponents: { utils } } = useStyleguide()
  const linkTo = useLinkTo()
  const machines = useGlobalState()

  const send = (machine: string, type: string, params: any) => {
    console.log("Send:", machine, type, params)
    if (machines.hasOwnProperty(machine)) {
      //@ts-ignore
      const Machine = machines[machine]?.interpreted
      Machine.send({type,...params})
      return true
    }
    return false
  }

  const getData = (machine: string, pathValue: string) => {
    if (machines.hasOwnProperty(machine)) {
      //@ts-ignore

      const [{ value, context }] = machines[machine]?.actor
      console.log("GetData", value, context)
      return { value, context }
    }
    return null
  }
  return {
    ...utils,
    StateMachine: {
      send,
      getData
    },
    Navigation: {
      linkTo
    }
  }
}

export function useMutationHook<H extends MutationHook<any>>(
  hook: PickRequired<H, 'fetcher'>
) {
  const fetcher = useFetcher();
  const utils = useCommons()
  


  return hook.useHook({
    fetch: useCallback(
      ({ input } = {}) => {

        return hook.fetcher({
          input,
          options: hook.fetchOptions,
          fetch: fetcher,
          utils,
          template: hook.template || {}
        });
      },
      [fetcher, hook.fetchOptions, utils]
    ),
  });
}
