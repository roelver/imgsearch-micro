'use strict';

var https = require('https');
var Latest = require('../models/latest.js');

var googleCseURL="https://www.googleapis.com/customsearch/v1?";

// https://www.googleapis.com/customsearch/v1?q=kitten&fileType=jpg&key=AIzaSyAIuL64jP34fZ3ncYGq9rFeXo77Ezbzsoo&cx=016730391293538775067:nebsqphkqba
// https://www.googleapis.com/customsearch/v1?q=kitten&fileType=jpg&key=AIzaSyAIuL64jP34fZ3ncYGq9rFeXo77Ezbzsoo&cx=016730391293538775067:nebsqphkqba&start=11

function SearchHandler () {

	this.search = function(req, res, next) {

	  var searchTerm = req.params.term;
	  var offset = req.query.offset || 1;

	  var apiUrl = googleCseURL + 
	  	            'key=' + process.env.GOOGLE_API_KEY +
	  	            '&cx=' + process.env.GOOGLE_CX +
	  	            '&searchType=image&fileType=jpg,png'+ 
	  	            '&q=' + searchTerm +
	  	            '&start=' + offset;

	  storeLatest(searchTerm);

	  https.get( apiUrl, function(data){
	        var googleResponse='';
	        data.on("data", function(chunk) {
	          googleResponse += chunk;
	        });
	        data.on("end", function() {

	        	 var data = JSON.parse(googleResponse);
	        	 var resp = [];
	        	 if (data && data.items) {
		        	 for (var i=0;i< data.items.length; i++) {
		        	 	var hit = {};
		        	 	hit['url'] = data.items[i].link;
		        	 	hit['snippet'] = data.items[i].htmlSnippet;
		        	 	hit['thumbnail'] = data.items[i].image.thumbnailLink;
		        	 	hit['context'] = data.items[i].image.contextLink;
		        	 	resp.push(hit);
		        	 }
	        	 }
	          return res.json(resp);
	        });
	     }).on('error', function(e) {
	         console.log("Got error: " + e.message);
	     });
   };

	var storeLatest = function (term) {
		var record = new Latest({ term: term, when: new Date() });
		record.save(function (err, result) {
			   if (err) { throw err; }
		});
	};

}

module.exports = SearchHandler;
