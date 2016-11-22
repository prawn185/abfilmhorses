// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var autoprefixer        = require('gulp-autoprefixer');
var less                = require('gulp-less');
var minifycss           = require('gulp-minify-css');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');

// Path variables
var frontendLessPath    = 'public/assets/less/';
var frontendCssPath     = 'public/assets/css/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compile Frontend Less Files
 *
 * This function is used to concatenate, prefix,
 * minify and generate .css files into the
 * public/assets/css directory.
 *
 * @return void
 */
gulp.task('compileFrontendCss', function()
{
    return gulp.src([
        frontendLessPath + 'compile/frontend.less',
        frontendLessPath + 'compile/frontend-*.less',
        frontendLessPath + 'ie/*.less',
        frontendLessPath + 'pages/*.less'
    ])
        .pipe(less())
        .pipe(autoprefixer('last 10 version'))
        .pipe(minifycss())
        .pipe(gulp.dest(frontendCssPath));
});