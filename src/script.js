// Display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${day}, ${hours}:${minutes}`;
  return time;
}
let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Add a search engine, when searching for a city (i.e. Paris)
// display the city name on the page after the user submits the form.

function showSearchedCityWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  document.querySelector("#searched-city").innerHTML = response.data.name;
  // Temperature
  // instead of doing this:
  // let temperature = Math.round(response.data.main.temp);
  // let currentTemperature = document.querySelector("#current-temperature");
  // currentTemperature.innerHTML = temperature;
  // we can do this:
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // Wind speed
  console.log(Math.round(response.data.wind.speed));
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `${windSpeed}km/h`;
  // Humidity percentage
  console.log(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // Weather description
  console.log(response.data.weather[0].main);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "03350bc9666fd5c9b85ae3beb31df132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showSearchedCityWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
let goButton = document.querySelector("#search-form");
goButton.addEventListener("submit", handleSubmit);

searchCity("Brussels");

function searchCurrentLocation(position) {
  let apiKey = "03350bc9666fd5c9b85ae3beb31df132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchedCityWeather);
}

// My location button
function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", getMyLocation);
