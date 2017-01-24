import React from 'react';
import { connect } from 'react-redux';

import BarChart from 'BarChart';
import { selectConditions } from 'selectConditionsActions';

class Averages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.onBarMouseEvent = this.onBarMouseEvent.bind(this);
  }

  onBarMouseEvent(d, i) {
    this.props.dispatch(selectConditions(this.props.forecast[i]));
  }

  renderBarChart() {
    if (!this.props.forecast.length) return null;

    const barData = this.props.forecast.map(d => {
      return {
        xValue: d.date.weekday,
        yValue: d.high[
          this.props.app.unitType === 'imperial' ? 'fahrenheit' : 'celsius'
        ]
      };
    });

    return (
      <div>
        <h1>5 Day Averages</h1>
        <p>To be replaced with many donut charts</p>
        <BarChart
          data={barData}
          onBarClick={this.onBarMouseEvent}
          onBarMouseenter={this.onBarMouseEvent}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderBarChart()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    app: state.app,
    forecast: state.forecast
  };
})(Averages);
