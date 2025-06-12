// Enhanced animations for the entire website

document.addEventListener('DOMContentLoaded', function() {
    // Page load animations
    animatePageLoad();
    
    // Scroll animations
    initScrollAnimations();
    
    // Button hover animations
    initButtonAnimations();
    
    // Product card animations
    initProductCardAnimations();
    
    // Logo animation
    animateLogo();
    
    // Navigation hover effects
    initNavAnimations();
    
    // Cart icon animation
    initCartIconAnimation();
});

// Page load animation sequence
function animatePageLoad() {
    // Header elements animation
    anime({
        targets: 'header .logo, nav ul li, .cart-icon',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(100)
    });
    
    // Hero section animation with sequential elements
    anime.timeline({
        easing: 'easeOutQuad',
        duration: 800
    })
    .add({
        targets: '.hero h1',
        opacity: [0, 1],
        translateY: [50, 0],
    })
    .add({
        targets: '.hero p',
        opacity: [0, 1],
        translateY: [30, 0],
    }, '-=600')
    .add({
        targets: '.hero .button',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1]
    }, '-=600');
    
    // Animate main content sections with staggered timing
    const mainSections = document.querySelectorAll('section:not(.hero)');
    mainSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Different animation based on element type
                if (entry.target.classList.contains('benefit-card') || 
                    entry.target.classList.contains('benefit-detailed')) {
                    // Benefit cards pop-in effect
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        scale: [0.8, 1],
                        easing: 'easeOutElastic(1, .6)',
                        duration: 800
                    });
                } else if (entry.target.classList.contains('product-card')) {
                    // Product cards slide-up effect
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [60, 0],
                        easing: 'easeOutQuad',
                        duration: 600
                    });
                } else if (entry.target.tagName === 'SECTION') {
                    // Section fade-in effect
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        easing: 'easeOutQuad',
                        duration: 800
                    });
                } else {
                    // Default fade-in effect for other elements
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        easing: 'easeOutQuad',
                        duration: 600
                    });
                }
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections and fade-in elements
    document.querySelectorAll('section:not(.hero), .fade-in, .benefit-card, .product-card, .benefit-detailed, .comparison-table-container, .testimonial, .step').forEach(element => {
        fadeObserver.observe(element);
    });
}

// Button animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        // Hover animation
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                translateY: -3,
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        // Leave animation
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                translateY: 0,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        // Click animation
        button.addEventListener('click', () => {
            anime({
                targets: button,
                scale: [1, 0.95, 1],
                duration: 400,
                easing: 'easeInOutBack'
            });
        });
    });
}

// Product card animations
function initProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Animate the card
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Animate the button inside the card
            const button = card.querySelector('.button');
            if (button) {
                anime({
                    targets: button,
                    scale: 1.05,
                    backgroundColor: '#3a5a40',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
            
            // Animate the product image
            const image = card.querySelector('.product-image');
            if (image) {
                anime({
                    targets: image,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Animate the card back
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Animate the button inside the card back
            const button = card.querySelector('.button');
            if (button) {
                anime({
                    targets: button,
                    scale: 1,
                    backgroundColor: '#3a5a40',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
            
            // Animate the product image back
            const image = card.querySelector('.product-image');
            if (image) {
                anime({
                    targets: image,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
}

// Logo animation
function animateLogo() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            anime({
                targets: logo,
                scale: 1.1,
                rotate: '2deg',
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            anime({
                targets: logo,
                scale: 1,
                rotate: '0deg',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    }
}

// Navigation animations
function initNavAnimations() {
    const navItems = document.querySelectorAll('nav ul li a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                translateY: -3,
                color: '#00c6ff',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                translateY: 0,
                color: '#ffffff',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Cart icon animation
function initCartIconAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('mouseenter', () => {
            anime({
                targets: cartIcon.querySelector('i'),
                scale: 1.2,
                rotate: ['0deg', '10deg', '-5deg', '0deg'],
                duration: 500,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        cartIcon.addEventListener('mouseleave', () => {
            anime({
                targets: cartIcon.querySelector('i'),
                scale: 1,
                rotate: '0deg',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    }
}

// Add to cart animation
function animateAddToCart() {
    // Create a floating element that moves to the cart
    const productImage = document.querySelector('.product-main-image img');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (productImage && cartIcon) {
        // Get positions
        const productRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        
        // Create floating element
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-product';
        floatingEl.style.position = 'fixed';
        floatingEl.style.zIndex = '1000';
        floatingEl.style.width = '50px';
        floatingEl.style.height = '50px';
        floatingEl.style.borderRadius = '50%';
        floatingEl.style.backgroundImage = `url(${productImage.src})`;
        floatingEl.style.backgroundSize = 'cover';
        floatingEl.style.backgroundPosition = 'center';
        floatingEl.style.left = `${productRect.left + productRect.width/2 - 25}px`;
        floatingEl.style.top = `${productRect.top + productRect.height/2 - 25}px`;
        
        document.body.appendChild(floatingEl);
        
        // Animate floating element to cart
        anime({
            targets: floatingEl,
            left: cartRect.left + cartRect.width/2 - 25,
            top: cartRect.top + cartRect.height/2 - 25,
            scale: [1, 0.5],
            opacity: [1, 0],
            easing: 'easeOutQuad',
            duration: 800,
            complete: function() {
                document.body.removeChild(floatingEl);
                
                // Animate cart icon
                anime({
                    targets: cartIcon,
                    scale: [1, 1.2, 1],
                    duration: 400,
                    easing: 'easeOutBack'
                });
            }
        });
    }
}

// Page transition animations
function pageTransitionOut() {
    return anime({
        targets: 'body',
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutQuad',
        complete: function() {
            // Navigation would happen here in a real implementation
        }
    }).finished;
}

function pageTransitionIn() {
    return anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    }).finished;
}

// Export functions for use in other scripts
window.siteAnimations = {
    animateAddToCart: animateAddToCart,
    pageTransitionOut: pageTransitionOut,
    pageTransitionIn: pageTransitionIn
};
