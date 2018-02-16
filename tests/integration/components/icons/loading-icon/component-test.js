import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('icons/loading-icon', 'Integration | Component | icons/loading icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{icons/loading-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#icons/loading-icon}}
      template block text
    {{/icons/loading-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
