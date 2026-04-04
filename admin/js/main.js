// Main JavaScript for Solar CRM Portal

// Initialize main page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeLoginModal();
    checkUserAuthentication();
    initializeSidebar();
});

// Initialize sidebar functionality
function initializeSidebar() {
    // Ensure sidebar controller is available globally
    if (typeof sidebarController !== 'undefined') {
        // Add keyboard shortcut for sidebar toggle
        document.addEventListener('keydown', function(e) {
            // Alt + B to toggle sidebar
            if (e.altKey && e.key === 'b') {
                e.preventDefault();
                sidebarController.toggle();
            }
        });
        
        // Add click outside to close mobile sidebar
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !e.target.closest('.sidebar') && 
                !e.target.closest('.mobile-toggle') &&
                document.querySelector('.sidebar.mobile-open')) {
                sidebarController.closeMobile();
            }
        });
    }
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', handleEnquirySubmit);
    }
}

// Handle enquiry form submission
async function handleEnquirySubmit(event) {
    event.preventDefault();
    
    const formData = {
        full_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        whatsapp: document.getElementById('whatsapp').value,
        monthly_bill: parseFloat(document.getElementById('monthlyBill').value),
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value,
        roof_area: parseFloat(document.getElementById('roofArea').value),
        system_type: document.getElementById('systemType').value,
        message: document.getElementById('message').value,
        planning_after_months: parseInt(document.getElementById('planningAfter').value) || 0,
        status: 'NEW'
    };

    try {
        // Simulate API call to save enquiry
        console.log('Enquiry Data:', formData);
        
        // Generate unique enquiry ID
        const enquiryId = 'ENQ' + Date.now().toString().slice(-6);
        
        // Show success message
        showToast('Enquiry submitted successfully! Enquiry ID: ' + enquiryId, 'success');
        
        // Reset form
        event.target.reset();
        
        // Store enquiry ID for tracking
        localStorage.setItem('lastEnquiryId', enquiryId);
        
    } catch (error) {
        console.error('Error submitting enquiry:', error);
        showToast('Error submitting enquiry. Please try again.', 'error');
    }
}

// Initialize login modal
function initializeLoginModal() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleLogin();
        });
    }
}

// Handle login
async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('userRole').value;

    try {
        // Simulate API call for login
        console.log('Login attempt:', { email, role });
        
        // Generate mock JWT token
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({
            user_id: role === 'admin' ? 'ADMIN001' : role === 'operator' ? 'OP001' : 'CUST001',
            role: role,
            email: email,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        })) + '.mock_signature';

        // Store token and user info
        localStorage.setItem('userToken', mockToken);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);

        showToast('Login successful!', 'success');
        
        // Redirect based on role
        setTimeout(() => {
            switch(role) {
                case 'admin':
                case 'operator':
                    window.location.href = 'admin-dashboard.html';
                    break;
                case 'customer':
                    window.location.href = 'customer-dashboard.html';
                    break;
                default:
                    window.location.href = 'index.html';
            }
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please check your credentials.', 'error');
    }
}

// Check user authentication
function checkUserAuthentication() {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
        // Validate token expiry (mock validation)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (payload.exp > currentTime) {
                // Token is valid, update UI accordingly
                updateNavigationForLoggedInUser(role);
            } else {
                // Token expired, clear storage
                logout();
            }
        } catch (error) {
            console.error('Token validation error:', error);
            logout();
        }
    }
}

// Update navigation for logged in user
function updateNavigationForLoggedInUser(role) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Hide login link and show appropriate dashboard link
    navLinks.forEach(link => {
        if (link.textContent.includes('Login')) {
            link.style.display = 'none';
        }
    });
    
    // Add dashboard link based on role
    const navbarNav = document.querySelector('.navbar-nav.ms-auto');
    const dashboardLink = document.createElement('li');
    dashboardLink.className = 'nav-item';
    dashboardLink.innerHTML = `
        <a class="nav-link" href="${role === 'customer' ? 'customer-dashboard.html' : 'admin-dashboard.html'}">
            <i class="fas fa-tachometer-alt me-1"></i>Dashboard
        </a>
    `;
    navbarNav.insertBefore(dashboardLink, navbarNav.firstChild);
}

// Logout function
function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('lastEnquiryId');
    
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Toast notification
function showToast(message, type = 'info') {
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.innerHTML = toastHtml;
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

// Utility function to generate unique ID
function generateUniqueId(prefix = 'ID') {
    return prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// Utility function to format currency
function formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Utility function to format date
function formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    switch(format) {
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        default:
            return d.toLocaleDateString();
    }
}

// Utility function to calculate days between dates
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateUniqueId,
        formatCurrency,
        formatDate,
        daysBetween,
        showToast,
        logout
    };
}