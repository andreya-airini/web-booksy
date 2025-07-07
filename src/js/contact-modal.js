// Modal functionality
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('successMessage');

// Form inputs
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Error messages
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Open modal
function openModal() {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus on first input for accessibility
    setTimeout(() => {
        nameInput.focus();
    }, 100);
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Reset form and states
    setTimeout(() => {
        resetForm();
    }, 300);
}

// Reset form to initial state
function resetForm() {
    contactForm.reset();
    hideAllErrors();
    showForm();
}

// Hide all error messages
function hideAllErrors() {
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
}

// Show form, hide success message
function showForm() {
    contactForm.style.display = 'block';
    successMessage.classList.remove('show');
    document.querySelector('.modal-header').style.display = 'block';
}

// Show success message, hide form
function showSuccess() {
    contactForm.style.display = 'none';
    document.querySelector('.modal-header').style.display = 'none';
    successMessage.classList.add('show');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
function validateForm() {
    let isValid = true;
    hideAllErrors();

    // Validate name
    if (!nameInput.value.trim()) {
        nameError.classList.add('show');
        nameInput.classList.add('error');
        isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        isValid = false;
    }

    return isValid;
}

// Handle form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    document.querySelector('.button-text').style.display = 'none';
    loading.classList.add('show');

    // Simulate API call
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            event: 'Cozy Book Club — "The Midnight Library"'
        };

        // Log form data (replace with actual API call)
        console.log('Form submitted:', formData);

        // Show success message
        showSuccess();

        // Auto-close modal after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error submitting your registration. Please try again.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        document.querySelector('.button-text').style.display = 'block';
        loading.classList.remove('show');
    }
});

// Real-time validation
nameInput.addEventListener('input', function() {
    if (this.value.trim()) {
        nameError.classList.remove('show');
        this.classList.remove('error');
    }
});

emailInput.addEventListener('input', function() {
    if (this.value.trim() && isValidEmail(this.value.trim())) {
        emailError.classList.remove('show');
        this.classList.remove('error');
    }
});

// Close modal on backdrop click
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Prevent modal from closing when clicking inside
modal.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Focus trap for accessibility
const focusableElements = [
    'button',
    'input',
    'textarea',
    'select',
    '[tabindex]:not([tabindex="-1"])'
];

modalOverlay.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
        const focusable = modal.querySelectorAll(focusableElements.join(','));
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact Modal initialized');
});