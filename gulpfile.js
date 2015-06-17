/* global process */
var runSequence = require('run-sequence');
var gulp = require('gulp');
var commander = require('commander');

var sourcemaps = require('gulp-sourcemaps');
var pkg = require('./package.json');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var util = require('gulp-util');

function compileSass(src, dest) {
    var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    return gulp.src(src)
        //.pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dest));
}

gulp.task('jshint', function () {
    var jshint = require('gulp-jshint');
    return gulp.src(['app/**/*.js', 'gulpfile.js', 'resources', '!app/vendor/**/*.js', '!app/copied-from-bower/**/*.js'])
        .pipe(jshint('resources/.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

function initPrivateTasks() {
    commander.parse(process.argv);
    gulp.task('inject-files', function () {

        var target = inject(gulp.src([
            'app/**/_*.js',
            'app/**/*.js',
            'app/**/*.css',
            '!app/vendor/**/*.css',
            '!app/vendor/**/*.js',
            '!app/**/*spec.js',
            '!app/**/*test-data.js'
        ], {read: false}), {
            relative: true
        });
        var vendor = inject(gulp.src([
            'app/vendor/**/*.css',
            'app/vendor/**/*.js'
        ], {read: false}), {
            relative: true,
            name: 'vendor'
        });
        return gulp.src('index-inject.html')
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'))
            .pipe(vendor)
            .pipe(gulp.dest('./'))
            .pipe(target)
            .pipe(gulp.dest('./'));
    });
    gulp.task('sass', function () {
        return compileSass('app/**/*.scss', 'app');
    });
    gulp.task('clean-generated', function () {
        return gulp.src(['build', 'index.html', 'app/**/*.{css,map}', 'app/maps', '!app/vendor/**/*.css', 'coverage']).pipe(clean());
    });
    gulp.task('ng-templates&app-version', function () {
        var gulpNgConfig = require('gulp-ng-config');
        gulp.src('package.json')
            .pipe(gulpNgConfig('package-json'))
            .pipe(gulp.dest('.tmp/'));

        var templateCache = require('gulp-angular-templatecache');
        return gulp.src('app/**/*.html')
            .pipe(templateCache({
                root: 'app/',
                module: pkg.name + '.templates'
            }))
            .pipe(gulp.dest('.tmp'));
    });

    gulp.task('usemin', function () {
        var usemin = require('gulp-usemin'),
            minifyHtml = require('gulp-minify-html'),
            minifyCss = require('gulp-minify-css'),
            ngAnnotate = require('gulp-ng-annotate'),
            inject = require('gulp-inject'),
            processhtml = require('gulp-processhtml'),
        //    cssBase64 = require('gulp-css-base64'),
        //    urlAdjuster = require('gulp-css-url-adjuster'),
            ver = require('gulp-ver'),
        //staticAssetsDir = 'static-assets-v' + pkg.version + '/';
            staticAssetsDir = 'css/font/';

        gulp.src('app/**/font/*.*').pipe(copy('deployment/' + staticAssetsDir, {prefix: 10}));
        gulp.src(['app/**/*-stub.json', 'app/**/*-logo.*', 'app/**/*.png']).pipe(copy('deployment/'));

        var uglify = require('gulp-uglify'),
            rename = require('gulp-rename'),
            clone = require('gulp-clone'),
            cloneJS = clone.sink(), cloneVendorJS = clone.sink(),
            cloneCSS = clone.sink(), cloneVendorCSS = clone.sink();

        var cssOpts = [
            sourcemaps.init(),
           // cssBase64({maxWeightResource: 200 * 1024}),
        //    urlAdjuster({prepend: staticAssetsDir}),
            'concat',
            cloneCSS,
            minifyCss(),
            rename({suffix: '.min'}),
            sourcemaps.write('.')
        ];
        var vendorCSSOpts = [
            sourcemaps.init(),
        //    cssBase64({maxWeightResource: 200 * 1024}),
        //    urlAdjuster({prepend: staticAssetsDir}),
            'concat',
            cloneVendorCSS,
            minifyCss(),
            rename({suffix: '.min'}),
            sourcemaps.write('.')
        ];
        var jsOpts = [
            ngAnnotate(),
            cloneJS,
            sourcemaps.init(),
            uglify(),
            rename({suffix: '.min'}),
            sourcemaps.write('.')
        ];
        var vendorJSOpts = [
            ngAnnotate(),
            cloneVendorJS,
            sourcemaps.init(),
            //uglify(),
            rename({suffix: '.min'}),
            sourcemaps.write('.')
        ];
        //js: [ngAnnotate(), uglify(), ver({prefix: 'v'})]
        if (commander.versioned === true) {
            vendorCSSOpts.push(ver({prefix: 'v'}));
            vendorJSOpts.push(ver({prefix: 'v'}));
            cssOpts.push(ver({prefix: 'v'}));
            jsOpts.push(ver({prefix: 'v'}));
        }


        return gulp.src('index.html')
            .pipe(inject(gulp.src(['.tmp/templates.js', '.tmp/package.js'], {read: false}),
                {starttag: '<!-- inject:.tmp/templates-and-app-version:js -->'}
            ))
            .pipe(usemin({
                html: [
                    processhtml({commentMarker: 'process', process: true}),
                    minifyHtml()
                ],
                css: cssOpts,
                js: jsOpts,
                vendorJS: vendorJSOpts,
                vendorCSS: vendorCSSOpts
            }))
            .pipe(cloneVendorCSS.tap())
            .pipe(cloneCSS.tap())
            .pipe(cloneVendorJS.tap())
            .pipe(cloneJS.tap())
            .pipe(gulp.dest('deployment/'));
    });

    gulp.task('server', function () {
        return require('gulp-connect').server({
            root: 'deployment',
            port: commander.eport
        });
    });
}

gulp.task('default', function () {
    commander.parse(process.argv);

    function logEvent(event) {
        console.log('[' + event.type + '] file ' + event.path);  // jshint ignore:line
    }

    gulp.task('connect', function () {
        return require('gulp-connect').server({
            port: commander.eport
        });
    });

    (function (livereload) {
        gulp.task('watch', function () {
            livereload.listen({port: commander.lrport});
            gulp.watch(['app/**/*.js', 'app/**/*.html', 'index.html'], function (event) {
                logEvent(event);
                gulp.src(event.path).pipe(livereload());
            });
            gulp.watch('app/**/*.scss', function (event) {
                var path = event.path;
                logEvent(event);
                if (event.type !== 'deleted') {
                    var folder = path.slice(0, path.lastIndexOf(/[\/\\]/.exec(path)[0]));
                    return compileSass(path, folder).pipe(livereload());
                } else {
                    path = path.replace('.scss', '.css');
                    return gulp.src(path).pipe(clean());
                }
            });
        }).on('change', livereload.changed);
    })(require('gulp-livereload'));

    gulp.task('watch-index', function () {
        gulp.watch(['app/**/*.{js,css}', 'index-inject.html'], {interval: 2000}, function (event) {
            if (event.type !== 'changed' || event.path.indexOf('index-inject.html') !== -1) {
                logEvent(event);
                runSequence('inject-files');
            }
        });
    });

    gulp.task('open', function () {
        gulp.src('index.html').pipe(require('gulp-open')('', {
            url: 'http://' + commander.hostname + ':' + commander.eport
        }));
    });

    initPrivateTasks();

    return runSequence('inject-files', ['connect', 'watch', 'watch-index', 'open']);
});

commander.option('--lrport [port number]', 'Live reload port', 35729)
    .option('--eport [port number]', 'express server port', 4000)
    .option('--hostname [host name]', 'host name', 'localhost')
    .option('--versioned', 'add version numbers to compiled .js and .css files');

gulp.task('serve', function () {
    initPrivateTasks();
    runSequence('sass', 'default');
});

// Build and run tests
gulp.task('deploy', ['build']);// , 'test']);

gulp.task('build', function () {
    initPrivateTasks();
    return runSequence(
        ['clean-generated', 'jshint'],
        ['sass', 'ng-templates&app-version'], 'inject-files', 'usemin',
        function () {
            return gulp.src('.tmp').pipe(clean());
        }
    );
});

gulp.task('host', function () {
    initPrivateTasks();
    return runSequence('clean-generated', ['sass', 'ng-templates&app-version'], 'inject-files', 'usemin', 'server', function () {
        return gulp.src('.tmp').pipe(clean());
    });
});

function runKarma(done, singleRun) {
    require('karma').server.start({
        configFile: __dirname + '/resources/karma.conf.js',
        singleRun: singleRun || false
    }, done);
}
gulp.task('test', function (done) {
    runKarma(done, true);
});

gulp.task('dev-test', runKarma);
