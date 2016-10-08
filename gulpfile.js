process.env.DEBUG = process.env.DEBUG || 'ar:*';
require('dotenv').load();
var gulp = require('gulp');
// var gutil = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');

var swiss = require('kouto-swiss');
var nodemon = require('nodemon');
var debugFactory = require('debug');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var browserSync = require('browser-sync');

var yargs = require('yargs');

var pckg = require('./package.json');
var webpackConfig = require('./webpack.config');

var debug = debugFactory('ar:gulp');

var sync = browserSync.create('ar-sync-server');
var reload = sync.reload.bind(sync);

// user definable ports
var port = yargs.argv.port || process.env.PORT || '3001';
var syncPort = yargs.argv['sync-port'] || process.env.SYNC_PORT || '3000';
// make sure sync ui port does not interfere with proxy port
var syncUIPort = yargs.argv['sync-ui-port'] ||
  process.env.SYNC_UI_PORT ||
  parseInt(syncPort, 10) + 2;

var paths = {
  server: pckg.main,
  serverIgnore: [
    './client/**/*',
    './package.json'
  ],
  stylus: './client/index.styl',
  stylusFiles: [
    './client/**/*.styl'
  ],
  public: './public',
  syncWatch: [
    './server/views/**.jade',
    './public/main.css'
  ]
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
    ext: '.jsx .js .json',
    ignore: paths.serverIgnore,
    // exec: path.join(__dirname, 'node_modules/.bin/babel-node'),
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      DEBUG: process.env.DEBUG || 'ar:*',
      PORT: port
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
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public + '/css'))
    .pipe(reload({ stream: true }));
});

var syncDependents = [
  'serve',
  'stylus'
];

gulp.task('dev-server', syncDependents, function() {
  webpackConfig.entry.bundle = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ].concat(webpackConfig.entry.bundle);

  var bundler = webpack(webpackConfig);

  sync.init(null, {
    ui: {
      port: syncUIPort
    },
    proxy: 'http://localhost:' + port,
    logLeval: 'debug',
    files: paths.syncWatch,
    port: syncPort,
    open: false,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-only'
      }),
      webpackHotMiddleware(bundler)
    ]
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylusFiles, ['stylus']);
});

gulp.task('default', [ 'serve', 'stylus', 'dev-server', 'watch' ]);
