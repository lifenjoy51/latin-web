/*jshint node:true */
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean : ['dist/'],
    copy: {
      html: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'dist/',
      }
      ,css : {
        expand:true,
        cwd:'.tmp/concat/',
        src:'css/app.css',
        dest:'dist/'
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        root: 'app',
        dest: 'dist'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    filerev: {
        options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 8
        },
        source: {
            files: [{
                src: [
                    'dist/js/*.js',
                    'dist/css/*.css'
                ]
            }]
        }
    }
  });

  // Default task.
  //grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', [
    'clean','copy:html','useminPrepare', 'concat:generated','copy:css', 'uglify:generated', 'filerev', 'usemin'
  ]);
};
