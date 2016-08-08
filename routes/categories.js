var express = require('express');
var client = require('../db/' );

var router = express.Router();
module.exports = router;

router.get('/:id', function(req,res){
	var categoryId = req.params.id;

	// get the products list
	client.query('select products.name from categories join products on categories.id=products.cat_id where categories.id = $1',[categoryId],  function(err, results){
	 	if (err) throw err;
	 	var products = '';
		if (results.rows[0] !== undefined) {
			products = results.rows;
		}
		
		// Find category name
		client.query('select categories.name from categories where categories.id = $1',[categoryId],  function(err, results){
	 		if (err) throw err;
	 		var category = results.rows[0].name;

	 		// find all categories
	 		client.query('select name, id from categories', function(err, results){
				if(err) throw err;
				var categories = results.rows;
				res.render('category',{
				    title: category + ' Category',
				    categories: categories ,
				    products: products,
				    category: category
		  		});
			})
		})
	})
});

router.post('/', function(req, res){
	var category = req.body.category;
	console.log(category)
	client.query('insert into categories (id, name) values (DEFAULT, $1)',[category], function(err, results){
		if(err) throw err;
		client.query('select id from categories where name = $1', [category], function(err, results){
			if (err) throw err;
			res.redirect('/categories/' + results.rows[0].id);

		})
		
	})

	
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


