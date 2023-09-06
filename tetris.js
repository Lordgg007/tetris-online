class Tetris {
	constructor() {
		//drop pieces
		let lastTime = 0;
		function update  (time = 0)  {
			const deltaTime = time -lastTime;
			lastTime = time;
			player.update(deltaTime);
			this.draw();
			requestAnimationFrame(update);
		}
		update();
	}
	
	draw() {
		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);
		this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
		this.drawMatrix(this.player.matrix, player.pos);
	}
	
	drawMatrix(matrix, offset) {
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					context.fillStyle = colors[value];
					context.fillRect(x + offset.x, y+ offset.y, 1, 1);
				}
			});
		});
	}
}