/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { ReactNode } from 'react';
import { localProvider } from './provider';
import {
  CommerceConfig,
  CommerceConfigProviderJSON,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '../kernel';

export const localConfig: CommerceConfig = {
  locale: 'es-CO',
  config: {} as CommerceConfigProviderJSON,
};

export function PluginProvider({
  children,
  ...config
}: {
  children?: ReactNode;
  locale: string;
} & Partial<CommerceConfig>) {
  return (
    <CoreCommerceProvider
      // @ts-ignore
      provider={localProvider}
      config={{ ...localConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  );
}

export const useCommerce = () => useCoreCommerce();
