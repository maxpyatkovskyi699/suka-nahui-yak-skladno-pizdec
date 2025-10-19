document.addEventListener("DOMContentLoaded", () => {
  const cityDisplayElement = document.createElement("div");
  cityDisplayElement.style.fontFamily = "Montserrat, sans-serif";
  cityDisplayElement.style.fontSize = "1em";
  cityDisplayElement.style.marginBottom = "5px";

  const weatherIconElement = document.getElementById("weather-icon");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("weather-description");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather");
  const weatherDataContainer = document.getElementById("weather-data");

  // Додаємо елемент для відображення міста перед іншими даними
  weatherDataContainer.prepend(cityDisplayElement);

  const apiKey = API_KEY;

  function updateWeatherData(data) {
    if (data && data.weather && data.main && data.wind && data.name) {
      cityDisplayElement.textContent = `Місто: ${data.name}`;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = `Погода: ${data.weather[0].description}`;
      humidityElement.textContent = `Вологість: ${data.main.humidity}%`;
      windSpeedElement.textContent = `Вітер: ${data.wind.speed} м/с`;
    } else {
      cityDisplayElement.textContent = "";
      temperatureElement.textContent = "Помилка отримання даних";
      descriptionElement.textContent = "";
      humidityElement.textContent = "";
      windSpeedElement.textContent = "";
      weatherIconElement.innerHTML = "";
    }
  }

  function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => updateWeatherData(data))
      .catch((error) => {
        console.error("Помилка отримання даних про погоду:", error);
        cityDisplayElement.textContent = "Місто не знайдено";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
        humidityElement.textContent = "";
        windSpeedElement.textContent = "";
        weatherIconElement.innerHTML = "";
      });
  }

  getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Будь ласка, введіть назву міста.");
    }
  });

  // Отримати погоду для Одеси за замовчуванням
  fetchWeatherData("Одеса");
});
