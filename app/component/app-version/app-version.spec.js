describe('app-version', function () {
    beforeEach(module('templates'));
    beforeEach(module('component.app-version'));

    describe('build', function () {
        it('element should get compiled', inject(function (directiveBuilder, $httpBackend) {
            $httpBackend.whenGET('package.json').respond({
                version: '0.0.1'
            });
            var directive = directiveBuilder.build('<app-version></app-version>');
            $httpBackend.flush();
            directive.scope.$digest();
            expect(directive.element.text()).toContain('0.0.1');
        }));
    });

    describe('dev', function () {
        beforeEach(module(function ($provide) {
            $provide.constant('version', '0.0.2');
        }));

        it('element should get compiled', inject(function (directiveBuilder) {
            var directive = directiveBuilder.build('<app-version></app-version>');
            directive.scope.$digest();
            expect(directive.element.text()).toContain('0.0.2');
        }));
    });
});
