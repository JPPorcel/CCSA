// mongoimport --db restaurants --collection restaurants --drop --file primer-dataset.json

var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
	
var restaurant = new Schema({  
	name: { type: String, required: true},
	restaurant_id: { type: Number, required: true, unique: true },
	cuisine:  String,
	borough: String,
	address: { 
		building: String,
		street: String,
		city: String,
		zipcode: Number,
		coord: {
			type: [Number],  // [<longitude>, <latitude>]
			index: '2d'
		}
	},
	grades: [{
		grade: String,
		score: Number,
		date: Date
	}]
	//image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('restaurant', restaurant);
