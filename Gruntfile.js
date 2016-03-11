'use strict';
var
    path = require('path'),
    folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };
 
module.exports = function(grunt) {
  var pkg, taskName;
  pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    dir: {
      src: "src",
      dist: "dist"
    },
    ect: {
      options: {
        root: '<%= dir.src %>'
      },
      render: {
        expand: true,
        cwd: '<%= dir.src %>',
        src: ['**/*.html.ect'],
        dest: '<%= dir.dist %>',
        ext: '.html',
      },
      variables: {
        projectName : 'front coding env'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    connect: {
      site: {
      }
    },
    watch: {
      html: {
        files: "<%= dir.src %>/*.html.ect",
        tasks: "ect"
      },
      static_files: {
        files: ['**/*.css']
      },
      js_files: {
        files: 'js/**/*.js',
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['compass', 'cmq', 'csscomb'],
      },
      options: {
        livereload: true,
        spawn: false
      }
    },
    cmq:{
      options: {
          log: false
      },
      dev: {
        files: {
            '<%= dir.dist %>/css/': ['<%= dir.dist %>/css/application.css']
        }
      }
    },
    csscomb:{
      dev:{
        expand: true,
        cwd: '<%= dir.dist %>/css/',
        src: ['*.css'],
        dest: '<%= dir.dist %>/css/'
      }
    },
    concat: {
        files: {
            src : 'js/**/*.js',
            dest: 'dist/js/application.js'
        }
    },

    uglify: {
        dist: {
            files: {
                'dist/js/application.min.js': 'dist/js/application.js'
            }
        }
    }
  });
 
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
 
  grunt.registerTask('default', ['connect', 'watch']);
 
  grunt.registerTask('eatwarnings', function() {
    grunt.warn = grunt.fail.warn = function(warning) {
      grunt.log.error(warning);
    };
  });
};
