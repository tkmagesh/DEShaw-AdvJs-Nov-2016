/*
sort
filter
any
all
groupBy
min
max
avg
sum
aggregate
forEach
map
*/

var products = [
	{id : 3, name : 'Pen', cost : 10, units : 20, category : 'Stationary'},
	{id : 8, name : 'Len', cost : 20, units : 5, category : 'Grocery'},
	{id : 5, name : 'Rice', cost : 50, units : 10, category : 'Grocery'},
	{id : 6, name : 'Pencil', cost : 5, units : 100, category : 'Stationary'},
	{id : 4, name : 'Scribble Pad', cost : 7, units : 30, category : 'Stationary'},
	{id : 9, name : 'Marker', cost : 15, units : 10, category : 'Stationary'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
})

describe('Sorting', function(){
	describe("Sorting Products by id", function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for( var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});
	describe("Any list by any attribute", function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for( var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("Products by cost", function(){
			sort(products, "cost");
			console.table(products);
		});
		describe("Products by units", function(){
			sort(products, "units");
			console.table(products);
		});
	})
})

