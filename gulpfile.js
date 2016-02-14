var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var path = require('path');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

// paths
var paths = {
	localhost: 'http://localhost:8000/index.html',
	framework: 'app/framework/own-framework.js',
	app: 'app/resources/**/*.js',
	handlebars: 'app/vendors/handlebars/handlebars.js',
	babelized: 'app/dist/babelized.js',
	dist: 'app/dist'
};

// es lint
// turn on es6 on linter
var options = {
	'env': {
		'es6': true
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
		.pipe(gulp.dest(paths.dist));
});

gulp.task('concat', ['babel'], function() {
	return gulp.src([ paths.handlebars, paths.babelized ])
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.dist));
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
gulp.task('default', ['concat', 'webserver', 'watch']);



// tests
var jasmine = require('gulp-jasmine');
 
gulp.task('test', function () {
	return gulp.src('tests/test.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it 
		.pipe(jasmine());
});














