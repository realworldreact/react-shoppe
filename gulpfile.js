var gulp = require('gulp');
var nodemon = require('nodemon');
var debugFactory = require('debug');
var browserSync = require('browser-sync');

var pckg = require('./package.json');

var debug = debugFactory('ar:gulpfile');
var paths = {
  server: pckg.main,
  serverIgnore: [
    './common/**/*',
    './client/**/*'
  ]
};

gulp.task('serve', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    ext: '.jsx .js',
    ignore: paths.serverIgnore,
    // exec: path.join(__dirname, 'node_modules/.bin/babel-node'),
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      DEBUG: process.env.DEBUG || 'ar:*'
    }
  })
    .on('start', function() {
      if (!called) {
        called = true;
        setTimeout(function() {
          cb();
        });
      }
    })
    .on('restart', function(files) {
      if (files) { debug('Files that changes: ', files); }
    });
});

var syncDepenedents = [ 'serve' ];

gulp.task('sync', syncDepenedents, function() {
  var sync = browserSync.create();
  sync.init(null, {
    proxy: 'http://localhost:3000',
    logLeval: 'debug',
    // files: paths.syncWatch,
    port: 3001,
    open: false
  });
});

gulp.task('default', [ 'serve', 'sync' ]);
