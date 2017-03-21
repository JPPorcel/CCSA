var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
	
	
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) 
{  
	res.render(
        'index',
        { title: 'Hey Hey Hey!', message: 'Yo Yo'})
});


app.use(router);

app.listen(80, function() {  
	console.log("Node server running on http://localhost:80");
});
