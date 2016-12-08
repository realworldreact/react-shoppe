'use strict';
require('dotenv').load();
require('babel-register');

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var expstate = require('express-state');

var app = loopback();

// expressState.extend(app);
app.set('state namespace', '__ar__');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(loopback.token());
app.disable('x-powered-by');
expstate.extend(app);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(
  app,
  {
    appRootDir: __dirname,
    dev: process.env.NODE_ENV
  },
  function(err) { if (err) { throw err; } }
);

module.exports = app;

// start the server if `$ node server/server.js`
if (require.main === module) {
  app.start();
}
