// Maintenance Schedule Management
class MaintenanceScheduleManager {
    constructor() {
        this.maintenanceData = [];
        this.projects = [];
        this.filteredData = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        await this.loadMaintenanceData();
        this.populateProjectFilter();
        this.renderTable();
        this.updateStatistics();
    }

    async loadProjects() {
        try {
            const response = await fetch('tables/solar_projects');
            const result = await response.json();
            this.projects = result.data || [];
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
        }
    }

    async loadMaintenanceData() {
        try {
            const response = await fetch('tables/maintenance_schedule');
            const result = await response.json();
            this.maintenanceData = result.data || [];
            this.filteredData = [...this.maintenanceData];
        } catch (error) {
            console.error('Error loading maintenance data:', error);
            this.maintenanceData = [];
            this.filteredData = [];
        }
    }

    populateProjectFilter() {
        const select = document.getElementById('filterProject');
        select.innerHTML = '<option value="">All Projects</option>';
        
        this.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `${project.project_id} - ${project.customer_name}`;
            select.appendChild(option);
        });
    }

    renderTable() {
        const tbody = document.getElementById('maintenanceTableBody');
        tbody.innerHTML = '';

        if (this.filteredData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No maintenance records found</td></tr>';
            return;
        }

        this.filteredData.forEach(record => {
            const row = document.createElement('tr');
            const project = this.projects.find(p => p.id === record.project_id);
            const customerName = project ? project.customer_name : 'Unknown';
            const statusBadge = this.getStatusBadge(record.status);
            const isOverdue = this.isOverdue(record.scheduled_date, record.status);

            row.innerHTML = `
                <td>${record.project_id}</td>
                <td>${customerName}</td>
                <td>Year ${record.year}</td>
                <td>${record.cycle}</td>
                <td>${this.formatDate(record.scheduled_date)}</td>
                <td>
                    ${statusBadge}
                    ${isOverdue ? '<span class="badge bg-danger ms-1">Overdue</span>' : ''}
                </td>
                <td>${record.technician_name || '-'}</td>
                <td>${record.technician_remarks ? record.technician_remarks.substring(0, 50) + '...' : '-'}</td>
                <td>
                    <div class="btn-group" role="group">
                        ${record.status === 'scheduled' ? `
                            <button class="btn btn-sm btn-success" onclick="openCompleteModal('${record.id}')" title="Complete Service">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        <button class="btn btn-sm btn-info" onclick="viewMaintenanceDetails('${record.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="editMaintenance('${record.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getStatusBadge(status) {
        const badges = {
            'scheduled': '<span class="badge bg-warning">Scheduled</span>',
            'completed': '<span class="badge bg-success">Completed</span>',
            'overdue': '<span class="badge bg-danger">Overdue</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }

    isOverdue(scheduledDate, status) {
        if (status !== 'scheduled') return false;
        const today = new Date();
        const scheduled = new Date(scheduledDate);
        return scheduled < today;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    updateStatistics() {
        const total = this.maintenanceData.length;
        const completed = this.maintenanceData.filter(m => m.status === 'completed').length;
        const scheduled = this.maintenanceData.filter(m => m.status === 'scheduled').length;
        const overdue = this.maintenanceData.filter(m => this.isOverdue(m.scheduled_date, m.status)).length;

        document.getElementById('totalServices').textContent = total;
        document.getElementById('completedServices').textContent = completed;
        document.getElementById('pendingServices').textContent = scheduled;
        document.getElementById('overdueServices').textContent = overdue;
    }

    applyFilters() {
        const projectFilter = document.getElementById('filterProject').value;
        const yearFilter = document.getElementById('filterYear').value;
        const cycleFilter = document.getElementById('filterCycle').value;
        const statusFilter = document.getElementById('filterStatus').value;

        this.filteredData = this.maintenanceData.filter(record => {
            if (projectFilter && record.project_id !== projectFilter) return false;
            if (yearFilter && record.year !== parseInt(yearFilter)) return false;
            if (cycleFilter && record.cycle !== cycleFilter) return false;
            if (statusFilter) {
                if (statusFilter === 'overdue') {
                    if (!this.isOverdue(record.scheduled_date, record.status)) return false;
                } else if (record.status !== statusFilter) {
                    return false;
                }
            }
            return true;
        });

        this.renderTable();
    }

    resetFilters() {
        document.getElementById('filterProject').value = '';
        document.getElementById('filterYear').value = '';
        document.getElementById('filterCycle').value = '';
        document.getElementById('filterStatus').value = '';
        this.filteredData = [...this.maintenanceData];
        this.renderTable();
    }
}

// Global functions
let maintenanceManager;

function applyFilters() {
    maintenanceManager.applyFilters();
}

function resetFilters() {
    maintenanceManager.resetFilters();
}

function openCompleteModal(maintenanceId) {
    document.getElementById('maintenanceId').value = maintenanceId;
    document.getElementById('completionDate').value = new Date().toISOString().split('T')[0];
    
    // Find the maintenance record to set next service due
    const record = maintenanceManager.maintenanceData.find(m => m.id === maintenanceId);
    if (record) {
        const nextService = new Date(record.scheduled_date);
        nextService.setMonth(nextService.getMonth() + 4); // Approximately 4 months later
        document.getElementById('nextServiceDue').value = nextService.toISOString().split('T')[0];
    }
    
    new bootstrap.Modal(document.getElementById('completeMaintenanceModal')).show();
}

async function submitMaintenanceCompletion() {
    const maintenanceId = document.getElementById('maintenanceId').value;
    const formData = {
        status: 'completed',
        completion_date: document.getElementById('completionDate').value,
        technician_name: document.getElementById('technicianName').value,
        service_type: document.getElementById('serviceType').value,
        technician_remarks: document.getElementById('technicianRemarks').value,
        issues_found: document.getElementById('issuesFound').value,
        next_service_due: document.getElementById('nextServiceDue').value,
        service_rating: parseInt(document.getElementById('serviceRating').value),
        updated_at: Date.now()
    };

    try {
        const response = await fetch(`tables/maintenance_schedule/${maintenanceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Maintenance service completed successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('completeMaintenanceModal')).hide();
            await maintenanceManager.loadMaintenanceData();
            maintenanceManager.renderTable();
            maintenanceManager.updateStatistics();
        } else {
            throw new Error('Failed to update maintenance record');
        }
    } catch (error) {
        console.error('Error completing maintenance:', error);
        showToast('Error completing maintenance service', 'error');
    }
}

function viewMaintenanceDetails(maintenanceId) {
    const record = maintenanceManager.maintenanceData.find(m => m.id === maintenanceId);
    if (record) {
        const project = maintenanceManager.projects.find(p => p.id === record.project_id);
        const details = `
            <strong>Project:</strong> ${project ? project.project_id : 'Unknown'}<br>
            <strong>Customer:</strong> ${project ? project.customer_name : 'Unknown'}<br>
            <strong>Year:</strong> Year ${record.year}<br>
            <strong>Cycle:</strong> ${record.cycle}<br>
            <strong>Scheduled Date:</strong> ${maintenanceManager.formatDate(record.scheduled_date)}<br>
            <strong>Status:</strong> ${record.status}<br>
            <strong>Technician:</strong> ${record.technician_name || 'Not assigned'}<br>
            <strong>Remarks:</strong> ${record.technician_remarks || 'No remarks'}<br>
            ${record.completion_date ? `<strong>Completion Date:</strong> ${maintenanceManager.formatDate(record.completion_date)}<br>` : ''}
            ${record.issues_found ? `<strong>Issues Found:</strong> ${record.issues_found}<br>` : ''}
        `;
        
        showModal('Maintenance Details', details);
    }
}

function editMaintenance(maintenanceId) {
    showToast('Edit functionality will be implemented', 'info');
}

function generateMaintenanceSchedule() {
    showToast('Auto-generation of maintenance schedule will be implemented', 'info');
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

function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    toastContainer.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Solar CRM</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    maintenanceManager = new MaintenanceScheduleManager();
    
    // Set today's date as default for completion date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('completionDate').value = today;
});