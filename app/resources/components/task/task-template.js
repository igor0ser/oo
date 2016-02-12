(function() {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.task = `
		{{#if task}}
			<h2 class="text-center">Task #{{task.id}}</h2>
			<div class="well">
				<b>Task: </b>{{task.name}}
			</div>
			<div class="well">
				<b>Done: </b>{{task.done}}
			</div>
			<div class="well">
				<b>Created: </b>{{task.dateFormated}}
			</div>
		{{else}}
			<div class="well text-center">
				<b>Sorry this task isn't exist anymore (cause you updated your window)</b>
			</div>
		{{/if}}
	`;
})();