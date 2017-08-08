

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs')
var config = require('../config/config');

// var amazon = require('amazon-product-api')
var amazon = require('amazon-affiliate-api');


var randToken = require('rand-token');

var stripe = require('stripe')(config.stripeKey);



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

// ######################################################
// ######################################################
//  API REQUESTS
// ######################################################
// ######################################################

router.get('/', function(req, res, next) {
//     // if (userInput == eventKey1 && category == null){
//     var categories = ["Books", "Music", "Tools", "Toys", "Baby", "Electronics", "VideoGames", "Beauty"]
//     var pickedCat = categories[Math.floor(Math.random() * 8)]
//     //or whatever the Category dropdown value ==
//     // console.log(pickedCat)
//     const money = `SELECT * FROM ${pickedCat} WHERE Price BETWEEN 0000 AND 1500 `;
//     connection.query(money, (error, results) => {
//         // res.json(results)
//         // console.log(results.length)
//         var randomRes = results[Math.floor(Math.random() * results.length)];
//         // console.log(randomAsin.ASIN)
//         var randomAsin = randomRes.ASIN
//         client.cartCreate({
//             items: [{
//                 ASIN: randomAsin,
//                 Quantity: 1,
//             }]
//         }).then(function (results) {
//             res.json(results);
//         }).catch(function (err) {
//             res.json(err);
//         });
//     })
});

//Item Finder
router.get('/categoryFinder',function(req,res,next){
    var category = req.query.category;
    var price = req.query.price;
    console.log(price)
    const money =  `SELECT * FROM ${category} WHERE Price BETWEEN ${price}`;
        connection.query(money, (error,results)=>{
            console.log(results)
            var randomRes = results[Math.floor(Math.random()*results.length)];
            console.log(randomRes)
            var randomAsin = randomRes.ASIN
            client.cartCreate({
              items:[{
                ASIN: randomAsin,
                Quantity: 1,
              }]
            }).then(function(results){
                console.log('========================');
                console.log(results);
                console.log('========================');
              res.json(results);
            }).catch(function(err){
              res.json(err);
            });
        });
});


    // }
//
//     var categories = {
//         Books:['51546011', '16266351', '16266361', '16266381', '16266391', '16266401', '16266411', '16266421', '16266431', '16266441', '16266461', '16266471', '16266481', '16266491', '16266501', '16266511', '16266521', '16266531', '16266551', '16266541', '16266561'],
//         Music: ['465672', '4650230011', '468040', '359372011', '714574', '13650871', '301756', '116860011', '30', '31', '265640', '173425', '173429', '67204', '85', '16', '7', '32', '2231705011', '67207', '34', '35', '36', '37', '39', '40', '42', '33', '289122', '302125', '602072', '602074', '468304', '5196', '468300', '602076', '468308', '13463651', '5234', '5238', '470998', '5240', '301405011', '299603011', '13463691', '225371', '300067011', '5255', '510676', '67178', '510678', '513060', '162409011', '2231704011', '468418', '2231701011', '67220', '67222', '408256', '5260', '36712', '84', '63654', '63681', '63690', '63700', '63699', '63701', '2231706011', '67208', '468414', '468416', '63893', '63894', '63930', '500060', '63897', '63927', '598152', '500060', '554380011', '301415011', '554373011', '554375011', '67180', '67183', '67185', '470506'],
//         Tools: ['13397451', '251266011', '328182011', '511228'],
//         Toys: ['236509011', '1273021011', '2237944011', '2309681011', '276201011', '723486011', '2899443011', '293107011', '236510011', '347076011', '268626011', '276221011', '333907011'],
//         Baby: ['165797011', '166736011', '166835011', '166764011', '166777011', '166828011', '239226011', '695338011', '166804011', '166863011'],
//         Electronics: ['172532', '3224438011', '11042251', '172546', '172540', '2252931011', '173243', '172664', '3224462011', '173541', '172526'],
//         VideoGames: ['229647', '229575', '6427814011', '14220161', '6469269011'],
//         Beauty: ['51570011', '11055981', '11055991', '11062741', '11059581', '11058281', '11060451']
//     }
//
//     var theTimer = 0
//     var runAmazonRun = [];
//     for (let cat in categories) {
//         // console.log(categories[cat]);
//         // console.log("==========================")
//         categories[cat].map((tempBrowseNode,i)=>{
//             theTimer++
//             runAmazonRun.push(cat, tempBrowseNode)
//             setTimeout(()=>{
//                 console.log(i,"--",cat,"====",tempBrowseNode);
//                 console.log("==========================")
//                 runItemSearch(cat, tempBrowseNode);
//             }, 10000*theTimer)
//         })
//     }
//     res.send("I'm working STephen. Check the console... nothing to see here.");
// });
//
//
// // ==================ROUTE DONE==================
//
// function runItemSearch(cat, tempBrowseNode){
//     console.log(`running another search for ${cat}/${tempBrowseNode}...`);
//     var promiseArray = [];
//     for (let i = 1; i <= 10; i++){
//         var aPromise = new Promise((resolve, reject)=>{
//             client.itemSearch({
//                 searchIndex: cat,
//                 itemPage: i,
//                 Availability: 'Available',
//                 Condition: 'All',
//                 // Sort: 'price',
//                 BrowseNode: tempBrowseNode,
//                 responseGroup: 'ItemAttributes'
//             }).then(function(results){
//                 var priceArray = [];
//                 // console.log("%%%%%%%%%%%%%%%%")
//                 // console.log(item.ItemAttributes[0])
//                 // if(i>5){console.log(results.Items.Item[0])}
//                 // console.log(results)
//                 if(results.Items.Item[0] != undefined){
//                     for (let i = 0; i < 10; i++){
//                         // console.log(results.Items.Item[i].ItemAttributes.ListPrice)
//                         if(results.Items.Item[i].ItemAttributes.ListPrice != undefined){
//                             priceArray.push({
//                                 BrowseNode: results.Items.Request.ItemSearchRequest.BrowseNode,
//                                 ASIN: results.Items.Item[i].ASIN,
//                                 Title: results.Items.Item[i].ItemAttributes.Title,
//                                 Price: parseInt(results.Items.Item[i].ItemAttributes.ListPrice.Amount)
//
//                             })
//                         }
//                     }
//                 }else{
//                     console.log(".....Item is undefined.....")
//                 }
//                 resolve(priceArray)
//             }).catch(function(err){
//                 console.log("=================")
//                 console.log(err);
//                 console.log("=================")
//               reject(err[0])
//             });
//         });
//         promiseArray.push(aPromise)
//     }
//
//     Promise.all(promiseArray).then((data)=>{
//         // res.json(data)
//         const insertProduct = `INSERT INTO ${cat} (BrowseNode, ASIN, Title, Price) VALUES (?, ?, ?, ?)`
//         for (let x = 0; x < 10; x++){
//             if(data[x].length > 0){
//                 for (let y = 0; y < data[x].length; y++){
//                     // console.log(x,'---',y)
//                     // console.log(data[x])
//                     connection.query(insertProduct, [data[x][y].BrowseNode, data[x][y].ASIN, data[x][y].Title, data[x][y].Price], (error,results)=>{
//                         // console.log("=======")
//                         // console.log(results)
//                         if(error){
//                             console.log(error)
//                         }
//                     })
//                 }
//             }
//         }
    

