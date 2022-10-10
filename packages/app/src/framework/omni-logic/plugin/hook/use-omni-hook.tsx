import { useCallback } from 'react';
import useOmniHook, { UseOmniHook } from '../../kernel/hook/use-omni-hook';
import { HookFetcherOptions, MutationHook } from '../../kernel/utils/types';
import set from 'lodash.set'
import { customerAccessTokenCreateMutation, getAllProductsQuery, getCollectionProductsQuery, getCustomerQuery } from '@vercel/commerce-shopify/utils';
import { addVarToString } from '../utils/addVarToString';
import isArray from 'lodash.isarray';
import get from 'lodash.get';
import { useCommons } from '../../kernel/utils/use-hook';
import { makeid } from '../../../engine/utils/randomKey';

export default useOmniHook as UseOmniHook<typeof handler>;


const VarDefinitions = {
  array: [],
  varchar: "",
  object: {},
  bool: false,
  float: 0.0,
  int: 0,
};


type obj = { [x: string]: any }
interface ParseResponse<TO = unknown, FROM = unknown> {
  from: FROM;
  to: TO;
}
type Action = any

type ExecParams = {
  [x: string]: unknown
  template: {
    [x: string]: any
  }
  input: {
    exec: Action[]
  },
  options: HookFetcherOptions
}




const parseQueryInput = (response: any, output: { [x: string]: any }, to: { [x: string]: any },) => {
  if (typeof response === 'object') {
    const keys = Object.keys(response);
    keys?.forEach((key) => {
      if (response.hasOwnProperty(key)) {
        if (typeof response[key] == 'object') {
          parseQueryInput(response[key], output, to);
        } else {
          output[key] = addVarToString(response[key], to)
        }
      }
    });
  } else {
    Object.assign(output, addVarToString(response, to))
  }
};
const findPath = (ob: any, key: string) => {
  const path: string[] = [];
  const keyExists = (obj: { [x: string]: any }): boolean => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    }
    else if (obj?.hasOwnProperty(key)) {
      return true;
    }
    else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : "";

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i]);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k]);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };

  keyExists(ob);

  return path.join(".");
}
export const objectKeyhasher = (object: obj) => {
  const recursive = (object: obj) => {
    for (const [key, value] of Object.entries(object)) {
      const id = makeid(4)
      const keyObj = key + "#" + id
      object[keyObj] = value
      delete object[key]

      if (typeof value === 'object') {
        recursive(object[keyObj])
      }
    }
  }
  recursive(object)
}

