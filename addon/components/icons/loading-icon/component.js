import Component from '@ember/component';
import layout from './template';
import D3IconBase from 'building-blocks/mixins/d3-icon-base';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';

export default Component.extend(D3IconBase, {
  layout,
  drawIcon() {
    let radius = this.get('widthHeight') / 2;
    let svgPlot = select(this.element);
    let start = 0;
    let arcIcon = arc().innerRadius(radius / 2).outerRadius(radius).startAngle(start).endAngle(start + 1);
    let path = svgPlot.append('g').attr('transform', `translate(${radius}, ${radius})`).append('path').attr('d', arcIcon);
    let spin = function(selection, path, arcIcon, start, duration) {
      start += 0.05;
      arcIcon.startAngle(start).endAngle(start + 1);
      path.attr('d', arcIcon);
      setTimeout(() => {
        spin(selection, path, arcIcon, start, duration);
      }, duration);
    }
    path.call(spin, path, arcIcon, start, 50);
  }
});
