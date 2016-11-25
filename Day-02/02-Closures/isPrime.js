var isPrime = (function (){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];

		console.log('processing ', n);
		cache[n] = true;
		if (n <= 3) return cache[n];
		for(var i=2; i <= (n/2); i++){
			if (n % 2 === 0){
				cache[n] = false;
				break;
			}
		}
		return cache[n];
	}
})();

