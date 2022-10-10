import React, { FC, useEffect, useState } from 'react'
import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'
import { useExtension } from '@my-app/app/src/framework/engine/extension/context'

const ResendOtpCode: FC<BlockComponent<any>> = ({ props }) => {
    const [sended, setIsSended] = useState(false)
    const styles = useStyles(props?.style)
    const { hooks } = useExtension();
    const RenderCounter = () => {
        const [count, setCounter] = useState(60)
        const [intervalID, setID] = useState<NodeJS.Timer | null>(null)
        const runCounter = () => {
            const id = setInterval(() => {
                setCounter((val) => val - 1)

            }, 1000)
            setID(id)
        }

        useEffect(() => {
            runCounter()
        }, [])

        useEffect(() => {
            if (count <= 0 && intervalID) {
                clearInterval(intervalID)
                setIsSended(false)
            }
        }, [count])

        return (
            <View style={[defaultStyles.container, styles?.container]}>
                <Text style={defaultStyles.counterTextTitle}>
                    Puedes solicitar otro código en
                </Text>
                <View style={defaultStyles.counterWrapper}>
                    <Text style={defaultStyles.counterNumber}>{count}</Text>
                    <Text style={defaultStyles.counterDescription}>segundos</Text>

                </View>
            </View>)
    }

    const RenderResend = () => {
        return (
            <View style={[defaultStyles.resendWrapper, styles?.resendWrapper]}>
                <Text style={[defaultStyles.resendTextTitle, styles?.resendTextTitle]}>
                    ¿No te llega el código?
                </Text>
                <Pressable style={[defaultStyles.resendPressable, styles?.resendPressable]} onPress={() => onPress()}>
                    <Text style={[defaultStyles.resendPressableText, styles?.resendPressableText]}>Reenviar código</Text>
                </Pressable>
            </View>

        )
    }



    const onPress = async () => {
        const submit = hooks[props.context]
        const response = await submit({
            hooks
        })
        setIsSended(true)
    }

    return sended ? <RenderCounter /> : <RenderResend />
}

const defaultStyles = StyleSheet.create({
    resendWrapper: {

    },
    resendTextTitle: {
        fontWeight: "300",
        fontSize: 18,
        lineHeight: 21,
        color: "#390052",
        textAlign: "center",
        marginBottom: 4
    },
    resendPressable: {

    },
    resendPressableText: {
        fontSize: 18,
        lineHeight: 21,
        textDecorationLine: 'underline',
        color: "#25D366",

        textAlign: "center"
    },
    counterWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    counterTextTitle: {
        fontWeight: "300",
        fontSize: 18,
        lineHeight: 21,
        color: "#390052",
        textAlign: "center",
        marginBottom: 4
    },
    counterNumber: {
        marginHorizontal: 4,
        color: "#E2C2FF",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 18
    },
    counterDescription: {
        color: "#E2C2FF",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "700"

    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ResendOtpCode