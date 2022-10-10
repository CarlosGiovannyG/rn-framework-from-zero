import React, {FC, Fragment, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Product} from '@vercel/commerce/types/product';
import commerce from '@my-app/app/src/lib/api/commerce';
import ProductView from '../ProductView';
import ButtonLoading from '../../ui/Button/Loading';

const getProduct = async (slug: string, config: object) => {
  const productPromise = commerce.getProduct({
    variables: {slug: slug},
    config,
    preview: false,
  });

  const {product} = await productPromise;

  return product;
};

const allProducts = async (config: object) => {
  try {
    const allProductsPromise = commerce.getAllProducts({
      variables: {first: 4},
      config,
      preview: false,
    });

    const {products} = await allProductsPromise;
    return products;
  } catch (error) {}
};

interface ProductDetailProps {
  props: {
    relatedProducts?: boolean;
  };
}

const ProductDetail: FC<ProductDetailProps> = ({props}) => {
  const {params} = useRoute();
  const config = {
    locale: 'es-CO',
    locales: [],
  };

  const [product, setProduct] = useState<any>({});
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  useEffect(() => {
    getProduct(params!.slug, config).then(response => {
      setProduct(response);
    });
    if (props.relatedProducts) {
      allProducts(config).then(response => {
        setRelatedProducts(response);
      });
    }
  }, [params]);

  return (
    <Fragment>
      {!params?.slug && !product ? (
        <ButtonLoading />
      ) : (
        <ProductView product={product} relatedProducts={relatedProducts} />
      )}
    </Fragment>
  );
};

export default ProductDetail;
