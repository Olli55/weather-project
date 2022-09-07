let currentDate = new Date();
let data = document.querySelector("#current-data");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let time = currentDate.getHours();

function addZero(minute) {
  if (minute < 10) {
    minute = "0" + minute;
  }
  return minute;
}
let minutes = addZero(currentDate.getMinutes());
data.innerHTML = `${day} <br /><br /> ${time}:${minutes}`;

//
function changeCity(event) {
  event.preventDefault();

  let inputCity = document.querySelector("#city-input");
  let infoCity = document.querySelector("#search-info");
  let cityName = inputCity.value;
  infoCity.innerHTML = `${inputCity.value} <br />
      <br />
      0 m/s`;
  let apiKey = "8070c15c02f292da4c39668062db2856";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", changeCity);

function showTemperature(responce) {
  let tempItCity = Math.round(responce.data.main.temp);
  let locationCity = responce.data.name;
  let infoCity = document.querySelector("#search-info");
  let wind = responce.data.wind.speed;

  infoCity.innerHTML = `${locationCity} <br />
      <br />
      ${wind} m/s`;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${tempItCity}`;
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "8070c15c02f292da4c39668062db2856";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function changeMyLocationCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentPosition = document.querySelector("#my-location");
currentPosition.addEventListener("click", changeMyLocationCity);

myLocation(position);

////
function convertTemperature() {
  let temp = document.querySelector("#current-temperature");
  let tempC = 20;
  temp.innerHTML = `${tempC}`;
}
let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("click", convertTemperature);

function convertTempInF() {
  let temp = document.querySelector("#current-temperature");
  let tempF = 68;
  temp.innerHTML = `${tempF}`;
}
let temperatureF = document.querySelector("#fahrenheit");
temperatureF.addEventListener("click", convertTempInF);
