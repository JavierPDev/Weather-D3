import axios from 'axios';
import moment from 'moment';

const API_KEY = process.env.WUNDERGROUND_API_KEY;
const URL = `http://api.wunderground.com/api/${API_KEY}/forecast10day/q`;

export function getForecast(city, state) {
  city = city.split(' ').join('_');

  return axios.get(`${URL}/${state}/${city}.json`)
    .then(res => {
      console.log('res', res);
      return res.data.forecast.simpleforecast.forecastday.slice(0, 5).map(d => {
        return {
          day: d.date.weekday,
          high: d.high.fahrenheit,
          low: d.low.fahrenheit,
        };
      });
    })
    .catch(err => console.log);
}
