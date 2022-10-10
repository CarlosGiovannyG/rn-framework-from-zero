import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, {FC, useEffect, useMemo, useState} from 'react';
import Text from '../ui/Text';
import {View} from 'react-native';

type RichTextProps = {
  text: string;
  context?: string;
  style?: any;
};

type ConnectedType = {
  context?: string;
};

const useSharedValue = ({context}: ConnectedType) => {
  if (!context) return null;
  const {hooks} = useExtension();
  //@ts-ignore
  const fn = hooks[context];
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if(typeof fn !== 'function') return;
    fn().then((res: any) => setResponse(res));
  }, []);

  return response;
};

const RichText: FC<BlockComponent<RichTextProps>> = ({
  props: {text, context, style},
  children,
}) => {
  const TextStyles = useStyles(style);
  const sharedValue = useSharedValue({context});
  const childrens = useChildren({children});

  const computedText = useMemo(() => {
    let result = text;
    if (context && sharedValue && text) {
      result = addVarToString(result, sharedValue);
    }
    return result;
  }, [text, sharedValue]);

  if (typeof text === 'undefined') {
    return (
      <View style={TextStyles?.container}>
        <Text style={TextStyles?.text}>{childrens}</Text>
      </View>
    );
  }

  return <Text style={TextStyles?.text}>{computedText}</Text>;
};

export default RichText;
