(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
			name: 'about',
			selector: "#app",
			template: app.templates.about
		})

			.registerRoute('');

})();
