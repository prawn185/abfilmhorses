// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var cache               = require('gulp-cache');
var imagemin            = require('gulp-imagemin');
var plumber             = require('gulp-plumber');

// Path variables
var frontendImgPath     = 'public/assets/images/';


/**
 * Handle Errors
 *
 * @param err
 */
var onError = function(err) {
    console.log(err);
};


/**
 * Compress Frontend Image Files
 */
gulp.task('compressFrontendImages', function()
{
    return gulp.src(frontendImgPath + '**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(plumber({errorHandler: onError}))
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest(frontendImgPath));
});