import React, { createContext, FC, useContext, useEffect } from 'react';
import { useInterpret, useActor } from '@xstate/react';
import { createMachine, interpret } from 'xstate';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider: FC<{ children: React.ReactElement }> = (props) => {

    const authMachine = createMachine(
        {
            id: "authentication",
            initial: "unauthorized",
            context: {
                newLink: null,
                user: null,
                errorMessage: null,
            },
            states: {
                unauthorized: {
                    on: {
                        LOGIN: {
                            target: "loading",
                            actions: ["onLoading"],
                        }
                    },
                },
                loading: {
                    on: {
             
                        LOGIN_SUCCESS: {
                            target: "authorized",
                            actions: ["onSuccess"],
                        },
                        LOGIN_ERROR: {
                            target: "unauthorized",
                            actions: ["onError"],
                        },
                    },
                },
                authorized: {
                    on: {
                        LOGIN_BUSINESS_DATA: {
                            actions: ["setData"],
                        },
                        LOGOUT: "unauthorized",
                    },
                },
            },
        },
        {
            actions: {
                setData: (context, event) => {
                    if(event?.user?.businessData){
                        context.user.businessData = event.user.businessData
                    }
                },
                onLoading: (context, event) => {
                    console.log(context,event)
                    if(event?.user){
                        context.user = event.user
                    }
                },
                onSuccess: (context, event) => {
                    if (event.reverse) {
                        context.newLink = "/";
                    } else {
                        context.newLink = null;
                    }
                    context.errorMessage = null;
                },
                onError: (context, event) => {
                    if (event.reverse) {
                        context.newLink = null;
                    } else {
                        context.newLink = "/login";
                    }
                    context.errorMessage = event.errorMessage;
                },
            },
        }
    )


    const authentication = useInterpret(authMachine);
    
    const authActor = useActor(authentication)
    const [{value, context}] = authActor
    
    console.log({value, context})
    return (
        <GlobalStateContext.Provider value={{ authentication: {
            interpreted: authentication,
            actor: authActor
        } }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};



export function useGlobalState() {
    return useContext(GlobalStateContext)
  }
  