// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
var eventstream         = require('event-stream');
var fileservice         = require('fs');
var gutil               = require('gulp-util');
var obfuscate           = require('gulp-obfuscate');
var path                = require('path');
var plumber             = require('gulp-plumber');
var rename              = require('gulp-rename');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

// Path variables
var packagesPath        = 'vendor/netmatters/';
var publicJsPath        = 'public/assets/js/';


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
 * Compile Package Javascript
 *
 * This function iterates through
 * all the package folders and concatenates,
 * minifies and generates a [package].js
 * file in the public/assets/js directory
 *
 * @return void
 */
gulp.task('compilePackageJs', function()
{
    var folders = getFolders(packagesPath);

    var streams = folders.map(function(folder)
    {
        return gulp.src([
            path.join(packagesPath, folder, '/module/*.module.js'),
            path.join(packagesPath, folder, '/module/configs/*.config.js'),
            path.join(packagesPath, folder, '/module/routes/*.route.js'),
            path.join(packagesPath, folder, '/module/services/*.service.js'),
            path.join(packagesPath, folder, '/module/directives/*.directive.js'),
            path.join(packagesPath, folder, '/module/filters/*.filter.js'),
            path.join(packagesPath, folder, '/module/controllers/*.controller.js')
        ])
            .pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init({loadMaps : true}))
            .pipe(concat(folder + '-module.js'))
            //.pipe(uglify())
            //.pipe(obfuscate())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(publicJsPath))
            .on('error', gutil.log);
    });

    return eventstream.concat.apply(null, streams);
});
