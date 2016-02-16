'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var open = require('gulp-open');
var addsrc = require('gulp-add-src');

// paths
var paths = {
	localhost: 'http://localhost:8000/index.html',
	testLocalhost: 'http://localhost:8888/',
	framework: 'app/framework/own-framework.js',
	app: 'app/resources/**/*.js',
	handlebars: 'app/vendors/handlebars/handlebars.js',
	babelPolyphill: 'app/vendors/babel-polyfill/browser-polyfill.js',
	matchesPolyphill: 'app/vendors/matches-selector/matches-selector.js',
	dist: 'app/dist',
	test: 'tests/*.js'
};



// tests
 
gulp.task('jasmine', function() {
	var filesForTest = [
		paths.handlebars,
		paths.framework,
		paths.app,
		paths.test
	];
	return gulp.src(filesForTest)
		.pipe(watch(filesForTest))
		.pipe(jasmineBrowser.specRunner())
		.pipe(jasmineBrowser.server({port: 8888}))

});

gulp.task('open', function(){
	var options = {
		app: 'chrome',
		uri: paths.testLocalhost
	};
	gulp.src('').pipe(open(options));
});

gulp.task('test', ['open', 'jasmine']);

// default 

var options = {
	'env': {
		'es6': true
	},
	'rules': {
		'quote-props': [2, "as-needed"]
	}
};

gulp.task('lint', function(){
	return gulp.src([paths.app, paths.framework])
		.pipe(eslint(options))
		.pipe(eslint.result(function (result) {
			// Called for each ESLint result. 
			if (result.messages.length > 0){
				for (var i = 0; i < result.messages.length; i++) {
					var mes = '# ESLint message! ' + result.filePath + ' on line ' + 
						result.messages[i].line + ': \n 	' + result.messages[i].message;
					console.log(mes);
				};
			}
		}))
		.pipe(eslint.failAfterError());
})

gulp.task('babel', ['lint'], function() {
	return gulp.src([ paths.framework, paths.app ])
		.pipe(concat('babelized.js'))
		.pipe(babel())
		.pipe(addsrc([
			paths.handlebars,
			paths.babelPolyphill,
			paths.matchesPolyphill
			]))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.dist));
});



gulp.task('webserver', function() {
	return gulp.src('app')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: paths.localhost
		}));
});



// watch files, transpile if one of them changes
gulp.task('watch', function() {
	gulp.watch(paths.framework, ['babel']);
	gulp.watch(paths.app, ['babel']);
});



// The default task is 'watch'
gulp.task('default', ['babel', 'webserver', 'watch']);
















