import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/nav-bar/nav-item', 'Integration | Component | layout/nav bar/nav item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/nav-bar/nav-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/nav-bar/nav-item}}
      template block text
    {{/layout/nav-bar/nav-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
