module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/contact.html': 'src/contact.html'
                }
            },
            dev: {
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/contact.html': 'src/contact.html'
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: '**/*.scss',
                    dest: 'src/scss',
                    ext: '.css'
                }],
                options: {
                    style: 'expanded'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'dist/js/script.js'
            },
            css: {
                src: [
                    'src/scss/*.css'
                ],
                dest: 'src/css/style.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/script.min.js': 'dist/js/script.js'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,gif,jpg}'],
                    dest: 'dist/img'
                }]
            }
        },
        watch: {
            livereload: {
                options: {livereload: true},
                files: ['dist/**/*']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['htmlmin']
            },
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass', 'concat', 'cssmin']
            },
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['concat', 'uglify']
            },
            images: {
                files: 'scr/img/**/*.{png,gif,jpg}',
                tasks: ['imagemin']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'dist',
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    livereload: true,
                    open: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/fonts/',
                src: '**',
                dest: 'dist/fonts/'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['htmlmin', 'sass', 'concat', 'cssmin', 'uglify', 'imagemin', 'copy', 'connect', 'watch']);
};