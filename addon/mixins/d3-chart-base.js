import Mixin from '@ember/object/mixin';

export default Mixin.create({
  tagName: 'svg',
  width: 200,
  height: 200,
  attributeBindings: ['width', 'height'],

  data: [] // user input

});
