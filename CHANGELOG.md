8. add ember-cli-bootstrap-css, page layout, and home page

7. implement line chart

6. update pages to github
6.1. enable pages in github
6.2. $ ember install ember-cli-github-pages

5. Add a tooltip wrapper: contextual components
	new file:   CHANGELOG.md
	modified:   addon/components/charts/progress-circle/component.js
	modified:   addon/components/charts/progress-circle/template.hbs
	modified:   addon/components/icon-component/template.hbs
	modified:   addon/components/icons/loading-icon/component.js
	modified:   addon/components/icons/loading-icon/template.hbs
	new file:   addon/components/icons/svg-tooltip-wrapper/component.js
	new file:   addon/components/icons/svg-tooltip-wrapper/template.hbs
	new file:   addon/components/svg-tooltip-wrapper/component.js
	new file:   addon/components/svg-tooltip-wrapper/template.hbs
	deleted:    addon/mixins/d3-icon-base.js
	new file:   addon/mixins/svg-base.js
	modified:   addon/styles/addon.scss
	new file:   addon/styles/svg.scss
	new file:   app/components/svg-tooltip-wrapper/component.js
	modified:   package.json
	modified:   tests/dummy/app/charts/template.hbs
	modified:   tests/dummy/app/icons/template.hbs
	new file:   tests/integration/components/svg-tooltip-wrapper/component-test.js
4. D3 tests
    $ ember install ember-d3
    $ npm install d3
	modified:   package.json
	modified:   tests/dummy/app/application/template.hbs
	modified:   tests/dummy/app/charts/template.hbs
	modified:   tests/dummy/app/index.html
	modified:   tests/dummy/app/index/template.hbs
	modified:   tests/dummy/app/router.js

  addon/components/charts/bar-chart/
	addon/components/charts/progress-circle/
	addon/components/icon-component/
	addon/components/icons/
	addon/mixins/
	addon/styles/
	app/components/charts/bar-chart/
	app/components/charts/progress-circle/
	app/components/icon-component/
	app/components/icons/
	tests/dummy/app/charts/route.js
	tests/dummy/app/icons/
	tests/dummy/app/styles/
	tests/integration/components/charts/bar-chart/
	tests/integration/components/charts/progress-circle/
	tests/integration/components/icon-component/
	tests/integration/components/icons/

3. Organize Dummy app
    tests/dummy/app/router.js
    @@ -7,6 +7,7 @@
    const Router = EmberRouter.extend({
    });
    Router.map(function() {
      +  this.route('charts');
    });

	new file:   tests/dummy/app/application/template.hbs
	new file:   tests/dummy/app/charts/template.hbs
	deleted:    tests/dummy/app/components/.gitkeep
	deleted:    tests/dummy/app/controllers/.gitkeep
	deleted:    tests/dummy/app/helpers/.gitkeep
	new file:   tests/dummy/app/index/template.hbs
	deleted:    tests/dummy/app/models/.gitkeep
	modified:   tests/dummy/app/router.js
	deleted:    tests/dummy/app/routes/.gitkeep
	deleted:    tests/dummy/app/styles/app.css
	deleted:    tests/dummy/app/templates/application.hbs
	deleted:    tests/dummy/app/templates/components/.gitkeep

2. get rid of package-lock.json
    echo 'package-lock=false' >> .npmrc
    echo 'package-lock.json' >> .gitignore
        // globally: npm config set package-lock false

1. Setup

1.1. Create a new git repository
1.2. Create a new addon
    $ ember addon building-blocks  // create a basic addon
    $ cd building-blocks/
1.3. create a dummy component and try launch it
    $ ember g component charts/line-chart --pod
    	// add a dummy line
    	// use it in tests/dummy/app/templates/application.hbs
    npm install; ember s
        // move ember-cli-htmlbars to `dependencies` (NOT `devDependencies`)

    rerun ember s
1.4. setup done!!!!!
    // push  (follow github instructions
