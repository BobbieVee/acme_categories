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


function listCat()	{
	return Object.keys(_data);
};

function listProd(category) {
	var list =[];
	_data[category].forEach(function(productObj){
		 list.push(productObj.name);
	})
	return list;
};

function addCat(newCategory)	{
	_data[newCategory] = []; 
};

function addProd(category, product){
	_data[category].push({"name": product});
};

function delCat(category){
	console.log('keel the ', category)
	delete _data[category]
	console.log(_data)
};
function delProd(category, product){
	var index = 0;
	var removeIndex = 0;
	_data[category].forEach(function(prodObj){
		if (prodObj.name === product){
			removeIndex = index
		}
		index++;
	});
	console.log(removeIndex)
	_data[category].splice(removeIndex,1)
	console.log(_data[category])
};



module.exports = {listCat: listCat, addCat: addCat, listProd: listProd, addProd: addProd, delCat: delCat, delProd: delProd}