export const objectKeyHashRemover = (object: obj) => {
  const recursive = (object: obj) => {
    for (const [key, value] of Object.entries(object)) {
      const keyObj = key?.replace(/#.*$/, "");
      object[keyObj] = value
      delete object[key]

      if (typeof value === 'object') {
        recursive(object[keyObj])
      }
    }
  }
  recursive(object)
}


export const parseResponse = (
  responses: any,
  parseInput: ParseResponse,
  exec: (action: Action) => any
) => {

  let parsed = {}
  const parseFromTo = async (response: any, output: { [x: string]: any }, parseResponse: any) => {
    if (!response) return;
    for (let key in response) {
      try {
        if (key in response) {
          let responseValue = response[key]
          if (isArray(responseValue) || typeof responseValue !== 'object') {

            if (responseValue?.includes("{") && responseValue?.includes("}")) {
              responseValue = responseValue?.replace(/[{}]/g, '')
            }

            const toPath = findPath(parseInput?.to, key)
            const val = get(parseResponse, responseValue) || responseValue
            if (!toPath.length) output[key] = val
            else {
              set(output, toPath + "." + key, val)
            }

          } else if (typeof responseValue == 'object') {
            if (responseValue?.pathValue && responseValue?.parseFunction) {
              const val = get(parseResponse, responseValue?.pathValue)
              const parsed = await exec({
                name: responseValue?.parseFunction,
                function: responseValue?.function,
                params: [val]
              })
              const toPath = findPath(parseInput?.to, key)
              if (!toPath.length) output[key] = parsed
              else {
                set(output, toPath + "." + key, parsed)
              }
            } else {
              parseFromTo(responseValue, output, parseResponse);
            }
          }
        }
      } catch (e) {
        console.log("Error in Hook Action", e)
      }
    }
  }



  objectKeyhasher(parseInput?.to as any)
  parseFromTo(parseInput?.to, parsed, responses)
  objectKeyHashRemover(parsed)
  return parsed
};




const ExecHandler = async ({ input, options, template, utils, ...AllExecResponses }: ExecParams, MainAction: Record<string, any>) => {

  let SharedData = {
    ...AllExecResponses
  }

  const exec = (action: Action) => {
    const actionParams = action.params.map((param: string) => {
      let to = {
        ...input
      }
      if (SharedData.hasOwnProperty(action.dependsOn)) {
        to = {
          ...to,
          ...SharedData[action.dependsOn]
        }
      }
      if (typeof param == 'object') {
        return parseResponse(to, { to: param }, exec);
      }
      return addVarToString(param, to)
    })

    return utils[action.name][action.function](...actionParams)
  };
  const onSuccess = (successActions: Action[]) => {
    successActions?.forEach(async (action) => {
      await exec(action)
    })
  }
  const onError = (errorActions: Action[]) => {
    console.log(errorActions)
  }

  for (let i = 0; i < template.exec.length; i++) {
    const action = template.exec[i]


    try {
      if (!MainAction[action.name]) {
        const execRes = await exec(action)
        SharedData = {
          ...SharedData,
          [action.name]: execRes
        }

      } else {
        // let output = {}


       // action?.params?.forEach((param) => parseQueryInput(param, output, SharedData))


        const actionParams = action?.params?.map((param: string) => {

          let to = {
            ...input
          }
          if (SharedData.hasOwnProperty(action.dependsOn)) {
            to = {
              ...to,
              ...SharedData[action.dependsOn]
            }
          }
          if (typeof param == 'object') {
            return parseResponse(to, { to: param }, exec);
          }
          return addVarToString(param, to)
        })

        const parsed = actionParams?.reduce(function (result, item) {
          if(typeof item == 'object'){
            result = {
              ...result,
              ...item,
            }
            return result
          }
          var key = Object.keys(item)[0]; //first property: a, b, c
          result[key] = item[key];
          return result;
        }, {}) || {}

        
        const response = await MainAction[action.name]({
          ...options,
          variables: {
            ...input,
            ...parsed
          },
          headerOptions: template?.headerOptions
        })

        if (template?.parseResponse) {

          const parsedResponses = parseResponse(response, template?.parseResponse, exec);
          SharedData = {
            ...SharedData,
            [template.name]: parsedResponses
          }
        } else {

          SharedData = {
            ...SharedData,
            [template.name]: response
          }
        }



      }
      onSuccess(action.onSuccess)
    } catch (e) {
      console.log(e)
      onError(action.onError)
    }

  }
  if (SharedData?.params) delete SharedData?.params
  return SharedData
}

const queries = {
  customerAccessTokenCreateMutation,
  getCustomerQuery,
  getAllProductsQuery,
  createOrganization: `mutation createOrganization($input: OrganizationInput!) {
      createOrganization(input: $input)@context(provider: "vtex.b2b-organizations-graphql")
         {
          id
          costCenterId
          href
          status
      }
    }`,
    addOrganizationUser: `mutation addUser($orgId: ID,$costId:ID, $roleId:ID!, $name:String!, $email:String!, ) {
      addUser(orgId: $orgId, costId:$costId,roleId: $roleId, name: $name, email:$email)@context(provider: "vtex.b2b-organizations-graphql")
         {
           id
          status
          message
         }
    }`
}

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher(defaultParams) {
    let params = {
      ...defaultParams,
      options: {
        ...defaultParams.options,
      }
    }
    const actions = {
      [params.template.name]: params.fetch
    }

    if (defaultParams.template?.fetchOptions?.query) {
      params.options.query = queries[defaultParams.template.fetchOptions.query]
    }
    if (defaultParams.template?.fetchOptions?.url) {
      params.options.url = defaultParams.template.fetchOptions.url
    }
    const execResponses = await ExecHandler(params, actions)

    console.log("ExecResponses", execResponses)
    return execResponses;
  },
  useHook:
    ({ fetch }) =>
      (params) => {
        const utils = useCommons()

        return useCallback(async function omniHook(input) {

          const cpyHooks = input?.hooks
          if (input?.hooks) delete input?.hooks
          const data = await fetch({
            input
          });

          type OmniMiddlewarew = { name: string | number; }


          const middlewaresParser = (middleware: OmniMiddlewarew) => {
            let hook = null
            if (cpyHooks.hasOwnProperty(middleware.name)) {
              hook = cpyHooks[middleware.name]
            } else {
              hook = utils[middleware.name][middleware.function]
            }
            return ({ hook, middleware })
          }

          const middles = params?.businessLogic?.middlewares?.map(middlewaresParser).filter((pred: any) => pred)
          if (middles?.length) {
            middles?.forEach(async (element) => {
              if (cpyHooks.hasOwnProperty(element.middleware.name)) {
                let allParams = {
                  hooks: cpyHooks
                }

                element?.middleware?.params?.forEach((param) => parseQueryInput(param, allParams, {
                  ...data[element?.middleware?.dependsOn],
                  ...input
                }))

                const middlewareResponse = await element.hook(allParams)
                console.log("MDRes", middlewareResponse)
              } else {
                // Este parser esta bueno
                const actionParams = element?.middleware?.params?.map((param: string) => {
                  let to = {
                    ...input
                  }
                  if (data.hasOwnProperty(element?.middleware?.dependsOn)) {
                    to = {
                      ...to,
                      ...data[element?.middleware?.dependsOn]
                    }
                  }
                  if (typeof param == 'object') {
                    return parseResponse(to, { to: param }, exec);
                  }
                  return addVarToString(param, to)
                })

                const middlewareResponse = await element.hook(...actionParams)
                console.log("MDRes", middlewareResponse)
              }


            });

          }
          return data;
        }, [fetch, params, utils]);
      },
};
