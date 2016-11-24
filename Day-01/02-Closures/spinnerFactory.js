
function spinnerFactory(){
	var counter = 0;


	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}

	return {
		up : up,
		down : down
	}
}