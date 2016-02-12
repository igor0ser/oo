(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
			name: 'task',
			selector: "#app",
			template: app.templates.task,
			ctrlFunc: ctrlFunc
		})

		.registerComplexRoute('/task', 'id')

		.addDataModel(o.getDataModel('todoList'));

	var dateOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};

	function ctrlFunc(getDataModel, urlVar){
		var model = getDataModel('todoList');

		var id = +urlVar['id'];
		var task = false;

		for (var i = 0; i < model.length; i++){
			if (model[i].id === id){
				task = model[i];
				task.dateFormated = task.date.toLocaleString('en-US', dateOptions);
			}
		}

		this.task = task;

	}

})();
