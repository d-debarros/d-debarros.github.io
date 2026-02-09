# Daniel de Barros - Portfolio Website

A modern, single-page scrolling portfolio website featuring Three.js animations and an embedded Doom game.

## 🚀 Features

- **Single-Page Scrolling**: Smooth scrolling experience across multiple sections
- **Three.js Background**: Dynamic, interactive 3D point cloud animation that responds to mouse movement and scroll
- **Doom Game**: Play the classic Doom game directly in your browser with minimal resource overhead
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Lazy loading for heavy resources, efficient rendering

## 📁 Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Main layout template
├── _includes/
│   └── threejs_component.html # Legacy Three.js component (can be removed)
├── assets/
│   ├── styles.css           # Main stylesheet
│   ├── js/
│   │   ├── app.js          # Three.js initialization and animations
│   │   └── doom.js         # Doom game integration
│   ├── images/
│   ├── pdf/
│   └── videos/
├── index.html               # Main single-page content
├── package.json
└── Gemfile

```

## 🛠️ Technologies

- **Jekyll**: Static site generator for GitHub Pages
- **Three.js**: 3D graphics library for the animated background
- **js-dos**: DOS emulator in JavaScript for running Doom
- **Modern CSS**: CSS Grid, Flexbox, custom properties, animations

## 🎮 Doom Integration

The Doom game uses js-dos v7 which provides:
- Minimal resource overhead through lazy loading
- Only loads when user clicks "Load Doom" button
- Uses WebAssembly for efficient emulation
- Loads Doom shareware by default (can be customized)

### Customizing Doom

To use your own Doom WAD file:
1. Host your WAD file on a CDN or in the assets folder
2. Update the `doomUrl` in `assets/js/doom.js`
3. Ensure the file is in `.jsdos` format (use js-dos bundler)

## 🎨 Customization

### Colors

Update CSS custom properties in `assets/styles.css`:

```css
:root {
  --primary-color: #e4e009;
  --secondary-color: #ffd700;
  --text-color: #ffffff;
  --bg-color: #000000;
}
```

### Sections

Modify sections in `index.html`. Each section follows this structure:

```html
<section id="section-name" class="section">
  <div class="content-wrapper">
    <!-- Your content here -->
  </div>
</section>
```

### Three.js Animation

Customize the point cloud in `assets/js/app.js`:
- Adjust `width` and `depth` for density
- Modify color gradients
- Change rotation speeds and wave effects

## 🚀 Development

### Prerequisites

- Ruby (for Jekyll)
- Node.js (for Three.js via npm)

### Setup

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:4000`

### Building

```bash
# Build for production
npm run build
```

## 📦 Deployment

This site is designed for GitHub Pages. Simply push to the `main` branch and GitHub will automatically build and deploy.

### GitHub Pages Setup

1. Ensure repository name is `username.github.io`
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch
4. Custom domain (optional): Add CNAME file with your domain

## ⚡ Performance

- Three.js uses `requestAnimationFrame` for smooth 60fps animations
- Doom loads only on user interaction (lazy loading)
- CSS animations use `transform` and `opacity` for GPU acceleration
- Images and iframes use lazy loading where supported

## 🎯 Roadmap

- [ ] Add more interactive Three.js effects
- [ ] Implement dark/light theme toggle
- [ ] Add more retro games
- [ ] Include project gallery section
- [ ] Add blog functionality
- [ ] Implement WebGL shader effects

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Daniel de Barros**
- Email: danieldb12@gmail.com
- GitHub: [@d-debarros](https://github.com/d-debarros)
- Location: Rotterdam, the Netherlands

---

Built with ❤️ and ☕ in Rotterdam
