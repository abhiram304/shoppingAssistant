var accountSid = 'ACf45a3674f16f51148900132024c460a3'; 
var authToken = '8446627e5a4b458facedb6d8b38620a1'; 
var mysql = require('../mysql');
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var imageToTextDecoder = require('image-to-text');
var fileUpload = require('express-fileupload');
var fs = require('fs');


/*GET ADD BILL PAGE*/
exports.addBill = function(req, res){
	if (req.session.username) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var json_responses = {
			"user" : req.session.username,
		};
	var restaurentChoice=req.param("restaurentChoice");
	res.render('Customer/addBill',{"abc":restaurentChoice });
	}
	else{
		res.render('Customer/customerLogin',{"status":1});
	}
};



exports.postBillDetails = function(req, res){
	 
	
	
	
	
	 
	/* var key = 'anXOalkh6YW3rWy-FAoOZw'; //Your key registered from cloudsightapi @ https://cloudsightapi.com 
	 imageToTextDecoder.setAuth(key);
	 imageToTextDecoder.getKeywordsForImage(file).then(function(keywords){
	    console.log(keywords);
	 },function(error){
	    console.log(error);
	 });
	*/
	
	
	
	var points=0;
	var billNum=req.param("billNum");
	var totalCost=req.param("totalCost");
	var restaurentChoice=req.param("restaurentChoice");
	restaurentChoice = restaurentChoice.replace('\'','');
	console.log("Taken from sessioncustomerID: "+req.session.customerId);
	var insertIntoQuery = "insert into billing  (bill_no, cust_id, vendor_name, cost) values ('"+billNum+"', '"+req.session.customerId+"', '"+restaurentChoice+"', '"+totalCost+"')";
	if(totalCost<=5){
		points=100;
	}
	if(totalCost>5&& totalCost<=15){
		points=200;
	}
	if(totalCost>15 && totalCost<=30){
		points=300;
	}
	if(totalCost>30&& totalCost<=60){
		points=400;
	}
	if(totalCost>60 && totalCost<=100){
		points=500;
	}
	if(totalCost>100){
		points=1000;
	}
	console.log("The current users userid: "+req.session.customerId);
	var getPointsQuery="SELECT points from points where id='"+req.session.customerId+"'";
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					console.log("Get points query..");
					var jsonString1= JSON.stringify(results);
					var passParsed= JSON.parse(jsonString1);
					points=points+passParsed[0].points;
					var updatePointsQuery="UPDATE points SET points='"+points+"' WHERE id='"+req.session.customerId+"'";
					console.log("Getting the users existing points...: "+jsonString1);
					mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
						} else {
							console.log("Updating the existing points with new points...:"+points);
							/*client.messages.create({
							to: "+15102039956", 
							from: "+16692316114",
							body: "From RestoAssist: Hello,"+points+" points are added to your account",  
						}, function(err, message) { 
							console.log(message); 
						}); */
							res.render('Customer/myPoints');
						}
					}, updatePointsQuery);
				}
			}, getPointsQuery);
		}
	}, insertIntoQuery);
	
};