const removeBtnText = 'Remove from basket'

function addToBasket(event) {
    // title, price, imageSrc, id
    console.log(`Image source ${event.target.parentElement.getElementsByTagName('Img')[0].src}`);
    console.log(`Prod. Name: ${event.target.parentElement.dataset.productName}`);
    console.log(`Prod. Identity: ${event.target.parentElement.dataset.productId}`);
    console.log(`Prod. Price: £ ${event.target.parentElement.dataset.productPrice}`);

    let basketRow = document.createElement('div');
    basketRow.classList.add('basket-row' ,'basket-individual-product');
    basketRow.dataset.productId = event.target.parentElement.dataset.productId;
    basketRow.dataset.productPrice = event.target.parentElement.dataset.productPrice;
    let basketItemsDiv = document.getElementsByClassName('basket-items-div')[0];
    let basketItems = basketItemsDiv.getElementsByClassName('basket-individual-product');
    for (var i = 0; i < basketItems.length; i++) {
        if (basketItems[i].dataset.productId == event.target.parentElement.dataset.productId) {
            alert('This product has already been put in the basket!');
            return;
        }
    }
    var basketRowContents = `
        <div class="basket-column">
            <img class="basket-item-image" src="${event.target.parentElement.getElementsByTagName('Img')[0].src}" width="24" height="24">
            <span class="basket-item-title">${event.target.parentElement.dataset.productName}</span>
        </div>
        <div class="basket-quantity basket-column">
            <input class="basket-quantity-input" type="number" value="1">
        </div>
        <span class="basket-price basket-column">@ £ ${parseFloat(event.target.parentElement.dataset.productPrice).toLocaleString()}</span>
        <span class="total-this-product basket-column"></span>
        <button class="btn btn-danger" type="button">${removeBtnText}</button>`
    basketRow.innerHTML = basketRowContents;
    basketItemsDiv.append(basketRow)
    basketRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeProductFromBasket);
    basketRow.getElementsByClassName('basket-quantity-input')[0].addEventListener('change', checkValidQuantity);
    window.scrollTo(0,document.body.scrollHeight);
    updateTotals();
}

function removeProductFromBasket(event) {
    event.target.parentElement.remove();
    updateTotals();
}

function checkValidQuantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value < 1) {
        alert(`You cannot order less than one! If you no longer want this product, simply click "${removeBtnText}".`);
        input.value = 1;
    }
    updateTotals();
}

function updateTotals() {
    var basketItemsDiv = document.getElementsByClassName('basket-items-div')[0]
    var basketRows = basketItemsDiv.getElementsByClassName('basket-row')
    var total = 0
    for (let i = 0; i < basketRows.length; i++) {
        let basketRow = basketRows[i];
        let quantity = basketRow.getElementsByClassName('basket-quantity-input')[0].value;
        let totalThisProduct = basketRow.dataset.productPrice * quantity;
        basketRow.getElementsByClassName('total-this-product')[0].innerText = ` = £ ${totalThisProduct.toLocaleString()}`;
        total = total + (basketRow.dataset.productPrice * quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket-total-price')[0].innerText = `£ ${total.toLocaleString()}`;
}
