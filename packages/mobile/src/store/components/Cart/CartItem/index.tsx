import {ChangeEvent, useEffect, useState} from 'react';
import Image from '../../ui/Image';
import Link from '../../ui/Link';
//import { useUI } from '@components/ui/context'
import usePrice from '@vercel/commerce-shopify/product/use-price';
import useUpdateItem from '@vercel/commerce-shopify/cart/use-update-item';
import useRemoveItem from '@vercel/commerce-shopify/cart/use-remove-item';
import Quantity from '../../ui/Quantity';
import {LineItem} from '@vercel/commerce/types/cart';
import {View, StyleSheet} from 'react-native';
import Text from '../../ui/Text';

type ItemOption = {
  name: string;
  nameId: number;
  value: string;
  valueId: number;
};

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display';
  item: LineItem;
  currencyCode: string;
}) => {
  //const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem({item});

  const {price} = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  });

  const handleChange = async ({
    target: {value},
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    await updateItem({quantity: Number(value)});
  };

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    await updateItem({quantity: val});
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem(item);
    } catch (error) {
      setRemoving(false);
    }
  };

  // TODO: Add a type for this
  const options = (item as any).options;

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  return (
    <>
      <View style={defaultStyles.container}>
        <Link href={`/product/${item.path}`}>
          {item.variant.image?.url && (
            <Image width={150} height={150} src={item.variant.image?.url} />
          )}
        </Link>
      </View>
      <View style={defaultStyles.container}>
        <Link href={`/product/${item.path}`}>
          <Text style={defaultStyles.name}>{item.name}</Text>
        </Link>
        {options && options.length > 0 && (
          <View style={defaultStyles.container}>
            {options.map((option: ItemOption, i: number) => (
              <Text
                key={`${item.id}-${option.name}`}
                style={defaultStyles.name}>
                {option.name}
                {option.name === 'Color' ? (
                  <View
                    style={{
                      backgroundColor: `${option.value}`,
                    }}></View>
                ) : (
                  <Text style={defaultStyles.name}> {option.value}</Text>
                )}
                {i === options.length - 1 ? (
                  ''
                ) : (
                  <Text style={defaultStyles.title}> {'OPTIONS'} </Text>
                )}
              </Text>
            ))}
          </View>
        )}
        {variant === 'display' && (
          <View style={defaultStyles.container}>{quantity}x</View>
        )}
      </View>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.price}>{price}</Text>
      </View>

      {variant === 'default' && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
      )}
    </>
  );
};

export default CartItem;

const defaultStyles = StyleSheet.create({
  header: {
    height: 100,
    width: '100%',
    justifyContent: 'flex-start',
    padding: 10,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: '#000',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  containerDescription: {
    padding: 10,
    justifyContent: 'center',
  },

  vendor: {
    fontSize: 14,
    fontWeight: '800',
    color: '#a1a1a1',
  },

  containerProductDetail: {
    flexDirection: 'row',
  },
  imageContainerProductDetail: {
    //padding:100,
    //marginTop:100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
