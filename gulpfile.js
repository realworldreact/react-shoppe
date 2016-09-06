var gulp = require('gulp');
var stylus = require('gulp-stylus');
var swiss = require('kouto-swiss');
var nodemon = require('nodemon');
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
    .pipe(stylus({
      use: swiss()
    }))
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
