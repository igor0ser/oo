(function() {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.title = `
		You have <b>{{done}}</b> done cases 
		and <b>{{undone}}</b> undone cases
	`;
})();