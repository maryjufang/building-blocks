import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';

export default Mixin.create({
  tagName: 'svg',
  attributeBindings: ['widthHeight:width', 'widthHeight:height', 'dataTestId:data-test-id'],
  dataTestId: 'icon',
  didReceiveAttrs() {
    this._super();
    run.scheduleOnce('render', this, this.drawIcon)
  },
  // Override this
  // drawIcon() {
  //
  // }
});
