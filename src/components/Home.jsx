import React from 'react';

import BarChart from 'BarChart';
import { getForecast } from '../api/forecast';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}, barData: [], forecast: []};
    this.onBarMouseEvent = this.onBarMouseEvent.bind(this);
  }

  componentDidMount() {
    getForecast('Chicago', 'IL')
      .then(forecast => {
        const barData = forecast.map(d => {
          return {xValue: d.day, yValue: d.high};
        });

        this.setState({barData, forecast});
      })
      .catch(err => console.log);
  }

  onBarMouseEvent(d, i) {
    const {high, day} = this.state.forecast[i];

    this.setState({
      selectedInfo: {high, day}
    });
  }

  renderBarChart() {
    if (!this.state.barData) return null;

    return <BarChart
      data={this.state.barData}
      onBarClick={this.onBarMouseEvent}
      onBarMouseenter={this.onBarMouseEvent}
    />;
  }

  renderSelectedInfo() {
    if (!this.state.selectedInfo.high) return null;

    const {high, day} = this.state.selectedInfo;
    
    return (
      <div>
        <p>{high}</p>
        <p>{day}</p>
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
