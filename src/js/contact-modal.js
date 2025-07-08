const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('successMessage');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

function openModal() {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    
    setTimeout(() => {
        nameInput.focus();
    }, 100);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    setTimeout(() => {
        resetForm();
    }, 300);
}

function resetForm() {
    contactForm.reset();
    hideAllErrors();
    showForm();
}

function hideAllErrors() {
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
}

function showForm() {
    contactForm.style.display = 'block';
    successMessage.classList.remove('show');
    document.querySelector('.modal-header').style.display = 'block';
}

function showSuccess() {
    contactForm.style.display = 'none';
    document.querySelector('.modal-header').style.display = 'none';
    successMessage.classList.add('show');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    let isValid = true;
    hideAllErrors();

    if (!nameInput.value.trim()) {
        nameError.classList.add('show');
        nameInput.classList.add('error');
        isValid = false;
    }

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

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    submitBtn.disabled = true;
    document.querySelector('.button-text').style.display = 'none';
    loading.classList.add('show');

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            event: 'Cozy Book Club — "The Midnight Library"'
        };

        console.log('Form submitted:', formData);

        showSuccess();

        setTimeout(() => {
            closeModal();
        }, 3000);

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error submitting your registration. Please try again.');
    } finally {
        
        submitBtn.disabled = false;
        document.querySelector('.button-text').style.display = 'block';
        loading.classList.remove('show');
    }
});

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

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

modal.addEventListener('click', function(e) {
    e.stopPropagation();
});

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact Modal initialized');
});

document.addEventListener('DOMContentLoaded', function () {
    const registerButtons = document.querySelectorAll('.event-btn');

    registerButtons.forEach(button => {
      button.addEventListener('click', function () {
        openModal();
      });
    });
  });

const closeBtn = document.querySelector('.modal-close');
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}
