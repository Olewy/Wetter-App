import { hideLoadingScreen, showLoadingScreen } from "./main";

export async function getWeatherData() {
  showLoadingScreen();
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=7d608bc0fd0a4fc4add123114250601&q=hamburg&lang=de"
  );
  const body = await response.json();

  console.log("Daten sind da!!");

  //   hideLoadingScreen();

  return body;
}
