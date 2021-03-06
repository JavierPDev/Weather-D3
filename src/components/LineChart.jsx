import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import { getComponentDimensions } from '../services/dimensions';
import { triggerAnimations } from '../services/animations';

export default class LineChart extends React.Component {
  static propTypes = {
    /**
     * Data to display in the chart. Input structure of [{xValue, yValue}].
     */
    data: React.PropTypes.array.isRequired,
    /**
     * Callback function to execute when dot is clicked.
     */
    onDotClick: React.PropTypes.func,
    /**
     * Callback function to execute when dot is moused over.
     */
    onDotMouseenter: React.PropTypes.func,
    /**
     * Label of y axis
     */
    yAxisLabel: React.PropTypes.string,
    /**
     * Minimum y value. If none entered it will be calculated using input y
     * values.
     */
    yMin: React.PropTypes.number,
    /**
     * Maximum y value. If none entered it will be calculated using input y
     * values.
     */
    YMax: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    const dimensions = getComponentDimensions();
    this.state = {...dimensions};
  }

  componentDidMount() {
    d3.select(window).on('resize', () => {
      this.setState(getComponentDimensions());
    });
  }

  componentDidUpdate() {
    this.triggerAnimations('path--animated');
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

    const width = +svg.attr('width') - margin.left - margin.right - 20;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    let {yMin, yMax} = this.props;
    yMin = yMin === 0 ? 0 : yMin || d3.min(data, (d) => d.yValue);
    yMax = yMax || d3.max(data, (d) => d.yValue);

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
      .attr('transform', 'translate('+(margin.left+10)+', '+margin.top+')');

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
      .attr('class', 'path path--animated')
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
        .attr('class', 'dot dot--animated')
        .on('click', this.props.onDotClick)
        .on('mouseenter', this.props.onDotMouseenter)

    
    // Shift x axis ticks to match weekdays with value dots
    const tickShift = width / 4 - 3;
    g.selectAll('.axis--x .tick')
      .attr('transform', (d, i) => 'translate('+tickShift*(i+1)+', 0)')

    const {yAxisLabel} = this.props;

    if (yAxisLabel) {
      const x = width / 2.9 * -1;
      // Shift for small screens so axis isn't overlapped
      const yShift = width < 320 ? 10 : 0;
      const y = height / 14.4 * -1 - yShift;

      g.append('text')
        .attr('font-size', '14px')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(-90)')
        .text(yAxisLabel)
    }

    return div.toReact();
  }
}
