var gulp = require('gulp');
// var gutil = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var swiss = require('kouto-swiss');
var nodemon = require('nodemon');
var sourcemaps = require('gulp-sourcemaps');
var debugFactory = require('debug');
var browserSync = require('browser-sync');

var pckg = require('./package.json');

var debug = debugFactory('ar:gulpfile');
var sync = browserSync.create('ar-sync-server');
var reload = sync.reload.bind(sync);
var paths = {
  server: pckg.main,
  serverIgnore: [
    './common/**/*',
    './client/**/*'
  ],
  stylus: [
    './client/**/*.styl',
    '.common/**/*.styl'
  ],
  public: './public'
};

function errorHandler() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

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

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: swiss()
    }))
    .pipe(sourcemaps.write({ sourceRoot: '/stylus' }))
    .pipe(gulp.dest(paths.public))
    .pipe(reload({ stream: true }));
});

var syncDependents = [
  'serve',
  'stylus'
];

gulp.task('sync', syncDependents, function() {
  sync.init(null, {
    proxy: 'http://localhost:3000',
    logLeval: 'debug',
    // files: paths.syncWatch,
    port: 3001,
    open: false
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
});

gulp.task('default', [ 'serve', 'stylus', 'sync', 'watch' ]);
