// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

// Path variables
var bowerPath           = 'components/';
var frontendJsPath      = 'public/assets/js/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compile Frontend Javascript Plugins
 *
 * This function is used to minify and move
 * standard js files into the public/assets/js
 * directory
 *
 * @return void
 */
gulp.task('compileFrontendPlugins', function()
{
    return gulp.src([
        //bowerPath + 'owl-carousel2/dist/owl.carousel.js',
        frontendJsPath + 'plugins/jquery-*.js',
        frontendJsPath + 'plugins/bootstrap-*.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps : true}))
        //.pipe(uglify())
        .pipe(concat('frontend-plugins.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(frontendJsPath));
});
