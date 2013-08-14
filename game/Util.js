/*
	Convert a direction into radians
*/
g.util.getRadians = function(d) {
	return Math.PI*2 / (8/d) - Math.PI/2;
};

/*
	Convert radians into a direction

*/
g.util.getDirection = function(r) {
	return (Math.floor((8 / (Math.PI*2)) * (r + Math.PI/2)) + 6) % 8;
};

