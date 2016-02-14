var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var path = require('path');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

// paths
var paths = {
	localhost: 'http://localhost:8000/index.html',
	framework: 'app/framework/own-framework.js',
	app: 'app/resources/**/*.js'
};

gulp.task('babel', function() {
	return gulp.src([
		'app/framework/own-framework.js',
		'app/resources/**/*.js'
		])
		.pipe(concat('babelized.js'))
		.pipe(babel())
		.pipe(gulp.dest('app/dist'));
});

gulp.task('concat', ['babel'], function() {
	return gulp.src([
		'app/vendors/handlebars/handlebars.js',
		'app/dist/babelized.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app/dist'));
});

// WebServer
gulp.task('webserver', function() {
	return gulp.src('app')
		.pipe(plug.webserver({
			livereload: true,
			directoryListing: true,
			open: paths.localhost
		}));
});

// watch files, transpile if one of them changes
gulp.task('watch', function() {
	gulp.watch(paths.framework, ['concat']);
	gulp.watch(paths.app, ['concat']);
});

// The default task is 'watch'
gulp.task('default', ['watch', 'webserver', 'concat']);

//ESLINT WILL BE HERE
var eslint = require('gulp-eslint');


var options = {
	'envs': [
		{'es6': true}
	]
}

gulp.task('lint', function(){
	return gulp.src(['app/resources/**/*.js', 'app/framework/own-framework.js'])
		.pipe(eslint(options))
		.pipe(eslint.result(function (result) {
			// Called for each ESLint result. 
			console.log('ESLint result: ' + result.filePath);
			console.log('# Messages: ' + result.messages.length);
			for (var i = 0; i < result.messages.length; i++) {
				console.log('# Message ' + ( i + 1 ) + ': ' + result.messages[i].message + ' on line ' + 
					result.messages[i].line);
			};
			console.log('# Warnings: ' + result.warningCount);
			console.log('# Errors: ' + result.errorCount);
			//callback(result.error);
		}));
})


function callback(e){
	console.log('error===' + e);
}












