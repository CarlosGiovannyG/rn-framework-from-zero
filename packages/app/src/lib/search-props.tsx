import commerce from "./api/commerce";
import { Category, Brand, } from '@vercel/commerce-shopify/types/site';

const getSearchStaticProps: GetSearchStaticProps = async ({
  locale,
  locales,
}) => {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config })
  const siteInfoPromise = commerce.getSiteInfo({ config })
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

type GetSearchStaticProps = (props: {
  locale: string;
  locales: string[];
}) => Promise<{
  props: {
    pages: any;
    categories: Category[];
    brands: Brand;
  };
}>

export type SearchPropsType = typeof getSearchStaticProps

export default getSearchStaticProps