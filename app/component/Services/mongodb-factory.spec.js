describe('factory-test', function(){
    beforeEach(module('mongodb-factory'));
    it('Check instance', inject(function(customerFactory){
        expect(customerFactory).toBeDefined();
        expect(customerFactory.add).toBeDefined();
    }))
    it('test', inject(function(customerFactory){
        //var customers= customerFactory.getCustomers();
        customerFactory.loadCustomers();
        var customers=customerFactory.getCustomers();
        console.log(customers);
        expect(customers.length).toBe(0);
    }))

})