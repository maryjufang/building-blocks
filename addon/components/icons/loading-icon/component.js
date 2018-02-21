import Component from '@ember/component';
import layout from './template';
import SvgBase from 'building-blocks/mixins/svg-base';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { computed } from '@ember/object';

const DELAY_IN_MS = 50;

export default Component.extend(SvgBase, {
  layout,
  width: computed.alias('widthHeight'),
  height: computed.alias('widthHeight'),
  radius: computed('widthHeight', function() {
    return this.get('widthHeight') / 2;
  }),
  gTransform: computed('radius', function() {
    let radius = this.get('radius');
    return `translate(${radius}, ${radius})`;
  }),

  draw() {
    let svgPlot = select(this.element);
    let path = svgPlot.select('path');
    let radius = this.get('radius');
    let start = 0;
    let arcIcon = arc().innerRadius(radius / 2).outerRadius(radius).startAngle(start).endAngle(start + 1);
    let spin = (duration) => {
      path.attr('d', arcIcon);
      setTimeout(() => {
        start += 0.05;
        arcIcon.startAngle(start).endAngle(start + 1);
        spin(duration);
      }, duration);
    }
    spin(DELAY_IN_MS);
  }
});
