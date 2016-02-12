(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
			name: 'done',
			selector: "#app",
			template: app.templates.done,
			ctrlFunc: ctrlFunc
		})

		.registerRoute('/done')

		.addDataModel(o.getDataModel('todoList'));

	function ctrlFunc(getDataModel){
	var model = getDataModel('todoList');
	var tasks = [];
	var i = 1;

	for (var j = 0; j < model.length; j++){
		if (model[j].done){
			tasks.push({
				i: i,
				name: model[j].name,
				id: model[j].id
			});
			i++;
		}
	}

	this.tasks = tasks;
	}

})();
