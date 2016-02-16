'use strict';

describe('Creation of dataModel', function(){

	it('should create object of dataModel', function(){
		expect(o.getDataModel('todoList')).toEqual(jasmine.any(o.DataModel));
	});

	it('name of dataModel should be todoList', function(){
		expect(o.getDataModel('todoList').name).toEqual('todoList');
	});

	it('model should consist three or more items', function(){
		var length = o.getDataModel('todoList').model.length;
		expect(length >= 3).toBeTruthy();
	});

});
