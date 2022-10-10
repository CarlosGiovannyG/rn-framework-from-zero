import React from 'react';
import { StyleProp, ViewStyle } from "react-native"
import { SvgProps } from "react-native-svg"

interface OptionListProps {
    list: OptionItem[]
    listStyle?: StyleProp<ViewStyle>
    itemTitleStyle?: StyleProp<ViewStyle>
    itemDescriptionStyle?: StyleProp<ViewStyle>

    circle?: StyleProp<ViewStyle>
    circleCheck?: SvgProps
    itemContainerStyle?: StyleProp<ViewStyle>
    container?: StyleProp<ViewStyle>
    itemContainerStyleSelected?: StyleProp<ViewStyle>
    selectedValue: string | number
    multiSelected: (string | number)[]
    isSelected: (value: string | number) => boolean
    onPress: (value: string | number) => void
}

type OptionItem = {
    title: string
    description: string
    value: string | number
    styles: {
        container?: StyleProp<ViewStyle>
        itemContainerStyle?: StyleProp<ViewStyle>
        itemContainerStyleSelected?: StyleProp<ViewStyle>
        itemTitleStyle?: StyleProp<ViewStyle>
        circle?: StyleProp<ViewStyle>
        circleCheck?: SvgProps
        itemDescriptionStyle?: StyleProp<ViewStyle>
    }
    isSelected: (value: string | number) => boolean
    selectedValue: string | number
    multiSelected: (string | number)[]
    onPress: (...args: any) => any
    children: React.ReactNode;
}

export type {
    OptionListProps,
    OptionItem
}