angular.module('ordersModule',[
    'mongodb-factory'
])
.directive('orders',function(mongolabFactory,customerFactory){
           return {
               restrict: 'E',
               transclude: true,
               templateUrl: 'app/component/order/orders.html',
               link:function($scope){
                   $scope.customers=customerFactory.getCustomers();
                   $scope.services = customerFactory.getServices();
               }
           }
    })
    .directive('customerorders',function($state,customerFactory){
        return{
            scope:true,
            templateUrl:'app/component/customer/customer-orders.html',
            link:function($scope){
                $scope.services = customerFactory.getServices();
                $scope.removeOrder=function(customer,order){
                    $scope.services.getCustomerById(customer.id)
                    $scope.services.removeOrder(order);

                }
            }
        }
    })
    .directive('editorder',function($state,$stateParams, customerFactory) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/component/edit/edit.html',
            link: function ($scope) {
                $scope.customerId = $stateParams.customerId;
                $scope.services = customerFactory.getServices();

                $scope.order = customerFactory.getCurrentOrder();
                $scope.isEditOrder= $scope.order? true: false;

                $scope.editOrder = function() {
                    customerFactory.setCurrentOrder(null);
                }
            }
        }
    })
    .filter('totalSum', function(){
        return function(customer){
            if (typeof customer === 'undefined')  return;
            var sum = 0;
            customer.forEach(function(_o){
                sum = sum + ((_o.price || 0) * (_o.count || 0));
            });
            return sum;
        }
    })