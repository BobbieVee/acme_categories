var express = require('express');
var client = require('../db/' );

var router = express.Router();
module.exports = router;


// Category Page
router.get('/:id', function(req,res){
	var categoryId = req.params.id;

	// get the products list
	client.query('select products.name, products.id from categories join products on categories.id=products.cat_id where categories.id = $1',[categoryId],  function(err, results){
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
				    category: category, 
				    categoryId: categoryId 
		  		});
			})
		})
	})
});

//Create new Category
router.post('/', function(req, res){
	var category = req.body.category;
	client.query('insert into categories (id, name) values (DEFAULT, $1)',[category], function(err, results){
		if(err) throw err;
		client.query('select id from categories where name = $1', [category], function(err, results){
			if (err) throw err;
			res.redirect('/categories/' + results.rows[0].id);
		})
	})
});

//Create new product
router.post('/:id/products', function(req, res){
	var categoryId = req.params.id;
	var product = req.body.name;
	client.query('insert into products (id, name, cat_id) values(DEFAULT, $1, $2 )', [ product,categoryId ],function(err, results){
		if (err) throw err;
		res.redirect('/categories/'+ categoryId);
	});	
});

// Delete product
router.delete('/:id/products/:idx', function(req, res){
	var categoryId = req.params.id;
	var productId = req.params.idx*1;
	client.query('delete from products where id = $1',[productId], function(err){
		if (err) throw err;
		res.redirect('/categories/' + categoryId);
	});	
});


// Delete category
router.delete('/:id', function(req,res){
  client.query('delete from categories where id = $1',[req.params.id], function(err){
  	if(err) throw err;
  	res.redirect('/');
  });  
});


