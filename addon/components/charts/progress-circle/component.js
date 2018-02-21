import Component from '@ember/component';
import layout from './template';
import SvgBase from 'building-blocks/mixins/svg-base';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { computed } from '@ember/object';

export default Component.extend(SvgBase, {
  layout,
  width: 200,
  height: 200,
  radius: 100,
  alignToParent: true,

  gTransform: computed('radius', function() {
    let radius = this.get('radius');
    return `translate(${radius}, ${radius})`;
  }),

  draw() {
    let radius = this.get('radius');
    let svgPlot = select(this.element);
    let progress = this.get('progress');
    let end = progress * Math.PI * 2 / 100;
    let arcIcon = arc().innerRadius(radius - 10).outerRadius(radius).startAngle(0).endAngle(end);
    let path = svgPlot.select('path');
    path.attr('d', arcIcon);
  }
});
