import Component from '@ember/component';
import layout from './template';
import { run } from '@ember/runloop'
import { computed } from '@ember/object';

const DELAY_IN_MS = 100;

export default Component.extend({
  layout,
  tagName: 'g',
  gTransform: null,
  mouseOnTarget: false,
  mouseOnTip: false,

  didInsertElement() {
    this._super(...arguments);
    this.addMouseEventHandlers();
  },
  willDestroyElement() {
    this._super(...arguments);
    this.removeMouseEventHandlers();
  },

  addMouseEventHandlers() {
    this.$().on('mouseenter', (event) => {
      this.set('gTransform', `translate(${event.clientX}, ${event.clientY})`);
      this.set('mouseOnTarget', true);
    });

    this.$().on('mouseleave', () => {
      run.later(() => {
        this.set('mouseOnTarget', false);
      }, DELAY_IN_MS);
    });

    this.$('g.svg-tooltip-tip').on('mouseenter', () => {
      this.set('mouseOnTip', true);
    });

    this.$('g.svg-tooltip-tip').on('mouseleave', () => {
      run.later(() => {
        this.set('mouseOnTip', false);
      }, DELAY_IN_MS);
    });
  },

  removeMouseEventHandlers() {
    this.$().off('mouseenter');
    this.$().off('mouseleave');
    this.$('g.svg-tooltip-tip').off('mouseenter');
    this.$('g.svg-tooltip-tip').off('mouseleave');
  },

  showTooltip: computed('mouseOnTarget', 'mouseOnTip', function() {
    return this.get('mouseOnTarget') || this.get('mouseOnTip');
  })
});
