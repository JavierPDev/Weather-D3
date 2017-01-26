import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class CircleChart extends React.Component {
  constructor(props) {
    super(props);
    const dimensions = this.getComponentDimensions();
    this.state = {...dimensions};
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    chartType: React.PropTypes.string.isRequired,
    colors: React.PropTypes.array,
    onArcClick: React.PropTypes.func,
    onArcMousemove: React.PropTypes.func,
    onArcMouseleave: React.PropTypes.func
  }

  getComponentDimensions() {
    const componentWidth = window.innerWidth < 480 ? window.innerWidth : 480;
    const componentHeight = componentWidth || 480;

    return {componentWidth, componentHeight};
  }

  componentDidMount() {
    d3.select(window).on('resize', () => {
      this.setState(this.getComponentDimensions());
    });
  }

  render() {
    const div = new ReactFauxDOM.Element('div');
    const {data, chartType, colors} = this.props;

    const margin = {top: 90, right: 20, bottom: 30, left: 30};

    const width = this.state.componentWidth - margin.left - margin.right - 20;
    const height = this.state.componentHeight - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const outerRadius = radius - 15;
    const innerRadius = chartType === 'pie' ? radius - 60 : 0;

    const chartColors = colors || ['red', 'blue', 'green', 'grey', 'brown'];

    const arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    const donut = d3.pie()
      .value((d) => d.value);

    const svg = d3.select(div)
      .append('svg')
        .attr('width', this.state.componentWidth)
        .attr('height', this.state.componentHeight)
      .append('g')
        .attr('transform', 'translate('+width / 2+', '+height / 2+')');

    const g = svg.selectAll('.arc')
      .data(donut(data))
      .enter().append('g')
        .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', (d, i) => chartColors[i])
      .on('click', this.props.onArcClick)
      .on('touchstart', this.props.onArcClick)
      .on('mousemove', this.props.onArcMousemove)
      .on('mouseleave', this.props.onArcMouseleave);

    g.append('text')
      .attr('class', 'circlechart__label')
      .attr('transform', (d) => 'translate('+arc.centroid(d)+')')
      .attr('dy', '.35em')
      .text((d) => d.data.type);

    return div.toReact();
  }
}
