const express = require('express');
const router = express.Router();
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
  }
const paymentProcessorSecretKey = process.env.PAYMENT_PROCESSOR_SECRET_KEY;

router.get('/buy', function(req, res) {
    console.log(req.body);
    fs.readFile('buyables.json', function(error, dataFromBuyablesFile) {
        if (error) {
            console.log(error);
            res.status(500).end()
        } else {
            const buyablesJSON = JSON.parse(dataFromBuyablesFile);
            const backendDataArray = JSONtoArray(buyablesJSON);
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
            if (totalToCharge <= 0) {
                // 403 Forbidden: The request contained valid data and was understood by the server, but the server is refusing action.
                res.status(403).json({
                    message: `Fictional purchase aborted by server with status 403 (forbidden): total charge of ${totalToCharge} is less than or equal to zero`,
                    receiptInfo: 'receiptInfo not applicable.',
                    fictionalPurchaseToken: req.body.fictionalPurchaseToken
                });
            } else {
                res.json({
                    message: `Successful fictional purchase processed by server; total charge of ${totalToCharge}`,
                    receiptInfo: receiptInfo,
                    fictionalPurchaseToken: req.body.fictionalPurchaseToken
                })
            }
        }
    })
})

router.post('/purchase', function(req, res) {
    console.log(req.body);
    fs.readFile('buyables.json', function(error, dataFromBuyablesFile) {
        if (error) {
            console.log(error);
            res.status(500).end()
        } else {
            const buyablesJSON = JSON.parse(dataFromBuyablesFile);
            const backendDataArray = JSONtoArray(buyablesJSON);
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
            if (totalToCharge <= 0) {
                // 403 Forbidden: The request contained valid data and was understood by the server, but the server is refusing action.
                res.status(403).json({
                    message: `Fictional purchase aborted by server with status 403 (forbidden): total charge of ${totalToCharge} is not greater than zero`,
                    receiptInfo: 'Receipt information not applicable.',
                    fictionalPurchaseToken: req.body.fictionalPurchaseToken
                });
            } else {
                res.json({
                    message: `Successful fictional purchase processed by server; total charge of ${totalToCharge}`,
                    receiptInfo: receiptInfo,
                    fictionalPurchaseToken: req.body.fictionalPurchaseToken
                })
            }
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
