/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, memo, useMemo } from "react";
import { NavigatorType, Route } from "../types";
import { getNavigator } from "./getNavigator";
import { makeid } from "./randomKey";
import ExtensionComponent from "../extension/ExtensionComponent";
import isEqual from "lodash.isequal";

const ChildrenStack = (screens: Route["screens"], name: string) => {
  const RootChildren = getNavigator(screens[name].type);
  const ChildrenScreens = buildScreens({
    screens: screens[name].screens as Route["screens"],
  });
  const Screens: FC = (props) => (
    <RootChildren.Navigator
      key={name}
      screenOptions={screens[name].options}
      {...props}
    >
      {ChildrenScreens}
    </RootChildren.Navigator>
  );
  
  return memo(Screens, isEqual);
};

export const buildScreens = ({ screens, rootType }: Route) => {
  const Root = getNavigator(rootType);

  return Object.keys(screens).map((value, index) => {
    if (screens[value].type !== NavigatorType.component) {
      const Screens = ChildrenStack(screens, value);
      return (
        <Root.Screen
          key={`${value}-${index}`}
          name={value}
          options={screens[value].options}
          component={Screens}
        />
      );
    } else {
      return (
        <Root.Screen
          key={`${value}-${index}`}
          name={value}
          options={screens[value].options}
          component={ExtensionComponent}
        />
      );
    }
  });
};



