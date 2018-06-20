import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

const SIZE_ONE = 20;

export default Component.extend({
  layout,
  tagName: '',
  dataTestId: 'icon-component',
  status: "default", // error, warning, info, success, default (black)

  size: 1,

  iconComponentName: computed('icon', function() {
    return `icons/${this.get('icon')}-icon`;
  }),

  width: computed('size', function() {
    let size = this.get('size') / 2 + 1;
    return size * SIZE_ONE;
  }),

  radius: computed('width', function() {
    return this.get('width') / 2;
  })
});
