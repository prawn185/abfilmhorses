// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var autoprefixer        = require('gulp-autoprefixer');
var less                = require('gulp-less');
var minifycss           = require('gulp-minify-css');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');

// Path variables
var adminLessPath       = 'public/packages/netmatters/base/less/';
var adminCssPath        = 'public/packages/netmatters/base/css/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compile PDF Files
 *
 * @return void
 */
gulp.task('compilePdfCss', function()
{
    return gulp.src([
        adminLessPath + 'template/pdf.less'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer('last 10 version'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(adminCssPath));
});