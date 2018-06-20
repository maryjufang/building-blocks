import Component from '@ember/component';
import layout from './template';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { select } from 'd3-selection';
import { line } from 'd3-shape';

const X_AXIS_HEIGHT = 20;
const Y_AXIS_WIDTH = 35;
const Y_TITLE_WIDTH = 20;
const OFFSET = 15;

export default Component.extend({
  layout,
  tagName: 'g',
  width: 500,
  height: 200,
  dataTestId: 'line-chart',

  isLoading: true,
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
  chartDimension: computed('width', 'height', function() {
    let width = this.get('width') - Y_TITLE_WIDTH - Y_AXIS_WIDTH - OFFSET;
    let height = this.get('height') - X_AXIS_HEIGHT - OFFSET;
    return { width, height };
  }),

  didReceiveAttrs() {
    this._super();
    run.scheduleOnce('render', this, this.draw);
  },
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
    let yScale = scaleLinear().domain([Math.min(...dataArrY), Math.max(...dataArrY)]).range([this.get('chartDimension.height'), 0]);
    let yAxisG = svgPlot.select('g.y-axis');
    let yAxis = axisLeft(yScale).ticks(6);
    yAxisG.call(yAxis);
    // x-axis
    let dataArrX = data.mapBy('x');
    let xScale = scaleLinear().domain([Math.min(...dataArrX), Math.max(...dataArrX)]).range([0, this.get('chartDimension.width')]);
    let xAxisG = svgPlot.select('g.x-axis');
    let xAxis = axisBottom(xScale).ticks(6);
    xAxisG.call(xAxis);
    // line
    let linePath = svgPlot.select('path.svg-line');
    const xAccessor = (d) => xScale(d.x);
    const yAccessor = (d) => yScale(d.y);
    let lineCurve = line().x(xAccessor).y(yAccessor); //.curve(curveLinear);
    linePath.datum(data).attr('d', lineCurve);
  },

  didInsertElement() {
    this._super(...arguments);
    this.addMouseEventHandlers();
  },
  willDestroyElement() {
    this._super(...arguments);
    this.removeMouseEventHandlers();
  },

  showTooltip: false,
  addMouseEventHandlers() {
    this.$('rect.svg-mouse-catch').on('mouseout', () => {
      this.set('showTooltip', false);
    });
    this.$('rect.svg-mouse-catch').on('mouseover', (event) => {
      if (this.get('noChart')) {
        return;
      }
      this.handleMouseOver(event);
    });
    this.$('rect.svg-mouse-catch').on('mousemove', (event) => {
      if (this.get('noChart')) {
        return;
      }
      this.handleMouseOver(event);
    });
  },
  handleMouseOver(event) {
    let style;
    let x = event.clientX;
    let halfWindowWidth = window.innerWidth / 2;
    if (x > halfWindowWidth) {
      x = window.innerWidth - x;
      style = `right: ${x}px; `;
    } else {
      style = `left: ${x}px; `;
    }
    let y = event.clientY;
    let halfWindowHeight = window.innerHeight / 2;
    if (y > halfWindowHeight) {
      y = window.innerHeight - y;
      style = `${style}bottom: ${y}px;`;
    } else {
      style = `${style}top: ${y}px;`;
    }
    this.set('tooltipStyle', new htmlSafe(style));

    // mouse line
    let offsetX = event.offsetX - (Y_TITLE_WIDTH + Y_AXIS_WIDTH + OFFSET);
    let data = this.get('data');
    let index = parseInt(Math.round(offsetX * data.get('length') / this.get('chartDimension.width'))) + 1;
    if (index >=0 && index < data.length) {
      this.set('dataValue', data[index].y);
      this.set('offsetX', index * this.get('chartDimension.width') / (data.get('length') - 1));
      this.set('showTooltip', true);
    } else {
      this.set('dataValue', null);
      this.set('offsetX', null);
      this.set('showTooltip', false);
    }
  },

  removeMouseEventHandlers() {
    this.$('rect.svg-mouse-catch').off('mouseout');
    this.$('rect.svg-mouse-catch').off('mouseover');
    this.$('rect.svg-mouse-catch').off('mousemove');
  }
});
