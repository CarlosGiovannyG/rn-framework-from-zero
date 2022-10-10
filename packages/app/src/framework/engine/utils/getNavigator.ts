import { NavigatorType, RouteScreen } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import { createDrawerNavigator } from "@react-navigation/drawer";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const getNavigator = (compare?: string) => {
  switch (compare) {
    case NavigatorType.tab:
      return createBottomTabNavigator();
    case NavigatorType.drawer:
      return createNativeStackNavigator();
    case NavigatorType.stack:
      return createNativeStackNavigator();
    default:
      return createNativeStackNavigator();
  }
};

export { getNavigator };
