'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Latest = new Schema({
	term: String,
	when: Date 
});

module.exports = mongoose.model('Latest', Latest);
