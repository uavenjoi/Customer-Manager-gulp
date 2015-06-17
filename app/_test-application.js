angular.module('test-application.templates', []);
angular.module('test-application', [
    'component.ajax-error',
    'component.app-version',
    'component.first-component',
    'test-application.templates'
]).config(function (){});
