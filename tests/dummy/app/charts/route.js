import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller) {
    this._super();
    controller.set('progress', 0);
    let increaseProgress = function(progress) {
      progress += 1;
      setTimeout(() => {
        controller.set('progress', progress);
        if (progress < 96) {
          increaseProgress(progress);
        }
      }, 200);
    };
    increaseProgress(0);
  }
});
