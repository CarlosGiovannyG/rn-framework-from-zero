/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useStyleguide } from '@my-app/app/src/framework/styleguide/context';
import React, { FC, memo, useMemo, useState } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  ViewStyle,
  StyleSheet
} from 'react-native';
import { TextInputProps } from './types';
import isEqual from 'lodash.isequal'

const TextInput: FC<TextInputProps> = ({
  showPassword = false,
  placeholder,
  placeholderTextColor,
  onChange,
  onChangeText,
  isInvalid,
  value,
  styles,
  onBlur,
  onFocus,
  onSubmitEditing,
  keyboardType,
  maxLength,
  editable = true,
  componentRef
}) => {

  const { theme: { palette } } = useStyleguide()
  const [isFocus, setIsFocus] = useState(false)

  const WrapperStyles = useMemo(() => {
    let InteractionStyles = {};

    const errorStyles = {
      borderColor: palette.error.main,
    };

    const successStyles = {
      borderColor: palette.success.main,
    };

    const onFocusStyles = {
      borderColor: palette.primary.main,
    };

    if (isInvalid) {
      InteractionStyles = Object.assign(InteractionStyles, errorStyles);
    } else if (isFocus) {
      if (!isInvalid && value) {
        InteractionStyles = Object.assign(InteractionStyles, successStyles);
      } else {
        InteractionStyles = Object.assign(InteractionStyles, onFocusStyles);
      }
    } else if (!isInvalid && value) {
      InteractionStyles = Object.assign(InteractionStyles, successStyles);
    }

    const stylesContainers: ViewStyle[] = [
      styles?.inputContainer,
      InteractionStyles,
      defaultStyles?.inputContainer,
    ];

    return stylesContainers;
  }, [isInvalid, value, isFocus]);


  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(true);
    e.preventDefault()
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(false);
    e.preventDefault()
  };

  return (
    <RNTextInput
      ref={componentRef}
      style={[
        styles,
        WrapperStyles,
      ]}
      secureTextEntry={showPassword}
      onChangeText={onChangeText}
      onChange={onChange}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      editable={editable}
      keyboardType={keyboardType as KeyboardTypeOptions}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      maxLength={maxLength}
    />
  );
};

const defaultStyles = StyleSheet.create({
  inputContainer: {

  }
})

export default memo(TextInput, isEqual);
