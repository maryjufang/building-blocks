import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('svg-tooltip-wrapper', 'Integration | Component | svg tooltip wrapper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{svg-tooltip-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#svg-tooltip-wrapper}}
      template block text
    {{/svg-tooltip-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
