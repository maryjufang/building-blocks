import Component from '@ember/component';
import layout from './template';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';

import SvgBase from 'building-blocks/mixins/svg-base';
import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { select } from 'd3-selection';
import { line } from 'd3-shape';

const X_AXIS_HEIGHT = 20;
const Y_AXIS_WIDTH = 35;
const Y_TITLE_WIDTH = 20;
const OFFSET = 15;

export default Component.extend(SvgBase, {
  layout,
  width: 500,
  height: 200,

  isLoading: false,
  noDataAvailble: computed('data.[]', function() {
    let data = this.get('data');
    return isEmpty(data) || !isArray(data);
  }),
  noChart: computed.or('isLoading', 'noDataAvailble'),
  noChartText: computed('width', 'height', function() {
    return {
      x: this.get('width') / 2,
      y: this.get('height') / 2
    };
  }),

  yTitle: null,
  yTitleText: computed('height', function() {
    let x = Y_TITLE_WIDTH / 2;
    let y = (this.get('height') - X_AXIS_HEIGHT + OFFSET) / 2;
    return {
      x,
      y,
      transform: `translate(${x}, ${y}) rotate(270) translate(-${x}, -${y})`
    };
  }),
  yAxisTransform: computed(function() {
    let x = Y_TITLE_WIDTH + Y_AXIS_WIDTH;
    let y = OFFSET;
    return `translate(${x}, ${y})`;
  }),
  xAxisTransform: computed('height', function() {
    let x = Y_TITLE_WIDTH + Y_AXIS_WIDTH;
    let y = this.get('height') - X_AXIS_HEIGHT;
    return `translate(${x}, ${y})`;
  }),
  lineAxisTransform: computed(function() {
    let x = Y_TITLE_WIDTH + Y_AXIS_WIDTH;
    let y = OFFSET;
    return `translate(${x}, ${y})`;
  }),

  draw() {
    if (this.get('noChart')) {
      return;
    }
    let data = this.get('data');
    if (isEmpty(data) || !isArray(data)) {
      return;
    }
    let svgPlot = select(this.element);
    // y-axis
    let dataArrY = data.mapBy('y');
    let yScale = scaleLinear().domain([Math.min(...dataArrY), Math.max(...dataArrY)]).range([this.get('height') - X_AXIS_HEIGHT - OFFSET, 0]);
    let yAxisG = svgPlot.select('g.y-axis');
    let yAxis = axisLeft(yScale).ticks(6);
    yAxisG.call(yAxis);
    // x-axis
    let dataArrX = data.mapBy('x');
    let xScale = scaleLinear().domain([Math.min(...dataArrX), Math.max(...dataArrX)]).range([0, this.get('width') - Y_TITLE_WIDTH - Y_AXIS_WIDTH - OFFSET]);
    let xAxisG = svgPlot.select('g.x-axis');
    let xAxis = axisBottom(xScale).ticks(6);
    xAxisG.call(xAxis);
    // line
    let linePath = svgPlot.select('path.svg-line');
    const xAccessor = (d) => xScale(d.x);
    const yAccessor = (d) => yScale(d.y);
    let lineCurve = line().x(xAccessor).y(yAccessor); //.curve(curveLinear);
    linePath.datum(data).attr('d', lineCurve);
  }
});
