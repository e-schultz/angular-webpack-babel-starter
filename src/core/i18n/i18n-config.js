import enTranslations from './translations/locale-en';

export default function i18nConfig($translateProvider) {
  $translateProvider.translations('en', enTranslations);
  $translateProvider.preferredLanguage('en');
}

i18nConfig.$inject = ['$translateProvider'];
