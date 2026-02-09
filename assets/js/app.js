import * as THREE from 'three';

// Three.js Scene Setup
let scene, camera, renderer, pointCloud;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThree() {
  const container = document.getElementById('threejs-container');
  
  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001);
  
  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // Initial offset tilt for better visual perspective
  camera.position.set(40, 60, 80);
  camera.lookAt(0, 20, 0);
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create Point Cloud
  createPointCloud();
  
  // Event Listeners
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('scroll', onScroll);
  
  // Start Animation
  animate();
}

function createPointCloud() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  
  const width = 200;
  const depth = 200;
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < depth; j++) {
      const x = (i - width / 2) * 2;
      const z = (j - depth / 2) * 2;
      
      // Sinc function: sinc(r) = sin(r) / r
      const r = Math.sqrt(x * x + z * z) * 0.15;
      const sincValue = r === 0 ? 40 : (Math.sin(r) / r) * 40; // Increased amplitude to 40
      
      // Add sinusoidal waves on top
      const sineWave = Math.sin(i * 0.1) * Math.cos(j * 0.1) * 8;
      
      // Combine both effects
      const y = sincValue + sineWave;
      
      vertices.push(x, y, z);
      
      // Black and white gradient based on distance from center
      const color = new THREE.Color();
      const distFromCenter = Math.sqrt(x * x + z * z);
      const maxDist = Math.sqrt(2) * width;
      const grayscale = 1.0 - (distFromCenter / maxDist) * 0.7;
      color.setRGB(grayscale, grayscale, grayscale);
      colors.push(color.r, color.g, color.b);
    }
  }
  
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3)
  );
  
  // Create circular sprite texture for spherical points
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  
  const material = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    map: texture,
    alphaTest: 0.01,
    depthWrite: false
  });
  
  pointCloud = new THREE.Points(geometry, material);
  // Start at 45 degree angle for better initial perspective
  pointCloud.rotation.x = Math.PI / 4;
  scene.add(pointCloud);
}

function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  pointCloud.rotation.x = scrollPercent * Math.PI * 2;
}

function animate() {
  requestAnimationFrame(animate);
  
  // Rotate point cloud based on time
  pointCloud.rotation.y += 0.001;
  
  // Move camera based on mouse
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  
  // Animate wave effect - sinc function with sinusoidal modulation
  const positions = pointCloud.geometry.attributes.position.array;
  const time = Date.now() * 0.0005;
  
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const z = positions[i + 2];
    
    // Animated sinc function: sinc(r + time) for ripple effect
    const r = Math.sqrt(x * x + z * z) * 0.15 + time;
    const sincValue = r === 0 ? 40 : (Math.sin(r) / (r - time + 0.0001)) * 40;
    
    // Animated sinusoidal waves
    const sineWave = Math.sin((x + time) * 0.1) * Math.cos((z + time) * 0.1) * 8;
    
    // Combine both effects
    positions[i + 1] = sincValue + sineWave;
  }
  
  pointCloud.geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
}

// Smooth scroll functionality
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initSmoothScroll();
  });
} else {
  initThree();
  initSmoothScroll();
}
