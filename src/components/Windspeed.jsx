import React from 'react';
import { connect } from 'react-redux';

import LineChart from 'LineChart';
import { selectConditions } from 'selectConditionsActions';

class Windspeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.displayConditions = this.displayConditions.bind(this);
  }

  displayConditions(d, i) {
    this.props.dispatch(selectConditions(this.props.forecast[i]));
  }

  renderLineChart() {
    if (!this.props.forecast.length) return null;

    const units = this.props.app.unitType === 'imperial' ? 'mph' : 'kph';

    const barData = this.props.forecast.map(d => {
      return {
        xValue: new Date(d.date.epoch * 1000),
        yValue: d.maxwind[units]
      };
    });

    return (
      <div>
        <h1>5 Day Windspeed</h1>
        <LineChart
          data={barData}
          onDotClick={this.displayConditions}
          onDotMouseenter={this.displayConditions}
          yAxisLabel={'In ' + units}
          yMin={0}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderLineChart()}
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
