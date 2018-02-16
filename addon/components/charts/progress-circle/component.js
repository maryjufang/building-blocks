import Component from '@ember/component';
import layout from './template';
import D3IconBase from 'building-blocks/mixins/d3-icon-base';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';

const CircleAngle = Math.PI * 2;

export default Component.extend(D3IconBase, {
  layout,
  widthHeight: 200,
  drawIcon() {
    let radius = this.get('widthHeight') / 2;
    let svgPlot = select(this.element);
    let end = this.get('progress') * CircleAngle / 100;
    let arcIcon = arc().innerRadius(radius / 2).outerRadius(radius).startAngle(0).endAngle(end);
    let path = svgPlot.append('g').attr('transform', `translate(${radius}, ${radius})`).append('path').attr('d', arcIcon);
  }
});
