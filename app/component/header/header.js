angular.module('headerModule',[])
    .directive('mainMenu',function(){
        return{
            restrict:"E",
            transclude: true,
            templateUrl: 'app/component/header/header.html',
            link: function(scope){
                scope.appTitle = 'Customer Manager';
            }
        }
    });