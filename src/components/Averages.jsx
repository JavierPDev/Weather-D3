import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import CircleChart from 'CircleChart';
import { setTooltip, hideTooltip } from 'appActions';
import {
  getConditionsByDaysForCircleChart,
  getHumidityByDaysForCircleChart
} from '../services/forecastTransforms';

class Averages extends React.Component {
  constructor(props) {
    super(props);

    this.displayTooltip = this.displayTooltip.bind(this);
  }

  displayTooltip(d, i) {
    const img = d.data.img ?
      <img src={d.data.img} alt={d.data.type} /> : null;

    const contentElement = (
      <div>
        {img}
        <ul>
          {d.data.tooltipData.map(t => <li key={t}>{t}</li>)}
        </ul>
      </div>
    );

    const tooltip = {
      x: d3.event.pageX+15+'px',
      y: d3.event.pageY-10+'px',
      contentElement,
      title: d.data.type + ' - ' + d.data.percentage + '%',
      originTarget: d3.event.target
    };

    this.props.setTooltip(tooltip);
  }

  render() {
    const {forecast} = this.props;

    if (!forecast.length) return null;

    const conditions = getConditionsByDaysForCircleChart(forecast);
    const humidity = getHumidityByDaysForCircleChart(forecast);

    return (
      <div className="row">
        <h1>5 Day Averages</h1>

        <div className="col-sm-6">
          <CircleChart
            data={conditions}
            chartType="donut"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.props.hideTooltip}
            colors={
              ['mediumturquoise', 'lightgreen',
                'steelblue', 'lightblue', 'teal']
            }
          />
        </div>
        <div className="col-sm-6">
          <CircleChart
            data={humidity}
            chartType="pie"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.props.hideTooltip}
            colors={['dodgerblue', 'firebrick', 'lightcoral', 'lightblue']}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
}, { hideTooltip, setTooltip })(Averages);
