import angular from 'angular';

import serverService from './server-service';

export default angular
  .module('app.core.server', [])
  .service('server', serverService)
  .name;
