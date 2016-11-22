// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var concat              = require('gulp-concat');
var cache               = require('gulp-cache');
var eventstream         = require('event-stream');
var fileservice         = require('fs');
var gutil               = require('gulp-util');
var imagemin            = require('gulp-imagemin');
var path                = require('path');
var plumber             = require('gulp-plumber');

// Path variables
var packagesPath      = 'vendor/netmatters/';
var publicImgPath       = 'public/assets/images/';


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
 * Compress Package Images
 *
 * This function iterates through
 * all the package folders and compresses the
 * images and moves them into the
 * public/assets/images directory
 *
 * @return void
 */
gulp.task('compressPackageImages', function()
{
    var folders = getFolders(packagesPath);

    var streams = folders.map(function(folder)
    {
        return gulp.src([
            path.join(packagesPath, folder, '/images/*.{png,jpg,jpeg,gif,svg}')
        ])
            .pipe(plumber({errorHandler: onError}))
            .pipe(cache(imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            })))
            .pipe(gulp.dest(publicImgPath))
            .on('error', gutil.log);
    });

    return eventstream.concat.apply(null, streams);
});