// ######################################################
// ######################################################
// END OF REQUESTS
// ######################################################
// ######################################################




//Register
router.post('/register',(req,res)=>{
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
                var token = randToken.uid(40);
                var insertQuery = 'INSERT INTO user (email, password, token) VALUES (?,?,?)';
                connection.query(insertQuery, [email, password, token], (error2, results2)=>{
                     console.log(results2)
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

//Login
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
                const updateToken = 'UPDATE user SET token=? WHERE email=?'
                var token = randToken.uid(40);
                connection.query(updateToken,[token,email],(error2,results2)=>{
                    console.log(results2, token);
                    res.json({
                        msg: 'loginSuccess',
                        name: results[0].customerName,
                        token: token
                    })
                })
            }else{
                res.json({
                    msg: 'wrongPassword'
                })
            }
        }
    })
});

//Group Register
router.post('/groups',(req,res)=> {
    console.log(req.body);
    const token = req.body.token;
    console.log(req.body.token)
    const groupName = req.body.groupName;
    console.log(groupName);
    const groupPassword = bcrypt.hashSync(req.body.groupPassword);

    // const checkName = new Promise((resolve, reject) => {
    //     const checkNameQuery = 'SELECT * FROM user WHERE groupName = ?';
    //     connection.query(checkNameQuery, [groupName], (error, results) => {
    //         console.log(results)
    //         if (error != null) {
    //             reject(error)
    //         }else if (results.length == 0) {
    //             reject({msg: "noSuchGroup"});
    //         } else {
    //             resolve(results);
    //         }
    //     })
    // });
    // checkName.then(
            var insertQuery = 'UPDATE user SET groupName = ?, groupPassword = ? WHERE token = ?';
            connection.query(insertQuery, [groupName, groupPassword, token], (error, results) => {
                // console.log(results);
                    // const newID = results.insertId;
                    // var insertGroupQuery = 'INSERT INTO groups (groupID) VALUES (?)';
                    // connection.query(insertGroupQuery, [newID], (error2, results2) => {

                        if (error) {
                            res.json({
                                msg: error
                            })
                        } else {
                            res.json({
                                msg: 'groupJoined',
                                groupName: groupName
                            })
                        }

                }
            )

});

//Stripe
// router.post('/stripe',(req,res)=>{
//     var userToken = req.body.userToken;
//     var stripeToken = req.body.stripeToken;
//     var amount = req.body.amount;
//     stripe.cahrges.create({
//         amount: parseInt(amount),
//         currency: 'usd',
//         source: stripeToken,
//         description: "Charge for Amazon Roulette"
//     },(error,charge)=>{
//         if(error){
//             res.json({
//                 msg: error
//             })
//         }else{
//
//         }
//     })
// });


module.exports = router;






















