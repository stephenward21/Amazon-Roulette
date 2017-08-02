

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs')
var config = require('../config/config');

// var amazon = require('amazon-product-api')
var amazon = require('amazon-affiliate-api');


var randToken = require('rand-token');



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
                searchIndex: 'Electronics',
                itemPage: i,
                Availability: 'Available',
                Condition: 'All',
                // Sort: 'price',
                BrowseNode: '172546',
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
		res.json(data)
        // console.log(data[0].length)

    //     var randNumb = Math.floor(Math.random()*10);
    //     var randNumb2 = Math.floor(Math.random()*10);
    //     // console.log(randNumb)
    //     // console.log(randNumb2)
    //     var productArray = [];
    //     productArray.push({
    //         ASIN: data[randNumb][randNumb2].ASIN,
    //         Price: data[randNumb][randNumb2].Price
    //     })
    //     console.log(productArray[0])
    //     // var minPrice = 
    //     // var maxPrice = 
    //     if (productArray[0].Price > 1990 && productArray[0].Price < 6000){
    //         client.cartCreate({
    //           items:[{
    //             ASIN: productArray[0].ASIN,
    //             Quantity: 1,
    //           }]
    //         }).then(function(results){
    //           res.json(results);
    //         }).catch(function(err){
    //           res.json(err);
    //         });
    //     }else{
    //         console.log("Price out of range!")
    //     }

            
    //     console.log(data[0][1].Title)
    //     for (let i = 0; i < data.length; i++){
    //         var newData = data[i].sort(function(a,b){
    //             return parseFloat(a.Price) - parseFloat(b.Price);
    //         })
    //         res.json(newData)
    //     }
        
        
    });
        

		
	    
  
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
                var token = randToken.uid(40);
                var insertQuery = 'INSERT INTO user (uid, email, password, token) VALUES (?,?,?,?)';
                connection.query(insertQuery, [newID, email, password, token], (error2, results2)=>{
                    if(error2){
                        res.json({
                            msg: error2
                        })
                    }else{
                        res.json({
                            msg: 'userInserted',
                            name: name,
                            token: token
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

router.post('/', (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var checkLoginQuery = 'SELECT * FROM user WHERE email = ?';
    connection.query(checkLoginQuery, [email], (error,results)=>{
        if(error) throw error;
        if(results.length === 0){
            res.json({
                msg: 'badUserName'
            });
        }else{
            var checkHash = bcrypt.compareSync(password, results[0].password);
            if(checkHash){
                const updateToken = 'UPDATE user SET token=?, WHERE email=?'
                var token = randToken.uid(40);
                connection.query(updateToken,[token,email],(error2,results2)=>{
                    console.log(results);
                    res.json({
                        msg: 'loginSuccess',
                        name: results[0].customerName,
                        token: token
                    })
                })
            }else{
                res.joson({
                    msg: 'wrongPassword'
                })
            }
        }
    })
});

module.exports = router;






















