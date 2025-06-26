const productGrid = document.querySelector(".product-grid");
const cartItemCount = document.getElementById("cart-item-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotalPriceDisplay = document.getElementById("cart-total-price");
const cartModal = document.getElementById("cart-modal");
const detailsModal = document.getElementById("details-modal");
const detailsContent = document.getElementById("details-content");
const warningModal = document.getElementById("warning-modal");
const warningMessage = document.getElementById("warning-message");
const confirmModal = document.getElementById("confirm-modal");
const confirmYesButton = document.getElementById("confirm-yes");
const thankYouModal = document.getElementById("thank-you-modal");
const sortBySelect = document.getElementById("sort-by");
const thankYouMessage = document.querySelector("#thank-you-modal p");
const orderHistoryModal = document.getElementById("order-history-modal");
const orderHistoryList = document.getElementById("order-history-list");
const orderHistoryEmptyMessage = document.getElementById("order-history-empty");
const historyButton = document.querySelector(".history-button");

let productsData = [];
let cart = [];
let orderCounter = localStorage.getItem("orderCounter")
  ? parseInt(localStorage.getItem("orderCounter"))
  : 0;

cartModal.style.display = "none";
detailsModal.style.display = "none";
warningModal.style.display = "none";
confirmModal.style.display = "none";
thankYouModal.style.display = "none";
orderHistoryModal.style.display = "none";

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    productsData = await response.json();
    displayProducts(productsData);
  } catch (error) {
    console.error("Помилка завантаження товарів:", error);
    productGrid.innerHTML = "<p>Не вдалося завантажити товари.</p>";
  }
}

async function fetchProductDetails(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Помилка завантаження деталей товару з ID ${id}:`, error);
    return null;
  }
}

function displayProducts(products) {
  productGrid.innerHTML = "";
  for (const product of products.slice(0, 20)) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("product-image-container");
    const image = document.createElement("img");
    image.classList.add("product-image");
    image.src = product.image;
    image.alt = product.title;
    imageContainer.appendChild(image);

    const title = document.createElement("h3");
    title.classList.add("product-title");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = `Ціна: $${product.price.toFixed(2)}`;

    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");
    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("quantity-button");
    decreaseButton.textContent = "-";
    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantity-input");
    quantityInput.type = "number";
    quantityInput.value = "0";
    quantityInput.min = "0";
    quantityInput.addEventListener("change", () => {});
    const increaseButton = document.createElement("button");
    increaseButton.classList.add("quantity-button");
    increaseButton.textContent = "+";

    decreaseButton.addEventListener("click", () =>
      changeQuantity(quantityInput, -1)
    );
    increaseButton.addEventListener("click", () =>
      changeQuantity(quantityInput, 1)
    );

    quantityControls.appendChild(decreaseButton);
    quantityControls.appendChild(quantityInput);
    quantityControls.appendChild(increaseButton);

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.textContent = "Додати у кошик";
    addToCartButton.addEventListener("click", () =>
      addToCart(product, parseInt(quantityInput.value))
    );

    const detailsButton = document.createElement("button");
    detailsButton.classList.add("details-button");
    detailsButton.textContent = "Деталі";
    detailsButton.addEventListener("click", () => showDetails(product.id));

    productCard.appendChild(imageContainer);
    productCard.appendChild(title);
    productCard.appendChild(price);
    productCard.appendChild(quantityControls);
    productCard.appendChild(addToCartButton);
    productCard.appendChild(detailsButton);

    productGrid.appendChild(productCard);
  }
}

function changeQuantity(inputElement, change) {
  let currentValue = parseInt(inputElement.value);
  let newValue = currentValue + change;
  if (newValue >= 0) {
    inputElement.value = newValue;
  }
}

function addToCart(product, quantity) {
  if (quantity > 0) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    updateCartDisplay();
    const productCard = Array.from(productGrid.children).find(
      (card) =>
        card.querySelector(".product-title").textContent === product.title
    );
    if (productCard) {
      productCard.querySelector(".quantity-input").value = "0";
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}

function updateCartDisplay() {
  cartItemCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  cartItemsList.innerHTML = "";

  const headerRow = document.createElement("li");
  headerRow.innerHTML = `
        <span>№</span>
        <span>Назва товару</span>
        <span>Кількість</span>
        <span>Сума</span>
        <span>Дії</span>
    `;
  cartItemsList.appendChild(headerRow);

  let total = 0;
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <span>${index + 1}</span>
            <span>${item.title}</span>
            <span>${item.quantity}</span>
            <span>$${(item.quantity * item.price).toFixed(2)}</span>
            <span><button class="remove-from-cart-button" onclick="removeFromCart(${
              item.id
            })">Х</button></span>
        `;
    cartItemsList.appendChild(listItem);
    total += item.quantity * item.price;
  });

  const totalRow = document.createElement("li");
  totalRow.classList.add("total-row");
  totalRow.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `;
  cartItemsList.appendChild(totalRow);

  cartTotalPriceDisplay.textContent = total.toFixed(2) + " $";
  const cartTotalHeader = document.querySelector(".cart-total");
  cartTotalHeader.textContent = total.toFixed(2) + " $";

  const checkoutButton = document.querySelector(".checkout-button");
  if (checkoutButton) {
    checkoutButton.removeEventListener("click", handleCheckoutClick);
    checkoutButton.addEventListener("click", handleCheckoutClick);
  }
}

function handleCheckoutClick() {
  if (cart.length === 0) {
    warningMessage.textContent =
      "Ваш кошик порожній. Додайте товари для оформлення замовлення.";
    toggleWarningModal();
    return;
  }
  toggleConfirmModal();
}

function toggleCart() {
  cartModal.style.display =
    cartModal.style.display === "block" ? "none" : "block";
}

function toggleDetailsModal() {
  detailsModal.style.display =
    detailsModal.style.display === "block" ? "none" : "block";
}

function toggleWarningModal() {
  warningModal.style.display =
    warningModal.style.display === "block" ? "none" : "block";
}

function toggleConfirmModal() {
  confirmModal.style.display =
    confirmModal.style.display === "block" ? "none" : "block";
}

function toggleThankYouModal() {
  thankYouModal.style.display =
    thankYouModal.style.display === "block" ? "none" : "block";
}

function toggleOrderHistoryModal() {
  orderHistoryModal.style.display =
    orderHistoryModal.style.display === "block" ? "none" : "block";
}

async function showDetails(id) {
  const productDetails = await fetchProductDetails(id);
  if (productDetails) {
    detailsContent.innerHTML = `
            <p>ID товару: ${productDetails.id}</p>
            <p>${productDetails.description}</p>
            <p>Ціна: $${productDetails.price}</p>
            <p>Категорія: ${productDetails.category}</p>
            <p>Рейтинг: ${productDetails.rating.rate}</p>
            <p>Кількість оцінок: ${productDetails.rating.count}</p>
            <p>Посилання на зображення: <a href="${productDetails.image}" target="_blank">Переглянути</a></p>
        `;
    toggleDetailsModal();
  } else {
    detailsContent.innerHTML = "<p>Не вдалося завантажити деталі товару.</p>";
    toggleDetailsModal();
  }
}

function sortProducts(sortBy) {
  let sortedProducts = [...productsData];

  switch (sortBy) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      break;
  }

  displayProducts(sortedProducts);
}

sortBySelect.addEventListener("change", function () {
  const selectedValue = this.value;
  sortProducts(selectedValue);
});

function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}.${month}.${day}; ${hours}:${minutes}:${seconds}`;
}

