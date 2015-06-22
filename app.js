var express = require('express');
var path = require('path');
var partials = require('express-partials');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // Guardar path en session.redir para despues de login
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});


// Modulo 9: P2P: timeout de sesión (cookie) de 2 minutos
app.use(function (req, res, next) {
    var timeout = 120000; // 2 minutes
    if (req.session.user) {
        console.log('Auto-logout. User is logged.');
        var now = Date.now();
        var currentTimeout = req.session.timeoutSesion;
        if (currentTimeout) {
            // Comprobar si ha caducado
            if (now > currentTimeout) {
                console.log('Auto-logout. Expired! Invalidating session.');
                var redir = req.session.redir || '/index';
                req.session.destroy();
                res.redirect(redir.toString());
                return;
            }
        }

        // Asignar de nuevo todo el tiempo de sesion
        var sessionTimeout = now + timeout;
        console.log('Auto-logout. Active session. Configuring new timeout: '+sessionTimeout);
        req.session.timeoutSesion = sessionTimeout;
    }
    next();
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
