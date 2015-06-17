angular.module('component.ajax-error', []).directive('ajaxError', function (ajaxErrorService) {
    return {
        templateUrl: 'app/component/ajax-error/ajax-error.html',
        link: function ($scope) {
            $scope.ajaxErrorService = ajaxErrorService;
        }
    };
}).factory('ajaxErrorService', function () {
    return {};
}).config(function ($httpProvider) {
    //$httpProvider.defaults.cache = true;
    $httpProvider.interceptors.push(function ($q, ajaxErrorService) {
        return {
            responseError: function (httpErrorObject) {
                if (httpErrorObject.status !== 0) {
                    ajaxErrorService.error = httpErrorObject;
                }
                return $q.reject(httpErrorObject);
            }
        };
    });
});
