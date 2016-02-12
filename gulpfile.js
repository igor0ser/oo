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