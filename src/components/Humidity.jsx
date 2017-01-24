import React from 'react';
import { connect } from 'react-redux';

import BarChart from 'BarChart';
import { selectConditions } from 'selectConditionsActions';

class Humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedInfo: {}};
    this.onChartMouseEvent = this.onChartMouseEvent.bind(this);
  }

  onChartMouseEvent(d, i) {
    this.props.dispatch(selectConditions(this.props.forecast[i]));
  }

  renderBarChart() {
    if (!this.props.forecast.length) return null;

    const barData = this.props.forecast.map(d => {
      return {
        xValue: d.date.weekday,
        yValue: d.avehumidity
      };
    });

    return (
      <div>
        <h1>5 Day Humidity</h1>
        <BarChart
          data={barData}
          onBarClick={this.onChartMouseEvent}
          onBarMouseenter={this.onChartMouseEvent}
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
})(Humidity);
