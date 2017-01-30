import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class CircleChart extends React.Component {
  static propTypes = {
    /**
     * Data to display in the chart. Input structure of [{type, value}].
     */
    data: React.PropTypes.array.isRequired,
    /**
     * Chart type can be either 'donut' or 'pie'. Chart default displays pie.
     */
    chartType: React.PropTypes.string.isRequired,
    /**
     * Array of colors to use for chart. If none entered, uses default
     * component colors instead.
     */
    colors: React.PropTypes.array,
    /**
     * Callback function to execute when arc section is clicked.
     */
    onArcClick: React.PropTypes.func,
    /**
     * Callback function to execute when arc section is moused over.
     */
    onArcMousemove: React.PropTypes.func,
    /**
     * Callback function to execute when arc section mouse leaves.
     */
    onArcMouseleave: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    const dimensions = this.getComponentDimensions();
    this.state = {...dimensions};
  }

  componentDidMount() {
    d3.select(window).on('resize', () => {
      this.setState(this.getComponentDimensions());
    });
  }

  getComponentDimensions() {
    const componentWidth = window.innerWidth < 450 ? window.innerWidth : 450;
    const componentHeight = componentWidth || 450;

    return {componentWidth, componentHeight};
  }

  render() {
    const div = new ReactFauxDOM.Element('div');
    const {data, chartType, colors} = this.props;

    const margin = {top: 90, right: 20, bottom: 30, left: 30};

    const width = this.state.componentWidth - margin.left - margin.right - 20;
    const height = this.state.componentHeight - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const outerRadius = radius - 15;
    const innerRadius = chartType === 'donut' ? radius - (.45 * radius) : 0;

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
