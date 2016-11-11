
exports.searchRestaurents = function(req, res){
  
	var Yelp = require('yelp');
	 
	var yelp = new Yelp({
	  consumer_key: '7vLzDnZHyYvWg_cU2Py39Q',
	  consumer_secret: 'Npv_bLKHX7akdJ-blHfB53DholA',
	  token: 'DWT-7vLiyMkWeFkp2jqk8R3OMeTgGul5',
	  token_secret: 'tArD_HGYsluoOVQuJaWK131GjFs',
	});
	resData={};
	var distance=req.body.distance;
	var cuisine=req.body.cuisine;
	var location=req.body.location;
	console.log("-------1111111------");
	console.log(distance);
		/*term: cuisine, location : location, radius_filter: "4000", limit: '10' */
		/*Yelp search*/
	console.log(cuisine);
	yelp.search({ term: cuisine, location : location, radius_filter: '4000', limit: '20' })
	.then(function (data) {
		resData=data;
	  console.log(JSON.stringify(data));
	  var jsonParse1=JSON.parse(JSON.stringify(data));
	  console.log("-------------------");
	  console.log(jsonParse1.businesses[0].name+"  "+jsonParse1.businesses[0].rating);
	  res.render('Customer/searchResults',{obj: jsonParse1});
	});
};