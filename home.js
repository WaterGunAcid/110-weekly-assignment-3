//please work please work please work im so tired please work
let addButtons = document.getElementsByClassName("shop-item-button");
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", addToCart);
}

function addToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;

    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    let image = shopItem.getElementsByClassName("shop-item-image")[0].src;

    let newRow = document.createElement("div");
    newRow.classList.add("cart-row");

//ngl mr. c, i got help on this part
//I LIKE FORMATTING JUST AS MUCH AS GITHUB (NOT AT ALL </3)
    newRow.innerHTML =
        '<div class="cart-item cart-column">' +
        '<img class="cart-item-image" src="' + image + '" width="100" height="100">' +
        '<span class="cart-item-title">' + title + '</span>' +
        '</div>' +
        '<span class="cart-price cart-column">' + price + '</span>' +
        '<div class="cart-quantity cart-column">' +
        '<input class="cart-quantity-input" type="number" value="1">' +
        '<button class="btn btn-danger" type="button">REMOVE</button>' +
        '</div>';

    let cartItems = document.getElementsByClassName("cart-items")[0];
    cartItems.appendChild(newRow);

    newRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeItem);
    newRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);

    updateTotal();
}

function removeItem(event) {
    let button = event.target;
    let row = button.parentElement.parentElement;
    row.remove();
    updateTotal();
}

function quantityChanged(event) {
    let input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateTotal();
}

function updateTotal() {
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let rows = cartItems.getElementsByClassName("cart-row");
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        let priceText = rows[i].getElementsByClassName("cart-price")[0].innerText;
        let price = parseFloat(priceText.replace("$", ""));
        let quantity = rows[i].getElementsByClassName("cart-quantity-input")[0].value;

        total = total + (price * quantity);
    }
//LEARNING NEW THINGS (NEW THINGS ARE BEING LEARNED) THIS ROUNDS THE NUMBER YIPPIE!!!!
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total.toFixed(2);
}