// Pong Game Implementation
class PongGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.gameStarted = false;
    
    // Set canvas size
    this.canvas.width = 800;
    this.canvas.height = 400;
    
    // Game objects
    this.paddleHeight = 80;
    this.paddleWidth = 10;
    this.ballSize = 8;
    
    // Player paddle (left)
    this.player = {
      x: 20,
      y: this.canvas.height / 2 - this.paddleHeight / 2,
      width: this.paddleWidth,
      height: this.paddleHeight,
      dy: 0,
      speed: 6
    };
    
    // AI paddle (right)
    this.ai = {
      x: this.canvas.width - 30,
      y: this.canvas.height / 2 - this.paddleHeight / 2,
      width: this.paddleWidth,
      height: this.paddleHeight,
      dy: 0,
      speed: 4
    };
    
    // Ball
    this.ball = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      dx: 3,
      dy: 3,
      size: this.ballSize
    };
    
    // Score
    this.playerScore = 0;
    this.aiScore = 0;
    
    // Input handling
    this.keys = {};
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }
  
  onKeyDown(e) {
    this.keys[e.key] = true;
  }
  
  onKeyUp(e) {
    this.keys[e.key] = false;
  }
  
  start() {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.isRunning = true;
    this.gameLoop();
  }
  
  reset() {
    this.playerScore = 0;
    this.aiScore = 0;
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.dx = 3;
    this.ball.dy = 3;
  }
  
  gameLoop = () => {
    if (!this.isRunning) return;
    
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  }
  
  update() {
    // Player input
    if (this.keys['ArrowUp'] && this.player.y > 0) {
      this.player.y -= this.player.speed;
    }
    if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.height) {
      this.player.y += this.player.speed;
    }
    
    // AI paddle - follows ball
    const aiCenter = this.ai.y + this.ai.height / 2;
    const ballCenter = this.ball.y;
    
    if (aiCenter < ballCenter - 35 && this.ai.y < this.canvas.height - this.ai.height) {
      this.ai.y += this.ai.speed;
    } else if (aiCenter > ballCenter + 35 && this.ai.y > 0) {
      this.ai.y -= this.ai.speed;
    }
    
    // Ball movement
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
    
    // Ball collision with top/bottom
    if (this.ball.y - this.ball.size <= 0 || this.ball.y + this.ball.size >= this.canvas.height) {
      this.ball.dy *= -1;
      this.ball.y = Math.max(this.ball.size, Math.min(this.canvas.height - this.ball.size, this.ball.y));
    }
    
    // Ball collision with paddles
    if (this.ball.x - this.ball.size <= this.player.x + this.player.width &&
        this.ball.y >= this.player.y &&
        this.ball.y <= this.player.y + this.player.height) {
      this.ball.dx *= -1;
      this.ball.x = this.player.x + this.player.width + this.ball.size;
      this.ball.dy += (this.ball.y - (this.player.y + this.player.height / 2)) * 0.1;
    }
    
    if (this.ball.x + this.ball.size >= this.ai.x &&
        this.ball.y >= this.ai.y &&
        this.ball.y <= this.ai.y + this.ai.height) {
      this.ball.dx *= -1;
      this.ball.x = this.ai.x - this.ball.size;
      this.ball.dy += (this.ball.y - (this.ai.y + this.ai.height / 2)) * 0.1;
    }
    
    // Score
    if (this.ball.x < 0) {
      this.aiScore++;
      this.resetBall();
    }
    if (this.ball.x > this.canvas.width) {
      this.playerScore++;
      this.resetBall();
    }
  }
  
  resetBall() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.dx = (Math.random() > 0.5 ? 1 : -1) * 3;
    this.ball.dy = (Math.random() - 0.5) * 4;
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw center line
    this.ctx.strokeStyle = '#e4e009';
    this.ctx.setLineDash([10, 10]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    
    // Draw paddles
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    this.ctx.fillRect(this.ai.x, this.ai.y, this.ai.width, this.ai.height);
    
    // Draw ball
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw score
    this.ctx.font = 'bold 32px "IBM Plex Mono"';
    this.ctx.fillStyle = '#e4e009';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.playerScore}`, this.canvas.width / 4, 40);
    this.ctx.fillText(`${this.aiScore}`, (this.canvas.width * 3) / 4, 40);
  }
  
  stop() {
    this.isRunning = false;
  }
  
  pause() {
    this.isRunning = !this.isRunning;
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.pongGame = new PongGame('pong-canvas');
  });
} else {
  window.pongGame = new PongGame('pong-canvas');
}
