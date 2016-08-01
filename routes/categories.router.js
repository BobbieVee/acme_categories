var express = require('express');
var router = express.Router();
var database = require('../db.js' );
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
var categoriesList = database.listCat();

router.get('/home', function(req, res){
	
	res.render('index',{title: "Welcome to Acme Categories", showCatForm: true, categories: categoriesList})
});

router.get('/categories/:category', function(req,res){
	console.log(req.params.category )
	var cat = req.params.category;
	res.render('index',{title: cat + ' Category', categories: categoriesList })

})

router.post('/CreateCat', function(req,res){
	console.log(req.body.category)
	res.redirect('/');
});



module.exports = router;