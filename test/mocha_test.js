/**
 * New node file
 */
/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('url is hit', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('Homepage is not returning as you are not logged in', function(done){
		http.get('http://localhost:3000/redirectToHomePage', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('Logging in with username and password', function(done) {
		request.post(
			    'http://localhost:3000/checkCustLoginDetails',
			    { form: { username: 'g@gmail.com',password:'abc' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('Logging in with username and password-Fail case', function(done) {
		request.post(
			    'http://localhost:3000/checkCustLoginDetails',
			    { form: { username: 'ga@gmail.com',password:'abc' } },
			    function (error, response, body) {
			    	assert.equal(404, response.statusCode);
			    	done();
			    }
			);
	  });
	
});