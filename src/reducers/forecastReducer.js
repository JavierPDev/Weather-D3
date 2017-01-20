export default function forecastReducer(state = [], action) {
  switch (action.type) {
    case 'FORECAST_RETRIEVAL_COMPLETED':
      return action.forecast;
    default:
      return state;
  }
}
