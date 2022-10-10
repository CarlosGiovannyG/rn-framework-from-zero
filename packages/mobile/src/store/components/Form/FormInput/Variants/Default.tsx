import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Eye from '../../../icons/Eye';
import EyeCancelled from '../../../icons/EyeCancelled';
import TextInput from '../../../ui/Input/Input';
import { TextInputProps } from '../../../ui/Input/types';


const defaultStyles = StyleSheet.create({
    withPasswordInput: {
        flex: 1
    },
    withPasswordInputContainerStyles: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    passwordEyeContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16
    }
})


const DefaultTextInput: FC<TextInputProps> = (props) => {
    const [showPassword, setPassword] = useState(props?.isPassword)
    const passwordToggle = () => setPassword((pred)=>!pred)


    const PasswordEyeComponent = useCallback(() => {
        if(!props?.isPassword) return null
        return <TouchableOpacity onPress={passwordToggle} style={defaultStyles.passwordEyeContainer}>
            {showPassword ? <Eye/> : <EyeCancelled/> }
        </TouchableOpacity>
    }, [showPassword, props?.isPassword])

    return <View>
        <Text style={props.styles?.placeholder}>{props.placeholder}</Text>
        <View style={[props.styles?.inputContainer, defaultStyles.withPasswordInputContainerStyles]}>
            <TextInput
                styles={[props.styles?.input, defaultStyles.withPasswordInput]}
                isInvalid={props.isInvalid}
                showPassword={showPassword}
                onChangeText={props.onChangeText}
                value={props.value}
            />
            <PasswordEyeComponent />
        </View>
    </View>
}

export default DefaultTextInput