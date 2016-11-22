// Gulp plugins (Do not delete)
var gulp                = require('gulp');

// Path variables
var packagesPath        = 'vendor/netmatters/';


/**
 * Watch Images
 *
 * @return void
 */
gulp.task('watchImages', function()
{
    gulp.watch(packagesPath + '*/images/*.{png,jpg,jpeg,gif,svg}', ['compilePackageImages']);
});
