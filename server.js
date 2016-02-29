'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
// var session = require('express-session');

var app = express();
require('dotenv').load();

var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imgsearch'
mongoose.connect(mongo);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});