import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

const SIZE_ONE = 20;

export default Component.extend({
  layout,
  tagName: '',
  dataTestId: 'icon-component',

  size: 1,

  iconComponentName: computed('icon', function() {
    return `icons/${this.get('icon')}-icon`;
  }),

  widthHeight: computed('size', function() {
    let size = this.get('size') / 2 + 1;
    return size * SIZE_ONE;
  })
});
