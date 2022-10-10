import { BlockComponent } from "@my-app/app/src/framework/engine/types"
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles"
import React, { FC, useCallback, useEffect, useState } from "react"
import OptionsList from "./Options"
import { OptionItem } from "./Options/type"

export type OptionsListProps = {
    list: OptionItem[]
    multi: boolean
    styles?: any
    onChangeText?: (...event: any[]) => void;
}

const OptionsListComponent: FC<OptionsListProps> = ({ list,
    multi = false,
    styles: OptionListStyles,
    onChangeText }) => {

    const [selectedValue, setSelectedValue] = useState<string | number>("")
    const [multiSelected, setMultiSelected] = useState<(string | number)[]>([])


    const addValue = (value: string | number) => {
        setMultiSelected((val) => {
            let cpy = val
            cpy.push(value)
            return cpy
        })
    }

    const removeValue = (value: string | number) => {
        setMultiSelected((val) => {
            let cpy = val
            const index = cpy.findIndex((pred) => pred === value)
            if (index !== -1) {
                cpy.splice(index, 1)
            }
            return cpy
        })
    }

    const isItemSelected = (value: string | number) => {
        const index = multiSelected.findIndex((pred) => pred === value)
        console.log(index)
        if (index !== -1) {
            return true
        }
        return false
    }


    const isSelected = useCallback((value: string | number) => {
        if (multi) {
            return isItemSelected(value)
        }

        return selectedValue === value
    }, [selectedValue])

    const onPress = (value: string | number) => {
        if (multi) {
            if (isSelected(value)) removeValue(value)
            else addValue(value)
        } else {
            setSelectedValue(value)
        }
    }

    useEffect(()=> {
        if(typeof onChangeText === 'function'){
            const onChangeValue = multi ? multiSelected : selectedValue
            onChangeText(onChangeValue)
        }
    }, [selectedValue, multiSelected])

    return <OptionsList
        list={list}
        listStyle={OptionListStyles?.listStyle}
        itemContainerStyle={OptionListStyles.itemContainer}
        itemContainerStyleSelected={OptionListStyles.itemContainerSelected}
        itemTitleStyle={OptionListStyles?.itemTitle}
        itemDescriptionStyle={OptionListStyles?.itemDescription}
        circle={OptionListStyles?.circle}
        container={OptionListStyles?.container}
        onPress={onPress}
        isSelected={isSelected}
        selectedValue={selectedValue}
        multiSelected={multiSelected}
        circleCheck={OptionListStyles?.circleCheck}
    />
}

export default OptionsListComponent