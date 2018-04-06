var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//cart schema

var OrderplacementSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	email: {
		type: String
	},	mobile: {
		type: Number
	},
	address:{
		type:String
	},
	product: []

});

var orderplacement = module.exports = mongoose.model('orderplacement', OrderplacementSchema);

module.exports.addToOrder = function(neworderplacement , callback ){
	neworderplacement.save(callback);
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

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}



