// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
var plumber             = require('gulp-plumber');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

// Path variables
var bowerPath           = 'components/';
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
 * Compile Admin Javascript Plugins
 */
gulp.task('compileAdminPlugins', function()
{
    return gulp.src([
        //bowerPath + 'owl-carousel2/dist/owl.carousel.js',
        adminJsPath + 'plugins/jquery-*.js',
        adminJsPath + 'plugins/bootstrap-*.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps : true}))
        //.pipe(uglify())
        .pipe(concat('admin-plugins.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(adminJsPath));
});