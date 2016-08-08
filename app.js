var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var client = require('./db/' );

var swig = require('swig');

var app = express();
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.engine('html',swig.renderFile);
app.set('view engine', 'html');
swig.setDefaults({cache: false});



app.get('/', function(req, res){
	client.query('select name, id from categories',function(err, results){
		if(err) throw err;
		var categories = results.rows;
		console.log(categories);
		res.render('index',{title: "Welcome to Acme Categories", categories: categories });
	});
	
});
app.use('/categories', require('./routes/categories'));

app.listen(process.env.PORT, function(){
	console.log('listening on ' + process.env.PORT);
});



