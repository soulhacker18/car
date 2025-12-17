const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Car properties
let car = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    speed: 5,
    angle: 0,
    moveForward: false,
    moveBackward: false,
    turnLeft: false,
    turnRight: false
};

// Track properties
const track = {
    x: 50,
    y: 50,
    width: 700,
    height: 500,
    color: '#666'
};

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            car.moveForward = true;
            break;
        case 'ArrowDown':
            car.moveBackward = true;
            break;
        case 'ArrowLeft':
            car.turnLeft = true;
            break;
        case 'ArrowRight':
            car.turnRight = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            car.moveForward = false;
            break;
        case 'ArrowDown':
            car.moveBackward = false;
            break;
        case 'ArrowLeft':
            car.turnLeft = false;
            break;
        case 'ArrowRight':
            car.turnRight = false;
            break;
    }
});

function update() {
    // Move the car
    if (car.moveForward) {
        car.x += car.speed * Math.sin(car.angle);
        car.y -= car.speed * Math.cos(car.angle);
    }
    if (car.moveBackward) {
        car.x -= car.speed * Math.sin(car.angle);
        car.y += car.speed * Math.cos(car.angle);
    }
    if (car.turnLeft) {
        car.angle -= 0.05;
    }
    if (car.turnRight) {
        car.angle += 0.05;
    }

    // Check for collision with track boundaries
    if (car.x < track.x || car.x > track.x + track.width || car.y < track.y || car.y > track.y + track.height) {
        // Reset car position
        car.x = 100;
        car.y = 300;
        car.angle = 0;
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the track
    ctx.fillStyle = track.color;
    ctx.fillRect(track.x, track.y, track.width, track.height);

    // Draw the car
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();