/*
  Deuda:
  "IfConditional" - Arreglar subject
  "Handlers" = Cambiar Parametros a dinamicos
  
  interface OmniComponent {
  type: string;
  componentHooks: ComponentHook[];
  componentChildrens: Children[];
}

type ComponentHook = {
  name: "useRoute" | "useSearch";
  parseResponse: ParseResponse;
};

type Children = {
  type: string;
  styles: {
    [x: string]: unknown;
  };
  props: {
    [x: string]: unknown;
  };
  children: Children[];
};

interface ParseResponse<TO = unknown, FROM = unknown> {
  from: FROM;
  to: TO;
}

interface Hooks {
  useRoute: typeof useRoute;
  useSearch: typeof useSearch;
}

type ExecAction = {
  If: Conditions["If"];
  ElseifContainer: Conditions["ElseifContainer"];
};

enum Verb {
  is = "is",
  isNot = "is-not",
  notContain = "not-contain",
  all = "all",
  any = "any",
  none = "none",
}

type VerbType =
  | Verb.is
  | Verb.isNot
  | Verb.notContain
  | Verb.all
  | Verb.any
  | Verb.none;

interface Condition {
  subject: string;
  verb: VerbType;
  object: string;
}

interface Conditions {
  If: Condition[];
  ElseifContainer: Condition[][];
}

function getDescendantProp(value: any, propPath: any) {
  const arr = propPath.split(".");
  while (arr.length) {
    value = value[arr.shift()];
  }
  return value;
}

const isValidation = (condition: Condition, value: string) =>
  condition.object === value;
const isNotValidation = (condition: Condition, value: string) =>
  condition.object !== value;

const Verbs = {
  is: isValidation,
  isNot: isNotValidation,
};

const IfConditionValidate = (conditions: Conditions, params: any) => {
  const result: boolean[] = [];
  if (conditions.If) {
    conditions.If.forEach((condition) => {
      const value = getDescendantProp(params, condition.subject);
      if (condition.verb == Verb.is) {
        const tValidation = Verbs.is(condition, value);
        result.push(tValidation);
      } else if (condition.verb == Verb.isNot) {
        const tValidation = Verbs.isNot(condition, value);
        result.push(tValidation);
      } else {
        result.push(false);
      }
    });
  }
  return result;
};

const ElseIfConditionValidate = (conditions: Conditions, params: any) => {
  if (conditions.ElseifContainer) {
    return conditions.ElseifContainer.map((condition) => {
      const result: boolean[] = [];
      condition.forEach((condition) => {
        const value = getDescendantProp(params, condition.subject);
        if (condition.verb == Verb.is) {
          const tValidation = Verbs.is(condition, value);
          result.push(tValidation);
        } else if (condition.verb == Verb.isNot) {
          const tValidation = Verbs.isNot(condition, value);
          result.push(tValidation);
        } else {
          result.push(false);
        }
      });
      return result;
    }).filter((fc) => fc.length);
  }
  return [];
};

export const IfConditionalHandler = (
  conditions: Conditions,
  valueToCompare: string
) => {
  const Validate = () => {
    const IfCondition = IfConditionValidate(conditions, valueToCompare).filter(
      (condition) => condition === false
    );
    const ElseIfCondition = ElseIfConditionValidate(conditions, valueToCompare);

    const r = ElseIfCondition.filter((elifcondition) =>
      elifcondition.find((elifV) => elifV === true)
    );

    if (!IfCondition.length) {
      return true;
    } else if (r.length) {
      return true;
    }
    return false;
  };

  return Validate();
};

const useSearch = () => {
  const test = useRoute();
  return test;
};

const AvailableHooks: Hooks = {
  useRoute,
  useSearch,
};

const importHooks = (componentHooks: OmniComponent["componentHooks"]) => {
  return componentHooks.map((value) => {
    if (value.name in AvailableHooks) {
      return AvailableHooks[value.name];
    }
  }) as (() => unknown)[];
};

const getVariables = (obj: Record<string, unknown>) => {
  const VarDefinitions = {
    list: [],
    varchar: "",
    object: {},
    bool: false,
    float: 0.0,
    int: 0,
  };
  let vars = {};

  if ("variables" in obj) {
    const keys = Object.keys(obj.variables);

    keys.forEach((val) => {
      vars = {
        [val]: {
          value: VarDefinitions[obj.variables[val].type],
          type: obj.variables[val].type,
        },
      };
    });
  }
  return vars;
};

const Handlers = {
  If: IfConditionalHandler,
};

const parseResponse = (
  responses: any,
  componentHooks: OmniComponent["componentHooks"],
  index: number
) => {
  const toParse: Record<string, unknown>[] = [];
  const toParseActions: Record<string, unknown>[] = [];
  const from = componentHooks[index].parseResponse.from;

  const getDataToParse = (obj: any) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (key in obj) {
        if (obj[key]) {
          if (obj[key]?.type) {
            toParse.push(obj[key]);
          } else {
            getDataToParse(obj[key]);
          }
        }
      }
    });
  };

  const def = {
    params: {
      department: "elpipe",
      category: "elpipe2",
      subCategory: "elpipe3",
      collection: "elpipe4",
      brand: "elpipe5",
      priceRange: "elpipe6",
    },
  };

  const addTo = (value: any, vars: any) => {
    vars.push(value);
  };

  const HandlersList = {
    "add-to": addTo,
    "delete-of": addTo,
    "delete-all-off": addTo,
    "insert-at-of": addTo,
    "remplace-item-of-with": addTo,
    "item-of": addTo,
    "item-number-of-in": addTo,
    "length-of": addTo,
    "show-list": addTo,
  };

  const HandlersVarchar = {
    "length-of": addTo,
    add: addTo,
  };

  const HandlersObject = {
    keys: addTo,
  };

  const actionsHandler = (actions: any, variable: any) => {
    const HandlersNom = {
      list: HandlersList,
      varChar: HandlersVarchar,
      object: HandlersObject,
    };

    actions.map((action) => {
      const varsHandler = HandlersNom[variable[action.to].type];

      const handler = varsHandler[action.type];

      handler(action.value, variable[action.to].value);
    });
  };

  const exec = (action: ExecAction, vars: any) => {
    const responses = Object.keys(action).map((key, index) => {
      const execReponse = Handlers[key](action, def);
      if (key === "If" && execReponse) {
        actionsHandler(action[key][index].actions, vars);
      }
    });

    console.log("EXEC", responses);
  };

  const parse = (val: Record<string, unknown>, index: number) => {
    const vars = getVariables(val);

    const actions = val?.onExec as ExecAction[];
    actions?.forEach((element) => {
      exec(element, vars);
    });

    console.log("VARIABLES", vars);
  };
  getDataToParse(from);
  toParse.map(parse);

  return responses;
};

const execHooks = (
  hooks: (() => unknown)[],
  componentHooks: OmniComponent["componentHooks"]
) => {
  return hooks
    .filter((pred) => pred)
    .map((hook, index) => {
      const main = hook();
      const parsedResponses = parseResponse(main, componentHooks, index);
      console.log(parsedResponses);
      return main;
    });
};

const OminComponent: FC<OmniComponent> = ({
  type,
  componentHooks = [],
  componentChildrens,
}) => {
  const hooks = importHooks(componentHooks);
  const hooksResponses = execHooks(hooks, componentHooks);

  return <></>;
};

const NomenclaturesInterfaces = {
  conditions: [
    {
      title: "If",
      type: "array",
      items: {
        subject: {
          type: "string",
        },
        verb: {
          type: "string",
        },
        object: {
          type: "string",
        },
      },
    },
  ],
  variables: [
    {
      title: "variables",
      type: "object",
      properties: {
        list: {
          title: "list",
          type: "object",
          properties: {
            list: {
              type: "array",
            },
            "add-to": {
              type: "object",
              properties: {
                value: "string",
                to: "string",
              },
            },
            "delete-of": {},
            "delete-all-off": {},
            "insert-at-of": {},
            "remplace-item-of-with": {},
            "item-of": {},
            "item-number-of-in": {},
            "length-of": {
              type: "integer",
            },
            "show-list": {},
          },
        },
        varchar: {
          title: "varchar",
          type: "object",
          properties: {
            "length-of": {
              type: "integer",
            },
            add: {
              type: "string",
            },
          },
        },
        object: {
          title: "object",
          type: "object",
          properties: {
            keys: {
              type: "array",
            },
          },
        },
        float: {
          title: "float",
          type: "number",
        },
        int: {
          title: "int",
          type: "integer",
        },
        bool: {
          title: "bool",
          type: "boolean",
        },
      },
    },
  ],
};

const Component = {
  ProductSummary: {
    type: "omni-component",
    props: {
      columns: "string",
      emptyState: "string",
    },
    componentHook: [
      {
        name: "useRoute",
        paramsType: {
          params: {
            department: "string",
          },
        },
        parseResponse: {
          from: {
            params: {
              map: {
                type: "object",
                return: "newMap",
                variables: {
                  newMap: {
                    type: "list",
                    value: [],
                  },
                },
                onExec: [
                  {
                    If: [
                      {
                        subject: "params.department",
                        verb: "is",
                        object: "elpipe",
                        actions: [
                          {
                            type: "add-to",
                            value: "category-1",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    If: [
                      {
                        subject: "params.category",
                        verb: "is",
                        object: "elpipe2",
                        actions: [
                          {
                            type: "add-to",
                            value: "category-2",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    If: [
                      {
                        subject: "params.subCategory",
                        verb: "is",
                        object: "elpipe3",
                        actions: [
                          {
                            type: "add-to",
                            value: "category-3",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    If: [
                      {
                        subject: "params.collection",
                        verb: "is",
                        object: "elpipe4",
                        actions: [
                          {
                            type: "add-to",
                            value: "productClusterIds",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    If: [
                      {
                        subject: "params.brand",
                        verb: "is",
                        object: "elpipe5",
                        actions: [
                          {
                            type: "add-to",
                            value: "brand",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    If: [
                      {
                        subject: "params.priceRange",
                        verb: "is",
                        object: "elpipe6",
                        actions: [
                          {
                            type: "add-to",
                            value: "priceRange",
                            to: "newMap",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              query: {
                type: "object",
              },
            },
          },
          to: {
            map: "params.map",
          },
        },
      },
    ],
    children: [
      {
        type: "Flatlist",
        props: {
          data: "{imageUrl}",
        },
        styles: {
          justifyCenter: "center",
          alignItems: "center",
        },
        children: [
          {
            type: "Text",
            props: {
              text: "{text}",
            },
          },
        ],
      },
    ],
  },
};
 */
