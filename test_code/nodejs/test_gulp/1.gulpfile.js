/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('default', function () {
console.log("hello Gulp!");
    //return gulp.src("source-files")
    //.pipe( plugin() )
    //.pipe( gulp.dest('test_folder') )
});

gulp.task('task_sass', function () {
    //return gulp.src("public_html/sass/main.sass")
    //return gulp.src("!public_html/sass/main.sass")
    return gulp.src("public_html/sass/**/*.sass")
    .pipe( sass() )
    .pipe( gulp.dest('public_html/css') )
    .pipe( browserSync.reload({ stream : true} ) )
});

gulp.task('task_browser-sync', function () {
    browserSync({
	server: {
	    baseDir: "public_html"
	},
	//notify: false
    });
});

//gulp.task('task_watch', ["task_browser-sync", "task_sass"], function () {
    //gulp.watch("public_html/sass/**/*.sass", ["task_sass"]);
//});

gulp.task('task_watch', function () {
    gulp.watch("public_html/sass/**/*.sass", ["task_sass"]);
});
