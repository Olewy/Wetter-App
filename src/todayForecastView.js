import { rootElement } from "./detailView";
import { getWeatherData } from "./fetching";
import { renderLoadingScreen } from "./loading";
import { formatTemperature } from "./utils";

const hourlyForecastEl = document.querySelector(".today-forecast__hours");

export async function getCurrentTime(weatherData) {
  const timeStemp = weatherData.current.last_updated_epoch;

  const date = new Date(timeStemp * 1000);

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
  });

  return formattedTime;
}

export async function getForecastHtml(weatherData) {
  rootElement.innerHTML += `
            <div class="today-forecast">
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
                <div class="today-forecast__hours"></div>
            </div>
            `;
}

async function getHourlyForecastElement(hourElement) {
  const forecastElement = `
                    <div class="hourly-forecast">
                        <p class="hourly-forecast__time">${
                          hourElement.time_epoch + " Uhr"
                        }
                        </p>
                        <img src="${hourElement.condition.icon}" 
                        class="hourly-forecast__icon">
                        </img>
                        <p class="hourly-forecast__temperature">${
                          hourElement.temp_c
                        }</p>
                    </div>`;

  return forecastElement;
}

export function createHourlyForecastElements(weatherData) {
  const hourlyForecastArray = weatherData.forecast.forecastday[0].hour;
  console.log(hourlyForecastArray);

  hourlyForecastArray.forEach((hourElement) => {
    const hourForecastElement = getHourlyForecastElement(hourElement);

    hourlyForecastEl.append(hourForecastElement);
  });
}
