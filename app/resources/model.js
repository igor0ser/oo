(function(){
	'use strict';

	var todoList = [
		{
			id: 1,
			name: 'Watch JS Talks aboud Design Patterns',
			done: false,
			date: new Date(2016, 1, 11, 12)
		},
		{
			id: 2,
			name: 'Create own awesome framework',
			done: false,
			date: new Date(2011, 0, 29, 9)
		},
		{
			id: 3,
			name: 'Study English',
			done: true,
			date: new Date(2016, 1, 15)
		}
	];

	var todoListData = new o.DataModel('todoList', todoList);


})();
