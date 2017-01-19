import React from 'react';

import BarChart from 'BarChart';

const data = [
  {
    yValue: 11,
    xValue: '2000',
  },
  {
    yValue: 26,
    xValue: '2001'
  },
  {
    yValue: 27,
    xValue: '2002'
  },
  {
    yValue: 33,
    xValue: '2003'
  },
  {
    yValue: 42,
    xValue: '2004'
  },
  {
    yValue: 40,
    xValue: '2005'
  },
  {
    yValue: 51,
    xValue: '2006'
  },
  {
    yValue: 61,
    xValue: '2007'
  },
  {
    yValue: 63,
    xValue: '2008'
  },
  {
    yValue: 52,
    xValue: '2009'
  }
];


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.log = this.log.bind(this);
  }

  log(d, i) {
    this.setState({
      xValue: d.xValue,
      yValue: d.yValue,
      i: i
    });
  }

  renderSelectedInfo() {
    if (this.state.xValue) {
      return (
        <div>
          <p>{this.state.xValue}</p>
          <p>{this.state.yValue}</p>
          <p>{this.state.i}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <BarChart data={data} onBarClick={this.log} onBarMouseenter={this.log} />
        {this.renderSelectedInfo()}
      </div>
    );
  }
}
