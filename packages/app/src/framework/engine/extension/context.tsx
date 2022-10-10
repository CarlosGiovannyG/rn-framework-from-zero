import React, { useMemo, createContext, FC, useContext } from 'react';

const Extension = createContext<ExtensionProps | {}>({});

export interface ExtensionProps {
    data: {
        hooks: any[]
    }
    children: React.ReactNode;
}

export type ExtensionProviderValue = ExtensionProps['data']

export const ExtensionProvider: FC<ExtensionProps> = ({
    data,
    children,
}) => {
    const value = useMemo(() => {
        return {
            hooks: data.hooks
        };
    }, [data]);
    return <Extension.Provider value={value}>{children}</Extension.Provider>;
};

export const useExtension = () =>
    useContext(Extension) as ExtensionProviderValue;
