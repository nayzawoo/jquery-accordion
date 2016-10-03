module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  (c) 2014 Victor Fernandez <victor@vctrfrnndz.com>\n" +
				" *  (c) 2016 <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			js: {
				src: ["src/js/jquery.accordion.js"],
				dest: "dist/js/jquery.accordion.js"
			},
			css: {
				src: ["src/css/jquery.accordion.css"],
				dest: "dist/css/jquery.accordion.css"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/js/jquery.accordion.js", "test/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: ["dist/js/jquery.accordion.js"],
				dest: "dist/js/jquery.accordion.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		"gh-pages": {
			options: {
				base: 'demo',
				add: true
			},
			src: ['**']
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ["src/*", "test/**/*"],
			tasks: ["default"]
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-gh-pages");

	grunt.registerTask("travis", ["jshint"]);
	grunt.registerTask("lint", ["jshint"]);
	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build"]);
};
