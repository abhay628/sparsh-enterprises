// Sparsh Enterprises Solar Website JavaScript

// Global Variables
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const appointmentForm = document.getElementById('appointmentForm');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeNavigation();
    initializeForms();
    initializeScrollEffects();
    initializeAnimations();
});

// Carousel Functions
function initializeCarousel() {
    // Auto slide change every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel-container');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            changeSlide(1); // Swipe left, go to next slide
        }
        if (touchEndX > touchStartX + 50) {
            changeSlide(-1); // Swipe right, go to previous slide
        }
    }
}

function changeSlide(direction) {
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = index - 1;
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Navigation Functions
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNavigation);
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip for dropdowns (#!) or empty anchors (#)
            if (href === '#' || href === '#!') return;

            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (err) {
                // Ignore invalid selectors
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function toggleNavigation() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === '' && link.getAttribute('href') === 'index')) {
            link.classList.add('active');
        }
    });
}

// Form Functions
function initializeForms() {
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    // Add input validation styling
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', clearInputError);
    });
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = appointmentForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        appointmentForm.reset();
        
        // Show success message
        showNotification('Thank you! Your appointment request has been submitted. We will contact you within 24 hours.', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Send email (simulate)
        sendEmailNotification(data);
        
    }, 2000);
}

function validateForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'monthlyBill', 'pincode', 'city'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            const input = document.querySelector(`[name="${field}"]`);
            showInputError(input, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.querySelector('[name="email"]');
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        const phoneInput = document.querySelector('[name="phone"]');
        showInputError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Pincode validation
    if (data.pincode && !isValidPincode(data.pincode)) {
        const pincodeInput = document.querySelector('[name="pincode"]');
        showInputError(pincodeInput, 'Please enter a valid 6-digit pincode');
        isValid = false;
    }
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const name = input.name;
    
    if (value === '') {
        showInputError(input, 'This field is required');
        return;
    }
    
    switch (name) {
        case 'email':
            if (!isValidEmail(value)) {
                showInputError(input, 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (!isValidPhone(value)) {
                showInputError(input, 'Please enter a valid phone number');
            }
            break;
        case 'pincode':
            if (!isValidPincode(value)) {
                showInputError(input, 'Please enter a valid 6-digit pincode');
            }
            break;
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validatePincode(pincode) {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
}

function showInputError(input, message) {
    clearInputError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    input.style.borderColor = 'var(--error)';
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(e) {
    const input = e.target || e;
    const errorDiv = input.parentNode.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = 'var(--gray-medium)';
}

function sendEmailNotification(data) {
    // This is a simulation - in a real application, you would send this to your backend
    console.log('Email notification data:', data);
    
    // Example of what you would send to your backend:
    const emailData = {
        to: 'info@thesparshenterprises.com',
        subject: 'New Solar Consultation Request',
        body: `
            New consultation request received:
            
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone}
            Monthly Bill: ${data.monthlyBill}
            Pincode: ${data.pincode}
            City: ${data.city}
            
            Please contact the customer within 24 hours.
        `,
        customerEmail: data.email,
        customerName: data.name
    };
    
    // Simulate API call
    console.log('Sending email notification...', emailData);
}

// Scroll Effects
function initializeScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solar-card, .feature-item, .benefit-card, .product-category');
    animateElements.forEach(el => observer.observe(el));
}

// Animation Functions
function initializeAnimations() {
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form Validation Utilities
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidPincode(pincode) {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
}

// Smooth scroll for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add some CSS for better mobile experience
const additionalStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @media (max-width: 480px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);