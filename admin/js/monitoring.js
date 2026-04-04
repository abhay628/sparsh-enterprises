// Solar Generation Monitoring
class SolarMonitoringManager {
    constructor() {
        this.generationData = [];
        this.projects = [];
        this.filteredData = []
        this.charts = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.populateProjectFilter();
        this.updateStatistics();
        this.renderTable();
        this.createCharts();
    }

    async loadData() {
        try {
            // Load generation data
            const genResponse = await fetch('tables/solar_generation_data');
            const genResult = await genResponse.json();
            this.generationData = genResult.data || [];
            this.filteredData = [...this.generationData];

            // Load projects
            const projResponse = await fetch('tables/solar_projects');
            const projResult = await projResponse.json();
            this.projects = projResult.data || [];
        } catch (error) {
            console.error('Error loading data:', error);
            this.generationData = [];
            this.projects = [];
            this.filteredData = [];
        }
    }

    populateProjectFilter() {
        const select = document.getElementById('filterProject');
        const dataProjectSelect = document.getElementById('dataProjectId');
        
        // Clear existing options
        select.innerHTML = '<option value="">All Projects</option>';
        dataProjectSelect.innerHTML = '<option value="">Select Project</option>';
        
        this.projects.forEach(project => {
            const option1 = document.createElement('option');
            option1.value = project.id;
            option1.textContent = `${project.project_id} - ${project.customer_name}`;
            select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = project.id;
            option2.textContent = `${project.project_id} - ${project.customer_name}`;
            dataProjectSelect.appendChild(option2);
        });
    }

    updateStatistics() {
        const today = new Date().toISOString().split('T')[0];
        const todayData = this.generationData.filter(d => d.date === today);
        const monthlyData = this.generationData.filter(d => {
            const date = new Date(d.date);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        });

        // Today's statistics
        const todayUnits = todayData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
        const todayPeakPower = todayData.reduce((max, d) => Math.max(max, parseFloat(d.peak_power || 0)), 0);

        // Monthly statistics
        const monthlyUnits = monthlyData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
        const avgEfficiency = monthlyData.length > 0 
            ? monthlyData.reduce((sum, d) => sum + parseFloat(d.efficiency || 0), 0) / monthlyData.length 
            : 0;

        // Lifetime statistics
        const lifetimeUnits = this.generationData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
        const lowGenAlerts = this.generationData.filter(d => this.isLowGeneration(d)).length;

        document.getElementById('todayUnits').textContent = todayUnits.toFixed(1);
        document.getElementById('peakPower').textContent = todayPeakPower.toFixed(1);
        document.getElementById('monthlyUnits').textContent = monthlyUnits.toFixed(0);
        document.getElementById('efficiency').textContent = avgEfficiency.toFixed(1);
        document.getElementById('lowGenAlerts').textContent = lowGenAlerts;
        document.getElementById('lifetimeUnits').textContent = (lifetimeUnits / 1000).toFixed(1);
    }

    isLowGeneration(data) {
        const efficiency = parseFloat(data.efficiency || 0);
        const weather = data.weather_condition;
        
        // Define minimum efficiency thresholds based on weather
        const thresholds = {
            'sunny': 70,
            'partly_cloudy': 60,
            'cloudy': 40,
            'rainy': 20,
            'foggy': 15
        };
        
        const threshold = thresholds[weather] || 50;
        return efficiency < threshold;
    }

    createCharts() {
        this.createGenerationTrendChart();
        this.createPerformanceChart();
        this.createDailyComparisonChart();
        this.createAlertsChart();
    }

