module.exports = function(grunt) {

  //Checks the dependencies associated with Grunt and autoloads
  //& requires ALL of them in this Gruntfile
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    // Sass configuration
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'dist/main.css': 'css/scss/main.scss'
        }
      }
    },

  // Convert ES6 for older browsers
    babel: {
      options: {
        sourceMap: true,
          presets: ['es2015']
        },
        dist: {
          files: {
        'dist/main.min.js': 'js/main.js'
        }
      }
    },

    // Minify JavaScript
    uglify: {
      javascript: {
        files: {
          'dist/main.min.js': ['dist/main.min.js']
        }
      }
    },

    // Copy font awesome fonts into relative project
    copy: {
      font_awesome: {
        expand: true,
        flatten: true,
        src: ['node_modules/font-awesome/fonts/*'],
        dest: 'fonts'
      }
    },

    // Use PostCSS Autoprefixer to apply browser prefixes for certain styles
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer-core')({
              browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'dist/*.css'
      }
    },

    // Server
    connect: {
      server: {
        options: {
          port: 9001,
          base: ''
        }
      }
    },

    // Open
    open : {
      dev : {
        path: 'http://localhost:9001'
      }
    },

    // Watches files and folders for us
    watch: {
      files: [
        '*.html',
        'js/**/*.js',
        'css/**/*.scss',
        'img/**/*.{png,jpg,gif,svg}'
      ],
      tasks: [
        'sass',
        'postcss',
        'babel',
        'uglify'
      ]
    }

  });

  //grunt serve
  grunt.registerTask('default', ['connect', 'open', 'watch']);
};
