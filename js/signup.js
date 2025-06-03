// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});

// Signup Form Validation
function validateSignupForm() {
    const form = document.querySelector('.signup-form');
    if (!form) return;

    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirmPassword');
    const terms = form.querySelector('#terms');
    const errorMessages = form.querySelectorAll('.error-message');

    // Clear previous error messages
    errorMessages.forEach(msg => msg.textContent = '');

    let isValid = true;

    // First Name validation
    if (!firstName.value.trim()) {
        showError(firstName, 'First name is required');
        isValid = false;
    }

    // Last Name validation
    if (!lastName.value.trim()) {
        showError(lastName, 'Last name is required');
        isValid = false;
    }

    // Email validation
    if (!email.value) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    if (!phone.value) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Password validation
    if (!password.value) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    // Confirm Password validation
    if (!confirmPassword.value) {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    // Terms validation
    if (!terms.checked) {
        showError(terms, 'You must agree to the terms and conditions');
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

// Phone validation helper
function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Signup function
function signup(formData) {
    try {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.some(user => user.email === formData.email)) {
            showError(document.querySelector('#email'), 'Email already registered');
            return;
        }

        // Create user object
        const userData = {
            ...formData,
            createdAt: new Date().toISOString()
        };

        // Add new user
        users.push(userData);

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        const form = document.querySelector('.signup-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Account created successfully! Redirecting to login...';
        form.insertBefore(successMessage, form.firstChild);

        // Clear form
        form.reset();

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        console.error('Error during signup:', error);
        showError(document.querySelector('#email'), 'An error occurred during signup. Please try again.');
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
function handleSignupSubmit(event) {
    event.preventDefault();

    if (!validateSignupForm()) {
        return;
    }

    const form = event.target;
    const formData = {
        firstName: form.querySelector('#firstName').value.trim(),
        lastName: form.querySelector('#lastName').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        password: form.querySelector('#password').value
    };

    signup(formData);
}

// Initialize signup page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize password toggles
    initializePasswordToggles();

    // Add form submit handler
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }

    // Add input validation on blur
    const inputs = signupForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateSignupForm();
        });
    });
});

// Social signup buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        console.log(`Signing up with ${provider}...`);
        // Add your social signup logic here
    });
});

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #ff4444;
        font-size: 0.85rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    }

    .success-message {
        color: #4CAF50;
        font-size: 0.9rem;
        margin-bottom: 15px;
        padding: 10px;
        background: rgba(76, 175, 80, 0.1);
        border-radius: 5px;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style); 