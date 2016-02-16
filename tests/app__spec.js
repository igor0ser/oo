'use strict';

describe('Creation of module myApp', function(){

	it('should create object of module', function(){
		expect(o.getModule('myApp')).toEqual(jasmine.any(o.Module));
	});

	it('name of module should be myApp', function(){
		expect(o.getModule('myApp').name).toEqual('myApp');
	});

});
