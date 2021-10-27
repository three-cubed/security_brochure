const express = require('express');
const router = express.Router();
const fs = require('fs');

// const conceptsOnOffer = 'Our Services';

const {
    parseOrCreateJSON,
    JSONtoArray,
    conceptsOnOffer
} = require('../javascripts/utils.js');

router.get('/buy', function(req, res) {
    let data;
    try {
        data = fs.readFileSync('buyables.json');
        // res.render('buy', {
        //     buyablesJSON: JSON.parse(data)
        // });
    } catch (error) {
        console.log('*ERROR*');
        console.log(error);
        res.end();
    }
    res.render('buy', {
        buyablesJSON: JSON.parse(data),
        conceptsOnOffer: conceptsOnOffer
    });
});

router.post('/purchase', function(req, res) {
    // console.log(req.body);
    // console.log('^^req.body^^')
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
                receiptInfo.push({
                    'item': matchingBackendData.name,
                    'price per item': matchingBackendData.price,
                    'quantity': itemBeingBought.quantity,
                    'sub-total': subtotal
                });
            })
            receiptInfo.push({
                'total': `${totalToCharge}`
            })
            // console.log(`total = ${totalToCharge}`);
            if (totalToCharge <= 0) {
                res.status(401).json({
                    message: `Fictional purchase aborted by server with status 401 (unauthorized): total charge of £ ${totalToCharge} is not greater than zero.`,
                    receiptInfo: 'Receipt information not applicable.'
                });
            } else {
                res.json({
                    totalToCharge: totalToCharge,
                    message: `Prettypay to process total charge of ${totalToCharge}`,
                    receiptInfo: receiptInfo
                })
            }
        }
    })
})

router.post('/postReceipt', function(req, res) {
    fileToRecordIn = './receipts/receipts.json';
    try {
        fs.readFile(fileToRecordIn, function(error, dataInFile) { // Should not be sync as will stall in case of faulty record files.
            if (error) {
                console.log('error at /postReceipt point 1');
                console.log(error);
            } else {
                try {
                    const dataArray = parseOrCreateJSON(dataInFile, fileToRecordIn);
                    dataArray.unshift(req.body.receiptInfo);
                    while (dataArray.length > 100) dataArray.pop(); // To prevent file getting too long, 100 records!
                    const dataStringForSending = JSON.stringify(dataArray);
                    fs.writeFile(fileToRecordIn, dataStringForSending, (err) => {
                        if (err) {
                            console.log('error at /postReceipt point 2');
                            console.log(error);
                        }
                    });
                } catch (error) {
                    console.log('error at /postReceipt point 3');
                    console.log(error);
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    res.end();
})

router.get('/confirm/:uniqueTransactionReference/:amount/:currency', (req, res) => {

    let receiptInfo = null;
    let uniqueTransactionReference = req.params.uniqueTransactionReference;
    const dataInFile = fs.readFileSync('./receipts/receipts.json');
    dataArray = parseOrCreateJSON(dataInFile, './receipts/receipts.json');
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i][0].uniqueTransactionReference === uniqueTransactionReference) {
            receiptInfo = dataArray[i];
        }
    }
    console.log('receiptInfo for confirm.ejs')
    console.log(receiptInfo)
    res.render('confirm', {
        uniqueTransactionReference: req.params.uniqueTransactionReference,
        amount: req.params.amount,
        currency: req.params.currency,
        receiptInfo: receiptInfo,
        conceptsOnOffer: conceptsOnOffer
    });
})

module.exports = router;
