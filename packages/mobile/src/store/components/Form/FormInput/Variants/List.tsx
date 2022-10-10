import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import TextInput from '../../../ui/Input/Input';
import { TextInputProps } from '../../../ui/Input/types';
import OptionsListComponent, { OptionsListProps } from '../../../ui/OptionsList';

const ListInput: FC<OptionsListProps & TextInputProps> = (props) => {
    console.log(props.value)
    return <OptionsListComponent {...props} />
}

export default ListInput