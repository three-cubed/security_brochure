const express = require('express');
const router = express.Router();
const fs = require('fs');

const {
    parseOrCreateJSON,
    JSONtoArray,
    prepareAndWriteReceiptPage,
    formatAnyNumberToString,
    conceptsOnOffer,
} = require('../javascripts/utils.js');

router.get('/buy', (req, res) => {
    let data;
    try {
        data = fs.readFileSync('buyables.json');
    } catch (error) {
        console.log(error);
        res.end();
    }
    res.render('buy', {
        buyablesJSON: JSON.parse(data),
        conceptsOnOffer: conceptsOnOffer,
    });
});

router.post('/purchase', (req, res) => {
    fs.readFile('buyables.json', (error, dataFromBuyablesFile) => {
        if (error) {
            console.log(error);
            res.status(500).end()
        } else {
            const buyablesJSON = JSON.parse(dataFromBuyablesFile);
            const backendDataArray = JSONtoArray(buyablesJSON);
            let totalToCharge = 0;
            const receiptInfo = [];
            req.body.buyables.forEach((itemBeingBought) => {
                const matchingBackendData = backendDataArray.find(
                    (backendDataItem) => backendDataItem.id == itemBeingBought.id)
                const subtotal = itemBeingBought.quantity * matchingBackendData.price;
                totalToCharge += subtotal;
                receiptInfo.push({
                    item: matchingBackendData.name,
                    'price per item': matchingBackendData.price,
                    quantity: itemBeingBought.quantity,
                    'sub-total': subtotal,
                });
            });
            receiptInfo.push({
                total: `${totalToCharge}`,
            });
            // console.log(`total = ${totalToCharge}`);
            if (totalToCharge <= 0) {
                res.status(401).json({
                    message: `Fictional purchase aborted by server with status 401 (unauthorized): total charge of £ ${totalToCharge} is not greater than zero.`,
                    receiptInfo: 'Receipt information not applicable.',
                });
            } else {
                res.json({
                    totalToCharge: totalToCharge,
                    message: `Prettypay to process total charge of ${totalToCharge}`,
                    receiptInfo: receiptInfo,
                });
            }
        }
    });
});

router.post('/postReceipt', async (req, res) => {
    const fileToRecordIn = './receipts/receipts.json';
    let dataInFile = '[]';
    try {
        dataInFile = fs.readFileSync(fileToRecordIn);
    } catch (error) {
        console.log(error);
        // if error, rewriting the record file as '[]'
        fs.writeFileSync(fileToRecordIn, '[]');
    }
    const dataArray = await parseOrCreateJSON(dataInFile, fileToRecordIn);
    const attempt = await prepareAndWriteReceiptPage(fileToRecordIn, dataArray, req.body.receiptInfo);
    res.status(attempt).end();
});

router.get('/confirm/:uniqueTransactionReference/:amount/:currency', (req, res) => {
    let receiptInfo = null;
    const uniqueTransactionReference = req.params.uniqueTransactionReference;
    const dataInFile = fs.readFileSync('./receipts/receipts.json');
    const dataArray = parseOrCreateJSON(dataInFile, './receipts/receipts.json');
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i][0].uniqueTransactionReference === uniqueTransactionReference) {
            receiptInfo = dataArray[i];
        }
    }
    res.render('confirm', {
        uniqueTransactionReference: req.params.uniqueTransactionReference,
        amount: req.params.amount,
        currency: req.params.currency,
        receiptInfo: receiptInfo,
        formatAnyNumberToString: formatAnyNumberToString,
        conceptsOnOffer: conceptsOnOffer,
    });
});

module.exports = router;
