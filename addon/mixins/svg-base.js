import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';

export default Mixin.create({
  tagName: 'svg',
  attributeBindings: ['width', 'height', 'dataTestId:data-test-id'],
  dataTestId: 'icon',
  width: 16,
  height: 16,

  didReceiveAttrs() {
    this._super();
    if (this.draw) {
      run.scheduleOnce('render', this, this.draw);
    }
  },
});
