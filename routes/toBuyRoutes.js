const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/buy', function(req, res) {
    fs.readFile('toBuy.json', function(error, data) {
        if (error) {
            console.log('*ERROR*');
            console.log(error);
        } else {
            res.render('buy', {
                items: JSON.parse(data)
            })
        }
    })
})

router.post('/purchase', function(req, res) {
    console.log(req.body);
    fs.readFile('toBuy.json', function(error, toBuyData) {
        if (error) {
            console.log(error);
            res.status(500).end()
        } else {
            const toBuyJSON = JSON.parse(toBuyData);
            const backendDataArray = JSONtoArray(toBuyJSON);
            let totalToCharge = 0;
            req.body.items.forEach(function(itemToBuy) {
                const matchingBackendData = backendDataArray.find(
                    function(backendDataItem) {
                        return backendDataItem.id == itemToBuy.id
                })
                totalToCharge += itemToBuy.quantity * matchingBackendData.price;
            })
            console.log(`Final total to charge = ${totalToCharge}`);
        }
    })
    res.end();
})

function JSONtoArray(JSON) {
    let array = [];
    for (const [key, items] of Object.entries(JSON)) {
        items.forEach(item => {
            array.push(item)
        })
    }
    return array;
}

module.exports = router;
