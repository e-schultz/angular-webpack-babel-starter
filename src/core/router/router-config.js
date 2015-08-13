import template from '../../components/main/main-tpl.html';

export default function routerConfig($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      views: {
        main: {
          template: template,
          controller: 'MainController',
          controllerAs: 'main'
        }
      }
    });
}

routerConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
