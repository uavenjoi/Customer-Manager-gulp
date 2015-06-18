angular.module('customersModule',[
    'mongodb-factory'
])
    .directive('customers', function(mongolabFactory, customerFactory){
        return {
            restrict:'E',
            transclude: true,
            templateUrl:'app/component/customer/customers.html',
            link:function($scope){
                $scope.isCreate=false;
                if(!customerFactory.isLoad)
                  customerFactory.loadCustomers();
                $scope.customers=customerFactory.getCustomers();
                $scope.services = customerFactory.getServices();
                $scope.customer={};

                $scope.openEdit=function(customer){
                    console.log(customer);
                    $scope.services.getCustomerById(customer.id);
                    $scope.customer=customer;
                    $scope.isEdit=true;
                    $scope.currentAction='Edit customer';
                    $scope.editedCustomer={}
                };
                $scope.openCreate=function(){
                    $scope.customer.firstName="";
                    $scope.customer.name="";
                    $scope.customer.city="";
                    $scope.currentAction='Create customer';
                };
            }
        }
    })
.directive('customerdetail', function($state,$stateParams, customerFactory){
      return{
          restrict:'E',
          transclude: true,
          templateUrl:'app/component/customer/customer-detail.html',
          link:function($scope){
            $scope.services = customerFactory.getServices();
              var id=$stateParams.id;
            $scope.customer=$scope.services.getCustomerById(parseInt(id));
            $scope.firstName=$scope.customer.firstName;
              $scope.addOrder=function(){
                  console.log($scope.customer);
                  customerFactory.setCurrentOrder(null);
              }
            console.log($scope.customer);
            console.log($scope.customer.orders);
          }
      }
    })

