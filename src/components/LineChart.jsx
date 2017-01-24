import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    const dimensions = this.getComponentDimensions();
    this.state = {...dimensions};
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    onDotClick: React.PropTypes.func,
    onDotMouseenter: React.PropTypes.func
  }

  getComponentDimensions() {
    const componentWidth = window.innerWidth < 640 ? window.innerWidth : 640;
    const componentHeight = componentWidth < 640 ? componentWidth / 1.3 : 480;

    return {componentWidth, componentHeight};
  }

  componentDidMount() {
    d3.select(window).on('resize', () => {
      this.setState(this.getComponentDimensions());
    });
  }

  render() {
    const div = new ReactFauxDOM.Element('div');
    const {data} = this.props;

    const svg = d3.select(div)
      .append('svg')
        .attr('width', this.state.componentWidth)
        .attr('height', this.state.componentHeight);

    const margin = {top: 90, right: 20, bottom: 30, left: 30};
    const textMarginBottom = 15;

    const width = +svg.attr('width') - margin.left - margin.right - 10;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const yMin = 0;
    const yMax = 100;

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.xValue))
      .rangeRound([0, width]);
    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, yMin]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat('%A'))
    const yAxis = d3.axisLeft(yScale);

    // Create line
    const line = d3.line()
      .x((d) => xScale(d.xValue))
      .y((d) => yScale(d.yValue));

    // Create chart group
    const g = svg.append('g')
      .attr('transform', 'translate('+margin.left+', '+margin.top+')');

    // Append x axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0, '+height+')')
      .call(xAxis);

    // Append y axis
    g.append('g')
      .call(yAxis);

    // Append line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
			.attr("stroke", "#666")
      .attr('d', line);

    // Append dots
    g.selectAll('circle')
      .data(data)
      .enter().append('circle')
        .attr('cx', (d, i) => xScale(d.xValue))
        .attr('cy', (d, i) => yScale(d.yValue))
        .attr('r', 5)
        .attr('class', 'dot')
        .on('click', this.props.onDotClick)
        .on('mouseenter', this.props.onDotMouseenter)

    
    // Shift x axis ticks to match weekdays with value dots
    const tickShift = width / 4 - 3;
    g.selectAll('.axis--x .tick')
      .attr('transform', (d, i) => 'translate('+tickShift*(i+1)+', 0)')

    return div.toReact();
  }
}