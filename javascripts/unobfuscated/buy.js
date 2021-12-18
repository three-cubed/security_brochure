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
    const buyablePriceSpans = document.getElementsByClassName('buyablePriceSpan');
    for (let i = 0; i < buyablePriceSpans.length; i++) {
        buyablePriceSpans[i].innerHTML = `£&thinsp;${formatNumberToString(buyablePriceSpans[i].dataset.buyablePrice)}`;
    }
}

function addEventListeners() {
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
    // console.log(`Image source ${event.target.parentElement.getElementsByTagName('Img')[0].src}`);
    // console.log(`Prod. Name: ${event.target.parentElement.dataset.buyableName}`);
    // console.log(`Prod. Identity: ${event.target.parentElement.dataset.buyableId}`);
    // console.log(`Prod. Price: £ ${event.target.parentElement.dataset.buyablePrice}`);

    const basketRow = document.createElement('div');
    basketRow.classList.add('basket-row');
    basketRow.dataset.buyableId = event.target.parentElement.parentElement.dataset.buyableId;
    basketRow.dataset.buyablePrice = event.target.parentElement.parentElement.dataset.buyablePrice;
    const basketBuyablesDiv = document.getElementsByClassName('basket-buyables-div')[0];
    const basketBuyables = basketBuyablesDiv.getElementsByClassName('basket-row');
    for (let i = 0; i < basketBuyables.length; i++) {
        // console.log(basketBuyables[i].dataset.buyableId);
        // console.log(event.target.parentElement.parentElement.dataset.buyableId);
        if (basketBuyables[i].dataset.buyableId === event.target.parentElement.parentElement.dataset.buyableId) {
            alert('This has already been put in the basket! If you want more, increase the stated quantity.');
            return;
        }
    }
    const basketRowContents = `
        <div class="basket-column">
            <img class="basket-buyable-image" src="${event.target.parentElement.parentElement.getElementsByTagName('Img')[0].src}" width="24" height="24">
        </div>
        <div class="basket-column centredText centredContent">
            <span class="basket-buyable-title">${event.target.parentElement.parentElement.dataset.buyableName}</span>
        </div>
        <div class="buyable-quantity basket-column">
            <input class="buyable-quantity-input" type="number" value="1">
        </div>
        <span class="buyable-price basket-column">@ £ ${formatNumberToString(parseFloat(event.target.parentElement.parentElement.dataset.buyablePrice))}</span>
        <span class="total-this-buyable basket-column"></span>
        <button class="btn btn-remove" type="button">${removeBtnText}</button>`;
    basketRow.innerHTML = basketRowContents;
    basketBuyablesDiv.append(basketRow);
    basketRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeBuyableFromBasket);
    basketRow.getElementsByClassName('buyable-quantity-input')[0].addEventListener('change', checkValidQuantity);
    basketRow.getElementsByClassName('buyable-quantity-input')[0].addEventListener('keyup', checkValidQuantity);
    updateTotals();
    window.scrollTo(0, document.body.scrollHeight);
}

function removeBuyableFromBasket(event) {
    event.target.parentElement.remove();
    updateTotals();
}

function checkValidQuantity(event) {
    if (isNaN(event.target.value)) {
        // Actually should not be possible for this input as type = "number" but included for thoroughness.
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
    const basketBuyablesDiv = document.getElementsByClassName('basket-buyables-div')[0]
    const basketRows = basketBuyablesDiv.getElementsByClassName('basket-row')
    let total = 0
    for (let i = 0; i < basketRows.length; i++) {
        const basketRow = basketRows[i];
        const quantity = basketRow.getElementsByClassName('buyable-quantity-input')[0].value;
        const totalThisBuyable = basketRow.dataset.buyablePrice * quantity;
        basketRow.getElementsByClassName('total-this-buyable')[0].innerText = ` = £ ${formatNumberToString(totalThisBuyable)}`;
        total += (basketRow.dataset.buyablePrice * quantity);
    }
    total = Math.round(total * 100) / 100;
    const totalString = formatNumberToString(total);
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
    const buyables = [];
    const basketRows = document.getElementsByClassName('basket-buyables-div')[0].getElementsByClassName('basket-row')
    // while (basketRows.length > 0) { // version a
    for (let i = 0; i < basketRows.length; i++) { // version b
        // const quantity = basketRows[0].getElementsByClassName('buyable-quantity-input')[0].value; // version a
        // const id = basketRows[0].dataset.buyableId; version a
        const quantity = basketRows[i].getElementsByClassName('buyable-quantity-input')[0].value; // version b
        const id = basketRows[i].dataset.buyableId; // version b
        buyables.push({
            id: id,
            quantity: quantity
        })
        // basketRows[0].remove(); // version a
    }
    let resStatus = 0;
    fetch('/toBuy/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            buyables: buyables
        })
    }).then((res) => {
        resStatus = res.status;
        return res.json();
    }).then((resJSON) => {
        if (resStatus.toString()[0] === '2') {
            Prettypay.open(resJSON.totalToCharge, { askAddress: false });
            Prettypay.setSuccessFunction((data) => {
                const receiptInfo = resJSON.receiptInfo;
                receiptInfo.unshift({
                    uniqueTransactionReference: data.uniqueTransactionReference
                });
                clearBuyablesFromBasket();
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

function clearBuyablesFromBasket() {
    const basketRows = document.getElementsByClassName('basket-buyables-div')[0].getElementsByClassName('basket-row');
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
    const targetVisibilityElement = document.getElementById(`${id}VisibilityDiv`);
    const targetTextElement = document.getElementById(`${id}OpenCloseIcon`);
    targetVisibilityElement.classList.toggle('invisible');
    if (!targetVisibilityElement.classList.contains('invisible')) {
        targetTextElement.innerHTML = '&hairsp;&times;';
    } else {
        targetTextElement.innerHTML = '&#9662;';
    }
}
