var express = require('express');
var router = express.Router();
var User = require('../models/user');
var nodemailer = require("nodemailer"); 
var orderplacement = require('../models/orderplacement');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
		if(req.user.name == 'Dheeraj'){
		orderplacement.findall(orderplacement, function(err,orderplacement){
		res.json(orderplacement)
		});



}
	
	
});
//add to cart
router.post('/', function(req, res){
	console.log("postinggg")
	console.log(req.body.mobile)
	console.log(req.body.address)

	var product =[]
	for(i in req.body.orderDetails){
	var productname = req.body.orderDetails[i].productname;
	var productamount = req.body.orderDetails[i].productamount;
	var productquantity = req.body.orderDetails[i].quantity;
	var producttotalprice = req.body.orderDetails[i].totalprice;
	var address = req.body.address;

	product .push({
		'productname' : productname,
		'productamount' : productamount,
		'productquantity':productquantity,
		'producttotalprice':producttotalprice
	})

	}
	
	var username = req.body.orderDetails[0].username;
	
	User.getUserByUsername(username, function(err,User){
		  email : User.email
		  console.log(User)
		  placingOrder(User)

	});
	function placingOrder(User){
	
	
	var neworderplacement = new orderplacement({
		username: username,
		product:product,
		email:User.email,
		address:address || User.address
	});

	orderplacement.addToOrder(neworderplacement, function(err, neworderplacement){
	if(err) throw err;
	
	});
nodemailer.createTestAccount(function(err, account)  {
var smtpTransport = nodemailer.createTransport({
             host: "smtp.gmail.com", 
    secureConnection: true, 
    port: 465, 
            auth: {
                 user: "dheeraj2k5@gmail.com",
                 pass: "*********"
            }
        });
        var mailOptions = {
            from: "Node Emailer ✔ <dheeraj2k5@gmail.com>", 
            to: "dheeraj2k5@gmail.com", 
            subject: "mail", 
            text: "Hello world ✔", // plaintext body
            //html: "<b>"+req.body.description+"</b>" // html body
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
       /* if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email has been sent successfully");
        } */
    }); 
});
}
	res.send('Success');
});
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;