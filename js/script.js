// User Authentication State
let isAuthenticated = false;

// Password Toggle Functionality
function togglePasswordVisibility(button) {
    const input = button.parentElement.querySelector('input');
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Toggle eye icon
    const icon = button.querySelector('i');
    if (icon) {
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
}

// Initialize password toggles
function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => togglePasswordVisibility(button));
    });
}

// Form Validation
function validateForm(formType) {
    const form = document.querySelector(`.${formType}-form`);
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const errorMessages = form.querySelectorAll('.error-message');

    // Clear previous error messages
    errorMessages.forEach(msg => msg.textContent = '');

    let isValid = true;

    // Email validation
    if (!emailInput.value) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    if (!passwordInput.value) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Handle form submission
function handleSubmit(event, formType) {
    event.preventDefault();

    if (!validateForm(formType)) {
        return;
    }

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (formType === 'login') {
        // Simulate login
        login(email, password);
    } else {
        // Simulate signup
        signup(email, password);
    }
}

// Login function
function login(email, password) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store current user data
        localStorage.setItem('currentUser', JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }));
        
        isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        
        // Show success message
        const form = document.querySelector('.login-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Login successful! Redirecting...';
        form.insertBefore(successMessage, form.firstChild);

        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Show error message
        const form = document.querySelector('.login-form');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Invalid email or password';
        form.insertBefore(errorMessage, form.firstChild);
    }
}

// Signup function
function signup(email, password) {
    // Get all form data
    const form = document.querySelector('.signup-form');
    const firstName = form.querySelector('#firstName').value;
    const lastName = form.querySelector('#lastName').value;
    const phone = form.querySelector('#phone').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showError(form.querySelector('#confirmPassword'), 'Passwords do not match');
        return;
    }

    // Create user object
    const userData = {
        firstName,
        lastName,
        email,
        phone,
        password, // Note: In a real application, you should never store plain passwords
        createdAt: new Date().toISOString()
    };

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showError(form.querySelector('#email'), 'Email already registered');
        return;
    }

    // Add new user
    users.push(userData);

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Account created successfully! Redirecting to login...';
    form.insertBefore(successMessage, form.firstChild);

    // Redirect to login page after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Update UI based on auth state
function updateAuthUI() {
    const authLinks = document.querySelector('.auth-links');
    const profileIcon = document.querySelector('.profile-icon');
    
    if (isAuthenticated) {
        if (authLinks) authLinks.classList.add('hidden');
        if (profileIcon) profileIcon.classList.remove('hidden');
    } else {
        if (authLinks) authLinks.classList.remove('hidden');
        if (profileIcon) profileIcon.classList.add('hidden');
    }
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', () => {
    // Check for stored auth state
    isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    updateAuthUI();

    // Initialize password toggles
    initializePasswordToggles();

    // Add form submit handlers
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => handleSubmit(e, 'login'));
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => handleSubmit(e, 'signup'));
    }

    // Add input validation on blur
    const forms = document.querySelectorAll('.login-form, .signup-form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateForm(form.classList.contains('login-form') ? 'login' : 'signup');
            });
        });
    });
});

// Counter Animation
function animateCounter(counter, target) {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps in the animation
    const stepDuration = duration / steps;
    const stepValue = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += stepValue;
        counter.textContent = Math.round(current);

        if (step >= steps) {
            counter.textContent = target;
            clearInterval(timer);
        }
    }, stepDuration);
}

// Intersection Observer for counter animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItem = entry.target;
            const counter = statItem.querySelector('.counter');
            const target = parseInt(counter.dataset.target);
            
            statItem.classList.add('animate');
            animateCounter(counter, target);
            
            // Unobserve after animation
            observer.unobserve(statItem);
        }
    });
}, observerOptions);

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(item => {
    counterObserver.observe(item);
}); 