import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import CircleChart from 'CircleChart';
import { setTooltip, hideTooltip } from 'appActions';

class Averages extends React.Component {
  constructor(props) {
    super(props);

    this.displayTooltip = this.displayTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  displayTooltip(d, i) {
    const contentElement = (
      <ul>
        {d.data.tooltipData.map(t => <li key={t}>{t}</li>)}
      </ul>
    );

    const tooltip = {
      x: d3.event.pageX+15+'px',
      y: d3.event.pageY-10+'px',
      contentElement,
      title: d.data.type,
      originTarget: d3.event.target
    }

    this.props.dispatch(setTooltip(tooltip));
  }

  hideTooltip() {
    this.props.dispatch(hideTooltip());
  }

  renderCircleChart() {
    if (!this.props.forecast.length) return null;

    const data = [
      {type: 'cloudy', value: 2, tooltipData: ['Monday', 'Tuesday']},
      {type: 'sunny', value: 1, tooltipData: ['Monday']},
      {type: 'rainy', value: 2, tooltipData: ['Monday', 'Tuesday']},
    ];

    return (
      <div className="row">
        <h1>5 Day Averages</h1>

        <div className="col-xs-6">
          <CircleChart
            data={data}
            chartType="pie"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.hideTooltip}
            colors={['aqua', 'teal', 'steelblue', 'navy', 'lightgreen']}
          />
        </div>
        <div className="col-sm-6">
          <CircleChart
            data={data.concat([{type: 'snowy', value: 3}, {type: 'stormy', value: 1}])}
            chartType="donut"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.hideTooltip}
          />
        </div>
        <div className="col-sm-6">
          <CircleChart
            data={data.concat([{type: 'snowy', value: 3}])}
            chartType="donut"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.hideTooltip}
          />
        </div>
        <div className="col-sm-6">
          <CircleChart
            data={data.concat([{type: 'snowy', value: 3}, {type: 'stormy', value: 1}])}
            chartType="pie"
            onArcClick={this.displayTooltip}
            onArcMousemove={this.displayTooltip}
            onArcMouseleave={this.hideTooltip}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderCircleChart()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
})(Averages);
