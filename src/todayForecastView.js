import { rootElement } from "./detailView";
import { getWeatherData } from "./fetching";
import { renderLoadingScreen } from "./loading";
import { formatTemperature, formatTime } from "./utils";

export function getForecastHtml(weatherData) {
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

function getHourlyForecastElement(hourElement) {
  const forecastElement = `
  <div class="hourly-forecast">
      <p class="hourly-forecast__time">${formatTime(hourElement.time_epoch)}</p>
      <img
        src="${hourElement.condition.icon}"
        class="hourly-forecast__icon"
      ></img>
      <p class="hourly-forecast__temperature">${
        formatTemperature(hourElement.temp_c) + "°"
      }</p>
    </div>`;

  return forecastElement;
}

let hourlyForecastArray;

export async function createHourlyForecastElements(calcuteHourlyForecast) {
  const hourlyForecastEl = document.querySelector(".today-forecast__hours");

  hourlyForecastArray = calcuteHourlyForecast();

  hourlyForecastArray.forEach((hourElement) => {
    const hourForecastElement = getHourlyForecastElement(hourElement);

    hourlyForecastEl.innerHTML += hourForecastElement;
  });
}

export async function calcuteHourlyForecast(weatherData) {
  // 0. neues Array erstellen, später mit den 24 stunden Objekten befüllen
  const newHourlyForecastArray = [];

  hourlyForecastArray = weatherData.forecast.forecastday[0].hour;

  // 1. aktuelles Stunden-Objekt
  const currentHour = new Date().getHours();

  // 1.1 Welches stunden Objekt ist das aktuelle Stunden objekt (aktuelle Uhrzeit stimmt überein), index des Objkets speichern
  const currentHourIndex = hourlyForecastArray.findIndex(
    (hour) => new Date(hour.time.time_epoch * 1000).getHours() === currentHour
  );

  // 2. Aktuelles forecastday Objekt sowie den rest des Tages in das neue Array hinzufügen
  for (let i = currentHourIndex; i < hourlyForecastArray.length; i++) {
    const hour = hourlyForecastArray[i];
    if (i === currentHourIndex) {
      newHourlyForecastArray.push({ ...hour, label: "Jetzt" });
    } else {
      newHourlyForecastArray.push(hour);
    }
  }

  //   3. Zugriff auf Stunden Objekt des nächsten Tages
  const nextDayHourlyForecastArray = weatherData.forecast.forecastday[1].hour;

  // 3.1 restliche Stunden Objekte vom zweiten forecastday objekt dem array hinzufügen bis 24 Stunden erreicht sind
  const hoursNeeded = 24 - newHourlyForecastArray - length;
  for (let i = 0; i < hoursNeeded; i++) {
    const hour = nextDayHourlyForecastArray[i];
    newHourlyForecastArray.push(hour);
  }

  return newHourlyForecastArray;
}
