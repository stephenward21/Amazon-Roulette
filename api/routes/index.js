

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs')
var config = require('../config/config');
// var amazon = require('amazon-product-api')
var amazon = require('amazon-affiliate-api');



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
    // client.itemSearch({
    //     searchIndex: 'Books',
    //     BrowseNode: '51546011',
    //     responseGroup: 'ItemAttributes'
    // }).then(function(results){
    //     res.json(results)
    //     console.log(results.Items.Item[0].ItemAttributes.Title)
    //     console.log(results.Items.Request.ItemSearchRequest.BrowseNode)
    // }).catch(function(err){
    //     console.log("=================")
    // });


   
    var promiseArray = [];
    for (let i = 1; i <= 10; i++){
        var aPromise = new Promise((resolve, reject)=>{
            client.itemSearch({
                searchIndex: 'Baby',
                itemPage: i,
                Availability: 'Available',
                Condition: 'All',
                // Sort: 'price',
                BrowseNode: '166736011',
                responseGroup: 'ItemAttributes'
            }).then(function(results){
                var priceArray = [];
                console.log("%%%%%%%%%%%%%%%%")
                // console.log(item.ItemAttributes[0])
                // if(index==1){console.log(item)}
                if(results.Items.Item[0] != undefined){
                    for (let i = 0; i < 10; i++){
                        priceArray.push({
                            BrowseNode: results.Items.Request.ItemSearchRequest.BrowseNode,
                            ASIN: results.Items.Item[i].ASIN,
                            Title: results.Items.Item[i].ItemAttributes.Title,
                            Price: parseInt(results.Items.Item[i].ItemAttributes.ListPrice.Amount)
                            
                        })
                    }                   
                }
                resolve(priceArray)
            }).catch(function(err){
                console.log("=================")
                console.log(err);
                console.log("=================")
              reject(err[0])
            });
        });
        promiseArray.push(aPromise)
    }

	Promise.all(promiseArray).then((data)=>{
		// res.json(data)
        for (let i = 0; i < data[0].length; i++){
            var newData = data[0].sort(function(a,b){
                return parseFloat(a.Price) - parseFloat(b.Price)
                console.log(newData)
            })
            
        }

            
        // console.log(data[0][1].Title)
        // for (let i = 0; i < data.length; i++){
        //     var newData = data[i].sort(function(a,b){
        //         return parseFloat(a.Price) - parseFloat(b.Price);
        //     })
        //     res.json(newData)
        // }
        
        
    });
        
        // for (let i = 0; i < data.length; i++){
        //     if()
        // }
        // client.cartCreate({
        //   items:[{
        //     ASIN: data[0][0].ASIN,
        //     Quantity: 1,
        //   }]
        // }).then(function(results){
        //   res.json(results);
        // }).catch(function(err){
        //   res.json(err);
        // });
        //     for (let i = 0; i < data.length; i++){
        //         var browseNode = data[0][i].BrowseNode;
        //         var asin = data[0][i].ASIN;
        //         var title = data[0][i].Title;
        //         var price = data[0][i].Price;


        //     }
        
        // data[0-9][0-9]

		
	    
  
});

router.post('/register',(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const password = bcrypt.hashSync(req.body.password);

    const checkEmail = new Promise((resolve,reject)=>{
        const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
        connection.query(checkEmailQuery,[email], (error,results)=>{
            if(error) throw error;
            if(results.length > 0){
                reject({msg: "userAlreadyExists"});
            }else{
                resolve();
            }
        })
    });
    checkEmail.then(
        ()=>{
            var insertIntoCust = "INSERT INTO customers (name, address, city, state) VALUES (?,?,?,?)";
            connection.query(insertIntoCust,[name,address,city,state], (error,results)=>{
                const newID = results.insertId;
                var insertQuery = 'INSERT INTO user (uid, email, password) VALUES (?,?,?)';
                connection.query(insertQuery, [newID, email, password], (error2, results2)=>{
                    if(error2){
                        res.json({
                            msg: error2
                        })
                    }else{
                        res.json({
                            msg: 'userInserted',
                            name: name
                        });
                    }
                });
            })
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
});

module.exports = router;
