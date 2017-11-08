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
	if(Date.parse( stringQuery )) return getTimestamp(stringQuery);
	else if(  Date.parse ( new Date( stringQuery * 1000 ) ) ) {
		
		return getNaturalDate(stringQuery);
	} else {
		return {
		
		"unix":NaN,
		"natural":NaN
	
		}
	}
}

function getTimestamp( date ) {
	var date = new Date(date);
	return {	
			"unix": Math.round( date / 1000 ),
			"natural": formatDate(date.getMonth() + 1, date.getDate(), date.getFullYear())
		}
}

function getNaturalDate( unixTimestamp ) {
	var date = new Date(unixTimestamp * 1000);
	
	return {	
			"unix": unixTimestamp,
			"natural": formatDate((date.getMonth() + 1), date.getDate(), date.getFullYear())
		}
}

function formatDate(month, day, year  ) {
	return month +"/" + day +"/" +year;
}
/* GET home page. */
router.get('/', function(req, res, next) {
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
