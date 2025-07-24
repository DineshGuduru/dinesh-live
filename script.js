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
        if (hash && ['resume', 'books', 'gear'].includes(hash)) {
            showMainSection(hash);
        }
    });

    // Check for initial hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && ['resume', 'books', 'gear'].includes(initialHash)) {
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



// Social links interactions
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.email-link');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('data-email');
            
            // Try to copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showEmailCopiedToast();
                }).catch(() => {
                    // Fallback to opening email client
                    window.location.href = `mailto:${email}`;
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showEmailCopiedToast();
                } catch (err) {
                    // Last resort - open email client
                    window.location.href = `mailto:${email}`;
                }
                document.body.removeChild(textArea);
            }
            
            // Add animation
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
    // Show toast notification
    function showEmailCopiedToast() {
        // Remove any existing toast
        const existingToast = document.querySelector('.email-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = 'email-toast';
        toast.textContent = 'Email copied to clipboard!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Add toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
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
    const currentMainSection = document.querySelector('.main-section.active')?.id;
    const mainSections = ['resume', 'books', 'gear'];
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
        const mainSections = ['resume', 'books', 'gear'];
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