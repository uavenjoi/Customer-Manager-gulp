xdescribe('ajax-error', function () {
    beforeEach(module('templates'));
    beforeEach(module('component.ajax-error'));

    describe('build', function () {
        it('element should get compiled', inject(function (directiveBuilder, $httpBackend, $http) {
            var directive = directiveBuilder.build('<ajax-error></ajax-error>');
            directive.scope.$digest();

            expect(directive.element.text()).toBeFalsy();
            expect(directive.element.text()).toBeFalsy();

            $httpBackend.expectGET('/call-to-api').respond(500, '');
            $http.get('/call-to-api');
            $httpBackend.flush();
            expect(directive.element.text()).toBeTruthy();
        }));
    });
});
