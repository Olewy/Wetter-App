import { getWeatherData } from "./fetching";
import { renderLoadingScreen } from "./loading";
import {
  createHourlyForecastElements,
  getForecastHtml,
  calcuteHourlyForecast,
} from "./todayForecastView";
import { formatTemperature } from "./utils";

export let rootElement = document.getElementById("app");

export let weatherData = await getWeatherData();

export async function loadHeaderWeatherData(cityName) {
  renderLoadingScreen("Lade Wetter für " + cityName + "...");

  weatherData = await getWeatherData(cityName);

  getHeaderHtml(weatherData);
  getForecastHtml(weatherData);
  createHourlyForecastElements(calcuteHourlyForecast);
}

function getHeaderHtml(weatherData) {
  rootElement.innerHTML = ` 
          <div class="current-weather">
            <h2 class="current-weather__location">${
              weatherData.location.name
            }</h2>
            <h1 class="current-weather__current-temperature">${
              formatTemperature(weatherData.current.temp_c) + "°"
            }</h1>
            <p class="current-weather__condition">${
              weatherData.current.condition.text
            }</p>
            <div class="current-weather__day-temperatures">
              <span class="current-weather__max-temperature">${
                "H: " +
                formatTemperature(
                  weatherData.forecast.forecastday[0].day.maxtemp_c
                ) +
                "°"
              }</span>
              <span class="current-weather__min-temperature">${
                "T: " +
                formatTemperature(
                  weatherData.forecast.forecastday[0].day.mintemp_c
                ) +
                "°"
              }</span>
            </div>
          </div>`;
}
