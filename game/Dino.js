var Dino = function(options) {
	Actor.call(this, options);

	this.defaultClassName += ' dino';
	this.image.classList.add('dino');
	this.speed = 2.5;
	this.size = 128;

	this.actions = {
		stopped: {
			frames: 0
		},
		running: {
			frames: 8,
			moving: true
		},
		attacking: {
			frames: 13,
			runOnce: true
		},
		falling: {
			frames: 11,
			runOnce: true
		}
	};
};

Dino.prototype = Object.create(Actor.prototype);
Dino.prototype.constructor = Dino;
