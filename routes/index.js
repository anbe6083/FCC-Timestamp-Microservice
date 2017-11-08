var express = require('express');
var url = require("url");
var router = express.Router();

/*
* @param stringQuery: the String passed in the url
* 
* Description: This method checks whether or not the string passed is valid or not.
* If it is valid, the natural date is converted to unix and returns both the unix time 
* and natural time. If passed unix time, the unix time and natural time is returned as well
*
* If the string is not formatted into a date, returns a null for the unix and natural times
*/
function checkTimestamp(stringQuery) {
	if(Date.parse(stringQuery)) {
		return {	
			"unix": Math.round( new Date(stringQuery) / 1000 ),
			"natural": new Date(stringQuery)
		}
	} else {
		return {
		
		"unix":NaN,
		"natural":NaN
	
		}
	}
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var userStories = [ 'I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).',
'If it does, it returns both the Unix timestamp and the natural language form of that date.','If it does not contain a date or Unix timestamp, it returns null for those properties.']
  res.render('index', { title: 'Timestamp Microservice', author: 'Andrew Berumen'});
});

router.get('/:stringQuery', function(req, res) {
	var stringQuery = req.params.stringQuery;
	var test = {
		unix: stringQuery,
		natural: 'test123'
	}
	
	console.log(Date.parse(stringQuery));
	res.json(checkTimestamp(stringQuery));
} )
module.exports = router;
