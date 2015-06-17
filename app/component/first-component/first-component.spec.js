describe('first-component', function () {
    beforeEach(module('templates'));
    beforeEach(module('component.first-component'));

    it('element should get compiled', inject(function (directiveBuilder) {
        var directive = directiveBuilder.build('<first-component></first-component>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
    }));
});

