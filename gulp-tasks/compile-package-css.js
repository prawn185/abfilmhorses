// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var autoprefixer        = require('gulp-autoprefixer');
var eventstream         = require('event-stream');
var fileservice         = require('fs');
var gutil               = require('gulp-util');
var less                = require('gulp-less');
var minifycss           = require('gulp-minify-css');
var path                = require('path');
var plumber             = require('gulp-plumber');
var rename              = require('gulp-rename');
var sourcemaps          = require('gulp-sourcemaps');

// Path variables
var packagesPath        = 'vendor/netmatters/';
var publicCssPath       = 'public/assets/css/';


/**
 * Get folders function
 *
 * @param dir
 * @returns {*}
 */
function getFolders(dir)
{
    return fileservice.readdirSync(dir)
        .filter(function (file) {
            return fileservice.statSync(path.join(dir, file)).isDirectory();
        });
}

/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compile Package Css
 *
 * This function iterates through
 * all the package folders and concatenates,
 * minifies and generates a [package].css
 * file in the public/assets/css directory
 *
 * @return void
 */
gulp.task('compilePackageCss', function()
{
    var folders = getFolders(packagesPath);

    var streams = folders.map(function(folder)
    {
        return gulp.src([
            path.join(packagesPath, folder, '/styles/*.style.less')
        ])
            .pipe(plumber({errorHandler: onError}))
            .pipe(less())
            .pipe(autoprefixer('last 10 version'))
            .pipe(minifycss())
            .pipe(rename(folder + '-module.css'))
            .pipe(gulp.dest(publicCssPath))
            .on('error', gutil.log);
    });

    return eventstream.concat.apply(null, streams);
});
