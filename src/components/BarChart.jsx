import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import { getComponentDimensions } from '../services/dimensions';

export default class BarChart extends React.Component {
  static propTypes = {
    /**
     * Data to display in the chart. Input structure of [{xValue, yValue}].
     */
    data: React.PropTypes.array.isRequired,
    /**
     * Callback function to execute when bar is clicked.
     */
    onBarClick: React.PropTypes.func,
    /**
     * Callback function to execute when bar is moused over.
     */
    onBarMouseenter: React.PropTypes.func
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
    this.triggerAnimations();
  }

  /**
   * Retrigger bars animating up. Needed for unit and location change.
   */
  triggerAnimations() {
    const bars = document.querySelectorAll('.bar--animated');
    Array.prototype.forEach.call(bars, bar => {
      bar.style.visibility = 'hidden';
      bar.classList.remove('bar--animated');
      setTimeout(() => {
        bar.classList.add('bar--animated');
        bar.style.visibility = 'visible';
      }, 100);
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

    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    // Get 10 less than min or 0 so there is always a bar for lowest number
    const min = d3.min(data, d => d.yValue);
    const yMin = min < 0 ? min - 10 : 0;
    // Use native max instead of d3.max since d3 sometimes returns wrong max
    const yMax = Math.max(...data.map(d => d.yValue));
    // const yMax = d3.max(data, d => d.yValue);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.xValue))
      .rangeRound([0, width]).padding(.4);
    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, yMin]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Create chart group
    const g = svg.append('g')
      .attr('transform', 'translate('+margin.left+', '+margin.top+')');

    // Append x axis
    g.append('g')
      .attr('transform', 'translate(0, '+height+')')
      .call(xAxis);

    // Append y axis
    g.append('g')
      .call(yAxis);

    // Append bars
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar bar--animated')
        .attr('x', (d, i) => xScale(d.xValue))
        .attr('y', (d, i) => yScale(d.yValue))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.yValue))
        .on('click', this.props.onBarClick)
        .on('mouseenter', this.props.onBarMouseenter);

    // Append text
    g.selectAll('.label')
      .data(data)
      .enter().append('text')
        .attr('class', 'label label--animated')
        .attr('x', (d, i) => xScale(d.xValue) + xScale.bandwidth() / 2)
        .attr('y', (d, i) => yScale(d.yValue) - textMarginBottom)
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold')
        .attr('font-size', '24px')
        .attr('text-anchor', 'middle')
        .attr('fill', 'red')
        .text(d => d.yValue);

    return div.toReact();
  }
}
