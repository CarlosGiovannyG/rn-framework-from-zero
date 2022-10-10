import { useAddItem } from '@vercel/commerce-shopify/cart';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native'
import Button from '../../ui/Button';
import Text from '../../ui/Text';
type CartProps = {
  // onPress: (...args:any) => 
  productId: string;
  variantId: string;
};

const AddToCartButton: FC<CartProps> = ({ productId, variantId }) => {
  const addItem = useAddItem();

  const addToCart = async () => {
    const res = await addItem({
      productId,
      variantId,
    });

    console.log("ADD to CArt", JSON.stringify(res))
  };

  return <Button style={[defaultStyles.buttonStyle]} onPress={addToCart} >
    <Text>Add To Cart</Text>
  </Button>;
};

export default AddToCartButton;


const defaultStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'orange',
    width: '100%',
    height: 50,
    borderRadius: 12,
    elevation: 10,
    justifyContent: 'center',
  },

});