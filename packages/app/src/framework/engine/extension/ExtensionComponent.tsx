import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { memo } from "react"
import { importHooks, useEngine } from "../contex"
import useChildren from "../hooks/useChildren"
import isEqual from 'lodash.isequal'
import { ExtensionProvider } from "./context"

const ExtensionComponent = (props: NativeStackScreenProps<any, any>) => {
  const { blocks, rawHooks } = useEngine()
  const routeName = props.route.name
  const currentScreen = blocks[`store.${routeName}`]

  const importContext = currentScreen?.importContext || []

  const hooks = importHooks(rawHooks, importContext)

  const childrens = useChildren(currentScreen)


  return <ExtensionProvider data={{ hooks }}>{childrens}</ExtensionProvider>
}

export default memo(ExtensionComponent, isEqual)