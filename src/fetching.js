export async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=7d608bc0fd0a4fc4add123114250601&q=${location}&lang=de`
  );
  const body = await response.json();

  return body;
}