    createGenerationTrendChart() {
        const ctx = document.getElementById('generationChart').getContext('2d');
        const last30Days = this.getLast30DaysData();
        
        if (this.charts.generation) {
            this.charts.generation.destroy();
        }

        this.charts.generation = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last30Days.map(d => d.label),
                datasets: [{
                    label: 'Daily Generation (kWh)',
                    data: last30Days.map(d => d.units),
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Peak Power (kW)',
                    data: last30Days.map(d => d.peakPower),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Generation (kWh)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Peak Power (kW)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const performance = this.calculatePerformance();
        
        if (this.charts.performance) {
            this.charts.performance.destroy();
        }

        this.charts.performance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Optimal', 'Good', 'Fair', 'Poor'],
                datasets: [{
                    data: [
                        performance.optimal,
                        performance.good,
                        performance.fair,
                        performance.poor
                    ],
                    backgroundColor: [
                        '#28a745',
                        '#17a2b8',
                        '#ffc107',
                        '#dc3545'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createDailyComparisonChart() {
        const ctx = document.getElementById('dailyComparisonChart').getContext('2d');
        const comparison = this.getDailyComparison();
        
        if (this.charts.dailyComparison) {
            this.charts.dailyComparison.destroy();
        }

        this.charts.dailyComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: comparison.labels,
                datasets: [{
                    label: 'Current Week',
                    data: comparison.current,
                    backgroundColor: 'rgba(0, 123, 255, 0.8)'
                }, {
                    label: 'Previous Week',
                    data: comparison.previous,
                    backgroundColor: 'rgba(108, 117, 125, 0.8)'
                }]
            },
            options: {
                responsive: true,
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

    createAlertsChart() {
        const ctx = document.getElementById('alertsChart').getContext('2d');
        const alerts = this.calculateAlerts();
        
        if (this.charts.alerts) {
            this.charts.alerts.destroy();
        }

        this.charts.alerts = new Chart(ctx, {
            type: 'line',
            data: {
                labels: alerts.labels,
                datasets: [{
                    label: 'Low Generation Alerts',
                    data: alerts.lowGeneration,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4
                }, {
                    label: 'System Alerts',
                    data: alerts.systemAlerts,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    }

    getLast30DaysData() {
        const data = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayData = this.filteredData.filter(d => d.date === dateStr);
            const units = dayData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
            const peakPower = dayData.reduce((max, d) => Math.max(max, parseFloat(d.peak_power || 0)), 0);
            
            data.push({
                label: date.toLocaleDateString(),
                units: units,
                peakPower: peakPower
            });
        }
        
        return data;
    }

    calculatePerformance() {
        const performance = {
            optimal: 0,
            good: 0,
            fair: 0,
            poor: 0
        };

        this.filteredData.forEach(data => {
            const efficiency = parseFloat(data.efficiency || 0);
            if (efficiency >= 80) performance.optimal++;
            else if (efficiency >= 60) performance.good++;
            else if (efficiency >= 40) performance.fair++;
            else performance.poor++;
        });

        return performance;
    }

    getDailyComparison() {
        const today = new Date();
        const currentWeek = [];
        const previousWeek = [];
        const labels = [];

        for (let i = 6; i >= 0; i--) {
            const currentDate = new Date(today);
            currentDate.setDate(currentDate.getDate() - i);
            const previousDate = new Date(currentDate);
            previousDate.setDate(previousDate.getDate() - 7);
            
            const currentDateStr = currentDate.toISOString().split('T')[0];
            const previousDateStr = previousDate.toISOString().split('T')[0];
            
            const currentDayData = this.filteredData.filter(d => d.date === currentDateStr);
            const previousDayData = this.filteredData.filter(d => d.date === previousDateStr);
            
            const currentUnits = currentDayData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
            const previousUnits = previousDayData.reduce((sum, d) => sum + parseFloat(d.daily_units || 0), 0);
            
            currentWeek.push(currentUnits);
            previousWeek.push(previousUnits);
            labels.push(currentDate.toLocaleDateString('en', { weekday: 'short' }));
        }

        return { labels, current: currentWeek, previous: previousWeek };
    }

    calculateAlerts() {
        const alerts = {
            labels: [],
            lowGeneration: [],
            systemAlerts: []
        };

        // Get last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayData = this.filteredData.filter(d => d.date === dateStr);
            const lowGenCount = dayData.filter(d => this.isLowGeneration(d)).length;
            const systemAlerts = Math.floor(Math.random() * 3); // Simulate system alerts
            
            alerts.labels.push(date.toLocaleDateString());
            alerts.lowGeneration.push(lowGenCount);
            alerts.systemAlerts.push(systemAlerts);
        }

        return alerts;
    }

    renderTable() {
        const tbody = document.getElementById('generationTableBody');
        tbody.innerHTML = '';

        if (this.filteredData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No generation data found</td></tr>';
            return;
        }

        // Sort by date descending
        const sortedData = [...this.filteredData].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Show only last 50 records
        const displayData = sortedData.slice(0, 50);

        displayData.forEach(data => {
            const row = document.createElement('tr');
            const project = this.projects.find(p => p.id === data.project_id);
            const isLowGen = this.isLowGeneration(data);
            const efficiency = parseFloat(data.efficiency || 0);

            row.innerHTML = `
                <td>${this.formatDate(data.date)}</td>
                <td>${project ? project.project_id : 'Unknown'}</td>
                <td>${parseFloat(data.daily_units || 0).toFixed(2)}</td>
                <td>${parseFloat(data.peak_power || 0).toFixed(2)}</td>
                <td>
                    <span class="badge ${efficiency >= 70 ? 'bg-success' : efficiency >= 50 ? 'bg-warning' : 'bg-danger'}">
                        ${efficiency.toFixed(1)}%
                    </span>
                </td>
                <td>
                    <span class="badge bg-info">
                        ${data.weather_condition.replace('_', ' ')}
                    </span>
                </td>
                <td>
                    ${isLowGen ? '<span class="badge bg-danger">Low Gen</span>' : '<span class="badge bg-success">Normal</span>'}
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-info" onclick="viewGenerationDetails('${data.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="editGenerationData('${data.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${isLowGen ? `
                            <button class="btn btn-sm btn-danger" onclick="createAlert('${data.id}')" title="Create Alert">
                                <i class="fas fa-exclamation"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }
}

// Global functions
let monitoringManager;

function applyFilters() {
    const projectFilter = document.getElementById('filterProject').value;
    const dateRange = document.getElementById('filterDateRange').value;
    const metric = document.getElementById('filterMetric').value;
    const view = document.getElementById('filterView').value;

    // Filter by project
    let filtered = monitoringManager.generationData;
    if (projectFilter) {
        filtered = filtered.filter(d => d.project_id === projectFilter);
    }

    // Filter by date range
    const now = new Date();
    let startDate;
    
    switch (dateRange) {
        case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
        case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    filtered = filtered.filter(d => new Date(d.date) >= startDate);
    
    monitoringManager.filteredData = filtered;
    monitoringManager.updateStatistics();
    monitoringManager.renderTable();
    monitoringManager.createCharts();
}

function resetFilters() {
    document.getElementById('filterProject').value = '';
    document.getElementById('filterDateRange').value = 'month';
    document.getElementById('filterMetric').value = 'units';
    document.getElementById('filterView').value = 'daily';
    
    monitoringManager.filteredData = [...monitoringManager.generationData];
    monitoringManager.updateStatistics();
    monitoringManager.renderTable();
    monitoringManager.createCharts();
}

function showAddDataModal() {
    // Set default date to today
    document.getElementById('dataDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('dailyUnits').value = '';
    document.getElementById('peakPower').value = '';
    document.getElementById('efficiency').value = '';
    document.getElementById('weather').value = 'sunny';
    document.getElementById('notes').value = '';
    
    new bootstrap.Modal(document.getElementById('addDataModal')).show();
}

async function submitGenerationData() {
    const formData = {
        project_id: document.getElementById('dataProjectId').value,
        date: document.getElementById('dataDate').value,
        daily_units: parseFloat(document.getElementById('dailyUnits').value),
        peak_power: parseFloat(document.getElementById('peakPower').value),
        efficiency: parseFloat(document.getElementById('efficiency').value),
        weather_condition: document.getElementById('weather').value,
        notes: document.getElementById('notes').value,
        created_at: Date.now(),
        updated_at: Date.now()
    };

    try {
        const response = await fetch('tables/solar_generation_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Generation data added successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('addDataModal')).hide();
            await monitoringManager.loadData();
            monitoringManager.updateStatistics();
            monitoringManager.renderTable();
            monitoringManager.createCharts();
        } else {
            throw new Error('Failed to add generation data');
        }
    } catch (error) {
        console.error('Error adding generation data:', error);
        showToast('Error adding generation data', 'error');
    }
}

function detectAnomalies() {
    const anomalies = monitoringManager.filteredData.filter(d => monitoringManager.isLowGeneration(d));
    if (anomalies.length > 0) {
        showToast(`Found ${anomalies.length} low generation anomaly(ies)!`, 'warning');
    } else {
        showToast('No anomalies detected', 'info');
    }
}

function generateReport() {
    showToast('Report generation will be implemented', 'info');
}

function exportData() {
    showToast('Data export will be implemented', 'info');
}

function importData() {
    showToast('Data import will be implemented', 'info');
}

function viewGenerationDetails(dataId) {
    const data = monitoringManager.generationData.find(d => d.id === dataId);
    if (data) {
        const project = monitoringManager.projects.find(p => p.id === data.project_id);
        const details = `
            <strong>Date:</strong> ${monitoringManager.formatDate(data.date)}<br>
            <strong>Project:</strong> ${project ? project.project_id : 'Unknown'}<br>
            <strong>Daily Units:</strong> ${parseFloat(data.daily_units || 0).toFixed(2)} kWh<br>
            <strong>Peak Power:</strong> ${parseFloat(data.peak_power || 0).toFixed(2)} kW<br>
            <strong>Efficiency:</strong> ${parseFloat(data.efficiency || 0).toFixed(1)}%<br>
            <strong>Weather:</strong> ${data.weather_condition.replace('_', ' ')}<br>
            <strong>Notes:</strong> ${data.notes || 'No notes'}<br>
            <strong>Created:</strong> ${new Date(data.created_at).toLocaleString()}<br>
        `;
        
        showModal('Generation Data Details', details);
    }
}

function editGenerationData(dataId) {
    showToast('Edit functionality will be implemented', 'info');
}

function createAlert(dataId) {
    showToast('Alert creation will be implemented', 'info');
}

function refreshData() {
    monitoringManager.init();
    showToast('Data refreshed successfully!', 'success');
}

function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
    
    toastContainer.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header ${bgColor} text-white">
                <strong class="me-auto">Solar CRM</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        if (document.body.contains(toastContainer)) {
            document.body.removeChild(toastContainer);
        }
    }, 5000);
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
    modal.addEventListener('hidden.bs.modal', () => document.body.removeChild(modal));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    monitoringManager = new SolarMonitoringManager();
    
    // Set default date to today
    document.getElementById('dataDate').value = new Date().toISOString().split('T')[0];
});