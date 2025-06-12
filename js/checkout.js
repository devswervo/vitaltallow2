// Checkout page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('tallowCart')) || [];
    
    // Update order summary
    updateOrderSummary(cart);
    
    // Render order items
    renderOrderItems(cart);
    
    // Payment method tabs
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const paymentPanels = document.querySelectorAll('.payment-panel');
    
    if (paymentTabs.length > 0 && paymentPanels.length > 0) {
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get payment method
                const method = this.dataset.method;
                
                // Update active tab
                paymentTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active panel
                paymentPanels.forEach(panel => {
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
                
                const activePanel = document.getElementById(method);
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
    
    // Initialize Stripe
    const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const elements = stripe.elements();
    
    // Create Stripe card elements
    const cardNumberElement = elements.create('cardNumber');
    const cardExpiryElement = elements.create('cardExpiry');
    const cardCvcElement = elements.create('cardCvc');
    
    // Mount Stripe elements
    cardNumberElement.mount('#card-number-element');
    cardExpiryElement.mount('#card-expiry-element');
    cardCvcElement.mount('#card-cvc-element');
    
    // Handle form submission
    const form = document.getElementById('checkout-form');
    const submitButton = document.getElementById('submit-button');
    const cardErrors = document.getElementById('card-errors');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';
            
            // Get active payment method
            const activeMethod = document.querySelector('.payment-tab.active').dataset.method;
            
            if (activeMethod === 'credit-card') {
                // Create payment method with Stripe
                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardNumberElement,
                    billing_details: {
                        name: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        address: {
                            line1: document.getElementById('address').value,
                            line2: document.getElementById('address2').value,
                            city: document.getElementById('city').value,
                            state: document.getElementById('state').value,
                            postal_code: document.getElementById('zip').value,
                            country: 'US'
                        }
                    }
                });
                
                if (error) {
                    // Show error message
                    cardErrors.textContent = error.message;
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Complete Order';
                } else {
                    // Process payment (in a real implementation, this would send to your server)
                    processOrder(paymentMethod.id);
                }
            } else if (activeMethod === 'paypal') {
                // PayPal checkout would be handled by the PayPal SDK
                // For this demo, we'll just simulate a successful payment
                processOrder('paypal_payment');
            }
        });
    }
    
    // Initialize PayPal
    if (document.getElementById('paypal-button-container')) {
        paypal.Buttons({
            createOrder: function(data, actions) {
                // Calculate total
                const total = calculateTotal(cart);
                
                // Create PayPal order
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                    // Process order with PayPal payment
                    processOrder('paypal_' + details.id);
                });
            }
        }).render('#paypal-button-container');
    }
    
    // Add animations to checkout page elements
    anime({
        targets: '.checkout-form h2, .checkout-form .form-group',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(50)
    });
    
    anime({
        targets: '.order-summary',
        opacity: [0, 1],
        translateX: [20, 0],
        easing: 'easeOutQuad',
        duration: 800
    });
});

function renderOrderItems(cart) {
    const orderItemsContainer = document.querySelector('.order-items');
    
    if (!orderItemsContainer) return;
    
    // Clear container
    orderItemsContainer.innerHTML = '';
    
    // Add each order item
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-details">
                <span>${item.title} (${item.size})</span>
                <span>x${item.quantity}</span>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
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

function calculateTotal(cart) {
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate shipping (free over $50)
    const shipping = subtotal >= 50 ? 0 : 5.99;
    
    // Calculate tax (8%)
    const tax = subtotal * 0.08;
    
    // Calculate total
    return subtotal + shipping + tax;
}

function processOrder(paymentId) {
    // In a real implementation, this would send the order to your server
    // For this demo, we'll just simulate a successful order
    
    // Clear cart
    localStorage.removeItem('tallowCart');
    
    // Redirect to confirmation page
    window.location.href = `confirmation.html?order_id=${Date.now()}&payment=${paymentId}`;
}
