const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);


//Collision Detection
function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 &&
					(arena[y + o.y] &&
					arena[y + o.y][x + o.x]) !== 0) {
					return true;
			}
		}
	}
	return false;
}

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

//Pieces
function createPice(type) {
	if (type == 'T') {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		];
	} else if (type === 'O') {
		return [
			[1, 1],
			[1, 1],
		];
	} else if (type === 'L') {
		return [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		];
	}  else if (type === 'J') {
		return [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		];
	} else if (type === 'I') {
		return [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		];
	} else if (type === 'S') {
		return [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		];
	} else if (type === 'Z') {
		return [
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		];
	}
}

//fill T piece 
function draw() {
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value !== 0) {
              context.fillStyle = 'red';
              context.fillRect(x + offset.x, y+ offset.y, 1, 1);
          }
      });
  });
}
function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

// Player bits and bobs
function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
	}
	dropCounter = 0;
}

//player move
function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

//RNG pieces
function playerReset() {
	const pieces = 'ILJOTSZ';
	player.matrix = cratePiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
}


//player rotation
function playerRotate(dir) {
	const pos = player.pos.x;
	let offset = 1;
	rotate(player.matrix, dir);
	while (collide(arena, player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > player.matrix[0].length) {
			rotate(player.matrix, -dir); 
			player.pos.x = pos;
			return;
		}
	}
}

//rotate the matrix 
function rotate(matrix, dir) {
	for (let y = 0; y < matrix.length; ++y ) {
		for (let x = 0; x < y; ++x) {
			[
				matrix[x][y],
				matrix[y][x],
			] = [
				matrix[y][x],
				matrix[x][y],
			];
		}
	}

	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}
}

//generate pieces
let dropCounter = 0;
let dropInterval = 1000;

//drop pieces
let lastTime = 0;
function update(time = 0) {
	const deltaTime = time -lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if(dropCounter > dropInterval) {
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);


//player start point 
const player = {
	pos: {x: 5, y: 5}, 
	matrix: createPice('T'),
}


//Controls
document.addEventListener('keydown', event => {
	if (event.keyCode === 37) { // 37 = '→' key
		playerMove(-1);
	} else if (event.keyCode === 39) { // 39 = '←' key
		playerMove(1);
	} else if (event.keyCode === 40) { // 40 = '↓' key
		playerDrop();
	} else if (event.keyCode === 81) { // 81 = 'q' key
		playerRotate(-1);
	}
});

update();
