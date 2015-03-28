/*jshint node:true */
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    useminPrepare: {
      html: 'app/index.html',
      options: {
        root: 'app',
        dest: 'dist'
      }
    },
    usemin: {
      html: 'app/index.html',
      options: {
        root: 'app',
        dest: 'dist'
      }
    }
  });

  // Default task.
  //grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', [
    'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin'
  ]);

  grunt.registerTask('up', [
  'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin'
  ]);
};
