const removeBtnText = 'Remove from basket';

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', () => {  
        addPrices;
        addEventListener;
    })
} else {
    addPrices();
    addEventListener();
}

function addPrices() {
    let productPriceSpans = document.getElementsByClassName('productPriceSpan');
    for (var i = 0; i < productPriceSpans.length; i++) {
        productPriceSpans[i].innerHTML = `&emsp;£&thinsp;${formatNumberToString(productPriceSpans[i].parentElement.dataset.productPrice)}`;
    }
}

function addEventListener() {
    // console.log(document.getElementsByClassName('btn-purchase')[0]);
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', executePurchase);
}


function addToBasket(event) {
    // title, price, imageSrc, id
    // console.log(`Image source ${event.target.parentElement.getElementsByTagName('Img')[0].src}`);
    // console.log(`Prod. Name: ${event.target.parentElement.dataset.productName}`);
    console.log(`Prod. Identity: ${event.target.parentElement.dataset.productId}`);
    // console.log(`Prod. Price: £ ${event.target.parentElement.dataset.productPrice}`);

    let basketRow = document.createElement('div');
    basketRow.classList.add('basket-row' ,'basket-individual-product');
    basketRow.dataset.productId = event.target.parentElement.dataset.productId;
    basketRow.dataset.productPrice = event.target.parentElement.dataset.productPrice;
    let basketItemsDiv = document.getElementsByClassName('basket-items-div')[0];
    let basketItems = basketItemsDiv.getElementsByClassName('basket-individual-product');
    for (var i = 0; i < basketItems.length; i++) {
        if (basketItems[i].dataset.productId == event.target.parentElement.dataset.productId) {
            alert('This has already been put in the basket! If you want more, increase the stated quantity.');
            return;
        }
    }
    var basketRowContents = `
        <div class="basket-column">
            <img class="basket-item-image" src="${event.target.parentElement.getElementsByTagName('Img')[0].src}" width="24" height="24">
            <span class="basket-item-title">${event.target.parentElement.dataset.productName}</span>
        </div>
        <div class="item-quantity basket-column">
            <input class="item-quantity-input" type="number" value="1">
        </div>
        <span class="item-price basket-column">@ £ ${formatNumberToString(parseFloat(event.target.parentElement.dataset.productPrice))}</span>
        <span class="total-this-product basket-column"></span>
        <button class="btn btn-danger" type="button">${removeBtnText}</button>`
    basketRow.innerHTML = basketRowContents;
    basketItemsDiv.append(basketRow)
    basketRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeProductFromBasket);
    basketRow.getElementsByClassName('item-quantity-input')[0].addEventListener('change', checkValidQuantity);
    basketRow.getElementsByClassName('item-quantity-input')[0].addEventListener('keyup', checkValidQuantity);
    updateTotals();
    window.scrollTo(0,document.body.scrollHeight);
}

function removeProductFromBasket(event) {
    event.target.parentElement.remove();
    updateTotals();
}

function checkValidQuantity(event) {
    console.log(typeof event.target.value)
    if (isNaN(event.target.value)) {
        // Actually should not be possible for this input as type="number" but included for thoroughness.
        // Note nonetheless that paradoxically console.log(typeof event.target.value) will return 'string'.
        alert(`Error: Ensure you use a valid numerical quantity! If you no longer want this, simply click "${removeBtnText}".`);
    } else if (event.target.value < 1) {
        alert(`You cannot order less than one! If you no longer want this, simply click "${removeBtnText}".`);
        event.target.value = 1;
    } else if (!Number.isInteger(parseFloat(event.target.value))) {
        alert('Your order quantity must be a whole number');
        event.target.value = Math.floor(event.target.value);
    }
    updateTotals();
}

function updateTotals() {
    var basketItemsDiv = document.getElementsByClassName('basket-items-div')[0]
    var basketRows = basketItemsDiv.getElementsByClassName('basket-row')
    let total = 0
    for (let i = 0; i < basketRows.length; i++) {
        let basketRow = basketRows[i];
        let quantity = basketRow.getElementsByClassName('item-quantity-input')[0].value;
        let totalThisProduct = basketRow.dataset.productPrice * quantity;
        basketRow.getElementsByClassName('total-this-product')[0].innerText = ` = £ ${formatNumberToString(totalThisProduct)}`;
        total = total + (basketRow.dataset.productPrice * quantity);
    }
    total = Math.round(total * 100) / 100;
    let totalString = formatNumberToString(total);
    document.getElementsByClassName('basket-total-price')[0].innerText = `£ ${totalString}`;
}

function formatNumberToString(number) {
    // parseFloat(number) is because the prices are actually coming into the function as strings! To check, use:
    // console.log(typeof number)
    // Note that numbers are nonetheless coming through from event.target... as numbers.
    number = parseFloat(number);
    if (!Number.isInteger(number)) {
        numberString = number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
     } else {
        numberString = number.toLocaleString();
     }
     return numberString;
}

// function initiatePurchase() {
//     fetch('/toBuy/purchase', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             fictionalPurchaseToken: fictionalPurchaseToken,
//             items: items
//         })
//     }).then(function(res) {
//         return res.json();
//     }).catch(function(error) {
//         console.error(error);
//     })
// }

function executePurchase() {
    const fictionalPurchaseToken = generateUUID();
    console.log(`Initiating fictional purchase with token ${fictionalPurchaseToken}`);

    var items = []
    var basketRows = document.getElementsByClassName('basket-items-div')[0].getElementsByClassName('basket-row')
    while (basketRows.length > 0) {
        const quantity = basketRows[0].getElementsByClassName('item-quantity-input')[0].value;
        const id = basketRows[0].dataset.productId
        items.push({
            id: id,
            quantity: quantity
        })
        console.log(`Product identity:${id}, quantity:${quantity}`);
        basketRows[0].remove();
    }
    
    fetch('/toBuy/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            fictionalPurchaseToken: fictionalPurchaseToken,
            items: items
        })
    }).then(function(res) {
        return res.json();
    }).then(function(resJSON) {
        alert(`Response from server: ${resJSON.message}; ${JSON.stringify(resJSON.receiptInfo)}`);
        updateTotals();
    }).catch(function(error) {
        console.error(error);
    })
}

function generateUUID() { // generateUUID() is copied for processing simulation purposes; this function has a Public Domain/MIT license.
    var d = new Date().getTime(); // Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; // random number between 0 and 16
        if(d > 0){ // Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else { // Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
