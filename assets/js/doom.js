// Doom Game Integration using js-dos
// Lightweight implementation with lazy loading

class DoomGame {
  constructor() {
    this.initialized = false;
    this.dosInstance = null;
    this.initButton = document.getElementById('doom-init-btn');
    this.loadingDiv = document.getElementById('doom-loading');
    this.canvas = document.getElementById('doom-canvas');
    
    if (this.initButton) {
      this.initButton.addEventListener('click', () => this.init());
    }
  }
  
  async init() {
    if (this.initialized) return;
    
    try {
      this.initButton.textContent = 'Loading...';
      this.initButton.disabled = true;
      
      // Dynamically load js-dos library
      await this.loadJsDos();
      
      // Initialize the DOS emulator
      await this.startDoom();
      
      this.initialized = true;
      this.loadingDiv.style.display = 'none';
      this.canvas.style.display = 'block';
      
    } catch (error) {
      console.error('Failed to initialize Doom:', error);
      this.initButton.textContent = 'Failed to load. Try again?';
      this.initButton.disabled = false;
      alert('Failed to load Doom. Please check your internet connection and try again.');
    }
  }
  
  async loadJsDos() {
    return new Promise((resolve, reject) => {
      // Check if js-dos is already loaded
      if (window.Dos) {
        resolve();
        return;
      }
      
      // Load js-dos from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/js-dos@7.22.0/dist/js-dos.js';
      script.async = true;
      
      script.onload = () => {
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/js-dos@7.22.0/dist/js-dos.css';
        document.head.appendChild(link);
        resolve();
      };
      
      script.onerror = () => reject(new Error('Failed to load js-dos library'));
      document.head.appendChild(script);
    });
  }
  
  async startDoom() {
    if (!window.Dos) {
      throw new Error('js-dos library not loaded');
    }
    
    // Initialize js-dos with the canvas
    const dos = await window.Dos(this.canvas, {
      wdosboxUrl: 'https://cdn.jsdelivr.net/npm/js-dos@7.22.0/dist/wdosbox.wasm.js',
    });
    
    // You can host the Doom WAD file yourself or use a public one
    // For now, we'll use a shareware version URL
    // Replace with your own hosted WAD file for the full version
    const doomUrl = 'https://cdn.dos.zone/original/2X/c/c0dd1df3a6905a41b34b0e234f92e88e8a76f6b5.jsdos';
    
    // Start the game
    await dos.run(doomUrl);
    
    this.dosInstance = dos;
  }
  
  // Method to stop/pause the game if needed
  stop() {
    if (this.dosInstance) {
      this.dosInstance.stop();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const doomGame = new DoomGame();
  
  // Optional: Add visibility change handler to pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && doomGame.dosInstance) {
      // Pause game logic here if needed
      console.log('Game paused');
    }
  });
});

// Export for potential external use
window.DoomGame = DoomGame;
