var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');
	
	
// // Connection to DB
mongoose.connect('mongodb://192.168.10.93:27017/restaurants', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});
	
// Connection to DB
// mongoose.connect('mongodb://localhost/restaurants', function(err, res) {
//   if(err) throw err;
//   console.log('Connected to Database');
// });
	
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var models = require('./models/restaurant')(app, mongoose);
var controller = require('./controllers/restaurants');

var router = express.Router();

router.get('/', function(req, res) 
{  
	res.render(
        'index',
        { title: 'Restaurantes', message: 'h1'})
});

router.route('/restaurants')  
  .get(controller.findAllRestaurants)


app.use(router);

// Start server
app.listen(80, function() {
  console.log("Node server running on http://localhost:8080");
});
