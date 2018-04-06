var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var cartdetail = require('../models/cart');


// Register
router.get('/register', function(req, res){
	var errors = req.validationErrors()

	res.render('register',{
			errors:errors
		});
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});


// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var mobile = req.body.mobile;
	var address= req.body.address;


	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('mobile', 'Mobile is required').notEmpty();
	req.checkBody('mobile', 'Mobile is not valid').isInt().len(10,10);
	req.checkBody('address', 'Address is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){

		res.render('register',{
			errors:errors
		});
	} else {

		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
			mobile: mobile,
			address:address
		});
		User.checkUser(newUser, function(err,user){
				if(err) throw err;
				if(user.length){
					req.flash('error_msg', 'Username already exist');
					res.redirect('/users/register');
				}
				else{
					User.createUser(newUser, function(err, user){
					if(err) throw err;
					//console.log(newUser);

					});
					req.flash('success_msg', 'You are registered and can now login');

				res.redirect('/users/login');
				}
			})
	}

});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


//cart
router.get('/', function(req, res){
	var user = req.user ? req.user.username : 'Guest';
	cartdetail.getcartByUsername(user, function(err,cartdetail){
		res.json(cartdetail)
	});
});

//add to cart
router.post('/', function(req, res){
	var user = req.user ? req.user.username : 'Guest';
	var itemName = req.body.itemName;
	var price = req.body.price;
	var totalPrice = req.body.totalPrice;
	var quantity = req.body.quantity;

	var newcartdetail = new cartdetail({
		username: user,
		productname:itemName,
		productamount: price,
		totalprice: totalPrice,
		quantity: quantity
	});

	cartdetail.addCart(newcartdetail, function(err, newcartdetail){
	if(err) throw err;
	
	});
	res.send('Success');
});

// delete

router.delete('/:id' , function (req, res) {
  var ids = req.params.id;
  cartdetail.findByIdRemove(ids, function(err,cartdetail){
		res.json(cartdetail)
	});
});

//update

router.put('/:id' , function (req, res) {
  var ids = req.params.id;
  var newcartdetail = new cartdetail({
		username: req.body.username,
		productname:req.body.productname,
		productamount: req.body.productamount,
		totalprice: req.body.totalprice,
		quantity: req.body.quantity
	});
  cartdetail.findByIdUpdate(ids, newcartdetail, function(err,cartdetail){
  		res.json(cartdetail)
  });

});


module.exports = router;