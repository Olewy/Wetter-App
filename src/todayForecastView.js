import { rootElement } from "./detailView";
import { getWeatherData } from "./fetching";
import { renderLoadingScreen } from "./loading";
import { formatTemperature } from "./utils";

async function getCurrentTime(weatherData) {
  const timeStemp = weatherData.forecast.forecastday[0].hour[0].time_epoch;

  //   if (time == currentTime) {
  // time = "Jetzt"}
  // else {
  // time = time + 1}
}

export async function getForecastHtml(weatherData) {
  rootElement.innerHTML += `<div class="today-forecast">
                <p class="today-forecast__conditions">
                ${
                  "Heute " +
                  weatherData.forecast.forecastday[0].day.condition.text +
                  ". " +
                  "Wind bis zu " +
                  weatherData.forecast.forecastday[0].day.maxwind_kph +
                  " km/h"
                }
                </p>
                <div class="today-forecast__hours">
                    <div class="hourly-forecast">
                        <p class="hourly-forecast__time">${" Uhr"}
                        </p>
                        <img src="${
                          weatherData.forecast.forecastday[0].hour[0].condition
                            .icon
                        }" 
                        class="hourly-forecast__icon">
                        </img>
                        <p class="hourly-forecast__temperature">-1°</p>
                    </div>
                </div>
            </div>
            `;
}
