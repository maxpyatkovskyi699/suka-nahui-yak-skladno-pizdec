document.addEventListener("DOMContentLoaded", function () {
  const weatherSpan = document.querySelector(".pre-header .weather");
  const apiKey = "63fad3791521cac9c2c9943a476053cb";
  const city = "Odesa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

  function updateWeather() {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const description = data.weather[0].description;
        const temperature = Math.round(data.main.temp);
        const weatherText = `${
          description.charAt(0).toUpperCase() + description.slice(1)
        } ${temperature}°C, Одеса`;
        if (weatherSpan) {
          weatherSpan.textContent = weatherText;
        }
      })
      .catch((error) => {
        console.error("Помилка отримання даних про погоду:", error);
        if (weatherSpan) {
          weatherSpan.textContent = "Помилка завантаження погоди, Одеса";
        }
      });
  }

  updateWeather();
  setInterval(updateWeather, 10000); // Оновлення кожні 10 секунд
});
