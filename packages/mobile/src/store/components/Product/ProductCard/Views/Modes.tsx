import usePrice from "@vercel/commerce-shopify/product/use-price"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Image from "../../../ui/Image"
import { ICard } from "../../types"


export const SlimMode = (props: ICard) => {
    return <View style={SlimStyles.container}>
        <View>
            <Text style={SlimStyles.productName}>{props?.product.name}</Text>
        </View>
        {props.image && (
            <View style={SlimStyles.imageContainer}>
                <Image
                    src={props.image.src}
                    height={props.image.height}
                    width={props.image.width}
                />
            </View>
        )}
    </View>
}

export const DefaultMode = (props: ICard) => {
    return <View style={DefaultStyles.container}>
        {props.product?.images && (
            <View style={DefaultStyles.imageContainer}>
                <Image
                    src={props.image.src}
                    height={props.image.height}
                    width={props.image.width}
                />
            </View>
        )}
    </View>
}

export const SimpleMode = (props: ICard) => {
    const { price } = usePrice({
        amount: props.product?.price?.value,
        baseAmount: props.product?.price?.retailPrice,
        currencyCode: props.product?.price?.currencyCode!,
    })

    return <View style={SimpleStyles.container}>
        {props?.image && (
            <Image
                style={SimpleStyles.image}
                src={props.image.src}
                height={props.image.height}
                width={props.image.width}
            />
        )}
        {!props.noNameTag && (
            <View style={SimpleStyles.wrap}>
                <Text style={SimpleStyles.productName}>
                    {props.product?.name}
                </Text>
                <View style={SimpleStyles.productPriceWrap}>
                    <Text style={SimpleStyles.productPrice}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
                </View>
            </View>
        )}
    </View>
}


const SlimStyles = StyleSheet.create({
    container: {

    },
    wrap: {

    },
    imageContainer: {

    },
    productName: {

    },
    productPrice: {

    }
})
const SimpleStyles = StyleSheet.create({
    container: {
  
        margin: 4,
        padding: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
    },
    wrap: {

    },
    productName: {
        fontWeight: "bold",
        marginTop: 8
    },
    productPriceWrap: {
    },
    productPrice: {
        marginTop: 8,
        fontSize: 20,

    },
    image: {
        
    }
})
const DefaultStyles = StyleSheet.create({
    container: {

    },
    wrap: {

    },
    imageContainer: {

    },
    productName: {

    },
    productPrice: {

    }
})


/* {process.env.COMMERCE_WISHLIST_ENABLED && (
      <WishlistButton
        style={s.wishlistButton}
        productId={product.id}
        variant={product.variants[0]}
      />
    )} */
