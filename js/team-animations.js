// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Animate team cards when they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Add initial classes for animation setup
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.classList.add('team-card-hidden');
        observer.observe(card);
        
        // Add hover animation for contact buttons
        const contactBtn = card.querySelector('.contact-btn');
        contactBtn.addEventListener('mouseenter', () => {
            contactBtn.classList.add('button-pulse');
        });
        
        contactBtn.addEventListener('animationend', () => {
            contactBtn.classList.remove('button-pulse');
        });
    });

    // Animate years counter in description
    const description = document.querySelector('.team-description');
    if (description) {
        const text = description.textContent;
        const yearsMatch = text.match(/(\d+)\s+years/);
        
        if (yearsMatch) {
            const years = parseInt(yearsMatch[1]);
            const newText = text.replace(
                /(\d+)\s+years/, 
                `<span class="years-counter" data-target="${years}">0</span> years`
            );
            description.innerHTML = newText;
            
            // Start counter animation when description comes into view
            observer.observe(description);
            
            // Counter animation function
            function animateCounter(element) {
                const target = parseInt(element.dataset.target);
                let count = 0;
                const duration = 2000; // 2 seconds
                const steps = 50;
                const increment = target / steps;
                const stepTime = duration / steps;
                
                const counter = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        element.textContent = target;
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(count);
                    }
                }, stepTime);
            }
            
            // Start counter when description comes into view
            const yearsCounter = document.querySelector('.years-counter');
            if (yearsCounter) {
                description.addEventListener('animationend', () => {
                    animateCounter(yearsCounter);
                });
            }
        }
    }
}); 