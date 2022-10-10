export enum NavigatorType {
  stack = "Stack",
  drawer = "Drawer",
  tab = "Tab",
  component = "Component",
}

export interface Route {
  rootType?: NavigatorType;
  initialRouteName?: string;
  options?: any;
  prefixes?: string[];
  screens: Record<string, RouteScreen>;
}

export interface RouteScreen {
  type: NavigatorType;
  path?: string;
  exact?: boolean;
  initialRouteName?: string;
  unmountIfIsAuthenticated?: boolean;
  options?: any;
  screens?: Record<string, RouteScreen>;
}


export interface StackProps {
  screens: Record<string, RouteScreen>
  screenName: string
  navigator?: any
}

export interface BlockComponent<P = any> {
  children: Partial<BlockComponent>[]
  props: P
  componentName: string
}

export interface Block {
  [x: string]: Partial<BlockComponent>
}

export type EngineProps = {
  routes: Route
  blocks: BlockComponent
  rawHooks: any
}