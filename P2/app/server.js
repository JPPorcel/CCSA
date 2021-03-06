var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');
	
	
// // Connection to DB
mongoose.connect('mongodb://mongodb:27017/restaurants', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});
	
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var models = require('./models/restaurant')(app, mongoose);
var controller = require('./controllers/restaurants');

var router = express.Router();

router.get('/', function(req, res) 
{  
	res.render(
        'index',
        { title: 'Restaurantes', message: 'Aplicación web para Cloud Computing: Servicios y Aplicaciones'})
});

router.route('/add')
	.get(function(req, res) 
		{  
			res.render('add');
		})
	.post(controller.addRestaurant)

router.route('/listar')  
	.get(controller.findAllRestaurants)

router.route('/buscar')
	.get(controller.getRestaurants)
	
router.route('/restaurante')
	.get(controller.getRestaurant)

app.use(router);

// Start server
app.listen(8080, function() {
	console.log("Node server running on http://localhost:8080");
});
