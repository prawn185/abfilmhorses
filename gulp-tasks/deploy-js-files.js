// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

// Path variables
var bowerPath           = 'components/';
var publicJsPath        = 'public/assets/js/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Deploy Base Javascript Files
 *
 * This function is used to minify and move
 * standard js files into the public/assets/js
 * directory
 *
 * @return void
 */
gulp.task('deployJsFiles', function()
{
    return gulp.src([
        bowerPath + 'modernizr/modernizr.js',
        bowerPath + 'jquery/dist/jquery.js',
        bowerPath + 'jquery-ui/jquery-ui.js',
        bowerPath + 'angular/angular.js',
        bowerPath + 'fastclick/lib/fastclick.js',
        bowerPath + 'bootstrap/dist/js/bootstrap.js',
        bowerPath + 'moment/moment.js',
        bowerPath + 'underscore/underscore.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps : true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(publicJsPath));
});