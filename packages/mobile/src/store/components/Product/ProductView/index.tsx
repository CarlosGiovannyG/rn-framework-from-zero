
import React, {FC, Fragment, useCallback, useEffect, useRef} from 'react';
import ProductCard from '../ProductCard';
import {Product} from '@vercel/commerce/types/product';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Text from '../../ui/Text';
import ButtonLoading from '../../ui/Button/Loading';
import Image from '../../ui/Image';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import AddToCartButton from '../AddToCart';
import usePrice from '@vercel/commerce-shopify/product/use-price';

interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductView: FC<ProductViewProps> = ({product, relatedProducts}) => {
  //console.log('images', JSON.stringify(product?.images[0]?.url));

  const renderFlatListItem = useCallback(
    (product: any) => (
      <ProductCard
        key={product.item?.id}
        noNameTag
        product={product.item}
        variant="simple"
        imgProps={{
          width: 100,
          height: 100,
        }}
      />
    ),
    [],
  );

  const {price} = usePrice({
    amount: product?.price?.value,
    baseAmount: product?.price?.retailPrice,
    currencyCode: product?.price?.currencyCode!,
  });

  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    if (product) {
      <ActivityIndicator />;
    }
  }, [product]);
 
  return (
    <Fragment>
      <View style={defaultStyles.container}>
        {product ? (
          <>
            <View style={defaultStyles?.imageContainerProductDetail}>
              {product?.images?.length && (
                <Image src={product?.images[0]?.url} height={300} width={300} />
              )}
            </View>

            <View style={defaultStyles.header}>
              <Text style={defaultStyles.name}>{product?.name}</Text>
              <Text style={defaultStyles.vendor}>{product?.vendor}</Text>
              <View style={defaultStyles.price}>
                <Text>{`${price} ${product?.price?.currencyCode}`}</Text>
              </View>
            </View>
          </>
        ) : (
          <ActivityIndicator />
        )}

        {!product ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={defaultStyles.title}>Description</Text>
            <View style={defaultStyles.containerDescription}>
              <Text style={defaultStyles.description}>
                {product.description}
              </Text>
            </View>
          </>
        )}

        {!relatedProducts.length ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={defaultStyles.title}>Related Products</Text>
            <View style={defaultStyles.container}>
              <FlatList
                ref={flatListRef}
                key={makeid(5)}
                //style={}
                data={relatedProducts}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                horizontal={true}
                renderItem={renderFlatListItem}
                onEndReachedThreshold={0.5}
                //ListEmptyComponent={() => children}
              />
            </View>
          </>
        )}
      </View>
      {product && product?.variants?.length ? (
        <AddToCartButton
          productId={product?.id}
          variantId={product?.variants[0]?.id}
        />
      ) : (
        <>
          <ActivityIndicator />
        </>
      )}
    </Fragment>
  );
};

export default ProductView;

const defaultStyles = StyleSheet.create({
  header: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
