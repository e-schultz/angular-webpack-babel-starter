import './styles/main.scss';

import angular from 'angular';
import router from './core/router';
import i18n from './core/i18n';

import main from './components/main';

angular
  .module('changeThis', [
    main,
    router,
    i18n
  ])
  .run(function ($log) {
    $log.log('application online');
  });
