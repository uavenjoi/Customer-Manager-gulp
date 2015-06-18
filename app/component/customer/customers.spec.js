describe('customers-test', function(){
    beforeEach(module('templates'));
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


    it('element should be compiled', inject(function(directiveBuilder,$httpBackend){

        var directive=directiveBuilder.build('<customers><customers/>');
        directive.scope.$digest();
        $httpBackend.flush();
        console.log(directive.element.html());
        expect(directive.element.html()).toBeDefined();
    }))
})