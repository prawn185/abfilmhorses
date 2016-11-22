// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var cache               = require('gulp-cache');
var imagemin            = require('gulp-imagemin');
var plumber             = require('gulp-plumber');

// Path variables
var adminImgPath        = 'public/packages/netmatters/base/images/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compress Admin Image Files
 */
gulp.task('compressAdminImages', function()
{
    return gulp.src(adminImgPath + '**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(plumber({errorHandler: onError}))
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest(adminImgPath));
});