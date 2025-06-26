document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingInput = document.getElementById("rating");
  const reviewText = document.getElementById("reviewText");
  const submitReviewButton = document.getElementById("submitReview");
  const reviewMessage = document.getElementById("reviewMessage");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      ratingInput.value = value;

      stars.forEach((s) => s.classList.remove("active"));
      for (let i = 0; i < value; i++) {
        stars[i].classList.add("active");
      }
    });
  });

  submitReviewButton.addEventListener("click", function () {
    const userActiveString = localStorage.getItem("UserActive");
    let userData = null;

    if (userActiveString) {
      try {
        userData = JSON.parse(userActiveString);
      } catch (error) {
        console.error("Помилка при парсингу UserActive:", error);
        reviewMessage.textContent = "Помилка авторизації.";
        reviewMessage.style.color = "red";
        return;
      }
    }

    const starsValue = ratingInput.value;
    const text = reviewText.value.trim();

    if (!userData) {
      reviewMessage.textContent = "Будь ласка, увійдіть, щоб залишити відгук.";
      reviewMessage.style.color = "red";
      return;
    }

    // Перевірка, чи користувач вже залишав відгук
    let existingReviews = localStorage.getItem("UserReviews");
    existingReviews = existingReviews ? JSON.parse(existingReviews) : [];

    const hasUserReviewed = existingReviews.some(
      (review) => review.id === userData.id
    );

    if (hasUserReviewed) {
      reviewMessage.textContent = "Ви вже залишили свій відгук раніше.";
      reviewMessage.style.color = "red";
      return;
    }

    if (starsValue === "0") {
      reviewMessage.textContent = "Будь ласка, оберіть кількість зірок.";
      reviewMessage.style.color = "red";
      return;
    }

    if (text.length < 1 || text.length > 299) {
      reviewMessage.textContent =
        "Довжина відгуку має бути від 1 до 299 символів.";
      reviewMessage.style.color = "red";
      return;
    }

    const reviewNumber = existingReviews.length + 1;

    const newReview = {
      ReviewNumber: reviewNumber, // Додано порядковий номер відгуку
      name: userData.name,
      email: userData.email,
      id: userData.id,
      phone: userData.phone,
      stars: starsValue,
      text: text,
    };

    existingReviews.push(newReview);
    localStorage.setItem("UserReviews", JSON.stringify(existingReviews));

    reviewText.value = "";
    ratingInput.value = "0";
    stars.forEach((s) => s.classList.remove("active"));
    reviewMessage.textContent = "Дякуємо за ваш відгук!";
    reviewMessage.style.color = "green";
  });
});
