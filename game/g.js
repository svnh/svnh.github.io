var g = {
	init: function() {
		$('#play').hide();
	 	$('.keyboard').attr('id', 'keyboard');
		this.game = new Game();
	},
	util: {},
	directions: [
		'n',
		'ne',
		'e',
		'se',
		's',
		'sw',
		'w',
		'nw'
	]
};
