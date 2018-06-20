import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('icons/twitter-icon', 'Integration | Component | icons/twitter icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{icons/twitter-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#icons/twitter-icon}}
      template block text
    {{/icons/twitter-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
