import { rootElement } from "./detailView";
import { getWeatherData } from "./fetching";
import { renderLoadingScreen } from "./loading";
import { formatTemperature } from "./utils";

export async function loadForecastDayWeatherData(cityName) {
  const weatherData = await getWeatherData(cityName);

  getForecastHtml(weatherData);
}

async function getForecastHtml(weatherData) {
  rootElement.innerHTML = ` 
            <div class="today-forecast">
        <p class="today-forecast__conditions">
          ${
            "Heute" +
            weatherData.forecast.forecastday[0].day.condition.text +
            "." +
            "Wind bis zu" +
            weatherData.forecast.forecastday[0].day.maxwind_kph
          }
        </p>
        <div class="today-forecast__hours">
          <div class="hourly-forecast">
            <p class="hourly-forecast__time">${
              weatherData.forecast.forecastday[0].hour.time_epoch
            }</p>
            <img src="${
              weatherData.forecast.forecastday[0].hour[0].condition.icon
            }" class="hourly-forecast__icon"></img>
            <p class="hourly-forecast__temperature">-1°</p>
          </div>
        </div>
      </div>`;
}
