import React from 'react'
import Render from './render'
import { EngineProps } from './types'
import { EngineProvider } from './contex'


const Engine = ({ routes, blocks, rawHooks }: EngineProps) => {

    return (<EngineProvider data={{
        blocks, routes, rawHooks
    }}>
        <Render />
    </EngineProvider>
    )
}

export default Engine