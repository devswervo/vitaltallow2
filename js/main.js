// Main JavaScript for Tallow Lotion Shop

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Scroll animations using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Testimonial slider
    const testimonials = [
        {
            text: "I've struggled with eczema for years. After just one week of using this tallow lotion, my skin is calmer and more hydrated than it's been in decades.",
            author: "Sarah K."
        },
        {
            text: "As someone with sensitive skin, I've tried countless 'natural' products that still caused irritation. This tallow lotion is the real deal - no reaction, just soft, healthy skin.",
            author: "Michael T."
        },
        {
            text: "The difference between this and store-bought lotions is night and day. My skin actually feels nourished instead of just temporarily moisturized.",
            author: "Jennifer L."
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;
    
    if (testimonialSlider) {
        // Initialize with first testimonial
        updateTestimonial();
        
        // Change testimonial every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
    }
    
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        // Use anime.js for smooth transition
        anime({
            targets: '.testimonial',
            opacity: [1, 0],
            translateY: [0, -20],
            easing: 'easeInOutQuad',
            duration: 500,
            complete: function() {
                testimonialSlider.innerHTML = `
                    <div class="testimonial" style="opacity: 0; transform: translateY(20px);">
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <p class="testimonial-author">- ${testimonial.author}</p>
                    </div>
                `;
                
                anime({
                    targets: '.testimonial',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    easing: 'easeInOutQuad',
                    duration: 500
                });
            }
        });
    }
    
    // Add animations using anime.js
    // Hero section animation
    anime({
        targets: '.hero-content h1, .hero-content p, .hero-content .button',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200),
        easing: 'easeOutQuad',
        duration: 800
    });
    
    // Benefits cards hover effect
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.benefit-icon'),
                scale: [1, 1.2],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card.querySelector('.benefit-icon'),
                scale: [1.2, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Product cards hover animation
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Shopping cart functionality
    initializeCart();
});

// Cart functionality
function initializeCart() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('tallowCart')) || [];
    
    // Update cart count
    updateCartCount(cart);
    
    // Add to cart functionality on product page
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productTitle = document.querySelector('.product-info h1').textContent;
            const productPrice = parseFloat(document.querySelector('.product-price').textContent.replace('$', ''));
            const selectedSize = document.querySelector('.size-option.active').dataset.size;
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            
            // Create product object
            const product = {
                id: Date.now().toString(),
                title: productTitle,
                price: productPrice,
                size: selectedSize,
                quantity: quantity,
                image: document.querySelector('.product-main-image img').src
            };
            
            // Add to cart
            cart.push(product);
            
            // Save to localStorage
            localStorage.setItem('tallowCart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount(cart);
            
            // Show confirmation message
            showCartConfirmation();
        });
    }
    
    // Size selection on product page
    const sizeOptions = document.querySelectorAll('.size-option');
    
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update price based on selected size
                updateProductPrice(this.dataset.size);
            });
        });
        
        // Set first size as active by default
        sizeOptions[0].classList.add('active');
        updateProductPrice(sizeOptions[0].dataset.size);
    }
    
    // Quantity selector on product page
    const quantityPlus = document.querySelector('.quantity-plus');
    const quantityMinus = document.querySelector('.quantity-minus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (quantityPlus && quantityMinus && quantityInput) {
        quantityPlus.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
        });
        
        quantityMinus.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
    }
    
    // Render cart page if on cart.html
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cartItemsContainer) {
        renderCart(cart, cartItemsContainer);
    }
}

function updateCartCount(cart) {
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animate the cart count when it changes
        anime({
            targets: '.cart-count',
            scale: [1, 1.5, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .5)'
        });
    }
}

function updateProductPrice(size) {
    const priceElement = document.querySelector('.product-price');
    
    if (priceElement) {
        let price;
        
        switch(size) {
            case '2oz':
                price = 14.99;
                break;
            case '4oz':
                price = 24.99;
                break;
            case '8oz':
                price = 39.99;
                break;
            default:
                price = 24.99;
        }
        
        priceElement.textContent = `$${price.toFixed(2)}`;
    }
}

function showCartConfirmation() {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.innerHTML = `
        <div class="cart-confirmation-content">
            <i class="fas fa-check-circle"></i>
            <p>Product added to cart!</p>
            <div class="cart-confirmation-buttons">
                <a href="cart.html" class="button">View Cart</a>
                <button class="button secondary continue-shopping">Continue Shopping</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(confirmation);
    
    // Animate in
    anime({
        targets: '.cart-confirmation',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 300
    });
    
    // Add event listener to continue shopping button
    const continueBtn = confirmation.querySelector('.continue-shopping');
    continueBtn.addEventListener('click', function() {
        // Animate out
        anime({
            targets: '.cart-confirmation',
            opacity: [1, 0],
            translateY: [0, 20],
            easing: 'easeInQuad',
            duration: 300,
            complete: function() {
                confirmation.remove();
            }
        });
    });
}

function renderCart(cart, container) {
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="product.html" class="button">Shop Now</a>
            </div>
        `;
        
        // Hide order summary
        const orderSummary = document.querySelector('.order-summary');
        if (orderSummary) {
            orderSummary.style.display = 'none';
        }
        
        return;
    }
    
    // Show order summary
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        orderSummary.style.display = 'block';
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Add each cart item
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>Size: ${item.size}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(cartItem);
    });
    
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            
            // Remove item from cart
            cart = cart.filter(item => item.id !== itemId);
            
            // Save to localStorage
            localStorage.setItem('tallowCart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount(cart);
            
            // Re-render cart
            renderCart(cart, container);
            
            // Update order summary
            updateOrderSummary(cart);
        });
    });
    
    // Update order summary
    updateOrderSummary(cart);
}

function updateOrderSummary(cart) {
    const subtotalElement = document.querySelector('.summary-subtotal');
    const shippingElement = document.querySelector('.summary-shipping');
    const taxElement = document.querySelector('.summary-tax');
    const totalElement = document.querySelector('.summary-total-value');
    
    if (subtotalElement && shippingElement && taxElement && totalElement) {
        // Calculate subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calculate shipping (free over $50)
        const shipping = subtotal >= 50 ? 0 : 5.99;
        
        // Calculate tax (8%)
        const tax = subtotal * 0.08;
        
        // Calculate total
        const total = subtotal + shipping + tax;
        
        // Update elements
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
