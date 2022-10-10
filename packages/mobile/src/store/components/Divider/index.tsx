import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'
import React, { FC } from 'react'
import { View } from 'react-native'

type DividerProps = {
    style?: string
}

const Divider: FC<BlockComponent<DividerProps>> = ({ props: { style } }) => {
    const DividerStyle = useStyles(style)
    return <View
        style={[{
            width: '100%',
            height: 0.5,
            backgroundColor: "#000",
            opacity: 0.5
        }, DividerStyle?.divider]}
    />
}

export default Divider