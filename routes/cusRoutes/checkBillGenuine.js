var imageToTextDecoder = require('image-to-text');

exports.checkBillGenuine = function(req, res){
	if (req.session.username) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var json_responses = {
			"user" : req.session.username,
		};
		 var restaurentUrl=req.param("restaurentURL");
		 var restaurentChoice=req.param("restaurentChoice");
		  var url = 'http://www.imdb.com/title/tt1229340/';

		    request(url, function(error, response, html){
		       console.log("Inside, response: "+html);
		    	if(!error){
		    		console.log("Very inside");
		            var $ = cheerio.load(html.toString());
		            var title, release, rating;
		            var json = { title : "", release : "", rating : ""};
		            // We'll use the unique header class as a starting point.
		            
		            
		            $('.summary_text').filter(function(){
		            	console.log("Inside header filtering");
		           // Let's store the data we filter into a variable so we can easily see what's going on.
		                var data = $(this);

		           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
		           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

		               // title = data.children().first().text();
		                data=data.text();
		           // Once we have our title, we'll store it to the our json object.

		                //json.title = title
		                console.log("Movie title: "+restaurentChoice);
		                
		                res.render('Customer/addBill',{"abc":restaurentChoice, "text": data});
		            })
		        }
		        else{
		        	console.log("Error while extracting");
		        }
		    })
		
	
	}
	else{
		res.render('Customer/customerLogin',{"status":1});
	}
};