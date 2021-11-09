if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded (waited)');
        addPrices();
        addEventListeners();
    });
} else {
    console.log('Loaded (instantaneous)');
    addPrices();
    addEventListeners();
}

const removeBtnText = 'Remove from basket';

function addPrices() {
    const productPriceSpans = document.getElementsByClassName('productPriceSpan');
    for (let i = 0; i < productPriceSpans.length; i++) {
        productPriceSpans[i].innerHTML = `£&thinsp;${formatNumberToString(productPriceSpans[i].dataset.productPrice)}`;
    }
}

function addEventListeners() {
    // console.log(document.getElementsByClassName('btn-purchase')[0]);
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', executePurchase);
    const groupTitleSpans = document.getElementsByClassName('groupTitleSpan');
    for (let i = 0; i < groupTitleSpans.length; i++) {
        const id = groupTitleSpans[i].parentElement.id;
        groupTitleSpans[i].addEventListener('click', ()=> {
            changeDivVisibility(id);
        });
    };
}

function addToBasket(event) {
    // title, price, imageSrc, id
    // console.log(`Image source ${event.target.parentElement.getElementsByTagName('Img')[0].src}`);
    // console.log(`Prod. Name: ${event.target.parentElement.dataset.productName}`);
    // console.log(`Prod. Identity: ${event.target.parentElement.dataset.productId}`);
    // console.log(`Prod. Price: £ ${event.target.parentElement.dataset.productPrice}`);

    const basketRow = document.createElement('div');
    basketRow.classList.add('basket-row');
    basketRow.dataset.productId = event.target.parentElement.parentElement.dataset.productId;
    basketRow.dataset.productPrice = event.target.parentElement.parentElement.dataset.productPrice;
    const basketItemsDiv = document.getElementsByClassName('basket-items-div')[0];
    const basketItems = basketItemsDiv.getElementsByClassName('basket-row');
    for (let i = 0; i < basketItems.length; i++) {
        console.log(basketItems[i].dataset.productId);
        console.log(event.target.parentElement.parentElement.dataset.productId);
        if (basketItems[i].dataset.productId === event.target.parentElement.parentElement.dataset.productId) {
            alert('This has already been put in the basket! If you want more, increase the stated quantity.');
            return;
        }
    }
    const basketRowContents = `
        <div class="basket-column">
            <img class="basket-item-image" src="${event.target.parentElement.parentElement.getElementsByTagName('Img')[0].src}" width="24" height="24">
        </div>
        <div class="basket-column centredText centredContent">
            <span class="basket-item-title">${event.target.parentElement.parentElement.dataset.productName}</span>
        </div>
        <div class="item-quantity basket-column">
            <input class="item-quantity-input" type="number" value="1">
        </div>
        <span class="item-price basket-column">@ £ ${formatNumberToString(parseFloat(event.target.parentElement.parentElement.dataset.productPrice))}</span>
        <span class="total-this-product basket-column"></span>
        <button class="btn btn-remove" type="button">${removeBtnText}</button>`;
    basketRow.innerHTML = basketRowContents;
    basketItemsDiv.append(basketRow);
    basketRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeProductFromBasket);
    basketRow.getElementsByClassName('item-quantity-input')[0].addEventListener('change', checkValidQuantity);
    basketRow.getElementsByClassName('item-quantity-input')[0].addEventListener('keyup', checkValidQuantity);
    updateTotals();
    window.scrollTo(0, document.body.scrollHeight);
}

function removeProductFromBasket(event) {
    event.target.parentElement.remove();
    updateTotals();
}

function checkValidQuantity(event) {
    // console.log(typeof event.target.value);
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
    const basketItemsDiv = document.getElementsByClassName('basket-items-div')[0]
    const basketRows = basketItemsDiv.getElementsByClassName('basket-row')
    let total = 0
    for (let i = 0; i < basketRows.length; i++) {
        const basketRow = basketRows[i];
        const quantity = basketRow.getElementsByClassName('item-quantity-input')[0].value;
        const totalThisProduct = basketRow.dataset.productPrice * quantity;
        basketRow.getElementsByClassName('total-this-product')[0].innerText = ` = £ ${formatNumberToString(totalThisProduct)}`;
        total += (basketRow.dataset.productPrice * quantity);
    }
    total = Math.round(total * 100) / 100;
    const totalString = formatNumberToString(total);
    // console.log(`buy.js updateTotals() says: totalString = ${totalString}`);
    document.getElementsByClassName('basket-total-price')[0].innerText = `£ ${totalString}`;
}

