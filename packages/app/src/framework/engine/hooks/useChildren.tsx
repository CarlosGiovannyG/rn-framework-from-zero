import React, { Fragment, useCallback, useMemo } from 'react'
import { Text } from 'react-native'
import { useStyleguide } from '../../styleguide/context'
import { BlockComponent } from '../types'
import { makeid } from '../utils/randomKey'


const useChildren = (block: Partial<BlockComponent>) => {
    if(!block) throw new Error('useChildren error block not found')
    const { sharedComponents: { ui } } = useStyleguide()

    const ChildrenComponent = useCallback((props: Partial<BlockComponent>) => {
        const Component = ui[props.componentName || "default"]
        if (!Component) {
            throw new Error(`El componente ${props.componentName} no existe en la UI.`)
        }

        return <Fragment>
            <Component {...props as any} />
        </Fragment>
    }, [])

    const Childrens = useMemo(()=>block?.children?.map((cblock) => {
        return React.createElement(ChildrenComponent, {key:makeid(8), ...cblock})
    }),[])
    
    return Childrens
}

export default useChildren