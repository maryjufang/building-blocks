import Route from '@ember/routing/route';

export default Route.extend({
  timeoutFunc: null,
  setupController(controller) {
    this._super();
    controller.set('progress', 0);
    let increaseProgress = (progress) => {
      progress += 1;
      this.set('timeoutFunc', setTimeout(() => {
        controller.set('progress', progress);
        if (progress < 96) {
          increaseProgress(progress);
        }
      }, 200));
    };
    increaseProgress(0);
  },

  resetController() {
    clearTimeout(this.get('timeoutFunc'));
  }
});
