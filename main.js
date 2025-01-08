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

addEventListener("DOMContentLoaded", showCurrentWeatherData);

export function showLoadingScreen() {
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

export function hideLoadingScreen() {
  bodyEl.innerHTML = `<div class="current-weather">
        <h2 class="current-weather__location"></h2>
        <h1 class="current-weather__current-temperature"></h1>
        <p class="current-weather__condition"></p>
        <div class="current-weather__day-temperatures">
          <span class="current-weather__max-temperature"></span>
          <span class="current-weather__min-temperature"></span>
        </div>
      </div>`;
}

async function showCurrentWeatherData() {
  const allWeatherData = await getWeatherData();

  hideLoadingScreen();
  if (allWeatherData) {
  }
  currentWeatherLocationEL.innerText = allWeatherData.location.name;

  currentTemperatureEL.innerText =
    Math.floor(allWeatherData.current.temp_c) + "°";

  currentWeatherConditionEL.innerText = allWeatherData.current.condition.text;

  currentMaxTemperatureEL.innerText =
    "H:" +
    Math.floor(allWeatherData.forecast.forecastday[0].day.maxtemp_c) +
    "°";

  currentMinTemperatureEL.innerText =
    "T:" +
    Math.floor(allWeatherData.forecast.forecastday[0].day.mintemp_c) +
    "°";
}
