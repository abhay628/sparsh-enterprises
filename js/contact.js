// Contact Form JavaScript

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.initializeForm();
    }

    initializeForm() {
        if (!this.form) return;

        // Add form submission handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input validation
        this.setupValidation();
        
        // Add FAQ functionality
        this.initializeFAQ();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('focus', () => this.clearInputError(input));
        });

        // Special validation for specific fields
        const emailInput = this.form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
        }

        const phoneInput = this.form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => this.validatePhone(phoneInput));
        }

        const pincodeInput = this.form.querySelector('input[name="pincode"]');
        if (pincodeInput) {
            pincodeInput.addEventListener('blur', () => this.validatePincode(pincodeInput));
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            this.showInputError(input, 'This field is required');
            return false;
        }

        // Specific field validations
        switch (input.name) {
            case 'fullName':
                if (value && value.length < 3) {
                    this.showInputError(input, 'Name must be at least 3 characters');
                    return false;
                }
                break;
            case 'email':
                return this.validateEmail(input);
            case 'whatsapp':
                return this.validatePhone(input);
            case 'pincode':
                return this.validatePincode(input);
            case 'city':
                if (value && value.length < 2) {
                    this.showInputError(input, 'City name must be at least 2 characters');
                    return false;
                }
                break;
            case 'roofArea':
                if (value && (isNaN(value) || parseFloat(value) < 50)) {
                    this.showInputError(input, 'Roof area must be at least 50 sq ft');
                    return false;
                }
                break;
        }

        this.clearInputError(input);
        return true;
    }

    validateEmail(emailInput) {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showInputError(emailInput, 'Please enter a valid email address');
            return false;
        }
        
        this.clearInputError(emailInput);
        return true;
    }

    validatePhone(phoneInput) {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        
        if (phone && !phoneRegex.test(phone)) {
            this.showInputError(phoneInput, 'Please enter a valid phone number');
            return false;
        }
        
        this.clearInputError(phoneInput);
        return true;
    }

    validatePincode(pincodeInput) {
        const pincode = pincodeInput.value.trim();
        const pincodeRegex = /^\d{6}$/;
        
        if (pincode && !pincodeRegex.test(pincode)) {
            this.showInputError(pincodeInput, 'Please enter a valid 6-digit pincode');
            return false;
        }
        
        this.clearInputError(pincodeInput);
        return true;
    }

    showInputError(input, message) {
        this.clearInputError(input);
        
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

    clearInputError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = 'var(--gray-medium)';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateInput(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const originalText = this.submitBtn.innerHTML;
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        this.submitBtn.disabled = true;

        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Send email notification (simulate API call)
            await this.sendEmailNotification(data);
            
            // Show success message
            this.showNotification('Thank you! Your message has been sent successfully. We will contact you within 24 hours.', 'success');
            
            // Reset form
            this.form.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            this.submitBtn.innerHTML = originalText;
            this.submitBtn.disabled = false;
        }
    }

    async sendEmailNotification(data) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, you would send this to your backend
        const emailData = {
            to: 'info@thesparshenterprises.com',
            subject: 'New Solar Inquiry - ' + data.fullName,
            body: `
                New inquiry received from website:
                
                Name: ${data.fullName}
                Email: ${data.email}
                WhatsApp: ${data.whatsapp}
                Monthly Bill: ${data.monthlyBill}
                Pincode: ${data.pincode}
                City: ${data.city}
                System Type: ${data.systemType || 'Not specified'}
                Roof Area: ${data.roofArea || 'Not specified'}
                Message: ${data.message || 'No message provided'}
                Newsletter: ${data.newsletter ? 'Yes' : 'No'}
                
                Please contact the customer within 24 hours.
            `,
            customerEmail: data.email,
            customerName: data.fullName
        };
        
        console.log('Email notification data:', emailData);
        
        // Here you would typically make an API call to your backend
        // Example:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(emailData)
        // });
        
        return emailData;
    }

    showNotification(message, type = 'info') {
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
            this.removeNotification(notification);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
});