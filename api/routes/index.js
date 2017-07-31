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
  client.itemSearch({
      // director: 'Quentin Tarantino', //SalesRank below is only attainable if fill this parameter
      // actor: 'Samuel L. Jackson', //SalesRank below is only attainable if fill this parameter
      searchIndex: 'Electronics',
      // audienceRating: 'R',
      // sort: '-price',
      BrowseNode: '172282',
      responseGroup: 'SearchBins'
      
    }, function(err, results, response) {
        // console.log(err)
      if (err){
        console.log(err[0].Error)

      }else {
        // res.json(response)
        // res.json(response); 
         // products (Array of Object) 
        // res.json(response); // response (Array where the first element is an Object that contains Request, Item, etc.) 
        // console.log(response[0].TotalResults[0]) //Total Results
        // console.log(response[0].Item[0].ItemAttributes[0].ProductGroup[0]) //Product Group
        // console.log(response[0].Item[0].ItemAttributes[0].ListPrice[0].FormattedPrice[0]) //PRICE is also the lowest New Price
        // console.log(response[0].Item[0].Offers[0].Offer[0].OfferListing[0].AvailabilityAttributes[0].AvailabilityType[0]) //Availability NOW
        // console.log(response[0].Item[4].SalesRank[0]) //Sales Rank, lower # the better, Can only retrieve if searching for specific products...
        client.itemSearch({
            searchIndex: 'Electronics',
            MinimumPrice: '5000',
            MaximumPrice: '20000',
            BrowseNode: '172282',
            responseGroup: 'ItemAttributes'
        }, function(err2, results2, response2){
            if (err2){
                console.log(err2[0].Error)
            }else{
                res.json(response2)
            }
        });
    }
        
    });

});

module.exports = router;
