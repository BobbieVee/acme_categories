var express = require('express');
var client = require('../db/' );

var router = express.Router();
module.exports = router;

router.get('/:id', function(req,res){
	var categoryId = req.params.id;
	console.log('categoryId =', categoryId)

	client.query('select categories.name as category_name, products.name from categories join products on categories.id=products.cat_id where categories.id = $1',[categoryId],  function(err, results){
		 	if (err) throw err;
			var products = results.rows;
			var category = results.rows[0].category_name;
			client.query('select name, id from categories', function(err, results){
				if(err) throw err;
				var categories = results.rows;
				console.log(products);
				console.log(category);
				console.log(categories)
				res.render('category',{
				    title: category + ' Category',
				    categories: categories ,
				    products: products,
				    category: category
		  		});
			})
	})
			

});

router.post('/', function(req, res){
	var category = req.body.category;
	client.addCategory(category);	 
	res.redirect('/categories/' + category);
});


router.post('/:category/products', function(req, res){
	var category = req.params.category;
	client.addProduct(category, req.body.name);
	res.redirect('/categories/'+ category);
});

router.delete('/:category/products/:idx', function(req, res){
	var category = req.params.category;
	client.deleteProduct(category, req.params.idx*1);
	res.redirect('/categories/' + category);
});

router.delete('/categories/:category', function(req,res){
  client.deleteCategory(req.params.category);
  res.redirect('/');
});


