(function () {
	'use strict';

	var app = o.getModule('myApp');

	app.createComponent({
			name: 'about',
			selector: "#app",
			template: app.templates.about,
			ctrlFunc: ctrlFunc
		})

			.registerRoute('');


	function ctrlFunc(getDataModel){
		this.isIE = getBrowserInfo().name === 'IE '
	}

	function getBrowserInfo(){
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
			if(/trident/i.test(M[1])){
					tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
					return {name:'IE ',version:(tem[1]||'')};
			}
			if(M[1]==='Chrome'){
					tem=ua.match(/\bOPR\/(\d+)/)
					if(tem!=null)   {return {name:'Opera', version:tem[1]};}
					}   
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			return {
				name: M[0],
				version: M[1]
			};
	}


})();
