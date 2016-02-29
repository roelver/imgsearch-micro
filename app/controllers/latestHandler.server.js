'use strict';

var Latest = require('../models/latest.js');

function LatestHandler () {

	this.getLatest = function (req, res) {
		Latest
			.find({}, {term: true, when: true, _id: false})
			.sort({when: -1})
			.limit(10)
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
}
module.exports = LatestHandler;
