/**
 * Validates if the given value is numeric
 * @num - value that is going to be validated
 */
function isNumeric (num: any) {
    return (
        typeof(num) === 'number' || 
        typeof(num) === "string" && 
        num.trim() !== '') && 
        !isNaN(num as number
    )
}

export {
    isNumeric
}