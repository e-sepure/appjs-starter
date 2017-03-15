"use strict";

var gulp = require('gulp');

var plugulp = require('gulp-load-plugins')();
// var source = "./src/";
// var dest = "./assets/";
// var dest = "./app/";

gulp.task('less', function(terminated) {

    return gulp.src("assets/less/main.less")
                .pipe(plugulp.rename({
                    // suffix: ".min",
                    basename: "app"
                }))
                .pipe(plugulp.sourcemaps.init())
                .pipe(plugulp.less({
                    compress: false 
                 }))
                .pipe(plugulp.csscomb())
                .pipe(plugulp.cssbeautify({
                    indent: "    "
                }))
                .pipe(plugulp.autoprefixer())
                // .pipe(plugulp.sourcemaps.write("/"))
                .pipe(gulp.dest("assets/css"));

});

gulp.task('minify', function() {
    return gulp.src("assets/css/*.css")
                .pipe(plugulp.cleanCss())
                .pipe(plugulp.rename({
                    suffix: ".min"
                }))
                .pipe(gulp.dest("assets/css"));
});

gulp.task('compilejs', function() {
    return gulp.src([
            "./app/main.js",
            "./app/controllers/main.js",
            "./app/controllers/about.js",
        ])
        // .pipe(plugulp.uglify())
        .pipe(plugulp.concat('app.js'))
        .pipe(gulp.dest("assets/js"));
});


gulp.task('html', function() {

    return gulp.src('index.html')
                .pipe(plugulp.useref())
                .pipe(gulp.dest(dest));

    // var assets = plugulp.useref.assets;

    // return gulp.src(source + "less/main.less")
    //             .pipe(assets)
    //             .pipe(assets.restore())
    //             .pipe(plugulp.useref())
    //             .pipe(gulp.dest(dest + "css"))

}); 


gulp.task('server', ['watch'], function() {
    return gulp.src('.')
                .pipe(plugulp.plumber())
                .pipe(plugulp.serverLivereload({
                    livereload: true,
                    directoryListing: false,
                    port: 8181,
                    open: false
                }));
});


gulp.task('watch', function() {

    gulp.watch([
        source + "less/**/*.less",
        source + "js/**/*.js"
    ], ['build']);

    gulp.watch(['index.html', 'html/**/*.html']);

});

//===================== GULP TASKS WORKFLOW
// Task for "BUILD"
gulp.task('build', ['less']);

// Task for "PRODUCTION"
gulp.task( 'prod', plugulp.sequence('build', 'minify', 'compilejs') );

// Task for "DEFAULT"
gulp.task('default', ['build']);
