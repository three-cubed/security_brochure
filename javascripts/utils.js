const conceptsOnOffer = 'Our Services';

const fs = require('fs'); // Without this, "ReferenceError: fs is not defined"

function parseOrCreateJSON(data, srcFile = null) {
    try {
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        console.log(`Failed to parse: ${srcFile}; returning parsed '[]' at parseOrCreateJSON()`);
        if (srcFile !== null) {
            try {
                fs.writeFileSync(srcFile, '[]');
            } catch (err) {
                console.log(err);
            }
        }
        return JSON.parse('[]');
    }
}

function JSONtoArray(JSON) { // This function is used in toBuyRoutes.js
    const array = [];
    Object.values(JSON).forEach((itemsArray) => {
        itemsArray.forEach((item) => {
            array.push(item);
        });
    })
    return array;
}

function prepareAndWriteReceiptPage(fileToRecordIn, dataArray, receiptInfo) {
    dataArray.unshift(receiptInfo);
    while (dataArray.length > 50) dataArray.pop(); // To prevent file getting too long, 50 records maximum!
    const dataStringForSending = JSON.stringify(dataArray);
    try {
        fs.writeFileSync(fileToRecordIn, dataStringForSending);
        return 201;
    } catch (error) {
        console.log(error);
    }
    return 400;
}

function formatAnyNumberToString(input) {
    // parseFloat(number) is because some numbers actually come into the function as strings! To check, use:
    // console.log(typeof number)
    // Note that numbers are nonetheless coming through to buy.js from event.target... as numbers.
    const number = parseFloat(input);
    let numberString;
    if (isNaN(number)) return input;
    if (!Number.isInteger(number)) {
        numberString = number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        numberString = number.toLocaleString();
    }
    return numberString;
}

module.exports = {
    parseOrCreateJSON,
    JSONtoArray,
    prepareAndWriteReceiptPage,
    formatAnyNumberToString,
    conceptsOnOffer
};
