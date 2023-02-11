import { isNumeric } from '../utilities/validations';

/**
 * Formats a string literal and replaces the values inside ${} for the object values associated
 * to the key, if the is any array the way to acces to the dessired position is using dot notation
 * for example {"stops": [123, 456]} -> stops.0 means stops array in the first position
 * @param text - string literal that contains the object in string format the is going to be 
 * formatted
 * @param data - object literal that contains the data
 */
function formatString(text: string, data: object) {
    return text.replaceAll(/\$\{(\w.?[^\"|^\}]+)\}/g, (searchValue: string, replacer: string): string => {
        const keys: string[] = replacer.split(".")
        let value: any = data;
        keys.map((key: string) => {
            if (value === null || value === undefined) {
                return null;
            }
            if (isNumeric(key)) {
                value = value[parseInt(key)];
            } else {
                value = value[key as keyof object]
            }
        })
        return value;
    });
}

export {
    formatString
}