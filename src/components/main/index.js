import './_main.scss';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import MainController from './main-controller';

export default angular
  .module('app.components.main', [
    uiRouter
  ])
  .controller('MainController', MainController)
  .name;
