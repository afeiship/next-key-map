(function() {
  'use strict';

  const gulp = require('gulp');
  const config = require('./config');
  const pkg = require('../package.json');
  const saveLicense = require('uglify-save-license');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  require('next-nice-comments');

  const niceComments = nx.niceComments(
    [
      'name: <%= pkg.name %>',
      'url: <%= pkg.homepage %>',
      'version: <%= pkg.version %>',
      'date: ' + new Date().toISOString(),
      'license: <%= pkg.license %>'
    ],
    'js'
  );

  gulp.task(
    'scripts',
    gulp.parallel(function() {
      return gulp
        .src('src/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.header(niceComments, { pkg: pkg }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({ title: '[ default size ]:' }))
        .pipe($.ignore('*.js.map'))
        .pipe($.uglify(config.uglifyOptions))
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'))
        .pipe($.size({ title: '[ minimize size ]:' }));
    })
  );
})();
