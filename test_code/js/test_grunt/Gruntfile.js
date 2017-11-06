module.exports = function(grunt){
    grunt.initConfig({
	"options": {"separator": ","},
	"build": {
	    "src": ["js/file1.js", "js/file2.js"],
	    "dest": "js/app.js"
	}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};