var Game = function() {
	this.loop = this.loop.bind(this);
	
	this.gameEl = document.getElementById('game');

	this.size = [1050, 1050];

	this.items = [];

	// Create player
	this.player = new Dino({ game: this });

	// Setup controls
	Player.call(this.player);

	// Add ground

	this.groundEl = document.createElement('div');
	this.groundEl.className = 'ground';
	this.groundEl.style.width = this.size[0]+'px';
	this.groundEl.style.height = this.size[1]+'px';
	this.gameEl.appendChild(this.groundEl);

	// Add box
	this.box = document.createElement('div');
	this.box.style.display = 'none';
	this.box.id = 'box';
	this.groundEl.appendChild(this.box);

	this.groundEl.appendChild(this.player.image);

	// Start
	requestAnimationFrame(this.loop);
};

Game.prototype.moveViewport = function() {
  var dinoX = this.player.position[0] + this.player.size/2;
  var dinoY = this.player.position[1] + this.player.size/2;

	var width = this.gameEl.offsetWidth;
	var height = this.gameEl.offsetHeight;

  var sizeX = 1050;
  var sizeY = 1050;

  var translateLeft = 0;
  var translateTop = 0;

  // if (dinoX + width/2 > sizeX) {
  //   translateLeft = (sizeX - width);
  // }
  // else if (dinoX > width/2) {
  //   translateLeft = (dinoX - width/2);
  // }

  if (dinoY + height/2 > sizeY) {
    translateTop = (sizeY - height);
  }
  else if (dinoY > height/2) {
    translateTop = (dinoY - height/2);
  }

	var background = document.getElementById("game")

  this.groundEl.style.webkitTransform = 'translate3d('+Math.floor(translateLeft*-1)+'px, '+Math.floor(translateTop*-1)+'px, 0)';
};

Game.prototype.loop = function(time) {
	// Update player
	this.player.update(time);


	this.moveViewport();

	requestAnimationFrame(this.loop);
};
