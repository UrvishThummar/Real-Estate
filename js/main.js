// main.js loaded
console.log('main.js loaded');

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

// Handle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (navLinks && navLinks.classList.contains('show')) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    }
});

// Handle dropdowns on mobile
if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (link && dropdownMenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.display = 'none';
                        }
                    }
                });
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = '';
            }
        });
        if (navLinks) {
            navLinks.classList.remove('show');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// Display properties in grid
const displayProperties = () => {
    const propertyGrid = document.querySelector('.property-grid');
    if (!propertyGrid) return;

    propertyGrid.innerHTML = properties.map(property => `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="property-price">${property.price}</span>
            </div>
            <div class="property-details">
                <h3>${property.title}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
                </div>
                <button class="btn-primary">View Details</button>
            </div>
        </div>
    `).join('');
};

// Search functionality
const handleSearch = (event) => {
    event.preventDefault();
    const location = document.querySelector('.search-box input').value.toLowerCase();
    const propertyType = document.querySelector('.search-box select').value.toLowerCase();
    
    const filteredProperties = properties.filter(property => {
        const locationMatch = property.location.toLowerCase().includes(location);
        const typeMatch = propertyType === '' || property.type === propertyType;
        return locationMatch && typeMatch;
    });

    // Update property grid with filtered results
    const propertyGrid = document.querySelector('.property-grid');
    if (propertyGrid) {
        propertyGrid.innerHTML = filteredProperties.map(property => `
            <div class="property-card">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    <span class="property-price">${property.price}</span>
                </div>
                <div class="property-details">
                    <h3>${property.title}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="property-features">
                        <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                        <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                        <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
                    </div>
                    <button class="btn-primary">View Details</button>
                </div>
            </div>
        `).join('');
    }
};

// Initialize search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}

// Initialize property display
document.addEventListener('DOMContentLoaded', () => {
    displayProperties();
});

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let isAnimating = false;
    const animationDuration = 800; // Should match CSS transition duration

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = index;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset animation flag after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Event Listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto advance slides every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
});

// Add ripple effect to CTA buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Add ripple effect to all CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // ... existing slider code ...
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Header scroll behavior
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Clear the timeout if it exists
        clearTimeout(scrollTimeout);

        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past threshold
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            header.style.transform = 'translateY(0)';
        }

        // Set a timeout to handle scroll end
        scrollTimeout = setTimeout(() => {
            if (currentScroll > 100) {
                header.style.transform = 'translateY(0)';
            }
        }, 1500);

        lastScroll = currentScroll;
    });
});

// Reusable function to update nav UI based on authentication state
function updateNavAuthUI() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const loginBtn = document.querySelector('.btn-outline');
    const signupBtn = document.querySelector('.btn-primary');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileDropdownContent = document.querySelector('.profile-dropdown-content');

    if (isAuthenticated) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (profileDropdown) profileDropdown.style.display = '';
        // Show user data in dropdown
        if (profileDropdownContent) {
            // Remove any previous user info block
            const oldUserInfo = profileDropdownContent.querySelector('.profile-user-info');
            if (oldUserInfo) oldUserInfo.remove();
            // Get user data
            const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (user && (user.firstName || user.email)) {
                const userInfoDiv = document.createElement('div');
                userInfoDiv.className = 'profile-user-info';
                userInfoDiv.style.padding = '16px 20px 8px 20px';
                userInfoDiv.style.borderBottom = '1px solid #eee';
                userInfoDiv.style.marginBottom = '8px';
                userInfoDiv.innerHTML = `
                    <div style="font-weight:600; color:#1A2332;">${user.firstName ? user.firstName + ' ' + (user.lastName || '') : ''}</div>
                    <div style="font-size:0.95em; color:#666;">${user.email || ''}</div>
                `;
                profileDropdownContent.insertBefore(userInfoDiv, profileDropdownContent.firstChild);
            }
        }
    } else {
        if (loginBtn) loginBtn.style.display = '';
        if (signupBtn) signupBtn.style.display = '';
        if (profileDropdown) profileDropdown.style.display = 'none';
        // Remove user info if present
        if (profileDropdownContent) {
            const oldUserInfo = profileDropdownContent.querySelector('.profile-user-info');
            if (oldUserInfo) oldUserInfo.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavAuthUI();
    // Profile Dropdown logic
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileIcon = document.querySelector('.profile-nav-link');
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            profileDropdown.classList.toggle('active');
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
    // Logout functionality
    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isAuthenticated');
            updateNavAuthUI(); // Only update navbar, do not redirect
        });
    }
});

// Custom Cursor from CodePen
(function() {
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  cursorOutline.classList.add('cursor-dot-outline');
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  const delay = 0.18;

  function animate() {
    outlineX += (mouseX - outlineX) * delay;
    outlineY += (mouseY - outlineY) * delay;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Add hover effect for clickable elements
  const addCursorHoverEvents = () => {
    const hoverElements = document.querySelectorAll('a, button, input, textarea, select, label, .btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  };
  addCursorHoverEvents();
  // In case of dynamically added elements
  const observer = new MutationObserver(addCursorHoverEvents);
  observer.observe(document.body, { childList: true, subtree: true });
})(); 