// Gulp plugins (Do not delete)
var gulp                = require('gulp');

// Path variables
var packagesPath        = 'vendor/netmatters/';

/**
 * Watch Js Task
 *
 * @return void
 */
gulp.task('watchJs', ['compilePackageJs'], function()
{
    gulp.watch(packagesPath + '*/module/*.js', ['compilePackageJs']);
});
