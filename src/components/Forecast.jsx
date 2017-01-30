import React from 'react';
import { connect } from 'react-redux';

import BarChart from 'BarChart';
import { selectConditions } from 'selectConditionsActions';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.displayConditions = this.displayConditions.bind(this);
  }

  displayConditions(d, i) {
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
        <h1>5 Day Forecast</h1>

        <p>
          View temperature highs using a D3 bar chart. Hover over or click on
          bars to see details above.
        </p>

        <BarChart
          data={barData}
          onBarClick={this.displayConditions}
          onBarMouseenter={this.displayConditions}
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
})(Forecast);
