import {useStyleguide} from '@my-app/app/src/framework/styleguide/context';
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import ArrowDown from '../../../icons/ArrowDown';
import TextInput from '../../../ui/Input/Input';
import {TextInputProps} from '../../../ui/Input/types';
const PhoneNumber: FC<TextInputProps> = props => {
  const {
    theme: {palette},
  } = useStyleguide();
  const InteractionStyle = props?.isInvalid
    ? {borderColor: palette.error.main}
    : !props?.isInvalid && props?.value
    ? {borderColor: palette.success.main}
    : null;

  return (
    <>
      <Text style={props.styles?.placeholder}>{props.placeholder}</Text>
      <View style={[props.styles?.inputContainer, InteractionStyle]}>
        <Text style={props.styles?.flag}>🇨🇴</Text>
        <Text style={props.styles?.code}>+57</Text>
        <ArrowDown />
        <TextInput
          styles={props.styles?.input}
          isInvalid={props.isInvalid}
          onChangeText={props.onChangeText}
          value={props.value}
        />
      </View>
    </>
  );
};

export default PhoneNumber;
