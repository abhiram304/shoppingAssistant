var mysql = require('../mysql');
var passwordHash = require('password-hash');

/*GET CUSTOMER SIGNUP PAGE*/
exports.getCustSignUpPage = function(req, res){
  
	res.render('Customer/customerSignup');
};


/*POST CUSTOMER DETAILS*/
exports.postSignUpDetails = function(req, res){  
	var fname = req.body.FirstName;
	var details = {
		fname : req.body.firstName,
		lname : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		phone : req.body.phone
	};
	var detailsS = JSON.stringify(details);
	var detailsP = JSON.parse(detailsS);
	var checkEmailExistsQuery = "SELECT cust_email FROM customer WHERE cust_email='"
			+ detailsP.email+"'";
	console.log("Check if email already exists query: "+checkEmailExistsQuery);
	var hashedPass=passwordHash.generate(detailsP.password);
	console.log("hashed password: "+hashedPass);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				console.log("EMAIL: "+detailsP.email+"ALREADY TAKEN");
				checkTHflag = false;
				title="Email/thandle already taken";
				res.render('customerSignup', { errmsg: 'This email already taken', emailAlreadyExists: 1});
			} else {
				console.log("EMAIL: "+detailsP.email+"NOT TAKEN");
				var insertDetailsQuery = "INSERT INTO customer (cust_fname, cust_lname, cust_email, cust_phn, cust_pass) VALUES('" + detailsP.fname
				+ "', '" + detailsP.lname + "', '" + detailsP.email
				+ "', '" + detailsP.phone + "', '" + hashedPass + "')";
				console.log("Insert Details into DB query: "+insertDetailsQuery);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						res.redirect('/redirectToHomePage');
					}
				}, insertDetailsQuery);
			
			}
		}
	}, checkEmailExistsQuery);
};