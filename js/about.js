// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, stepTime);
}

// Intersection Observer for triggering animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counter animations
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }

            // Add animation classes to other sections
            if (entry.target.classList.contains('story-content')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('service-card')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('value-card')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('team-member')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('achievement-item')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // Observe other sections
    const sections = [
        '.story-content',
        '.service-card',
        '.value-card',
        '.team-member',
        '.achievement-item'
    ];

    sections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            observer.observe(element);
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Add smooth scroll for anchor links
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

    // Add hover effect for team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-social').style.opacity = '1';
            member.querySelector('.member-social').style.transform = 'translateY(0)';
        });

        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-social').style.opacity = '0';
            member.querySelector('.member-social').style.transform = 'translateY(20px)';
        });
    });
});

// Add CSS class for scroll animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .fade-in-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .value-card.animate {
        transition-delay: calc(var(--card-index) * 0.1s);
    }

    .team-member.animate {
        transition-delay: calc(var(--card-index) * 0.1s);
    }
`;
document.head.appendChild(style);

// Add staggered animation delays
document.querySelectorAll('.value-card').forEach((card, index) => {
    card.style.setProperty('--card-index', index);
});

document.querySelectorAll('.team-member').forEach((member, index) => {
    member.style.setProperty('--card-index', index);

}); 