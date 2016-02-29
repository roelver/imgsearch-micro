'use strict';

var path = process.cwd();
var LatestHandler = require(path + '/app/controllers/latestHandler.server.js');
var SearchHandler = require(path + '/app/controllers/searchHandler.server.js');

module.exports = function (app) {

	var searchHandler = new SearchHandler();
	var latestHandler = new LatestHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/search/:term')
		.get(searchHandler.search);

	app.route('/latest')
		.get(latestHandler.getLatest);

};
