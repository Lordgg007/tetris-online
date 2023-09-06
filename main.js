const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);




//Pieces
function createPice(type) {
	if (type === 'T') {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		];
	} else if (type === 'O') {
		return [
			[2, 2],
			[2, 2],
		];
	} else if (type === 'L') {
		return [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3],
		];
	}  else if (type === 'J') {
		return [
			[0, 4, 0],
			[0, 4, 0],
			[4, 4, 0],
		];
	} else if (type === 'I') {
		return [
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
		];
	} else if (type === 'S') {
		return [
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0],
		];
	} else if (type === 'Z') {
		return [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0],
		];
	}
}



//coulors 
const colors = [
	null,
	'red',
	'blue',
	'violet',
	'green',
	'purple',
	'oramge',
	'pink',
];

const tetris = new Tetris;

const player = new Player;

const arena = Arena(12, 20);

//score
function updateScore() {
	document.getElementById('score').innerText = player.score;
}

//Controls
document.addEventListener('keydown', event => {
	if (event.keyCode === 37) { // 37 = '→' key
		player.move(-1);
	} else if (event.keyCode === 39) { // 39 = '←' key
		player.move(1);
	} else if (event.keyCode === 40) { // 40 = '↓' key
		player.drop();
	} else if (event.keyCode === 81) { // 81 = 'q' key
		player.rotate(-1);
	}
});

updateScore();

