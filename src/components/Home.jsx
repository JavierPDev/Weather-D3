import React from 'react';

import BarChart from 'BarChart';

const forecasts = [
  {
    temp: 11,
    day: 'Today',
  },
  {
    temp: 26,
    day: 'Friday'
  },
  {
    temp: 27,
    day: 'Saturday'
  },
  {
    temp: 33,
    day: 'Sunday'
  },
  {
    temp: 42,
    day: 'Monday'
  },
  {
    temp: 40,
    day: 'Tuesday'
  },
];

const data = forecasts.map(forecast => {
  return {xValue: forecast.day, yValue: forecast.temp};
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.log = this.log.bind(this);
  }

  log(d, i) {
    this.setState({
      temp: forecasts[i].temp,
      day: forecasts[i].day
    });
  }

  renderSelectedInfo() {
    if (this.state.temp) {
      return (
        <div>
          <p>{this.state.temp}</p>
          <p>{this.state.day}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <BarChart data={data} onBarClick={this.log} onBarMouseenter={this.log} />
        {this.renderSelectedInfo()}
      </div>
    );
  }
}
