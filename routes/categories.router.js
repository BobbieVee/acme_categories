var express = require('express');
var router = express.Router();
var database = require('../db.js' );
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser());
router.use(methodOverride('_method'));

function catList(){
	return database.listCat();
};
function prodList(category){
	return database.listProd(category);
}

router.get('/home', function(req, res){
	var categoriesList = catList();
	res.render('index',{title: "Welcome to Acme Categories", showCatForm: true, categories: categoriesList})
});

router.get('/categories/:category', function(req,res){
	var cat = req.params.category;
	var categoriesList = catList();
	var productsList = prodList(cat);
	res.render('index',{title: cat + ' Category', categories: categoriesList , products: productsList, showProdForm: true,  category: cat});
})

router.post('/home/CreateCat', function(req,res){
	var newCategory = req.body.category;
	database.addCat(newCategory);	 
	res.redirect('/categories/' + newCategory);
});


router.post('/categories/:category/:product', function(req,res){
	var newProduct = req.body.product;
	var category = req.params.category;
	if (category === 'DELETE'){
		console.log('Delete!')
	}
	database.addProd(category,newProduct);
	res.redirect('/categories/'+ category);
})

router.delete('/categories/:category/resource?', function(req, res){
	var category = req.params.category;
	database.delCat(category);
	res.redirect('/home/')
})

router.delete('/categories/:category/:product/resource?', function(req,res){
	var product = req.params.product;
	var category = req.params.category;
	database.delProd(category,product);
	res.redirect('/categories/'+ category);

})


module.exports = router;