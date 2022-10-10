import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Check} from '../../../icons';
import Text from '../../Text';
import {OptionItem as OptionItemType} from './type';

const OptionItem: FC<OptionItemType> = ({
  title,
  description,
  value,
  styles,
  isSelected,
  onPress,
  multiSelected,
  selectedValue,
  children,
}) => {
  const [selected, setSelected] = useState(false);
  const childrens = useChildren({children});

  useEffect(() => {
    setSelected(isSelected(value));
  }, [multiSelected.length, selectedValue]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value);
        setSelected(isSelected(value));
      }}>
      <View
        style={[
          styles.itemContainerStyle,
          selected && styles.itemContainerStyleSelected,
        ]}>
        <View style={[defaultStyles.circle, styles.circle]}>
          <View style={selected && defaultStyles.isSelected}>
            {selected && (
              <Check stroke={styles.circleCheck?.stroke || '#000'} />
            )}
          </View>
        </View>
        <View style={defaultStyles.descriptionContainer}>
          {title && <Text style={styles.itemTitleStyle}>{title}</Text>}
          {description && (
            <Text style={[styles.itemDescriptionStyle]}>{description}</Text>
          )}
          {!title && !description && childrens && (
            <View style={[defaultStyles.containerChild, styles?.container]}>
              {childrens}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
  },
  circle: {
    borderRadius: 32,
    width: 32,
    height: 32,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isSelected: {
    backgroundColor: '#25D366',
    borderRadius: 26,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChild: {
    paddingLeft: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
});

export default OptionItem;
