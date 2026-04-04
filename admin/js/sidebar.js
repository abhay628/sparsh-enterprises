/**
 * Sidebar Navigation Controller
 * Handles collapse/expand functionality and mobile responsiveness
 */

class SidebarController {
    constructor() {
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.createSidebar();
        this.bindEvents();
        this.loadState();
        this.updateUI();
    }

    createSidebar() {
        // Check if sidebar already exists
        if (document.querySelector('.sidebar')) return;

        const sidebarHTML = `
            <div class="sidebar ${this.isCollapsed ? 'collapsed' : ''}">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-logo">
                        <i class="fas fa-solar-panel"></i>
                        <span class="sidebar-logo-text">Solar CRM</span>
                    </a>
                    <button class="sidebar-toggle" title="Toggle Sidebar">
                        <i class="fas fa-${this.isCollapsed ? 'chevron-right' : 'chevron-left'}"></i>
                    </button>
                </div>
                
                <nav class="sidebar-nav">
                    <div class="nav-section">
                        <div class="nav-title">Dashboards</div>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('admin-dashboard.html')}" href="admin-dashboard.html">
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span>Admin Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('customer-dashboard.html')}" href="customer-dashboard.html">
                                    <i class="fas fa-user"></i>
                                    <span>Customer Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section">
                        <div class="nav-title">Management</div>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('enquiry-management.html')}" href="enquiry-management.html">
                                    <i class="fas fa-clipboard-list"></i>
                                    <span>Enquiries</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('project-management.html')}" href="project-management.html">
                                    <i class="fas fa-tools"></i>
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('maintenance-schedule.html')}" href="maintenance-schedule.html">
                                    <i class="fas fa-wrench"></i>
                                    <span>Maintenance</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('complaints.html')}" href="complaints.html">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>Complaints</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${this.getActiveClass('monitoring.html')}" href="monitoring.html">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Monitoring</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section">
                        <div class="nav-title">System</div>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="#" onclick="logout()">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            
            <div class="sidebar-overlay" onclick="sidebarController.closeMobile()"></div>
        `;

        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    getActiveClass(pageName) {
        const currentPage = window.location.pathname.split('/').pop();
        return currentPage === pageName ? 'active' : '';
    }

    bindEvents() {
        // Handle toggle button click
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                this.updateUI();
            }
        });

        // Handle escape key to close mobile sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobile) {
                this.closeMobile();
            }
        });
    }

    toggle() {
        if (this.isMobile) {
            this.closeMobile();
        } else {
            this.isCollapsed = !this.isCollapsed;
            localStorage.setItem('sidebarCollapsed', this.isCollapsed);
            console.log('Sidebar toggle:', this.isCollapsed ? 'collapsed' : 'expanded');
            this.updateUI();
        }
    }

    closeMobile() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openMobile() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebar) sidebar.classList.add('mobile-open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    updateUI() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        const overlay = document.querySelector('.sidebar-overlay');
        const toggleIcon = document.querySelector('.sidebar-toggle i');

        if (!sidebar) return;

        // Handle collapsed state on desktop
        if (this.isCollapsed && !this.isMobile) {
            sidebar.classList.add('collapsed');
            if (mainContent) mainContent.classList.add('sidebar-collapsed');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-right';
            }
        } else {
            sidebar.classList.remove('collapsed');
            if (mainContent) mainContent.classList.remove('sidebar-collapsed');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-left';
            }
        }

        // Handle mobile-specific behavior
        if (this.isMobile) {
            // Ensure sidebar is not in collapsed state on mobile
            sidebar.classList.remove('collapsed');
            if (mainContent) mainContent.classList.remove('sidebar-collapsed');
            this.closeMobile();
        }
    }

    loadState() {
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    }

    // Add mobile toggle button to top navigation
    addMobileToggle() {
        const topNav = document.querySelector('.top-nav');
        if (!topNav) return;

        const existingToggle = topNav.querySelector('.mobile-toggle');
        if (existingToggle) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.onclick = () => this.openMobile();
        
        topNav.insertBefore(toggleBtn, topNav.firstChild);
    }
}

// Initialize sidebar controller
let sidebarController;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    sidebarController = new SidebarController();
    
    // Add mobile toggle if in mobile view
    if (window.innerWidth <= 768) {
        sidebarController.addMobileToggle();
    }
    
    // Update current date
    updateCurrentDate();
    
    // Convert page layout
    setTimeout(convertToSidebarLayout, 100);
});

// Update current date function
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Utility function to convert existing pages to sidebar layout
function convertToSidebarLayout() {
    // Remove existing navigation
    const existingNav = document.querySelector('nav.navbar');
    if (existingNav) {
        existingNav.style.display = 'none';
    }

    // Remove existing dashboard headers
    const dashboardHeaders = document.querySelectorAll('.bg-primary.py-4, .bg-dark.py-4');
    dashboardHeaders.forEach(header => {
        if (header.querySelector('h1')) {
            header.style.display = 'none';
        }
    });

    // Wrap main content if not already wrapped
    let mainContent = document.querySelector('.container.my-5') || document.querySelector('.container-fluid.mt-4');
    if (mainContent && !document.querySelector('.main-content')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'main-content';
        mainContent.parentNode.insertBefore(wrapper, mainContent);
        wrapper.appendChild(mainContent);
    }

    // Add top navigation bar if not exists
    const topNav = document.createElement('nav');
    topNav.className = 'top-nav';
    topNav.innerHTML = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">${document.title.split(' - ')[0]}</li>
            </ol>
        </nav>
        <div class="user-menu">
            <span class="badge bg-success">Role: Admin</span>
            <span class="badge bg-info" id="currentDate"></span>
        </div>
    `;

    const mainContentWrapper = document.querySelector('.main-content');
    if (mainContentWrapper && !mainContentWrapper.querySelector('.top-nav')) {
        mainContentWrapper.insertBefore(topNav, mainContentWrapper.firstChild);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('sidebarCollapsed');
    window.location.href = 'login.html';
}