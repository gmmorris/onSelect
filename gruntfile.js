module.exports = function (grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//
		// qunit: {
		// 	all: {
		// 		options: {
		// 			urls: [
		// 				'http://localhost:9000/test/index.html'
		// 			]
		// 		}
		// 	}
		// },
		//
		// // for changes to the front-end code
		// watch: {
		// 	scripts: {
		// 		files: [],
		// 		tasks: ['test']
		// 	}
		// },

		jshint: {
			files: ['onSelect.js'],
			options: {
				globals: {
					jQuery: true,
					console: false,
					module: true,
					document: true
				}
			}
		},
		//connect: {		
		// 	server: {
		// 		options: {
		// 			port: 9000,
		// 			base: '.'
		// 		}
		// 	}
		// },
		uglify: {
			release: {
				options: {
					mangle: false,
					beautify : {
						ascii_only : true,
						quote_keys: true
					}
				},
				files: {
					'./release/onSelect.min.js': ['onSelect.js'],
					'./release/onSelect.jquery.min.js': ['onSelect.js','addons/jquery.js']
				}
			}
		}
	});

	// grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
	// grunt.registerTask('tdd', ['watch']);
	grunt.registerTask('build', ['uglify:release']);
};
