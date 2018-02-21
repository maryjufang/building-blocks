import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';

export default Mixin.create({
  tagName: 'svg',
  attributeBindings: ['viewBox', 'width', 'height', 'dataTestId:data-test-id'],
  dataTestId: 'icon',
  width: 16,
  height: 16,
  alignToParent: false,
  viewBox: computed('alignToParent', 'width', 'height', function() {
    if (this.get('alignToParent')) {
      return `0 0 ${this.get('width')} ${this.get('height')}`;
    } else {
      return false;
    }
  }),

  didReceiveAttrs() {
    this._super();
    if (this.draw) {
      run.scheduleOnce('render', this, this.draw)
    }
  },
});
