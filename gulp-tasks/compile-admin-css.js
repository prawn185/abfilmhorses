// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var autoprefixer        = require('gulp-autoprefixer');
var less                = require('gulp-less');
var minifycss           = require('gulp-minify-css');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');

// Path variables
var frontendLessPath    = 'public/assets/less/';
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
 * Compile Admin Less Files
 *
 * This function is used to concatenate, prefix,
 * minify and generate .css files into the
 * public/assets/css directory.
 *
 * @return void
 */
gulp.task('compileAdminCss', function()
{
    return gulp.src([
        frontendLessPath + 'compile/admin.less',
        frontendLessPath + 'compile/admin-*.less',
        adminLessPath + 'ie/*.less',
        adminLessPath + 'pages/*.less'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(less())
        .pipe(autoprefixer('last 10 version'))
        .pipe(minifycss())
        .pipe(gulp.dest(adminCssPath));
});