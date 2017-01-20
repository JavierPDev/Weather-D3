export function forecastRetrievalCompleted(forecast) {
  return {
    type: 'FORECAST_RETRIEVAL_COMPLETED',
    forecast
  };
}
