// Interactive Resume JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the resume
    initNavigation();
    initAnimations();
    initSkillInteractions();
    initPrintFunction();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle hash changes (for direct navigation)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        }
    });

    // Check for initial hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        showSection(initialHash);
    }
}

function showSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Remove active class from all
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Activate target section and nav link
    const targetSection = document.getElementById(sectionId);
    const targetNavLink = document.querySelector(`[href="#${sectionId}"]`);
    
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

// Print functionality
function initPrintFunction() {
    // Add print button
    const header = document.querySelector('.header');
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
    
    printButton.addEventListener('click', function() {
        // Show all sections for printing
        const sections = document.querySelectorAll('.section');
        const originalDisplay = [];
        
        sections.forEach((section, index) => {
            originalDisplay[index] = section.style.display;
            section.style.display = 'block';
        });
        
        // Print
        window.print();
        
        // Restore original display
        sections.forEach((section, index) => {
            section.style.display = originalDisplay[index];
        });
    });
    
    if (header) {
        header.style.position = 'relative';
        header.appendChild(printButton);
    }
}

// Contact interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item a');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.href.startsWith('mailto:')) {
                // Add a small animation for email clicks
                this.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });

    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
});

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
    const sections = ['summary', 'experience', 'education', 'skills'];
    const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1);
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        e.preventDefault();
        showSection(sections[currentIndex + 1]);
        document.querySelector(`[href="#${sections[currentIndex + 1]}"]`).classList.add('active');
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        showSection(sections[currentIndex - 1]);
        document.querySelector(`[href="#${sections[currentIndex - 1]}"]`).classList.add('active');
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
        const sections = ['summary', 'experience', 'education', 'skills'];
        const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1);
        const currentIndex = sections.indexOf(currentSection);
        
        if (diff > 0 && currentIndex < sections.length - 1) {
            // Swipe left - next section
            showSection(sections[currentIndex + 1]);
            document.querySelector(`[href="#${sections[currentIndex + 1]}"]`).classList.add('active');
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous section
            showSection(sections[currentIndex - 1]);
            document.querySelector(`[href="#${sections[currentIndex - 1]}"]`).classList.add('active');
        }
    }
} 