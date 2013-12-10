module.exports = function(grunt) {

    var cli = grunt.cli;

    cli.optlist.beautify = {
        "short": "B",
        info: "Set beautify on",
        type: String
    };

    grunt.initConfig({
        watch: {
            'toolkit': {
                files: [ 'grunt/js/**/*.js',
                         'grunt/sass/**/*.scss'
                ],
                tasks: ['compass','jshint','requirejs']
            }
        },
        clean: {
            toolkit: ['dist/images','dist/scripts','dist/stylesheets'],
            js: ['dist/scripts'],
            css: ['dist/images','dist/stylesheets'],
            fonts: ['grunt/fonts/min','dist/fonts']
        },
        jshint: {
            toolkit: ['grunt/js/modules/*.js',
                      'grunt/js/utils/*.js'],
            others: ['Gruntfile.js'],
            options: {
                "globals": {
                    document: false,
                    window: false,
                    console: false,
                    setTimeout: false,
                    clearTimeout: false,
                    setInterval: false,
                    clearInterval: false
                }
            }
        },
        compass: {
            toolkit: {
                options: {
                    config: 'grunt/sass/config.rb',
                    sassDir: 'grunt/sass/',
                    cssDir: 'dist/stylesheets/',
                    outputStyle: grunt.option('beautify') ? "expanded" : "compressed" ,
                    noLineComments: true,
                    trace: true
                }
            }
        },
        requirejs:{
            toolkit: {
                options: {
                    optimize: grunt.option('beautify') ? "none" : "uglify2",
                    preserveLicenseComments: false,
                    baseUrl: "grunt/js",
                    dir: "dist/scripts",
                    removeCombined: true,
                    generateSourceMaps: false,
                    modules:[{
                        name: 'toolkit'
                    },
                    {
                        name: 'demo'
                    }]
                }
            }
        },
        mocha: {
            all: {
                src: (function() {
                    var pattern = grunt.option('pattern') || '[A-Z]*';
                    return ['_site/test.html'];
                }()),
                options: {
                    run: false,
                    log: false // Set to true to see console.log() output on the terminal
                }
            }
        },
        webfont: {
            icons: {
                src: 'grunt/fonts/min/*.svg',
                dest: 'dist/fonts',
                destCss: 'dist/fonts',
                options: {
                    font: 'skycons',
                    template:'grunt/fonts/template/skycon-template.css',
                    htmlDemoTemplate:'grunt/fonts/template/skycon-template.html',
                    htmlDemo: true,
                    destHtml: '_includes/base-styles',
                    hashes: false,
                    embed: true
                }
            }
        },
        svgmin: {                       // Task
            options: {                  // Configuration that will be passed directly to SVGO
                plugins: [{
                    removeViewBox: false,
                    removeUselessStrokeAndFill: true,
                    removeEmptyAttrs: true
                }]
            },
            fonts: {                         // Target
                files: [{                   // Dictionary of files
                    expand: true,           // Enable dynamic expansion.
                    cwd: 'lib/font-svgs/',    // Src matches are relative to this path.
                    src: ['*.svg'],      // Actual pattern(s) to match.
                    dest: 'grunt/fonts/min/', // Destination path prefix.
                    ext: '.svg'         // Dest filepaths will have this extension.
                }]
            },
            icons: {                         // Target
                files: [{                   // Dictionary of files
                    expand: true,           // Enable dynamic expansion.
                    cwd: 'grunt/svgs/orig/',    // Src matches are relative to this path.
                    src: ['*.svg'],      // Actual pattern(s) to match.
                    dest: 'grunt/svgs/min/', // Destination path prefix.
                    ext: '.svg'         // Dest filepaths will have this extension.
                }]
            }
        },

        grunticon: {
            colourSVG: {
                options: {
                    src: "grunt/svgs/min",
                    dest: "dist/svgs/"
                }
            }
        },

        blanket_mocha: {
            all: [ 'test/jsUnit/A*Spec.html',  ],
            options: {
                threshold: 50
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-webfont'); //https://github.com/sapegin/grunt-webfont
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-blanket-mocha');

    grunt.registerTask('default', ['clean:toolkit', 'compass:toolkit', 'jshint', 'requirejs']);
    grunt.registerTask('spy', ['clean:toolkit', 'compass:toolkit', 'jshint', 'requirejs', 'watch']);
    grunt.registerTask('sloppy', ['clean:toolkit', 'compass:toolkit', 'requirejs', 'watch']);
    grunt.registerTask('css', ['clean:css', 'compass:toolkit']);
    grunt.registerTask('js', ['clean:js', 'jshint', 'requirejs']);
    grunt.registerTask('fonts', ['clean:css', 'clean:fonts', 'svgmin:fonts', 'webfont', 'compass:toolkit']);
    grunt.registerTask('svgs', ['svgmin:icons', 'grunticon']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('hint', ['jshint']);
};