confirmYesButton.addEventListener("click", () => {
  if (cart.length > 0) {
    const orderNumber = orderCounter++;
    localStorage.setItem("orderCounter", orderCounter);

    const orderDetails = {
      orderNumber: orderNumber + 1,
      items: [...cart],
      total: parseFloat(cartTotalPriceDisplay.textContent),
      timestamp: formatTimestamp(new Date().toISOString()),
    };

    localStorage.setItem(
      `order-${orderNumber + 1}`,
      JSON.stringify(orderDetails)
    );

    toggleConfirmModal();
    thankYouMessage.textContent = `Дякуємо за покупку! Номер вашого замовлення: ${
      orderNumber + 1
    }`;
    toggleThankYouModal();
    cart = [];
    updateCartDisplay();
  } else {
    warningMessage.textContent =
      "Ваш кошик порожній. Неможливо оформити замовлення.";
    toggleWarningModal();
  }
});

function showOrderHistory() {
  const orderHistory = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("order-")) {
      const order = JSON.parse(localStorage.getItem(key));
      orderHistory.push(order);
    }
  }

  orderHistoryList.innerHTML = "";

  if (orderHistory.length > 0) {
    orderHistoryEmptyMessage.style.display = "none";
    orderHistory.forEach((order) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h3>Замовлення №${order.orderNumber}</h3>
        <p>Дата: ${formatTimestamp(order.timestamp)}</p>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.title} x ${item.quantity} - $${(
                  item.price * item.quantity
                ).toFixed(2)}</li>`
            )
            .join("")}
        </ul>
        <p>Загальна сума: $${order.total.toFixed(2)}</p>
      `;
      orderHistoryList.appendChild(listItem);
    });
    toggleOrderHistoryModal();
  } else {
    orderHistoryEmptyMessage.style.display = "block";
    toggleOrderHistoryModal();
  }
}

if (historyButton) {
  historyButton.addEventListener("click", showOrderHistory);
} else {
  console.error("Кнопка 'Історія' не знайдена.");
}

window.addEventListener("click", function (event) {
  if (event.target == cartModal) {
    toggleCart();
  }
  if (event.target == detailsModal) {
    toggleDetailsModal();
  }
  if (event.target == warningModal) {
    toggleWarningModal();
  }
  if (event.target == confirmModal) {
    toggleConfirmModal();
  }
  if (event.target == thankYouModal) {
    toggleThankYouModal();
  }
  if (event.target == orderHistoryModal) {
    toggleOrderHistoryModal();
  }
});

fetchProducts();
