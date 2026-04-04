// Customer Dashboard JavaScript
let currentCustomer = {};
let customerData = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    loadCustomerData();
    initializeCharts();
    loadMaintenanceSchedule();
    loadCustomerComplaints();
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

// Load customer data
async function loadCustomerData() {
    try {
        // Simulate API call with mock customer data
        currentCustomer = {
            id: 'CUST001',
            name: 'John Doe',
            email: 'john.doe@email.com',
            projectId: 'PROJ001'
        };

        customerData = {
            systemCapacity: '5.5 kW',
            todayGeneration: '28.5 kWh',
            warrantyRemaining: '4.2 years',
            dailyGeneration: generateDailyGenerationData(),
            monthlySummary: generateMonthlySummaryData(),
            systemStatus: {
                inverter: 'Online',
                panels: 'Normal',
                gridConnection: 'Fluctuating',
                monitoring: 'Active'
            }
        };

        // Update customer info
        document.getElementById('customerName').textContent = currentCustomer.name;
        document.getElementById('systemCapacity').textContent = customerData.systemCapacity;
        document.getElementById('todayGeneration').textContent = customerData.todayGeneration;
        document.getElementById('warrantyStatus').textContent = customerData.warrantyRemaining;
    } catch (error) {
        console.error('Error loading customer data:', error);
        showToast('Error loading customer data', 'error');
    }
}

// Generate mock daily generation data
function generateDailyGenerationData() {
    const days = [];
    const generation = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-IN', { weekday: 'short' }));
        generation.push(Math.floor(Math.random() * 15) + 20); // 20-35 kWh range
    }
    
    return { days, generation };
}

// Generate monthly summary data
function generateMonthlySummaryData() {
    return {
        thisMonth: '765 kWh',
        monthlySavings: '₹4,590',
        efficiency: 82,
        peakPower: '4.8 kW'
    };
}

// Initialize charts
function initializeCharts() {
    createDailyGenerationChart();
    createMonthlySummaryChart();
}

// Daily Generation Chart
function createDailyGenerationChart() {
    const ctx = document.getElementById('dailyGenerationChart').getContext('2d');
    const data = customerData.dailyGeneration;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [{
                label: 'Daily Generation (kWh)',
                data: data.generation,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4,
                fill: true
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Generation (kWh)'
                    }
                }
            }
        }
    });
}

// Monthly Summary Chart
function createMonthlySummaryChart() {
    const ctx = document.getElementById('monthlySummaryChart').getContext('2d');
    const summaryData = customerData.monthlySummary;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Efficiency', 'Performance', 'Reliability'],
            datasets: [{
                data: [summaryData.efficiency, 85, 92],
                backgroundColor: ['#28a745', '#ffc107', '#17a2b8'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// Load maintenance schedule for customer
async function loadMaintenanceSchedule() {
    try {
        const mockMaintenance = [
            { year: 1, cycle: 'Q1', scheduled: '2024-03-15', status: 'Completed' },
            { year: 1, cycle: 'Q2', scheduled: '2024-06-15', status: 'Scheduled' },
            { year: 1, cycle: 'Q3', scheduled: '2024-09-15', status: 'Pending' }
        ];

        const tbody = document.getElementById('maintenanceTable');
        tbody.innerHTML = mockMaintenance.map(item => {
            const statusBadge = item.status === 'Completed' ? 'success' : item.status === 'Scheduled' ? 'warning' : 'secondary';
            
            return `
                <tr>
                    <td><strong>Year ${item.year}</strong></td>
                    <td><span class="badge bg-secondary">${item.cycle}</span></td>
                    <td><span class="badge bg-primary">${item.scheduled}</span></td>
                    <td><span class="badge bg-${statusBadge}">${item.status}</span></td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading maintenance schedule:', error);
    }
}

// Load customer complaints
async function loadCustomerComplaints() {
    try {
        const mockComplaints = [
            { title: 'Low Generation', priority: 'MEDIUM', status: 'Resolved' },
            { title: 'Panel Cleaning', priority: 'LOW', status: 'In Progress' }
        ];

        const tbody = document.getElementById('complaintsTable');
        tbody.innerHTML = mockComplaints.map(item => {
            const priorityBadge = item.priority === 'HIGH' ? 'danger' : item.priority === 'MEDIUM' ? 'warning' : 'success';
            const statusBadge = item.status === 'Resolved' ? 'success' : item.status === 'In Progress' ? 'warning' : 'danger';
            
            return `
                <tr>
                    <td><strong>${item.title}</strong></td>
                    <td><span class="badge bg-${priorityBadge}">${item.priority}</span></td>
                    <td><span class="badge bg-${statusBadge}">${item.status}</span></td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading customer complaints:', error);
    }
}

// Show project details
function showProjectDetails() {
    const projectDetails = {
        projectId: 'PROJ001',
        systemCapacity: '5.5 kW',
        panelBrand: 'Waaree 550W',
        inverterBrand: 'Solis 5G',
        installationDate: '15 Jan 2023',
        commissioningDate: '20 Jan 2023',
        warrantyEndDate: '20 Jan 2028',
        status: 'Active',
        location: 'Mumbai, Maharashtra'
    };

    const content = `
        <div class="row g-3">
            <div class="col-md-6">
                <strong>Project ID:</strong> ${projectDetails.projectId}<br>
                <strong>System Capacity:</strong> ${projectDetails.systemCapacity}<br>
                <strong>Panel Brand:</strong> ${projectDetails.panelBrand}<br>
                <strong>Inverter Brand:</strong> ${projectDetails.inverterBrand}
            </div>
            <div class="col-md-6">
                <strong>Installation Date:</strong> ${projectDetails.installationDate}<br>
                <strong>Commissioning Date:</strong> ${projectDetails.commissioningDate}<br>
                <strong>Warranty End:</strong> ${projectDetails.warrantyEndDate}<br>
                <strong>Status:</strong> <span class="badge bg-success">${projectDetails.status}</span>
            </div>
            <div class="col-12">
                <strong>Location:</strong> ${projectDetails.location}
            </div>
        </div>
    `;

    document.getElementById('projectDetailsContent').innerHTML = content;
    new bootstrap.Modal(document.getElementById('projectDetailsModal')).show();
}

// Show generation history
function showGenerationHistory() {
    const historyData = {
        lastWeek: '198.5 kWh',
        lastMonth: '765 kWh',
        lastYear: '8,950 kWh',
        lifetime: '26,850 kWh',
        averageDaily: '24.5 kWh',
        peakDay: '42.8 kWh (Jun 15, 2023)'
    };

    let historyHtml = '<div class="row g-3">';
    Object.entries(historyData).forEach(([key, value]) => {
        historyHtml += `
            <div class="col-md-6">
                <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                    <span class="text-primary fw-bold">${value}</span>
                </div>
            </div>
        `;
    });
    historyHtml += '</div>';

    document.getElementById('projectDetailsContent').innerHTML = historyHtml;
    new bootstrap.Modal(document.getElementById('projectDetailsModal')).show();
}

// Logout
function logout() {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerId');
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