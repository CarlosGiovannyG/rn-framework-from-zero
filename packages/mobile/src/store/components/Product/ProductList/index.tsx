import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import getSearchStaticProps from '@my-app/app/src/lib/search-props';
import ProductCard from '../ProductCard';
import { makeid } from '@my-app/app/src/framework/engine/utils/randomKey';
import { FlatList, View } from 'react-native';
import { useExtension } from '@my-app/app/src/framework/engine/extension/context';
const GetStoreProps = async () => {
  const searchProps = await getSearchStaticProps({
    locale: 'es-CO',
    locales: [],
  });
  return {
    props: {
      ...searchProps.props,
    },
  };
};

const ProductList: FC = ({ props: { numColumns } }) => {
  const searchQuery = {
    search: '',
    categoryId: undefined,
    brandId: undefined,
    sort: '',
    locale: 'es-CO',
  };
  const [data, setData] = useState({
    products: []
  })
  const { hooks } = useExtension();
  const context = "useSearch"
  const submit = hooks[context]

  const componentDidMount = async () => {
    const products = await submit({
      ...searchQuery,
      hooks
    })
    setData(products[context])
  }

  useEffect(() => {
    componentDidMount()
    GetStoreProps().then(res => {
      console.log(JSON.stringify(res));
    });
  }, []);

  const renderFlatListItem = useCallback(
    product => (
      <ProductCard
        key={makeid(5)}
        product={product.item}
        variant="simple"
        imgProps={{
          width: 200,
          height: 200,
        }}
      />
    ),
    [],
  );



  const flatListRef = useRef<FlatList>(null);

  return (
      <FlatList
        ref={flatListRef}
        key={makeid(5)}
        style={{flex: 1}}
        data={data?.products}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        numColumns={numColumns}
        renderItem={renderFlatListItem}
        onEndReachedThreshold={0.5}
      //ListEmptyComponent={() => children}
      />
  );
};

export default ProductList;