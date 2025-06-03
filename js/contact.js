// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    console.log('Contact form found:', contactForm);

    if (contactForm) {
        // Form validation
        function validateForm() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            console.log('Form fields:', { name, email, phone, subject, message });
            let isValid = true;

            // Clear previous error messages
            clearErrors();

            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Phone validation
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }

            // Subject validation
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }

            return isValid;
        }

        // Helper function to show error message
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
            formGroup.classList.add('error');
        }

        // Helper function to clear all error messages
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            const errorGroups = document.querySelectorAll('.form-group.error');
            
            errorMessages.forEach(error => error.remove());
            errorGroups.forEach(group => group.classList.remove('error'));
        }

        // Email validation helper
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Phone validation helper
        function isValidPhone(phone) {
            const re = /^\(\d{3}\) \d{3}-\d{4}$/;
            return re.test(phone);
        }

        // Show success message
        function showSuccessMessage() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';
            document.body.appendChild(overlay);

            // Create popup
            const popup = document.createElement('div');
            popup.className = 'popup-success';
            popup.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We will get back to you as soon as possible.</p>
                <button type="button" class="close-popup">Close</button>
            `;
            document.body.appendChild(popup);

            // Handle close button click
            const closeButton = popup.querySelector('.close-popup');
            closeButton.addEventListener('click', () => {
                overlay.remove();
                popup.remove();
                // Reset the form
                contactForm.reset();
            });

            // Close popup when clicking overlay
            overlay.addEventListener('click', () => {
                overlay.remove();
                popup.remove();
                // Reset the form
                contactForm.reset();
            });
        }

        // Show loading state
        function setLoading(isLoading) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Form data:', data);

            // Show success message
            showSuccessMessage();
        });

        // Phone Number Formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                // Remove all non-numeric characters
                let phone = e.target.value.replace(/\D/g, '');
                
                // Format the number as (XXX) XXX-XXXX
                if (phone.length >= 10) {
                    phone = phone.slice(0, 10);
                    phone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
                }
                
                e.target.value = phone;
            });
        }

        // Form Input Animations
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

        formInputs.forEach(input => {
            // Add focus class when input is focused
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            // Remove focus class when input loses focus
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Info Cards Hover Effect
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 