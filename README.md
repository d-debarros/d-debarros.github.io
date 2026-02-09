# Daniel de Barros Portfolio

A modern, single-page portfolio website built with Jekyll and Three.js, featuring animated mathematical visualizations.

## Features

- **Single-Page Design**: Smooth scrolling navigation through sections
- **Three.js Animation**: Dynamic sinc and sinusoidal wave visualizations in the background
- **Terminal Aesthetic**: Minimalist console-style navigation and typography
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Dark Theme**: Clean, low-distraction color scheme with IBM Plex Mono font

## Sections

- **Hero**: Title display with animated background
- **About**: Personal background and information
- **Experience**: Professional history and expertise
- **Music**: Spotify playlist integration
- **Activities**: Strava activity feed
- **Contact**: Social links and contact information

## Local Development

### Prerequisites

- Ruby 3.4.0+
- Node.js (for Three.js imports)
- Bundler

### Setup

```bash
# Install dependencies
bundle install
npm install

# Serve locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

## Technology Stack

- **Jekyll** 3.9.5 - Static site generator
- **Three.js** 0.165.0 - WebGL visualization
- **CSS3** - Styling with custom properties
- **JavaScript (ES6)** - Animation and interactivity

## Project Structure

```
├── assets/
│   ├── js/
│   │   ├── app.js        # Three.js setup and animation
│   │   └── doom.js       # (deprecated)
│   ├── styles.css        # Main stylesheet
│   ├── images/           # Image assets
│   └── pdf/              # Resume and documents
├── _layouts/             # Jekyll templates
├── _includes/            # Reusable HTML components
├── _config.yml           # Jekyll configuration
└── index.html            # Main page
```

## Customization

### Changing Colors

Edit the CSS variables in `assets/styles.css`:

```css
:root {
  --primary-color: #e4e009;
  --secondary-color: #ffd700;
  --text-color: #ffffff;
  --bg-color: #000000;
}
```

### Modifying Three.js Animation

Edit `assets/js/app.js`:

- **Camera Position**: Line 21-23
- **Wave Amplitude**: `createPointCloud()` function
- **Animation Speed**: `animate()` function
- **Initial Rotation**: `pointCloud.rotation.x = Math.PI / 4;`

## Deployment

This site is configured for deployment to GitHub Pages via the `gh-pages` branch.

```bash
# Build and deploy
bundle exec jekyll build
```

## License

Personal portfolio - contact for usage rights.

## Author

Daniel de Barros | [LinkedIn](https://www.linkedin.com/in/daniel-de-barros/) | [GitHub](https://github.com/d-debarros)
