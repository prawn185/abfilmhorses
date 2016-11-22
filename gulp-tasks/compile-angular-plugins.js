// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
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
 * Compile Angular Plugins
 *
 * This function is used to concatenate,
 * minify and generate .js files into the
 * public/assets/js directory.
 *
 * @return void
 */
gulp.task('compileAngularPlugins', function()
{
    return gulp.src([
        bowerPath + 'angular-animate/angular-animate.js',
        bowerPath + 'angular-cookies/angular-cookies.js',
        bowerPath + 'angular-sanitize/angular-sanitize.js',
        bowerPath + 'angular-touch/angular-touch.js',
        bowerPath + 'angular-datetimepicker/datetimepicker.js',
        bowerPath + 'angular-redactor/angular-redactor.js',

        bowerPath + 'angular-bootstrap/ui-bootstrap.js',
        bowerPath + 'angular-bootstrap/ui-bootstrap-tpls.js',

        bowerPath + 'angular-ui-sortable/sortable.js',
        bowerPath + 'angular-ui-select/dist/select.js',
        bowerPath + 'angular-ui-grid/ui-grid.js',
        bowerPath + 'angular-ui-router/release/angular-ui-router.js',
        bowerPath + 'angular-ui-utils/ui-utils.js',

        bowerPath + 'ngstorage/ngStorage.js',
        bowerPath + 'lodash/lodash.js',
        bowerPath + 'restangular/dist/restangular.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps : true}))
        .pipe(concat('angular-plugins.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(publicJsPath));
});