document.addEventListener("DOMContentLoaded", () => {
  const supportForm = document.getElementById("supportForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const descriptionInput = document.getElementById("description");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const descriptionError = document.getElementById("descriptionError");
  const successMessage = document.getElementById("successMessage");
  const generalError = document.getElementById("generalError");

  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Будь ласка, введіть ПІБ.";
      return false;
    } else if (
      nameInput.value.trim().length < 2 ||
      nameInput.value.trim().length > 99
    ) {
      nameError.textContent = "ПІБ має містити від 2 до 99 символів.";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validatePhone() {
    const cleaned = phoneInput.value.replace(/[^0-9]/g, ""); // лише цифри
    const phoneRegex = /^\+?[0-9\s\-()]*$/;

    if (!phoneRegex.test(phoneInput.value)) {
      phoneError.textContent =
        "Будь ласка, введіть коректний номер телефону (дозволено +, (), -, пробіл та цифри).";
      return false;
    }

    if (cleaned.length < 10 || cleaned.length > 14) {
      phoneError.textContent =
        "Номер телефону повинен містити від 10 до 14 цифр.";
      return false;
    }

    phoneError.textContent = "";
    return true;
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Будь ласка, введіть коректну електронну пошту.";
      return false;
    } else if (emailInput.value.length > 99) {
      emailError.textContent =
        "Електронна пошта не може бути довшою за 99 символів.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validateSubject() {
    if (subjectInput.value.trim() === "") {
      subjectError.textContent = "Будь ласка, введіть тему звернення.";
      return false;
    } else if (
      subjectInput.value.trim().length < 5 ||
      subjectInput.value.trim().length > 149
    ) {
      subjectError.textContent =
        "Тема звернення має містити від 5 до 149 символів.";
      return false;
    }
    subjectError.textContent = "";
    return true;
  }

  function validateDescription() {
    if (descriptionInput.value.trim() === "") {
      descriptionError.textContent = "Будь ласка, введіть опис звернення.";
      return false;
    } else if (
      descriptionInput.value.trim().length < 10 ||
      descriptionInput.value.trim().length > 799
    ) {
      descriptionError.textContent =
        "Опис звернення має містити від 10 до 799 символів.";
      return false;
    }
    descriptionError.textContent = "";
    return true;
  }

  supportForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isDescriptionValid = validateDescription();

    if (
      isNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isSubjectValid &&
      isDescriptionValid
    ) {
      const message = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        description: descriptionInput.value,
        timestamp: new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
          .toISOString()
          .replace("T", " ")
          .replace("Z", ""),
      };

      let messages = JSON.parse(localStorage.getItem("SupportMessages")) || [];
      const nextId =
        messages.length > 0
          ? Math.max(...messages.map((msg) => msg.id)) + 1
          : 1;
      message.id = nextId;
      messages.push(message);

      localStorage.setItem("SupportMessages", JSON.stringify(messages));

      supportForm.reset();
      successMessage.textContent = "Ваше повідомлення успішно відправлено!";
      successMessage.style.display = "block";
      generalError.style.display = "none";

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    } else {
      generalError.textContent = "Будь ласка, виправте помилки у формі.";
      generalError.style.display = "block";
      successMessage.style.display = "none";
    }
  });

  nameInput.addEventListener("blur", validateName);
  phoneInput.addEventListener("blur", validatePhone);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  descriptionInput.addEventListener("blur", validateDescription);
});
