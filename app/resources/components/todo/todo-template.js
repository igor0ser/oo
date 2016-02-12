(function() {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.todo = `
		<h3 class="text-center">
			Add some task
		</h3>
		<form class="text-center">
			<input 
				required type="text" 
				placeholder="Type another task here..."
				class="input-text form-control"/>
			<button class="btn btn-info">
				Add task
			</button>
		</form>
		<h3 class="text-center">
			Tasks to do
		</h3>
		<table class="table">
			<tr>
				<th>#</th>
				<th class="task">Task</th>
				<th>Done</th>
			</tr>
			{{#each tasks}}

			<tr>
				<td>{{this.i}}</td>
				<td>
					<a href="#/task/{{this.id}}">
						{{this.name}}
					</a>
				</td>
				<td>
					<button class="btn btn-info" data-o-id={{this.id}}>
						Done
					</button>
				</td>
			</tr>

			{{/each}}
		</table>
		<em>Note: click on task to read about it</em>
	`;
})();