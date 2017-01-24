import React from 'react';
import { connect } from 'react-redux';

import BarChart from 'BarChart';
import { selectConditions } from 'selectConditionsActions';

class Windspeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.onMouseChartEvent = this.onMouseChartEvent.bind(this);
  }

  onMouseChartEvent(d, i) {
    this.props.dispatch(selectConditions(this.props.forecast[i]));
  }

  renderBarChart() {
    if (!this.props.forecast.length) return null;

    const barData = this.props.forecast.map(d => {
      return {
        xValue: d.date.weekday,
        yValue: d.maxwind[
          this.props.app.unitType === 'imperial' ? 'mph' : 'kph'
        ]
      };
    });

    return (
      <div>
        <h1>5 Day Windspeed</h1>
        <BarChart
          data={barData}
          onBarClick={this.onMouseChartEvent}
          onBarMouseenter={this.onMouseChartEvent}
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
})(Windspeed);
