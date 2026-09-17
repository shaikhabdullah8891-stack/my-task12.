const addButtons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");

let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price}</p>
            </div>

            <div class="quantity">
                <button onclick="changeQuantity(${index}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">+</button>

                <button class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    updateTotal();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    totalElement.textContent = total.toFixed(2);
}

addButtons.forEach(button => {
    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);
    });
});

displayCart();