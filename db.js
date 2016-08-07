var _data = {
	SpyWare: [
		{name: "Ejector Seat"},
		{name: "Razor-wire Watch"}
		],
	UnderWear: [
		{name: 'Hanes'},
		{name: 'Fruit of the Loom'}
		]
};
module.exports = {
  getCategories: getCategories,
  getProducts: getProducts,
  addCategory: addCategory,
  addProduct: addProduct,
  deleteCategory: deleteCategory,
  deleteProduct: deleteProduct
};


function getCategories()	{
	return Object.keys(_data);
}

function getProducts(category) {
  return _data[category];
}

function addCategory(category)	{
	_data[category] = []; 
}

function addProduct(category, product){
	_data[category].push({"name": product});
}

function deleteCategory(category){
	delete _data[category];
}

function deleteProduct(category, idx){
  getProducts(category).splice(idx, 1);
}





