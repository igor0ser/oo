(function() {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.done = `
		<h3 class="text-center">
			Done tasks
		</h3>
		<table class="table">
			<tr>
				<th>#</th>
				<th>Task</th>
			</tr>

			{{#each tasks}}
			<tr>
				<td>{{this.i}}</td>
				<td>
					<a href="#/task/{{this.id}}">
						{{this.name}}
					</a>
				</td>
			</tr>
			{{/each}}

		</table>
		<em>Note: click on task to read about it</em>
	`;
})();