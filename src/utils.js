export function formatTemperature(temperature) {
  return Math.floor(temperature);
}

export function formatTime(time) {
  return new Date(time * 1000).toLocaleTimeString("de-DE", {
    hour: "2-digit",
  });
}
