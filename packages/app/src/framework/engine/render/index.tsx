import React, { FC, memo, useMemo } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native';
import getNavigatorLinkingConfig from '../utils/getNavigatorLinkingConfig';
import { getNavigator, } from '../utils/getNavigator';
import { buildScreens } from '../utils/buildScreens';
import isEqual from 'lodash.isequal'
import { useEngine } from '../contex';

const Render: FC = () => {
    const { routes } = useEngine();
    const Root = useMemo(() => getNavigator(routes.rootType), [routes]);
    const RootScreens = useMemo(() => buildScreens(routes), [routes]);
    
    const linking = useMemo(() => ({
        prefixes: routes.prefixes || [],
        config: {
            screens: getNavigatorLinkingConfig(routes),
        },
    }), [routes]);


    return <NavigationContainer linking={linking}>
        <Root.Navigator initialRouteName={routes.initialRouteName}>
            {RootScreens}
        </Root.Navigator>
    </NavigationContainer>
}

export default memo(Render, isEqual)