import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  timeoutFunc: null,
  setupController(controller) {
    this._super();
    controller.set('data', A([
      { x: 1, y: 100}, { x: 2, y: 80}, { x: 3, y: 10}, { x: 4, y: 50}, { x: 5, y: 100}, { x: 6, y: 80}, { x: 7, y: 50}, { x: 8, y: 70}, { x: 9, y: 90}, { x: 10, y: 40},
      { x: 11, y: 100}, { x: 12, y: 80}, { x: 13, y: 10}, { x: 14, y: 50}, { x: 15, y: 100}, { x: 16, y: 80}, { x: 17, y: 50}, { x: 18, y: 70}, { x: 19, y: 90}, { x: 20, y: 40},
      { x: 21, y: 100}, { x: 22, y: 80}, { x: 23, y: 10}, { x: 24, y: 50}, { x: 25, y: 100}, { x: 26, y: 80}, { x: 27, y: 50}, { x: 28, y: 70}, { x: 29, y: 90}, { x: 30, y: 40},
      { x: 31, y: 100}, { x: 32, y: 80}, { x: 33, y: 10}, { x: 34, y: 50}, { x: 35, y: 100}, { x: 36, y: 80}, { x: 37, y: 50}, { x: 38, y: 70}, { x: 39, y: 90}, { x: 40, y: 40}
    ]));

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
