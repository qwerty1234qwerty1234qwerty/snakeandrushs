const canvas = document.getElementById('gameCanvas');  
const ctx = canvas.getContext('2d');
resizeCanvas();  

const gridsize = 20;  
Let snake = [{ x: gridSize * 5, y: gridSize * 5, y: gridsize * 5 }];
Let food = { x: gridsize * 10, y: gridsize * 10 };
Let dx = gridSize; 
Let dy = 0;  
Let changingDirection = false;  
 
document.addEventListener('mousedown', changeDirection);  
document.addEventListener('touchstart', changeDirection);  
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;  
}

function drawSnakePart(snakePart) {
	ctx.fillStyle = 'lime';  
	ctx.strokeStyle = 'darkgreen';  
	ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);  
	ctx.strokeRect(snakePart.x, snakePart.y, gridSize, gridSize);  
}
function drawSnake() {
	snake.forEach(drawSnakePart);
}


function moveSnake() { 
	const head = { x: snake[0].x + dx, y: snake[0].y + dy }; 
	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		createFood(); 
	} else {
		snake.pop();
	}
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createFood() {
    food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const touchX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const touchY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    const head = snake[0];
    const diffX = touchX - (head.x + canvas.offsetLeft);
    const diffY = touchY - (head.y + canvas.offsetTop);

    if (Math.abs(diffX) > Math.abs(diffY)) {
        dx = diffX > 0 ? gridSize : -gridSize;
        dy = 0;
    } else {
        dx = 0;
        dy = diffY > 0 ? gridSize : -gridSize;
    }
}

function main() {
    if (didGameEnd()) return;

    changingDirection = false;
    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100);
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

createFood();
main();
