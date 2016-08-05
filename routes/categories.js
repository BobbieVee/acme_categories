var express = require('express');
var database = require('../db.js' );

var router = express.Router();
module.exports = router;


router.get('/:name', function(req,res){
	res.render('category',{
    title: req.params.name + ' Category',
    categories: database.getCategories() ,
    products: database.getProducts(req.params.name),
    category: req.params.name
  });
});

router.post('/', function(req, res){
	var category = req.body.category;
	database.addCategory(category);	 
	res.redirect('/categories/' + category);
});


router.post('/:category/products', function(req, res){
	var category = req.params.category;
	database.addProduct(category, req.body.name);
	res.redirect('/categories/'+ category);
});

router.delete('/:category/products/:idx', function(req, res){
	var category = req.params.category;
	database.deleteProduct(category, req.params.idx*1);
	res.redirect('/categories/' + category);
});

router.delete('/categories/:category', function(req,res){
  database.deleteCategory(req.params.category);
  res.redirect('/');
});


