describe('factory-test', function(){
    var testProvider;
    beforeEach(module('mongodb-factory',function(mongolabFactoryProvider){
        testProvider=mongolabFactoryProvider;
        /*mongolabFactoryProvider.setConfigs({
            dataBase:'killerdb',
            apiKey:'lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2'
        });*/
    }));

    it('Check instance', inject(function(customerFactory){
        expect(testProvider.setConfigs).toBeDefined();
        expect(customerFactory).toBeDefined();
        expect(customerFactory.add).toBeDefined();
    }))
    it('test', inject(function(customerFactory){
        //var customers= customerFactory.getCustomers();
        customerFactory.loadCustomers();
        var customers=customerFactory.getCustomers();
        //console.log(customers);
        expect(customers.length).toBe(0);
    }))

})