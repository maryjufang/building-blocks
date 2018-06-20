import Component from '@ember/component';
import layout from './template';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
const DELAY_MS = 50;

export default Component.extend({
  layout,
  tagName: 'g',
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
      this.set('mouseOnTarget', true);
    });

    this.$().on('mouseleave', () => {
      run.later(() => {
        this.set('mouseOnTarget', false);
      }, DELAY_MS);
    });

    this.$('g.svg-tooltip-tip').on('mouseenter', () => {
      this.set('mouseOnTip', true);
    });

    this.$('g.svg-tooltip-tip').on('mouseleave', () => {
      run.later(() => {
        this.set('mouseOnTip', false);
      }, DELAY_MS);
    });
  },

  removeMouseEventHandlers() {
    this.$().off('mouseenter');
    this.$().off('mouseleave');
    this.$('g.svg-tooltip-tip').off('mouseenter');
    this.$('g.svg-tooltip-tip').off('mouseleave');
  },

  showTooltip: computed('mouseOnTarget', function() {
    return this.get('mouseOnTarget') || this.get('mouseOnTip');
  })
});
