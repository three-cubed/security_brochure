const conceptsOnOffer = 'Our Services'

const fs = require('fs'); // Without this, "ReferenceError: fs is not defined"

function parseOrCreateJSON(data, srcFile = null) {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
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

function JSONtoArray(JSON) {
    let array = [];
    for (const [key, items] of Object.entries(JSON)) {
        items.forEach(item => {
            array.push(item)
        })
    }
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

module.exports = { parseOrCreateJSON, JSONtoArray, prepareAndWriteReceiptPage, conceptsOnOffer };
