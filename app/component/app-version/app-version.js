angular.module('component.app-version', [
    'package-json'
]).directive('appVersion', function ($http, version) {
    return {
        link: function ($scope) {
            if (version) {
                $scope.version = version;
            } else {
                $http.get('package.json').success(function (pkg) {
                    $scope.version = pkg.version;
                });
            }
        },
        templateUrl: 'app/component/app-version/app-version.html'
    };
});

angular.module('package-json', []).constant('version', false); //should be overriden by gulp in production
