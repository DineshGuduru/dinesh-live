# Interactive Resume - Dineshvarma Guduru

A modern, responsive, and interactive static website built with a dynamic template system powered by Docker.

## 🌟 Features

- **Dynamic Content System**: Complete website generated from YAML config and HTML templates
- **Blog System**: Markdown-based blog with automatic HTML conversion
- **Docker-Powered**: Full development and deployment workflow in Docker containers
- **Modern Design**: Clean, professional layout with beautiful gradients and animations
- **Interactive Navigation**: Smooth transitions between sections with keyboard and touch support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Template-Based**: Modular HTML templates for easy content management
- **Print-Friendly**: Dedicated print styles for PDF generation
- **Animations**: Smooth fade-in effects, typing animations, and hover interactions
- **Accessibility**: Keyboard navigation and semantic HTML structure
- **Touch Gestures**: Swipe navigation on mobile devices

## 🚀 Live

Visit the live site at: [https://dineshguduru.github.io/dinesh-live/](https://dineshguduru.github.io/dinesh-live/)

## 📁 Project Structure

```
dinesh-live/
├── .gitignore          # Git ignore rules (excludes generated files)
├── .nojekyll          # GitHub Pages configuration
├── requirements.txt    # Python dependencies for content generation
├── Makefile           # 🔧 Simplified build and deployment automation
├── app/               # 📱 APPLICATION SOURCE CODE
│   ├── config.yml          # 📊 Content configuration (books, gear, etc.)
│   ├── scripts/
│   │   └── generate_content.py # 🔄 HTML generator script
│   ├── templates/          # 📄 HTML template files
│   │   ├── base.html              # Complete HTML structure
│   │   ├── header.html            # Navigation & social links
│   │   ├── about.html             # About me section
│   │   ├── books_section.html     # Main books section template
│   │   ├── gear_section.html      # Gear section templates
│   │   ├── gear_section_clean.html
│   │   ├── book_item.html         # Individual item templates
│   │   ├── gear_item.html
│   │   ├── placeholder_item.html
│   │   ├── category.html          # Category section template
│   │   ├── cta_section.html       # Optional CTA section
│   │   ├── philosophy_section.html # Philosophy content
│   │   ├── philosophy_item.html
│   │   └── tag.html               # Individual tag template
│   ├── index.html         # 🔄 Generated from templates (not in git)
│   ├── style.css          # 🎨 Website styles
│   ├── script.js          # ⚡ Website JavaScript
│   └── images/            # 🖼️ Static images and assets
├── docker/            # 🐳 DOCKER CONFIGURATION
│   ├── Dockerfile     # Multi-stage container configuration
│   ├── docker-compose.yml # Orchestration setup
│   ├── docker-build.sh # Build automation script
│   ├── nginx.conf     # Web server configuration
│   └── .dockerignore  # Docker ignore patterns
├── LICENSE            # 📄 MIT License
└── README.md         # 📚 Project documentation
```

### 🏗️ Clean Architecture
- **Source Code**: Templates + YAML config drive everything
- **Generated Files**: `index.html` built fresh from templates in Docker
- **Docker Deployment**: GitHub Actions uses Docker to build and deploy
- **Zero Local Dependencies**: No Python setup needed - everything in Docker

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/dineshvarmaguduru/dinesh-live.git
cd dinesh-live

# 2. Start development (rebuilds website + serves)
make dev

# 3. Visit http://localhost:8080
```

**That's it!** One command does everything: rebuild website from templates → start server.

## 🛠️ Available Make Commands (Simplified!)

**🔥 Essential Commands:**
- `make dev` - 🚀 Main development workflow (rebuild + serve)
- `make push` - ⬆️ Deploy to GitHub Pages
- `make stop` - 🛑 Stop the server
- `make clean` - 🧹 Clean up Docker resources

**📊 Monitoring:**
- `make status` - 📈 Check container status
- `make logs` - 📋 View container logs

**🔧 Optional:**
- `make check` - ✅ Validate config.yml syntax

After running `make dev`, visit: **http://localhost:8080**

## 🔄 Dynamic Content System

This website uses a powerful template-based system where the entire `index.html` is generated from modular templates and YAML configuration - all within Docker containers.

### How It Works

1. **Templates**: HTML structures with `{variable_name}` placeholders
2. **Config**: YAML file (`app/config.yml`) contains all content data
3. **Docker Build**: Multi-stage build runs Python generation inside container
4. **String Replacement**: Placeholders get replaced with actual values
5. **Complete HTML**: Entire website generated and served by nginx

### Template System Benefits

- ✅ **No Local Setup**: Everything runs in Docker - no Python dependencies
- ✅ **Complete Generation**: Entire website built from templates
- ✅ **Maintainable**: HTML structure separated from data and logic
- ✅ **Production Ready**: Multi-stage Docker build for optimal performance
- ✅ **Version Controlled**: All templates and config tracked in git
- ✅ **Source of Truth**: Templates + Config (no `index.html` in git)

### Development Workflow

```bash
# Edit content or structure
vim app/config.yml              # Edit content (books, gear, etc.)
vim app/templates/base.html     # Edit HTML structure

# One command for everything
make dev     # Rebuilds complete website + starts server
```

**Production workflow:**
```bash
make push    # Commit changes + deploy to GitHub Pages
```

### Content Configuration

#### Adding New Books
Edit `app/config.yml`:
```yaml
books:
  categories:
    - name: "Technical"
      icon: "fas fa-code"
      products:
        - name: "New Book Title"
          manufacturer: "Author Name"
          description: "Book description"
          image_path: "images/books/technical/book-cover.jpg"
          amazon_url: "https://amzn.to/XXXXXX"
          tags: ["Programming", "Technology"]
```

#### Adding New Gear
```yaml
gear:
  categories:
    - name: "Hardware"
      icon: "fas fa-laptop"
      products:
        - name: "New Product"
          manufacturer: "Brand Name"
          description: "Product description"
          image_path: "images/hardware/product.jpg"
          amazon_url: "https://amzn.to/XXXXXX"
          tags: ["Hardware", "Productivity"]
          fallback_icon: "fas fa-device"
          fallback_gradient: "linear-gradient(135deg, #667eea, #764ba2)"
```

#### Creating New Categories
```yaml
- name: "Software"
  icon: "fas fa-download"
  products:
    - # ... product details
```

## 📝 Blog System

The website includes a powerful blog system that converts Markdown files to HTML and integrates them seamlessly into the site.

### Creating Blog Posts

```bash
# Create a new blog post
make blog

# Enter the blog post title when prompted
# This will create a new .md file in app/blog/
```

### Blog Post Structure

```markdown
---
title: Your Blog Post Title
date: 2024-03-22
tags: [tag1, tag2, tag3]
description: A brief description of your blog post
---

# Your Blog Post Title

Your blog post content here in Markdown format...
```

### Blog Features

- **Markdown Support**: Write posts in Markdown for easy formatting
- **Automatic Conversion**: Posts are automatically converted to HTML
- **Reading Time**: Automatically calculated based on content length
- **Responsive Design**: Beautiful layout on all devices
- **Code Highlighting**: Syntax highlighting for code blocks
- **Image Support**: Full support for blog post images
- **Tags**: Categorize posts with tags
- **Navigation**: Easy navigation between posts and blog list

### Blog Post Images

Place blog post images in `app/images/blog/` directory:
```
app/images/blog/
├── post-1-image.jpg
├── post-2-image.jpg
└── default-blog-image.jpg
```

### Customizing Blog Layout

1. **Blog List**: Edit `app/templates/blog_list.html`
2. **Blog Post**: Edit `app/templates/blog_post.html`
3. **Blog Styles**: Customize in `app/style.css`
4. **Blog Behavior**: Update in `app/script.js`

## 🛠️ Technologies Used

- **Template System**: Python + YAML for dynamic content generation
- **Docker**: Multi-stage builds for development and deployment
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Nginx**: Production web server
- **Font Awesome**: Icons for visual elements
- **Google Fonts**: Inter font family for typography

## 🎨 Key Features Breakdown

### Dynamic Content Management
- YAML-driven content configuration
- Template-based HTML generation
- Docker-powered build system
- No local Python dependencies required

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
- Flexible grid layouts (4 items per row on desktop)
- Optimized typography scaling
- Touch-friendly interface elements

### Print Functionality
- Dedicated print button
- Print-optimized styles
- Shows all sections when printing
- Clean black and white design for printing

## 🚀 Docker-Powered Deployment

This project uses **GitHub Actions with Docker** for seamless deployment to GitHub Pages:

### How Deployment Works
1. **Push to main** → Triggers GitHub Actions workflow
2. **Docker Build** → Multi-stage build generates complete website
3. **Extract & Deploy** → Copies built files to GitHub Pages
4. **Live Site** → Automatically updates at your GitHub Pages URL

### Local Docker Testing
```bash
# Everything in one command
make dev        # Rebuild website + serve at http://localhost:8080
```

### Container Features
- ✅ Nginx web server with optimized configuration
- ✅ Multi-stage build (Python generator + Nginx server)
- ✅ Gzip compression for faster loading
- ✅ Security headers configured
- ✅ Static file caching optimization
- ✅ Health checks for container monitoring
- ✅ Auto-restart on failure
- ✅ Production-ready setup

### Deployment Status
- **Workflow**: Check deployment progress at `https://github.com/DineshGuduru/dinesh-live/actions`
- **Live Site**: [https://dineshguduru.github.io/dinesh-live/](https://dineshguduru.github.io/dinesh-live/)

## 🔧 Advanced Usage

### Custom Categories
You can create any category structure you want:
- Hardware
- Software  
- Books
- Courses
- Services
- Subscriptions

### Bulk Content Updates
To update multiple items at once, edit the `config.yml` file with all your changes and run `make dev` once.

### Integration with CI/CD
You can integrate this into your deployment pipeline:
```bash
make dev && git add . && git commit -m "Update website content"
```

### Template Customization
1. **Structure**: Edit templates in `app/templates/`
2. **Styling**: Modify `app/style.css`
3. **Behavior**: Update `app/script.js`
4. **Content**: Configure `app/config.yml`

## 🔍 Troubleshooting

### Docker build fails
- Run `make clean` to clear Docker resources
- Ensure Docker is running and you have sufficient disk space
- Check that all template files exist in `app/templates/`

### Website not updating
- Docker caches builds - use `make clean` then `make dev`
- Check YAML syntax in `config.yml` with `make check`
- Verify config.yml is properly formatted

### Images not loading
- Verify image files exist in the specified paths (relative to `app/`)
- Check image file permissions in the Docker container
- Fallback icons will automatically show if images fail to load

## 🎯 Customization

### Updating Content
1. **Books/Gear**: Edit `app/config.yml`
2. **About Section**: Edit `app/templates/about.html`
3. **Site Structure**: Edit `app/templates/base.html`
4. **Styling**: Customize colors and fonts in `app/style.css`

### Color Scheme
The site uses a purple gradient theme. To change colors, update these CSS variables:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* You can replace with your preferred colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Adding New Sections
1. Create new template in `app/templates/`
2. Add section to `app/templates/base.html`
3. Update the Python generator in `app/scripts/generate_content.py`
4. Add custom styling in `app/style.css` if needed

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
- Docker for containerization technology
- CSS-Tricks and MDN for web development resources

---

**Built with ❤️ by Dineshvarma Guduru** 
