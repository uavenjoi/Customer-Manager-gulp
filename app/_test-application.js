angular.module('test-application.templates', []);
angular.module('test-application', [
    'test-application.templates',
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'headerModule',
    'customersModule'
    ,'ordersModule'
    ,'mongodb-factory'
]).config(function($stateProvider, $urlRouterProvider, mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase:'killerdb',
        apiKey:'lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2'
    });
    $stateProvider
        .state('index',{
            url:'/',
            template:'<customers/>'
        })
        .state('customers',{
            url:'/customers',
            template:'<customers/>'
        })
        .state('orders',{
            url:'/orders',
            template:'<orders/>'
        })
        .state('detail',{
            url:'/detail/:id',
            template:'<customerdetail/>'
        })
        .state('editOrder',{
            url:'/editOrder/:customerId/:orderId',
            template:'<editorder/>'
        })
    $urlRouterProvider.otherwise('/');
});
