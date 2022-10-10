import React, { useMemo } from 'react';
import { createContext, FC, useContext } from 'react';

export type StoreFormContextValue = StoreFormConfig;

const StoreForm = createContext<StoreFormContextValue | {}>({});

export interface StoreFormProps {
  config: StoreFormConfig;
  children: React.ReactElement
}

export type StoreFormConfig = {
  onSubmit: (props: any) => void;
  submitIsLoading?: boolean;
  defaultValues: Record<string, any> | any[];
};

export const StoreFormProvider: FC<StoreFormProps> = ({
  config,
  children,
}) => {
  const value = useMemo(() => {
    return {
      submitIsLoading: config.submitIsLoading,
      onSubmit: config.onSubmit,
      defaultValues: config.defaultValues ?? {},
    };
  }, [config]);
  
  return <StoreForm.Provider value={value}>{children}</StoreForm.Provider>;
};

export const useStoreForm = (): StoreFormConfig =>
  useContext(StoreForm) as StoreFormContextValue;
