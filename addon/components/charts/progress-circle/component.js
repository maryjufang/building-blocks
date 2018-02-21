import Component from '@ember/component';
import layout from './template';
import SvgBase from 'building-blocks/mixins/svg-base';
import { arc } from 'd3-shape';
import { computed } from '@ember/object';

export default Component.extend(SvgBase, {
  layout,
  width: 200,
  height: 200,
  radius: 100,
  alignToParent: true,
  progress: 0,

  gTransform: computed('radius', function() {
    let radius = this.get('radius');
    return `translate(${radius}, ${radius})`;
  }),
  backgroundPathD: computed('radius', function() {
    let radius = this.get('radius');
    let arcIcon = arc().innerRadius(radius - 10).outerRadius(radius).startAngle(0).endAngle(Math.PI * 2);
    return arcIcon();
  }),

  progressPathD: computed('radius', 'progress', function() {
    let radius = this.get('radius');
    let progress = this.get('progress');
    if (isNaN(progress) || progress < 0 || progress > 100) {
      return '';
    }
    let end = progress * Math.PI * 2 / 100;
    let arcIcon = arc().innerRadius(radius - 10).outerRadius(radius).startAngle(0).endAngle(end);
    return arcIcon();
  })
});
