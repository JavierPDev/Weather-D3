/**
 * Get conditions with days in week having each condition.
 *
 * Transform forecast and return array of objects structured for circle charts.
 * Returns an array of objects structured as:
 * {
 *   type: 'sunny',
 *   value: 3,
 *   tooltipData: [ 'Monday', 'Wednesday'],
 *   img: 'http://icons.wxug.com/i/c/k/mostlycloudy.gif'
 * }
 *
 * @param {Object} forecast - Array of objects returned from wunderground
 * @return {Array} - Transformed chart data in described structure
 */
export function getConditionsByDaysForCircleChart(forecast) {
  const processedData = [];

  forecast.forEach((value, key) => {
    const alreadyProcessedValue = processedData.some((el) => {
      return el.type === value.conditions;
    });

    if (!alreadyProcessedValue) {
      processedData.push({
        type: value.conditions,
        value: 1,
        tooltipData: [value.date.weekday],
        img: value.icon_url
      });
    } else {
      const i = processedData.findIndex((element) => {
        return element.type === value.conditions;
      });

      processedData[i].value++;
      processedData[i].tooltipData.push(value.date.weekday);
      processedData[i].img = value.icon_url;
    }
  });

  const totalValue = forecast.length;

  processedData.forEach((d) => {
    d.percentage = d.value / totalValue * 100;
  });

  return processedData;
}

/**
 * Get humidity ranges with days in week having each humidity range.
 *
 * Transform forecast and return array of objects structured for circle charts.
 * Returns an array of objects structured as:
 * {
 *   type: '25%-50% Humidity',
 *   value: 3,
 *   tooltipData: [ 'Monday', 'Wednesday']
 * }
 *
 * @param {Object} forecast - Array of objects returned from wunderground
 * @return {Array} - Transformed chart data in described structure
 */
export function getHumidityByDaysForCircleChart(forecast) {
  const processedData = [
    {type: '0-25% Humidity', value: 0, tooltipData: []},
    {type: '26-50% Humidity', value: 0, tooltipData: []},
    {type: '51-75% Humidity', value: 0, tooltipData: []},
    {type: '76-100% Humidity', value: 0, tooltipData: []}
  ];

  forecast.forEach((value, key) => {
    if (value.avehumidity > 75) {
      processedData[3].value++;
      processedData[3].tooltipData.push(value.date.weekday);
    } else if (value.avehumidity > 50) {
      processedData[2].value++;
      processedData[2].tooltipData.push(value.date.weekday);
    } else if (value.avehumidity > 25) {
      processedData[1].value++;
      processedData[1].tooltipData.push(value.date.weekday);
    } else {
      processedData[0].value++;
      processedData[0].tooltipData.push(value.date.weekday);
    }
  });

  const totalValue = forecast.length;

  processedData.forEach((d) => {
    d.percentage = d.value / totalValue * 100;
  });

  // Strip out anything with no value
  const finalData = processedData.filter((d) => d.value);

  return finalData;
}
