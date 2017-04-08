//File: controllers/restaurants.js
var mongoose = require('mongoose');  
var restaurant  = mongoose.model('restaurant');

//GET - Return all restaurants in the DB
exports.findAllRestaurants = function(req, res) {  
    restaurant.find(function(err, restaurants) {
		if(err) res.send(500, err.message);

		res.render(
			'listar',
			{ restaurantes: restaurants, title: 'Consultar restaurantes'});
    }).limit(20);
};

// POST - Add a new restaurant
exports.addRestaurant = function(req, res) {  
	
	id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
	
	exists = false;
	
	var twisted = function(res){
        return function(err, data){
            if (err){
                console.log('error occured');
                return;
            }
            exists = true;
        }
    };
	
	restaurant.findOne({'restaurant_id': id}, twisted)
	while(exists)
	{
		id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
		restaurant.findOne({'restaurant_id': id}, twisted);
	}
	
	var r = 
	{
		name: req.body.name,
		cuisine: req.body.cuisine,
		borough: req.body.borough,
		address: { city: req.body.city },
		restaurant_id: id
	}
	
	restaurant.collection.insert(r);
	
	res.redirect('/listar');
	
};

exports.getRestaurants = function(req, res) 
{
	
	f = {  }
	
	if(req.query.cocina != undefined)
		f['cuisine'] =  new RegExp(req.query.cocina, "i");
	if(req.query.nombre != undefined)
		f['name'] =  new RegExp(req.query.nombre, "i");
	if(req.query.ciudad != undefined)
		f['address.city'] =  new RegExp(req.query.ciudad, "i");
	
	restaurant.find(f, function(err, restaurants) {
		if(err) res.send(500, err.message);

		res.render(
			'listar',
			{ restaurantes: restaurants, title: 'Consultar restaurantes'});
    });
}


exports.getRestaurant = function(req, res) 
{	
	restaurant.find({ $where : "this.restaurant_id == " + req.query.id }, function(err, restaurants) {
		if(err) res.send(500, err.message);

		res.render(
			'restaurante',
			{ restaurantes: restaurants, title: restaurants[0].name});
    });
}
