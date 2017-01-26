import React from 'react';
import { connect } from 'react-redux';

import LineChart from 'LineChart';
import { selectConditions } from 'selectConditionsActions';

class Humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.displayConditions = this.displayConditions.bind(this);
  }

  displayConditions(d, i) {
    this.props.selectConditions(this.props.forecast[i]);
  }

  renderLineChart() {
    if (!this.props.forecast.length) return null;

    const barData = this.props.forecast.map(d => {
      return {
        xValue: new Date(d.date.epoch * 1000),
        yValue: d.avehumidity
      };
    });

    return (
      <div>
        <h1>5 Day Humidity</h1>
        <LineChart
          data={barData}
          onDotClick={this.displayConditions}
          onDotMouseenter={this.displayConditions}
          yAxisLabel={'In percent (%)'}
          yMin={0}
          yMax={100}
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
    forecast: state.forecast
  };
}, { selectConditions })(Humidity);
