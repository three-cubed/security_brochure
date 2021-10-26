const conceptsOnOffer = 'Our Services'

const fs = require('fs'); // Without this, "ReferenceError: fs is not defined"

function parseOrCreateJSON(data, srcFile = null) {
    try {
        // console.log(`Parsed: data from ${srcFile}.`)
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        console.log(`Failed to parse: ${srcFile}; returning parsed '[]' at parseOrCreateJSON()`);
        if (srcFile !== null) {
            fs.writeFileSync(srcFile, '[]', (err) => {
                if (err) throw err;
            });
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

module.exports = { parseOrCreateJSON, JSONtoArray, conceptsOnOffer };
