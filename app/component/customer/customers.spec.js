describe('customers-test', function(){
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


    it('element customers should be compiled', inject(function(directiveBuilder,$httpBackend){
        var directive1=directiveBuilder.build('<customers><customers/>');
        directive1.scope.$digest();
        var customerdetail=directiveBuilder.build('<customerdetail><customerdetail/>');
        customerdetail.scope.$digest();
        $httpBackend.flush();
          expect(directive1.element.html()).toBeDefined();
        var customer= {
            "_id": {
            "$oid": "557db6cae4b0374677d221a9"
        },
            "id": 1434302152872,
            "city": "6",
            "gender": "female",
            "firstName": "4",
            "name": "5",
            "orders": []
        }
        expect(directive1.scope.openEdit(customer));
        expect(directive1.scope.openCreate());

        expect(customerdetail.element.html()).toBeDefined();
        expect(customerdetail.scope.addOrder());


     }));


})