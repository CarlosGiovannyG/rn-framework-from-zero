import React, { FC, useEffect, useRef } from "react";
import { useState } from "react";
import WebView from 'react-native-webview'
import CookieManager from '@react-native-cookies/cookies'
import AppStorage from "@my-app/app/src/framework/styleguide/utils/async-storage";
import Button from "../ui/Button";
import { View, StyleSheet } from "react-native";
import Text from "../ui/Text";
import { CommonActions, NavigationState, PartialState, Route, useNavigation } from "@react-navigation/native";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import fetcher from "@my-app/app/src/framework/omni-logic/plugin/fetcher";

function getURLParams(parameterName: string, url: string) {
    let name = parameterName.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const account = 'chedrauimx'
const config = {
    fetchUrl: `https://${account}.myvtex.com/_v/public/graphql/v1`,
    provider: 'Chedraui',
    domain: `https://${account}.myvtex.com`
}
type ResetState = PartialState<NavigationState> | NavigationState | (Omit<NavigationState, 'routes'> & {
    routes: Omit<Route<string>, 'key'>[];
});


interface SocialProps {
    resetAndRedirectTo: ResetState
}

const SocialButton: FC<BlockComponent<SocialProps>> = ({ props: { resetAndRedirectTo } }) => {
    const navigation = useNavigation()
    const [url, setUrl] = useState(null)
    const [cookies, setCookies] = useState<any>(null)
    const [generated, setGenerated] = useState<any>(null)
    const [user, setUser] = useState(null)
    const webview = useRef<WebView>(null)

    const getUserData = async () => {
        const rawData = await fetch(`https://${account}.myvtex.com/api/vtexid/pub/authenticated/user`, {
            headers: new Headers({
                Cookie: generated
            })
        })

        return await rawData.json()
    }

    const logout = async () => {
        const rawData = await fetch(`https://${account}.myvtex.com/api/vtexid/pub/logout?scope=${account}`, {
            headers: new Headers({
                Cookie: generated
            })
        })
        const logoutRes = await rawData.json()
        return logoutRes
    }

    const signout = async () => {
        await logout()
        const cookies = await CookieManager.get(config.domain)
        await CookieManager.clearAll()
        const cookiesKeys = Object.keys(cookies)

        setCookies(null)
        setGenerated(null)
        setUser(null)



        for (var i = 0; i < cookiesKeys.length; i++) {
            await AppStorage.removeValue(cookiesKeys[i])
            ++i;
        }

        await fetchProviderURL()

        webview.current?.reload()
    }


    const fetchProviderURL = async () => {
        const data = await fetcher({
            url: config.fetchUrl, query: `mutation {
            oAuth(provider:"${config.provider}", redirectUrl:"${config.domain}")
        } `})
        setUrl(data?.oAuth.replace('http', 'https'))
    }
    const componentDidMount = async () => {
        await fetchProviderURL()
        const userData = await getUserData()
        setUser(userData)
    }

    useEffect(() => {
        componentDidMount()
    }, [])

    const handleWebViewNavigationStateChange = async (
        newNavState: any
    ) => {
        const { url } = newNavState;
        if (!url) return;
        if (url.includes('/api/vtexid/oauth/finish')) {
            const authCookieName = getURLParams('authCookieName', url) || ""
            const authCookieValue = getURLParams('authCookieValue', url) || ""
            const accountAuthCookieName = getURLParams('accountAuthCookieName', url) || ""
            const accountAuthCookieValue = getURLParams('accountAuthCookieValue', url) || ""

            await Promise.all([
                CookieManager.set(config.domain, {
                    name: authCookieName,
                    value: authCookieValue,
                    path: '/',
                    version: '1',
                    expires: '2023-05-30T12:30:00.00-05:00',
                    secure: true,
                    httpOnly: true
                }),
                CookieManager.set(config.domain, {
                    name: accountAuthCookieName,
                    value: accountAuthCookieValue,
                    path: '/',
                    version: '1',
                    expires: '2023-05-30T12:30:00.00-05:00',
                    secure: true,
                    httpOnly: true
                }), 
                AppStorage.storeData(accountAuthCookieName, accountAuthCookieValue),
                AppStorage.storeData(authCookieName, authCookieValue)
            ])

            const userData = await getUserData()

            setUser(userData)
            setGenerated(`${authCookieName}=${authCookieValue}; ${accountAuthCookieName}=${accountAuthCookieValue};`)
            setUrl(null)
            setCookies({
                authCookieName,
                authCookieValue,
                accountAuthCookieName,
                accountAuthCookieValue
            })

            navigation.dispatch(CommonActions.reset(resetAndRedirectTo));

        }
    };


    if (!url && !generated) return null
    return <>
        {user ? <View style={[defaultStyles.container, defaultStyles.center]}>
            <Text style={defaultStyles.title}>Hola, {user?.user || "Bienvenido"}</Text>
            <Button text="Cerrar Sesion" onPress={async () => {
                await signout()
            }} />
        </View> : <WebView cacheEnabled={false} cacheMode='LOAD_NO_CACHE' ref={webview} userAgent="App" onNavigationStateChange={handleWebViewNavigationStateChange} style={{ flex: 1 }} source={{ uri: url }} />
        }
    </>
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4
    }
})

export default SocialButton