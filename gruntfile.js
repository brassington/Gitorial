module.exports = function(grunt) {
	grunt.initConfig({
	pgk: grunt.file.readJSON('package.json'),

	concat: {
		options: {
			separator: ';'
		},
		dist: {
			src: ['public/scripts/ext_libs/shCore.js',
						'public/scripts/ext_libs/shBrushJScript.js',
						'public/scripts/libs/random_tools.js',
						'public/scripts/challenge.js',
						'public/scripts/levels.js',
						'public/scripts/mail_form.js',
						'public/scripts/level_menu.js',
						'public/scripts/main.js'
						],
			dest: 'built.js'
		}
	},

  nodemon: {
  	dev: {
  		script: 'server.js'
  	}
  },

  uglify: {
  	options: {
      mangle: {
      	except: ['jQuery']
      }
  	},
  	dist: {
  		files: {
  			'public/dist/main.min.js': ['<%= concat.dist.dest %>']
  		}
  	}
  },

  cssmin: {
  	options: {
  		keepSpecialComments: 0
  	},
  	dist: {
  		files: {
  			'public/dist/styles.min.css': 'public/css/*.css'
  		}
  	}
  },

  watch: {
  	scripts: {
  		files: [
  		  'public/**/*.js',
  		  '*.js'
  		],
  		tasks: [
  		  'concat',
  		  'uglify'
  		]
  	},
  	css: {
  		files: 'public/**/*.css',
  		tasks: ['cssmin']
  	}
  },

  shell: {
  	prodServer: {
  		command: 'git push azure master',
  		options: {
  			stdout: true,
  			stderr: true,
  			failOnError: true
  		}
  	}
  }
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-nodemon');

grunt.registerTask('server-dev', function(target) {
  var nodemon = grunt.util.spawn({
  	cmd:'grunt',
  	grunt: true,
  	args: 'nodemon'
  });
  nodemon.stdout.pipe(process.stdout);
  nodemon.stderr.pipe(process.stderr);

  grunt.task.run([ 'watch' ]);
});

grunt.registerTask('build', [
	'concat',
  'uglify',
  'cssmin'
	]);

grunt.registerTask('upload', function(n) {
	if (grunt.option('prod')) {
		grunt.task.run([ 'shell:prodServer' ]);
	} else {
		grunt.task.run([ 'server-dev' ]);
	}
});

grunt.registerTask('deploy', [
	'build',
	'upload'
	]);

};
