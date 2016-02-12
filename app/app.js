'use strict';

(function () {
	'use strict';

	var myApp = new o.Module('myApp');
})();

(function () {
	'use strict';

	var todoList = [{
		id: 1,
		name: 'Watch JS Talks aboud Design Patterns',
		done: false,
		date: new Date(2016, 1, 11, 12)
	}, {
		id: 2,
		name: 'Create own awesome framework',
		done: false,
		date: new Date(2011, 0, 29, 9)
	}, {
		id: 3,
		name: 'Study English',
		done: true,
		date: new Date(2016, 1, 15)
	}];

	var todoListData = new o.DataModel('todoList', todoList);
})();

(function () {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.about = '\n\t\t<div class="text-center">\n\t\t\tWelcome! This is todo application created using my own framework - <b>O</b>\n\t\t\t<img src="resources/components/about/diagram.svg" class="diagramm">\n\t\t</div>\n\t';
})();
(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
		name: 'about',
		selector: "#app",
		template: app.templates.about
	}).registerRoute('');
})();

(function () {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.done = '\n\t\t<h3 class="text-center">\n\t\t\tDone tasks\n\t\t</h3>\n\t\t<table class="table">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Task</th>\n\t\t\t</tr>\n\n\t\t\t{{#each tasks}}\n\t\t\t<tr>\n\t\t\t\t<td>{{this.i}}</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a href="#/task/{{this.id}}">\n\t\t\t\t\t\t{{this.name}}\n\t\t\t\t\t</a>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t{{/each}}\n\n\t\t</table>\n\t\t<em>Note: click on task to read about it</em>\n\t';
})();
(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
		name: 'done',
		selector: "#app",
		template: app.templates.done,
		ctrlFunc: ctrlFunc
	}).registerRoute('/done').addDataModel(o.getDataModel('todoList'));

	function ctrlFunc(getDataModel) {
		var model = getDataModel('todoList');
		var tasks = [];
		var i = 1;

		for (var j = 0; j < model.length; j++) {
			if (model[j].done) {
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

(function () {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.task = '\n\t\t{{#if task}}\n\t\t\t<h2 class="text-center">Task #{{task.id}}</h2>\n\t\t\t<div class="well">\n\t\t\t\t<b>Task: </b>{{task.name}}\n\t\t\t</div>\n\t\t\t<div class="well">\n\t\t\t\t<b>Done: </b>{{task.done}}\n\t\t\t</div>\n\t\t\t<div class="well">\n\t\t\t\t<b>Created: </b>{{task.dateFormated}}\n\t\t\t</div>\n\t\t{{else}}\n\t\t\t<div class="well text-center">\n\t\t\t\t<b>Sorry this task isn\'t exist anymore (cause you updated your window)</b>\n\t\t\t</div>\n\t\t{{/if}}\n\t';
})();
(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
		name: 'task',
		selector: "#app",
		template: app.templates.task,
		ctrlFunc: ctrlFunc
	}).registerComplexRoute('/task', 'id').addDataModel(o.getDataModel('todoList'));

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

	function ctrlFunc(getDataModel, urlVar) {
		var model = getDataModel('todoList');

		var id = +urlVar['id'];
		var task = false;

		for (var i = 0; i < model.length; i++) {
			if (model[i].id === id) {
				task = model[i];
				task.dateFormated = task.date.toLocaleString('en-US', dateOptions);
			}
		}

		this.task = task;
	}
})();

(function () {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.title = '\n\t\tYou have <b>{{done}}</b> done cases \n\t\tand <b>{{undone}}</b> undone cases\n\t';
})();
(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
		name: 'title',
		selector: "#title",
		template: app.templates.title,
		ctrlFunc: ctrlFunc
	}).addDataModel(o.getDataModel('todoList')).activate();

	function ctrlFunc(getDataModel) {
		var model = getDataModel('todoList');
		this.done = 0;
		this.undone = 0;

		for (var i = 0; i < model.length; i++) {
			if (model[i].done) {
				this.done++;
			} else {
				this.undone++;
			}
		}
	}
})();

(function () {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.todo = '\n\t\t<h3 class="text-center">\n\t\t\tAdd some task\n\t\t</h3>\n\t\t<form class="text-center">\n\t\t\t<input \n\t\t\t\trequired type="text" \n\t\t\t\tplaceholder="Type another task here..."\n\t\t\t\tclass="input-text form-control"/>\n\t\t\t<button class="btn btn-info">\n\t\t\t\tAdd task\n\t\t\t</button>\n\t\t</form>\n\t\t<h3 class="text-center">\n\t\t\tTasks to do\n\t\t</h3>\n\t\t<table class="table">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th class="task">Task</th>\n\t\t\t\t<th>Done</th>\n\t\t\t</tr>\n\t\t\t{{#each tasks}}\n\n\t\t\t<tr>\n\t\t\t\t<td>{{this.i}}</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a href="#/task/{{this.id}}">\n\t\t\t\t\t\t{{this.name}}\n\t\t\t\t\t</a>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<button class="btn btn-info" data-o-id={{this.id}}>\n\t\t\t\t\t\tDone\n\t\t\t\t\t</button>\n\t\t\t\t</td>\n\t\t\t</tr>\n\n\t\t\t{{/each}}\n\t\t</table>\n\t\t<em>Note: click on task to read about it</em>\n\t';
})();
(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
		name: 'todo',
		selector: "#app",
		template: app.templates.todo,
		ctrlFunc: ctrlFunc
	}).registerRoute('/todo').addDataModel(o.getDataModel('todoList')).registerDataChanger('submit', 'form', 'todoList', function (event) {
		event.preventDefault();
		return function (compElement, getDataModel) {
			var model = getDataModel('todoList');

			model.push({
				id: model[model.length - 1].id + 1,
				name: compElement.querySelector('.input-text').value,
				done: false,
				date: new Date()
			});
		};
	}).registerDataChanger('click', 'button[data-o-id]', 'todoList', function (event) {

		return function (compElement, getDataModel) {
			var id = event.target.getAttribute('data-o-id');
			var model = getDataModel('todoList');
			//console.log(model);
			for (var i = 0; i < model.length; i++) {
				if (model[i].id == id) {
					model[i].done = true;
					return;
				}
			}
		};
	});

	function ctrlFunc(getDataModel) {
		var model = getDataModel('todoList');
		var tasks = [];
		var i = 1;

		for (var j = 0; j < model.length; j++) {
			if (!model[j].done) {
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