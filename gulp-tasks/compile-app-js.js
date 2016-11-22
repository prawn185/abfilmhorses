// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

// Path variables
var adminJsPath         = 'public/packages/netmatters/base/js/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compile Main Application Files
 */
gulp.task('compileAppJs', function()
{
    return gulp.src([
        adminJsPath + 'objects/App.js',
        adminJsPath + 'objects/App-*.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps : true}))
        //.pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(adminJsPath));
});