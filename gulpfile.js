"use strict";

/**
 * DO THIS FIRST !!
 *
 * In order to use Gulp in your product please ensure the following:
 *
 * 1) Make sure you have a package.json
 * 2) Run command npm install gulp -g
 * 3) Run command bower install -g
 * 4) Run command npm update
 * 5) Run command gulp
 * 6) Run command watch
 */


// Gulp plugins (Do not delete)
var gulp                = require('gulp');
var requireDir          = require('require-dir');


// Include the individual gulp tasks
requireDir('./gulp-tasks');


/**
 * Watch Task
 *
 * @return void
 */
gulp.task('watch', ['watchCss', 'watchJs', 'watchImages']);


/**
 * Default Task (Constructor)
 *
 * @return void
 */
gulp.task('default', [
    'compileFrontendCss',
    'compileAdminCss',
    'deployJsFiles',
    'compileFrontendPlugins',
    'compileAdminPlugins',
    'compileAngularPlugins',
    'compileAppJs',
    'compilePackageJs'
]);