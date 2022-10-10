import React, { FC } from 'react'
import { Product } from '@vercel/commerce/types/product';
import { StyleSheet, View } from 'react-native';
import Link from '../../ui/Link';
import ProductModes from './Views'
//import ProductTag from '../ProductTag'

interface Props {
  style?: string
  product: Product
  noNameTag?: boolean
  //imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  imgProps: {
    width: number
    height: number
  }
  variant?: 'default' | 'slim' | 'simple'
}

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  style,
  noNameTag = false,
  variant = 'default',
}) => {
  return (
    <View style={defaultStyles.productContainer}>
      <Link href={`/product/${product?.slug}`}>
        {ProductModes[variant]({
          image: {
            src: product.images[0].url,
            height: imgProps.height,
            width: imgProps.width
          },
          product,
          noNameTag
        })}
      </Link>
    </View>

  )
}

const defaultStyles = StyleSheet.create({
  productContainer: {
    flex: 1,
  },
});

export default ProductCard