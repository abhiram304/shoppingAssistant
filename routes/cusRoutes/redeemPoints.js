var accountSid = 'ACf45a3674f16f51148900132024c460a3'; 
var authToken = '8446627e5a4b458facedb6d8b38620a1'; 
var generateID = require("unique-id-generator");
var shortid = require('shortid');
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 


var mysql = require('../mysql');
exports.getMyPoints = function(req, res){
	if (req.session.username) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var json_responses = {
			"user" : req.session.username,
		};
		
	
		var getPointsQuery="SELECT points from points where id='"+req.session.customerId+"'";
		
		
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var jsonString1= JSON.stringify(results);
				var passParsed= JSON.parse(jsonString1);
				console.log("In my points controller and the customer's points are :"+passParsed[0].points);
				res.render('Customer/myPoints', {"myPoints":passParsed[0].points});
			}
		}, getPointsQuery);
	}
	
	else{
		res.render('Customer/customerLogin',{"status":1});
	}
	
};



exports.redeemMyPoints = function(req, res){
	if (req.session.username) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var json_responses = {
			"user" : req.session.username,
		};
		
	
		
		var updatePointsQuery="UPDATE points SET points=0 WHERE id='"+req.session.customerId+"'";
		
		var id = generateID({
			prefix : "id-"
		});
		console.log("unique id " + id);

		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var jsonString1= JSON.stringify(results);
				var passParsed= JSON.parse(jsonString1);
				console.log("In my points controller after redeem and the customer's points are :"+0);
				client.messages.create({
					to: "+15102039956", 
					from: "+16692316114",
					body: "From RestoAssist: Hello, you have reedemed all your points. This is your coupon code: "+shortid.generate(),  
				}, function(err, message) { 
					console.log(message); 
				}); 
				res.render('Customer/myPoints', {"myPoints":0});
			}
		}, updatePointsQuery);
	}
	
	else{
		res.render('Customer/customerLogin',{"status":1});
	}
	
};