function formatNumberToString(number) { // Also found in utils.js as fomratANyNumberToString but can't be required therefrom.
    // parseFloat(number) is because the prices are actually coming into the function as strings! To check, use:
    // console.log(typeof number)
    // Note that numbers are nonetheless coming through from event.target... as numbers.
    number = parseFloat(number);
    let numberString;
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

function executePurchase() {
    const items = [];
    const basketRows = document.getElementsByClassName('basket-items-div')[0].getElementsByClassName('basket-row')
    // while (basketRows.length > 0) { // version a
    for (let i = 0; i < basketRows.length; i++) { // version b
        // const quantity = basketRows[0].getElementsByClassName('item-quantity-input')[0].value; // version a
        // const id = basketRows[0].dataset.productId; version a
        const quantity = basketRows[i].getElementsByClassName('item-quantity-input')[0].value; // version b
        const id = basketRows[i].dataset.productId; // version b
        // console.log(`buy.js executePurchase() says i = ${i}`); // version b
        // console.log(`buy.js executePurchase() says: quantity, id: ${quantity, id}`);
        items.push({
            id: id,
            quantity: quantity
        })
        // console.log(`Product identity:${id}, quantity:${quantity}`);
        // basketRows[0].remove(); // version a
    }
    // console.log(`executePurchase items object for toBuyRoutes:`)
    // console.log(items)
    let resStatus = 0;
    fetch('/toBuy/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            items: items
        })
    }).then((res) => {
        // alert(res.status);
        resStatus = res.status;
        return res.json();
    }).then((resJSON) => {
        // console.log('resJSON.receiptInfo from purchase route');
        // console.log(resJSON.receiptInfo);
        if (resStatus.toString()[0] === '2') {
            Prettypay.open(resJSON.totalToCharge, { askAddress: false });
            Prettypay.setSuccessFunction((data) => {
                const receiptInfo = resJSON.receiptInfo;
                receiptInfo.unshift({
                    uniqueTransactionReference: data.uniqueTransactionReference
                });
                clearItemsFromBasket();
                updateTotals();
                const awaitPostReceipt = async () => {
                    await postReceipt(receiptInfo);
                    return data;
                }
                awaitPostReceipt().then((dataReturned) => {
                    window.location.href = `/toBuy/confirm/${dataReturned.uniqueTransactionReference}/${dataReturned.amountToProcess}/${dataReturned.currency}`;
                    // window.open(`/toBuy/confirm/${dataReturned.uniqueTransactionReference}/${dataReturned.amountToProcess}/${dataReturned.currency}`);
                });
            });
        } else {
            Prettypay.abort(resJSON.message);
        }
    }).catch((error) => {
        console.error(error);
    })
}

function clearItemsFromBasket() {
    const basketRows = document.getElementsByClassName('basket-items-div')[0].getElementsByClassName('basket-row');
    while (basketRows.length > 0) {
        basketRows[0].remove();
    }
}

function postReceipt(receiptInfo) {
    fetch('/toBuy/postReceipt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            receiptInfo: receiptInfo
        })
    });
}

function changeDivVisibility(id) {
    // console.log(id)
    const targetVisibilityElement = document.getElementById(`${id}VisibilityDiv`);
    const targetTextElement = document.getElementById(`${id}OpenCloseIcon`);
    targetVisibilityElement.classList.toggle('invisible');
    if (!targetVisibilityElement.classList.contains('invisible')) {
        targetTextElement.innerHTML = '&hairsp;&times;';
    } else {
        targetTextElement.innerHTML = '&#9662;';
    }
}
