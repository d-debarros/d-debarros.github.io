# Deployment Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   # Ruby/Jekyll dependencies
   bundle install
   
   # Node dependencies (for Three.js)
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   # or
   bundle exec jekyll serve --livereload
   ```

3. **View Site**
   Open `http://localhost:4000` in your browser

## GitHub Pages Deployment

This site is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Initial Setup

1. Ensure your repository is named `username.github.io` (where username is your GitHub username)
2. Go to Repository Settings → Pages
3. Source: Deploy from branch `main`
4. Wait 1-2 minutes for the build to complete
5. Your site will be live at `https://username.github.io`

### Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file in the root with your domain:
   ```
   danieldebarros.com
   ```

2. Configure DNS with your domain provider:
   - Type: A Record
   - Name: @
   - Value: 185.199.108.153 (and also add 185.199.109.153, 185.199.110.153, 185.199.111.153)
   
   - Type: CNAME
   - Name: www
   - Value: d-debarros.github.io

3. In GitHub Settings → Pages, enter your custom domain

## File Structure

```
Portfolio Site
├── _layouts/              # HTML templates
│   └── default.html       # Main layout
├── assets/
│   ├── styles.css         # All styles
│   ├── js/
│   │   ├── app.js         # Three.js animations
│   │   └── doom.js        # Doom game integration
│   ├── images/            # Image assets
│   ├── pdf/              # Resume and documents
│   └── videos/           # Video files
├── _config.yml           # Jekyll configuration
├── index.html            # Main page content
├── package.json          # Node dependencies
├── Gemfile              # Ruby dependencies
└── README.md            # Documentation
```

## Customization

### Updating Content

Edit [index.html](index.html) to modify sections. Each section follows this pattern:

```html
<section id="section-id" class="section">
  <div class="content-wrapper">
    <h2>Section Title</h2>
    <!-- Your content -->
  </div>
</section>
```

### Styling

All styles are in [assets/styles.css](assets/styles.css). Modify CSS custom properties at the top:

```css
:root {
  --primary-color: #e4e009;
  --secondary-color: #ffd700;
  /* etc. */
}
```

### Three.js Effects

Modify [assets/js/app.js](assets/js/app.js) to change:
- Point cloud density (width/depth variables)
- Colors (HSL values in createPointCloud)
- Animation speed (rotation increments)
- Wave effects (sin/cos calculations)

### Doom Game

To use your own Doom WAD:
1. Convert your WAD to `.jsdos` format using js-dos bundler
2. Host the file (GitHub releases, Cloudflare R2, etc.)
3. Update `doomUrl` in [assets/js/doom.js](assets/js/doom.js)

## Performance Tips

1. **Images**: Optimize all images before uploading
   - Use WebP format when possible
   - Compress with tools like TinyPNG
   - Use appropriate dimensions

2. **Three.js**: Adjust point cloud density for performance
   - Lower `width` and `depth` for better performance
   - Test on lower-end devices

3. **Doom**: Game loads only on user interaction
   - No performance impact until initialized
   - Consider adding size warnings for mobile users

## Troubleshooting

### Jekyll Build Errors

```bash
# Clear Jekyll cache
bundle exec jekyll clean

# Rebuild
bundle exec jekyll build
```

### Three.js Not Loading

Check browser console for errors. Ensure:
- Three.js CDN is accessible
- Browser supports WebGL
- No ad blockers interfering

### Doom Not Loading

- Verify js-dos CDN is accessible
- Check browser console for errors
- Ensure WAD URL is correct and accessible
- Test with shareware version first

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Edge, Safari)
- **WebGL Required**: For Three.js animations
- **ES6 Modules**: Used for JavaScript
- **Fallbacks**: Site degrades gracefully without JavaScript

## Security

- All external resources loaded via HTTPS
- No user data collected
- No cookies used
- CDN resources use SRI where possible

## Updates

To update dependencies:

```bash
# Update Ruby gems
bundle update

# Update npm packages
npm update
```

## Support

For issues or questions:
- Open an issue on GitHub
- Email: danieldb12@gmail.com

---

**Last Updated**: February 2026
