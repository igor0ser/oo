'use strict';

describe('Component todo', function(){

	it('should be created', function(){
		var c = o.getModule('myApp').getComponent('todo');
		expect(c).not.toEqual(undefined);
	});

	it('should has template', function(){
		var c = o.getModule('myApp').getComponent('todo');
		var template = c.template;
		expect(template).toEqual(jasmine.any(String));
	});

	it('should become not active after deactivation', function(){
		var c = o.getModule('myApp').getComponent('todo');
		c.deactivate();
		expect(c.active).not.toBeTruthy();
	});

});