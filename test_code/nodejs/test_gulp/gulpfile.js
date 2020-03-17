//http://getinstance.info/articles/tools/9-gulp-plugins/
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

gulp.task('default', function () {
console.log("hello Gulp!");
});

gulp.task("test_build", function () {
	return gulp.src("public_html/js/**/*.js")
		.pipe( concat("app.js") )
		.pipe( uglify() )
		.pipe( gulp.dest('public_html/js/app.js') )
		.on("error", gutil.log)
});
