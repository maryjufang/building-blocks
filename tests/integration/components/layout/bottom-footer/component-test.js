import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/bottom-footer', 'Integration | Component | layout/bottom footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/bottom-footer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/bottom-footer}}
      template block text
    {{/layout/bottom-footer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
