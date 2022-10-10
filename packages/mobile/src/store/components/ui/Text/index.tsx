import React, {FC, memo, useCallback} from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';
import isEqual from 'lodash.isequal'

interface TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: (...args:any) => any;
}

const Text: FC<TextProps> = ({children, style, onPress}) => {
  return <RNText onPress={onPress} style={style}>{children}</RNText>;
};

export default  memo(Text, isEqual);
