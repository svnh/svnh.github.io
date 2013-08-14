var Player = function(options) {
	Mousetrap.bind('up', this.forward.bind(this));
	Mousetrap.bind('up', this.stop.bind(this), 'keyup');
	// Mousetrap.bind('down', this.backward.bind(this));
	// Mousetrap.bind('down', this.stop.bind(this), 'keyup');
	Mousetrap.bind('left', this.rotateLeft.bind(this));
	Mousetrap.bind('right', this.rotateRight.bind(this));
	Mousetrap.bind('space', this.attack.bind(this));
	Mousetrap.bind('esc', this.die.bind(this));
};
