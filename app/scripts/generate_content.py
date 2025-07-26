#!/usr/bin/env python3
"""
Dynamic Content Generator

This script reads the config.yml file and generates both books and gear section HTML
for the index.html file. When products/books are added to the config, running
this script will automatically update the index.html file.

Usage:
    python generate_content.py
"""

import yaml
import re
from pathlib import Path
import markdown
from datetime import datetime
import math

def load_template(template_name):
    """Load a template file from the templates directory"""
    template_path = Path(__file__).parent.parent / 'templates' / f'{template_name}.html'
    with open(template_path, 'r', encoding='utf-8') as file:
        return file.read()

def load_config():
    """Load the configuration from config.yml"""
    config_path = Path(__file__).parent.parent / 'config.yml'
    with open(config_path, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

def estimate_reading_time(content):
    """Estimate reading time in minutes based on word count"""
    words = len(content.split())
    reading_time = math.ceil(words / 200)  # Assuming 200 words per minute
    return max(1, reading_time)  # Minimum 1 minute

def generate_tag_html(tag):
    """Generate HTML for a single tag with icon based on tag type"""
    icon_map = {
        'technical': 'fas fa-code',
        'data-engineering': 'fas fa-database',
        'python': 'fab fa-python',
        'orchestration': 'fas fa-cogs',
        'prefect': 'fas fa-stream',
        'tutorial': 'fas fa-graduation-cap',
        'guide': 'fas fa-book',
        'best-practices': 'fas fa-check-circle',
        'career': 'fas fa-briefcase',
        'development': 'fas fa-laptop-code',
        'cloud': 'fas fa-cloud',
        'architecture': 'fas fa-sitemap',
        'devops': 'fas fa-tools',
        'security': 'fas fa-shield-alt',
        'performance': 'fas fa-tachometer-alt',
        'testing': 'fas fa-vial',
        'deployment': 'fas fa-rocket',
        'monitoring': 'fas fa-chart-line',
        'automation': 'fas fa-robot',
        'infrastructure': 'fas fa-server',
    }
    
    # Get icon or default to tag icon
    icon = icon_map.get(tag.lower(), 'fas fa-tag')
    return f'<span class="tag"><i class="{icon}"></i> {tag}</span>'

def load_blog_post(post_path):
    """Load and parse a blog post markdown file"""
    with open(post_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Split content into frontmatter and body
    parts = content.split('---', 2)
    if len(parts) >= 3:
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2]
    else:
        frontmatter = {}
        body = content
    
    # Get post metadata from frontmatter or defaults
    post_name = frontmatter.get('title') or post_path.stem.replace('-', ' ').title()
    
    # Handle date from frontmatter or file modification time
    if 'date' in frontmatter:
        if isinstance(frontmatter['date'], datetime):
            post_date = frontmatter['date'].strftime('%B %d, %Y')
        elif isinstance(frontmatter['date'], str):
            try:
                post_date = datetime.strptime(frontmatter['date'], '%Y-%m-%d').strftime('%B %d, %Y')
            except ValueError:
                post_date = frontmatter['date']
        else:
            post_date = frontmatter['date'].strftime('%B %d, %Y')
    else:
        post_date = datetime.fromtimestamp(post_path.stat().st_mtime).strftime('%B %d, %Y')
    
    # Fix image paths in the markdown content to be relative to the root
    body = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', lambda m: f'![{m.group(1)}](/{m.group(2)})', body)
    
    # Convert markdown to HTML with extensions
    html_content = markdown.markdown(body, extensions=['fenced_code', 'tables', 'codehilite'])
    reading_time = estimate_reading_time(body)
    
    # Generate tags HTML with icons
    tags = frontmatter.get('tags', [])
    tags_html = ''.join(generate_tag_html(tag) for tag in tags) if tags else ''
    
    # Generate the blog post HTML using the template
    blog_content_template = load_template('blog_content')
    post_html = blog_content_template.format(
        title=post_name,
        date=post_date,
        reading_time=reading_time,
        content=html_content,
        tags_html=tags_html
    )
    
    # Save the HTML version in the blog directory
    html_path = post_path.parent / f'{post_path.stem}.html'
    with open(html_path, 'w', encoding='utf-8') as file:
        file.write(post_html)
    
    # Fix image path to be relative to root
    image_path = frontmatter.get('image_path')
    if image_path:
        image_path = f'/{image_path}' if not image_path.startswith('/') else image_path
    
    return {
        'title': post_name,
        'date': post_date,
        'description': frontmatter.get('description') or body.split('\n\n')[1][:200] + '...',
        'html_path': f'blog/{post_path.stem}.html',
        'image_path': image_path,
        'reading_time': reading_time
    }

def generate_blog_post_html(post):
    """Generate HTML for a single blog post preview"""
    blog_post_template = load_template('blog_post')
    
    # Generate image HTML based on whether an image is provided
    if post.get('image_path'):
        image_html = f'<img src="{post["image_path"]}" alt="{post["title"]}" class="blog-image">'
    else:
        image_html = '''
            <div class="blog-cover-fallback" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                <i class="fas fa-pen-fancy" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.9;"></i>
                <div style="font-size: 0.8rem; opacity: 0.9; font-weight: 500;">{date}</div>
            </div>
        '''.format(date=post['date'])
    
    return blog_post_template.format(
        title=post['title'],
        date=post['date'],
        description=post['description'],
        image_html=image_html,
        read_more_link=post['html_path']
    )

def generate_blog_section_html(config):
    """Generate the complete blog section HTML"""
    site_config = config.get('site', {})
    blog_config = config.get('blog', {})
    template = load_template('blog_list')
    
    # Get all markdown files in the blog directory
    blog_dir = Path(__file__).parent.parent / 'blog'
    blog_posts = []
    
    if blog_dir.exists():
        for post_file in blog_dir.glob('*.md'):
            blog_posts.append(load_blog_post(post_file))
    
    # Sort posts by date (newest first)
    blog_posts.sort(key=lambda x: datetime.strptime(x['date'], '%B %d, %Y'), reverse=True)
    
    # Generate blog posts content
    blog_posts_content = ""
    for post in blog_posts:
        blog_posts_content += '\n' + generate_blog_post_html(post)
    
    return template.format(
        blog_intro=site_config.get('blog_intro', 'Welcome to my blog where I share insights about technology, engineering, and personal growth.'),
        blog_posts_content=blog_posts_content
    )

def generate_book_html(book):
    """Generate HTML for a single book"""
    tag_template = load_template('tag')
    tags_html = ''.join(tag_template.format(tag=tag) for tag in book['tags'])
    template = load_template('book_item')
    
    return template.format(
        image_path=book['image_path'],
        name=book['name'],
        author=book['author'],
        description=book['description'],
        amazon_url=book['amazon_url'],
        fallback_gradient=book['fallback_gradient'],
        fallback_icon=book['fallback_icon'],
        tags_html=tags_html
    )

def generate_gear_html(product):
    """Generate HTML for a single gear product"""
    tag_template = load_template('tag')
    tags_html = ''.join(tag_template.format(tag=tag) for tag in product['tags'])
    template = load_template('gear_item')
    
    return template.format(
        image_path=product['image_path'],
        name=product['name'],
        manufacturer=product['manufacturer'],
        description=product['description'],
        amazon_url=product['amazon_url'],
        fallback_gradient=product['fallback_gradient'],
        fallback_icon=product['fallback_icon'],
        tags_html=tags_html
    )

def generate_placeholder_html(category_name, icon, description):
    """Generate HTML for a placeholder (empty category)"""
    template = load_template('placeholder_item')
    first_word = category_name.split()[0]
    
    return template.format(
        category_name=category_name,
        icon=icon,
        description=description,
        first_word=first_word
    )

def generate_books_category_html(category):
    """Generate HTML for a books category"""
    template = load_template('category')
    
    # Check if category has any products
    has_products = category['products'] and len(category['products']) > 0
    
    content = ""
    if has_products:
        # Generate books directly from the category
        for book in category['products']:
            content += '\n' + generate_book_html(book)
    else:
        # Generate placeholder
        descriptions = {
            'Technical & Programming': 'Programming, architecture, and technical books',
            'Leadership & Personal Development': 'Leadership, management, and personal growth books',
            'Philosophy & Thinking': 'Philosophy, thinking, and mindset books'
        }
        description = descriptions.get(category['name'], 'Books for learning and growth')
        content += '\n' + generate_placeholder_html(category['name'], category['icon'], description)
    
    return template.format(
        icon=category['icon'],
        name=category['name'],
        content=content
    )

def generate_gear_category_html(category):
    """Generate HTML for a gear category"""
    template = load_template('category')
    
    # Check if category has any products
    has_products = category['products'] and len(category['products']) > 0
    
    content = ""
    if has_products:
        # Generate gear directly from the category
        for product in category['products']:
            content += '\n' + generate_gear_html(product)
    else:
        # Generate placeholder
        descriptions = {
            'Hardware': 'Laptops, monitors, keyboards, and other physical devices',
            'Apps': 'Software applications, productivity tools, and mobile apps'
        }
        description = descriptions.get(category['name'], 'Tools and utilities for productivity')
        content += '\n' + generate_placeholder_html(category['name'], category['icon'], description)
    
    return template.format(
        icon=category['icon'],
        name=category['name'],
        content=content
    )

def generate_philosophy_html(philosophy_items):
    """Generate HTML for philosophy section"""
    template = load_template('philosophy_section')
    item_template = load_template('philosophy_item')
    
    content = ""
    for item in philosophy_items:
        content += '\n' + item_template.format(
            icon=item['icon'],
            title=item['title'],
            description=item['description']
        )
    
    return template.format(content=content)

def generate_books_section_html(config):
    """Generate the complete books section HTML"""
    site_config = config['site']
    books_config = config['books']
    template = load_template('books_section')
    
    # Generate categories content
    categories_content = ""
    for category in books_config['categories']:
        categories_content += '\n' + generate_books_category_html(category)
    
    # Generate philosophy content
    philosophy_content = generate_philosophy_html(site_config['books_philosophy'])
    
    return template.format(
        books_intro=site_config['books_intro'],
        books_cta_text=site_config['books_cta_text'],
        categories_content=categories_content,
        philosophy_content=philosophy_content
    )

def generate_gear_section_html(config):
    """Generate the complete gear section HTML"""
    site_config = config['site']
    gear_config = config['gear']
    template = load_template('gear_section_clean')
    
    # Generate categories content
    categories_content = ""
    for category in gear_config['categories']:
        categories_content += '\n' + generate_gear_category_html(category)
    
    # Build optional sections conditionally
    optional_sections = ""
    
    # Only add CTA section if there's content
    if site_config['gear_cta_text'].strip():
        cta_template = load_template('cta_section')
        optional_sections += cta_template.format(cta_text=site_config['gear_cta_text'])
    
    # Only add philosophy section if there are items
    if site_config['gear_philosophy'] and len(site_config['gear_philosophy']) > 0:
        philosophy_content = generate_philosophy_html(site_config['gear_philosophy'])
        optional_sections += philosophy_content
    
    return template.format(
        gear_intro=site_config['gear_intro'],
        categories_content=categories_content,
        optional_sections=optional_sections
    )

def generate_complete_html(config):
    """Generate the complete index.html file from templates"""
    # Load all templates
    base_template = load_template('base')
    header_template = load_template('header')
    about_template = load_template('about')
    
    # Generate dynamic sections
    blog_html = generate_blog_section_html(config)
    books_html = generate_books_section_html(config)
    gear_html = generate_gear_section_html(config)
    
    # Combine everything
    complete_html = base_template.format(
        header_content=header_template,
        about_content=about_template,
        blog_content=blog_html,
        books_content=books_html,
        gear_content=gear_html
    )
    
    return complete_html

def write_index_html(html_content):
    """Write the complete HTML content to index.html"""
    index_path = Path(__file__).parent.parent / 'index.html'
    
    with open(index_path, 'w', encoding='utf-8') as file:
        file.write(html_content)
    
    return True

def main():
    """Main function to generate complete index.html from templates"""
    try:
        print("Loading configuration from config.yml...")
        config = load_config()
        
        print("Generating complete HTML from templates...")
        complete_html = generate_complete_html(config)
        
        print("Writing index.html...")
        success = write_index_html(complete_html)
        
        if success:
            print("✅ Successfully generated complete index.html from templates!")
            
            # Count products for summary
            total_books = sum(
                len(category['products']) 
                for category in config['books']['categories']
            )
            total_gear = sum(
                len(category['products']) 
                for category in config['gear']['categories']
            )
            print(f"📚 Generated {len(config['books']['categories'])} book categories with {total_books} books")
            print(f"📦 Generated {len(config['gear']['categories'])} gear categories with {total_gear} products")
            print("🎯 Complete website generated from templates!")
        else:
            print("❌ Failed to generate index.html")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main()) 