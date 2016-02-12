(function() {
	'use strict';

	var appTemplates = o.getModule('myApp').templates;

	appTemplates.about = `
		<div class="text-center">
			Welcome! This is todo application created using my own framework - <b>O</b>
			<img src="resources/components/about/diagram.svg" class="diagramm">
		</div>
	`;
})();