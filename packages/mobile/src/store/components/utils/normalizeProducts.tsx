import { normalizeProduct } from "@vercel/commerce-shopify/utils";

const NormalizeProduct = (products: any[]) => {
    console.log("Enter Normalize", products)
    return products.map((product)=>normalizeProduct(product.node))
}
export default NormalizeProduct