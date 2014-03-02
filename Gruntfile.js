module.exports = function(grunt) {

    // Project configuration.
    grunt
            .initConfig({
                pkg : grunt.file.readJSON('package.json'),
                config : grunt.file.readJSON('config/config.json'),
                jshint : {
                    jshintrc : '.jshintrc',
                    all : [ 'Gruntfile.js', '*.js', 'lib/*.js', 'src/*.js' ]
                },
                uglify : {
                    options : {
                        banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n',
                        mangle : false,
                        compress : true,
                        beautify : false
                    },
                    build : {
                        src : [ 'node_modules/jquery/dist/jquery.min.js',
                                'src/custom_bootstrap/js/bootstrap.min.js',
                                'src/js/*.js'],
                        dest : 'htdocs/js/<%= pkg.name %>.min.js'
                    }
                },
                cssmin : {
                    add_banner : {
                        options : {
                            banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n',
                        },
                        files : {
                            'htdocs/css/<%= pkg.name %>.min.css' : [
                                    'src/css/font-awesome-4.0.3/css/font-awesome.css',
                                    'src/css/ptp-splash-page.css',
                                    'src/css/bootstrap.min.css' ]
                        }
                    }
                },
                dusthtml: {
                    dist: {
                      src: "src/dust/splash.dust.html",
                      dest: "htdocs/splash.html",
                      options: {
                          context: [
                                    { config: '<%= config %>'},
                                    { pkg: '<%= pkg %>'},
                                    { banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n'}
                                    ]
                      }
                    }
                  },
                watch : {
                    scripts : {
                        files : [ 'src/js/*.js', 'src/dust/*.html',
                                'src/css/*.css',
                                'config/*.json' ],
                        tasks: ['uglify', 'cssmin', 'dusthtml'],
                        options : {
                            spawn : false,
                            livereload : false,
                        },
                    },
                },
            });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-dust-html");
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', [ 'uglify', 'cssmin', 'dusthtml' ]);

};