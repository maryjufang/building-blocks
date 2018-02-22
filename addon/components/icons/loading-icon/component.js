import Component from '@ember/component';
import layout from './template';
import SvgBase from 'building-blocks/mixins/svg-base';
import { arc } from 'd3-shape';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const DELAY_IN_MS = 50;
const ARC_RADIUS = 10;
const ARC_RADIAN = 1.3;

export default Component.extend(SvgBase, {
  layout,
  status: "default",
  width: computed.alias('widthHeight'),
  height: computed.alias('widthHeight'),
  radius: computed('widthHeight', function() {
    return this.get('widthHeight') / 2;
  }),

  draw() {
    this.get('_spin').perform();
  },

  iconPathD: null,
  _spin: task(function*() {
    let radius = this.get('radius');
    let start = 0;
    let arcRadius = radius * 0.2;
    arcRadius = arcRadius > ARC_RADIUS ? ARC_RADIUS : arcRadius;
    let arcIcon = arc().innerRadius(radius - arcRadius).outerRadius(radius);
    while (true) {
      arcIcon.startAngle(start).endAngle(start + ARC_RADIAN);
      this.set('iconPathD', arcIcon());
      yield timeout(DELAY_IN_MS);
      start += 0.05;
    }
  }).cancelOn('deactivate')
});
