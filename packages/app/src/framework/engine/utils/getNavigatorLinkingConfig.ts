import { NavigatorType, Route } from "../types";

const getNavigatorLinkingConfig = ({ screens }: Route) => {
    const screenKeys = Object.keys(screens);
    const screenComponents = screenKeys.reduce(
        (accum, currentScreenName: string) => {
            if (screens[currentScreenName].type !== NavigatorType.component) {
                const childrenScreens = getNavigatorLinkingConfig(
                    screens[currentScreenName] as any
                );
                accum = {
                    ...accum,
                    [currentScreenName]: {
                        path: screens[currentScreenName].path,
                        exact: screens[currentScreenName].exact,
                        screens: {
                            ...childrenScreens,
                        },
                    },
                };
            } else {
                accum = {
                    ...accum,
                    [currentScreenName]:
                        screens[currentScreenName].path ?? currentScreenName,
                };
            }
            return accum;
        },
        {} as any
    );

    return screenComponents;
};

export default getNavigatorLinkingConfig