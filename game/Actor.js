var Actor = function(options) {
	this.game = options.game;
	
	this.direction = 3;
	this.action = 'stopped';
	this.lastAction = 'stopped';
	this.speed = 1;
	this.lastTime = 0;
	this.hadBite = false;
	this.size = 128;

	this.image = document.createElement('div');
	this.image.className = this.defaultClassName = 'player';
	this.image.style.left = '0px';
	this.image.style.top = '0px';

	this.image.classList.add(this.action+'-'+g.directions[this.direction])

	this.position = [0,0];
};

Actor.prototype.update = function(time) {
	if (this.actions[this.action].moving) {
		var rotation = g.util.getRadians(this.direction);

		// Todo: Interpolate based on last time
		var moveLeft = Math.cos(rotation) * this.speed * (time - this.lastTime)/10;
		var moveTop = Math.sin(rotation) * this.speed * (time - this.lastTime)/10;

		this.setPosition(this.position[0] + moveLeft, this.position[1] + moveTop);
	}

	this.lastTime = time;
};

Actor.prototype.setAction = function(action) {
	if (this.dead || this.action === action) return;

	// Stop actions if you set a new actin
	clearTimeout(this.animTimeout);

	if (action === 'falling')
		this.dead = true;
	if (action === 'attacking')
		this.hadBite = false;

	this.lastAction = this.action;
	this.action = action;

	// Stop actions after a timeout
	var actionInfo = this.actions[action]
	if (actionInfo.runOnce) {
		this.animTimeout = setTimeout(function() {
			this.setAction(this.lastAction);
		}.bind(this), actionInfo.frames/24*1000);
	}

	this.setAnimClass();
};

Actor.prototype.setAnimClass = function() {
	this.image.className = this.defaultClassName;
	this.image.classList.add(this.action+'-'+g.directions[this.direction]);
};

/*
Parameters:
	left - Unitless left position
	top - Unitless top position
*/
Actor.prototype.setPosition = function(left, top) {
	if (this.dead) return;

	this.position[0] = left;
	this.position[1] = top;

	this.image.style.left = this.position[0] + 'px';
	this.image.style.top = this.position[1] + 'px';
};

/*
Parameters:
	direction - Number 0-8
*/
Actor.prototype.rotateTo = function(direction) {
	if (this.dead) return;

	// Change rotation
	this.direction = direction;

	this.setAnimClass();
};

Actor.prototype.run = function(velocity) {
	// Don't allow running while attacking
	if (this.action === 'attacking') return;

	this.velocity = velocity || 1;
	this.setAction('running');
};

Actor.prototype.forward = function() {
	this.run(1);
};

Actor.prototype.backward = function() {
	this.run(-1);
};

Actor.prototype.stop = function() {
	if (this.action === 'attacking') return;

	this.velocity = 0;
	this.setAction('stopped');
};

Actor.prototype.attack = function() {
	this.setAction('attacking');
};

Actor.prototype.die = function() {
	this.setAction('falling');
};

Actor.prototype.rotateRight = function() {
	this.rotateTo((this.direction + 1) % 8);
};

Actor.prototype.rotateLeft = function() {
	this.rotateTo(this.direction === 0 ? 7 : this.direction - 1);
};

