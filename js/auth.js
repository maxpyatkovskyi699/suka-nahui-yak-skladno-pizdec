document.addEventListener("DOMContentLoaded", function () {
  // Отримання посилань на елементи DOM, пов'язані з аутентифікацією та UI
  const signInBtn = document.getElementById("signInBtn");
  const registerBtn = document.getElementById("registerBtn");
  const signOutBtn = document.getElementById("signOutBtn");
  const userInfoDiv = document.getElementById("user-info");
  const avatarImg = document.getElementById("avatar");
  const usernameSpan = document.getElementById("username");

  const signInModal = document.getElementById("signInModal");
  const registerModal = document.getElementById("registerModal");
  const signInForm = document.getElementById("signInForm");
  const registerForm = document.getElementById("registerForm");

  const goToRegisterLink = document.getElementById("goToRegister");
  const goToSignInLink = document.getElementById("goToSignIn");
  const signInCloseBtn = signInModal.querySelector(".close-button");
  const registerCloseBtn = registerModal.querySelector(".close-button");

  const signInEmailPhoneInput = document.getElementById("signInEmailPhone");
  const signInPasswordInput = document.getElementById("signInPassword");

  const signInEmailPhoneError = document.getElementById(
    "signInEmailPhoneError"
  );
  const signInPasswordError = document.getElementById("signInPasswordError");
  const signInSuccessMessage = document.getElementById("signInSuccessMessage");
  const signInErrorMessage = document.getElementById("signInErrorMessage");

  const registerNameInput = document.getElementById("registerName");
  const registerPhoneInput = document.getElementById("registerPhone");
  const registerEmailInput = document.getElementById("registerEmail");
  const registerPasswordInput = document.getElementById("registerPassword");
  const registerNameError = document.getElementById("registerNameError");
  const registerPhoneError = document.getElementById("registerPhoneError");
  const registerEmailError = document.getElementById("registerEmailError");
  const registerPasswordError = document.getElementById(
    "registerPasswordError"
  );
  const registerSuccessMessage = document.getElementById(
    "registerSuccessMessage"
  );
  const registerErrorMessage = document.getElementById("registerErrorMessage");

  // Ключі локального сховища
  const usersStorageKey = "usersStorage"; // Ключ для зберігання масиву всіх користувачів
  const activeUserKey = "UserActive"; // Ключ для зберігання інформації про поточного активного користувача
  const userCountKey = "UserCount"; // Ключ для зберігання загальної кількості користувачів

  // Отримання даних користувачів з локального сховища або ініціалізація порожнього масиву
  let users = JSON.parse(localStorage.getItem(usersStorageKey)) || [];
  let userCount = parseInt(localStorage.getItem(userCountKey)) || 0;

  // Функція для збереження користувачів у локальне сховище
  function saveUsers() {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
  }

  // Функція для збереження активного користувача
  function saveActiveUser(user) {
    localStorage.setItem(activeUserKey, JSON.stringify(user));
  }

  // Функція для отримання активного користувача
  function getActiveUser() {
    return JSON.parse(localStorage.getItem(activeUserKey));
  }

  // Функція для видалення активного користувача
  function clearActiveUser() {
    localStorage.removeItem(activeUserKey);
  }

  // Функція для збереження загальної кількості користувачів
  function saveUserCount() {
    localStorage.setItem(userCountKey, userCount);
  }

  // Функція для відображення/приховування елементів залежно від стану користувача
  function updateAuthUI() {
    const activeUser = getActiveUser();
    if (activeUser) {
      signInBtn.style.display = "none";
      registerBtn.style.display = "none";
      userInfoDiv.style.display = "flex";
      usernameSpan.textContent = activeUser.name;
    } else {
      signInBtn.style.display = "block";
      registerBtn.style.display = "block";
      userInfoDiv.style.display = "none";
    }
  }

  // Виклик функції для встановлення початкового стану UI
  updateAuthUI();

  // Обробники відкриття модальних вікон
  signInBtn.addEventListener("click", () => {
    if (registerModal.style.display === "block") {
      registerModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    signInModal.style.display = "block";
    document.body.style.overflow = "hidden";
    signInEmailPhoneError.textContent = "";
    signInPasswordError.textContent = "";
    signInSuccessMessage.style.display = "none";
    signInErrorMessage.style.display = "none";
  });

  registerBtn.addEventListener("click", () => {
    if (signInModal.style.display === "block") {
      signInModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    registerModal.style.display = "block";
    document.body.style.overflow = "hidden";
    registerNameError.textContent = "";
    registerPhoneError.textContent = "";
    registerEmailError.textContent = "";
    registerPasswordError.textContent = "";
    registerSuccessMessage.style.display = "none";
    registerErrorMessage.style.display = "none";
  });

  // Обробники закриття модальних вікон
  signInCloseBtn.addEventListener("click", () => {
    signInModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  registerCloseBtn.addEventListener("click", () => {
    registerModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === signInModal) {
      signInModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (event.target === registerModal) {
      registerModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Обробники переходу між формами
  goToRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    signInModal.style.display = "none";
    registerModal.style.display = "block";
  });

  goToSignInLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "none";
    signInModal.style.display = "block";
  });

  // Валідація форми реєстрації
  function validateRegisterForm() {
    let isValid = true;

    const nameValue = registerNameInput.value.trim();
    if (nameValue.length < 2 || nameValue.length > 49) {
      registerNameError.textContent =
        "Ім'я повинно містити від 2 до 49 символів.";
      isValid = false;
    } else {
      registerNameError.textContent = "";
    }

    registerPhoneError.textContent =
      registerPhoneInput.value.trim() === ""
        ? "Будь ласка, введіть номер телефону."
        : "";
    if (
      registerPhoneError.textContent === "" &&
      !/^\+?\d+$/.test(registerPhoneInput.value.trim())
    ) {
      registerPhoneError.textContent = "Невірний формат номеру телефону.";
      isValid = false;
    }

    const emailValue = registerEmailInput.value.trim();
    if (emailValue === "") {
      registerEmailError.textContent = "Будь ласка, введіть електронну пошту.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      registerEmailError.textContent = "Невірна електронна пошта.";
      registerEmailError.style.color = "red"; // Додано червоний колір
      isValid = false;
    } else {
      registerEmailError.textContent = "";
      registerEmailError.style.color = ""; // Повертаємо колір за замовчуванням
    }

    const passwordValue = registerPasswordInput.value;
    if (passwordValue === "") {
      registerPasswordError.textContent = "Будь ласка, введіть пароль.";
      isValid = false;
    } else if (passwordValue.length < 6 || passwordValue.length > 49) {
      registerPasswordError.textContent =
        "Пароль повинен містити від 6 до 49 символів.";
      isValid = false;
    } else {
      registerPasswordError.textContent = "";
    }

    return isValid;
  }

  // Обробник відправки форми реєстрації
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      const name = registerNameInput.value.trim();
      const phone = registerPhoneInput.value.trim();
      const email = registerEmailInput.value.trim();
      const password = registerPasswordInput.value;

      const existingUser = users.find(
        (user) => user.phone === phone || user.email === email
      );

      if (existingUser) {
        registerErrorMessage.textContent =
          "Користувач з таким номером телефону або електронною поштою вже існує.";
        registerErrorMessage.style.display = "block";
        registerSuccessMessage.style.display = "none";
      } else {
        const newUser = {
          id: ++userCount, // Генеруємо інкрементний ID
          name: name,
          phone: phone,
          email: email,
          password: password,
        };
        users.push(newUser);
        saveUsers();
        saveActiveUser(newUser);
        saveUserCount(); // Зберігаємо оновлену кількість користувачів
        registerForm.reset();
        registerErrorMessage.style.display = "none";
        registerSuccessMessage.textContent = "Реєстрація успішна!";
        registerSuccessMessage.style.display = "block";
        setTimeout(() => {
          registerModal.style.display = "none";
          document.body.style.overflow = "auto";
          updateAuthUI();
        }, 1500);
      }
    }
  });

  // Валідація форми входу
  function validateSignInForm() {
    signInEmailPhoneError.textContent =
      signInEmailPhoneInput.value.trim() === ""
        ? "Будь ласка, введіть електронну пошту або номер телефону."
        : "";
    signInPasswordError.textContent =
      signInPasswordInput.value === "" ? "Будь ласка, введіть пароль." : "";
    return (
      signInEmailPhoneInput.value.trim() !== "" &&
      signInPasswordInput.value !== ""
    );
  }

  // Обробник відправки форми входу
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateSignInForm()) {
      const emailOrPhone = signInEmailPhoneInput.value.trim();
      const password = signInPasswordInput.value;

      const user = users.find(
        (u) =>
          (u.email === emailOrPhone || u.phone === emailOrPhone) &&
          u.password === password
      );

      if (user) {
        saveActiveUser(user);
        signInForm.reset();
        signInErrorMessage.style.display = "none";
        signInSuccessMessage.textContent = "Вхід успішний!";
        signInSuccessMessage.style.display = "block";
        setTimeout(() => {
          signInModal.style.display = "none";
          document.body.style.overflow = "auto";
          updateAuthUI();
        }, 1500);
      } else {
        signInErrorMessage.textContent = "Невірний логін або пароль.";
        signInErrorMessage.style.display = "block";
        signInSuccessMessage.style.display = "none";
      }
    }
  });

  // Обробник кнопки "Вийти"
  signOutBtn.addEventListener("click", () => {
    clearActiveUser();
    updateAuthUI();
  });
  function updateAuthUI() {
    const activeUser = getActiveUser();
    if (activeUser) {
      signInBtn.style.display = "none";
      registerBtn.style.display = "none";
      userInfoDiv.style.display = "flex";
      usernameSpan.textContent = activeUser.name;
      usernameSpan.style.overflowWrap = "break-word"; // Використовуємо сучасну властивість overflow-wrap
    } else {
      signInBtn.style.display = "block";
      registerBtn.style.display = "block";
      userInfoDiv.style.display = "none";
      usernameSpan.style.overflowWrap = ""; // Очищаємо властивість
    }
  }
});
