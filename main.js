import { getWeatherData } from "./fetching";

const currentWeatherLocationEL = document.querySelector(
  ".current-weather__location"
);
const currentTemperatureEL = document.querySelector(
  ".current-weather__current-temperature"
);
const currentWeatherConditionEL = document.querySelector(
  ".current-weather__condition"
);
const currentMaxTemperatureEL = document.querySelector(
  ".current-weather__max-temperature"
);
const currentMinTemperatureEL = document.querySelector(
  ".current-weather__min-temperature"
);
const bodyEl = document.querySelector(".show-background");

addEventListener("DOMContentLoaded", bodyEl);
addEventListener("DOMContentLoaded", showCurrentWeatherData);

function showLoadingScreen() {
  bodyEl.innerHTML = `<div class="loading-screen">
      <p class="loading-message">Lade Wetterdaten...</p>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>`;
}

async function showWeatherData() {
  const allWeatherData = await getWeatherData();

  bodyEl.innerHTML = ` 
      <div class="current-weather">
        <h2 class="current-weather__location">${
          allWeatherData.location.name
        }</h2>
        <h1 class="current-weather__current-temperature">${
          Math.floor(allWeatherData.current.temp_c) + "°"
        }</h1>
        <p class="current-weather__condition">${
          allWeatherData.current.condition.text
        }</p>
        <div class="current-weather__day-temperatures">
          <span class="current-weather__max-temperature">${
            "H:" +
            Math.floor(allWeatherData.forecast.forecastday[0].day.maxtemp_c) +
            "°"
          }</span>
          <span class="current-weather__min-temperature">${
            "T:" +
            Math.floor(allWeatherData.forecast.forecastday[0].day.mintemp_c) +
            "°"
          }</span>
        </div>
      </div>`;
}

async function showCurrentWeatherData() {
  showLoadingScreen();

  showWeatherData();
}
