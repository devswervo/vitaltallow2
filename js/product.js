// Product page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product image gallery
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                const imageUrl = this.dataset.image;
                
                // Animate image change
                anime({
                    targets: mainImage,
                    opacity: [1, 0],
                    scale: [1, 0.95],
                    easing: 'easeInOutQuad',
                    duration: 300,
                    complete: function() {
                        mainImage.src = imageUrl;
                        anime({
                            targets: mainImage,
                            opacity: [0, 1],
                            scale: [0.95, 1],
                            easing: 'easeInOutQuad',
                            duration: 300
                        });
                    }
                });
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Product details tabs
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabHeaders.length > 0 && tabPanels.length > 0) {
        tabHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.dataset.tab;
                
                // Update active tab header
                tabHeaders.forEach(h => h.classList.remove('active'));
                this.classList.add('active');
                
                // Update active tab panel
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    
                    // Animate panel transition
                    anime({
                        targets: panel,
                        opacity: 0,
                        translateY: 10,
                        easing: 'easeOutQuad',
                        duration: 200
                    });
                });
                
                const activePanel = document.getElementById(tabId);
                activePanel.classList.add('active');
                
                // Animate active panel
                anime({
                    targets: activePanel,
                    opacity: [0, 1],
                    translateY: [10, 0],
                    easing: 'easeOutQuad',
                    duration: 300,
                    delay: 200
                });
            });
        });
    }
    
    // Check URL parameters for pre-selected size
    const urlParams = new URLSearchParams(window.location.search);
    const sizeParam = urlParams.get('size');
    
    if (sizeParam) {
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            if (option.dataset.size === sizeParam) {
                option.click();
            }
        });
    }
    
    // Add animations to product page elements
    anime({
        targets: '.product-info h1, .product-price',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(200)
    });
    
    // Animate product description
    anime({
        targets: '.product-description p, .product-description ul',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(200, {start: 400})
    });
    
    // Animate product options
    anime({
        targets: '.product-options, .add-to-cart-btn, .product-meta',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(200, {start: 800})
    });
    
    // Add to cart button animation
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('mouseenter', () => {
            anime({
                targets: addToCartBtn,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        addToCartBtn.addEventListener('mouseleave', () => {
            anime({
                targets: addToCartBtn,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        addToCartBtn.addEventListener('click', () => {
            anime({
                targets: addToCartBtn,
                scale: [1, 0.95, 1],
                duration: 400,
                easing: 'easeInOutBack'
            });
        });
    }
});
