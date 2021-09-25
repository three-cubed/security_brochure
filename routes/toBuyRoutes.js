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
            let receiptInfo = [];
            req.body.items.forEach(function(itemBeingBought) {
                const matchingBackendData = backendDataArray.find(
                    function(backendDataItem) {
                        return backendDataItem.id == itemBeingBought.id
                })
                const subtotal = itemBeingBought.quantity * matchingBackendData.price;
                totalToCharge += subtotal;
                receiptInfo.push({'item': matchingBackendData.name, 'price per item': matchingBackendData.price,'quantity': itemBeingBought.quantity, 'sub-total': subtotal});
            })
            receiptInfo.push(`total: ${totalToCharge}`)
            console.log(`total = ${totalToCharge}`);
            res.json({
                message: `Successful fictional purchase processed by backend; total charge of ${totalToCharge}`,
                receiptInfo: receiptInfo,
                fictionalPurchaseToken: req.body.fictionalPurchaseToken
            })
        }
    })
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
