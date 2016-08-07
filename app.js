var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var swig = require('swig');

var app = express();
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.engine('html',swig.renderFile);
app.set('view engine', 'html');
swig.setDefaults({cache: false});

app.get('/', function(req, res){
	res.render('index',{title: "Welcome to Acme Categories", categories: require('./db').getCategories() });
});
app.use('/categories', require('./routes/categories'));

app.listen(process.env.PORT, function(){
	console.log('listening on ' + process.env.PORT);
});



