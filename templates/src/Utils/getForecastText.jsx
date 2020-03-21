export default function getForecastText(forecast, forecastTimeframe) {
  let forecastText = null;

  if (forecastTimeframe === null) {
    return forecastTimeframe;
  }

  let forecastTotal = parseInt(forecast);
  if (forecast === NaN) {
    forecastTotal = "na";
  }

  if (forecastTimeframe == 0) {
    forecastText = forecastTotal + '" TODAY';
  } else if (forecastTimeframe == 1) {
    forecastText = forecastTotal + '" IN NEXT ' + forecastTimeframe + " DAY";
  } else if (forecastTimeframe > 1) {
    forecastText = forecastTotal + '" IN NEXT ' + forecastTimeframe + " DAYS";
  } else if (forecastTimeframe < 0) {
    forecastText =
      forecastTotal + '" IN PAST ' + Math.abs(forecastTimeframe) + " DAYS";
  }

  return forecastText;
}
