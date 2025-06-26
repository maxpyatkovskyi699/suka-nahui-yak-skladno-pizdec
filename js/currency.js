const resultArea = document.getElementById("result");
const dateInput = document.getElementById("date");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");

let exchangeRates = {}; // Тут будемо зберігати курси валют

// Форматуємо дату у формат "dd.mm.yyyy"
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
// Отримуємо курси валют з ПриватБанку
async function fetchExchangeRates(date) {
  try {
    const formattedDate = formatDate(date);
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/exchange_rates?date=${formattedDate}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }
    const data = await response.json();
    // Зберігаємо курси
    exchangeRates = {};
    // Додаємо гривню вручну, бо вона є базовою
    exchangeRates["UAH"] = {
      currency: "UAH",
      saleRateNB: 1,
      purchaseRateNB: 1,
    };

    // Збираємо дані в зручний формат
    data.exchangeRate.forEach((rate) => {
      if (rate.currency) {
        exchangeRates[rate.currency] = rate;
      }
    });

    updateCurrencySelects();
  } catch (error) {
    resultArea.value = "Сталася помилка: " + error.message;
  }
}

// Оновлюємо списки валют
function updateCurrencySelects() {
  fromCurrencySelect.innerHTML = '<option value="">Виберіть валюту</option>';
  toCurrencySelect.innerHTML = '<option value="">Виберіть валюту</option>';

  const availableCurrencies = Object.keys(exchangeRates).sort(); // Отримуємо відсортовані ключі

  availableCurrencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrencySelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrencySelect.appendChild(optionTo);
  });

  if (availableCurrencies.includes("UAH")) {
    fromCurrencySelect.value = "UAH";
  }
  if (availableCurrencies.includes("UAH")) {
    toCurrencySelect.value = "UAH";
  }
}

// Розрахунок конвертації
function convertCurrency() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!fromCurrency || !toCurrency || isNaN(amount)) {
    resultArea.value = "Будь ласка, введіть усі дані.";
    return;
  }

  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    resultArea.value = "Немає даних для обраних валют.";
    return;
  }

  let exchangeRate;

  if (toCurrency === "UAH") {
    exchangeRate = exchangeRates[fromCurrency].saleRateNB;
  } else if (fromCurrency === "UAH") {
    exchangeRate = 1 / exchangeRates[toCurrency].purchaseRateNB;
  } else {
    exchangeRate =
      exchangeRates[fromCurrency].saleRateNB /
      exchangeRates[toCurrency].purchaseRateNB;
  }

  const convertedAmount = amount * exchangeRate;

  // Формуємо текст результату
  const formattedDate = formatDate(date);

  resultArea.value =
    `Дата конвертації: ${formattedDate}\n` +
    `Курс ${fromCurrency} → ${toCurrency}: ${exchangeRate.toFixed(4)}\n` +
    `Введена сума: ${amount} ${fromCurrency}\n` +
    `Сума до видачі: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

// Отримуємо курс долара за замовчуванням при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10); // Формат YYYY-MM-DD для input type="date"
  dateInput.value = formattedToday;
  fetchExchangeRates(formattedToday);
});

// Слухаємо зміну дати
dateInput.addEventListener("change", () => {
  if (dateInput.value) {
    fetchExchangeRates(dateInput.value);
  }
});

// Слухаємо натискання кнопки
convertBtn.addEventListener("click", convertCurrency);
