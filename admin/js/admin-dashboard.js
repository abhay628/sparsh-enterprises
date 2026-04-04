// Admin Dashboard JavaScript
let currentUserRole = 'admin';
let dashboardData = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    loadDashboardData();
    initializeCharts();
    loadMaintenanceSchedule();
    loadRecentComplaints();
});

// Update current date
function updateCurrentDate() {
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Simulate API calls with mock data
        dashboardData = {
            totalEnquiries: 245,
            conversionRate: 23.5,
            activeProjects: 15,
            slaBreaches: 3,
            monthlyEnquiries: [45, 52, 48, 61, 55, 67, 59, 63, 58, 62, 65, 69],
            monthlyConversions: [8, 12, 11, 15, 13, 16, 14, 17, 15, 16, 18, 19],
            installationTimeline: [5, 8, 12, 15, 18, 22, 25, 28, 31, 35, 38, 42],
            slaCompliance: { high: 95, medium: 88, low: 92 },
            generationData: generateMockGenerationData()
        };

        // Update KPI cards
        updateKPICards();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showToast('Error loading dashboard data', 'error');
    }
}

// Update KPI cards
function updateKPICards() {
    document.getElementById('totalEnquiries').textContent = dashboardData.totalEnquiries;
    document.getElementById('conversionRate').textContent = dashboardData.conversionRate + '%';
    document.getElementById('activeProjects').textContent = dashboardData.activeProjects;
    document.getElementById('slaBreaches').textContent = dashboardData.slaBreaches;
}

// Generate mock generation data
function generateMockGenerationData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
        month: month,
        units: Math.floor(Math.random() * 500) + 300,
        efficiency: Math.floor(Math.random() * 20) + 75
    }));
}

// Initialize charts
function initializeCharts() {
    createEnquiryConversionChart();
    createInstallationsChart();
    createSLAComplianceChart();
    createGenerationOverviewChart();
}

// Enquiry vs Conversion Chart
function createEnquiryConversionChart() {
    const ctx = document.getElementById('enquiryConversionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Enquiries',
                data: dashboardData.monthlyEnquiries,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.4
            }, {
                label: 'Conversions',
                data: dashboardData.monthlyConversions,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Installations Timeline Chart
function createInstallationsChart() {
    const ctx = document.getElementById('installationsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Installations',
                data: dashboardData.installationTimeline,
                backgroundColor: 'rgba(40, 167, 69, 0.8)',
                borderColor: '#28a745',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// SLA Compliance Chart
function createSLAComplianceChart() {
    const ctx = document.getElementById('slaComplianceChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['HIGH Priority', 'MEDIUM Priority', 'LOW Priority'],
            datasets: [{
                data: [dashboardData.slaCompliance.high, dashboardData.slaCompliance.medium, dashboardData.slaCompliance.low],
                backgroundColor: ['#dc3545', '#ffc107', '#28a745'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Generation Overview Chart
function createGenerationOverviewChart() {
    const ctx = document.getElementById('generationOverviewChart').getContext('2d');
    const generationData = dashboardData.generationData;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: generationData.map(d => d.month),
            datasets: [{
                label: 'Units Generated',
                data: generationData.map(d => d.units),
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                yAxisID: 'y'
            }, {
                label: 'Efficiency %',
                data: generationData.map(d => d.efficiency),
                borderColor: '#6f42c1',
                backgroundColor: 'rgba(111, 66, 193, 0.1)',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Units Generated'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Efficiency %'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Load maintenance schedule
async function loadMaintenanceSchedule() {
    try {
        const mockMaintenance = [
            { project: 'Project A', date: '2024-02-15', type: 'Q1 Service', status: 'Scheduled' },
            { project: 'Project B', date: '2024-02-18', type: 'Q2 Service', status: 'Scheduled' },
            { project: 'Project C', date: '2024-02-22', type: 'Q3 Service', status: 'Scheduled' }
        ];

        const tbody = document.getElementById('maintenanceTable');
        tbody.innerHTML = mockMaintenance.map(item => `
            <tr>
                <td><strong>${item.project}</strong></td>
                <td><span class="badge bg-primary">${item.date}</span></td>
                <td><span class="badge bg-secondary">${item.type}</span></td>
                <td><span class="badge bg-warning">${item.status}</span></td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading maintenance schedule:', error);
    }
}

// Load recent complaints
async function loadRecentComplaints() {
    try {
        const mockComplaints = [
            { title: 'Inverter Issue', priority: 'HIGH', slaDue: '2024-02-16', status: 'Open' },
            { title: 'Panel Cleaning', priority: 'MEDIUM', slaDue: '2024-02-18', status: 'In Progress' },
            { title: 'Wiring Problem', priority: 'LOW', slaDue: '2024-02-20', status: 'Open' }
        ];

        const tbody = document.getElementById('complaintsTable');
        tbody.innerHTML = mockComplaints.map(item => {
            const priorityBadge = item.priority === 'HIGH' ? 'danger' : item.priority === 'MEDIUM' ? 'warning' : 'success';
            const statusBadge = item.status === 'Open' ? 'danger' : 'warning';
            
            return `
                <tr>
                    <td><strong>${item.title}</strong></td>
                    <td><span class="badge bg-${priorityBadge}">${item.priority}</span></td>
                    <td><span class="badge bg-info">${item.slaDue}</span></td>
                    <td><span class="badge bg-${statusBadge}">${item.status}</span></td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading recent complaints:', error);
    }
}

// Handle login
function handleLogin() {
    const role = document.getElementById('userRole').value;
    // Simulate JWT token storage
    localStorage.setItem('userRole', role);
    localStorage.setItem('userToken', 'mock-jwt-token-' + Date.now());
    
    showToast('Login successful!', 'success');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Logout
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userToken');
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