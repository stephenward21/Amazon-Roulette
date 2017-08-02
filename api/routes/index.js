

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs')
var config = require('../config/config');
var amazon = require('amazon-product-api')
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






















