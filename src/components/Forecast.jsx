import React from 'react';
import { connect } from 'react-redux';

import BarChart from 'BarChart';
import { getForecast } from '../api/forecast';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.onBarMouseEvent = this.onBarMouseEvent.bind(this);
  }

  onBarMouseEvent(d, i) {
    const {high, date} = this.props.forecast[i];

    this.setState({
      selectedInfo: {high, date}
    });
  }

  renderBarChart() {
    if (!this.props.forecast) return null;

    const barData = this.props.forecast.map(d => {
      return {
        xValue: d.date.weekday,
        yValue: d.high.fahrenheit
      };
    });

    return (
      <div>
        <h1>5 Day Forecast</h1>
        <BarChart
          data={barData}
          onBarClick={this.onBarMouseEvent}
          onBarMouseenter={this.onBarMouseEvent}
        />
      </div>
    );
  }

  renderSelectedInfo() {
    if (!this.state.selectedInfo.high) return null;

    const {high, date} = this.state.selectedInfo;
    
    return (
      <div>
        <p>{high.fahrenheit}</p>
        <p>{date.weekday}</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderBarChart()}
        {this.renderSelectedInfo()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
})(Forecast);
