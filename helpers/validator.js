function validateProductData(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] === undefined || data[key] === '') {
                return `${key} is empty or undefined.`;
            }
        }
    }
    return null; // No errors found
}
module.exports = { validateProductData }