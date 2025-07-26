// Interactive Resume JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initMainNavigation();
    initAnimations();
    initSkillInteractions();
});

// Main Navigation functionality (Resume, Books, Gear)
function initMainNavigation() {
    const mainNavLinks = document.querySelectorAll('.main-nav-link');
    const mainSections = document.querySelectorAll('.main-section');

    mainNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all main nav links and sections
            mainNavLinks.forEach(l => l.classList.remove('active'));
            mainSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding main section
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update URL hash
                window.location.hash = targetId;
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle hash changes for main navigation
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && ['about', 'books', 'gear'].includes(hash)) {
            showMainSection(hash);
        }
    });

    // Check for initial hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && ['about', 'books', 'gear'].includes(initialHash)) {
        showMainSection(initialHash);
    }
}

function showMainSection(sectionId) {
    const mainNavLinks = document.querySelectorAll('.main-nav-link');
    const mainSections = document.querySelectorAll('.main-section');
    
    // Remove active class from all
    mainNavLinks.forEach(l => l.classList.remove('active'));
    mainSections.forEach(s => s.classList.remove('active'));
    
    // Activate target section and nav link
    const targetSection = document.getElementById(sectionId);
    const targetNavLink = document.querySelector(`[data-target="${sectionId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
}



// Animation functionality
function initAnimations() {
    // Add stagger animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
    });

    // Add typing effect to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const nameText = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            nameElement.textContent += nameText.charAt(i);
            i++;
            if (i >= nameText.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
}

// Skill interactions
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add click interaction to skills
    [...skillItems, ...skillTags].forEach(skill => {
        skill.addEventListener('click', function() {
            // Add a pulse animation
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}


// Smooth scrolling for all internal links
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

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const currentMainSection = document.querySelector('.main-section.active')?.id;
    const mainSections = ['about', 'books', 'gear'];
    const currentIndex = mainSections.indexOf(currentMainSection);
    
    if (e.key === 'ArrowRight' && currentIndex < mainSections.length - 1) {
        e.preventDefault();
        showMainSection(mainSections[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        showMainSection(mainSections[currentIndex - 1]);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Mobile touch gestures
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const currentMainSection = document.querySelector('.main-section.active')?.id;
        const mainSections = ['about', 'books', 'gear'];
        const currentIndex = mainSections.indexOf(currentMainSection);
        
        if (diff > 0 && currentIndex < mainSections.length - 1) {
            // Swipe left - next section
            showMainSection(mainSections[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous section
            showMainSection(mainSections[currentIndex - 1]);
        }
    }
} 

// Function to show a section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.main-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        setTimeout(() => selectedSection.classList.add('active'), 50);
    }
    
    // Update navigation links
    document.querySelectorAll('.main-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Function to show loading state
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading blog post...</span>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

// Function to hide loading state
function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Function to show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Function to get base URL
function getBaseUrl() {
    return window.location.origin;
}

// Function to load and show blog post content
async function loadBlogPost(url) {
    showLoading();
    
    try {
        // Ensure we're using an absolute URL
        const absoluteUrl = url.startsWith('http') ? url : `${getBaseUrl()}/${url}`;
        const response = await fetch(absoluteUrl);
        if (!response.ok) throw new Error('Failed to load blog post');
        const html = await response.text();
        
        // Extract the blog content section
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const blogContent = tempDiv.querySelector('#blog-content');
        
        if (blogContent) {
            // Create or get the blog content container
            let blogContentSection = document.getElementById('blog-content');
            if (!blogContentSection) {
                blogContentSection = document.createElement('div');
                blogContentSection.id = 'blog-content';
                blogContentSection.className = 'main-section';
                document.querySelector('main').appendChild(blogContentSection);
            }
            
            // Update the content
            blogContentSection.innerHTML = blogContent.innerHTML;
            
            // Show the blog content section
            showSection('blog-content');
            
            // Update URL without triggering a page reload
            const postName = url.split('/').pop().replace('.html', '');
            history.pushState({}, '', `#blog/${postName}`);
            
            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            throw new Error('Invalid blog post content');
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
        showError('Failed to load blog post. Please try again.');
        showSection('blog');
    } finally {
        hideLoading();
    }
}

// Event delegation for dynamic content
document.addEventListener('click', (event) => {
    // Handle navigation links
    if (event.target.closest('.main-nav-link')) {
        event.preventDefault();
        const link = event.target.closest('.main-nav-link');
        const target = link.getAttribute('data-target');
        showSection(target);
        history.pushState({}, '', `#${target}`);
    }
    
    // Handle blog post links
    const link = event.target.closest('.read-more-button');
    if (link) {
        event.preventDefault();
        const href = link.getAttribute('href');
        window.location.href = href;
    }
    
    // Handle back to blog link
    if (event.target.closest('.back-to-blog')) {
        event.preventDefault();
        showSection('blog');
        history.pushState({}, '', '#blog');
    }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('blog/')) {
        const postName = hash.replace('blog/', '');
        loadBlogPost(`blog/${postName}.html`);
    } else {
        showSection(hash || 'about');
    }
});

// Handle initial load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('blog/')) {
        const postName = hash.replace('blog/', '');
        loadBlogPost(`blog/${postName}.html`);
    } else {
        showSection(hash || 'about');
    }
}); 