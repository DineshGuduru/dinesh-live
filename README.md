# Interactive Resume - Dineshvarma Guduru

A modern, responsive, and interactive resume website built with HTML, CSS, and JavaScript.

## 🌟 Features

- **Modern Design**: Clean, professional layout with beautiful gradients and animations
- **Interactive Navigation**: Smooth transitions between sections with keyboard and touch support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Print-Friendly**: Dedicated print styles for PDF generation
- **Animations**: Smooth fade-in effects, typing animations, and hover interactions
- **Accessibility**: Keyboard navigation and semantic HTML structure
- **Touch Gestures**: Swipe navigation on mobile devices

## 🚀 Live

Visit the live resume at: [https://dineshguduru.github.io/dinesh-live/](https://dineshguduru.github.io/dinesh-live/)

## 📁 Project Structure

```
dinesh-live/
├── app/                # Application files
│   ├── index.html      # Main HTML structure
│   ├── style.css       # CSS styles and animations
│   ├── script.js       # JavaScript functionality
│   └── images/         # Static images and assets
├── docker/             # Docker configuration
│   ├── Dockerfile      # Docker container configuration
│   ├── docker-compose.yml # Docker orchestration
│   ├── docker-build.sh # Docker build script
│   ├── nginx.conf      # Nginx web server configuration
│   └── .dockerignore   # Docker ignore patterns
├── Makefile           # Build and deployment automation
├── README.md          # Project documentation
└── LICENSE            # License file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons for visual elements
- **Google Fonts**: Inter font family for typography

## 🎨 Key Features Breakdown

### Interactive Navigation
- Tabbed interface for easy section browsing
- Smooth scrolling between sections
- URL hash support for direct linking
- Keyboard navigation (left/right arrow keys)
- Touch swipe gestures on mobile

### Animations
- Typing effect for the name display
- Staggered fade-in animations for experience items
- Hover effects on interactive elements
- Smooth transitions between sections

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly interface elements

### Print Functionality
- Dedicated print button
- Print-optimized styles
- Shows all sections when printing
- Clean black and white design for printing

## 🚀 GitHub Pages Setup

This website is automatically deployed using GitHub Pages. Here's how it was set up:

### Automatic Deployment
1. The repository is configured to deploy from the `main` branch
2. GitHub Pages automatically serves the `index.html` file
3. All assets (CSS, JS) are served directly from the repository
4. The site updates automatically when changes are pushed to `main`

### Custom Domain (Optional)
To set up a custom domain:
1. Go to repository Settings → Pages
2. Add your custom domain in the "Custom domain" field
3. Create a CNAME record with your DNS provider pointing to `username.github.io`

## 💻 Local Development

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/dineshvarmaguduru/dinesh-live.git
   cd dinesh-live
   ```

2. **Open in browser**
   - Simply open `app/index.html` in your web browser
   - Or use a local server for better development experience:
   
   ```bash
   # Using Python 3
   cd app && python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   cd app && npx live-server
   
   # Using PHP
   cd app && php -S localhost:8000
   ```

3. **Access the site**
   - Open `http://localhost:8000` in your browser

## ⚡ Quick Start with Makefile

This project includes a Makefile for simplified development workflow:

```bash
# Start the server in one command
make run

# View all available commands
make help
```

### Available Make Commands
- `make run` - Start the website server (Docker)
- `make build` - Build the Docker image  
- `make stop` - Stop the running container
- `make deploy` - Deploy to GitHub Pages (commit & push)
- `make status` - Check container status
- `make logs` - View container logs
- `make clean` - Clean up Docker resources and deployment artifacts
- `make clean-deploy` - Clean deployment artifacts only
- `make dev` - Start local development server (Python)

After running `make run`, visit: **http://localhost:8080**

## 🐳 Docker Development

This project includes a complete Docker setup for easy deployment and development.

### Docker Files Overview
- `docker/Dockerfile` - Creates an nginx-based container
- `docker/docker-compose.yml` - Orchestration configuration  
- `docker/docker-build.sh` - Automated build script
- `docker/nginx.conf` - Custom nginx configuration

### Method 1: Using the Build Script (Easiest)
```bash
# Make the script executable and run it
chmod +x docker/docker-build.sh
cd docker && ./docker-build.sh
```

This will build the image and display next steps.

### Method 2: Using Docker Compose (Recommended)
```bash
# Build and start the container
docker compose -f docker/docker-compose.yml up -d

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop the container
docker compose -f docker/docker-compose.yml down
```

### Method 3: Manual Docker Commands
```bash
# Build the image
docker build -t dinesh-live:latest .

# Run the container
docker run -p 8080:80 dinesh-live:latest

# Or run in detached mode
docker run -d -p 8080:80 --name dinesh-live dinesh-live:latest
```

### Access Your Dockerized Website
After running any of the above methods, visit: **http://localhost:8080**

### Container Features
- ✅ Nginx web server with optimized configuration
- ✅ Gzip compression for faster loading
- ✅ Security headers configured
- ✅ Static file caching optimization
- ✅ Health checks for container monitoring
- ✅ Auto-restart on failure
- ✅ Production-ready setup

### Docker Environment
- **Base Image**: nginx:alpine (lightweight)
- **Port**: 8080 (host) → 80 (container)
- **Health Check**: Automated container health monitoring
- **Labels**: Traefik-ready for reverse proxy setups

## 🎯 Customization

### Updating Content
1. **Personal Information**: Edit the contact details in `index.html`
2. **Experience**: Update the experience items in the HTML structure
3. **Skills**: Modify the skills grid to reflect your technologies
4. **Styling**: Customize colors and fonts in `style.css`

### Color Scheme
The site uses a purple gradient theme. To change colors, update these CSS variables:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* You can replace with your preferred colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Adding New Sections
1. Add new section HTML in `index.html`
2. Add corresponding navigation link
3. Update the JavaScript sections array
4. Add custom styling if needed

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: CSS Grid, Flexbox, ES6+ JavaScript features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: dineshvarma.guduru@gmail.com
- **LinkedIn**: [linkedin.com/in/dineshvarma-guduru](https://www.linkedin.com/in/dineshvarma-guduru/)
- **GitHub**: [github.com/dineshvarmaguduru](https://github.com/dineshvarmaguduru)

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the Inter font family
- GitHub Pages for free hosting
- CSS-Tricks and MDN for web development resources

---

**Built with ❤️ by Dineshvarma Guduru** 