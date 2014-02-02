module.exports = function(grunt) {
  var S = require('string');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          baseUrl: "app/scripts",
          mainConfigFile: "app/scripts/config.js",
          name: "comments",
          optimize: "none",
          dir: "public/scripts"
        }
      }
    },

    less: {
      development: {
        files: {
          "public/css/framework.css": "app/less/framework.less"
        }
      }
    },

    hogan: {
      publish: {
        options: {
          prettify: true,
          namespace: 'T',
          amdWrapper: true,
          amdRequire: {
            hogan: 'Hogan'
          },
          defaultName: function(filename) {
            var base = filename.split('/').pop();
            return S(base.split('.').shift()).camelize().s;
          }
        },
        files:{
          "app/scripts/templates.js": ["app/templates/*.html"]
        }
      }
    },

    clean: {
      // toggle this to true to preview what you would've deleted.
      options: {"no-write": false},
      build: [
        "public/scripts/build.txt"
      ]
    },

    shell: {
      /*
        A quick utility to extract only the needed JS files from bower installs
        so we keep compile times low and don't store crap like vendor tests in 
        the public folder.

        USAGE:
        $ grunt shell:pluckjs:<resource-name>
        -- this assumes there is a resource.js inside a folder called resource
        OR:
        $ grunt shell:pluckjs:<path>,<resource-name>[, ...]
        -- use a comma-delimited list with the path first followed by one or 
           more files from that folder to move over.
      */
      pluckjs: {
        options: {
          stdin: true,
          stdout: true,
          stderr: true
        },
        command: function(files) {
          if(!files) {
            return 'echo "provide a base filename: \n$ grunt shell:pluckjs:<basename>"';
          }
          var args = files.split(','),
              dest = 'app/scripts/lib/',
              src = 'app/components/',
              filenames = '';

          switch(args.length) {
            case 1:
              // we are copying name.js from /name
              src += args[0] + '/' + args[0] + '.js ';
              return 'cp ' + src + dest;
            case 2:
              // args[0] is the folder, args[1] is the file to pluck
              src += args[0] + '/' + args[1] + '.js ';
              return 'cp ' + src + dest;
            default:
              // args[0] is the folder, all others are files within it to pluck
              src += args[0] + '/{';
              for(var i = 1; i < args.length; i++) {
                filenames += args[i];
                if(i < args.length - 1) {
                  filenames += ',';
                }
              }
              src += filenames + '}.js ';
              return 'cp ' + src + dest;
          }
          return 'echo ' + files;
        }
      },

      confirm: {
        command: 'say "Grunt has finished."'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-hogan');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['hogan', 'requirejs', 'clean:build', "shell:confirm"]);
};