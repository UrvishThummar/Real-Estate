// Login Form Validation
function validateLoginForm() {
    const form = document.querySelector('.login-form');
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
        
        localStorage.setItem('isAuthenticated', 'true');
        
        // Hide login button and show user icon
        const loginBtn = document.querySelector('.login-btn');
        const userIcon = document.querySelector('.user-icon');
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userIcon) userIcon.classList.add('visible');
        
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

// Handle form submission
function handleLoginSubmit(event) {
    event.preventDefault();

    if (!validateLoginForm()) {
        return;
    }

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    login(email, password);
}

// Initialize login page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize password toggles
    initializePasswordToggles();

    // Add form submit handler
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Add input validation on blur
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateLoginForm();
        });
    });
}); 