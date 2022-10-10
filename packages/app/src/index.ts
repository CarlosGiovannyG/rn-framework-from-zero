import { Platform, LogBox } from "react-native";
import('@formatjs/intl-getcanonicallocales/polyfill');
import('@formatjs/intl-locale/polyfill');
import('@formatjs/intl-pluralrules/polyfill');
import('@formatjs/intl-pluralrules/locale-data/en');
import('@formatjs/intl-pluralrules/locale-data/es');
import('@formatjs/intl-numberformat/polyfill');
import('@formatjs/intl-numberformat/locale-data/en');
import('@formatjs/intl-numberformat/locale-data/es-CO');
import('@formatjs/intl-datetimeformat/polyfill');
import('@formatjs/intl-datetimeformat/locale-data/en');
import('@formatjs/intl-datetimeformat/locale-data/es-CO');
import('@formatjs/intl-datetimeformat/add-all-tz');


LogBox.ignoreLogs(['It is highly recommended to set `predictableActionArguments` to `true` when using `createMachine`. https://xstate.js.org/docs/guides/actions.html',"Machine given to `useMachine` has changed between renders. This is not supported and might lead to unexpected results."]);


export { App } from "./App";
