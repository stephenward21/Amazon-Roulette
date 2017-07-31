

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../config/config');
var amazon = require('amazon-product-api')


var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


var client = amazon.createClient({
 awsId: config.awsId,
 awsSecret: config.awsSecret,
 awsTag: config.awsTag

});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	var promiseArray = [];
	for (let i = 1; i <= 10; i++){
		var aPromise = new Promise((resolve, reject)=>{
			client.itemSearch({
			  	searchIndex: 'Movies',
			  	ItemPage: '10',
			  	BrowseNode: '2649512011',
			  	responseGroup: 'ItemAttributes'
		  	}).then(function(results){
				var priceArray = []
				results.map((item, index)=>{
					console.log("%%%%%%%%%%%%%%%%")
					console.log(item.ItemAttributes[0])
					// if(index==1){console.log(item)}
					if(item.ItemAttributes[0] != undefined){
						priceArray.push([
							// item.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
							item.ItemAttributes[0].Title[0]
						])
					}
				})
				resolve(priceArray)
		   	}).catch(function(err){
		   		console.log("=================")
			  	console.log(err[0].Error[0]);
			  	console.log("=================")
			  reject(err[0])
			});
		});
		promiseArray.push(aPromise)
	}

	Promise.all(promiseArray).then((data)=>{
		res.json(data)
	});
		
	    // console.log(response[0].Item[0].ASIN[0]) // products (Array of Object) 
	    // console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.)
  
});

module.exports = router;
