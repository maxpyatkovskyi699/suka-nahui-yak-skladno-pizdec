const productGrid = document.querySelector(".product-grid");
const cartItemCount = document.getElementById("cart-item-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotalPriceDisplayHeader = document.querySelector(".cart-total");
const cartTotalPriceDisplayModal = document.getElementById("cart-total-modal");
const cartModal = document.getElementById("cart-modal");
const detailsModal = document.getElementById("details-modal");
const detailsContent = document.getElementById("details-content");
const warningModal = document.getElementById("warning-modal");
const warningMessage = document.getElementById("warning-message");
const confirmModal = document.getElementById("confirm-modal");
const confirmYesButton = document.getElementById("confirm-yes");
const thankYouModal = document.getElementById("thank-you-modal");
const thankYouMessage = document.querySelector("#thank-you-modal p");
const orderHistoryModal = document.getElementById("order-history-modal");
const orderHistoryList = document.getElementById("order-history-list");
const orderHistoryEmptyMessage = document.getElementById("order-history-empty");
const historyButton = document.querySelector(".history-button");
const sortBySelect = document.getElementById("sort-by");
// Масив з даними про послуги
let productsData = [
  {
    id: 1,
    title: "Чоловіча стрижка",
    price: 299,
    description:
      "Класична чоловіча стрижка для стильного вигляду, що виконується професійним майстром з урахуванням типу волосся, форми обличчя та індивідуальних побажань клієнта. Ідеально підходить як для повсякденного стилю, так і для ділових зустрічей чи урочистих подій.",
    information: "Тривалість: 30 хвилин.",
    image: "images/shop/men-haircut.jpg",
  },
  {
    id: 2,
    title: "Жіноча стрижка",
    price: 349,
    description:
      "Сучасна модельна жіноча стрижка будь-якої складності з професійним підходом та рекомендаціями щодо догляду. Враховується індивідуальна структура волосся, модні тенденції та побажання клієнтки для створення гармонійного образу.",
    information: "Тривалість: 45 хвилин.",
    image: "images/shop/women-haircut.jpg",
  },
  {
    id: 3,
    title: "Манікюр",
    price: 199,
    description:
      "Класичний манікюр з доглядом за нігтьовою пластиною та кутикулою, завершений нанесенням якісного гель-лаку. Ідеально підійде для тих, хто цінує естетику, охайність та довготривалий результат без шкоди для здоров'я нігтів.",
    information: "Тривалість: 60 хвилин.",
    image: "images/shop/manicure.jpg",
  },
  {
    id: 4,
    title: "Педикюр",
    price: 249,
    description:
      "Комплексний догляд за стопами, включаючи очищення, обробку нігтів, видалення ороговілої шкіри та зволоження. Процедура забезпечує свіжість, легкість та естетичний вигляд ваших ніг, що особливо важливо в теплу пору року.",
    information: "Тривалість: 70 хвилин.",
    image: "images/shop/pedicure.jpg",
  },
  {
    id: 5,
    title: "Фарбування волосся",
    price: 499,
    description:
      "Професійне фарбування волосся з використанням якісних фарб, що гарантують стійкий результат та дбайливе ставлення до структури волосся. Послуга включає консультацію щодо вибору кольору, техніку нанесення та післяфарбувальний догляд.",
    information: "Тривалість: 90 хвилин.",
    image: "images/shop/hair-color.jpeg",
  },
  {
    id: 6,
    title: "Укладка волосся",
    price: 199,
    description:
      "Індивідуальна укладка волосся за допомогою професійних засобів і технік, що створює привабливий і довготривалий результат. Ідеальний вибір для важливих подій або для підкреслення стилю у звичайний день.",
    information: "Тривалість: 40 хвилин.",
    image: "images/shop/hair-styling.jpg",
  },
  {
    id: 7,
    title: "Масаж обличчя",
    price: 299,
    description:
      "Розслаблюючий та тонізуючий масаж обличчя, який сприяє зняттю м’язової напруги, поліпшенню кровообігу та омолодженню шкіри. Ідеально підходить для тих, хто хоче виглядати свіжо та доглянуто без інʼєкцій чи агресивних процедур.",
    information: "Тривалість: 30 хвилин.",
    image: "images/shop/face-massage.jpg",
  },
  {
    id: 8,
    title: "Брови та вії",
    price: 179,
    description:
      "Комплексна процедура, що включає корекцію форми брів, фарбування, а також ламінування вій. Вона допоможе підкреслити природну красу очей, зробить погляд більш виразним і дозволить заощадити час на щоденний макіяж.",
    information: "Тривалість: 50 хвилин.",
    image: "images/shop/brows-lashes.jpg",
  },
  {
    id: 9,
    title: "Гоління бороди",
    price: 159,
    description:
      "Традиційне гоління з використанням небезпечного леза та спеціальних засобів для помʼякшення щетини. Процедура забезпечує гладке гоління без подразнень і створює відчуття свіжості та доглянутості.",
    information: "Тривалість: 20 хвилин.",
    image: "images/shop/beard-shave.jpg",
  },
  {
    id: 10,
    title: "Дитяча стрижка",
    price: 249,
    description:
      "Охайна та безпечна стрижка для дітей віком до 12 років з індивідуальним підходом та приємною атмосферою. Майстри вміють знайти підхід до кожної дитини та зробити процес комфортним і навіть веселим.",
    information: "Тривалість: 25 хвилин.",
    image: "images/shop/kids-haircut.jpg",
  },
  {
    id: 11,
    title: "Фен для волосся",
    price: 799,
    description:
      "Потужний та ергономічний фен із кількома режимами нагріву та подачі повітря. Підходить для домашнього та професійного використання, дозволяє швидко висушити волосся без пересушування.",
    information: "Гарантія: 1 рік.",
    image: "images/shop/hair-dryer.jpg",
  },
  {
    id: 12,
    title: "Професійна розчіска",
    price: 129,
    description:
      "Антистатична щітка з нейлоновими зубцями для комфортного та легкого розчісування навіть густого або кучерявого волосся. Допомагає запобігти ламкості та розшаруванню волосся.",
    information: "Матеріал: пластик + нейлон.",
    image: "images/shop/hair-brush.jpg",
  },
  {
    id: 13,
    title: "Ножиці для стрижки",
    price: 349,
    description:
      "Професійні перукарські ножиці з високоякісної нержавіючої сталі забезпечують точне та м’яке зрізання волосся. Ергономічна форма ручок дозволяє працювати довго без втоми рук.",
    information: "Довжина: 6 дюймів.",
    image: "images/shop/scissors.jpg",
  },
  {
    id: 14,
    title: "Плойка для завивки",
    price: 599,
    description:
      "Професійна плойка для створення пружних локонів і природних хвиль. Швидко нагрівається, має захист від перегріву, ідеально підходить для домашнього та салонного використання.",
    information: "Діаметр: 25 мм, нагрів до 200°C.",
    image: "images/shop/curling-iron.jpg",
  },
  {
    id: 15,
    title: "Дзеркало настільне",
    price: 199,
    description:
      "Зручне косметичне дзеркало з підставкою, яке можна розмістити на будь-якій поверхні. Чудово підходить для щоденного макіяжу, догляду за шкірою або стрижки.",
    information: "Діаметр: 15 см.",
    image: "images/shop/mirror.jpg",
  },
  {
    id: 16,
    title: "Фартух перукаря",
    price: 299,
    description:
      "Практичний та стильний фартух для майстрів, виготовлений з водовідштовхувального матеріалу. Захищає одяг від забруднень під час фарбування, стрижки чи укладки волосся.",
    information: "Розмір універсальний.",
    image: "images/shop/apron.jpg",
  },
];
// Масив для зберігання товарів у кошику
let cart = [];
let activeUser = localStorage.getItem("UserActive")
  ? JSON.parse(localStorage.getItem("UserActive"))
  : null;
let orderCounter = localStorage.getItem(
  `HaircutsOrderCounter_${activeUser?.id}`
)
  ? parseInt(localStorage.getItem(`HaircutsOrderCounter_${activeUser?.id}`))
  : 0;
// Додаємо лічильник загальної кількості замовлень
let totalOrderCounter = localStorage.getItem("HaircutsOrderCounterTotal")
  ? parseInt(localStorage.getItem("HaircutsOrderCounterTotal"))
  : 0;
// Функція для оновлення відображення кошика
function updateCartDisplay() {
  cartItemCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  cartItemsList.innerHTML = `
    <li>
      <span>№</span>
      <span>Назва послуги</span>
      <span>Кількість</span>
      <span>Сума</span>
      <span>Дії</span>
    </li>
  `;

  let total = 0;
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${index + 1}</span>
      <span>${item.title}</span>
      <span>${item.quantity}</span>
      <span>${(item.quantity * item.price).toFixed(2)} UAH</span>
      <span><button class="remove-from-cart-button" data-product-id="${
        item.id
      }">Х</button></span>
    `;
    cartItemsList.appendChild(listItem);
    total += item.quantity * item.price;
  });

  cartTotalPriceDisplayHeader.textContent = total.toFixed(2) + " UAH";
  cartTotalPriceDisplayModal.textContent = total.toFixed(2) + " UAH";

  const removeButtons = document.querySelectorAll(".remove-from-cart-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.productId);
      removeFromCart(productId);
    });
  });
}
// Функція для зміни кількості товару
function changeQuantity(productId, change) {
  const productCard = Array.from(productGrid.children).find(
    (card) =>
      card.querySelector(".product-title").textContent ===
      productsData.find((p) => p.id === productId).title
  );
  if (productCard) {
    const quantityInput = productCard.querySelector(".quantity-input");
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;
    if (newValue >= 0) {
      quantityInput.value = newValue;
    }
  }
}
// Функція для додавання товару в кошик
function addToCart(productId, quantity) {
  if (quantity > 0) {
    const product = productsData.find((p) => p.id === productId);
    if (product) {
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
}
// Функція для видалення товару з кошика
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}
// Функція для відображення деталей товару
function showDetails(id) {
  const productDetails = productsData.find((product) => product.id === id);
  if (productDetails) {
    detailsContent.innerHTML = `
      <p>ID послуги: ${productDetails.id}</p>
      <p>${productDetails.description}</p>
      <p>Ціна: ${productDetails.price} UAH</p>
      <p>${productDetails.information}</p>
    `;
    detailsModal.style.display = "block";
  } else {
    detailsContent.innerHTML = "<p>Не вдалося завантажити деталі послуги.</p>";
    detailsModal.style.display = "block";
  }
}
// Функція для обробки кліку на кнопку "Оформити замовлення"
function handleCheckoutClick() {
  if (cart.length === 0) {
    warningMessage.textContent =
      "Ваш кошик порожній. Додайте послуги для оформлення замовлення.";
    warningModal.style.display = "block";
    return;
  }
  confirmModal.style.display = "block";
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
// Функція для форматування дати
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
// Додаємо обробник події для кнопки "Закрити" в модальному вікні деталей
confirmYesButton.addEventListener("click", () => {
  if (cart.length > 0 && activeUser) {
    const orderNumber = orderCounter++;
    localStorage.setItem(`HaircutsOrderCounter_${activeUser.id}`, orderCounter);
    // Інкрементуємо лічильник загальної кількості замовлень
    totalOrderCounter++;
    localStorage.setItem("HaircutsOrderCounterTotal", totalOrderCounter);

    const orderDetails = {
      orderNumber: orderNumber + 1,
      totalOrderNumber: totalOrderCounter,
      userId: activeUser.id,
      userName: activeUser.name, // Додаємо ім'я користувача
      userEmail: activeUser.email, // Додаємо email користувача
      userPhone: activeUser.phone, // Додаємо телефон користувача
      items: [...cart],
      total: parseFloat(cartTotalPriceDisplayHeader.textContent),
      timestamp: formatTimestamp(new Date().toISOString()),
    };

    let existingOrders = localStorage.getItem("HaircutsOrders");
    let ordersArray = existingOrders ? JSON.parse(existingOrders) : [];
    ordersArray.push(orderDetails);
    localStorage.setItem("HaircutsOrders", JSON.stringify(ordersArray));

    confirmModal.style.display = "none";
    thankYouMessage.textContent = `Дякуємо за замовлення! Номер вашого замовлення: ${
      orderNumber + 1
    }. Загальний номер замовлення в системі: ${totalOrderCounter}`; // Оновлюємо повідомлення
    thankYouModal.style.display = "block";
    cart = [];
    updateCartDisplay();
  } else {
    warningMessage.textContent = activeUser
      ? "Ваш кошик порожній. Неможливо оформити замовлення."
      : "Будь ласка, увійдіть або зареєструйтеся для оформлення замовлення.";
    warningModal.style.display = "block";
  }
});
// Функція для відображення історії замовлень
function showOrderHistory() {
  if (activeUser) {
    const existingOrders = localStorage.getItem("HaircutsOrders");
    const orderHistory = existingOrders
      ? JSON.parse(existingOrders).filter(
          (order) => order.userId === activeUser.id
        )
      : [];
    // Сортуємо історію замовлень за номером у спадному порядку
    orderHistory.sort((a, b) => b.orderNumber - a.orderNumber);
    orderHistoryList.innerHTML = "";
    if (orderHistory.length > 0) {
      orderHistoryEmptyMessage.style.display = "none";
      orderHistory.forEach((order) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <h3>Замовлення №${order.orderNumber} (Загальний №${
          order.totalOrderNumber
        })</h3> <p>Дата: ${formatTimestamp(order.timestamp)}</p><ul>
            ${order.items
              .map(
                (item) =>
                  `<li>${item.title} x ${item.quantity} - ${(
                    item.price * item.quantity
                  ).toFixed(2)} UAH</li>`
              )
              .join("")} </ul>
          <p>Загальна сума: ${order.total.toFixed(2)} UAH</p>
        `;
        orderHistoryList.appendChild(listItem);
      });
      orderHistoryModal.style.display = "block";
    } else {
      orderHistoryEmptyMessage.style.display = "block";
      orderHistoryModal.style.display = "block";
    }
  } else {
    warningMessage.textContent =
      "Будь ласка, увійдіть, щоб переглянути історію замовлень.";
    warningModal.style.display = "block";
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
// Функція для рендерингу товарів
function renderProducts() {
  productGrid.innerHTML = "";

  productsData.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("cart-image-container");

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = product.title;

    imageContainer.appendChild(imageElement);
    productCard.appendChild(imageContainer);

    const titleElement = document.createElement("h3");
    titleElement.classList.add("product-title");
    titleElement.textContent = product.title;
    productCard.appendChild(titleElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Ціна: ${product.price.toFixed(2)} UAH`;
    productCard.appendChild(priceElement);

    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");
    quantityControls.innerHTML = `
      <button class="quantity-button">-</button>
   <input type="number" class="quantity-input" value="0" min="0">
   <button class="quantity-button">+</button>
   `;
    productCard.appendChild(quantityControls);

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.dataset.productId = product.id;
    addToCartButton.textContent = "Додати у кошик";
    productCard.appendChild(addToCartButton);

    const detailsButton = document.createElement("button");
    detailsButton.classList.add("details-button");
    detailsButton.dataset.productId = product.id;
    detailsButton.textContent = "Деталі";
    productCard.appendChild(detailsButton);

    productGrid.appendChild(productCard);
  });

  initializeQuantityControls();
  initializeDetailsButtons();
  initializeAddToCartButtons();
}
// Функція для ініціалізації кнопок лічильника
function initializeQuantityControls() {
  const quantityControls = document.querySelectorAll(
    ".product-card .quantity-controls"
  );
  quantityControls.forEach((controls) => {
    const decreaseButton = controls.querySelector(
      ".quantity-button:first-child"
    );
    const increaseButton = controls.querySelector(
      ".quantity-button:last-child"
    );
    const quantityInput = controls.querySelector(".quantity-input");
    const productId = parseInt(
      controls.closest(".product-card").querySelector(".details-button").dataset
        .productId
    );

    decreaseButton.addEventListener("click", () =>
      changeQuantity(productId, -1)
    );
    increaseButton.addEventListener("click", () =>
      changeQuantity(productId, 1)
    );
    quantityInput.addEventListener("change", () => {});
  });
}
// Функція для ініціалізації кнопок деталей
function initializeDetailsButtons() {
  const detailsButtons = document.querySelectorAll(".details-button");
  detailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.productId);
      showDetails(productId);
    });
  });
}
// Функція для ініціалізації кнопок "Додати у кошик"
function initializeAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.productId);
      const productCard = this.closest(".product-card");
      const quantityInput = productCard.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      addToCart(productId, quantity);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartDisplay();

  // Ініціалізуємо лічильник загальної кількості замовлень при завантаженні сторінки
  totalOrderCounter = localStorage.getItem("HaircutsOrderCounterTotal")
    ? parseInt(localStorage.getItem("HaircutsOrderCounterTotal"))
    : 0;

  // Отримання елемента select для сортування
  const sortBySelect = document.getElementById("sort-by");
  if (sortBySelect) {
    sortBySelect.addEventListener("change", function () {
      const selectedValue = this.value;
      sortProducts(selectedValue);
    });
  } else {
    console.error("Елемент вибору сортування не знайдено.");
  }

  // Додаємо обробник події до кнопки "Оформити замовлення"
  const checkoutButton = document.querySelector(".checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleCheckoutClick);
  } else {
    console.error("Кнопка 'Оформити замовлення' не знайдена.");
  }
});
// Функція для сортування товарів
function sortProducts(sortBy) {
  let sortedProducts = [...productsData]; // Створюємо копію масиву, щоб не змінювати оригінал

  switch (sortBy) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "default":
      sortedProducts.sort((a, b) => a.id - b.id); // Повертаємо початковий порядок
      break;
  }

  productsData = sortedProducts; // Оновлюємо масив з відсортованими товарами
  renderProducts(); // Перерендеримо відображення товарів
}

if (sortBySelect) {
  sortBySelect.addEventListener("change", function () {
    const selectedValue = this.value;
    sortProducts(selectedValue);
  });
} else {
  console.error("Елемент вибору сортування не знайдено.");
}
