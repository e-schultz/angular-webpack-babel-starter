import angular from 'angular';
import angularTranslate from 'angular-translate';

import i18nConfig from './i18n-config';

export default angular
  .module('app.core.i18n', [
    angularTranslate
  ])
  .config(i18nConfig)
  .run(function () {
    console.log('i18n online');
  })
  .name;
