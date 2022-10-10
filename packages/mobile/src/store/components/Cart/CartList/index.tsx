import useSearch from '@vercel/commerce-shopify/product/use-search';
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import getSearchStaticProps from '@my-app/app/src/lib/search-props';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {FlatList} from 'react-native';
import CartItem from '../CartItem';
import {useCart} from '@vercel/commerce-shopify/cart';
import usePrice from '@vercel/commerce/product/use-price';

const CartList: FC = ({props: {numColumns}}) => {
  const error = null;
  const success = null;
  const {data, isLoading, isEmpty} = useCart();

  const {price: subTotal} = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    },
  );
  const {price: total} = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    },
  );

  console.log('cart', JSON.stringify(data));
  useEffect(() => {
    // GetStoreProps().then(res => {
    //  // console.log(JSON.stringify(res));
    // });
  }, []);

  const renderFlatListItem = useCallback(
    item => (
      <CartItem key={item.id} item={item} currencyCode={data?.currency.code!} />
    ),
    [],
  );

  const flatListRef = useRef<FlatList>(null);

  return (
    <Fragment>
      <FlatList
        ref={flatListRef}
        key={makeid(5)}
        //style={}
        data={data?.lineItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        numColumns={numColumns}
        renderItem={renderFlatListItem}
        onEndReachedThreshold={0.5}
        //ListEmptyComponent={() => children}
      />
    </Fragment>
  );
};

export default CartList;

// {data?.products.slice(0, 3).map((product: any, i: number) => (
//     <ProductCard
//         key={product.id}
//         product={product}
//         variant='slim'
//         imgProps={{
//             width: 100,
//             height: 100,
//         }}
//     />
// ))}
