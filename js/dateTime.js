function updateDateTime() {
  const now = new Date();
  const days = [
    "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота",
  ];
  const months = [
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
  ];
  const dayOfWeek = days[now.getDay()];
  const dayOfMonth = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dateTimeString = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} &nbsp; 
  ${hours}:${minutes}:${seconds}`;
  const dateTimeElement = document.querySelector(".date-time");
  if (dateTimeElement) {
    dateTimeElement.innerHTML = dateTimeString;
  }
}
// Оновлюємо час кожну секунду
setInterval(updateDateTime, 1000);
updateDateTime();
