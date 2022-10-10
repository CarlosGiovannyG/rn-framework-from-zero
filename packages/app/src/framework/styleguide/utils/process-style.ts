import get from "lodash.get"
import { addVarToString } from "../../omni-logic/plugin/utils/addVarToString"
import { StyleClass, StyleguideConfig } from "../context"
import { ThemeType } from "../types/theme"


const VariablePattern = new RegExp("\\{.*?\\}", "g")

const computeClasses = (classes: StyleguideConfig['styles'], theme: ThemeType) => {
    for (let key in classes) {
        let isVariable = false
        const value = classes[key]
        const type = typeof value
        if (type === 'string') {
            const matches = value.match(VariablePattern)
            if (matches && matches?.length) {
                isVariable = true
            }
        } else if(type === 'object') {
            computeClasses(value, theme)
        }
        if (isVariable) {
            const path = value.replace("{", "").replace("}", "")
            const val = get(theme, path)
            classes[key] = val
        }

    }
    return classes
}


export {
    computeClasses
}
