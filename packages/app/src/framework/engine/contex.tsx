import React, { useMemo, createContext, FC, useContext } from 'react';
import { Block, Route } from './types';

const Engine = createContext<EngineProps | {}>({});

import useOmniHook from '../omni-logic/plugin/hook/use-omni-hook'

export const computeHooks = (hooks: any) => {
    let hooksObj = {}
    const getSchema = (name: string) => hooks.find((val: { name: string }) => val.name === name)
    hooks?.forEach((hook: { name: string }) => {
        const schema = getSchema(hook.name)
        if (schema) {
            hooksObj = {
                ...hooksObj,
                [hook.name]: schema
            }
        }
    })
    return Object.keys(hooksObj).reduce((accum, key) => {
        const h = useOmniHook(hooksObj[key]);
        accum = {
            ...accum,
            [key]: h
        }
        return accum
    }, {})
}

export const importHooks = (rawHooks: any, importContext: string[]) => {
    const value = importContext.reduce((accum, name) => {
        const hook = rawHooks.hooks.findIndex((pred) => pred.name === name);

        if (hook !== -1) {
            accum.push(rawHooks.hooks[hook])
        }

        return accum
    }, [])

    const computedHook = computeHooks(value)
    return computedHook
}


export interface EngineProps {
    data: {
        blocks: Block
        routes: Route
        hooks: any[]
        rawHooks: {
            hooks: any[]
        }
    }
    children: React.ReactNode;
}

export type EngineProviderValue = EngineProps['data']

export const EngineProvider: FC<EngineProps> = ({
    data,
    children,
}) => {
    const value = useMemo(() => {
        return {
            blocks: data.blocks,
            routes: data.routes,
            hooks: data.hooks,
            rawHooks: data.rawHooks
        };
    }, [data]);
    return <Engine.Provider value={value}>{children}</Engine.Provider>;
};

export const useEngine = () =>
    useContext(Engine) as EngineProviderValue;
