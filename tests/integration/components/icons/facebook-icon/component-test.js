import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('icons/facebook-icon', 'Integration | Component | icons/facebook icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{icons/facebook-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#icons/facebook-icon}}
      template block text
    {{/icons/facebook-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
