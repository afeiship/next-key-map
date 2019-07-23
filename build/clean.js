(function() {
  'use strict';

  const gulp = require('gulp');
  const config = require('./config');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  //clean
  gulp.task(
    'clean',
    gulp.parallel(function() {
      return $.del('dist');
    })
  );
})();
