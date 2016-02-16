'use strict';

describe('Module creation', function(){

	it('should create object of module', function(){
		expect(new o.Module('Test')).toEqual(jasmine.any(o.Module));
	});

});

describe('Get Module functiom', function(){
	new o.Module('AnotherTest')
	it('should return object of module', function(){
		expect(o.getModule('AnotherTest')).toEqual(jasmine.any(o.Module));
	});

});

describe('DataModel creation', function(){

	it('should create object of dataModel', function(){
		
		expect(new o.DataModel('TestData', {})).toEqual(jasmine.any(o.DataModel));
	});

});

describe('Get DataModel', function(){
	var testData = 'test';
	new o.DataModel('AnotherTestData', testData);

	it('should return object of dataModel', function(){
		expect(o.getDataModel('AnotherTestData')).toEqual(jasmine.any(o.DataModel));
	});

	it('should return proper info from dataModel', function(){
		expect(o.getDataModel('AnotherTestData').model).toEqual('test');
	});

});