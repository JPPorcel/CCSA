//File: controllers/restaurants.js
var mongoose = require('mongoose');  
var restaurant  = mongoose.model('restaurant');

//GET - Return all restaurants in the DB
exports.findAllRestaurants = function(req, res) {  
    restaurant.find(function(err, restaurants) {
		if(err) res.send(500, err.message);

		console.log('GET /restaurants')
		res.status(200).jsonp(restaurants);
    }).limit(20);
};
