var Cloud = {};

Cloud.init = function() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.xC = this.width / 2;
	this.yC = this.height / 2;
	this.stepCount = 0;
	this.population = 200;
	this.particles = [];

	for(var i = 0; i < this.population; i++) {
		Cloud.birth();
	}
};
Cloud.evolve = function() {
	this.stepCount++;
	this.move();
	this.draw();
};
Cloud.move = function() {
	for(var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		p.x = p.xStart + p.dist * Math.cos(p.speed * this.stepCount);
		p.y = p.yStart + p.dist * Math.sin(p.speed * this.stepCount);
	}
};
Cloud.draw = function() {
	var divs = document.getElementsByClassName('drop');
	for(var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i],
			div = divs[i];

		var r = particle.r,
			x = particle.x - r / 2,
			y = particle.y - r / 2;
		div.style.left = x + 'px';
		div.style.top = y + 'px';
		div.style.height = particle.r + 'px';
		div.style.width = particle.r + 'px';
	}
};
Cloud.birth = function() {
	var speed = 0.2,
		x = this.xC + 220 * (-1 + 2 * Math.random()),
		y = this.yC + 100 * (-1 + 2 * Math.random()),
		minSize = 10,
		maxSize = 150,
		distToCenter = Math.sqrt(Math.pow(x - this.xC, 2) + Math.pow(y - this.yC, 2)),
		size = 170 - 0.65 * distToCenter;

	// Create new particle
	var particle = {
		x: x,
		y: y,
		xStart: x,
		yStart: y,
		speed: speed * (-0.5 + Math.random()),
		dist: 15,
		r: size
	};

	// Push new particle to global particles array
	this.particles.push(particle);

	// Create one more div node and append to DOM
	var div = document.createElement('div');
	div.className = 'drop';
	document.getElementsByTagName('body')[0].appendChild(div);
};

document.addEventListener('DOMContentLoaded', function() {

	Cloud.init();

	setInterval(function() {
		Cloud.evolve();
	}, 50);



});