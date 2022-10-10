import React, {FC} from 'react';
import {View} from 'react-native';
import {Cross, Plus, Minus} from '../../icons';
import Input from '../Input/Input';
import Button from '../Button';
export interface QuantityProps {
  value: number;
  increase: () => any;
  decrease: () => any;
  handleRemove: React.MouseEventHandler<HTMLButtonElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  max?: number;
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <View style={{flex: 1}}>
      <Button onPress={handleRemove}>
        <Cross width={20} height={20} />
      </Button>
      <View>
        <Input
          onChangeText={e =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          styles={{color: '#000'}}
          value={value}
          editable={false}
        />
      </View>
      <Button
        onPress={decrease}
        style={{marginLeft: '-1px'}}
        disabled={value <= 1 && true}>
        <Minus width={18} height={18} />
      </Button>
      <Button
        onPress={increase}
        style={{marginLeft: '-1px'}}
        disabled={value < 1 || value >= max}>
        <Plus width={18} height={18} />
      </Button>
    </View>
  );
};

export default Quantity;
