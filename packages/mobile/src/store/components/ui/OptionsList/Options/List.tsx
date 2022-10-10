import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import { makeid } from '@my-app/app/src/framework/engine/utils/randomKey'
import React, { FC, useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import OptionItem from './Item'
import { OptionListProps } from './type'

const OptionList: FC<OptionListProps> = ({ list = [], listStyle, itemTitleStyle, itemDescriptionStyle,itemContainerStyleSelected, itemContainerStyle, circle, circleCheck,container, onPress, isSelected, multiSelected, selectedValue }) => {
    return <ScrollView style={[listStyle]}>
        {list.map((item) =>
            <OptionItem
                styles={{
                    container,
                    itemContainerStyle,
                    itemContainerStyleSelected,
                    itemTitleStyle,
                    circle,
                    circleCheck,
                    itemDescriptionStyle
                }}
                key={makeid(4)}
                title={item.title}
                description={item.description}
                value={item.value}
                multiSelected={multiSelected}
                selectedValue={selectedValue}
                isSelected={isSelected}
                onPress={onPress}
                children={item?.children}
            />)}
    </ScrollView>
}

export default OptionList