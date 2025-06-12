// FAQ page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // Set initial state
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    
                    if (faqItem !== item) {
                        faqItem.classList.remove('active');
                        
                        // Animate closing
                        anime({
                            targets: faqAnswer,
                            height: [faqAnswer.scrollHeight, 0],
                            opacity: [1, 0],
                            duration: 300,
                            easing: 'easeOutQuad',
                            complete: function() {
                                faqAnswer.style.display = 'none';
                                faqAnswer.style.height = 'auto';
                            }
                        });
                    }
                });
                
                // Toggle current FAQ item
                if (isActive) {
                    item.classList.remove('active');
                    
                    // Animate closing
                    anime({
                        targets: answer,
                        height: [answer.scrollHeight, 0],
                        opacity: [1, 0],
                        duration: 300,
                        easing: 'easeOutQuad',
                        complete: function() {
                            answer.style.display = 'none';
                            answer.style.height = 'auto';
                        }
                    });
                } else {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    answer.style.height = '0';
                    answer.style.opacity = '0';
                    
                    // Animate opening
                    anime({
                        targets: answer,
                        height: [0, answer.scrollHeight],
                        opacity: [0, 1],
                        duration: 400,
                        easing: 'easeOutQuad',
                        complete: function() {
                            answer.style.height = 'auto';
                        }
                    });
                }
            });
        });
        
        // Open first FAQ item by default
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.display = 'block';
    }
    
    // Add animations to FAQ page elements
    anime({
        targets: '.faq-hero h1, .faq-hero p',
        opacity: [0, 1],
        translateY: [50, 0],
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(200)
    });
    
    // Animate FAQ items on scroll
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    easing: 'easeOutQuad',
                    duration: 600
                });
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.faq-item, .benefit-detailed, .comparison-table-container, .cta h2, .cta p, .cta .button').forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Benefit icons animation on hover
    const benefitIcons = document.querySelectorAll('.benefit-detailed .benefit-icon');
    
    benefitIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            anime({
                targets: icon,
                scale: [1, 1.2],
                rotate: ['0deg', '5deg', '-5deg', '0deg'],
                duration: 600,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            anime({
                targets: icon,
                scale: [1.2, 1],
                rotate: '0deg',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});
