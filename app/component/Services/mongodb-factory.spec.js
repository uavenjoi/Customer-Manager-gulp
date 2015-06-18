describe('factory-test', function(){
    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
    beforeEach(module('customersModule'));

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

    it('Check instance', inject(function(customerFactory){
        expect(customerFactory).toBeDefined();
        expect(customerFactory.add).toBeDefined();
    }))

    it('test', inject(function(customerFactory){
        customerFactory.loadCustomers();
        var customers=customerFactory.getCustomers();
        expect(customers.length).toBe(0);
    }))

    it('test functions', inject(function(directiveBuilder, customerFactory, $httpBackend){
        var directive1=directiveBuilder.build('<customers><customers/>');
        directive1.scope.$digest();
        $httpBackend.flush();
        var customer={};
       expect(customerFactory.add(customer));
        //$httpBackend.flush();
        //console.log('customers');
        //var current= customerFactory.getCustomerById('1434300657784');
        //console.log(current);
        //expect(customerFactory.add(customerFactory.delete({})));

    }))
})