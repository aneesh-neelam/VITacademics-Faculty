/*
 *  VITacademics - Faculty
 *  Copyright (C) 2014  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');

var newrelic;
if (process.env.NEWRELIC_APP_NAME && process.env.NEWRELIC_LICENSE)
{
    newrelic = require('newrelic');
}

var log;
if (process.env.LOGENTRIES_TOKEN)
{
    var logentries = require('node-logentries');
    log = logentries.logger({
                                token: process.env.LOGENTRIES_TOKEN
                            });
}

var routes = require(path.join(__dirname, 'routes', 'web', 'index'));
var routes_admin = require(path.join(__dirname, 'routes', 'web', 'admin'));
var routes_test = require(path.join(__dirname, 'routes', 'web', 'test'));
var api_login = require(path.join(__dirname, 'routes', 'api', 'auth'));
var api_classes = require(path.join(__dirname, 'routes', 'api', 'classes'));

var app = express();

if (newrelic)
{
    app.locals.newrelic = newrelic;
}

var loggerLevel = process.env.LOGGER_LEVEL || 'dev';
app.use(logger(loggerLevel));

app.set('title', 'VITacademics-Faculty');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cookieSecret = process.env.COOKIE_SECRET || 'randomsecretstring';
app.use(cookieParser(cookieSecret, {signed: true}));

app.use('/', routes);
app.use('/admin', routes_admin);
app.use('/test', routes_test);
app.use('/api/auth', api_login);
app.use('/api/classes', api_classes);


// catch 404 and forward to error handler
app.use(function (req, res, next)
        {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

// error handlers
// development error handler, will print stacktrace
if (app.get('env') === 'development')
{
    app.use(function (err, req, res, next)
            {
                if (log)
                {
                    log.log('debug', {Error: err, Message: err.message});
                }
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    status: err.status,
                    stack: err.stack
                });
            });
}

// production error handler, no stacktraces leaked to user
app.use(function (err, req, res, next)
        {
            if (log)
            {
                log.log('debug', {Error: err, Message: err.message});
            }
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                status: err.status,
                stack: ''
            });
        });

module.exports = app;
