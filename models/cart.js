var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//cart schema

var CartSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	productname: {
		type: String,
		index:true
	},
	productamount: {
		type: Number
	},
	quantity: {
		type: Number
	},
	totalprice: {
		type: Number
	}
});

var cartdetail = module.exports = mongoose.model('cartdetail', CartSchema);

module.exports.addCart = function(newcartdetail , callback ){
	newcartdetail.save(callback);
}

module.exports.findall = function(cartdetail , callback ){
	var query = {};
		cartdetail.find(query,callback)
}

module.exports.findByIdRemove = function(id , callback ){
	var query = {_id:id};
		cartdetail.remove(query,callback)
}
module.exports.findByIdUpdate = function(id , newcartdetail, callback ){

	var query = {_id:id};
	var set = { $set: { totalprice: newcartdetail.totalprice, quantity: newcartdetail.quantity }}

		cartdetail.findByIdAndUpdate(query,set, callback)
}

module.exports.getcartByUsername = function(username, callback){
	var query = {username: username};
	cartdetail.find(query, callback);
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports.checkUser = function(newUser , callback ){
	var query = {username: newUser.username};
	User.find(query, callback) 
}


module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}