(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
			name: 'title',
			selector: "#title",
			template: app.templates.title,
			ctrlFunc: ctrlFunc
		})

		.addDataModel(o.getDataModel('todoList'))

		.activate();

	function ctrlFunc(getDataModel){
		var model = getDataModel('todoList');
		this.done = 0;
		this.undone = 0;

		for (var i = 0; i < model.length; i++) {
			if (model[i].done){
				this.done++;
			} else {
				this.undone++;
			}
		}

		}
})();
