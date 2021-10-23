const express = require('express');
const router = express.Router();
const fs = require('fs');

// const prettyPay = require('../prettypay/routes/routes');
// console.log(prettyPay);


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
        buyablesJSON: JSON.parse(data)
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
                receiptInfo.push({'item': matchingBackendData.name, 'price per item': matchingBackendData.price,'quantity': itemBeingBought.quantity, 'sub-total': subtotal});
            })
            receiptInfo.push(`total: ${totalToCharge}`)
            console.log(`total = ${totalToCharge}`);
            if (totalToCharge <= 0) {
                res.status(401).json({
                    message: `Fictional purchase aborted by server with status 403 (forbidden): total charge of £ ${totalToCharge} is not greater than zero.`,
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
