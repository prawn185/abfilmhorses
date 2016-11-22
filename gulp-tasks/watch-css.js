// Gulp plugins (Do not delete)
var gulp                = require('gulp');

// Path variables
var packagesPath        = 'vendor/netmatters/';
var frontendStylesPath  = 'public/assets/less/';
var baseStylesPath      = packagesPath + 'base/public/assets/less/';

/**
 * Watch Css Task
 *
 * @return void
 */
gulp.task('watchCss', ['compileFrontendCss', 'compileAdminCss', 'compilePackageCss'], function()
{
    gulp.watch(baseStylesPath + '**/*.less', ['compileAdminCss']);
    gulp.watch(frontendStylesPath + '**/*.less', ['compileFrontendCss']);
    gulp.watch(packagesPath + '*/styles/*.style.less', ['compilePackageCss']);
});
