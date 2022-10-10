

enum Verb {
    is = "is",
    isNot = "is-not",
    notContain = "not-contain",
    all = "all",
    any = "any",
    none = "none",
    exists = 'exists',
    notExists = 'not-exists'
}

type VerbType =
    | Verb.is
    | Verb.isNot
    | Verb.notContain
    | Verb.all
    | Verb.any
    | Verb.none
    | Verb.exists
    | Verb.notExists

interface Condition {
    subject: string;
    verb: VerbType;
    object: string;
}

type Conditions  = Condition[] 

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

const existsValidation = (value: string) => value ? true : false;
const notExistsValidation = (value: string) => !(value ? true : false);

const Verbs = {
    is: isValidation,
    isNot: isNotValidation,
    exists: existsValidation,
    notExists: notExistsValidation
};

const IfConditionValidate = (conditions: Conditions, params: any) => {
 
    const result: boolean[] = [];
    if (conditions) {
    
        conditions?.forEach((condition) => {
            
            const value = getDescendantProp(params, condition.subject);
            console.log('p',params)
            if (condition.verb == Verb.is) {
                const tValidation = Verbs.is(condition, value);
                console.log("Is", condition, tValidation)
                result.push(tValidation);
            } else if (condition.verb == Verb.isNot) {

                const tValidation = Verbs.isNot(condition, value);
                console.log("isNot", condition, tValidation)
                result.push(tValidation);
            } else if (condition.verb == Verb.exists) {

                const tValidation = Verbs.exists(value);
                console.log("exists", condition, tValidation)
                result.push(tValidation);
            }  else if (condition.verb == Verb.notExists) {
                console.log('enterr')
                const tValidation = Verbs.notExists(value);
                console.log("notExists", condition, tValidation)
                result.push(tValidation);
            } else {
                result.push(false);
            }
        });

    }
    return result;
};

const ElseIfConditionValidate = (conditions: Conditions, params: any) => {
    if (conditions) {
        return conditions.map((condition) => {
            const result: boolean[] = [];
            condition?.forEach((condition) => {
            
                const value = getDescendantProp(params, condition.subject);
     
                if (condition.verb == Verb.is) {
                    const tValidation = Verbs.is(condition, value);
                    console.log("Is", condition, tValidation)
                    result.push(tValidation);
                } else if (condition.verb == Verb.isNot) {
    
                    const tValidation = Verbs.isNot(condition, value);
                    console.log("isNot", condition, tValidation)
                    result.push(tValidation);
                } else if (condition.verb == Verb.exists) {
    
                    const tValidation = Verbs.exists(value);
                    console.log("exists", condition, tValidation)
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
       

        if (!IfCondition.length) {
            return true;
        }
        return false;
    };
    const validation = Validate()
    return  validation
};