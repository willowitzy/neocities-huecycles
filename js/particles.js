// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store particle objects
const particles = [];

// Load the particle image
const saveImage = new Image();
saveImage.src = 'assets/img/savepoint.png';

// Constructor function for creating a new particle
function Particle() {
  // Set a random initial position along the bottom of the screen
  this.x = Math.random() * canvas.width;
  this.y = canvas.height;

  // Random velocity for horizontal and vertical movement
  this.vx = Math.random() * 2 - 1;
  this.vy = -Math.random() * 2 - 1;

  // Gravity effect
  this.gravity = 0.00;

  // Random initial transparency
  this.alpha = Math.random() * 0.5 + 0.06;

  // Update the particle's position and appearance
  this.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= this.gravity;
    this.alpha -= 0.0034;

    // Ensure alpha doesn't go below 0
    if (this.alpha <= 0) {
      this.alpha = 0;
    }

    this.draw();
  };

  // Draw the particle on the canvas
  this.draw = function() {
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(saveImage, this.x, this.y, 30, 30);
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1; // Reset global alpha
  };
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add a new particle to the array
  particles.push(new Particle());

  // Update and draw particles, and remove them when they reach the middle
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].y <= canvas.height / canvas.height) {
      particles.splice(i, 1);
    }
  }
}

// Start the animation loop
animate();