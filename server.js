var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var connection = mysql.createConnection({
  host     : '192.168.10.92',
  user     : 'music',
  password : 'music',
  database : 'Music'
});

var router = express.Router();

router.get('/', function(req, res) 
{  
	res.send("Server Music");
});

// devolverá lista de marchas
router.get('/marchas', function(req, res) 
{  
	connection.query("select * from Marchas",function(err,rows){
		if(err) 
			throw err;
		
		res.set({ 'content-type': 'application/json; charset=utf-8' });
		res.send(rows);
	});
});

// devuelve la información de una marcha, si existe
router.get('/marcha/info/:id', function(req, res) 
{  
	connection.query("select * from Marchas where id='" + req.params.id + "'",function(err,rows)
	{
		if(err) 
			throw err;
		
		res.set({ 'content-type': 'application/json; charset=utf-8' });
		res.send(rows[0]);
	});
});


router.get('/filtro/:filtro', function(req, res)
{
	connection.query("select * from Marchas where titulo like '%" + req.params.filtro + "%' or autor like '%" + req.params.filtro + "%'", function (err, rows)
	{
		if(err)
			throw err;
		
		console.log(req.params.filtro);
		
		res.set({ 'content-type': 'application/json; charset=utf-8' });
		res.send(rows);
	});
});

app.use(router);

app.listen(80, function() {  
	console.log("Node server running on http://localhost:80");
});
