import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  timeoutFunc: null,
  setupController(controller) {
    this._super();
    controller.set('data', Ember.A([{ x: 1, y: 100}, { x: 2, y: 80}, { x: 3, y: 10}, { x: 4, y: 50}, { x: 5, y: 100}, { x: 6, y: 80}, { x: 7, y: 50}, { x: 8, y: 70}, { x: 9, y: 90}, { x: 10, y: 40}]));

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
