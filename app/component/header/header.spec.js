describe('header-test',function(){
    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
    beforeEach(module('headerModule'));

    it('header should be defined', inject(function(directiveBuilder){
            var header = directiveBuilder.build('<mainMenu><mainMenu/>');
            header.scope.$digest();
            //console.log(header.element.html());
            expect(header.element.html()).toBeDefined();
        })
    )

    it('customers menu should be active', inject(function(directiveBuilder, $state){
            $state.active='customers';
            var header = directiveBuilder.build('<main-menu><main-menu/>');
            header.scope.$digest();
            console.log(header.element.html());
            expect(header.element.html()).toBeDefined();

            expect(header.element.find('li').eq(1).hasClass('active')).toBe(false);
            expect(header.element.find('li').eq(0).hasClass('active')).toBe(false);
        })
    )
})