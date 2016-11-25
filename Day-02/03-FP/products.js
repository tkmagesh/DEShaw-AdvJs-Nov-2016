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
		describe("Products by name", function(){
			sort(products, "name");
			console.table(products);
		});
	});

	describe("Any list by any comparer", function(){
		function sort(list){
			var comparerFns = [].slice.call(arguments,1),
				comparerFn = comparerFns[0],
				remainingComparers = comparerFns.slice(1);
			for(var i=0; i < list.length-1; i++)
				for( var j=i+1; j < list.length; j++)
					if (comparerFn(list[i], list[j], remainingComparers) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		function descending(comparerFn){
			return function(){
				return -1 * comparerFn.apply(this, arguments);
			}
		}
		var productComparerByValue = function(p1, p2, nextComparers){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			var nextComparer = nextComparers[0],
				remainingComparers = nextComparers.slice(1);
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) {
				if (nextComparer) return nextComparer(p1, p2, remainingComparers);
				return 0;
			}
			return 1;
		}
		var productComparerByCost = function(p1, p2, nextComparers){
			var p1Value = p1.cost,
				p2Value = p2.cost;
			var nextComparer = nextComparers[0],
				remainingComparers = nextComparers.slice(1);
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) {
				if (nextComparer) return nextComparer(p1, p2, remainingComparers);
				return 0;
			}
			return 1;
		}

		var productComparerByUnits = function(p1, p2, nextComparers){
			var p1Value = p1.units,
				p2Value = p2.units;
			var nextComparer = nextComparers[0],
				remainingComparers = nextComparers.slice(1);
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) {
				if (nextComparer) return nextComparer(p1, p2, remainingComparers);
				return 0;
			}
			return 1;
		}

		describe("Products by value [ units * cost ]", function(){
			
			sort(products, productComparerByValue);
			console.table(products);
		})
		describe("Products by value [ units * cost ] in descending", function(){
			var productComparerByValueDescending = descending(productComparerByValue);

			sort(products, productComparerByValueDescending);
			console.table(products);
		})
		describe("Products by value [ units * cost ] & cost", function(){
			
			sort(products, productComparerByValue, productComparerByCost);
			console.table(products);
		})
		describe("Products by value [ units * cost ] & units", function(){
			
			sort(products, productComparerByValue, productComparerByUnits);
			console.table(products);
		})
	})
})

describe("Filtering", function(){
	describe("Filter stationary products", function(){
		function filterStationaryProducts(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].category === 'Stationary')
					result.push(products[i]);
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});
	describe("Any list by any criteria", function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}
		describe("Products by cost", function(){
			var costlyProductCriteria = function(product){
				return product.cost >= 50;
			};
			describe("All costly products", function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
		})
		describe("Products by units", function(){
			var underStockedProductsCriteria = function(product){
				return product.units < 100;
			};
			describe("All under stocked products", function(){
				var underStockedProducts = filter(products, underStockedProductsCriteria);
				console.table(underStockedProducts);
			});
		})
	})
})

