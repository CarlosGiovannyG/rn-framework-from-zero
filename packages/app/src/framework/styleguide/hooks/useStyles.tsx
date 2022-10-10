import { useMemo } from "react";
import { useStyleguide } from "../context";
import { Platform, StyleSheet } from "react-native";

const useStyles = (Class?: string) => {
    if (!Class) return StyleSheet.create({})
    const { styles } = useStyleguide();
    const style = () => {
        let componentStyles = {}
        if (styles.hasOwnProperty(`styles.${Class}`)) {
            componentStyles = styles[`styles.${Class}`]
            const filtered = Object.keys(componentStyles).filter((pred) => pred?.includes('.android') || pred?.includes('.ios'))
            filtered.forEach((val) => {
                if (val?.includes(`.android`) && Platform.OS === 'android') {
                    const newVal = val.replace(".android", "")
                    const platformStyles = componentStyles[val]
                    componentStyles[newVal] = {
                        ...componentStyles[newVal],
                        ...platformStyles
                    }

                } else if (val?.includes(`.ios`) &&  Platform.OS === 'ios') {
                    const newVal = val.replace(".ios", "")
                    const platformStyles = componentStyles[val]
                    componentStyles[newVal] = {
                        ...componentStyles[newVal],
                        ...platformStyles
                    }
                }
            })
        }
        else componentStyles
        return StyleSheet.create(componentStyles)
    }
    
    return style()
}

export default useStyles