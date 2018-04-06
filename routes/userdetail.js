var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var cartdetail = require('../models/cart');

router.get('/', function(req, res){
	console.log('userrrr'+ req.user)
	res.json(req.user)
});

module.exports = router;