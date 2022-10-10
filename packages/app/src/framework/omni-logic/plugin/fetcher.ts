/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { API_URL } from './const';
import { handleFetchResponse } from './utils';
import fetch from 'cross-fetch';
import { Fetcher } from '../kernel/utils/types';
import { API_URL } from '@vercel/commerce-shopify/const';
import CookieManager from '@react-native-cookies/cookies'

const generateCookies = async (url:string) => {
  let cookies = ''
  const allWebCookies = await CookieManager.get(url);

  for (const [_, { name, value }] of Object.entries(allWebCookies)) {
    cookies+=`${name}=${value}; `
  }
  return cookies
}

const fetcher: Fetcher = async ({
  url = API_URL,
  method = 'POST',
  variables,
  query,
  headerOptions
}) => {
  const { locale, ...vars } = variables ?? {};

  const Cookie = await generateCookies(url)

  const defaultHeaderOptions = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'X-Shopify-Storefront-Access-Token': API_TOKEN!,
    'Cookie': Cookie
  }
  
  const headers = new Headers(headerOptions ? headerOptions : defaultHeaderOptions);

  // if(Platform.OS === 'android') headers.append('Cookie', Cookie)

  console.log(headers.get('Cookie'))

  let fetcherOptions = {
    method,
    headers,
    ...(locale && {
      'Accept-Language': locale,
    }),
  }

  if (query && vars) {
    fetcherOptions.body = JSON.stringify({ query, variables: vars })
    console.log("Query:", url, fetcherOptions.body)
  }
  //@ts-ignore
  else if (vars && headerOptions['Content-Type'] === "application/x-www-form-urlencoded") {
    var formBody = [];
    for (var property in vars) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(vars[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    fetcherOptions.body = formBody.join("&");
  }
  return handleFetchResponse(
    await fetch(url, fetcherOptions)
  );
};

export default fetcher;

