/*global module:false*/
module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({

    // Task configuration.

    concat: {
		//options: { separator: ';'},
		build: {
			"src": [
"../js/functions.js", 
"../js/main.js", 
"../js/webapp.js", 
"../js/webapp_db.js", 
"../js/webapp_draw.js", 
"../js/webapp_fm.js", 
"../js/webapp_player.js"
],
			"dest": "../js/app.js"
		}
    },


    uglify: {
      dist: {
        src: '../js/webapp_player.js',
        dest: '../js/webapp_player.min.js'
      }
    }

});//end initConfig


// These plugins provide necessary tasks.
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');

// Default task.
grunt.registerTask('default', ['concat']);
//grunt.registerTask('default', [ 'uglify' ]);

};
