// Toggle Password Visibility
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});

// Form Validation
const authForm = document.querySelector('.auth-form');
if (authForm) {
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const inputs = this.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // Email validation
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            }
        }
        
        // Password validation for signup
        const passwordInput = this.querySelector('input[name="password"]');
        const confirmPasswordInput = this.querySelector('input[name="confirm_password"]');
        
        if (passwordInput && confirmPasswordInput) {
            if (passwordInput.value.length < 8) {
                isValid = false;
                passwordInput.classList.add('error');
            }
            
            if (passwordInput.value !== confirmPasswordInput.value) {
                isValid = false;
                confirmPasswordInput.classList.add('error');
            }
        }
        
        // Terms checkbox validation for signup
        const termsCheckbox = this.querySelector('input[name="terms"]');
        if (termsCheckbox && !termsCheckbox.checked) {
            isValid = false;
            termsCheckbox.classList.add('error');
        }
        
        if (isValid) {
            // Here you would typically send the data to your server
            console.log('Form data:', data);
            
            // For demo purposes, show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Success! Redirecting...';
            this.appendChild(successMessage);
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

// Social Login Buttons
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        console.log(`Logging in with ${provider}...`);
        // Here you would implement the actual social login functionality
    });
});

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ff4444 !important;
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1) !important;
    }
    
    .success-message {
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
    }
`;
document.head.appendChild(style); 