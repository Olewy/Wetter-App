import { loadHeaderWeatherData } from "./src/detailView";
import { getWeatherData } from "./src/fetching";
import {
  createHourlyForecastElements,
  getCurrentTime,
  getForecastHtml,
} from "./src/todayForecastView";

loadHeaderWeatherData("Hamburg");
