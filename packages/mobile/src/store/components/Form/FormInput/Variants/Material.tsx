import React, { FC } from 'react'
import { View, Text } from 'react-native';
import TextInput from '../../../ui/Input/Input';
import { TextInputProps } from '../../../ui/Input/types';
const Material: FC<TextInputProps> = (props) => {
    return <View style={props.styles?.inputContainer}>
        <Text style={props.styles?.placeholder}>{props.placeholder}</Text>
        <TextInput
            styles={props.styles?.input}
            isInvalid={props.isInvalid}
            onChangeText={props.onChangeText}
            value={props.value}
        />
    </View>
}

export default Material