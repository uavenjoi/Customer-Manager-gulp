describe('order-test',function(){
    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
    beforeEach(module('ordersModule'));
    beforeEach(module('mongodb-factory',function(mongolabFactoryProvider){
        mongolabFactoryProvider.setConfigs({
            dataBase:'killerdb',
            apiKey:'lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2'
        });
    }));

    beforeEach(inject(function($httpBackend){
        var url='https://api.mongolab.com/api/1/databases/killerdb/collections/test-collection2?apiKey=lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2';
        $httpBackend.whenGET(url).respond(200,[{}]);

    }));

    it('order directives should be compiled',inject(function(directiveBuilder,$httpBackend){
       var directiveOrders=directiveBuilder.build('<orders></orders>');
       var directiveCustomerorders=directiveBuilder.build('<customerorders></customerorders>');
       var directiveEditorder=directiveBuilder.build('<editorder></editorder>');

        directiveOrders.scope.$digest();
        directiveCustomerorders.scope.$digest();
        directiveEditorder.scope.$digest();

        expect(directiveOrders.element.html()).toBeDefined();
        expect(directiveCustomerorders.element.html()).toBeDefined();
        expect(directiveEditorder.element.html()).toBeDefined();

        expect(directiveEditorder.scope.editOrder());
    }))

    it('filter should calculate total price', inject(function($filter) {
            var testOrders=[{price:3}, {price:7}];
            var res =$filter('totalSum')(testOrders);
            expect(res).toBe(0);
        })
    )


});