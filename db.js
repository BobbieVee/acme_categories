var _data = {
	SpyWare: [
		{name: "Ejector Seat"},
		{name: "Razor-wire Watch"}
		],
	UnderWare: [
		{name: 'Hanes'},
		{name: 'Fruit of the Loom'}
		]
};


function listCat()	{
	return Object.keys(_data);
};

function addCat(newCategory)	{
	// _data.newCategory = "ouch";
	console.log(typeof _data)  
}

module.exports = {listCat: listCat, addCat: addCat,}