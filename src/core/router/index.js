import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routerConfig from './router-config';
import routerService from './router-service';

export default angular
  .module('app.core.router', [
    uiRouter
  ])
  .factory('router', routerService)
  .config(routerConfig)
  .name;
