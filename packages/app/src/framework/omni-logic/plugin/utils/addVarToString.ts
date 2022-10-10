import { isArray } from "lodash";
import get from 'lodash.get'
const keysRegEx = /\{(.*?)\}/gm;

function replace(match: string, item: any) {
    if(match?.includes("{") && match?.includes("}")){
        const key = match.replace(/[{}]/g,'')
        if(key?.includes(".")){
            const value = get(item, key)
            return value
        }
        return item[key];
    }

}

export const addVarToString = (from: string, to: {
    [x: string]: any
}) => {
    if(isArray(from)) return from;
    const key = from?.replace(/[{}]/g,'')
    if(to?.hasOwnProperty(key) && typeof to[key] === 'object') return to[key]
    return from.replace(keysRegEx, (match: string) =>
        replace(match, to)
    );
}