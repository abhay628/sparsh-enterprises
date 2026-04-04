// Complaints and SLA Management
class ComplaintsManager {
    constructor() {
        this.complaints = [];
        this.projects = [];
        this.users = [];
        this.filteredComplaints = [];
        this.categoryChart = null;
        this.slaChart = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderTable();
        this.updateStatistics();
        this.createCharts();
    }

    async loadData() {
        try {
            // Load complaints
            const complaintsResponse = await fetch('tables/complaints');
            const complaintsResult = await complaintsResponse.json();
            this.complaints = complaintsResult.data || [];

            // Load projects
            const projectsResponse = await fetch('tables/solar_projects');
            const projectsResult = await projectsResponse.json();
            this.projects = projectsResult.data || [];

            // Load users (technicians)
            const usersResponse = await fetch('tables/users');
            const usersResult = await usersResponse.json();
            this.users = usersResult.data || [];

            this.filteredComplaints = [...this.complaints];
        } catch (error) {
            console.error('Error loading data:', error);
            this.complaints = [];
            this.projects = [];
            this.users = [];
            this.filteredComplaints = [];
        }
    }

    updateStatistics() {
        const total = this.complaints.length;
        const open = this.complaints.filter(c => c.status === 'open' || c.status === 'in_progress').length;
        const resolved = this.complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
        const slaBreaches = this.complaints.filter(c => this.isSLABreach(c)).length;

        document.getElementById('totalComplaints').textContent = total;
        document.getElementById('openComplaints').textContent = open;
        document.getElementById('resolvedComplaints').textContent = resolved;
        document.getElementById('slaBreaches').textContent = slaBreaches;
    }

    isSLABreach(complaint) {
        if (complaint.status === 'resolved' || complaint.status === 'closed') return false;
        
        const slaHours = this.getSLAHours(complaint.priority);
        const createdTime = new Date(complaint.created_at).getTime();
        const now = Date.now();
        const hoursPassed = (now - createdTime) / (1000 * 60 * 60);
        
        return hoursPassed > slaHours;
    }

    getSLAHours(priority) {
        const slaHours = {
            'HIGH': 24,
            'MEDIUM': 48,
            'LOW': 72
        };
        return slaHours[priority] || 72;
    }

    getStatusBadge(status) {
        const badges = {
            'open': '<span class="badge bg-warning">Open</span>',
            'in_progress': '<span class="badge bg-primary">In Progress</span>',
            'resolved': '<span class="badge bg-success">Resolved</span>',
            'closed': '<span class="badge bg-secondary">Closed</span>',
            'sla_breach': '<span class="badge bg-danger">SLA Breach</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }

    getPriorityBadge(priority) {
        const badges = {
            'HIGH': '<span class="badge bg-danger">HIGH</span>',
            'MEDIUM': '<span class="badge bg-warning">MEDIUM</span>',
            'LOW': '<span class="badge bg-success">LOW</span>'
        };
        return badges[priority] || '<span class="badge bg-secondary">Unknown</span>';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString();
    }

    renderTable() {
        const tbody = document.getElementById('complaintsTableBody');
        tbody.innerHTML = '';

        if (this.filteredComplaints.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No complaints found</td></tr>';
            return;
        }

        this.filteredComplaints.forEach(complaint => {
            const row = document.createElement('tr');
            const project = this.projects.find(p => p.id === complaint.project_id);
            const assignedUser = this.users.find(u => u.id === complaint.assigned_to);
            const slaBreach = this.isSLABreach(complaint);
            const slaDueDate = this.getSLADueDate(complaint);

            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${project ? project.project_id : 'Unknown'}</td>
                <td>${project ? project.customer_name : 'Unknown'}</td>
                <td>${complaint.category}</td>
                <td>${this.getPriorityBadge(complaint.priority)}</td>
                <td>
                    ${this.getStatusBadge(complaint.status)}
                    ${slaBreach ? '<span class="badge bg-danger ms-1">SLA Breach!</span>' : ''}
                </td>
                <td>${this.formatDate(complaint.created_at)}</td>
                <td>
                    ${this.formatDateTime(slaDueDate)}
                    ${slaBreach ? '<br><small class="text-danger">Overdue</small>' : ''}
                </td>
                <td>${assignedUser ? assignedUser.full_name : 'Unassigned'}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-primary" onclick="viewComplaintDetails('${complaint.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="openStatusModal('${complaint.id}')" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="addComment('${complaint.id}')" title="Add Comment">
                            <i class="fas fa-comment"></i>
                        </button>
                        ${complaint.status === 'open' ? `
                            <button class="btn btn-sm btn-success" onclick="assignTechnician('${complaint.id}')" title="Assign Technician">
                                <i class="fas fa-user-check"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getSLADueDate(complaint) {
        const slaHours = this.getSLAHours(complaint.priority);
        const createdTime = new Date(complaint.created_at).getTime();
        return new Date(createdTime + (slaHours * 60 * 60 * 1000));
    }

    createCharts() {
        this.createCategoryChart();
        this.createSLAChart();
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const categories = {};
        
        this.complaints.forEach(complaint => {
            categories[complaint.category] = (categories[complaint.category] || 0) + 1;
        });

        if (this.categoryChart) {
            this.categoryChart.destroy();
        }

        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
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

    createSLAChart() {
        const ctx = document.getElementById('slaChart').getContext('2d');
        const slaData = {
            compliant: 0,
            breached: 0
        };

        this.complaints.forEach(complaint => {
            if (this.isSLABreach(complaint)) {
                slaData.breached++;
            } else if (complaint.status !== 'resolved' && complaint.status !== 'closed') {
                slaData.compliant++;
            }
        });

        if (this.slaChart) {
            this.slaChart.destroy();
        }

        this.slaChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['SLA Compliant', 'SLA Breached'],
                datasets: [{
                    label: 'Count',
                    data: [slaData.compliant, slaData.breached],
                    backgroundColor: ['#28a745', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    populateCreateComplaintForm() {
        const projectSelect = document.getElementById('projectId');
        const assignedToSelect = document.getElementById('assignedTo');

        // Populate projects
        projectSelect.innerHTML = '<option value="">Select Project</option>';
        this.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `${project.project_id} - ${project.customer_name}`;
            projectSelect.appendChild(option);
        });

        // Populate technicians
        assignedToSelect.innerHTML = '<option value="">Select Technician</option>';
        this.users.filter(user => user.role === 'TECHNICIAN' || user.role === 'OPERATOR').forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.full_name;
            assignedToSelect.appendChild(option);
        });

        // Set default preferred time to current time + 2 hours
        const defaultTime = new Date();
        defaultTime.setHours(defaultTime.getHours() + 2);
        document.getElementById('preferredTime').value = defaultTime.toISOString().slice(0, 16);
    }
}

// Global functions
let complaintsManager;

function applyFilters() {
    const projectFilter = document.getElementById('filterProject').value;
    const categoryFilter = document.getElementById('filterCategory').value;
    const priorityFilter = document.getElementById('filterPriority').value;
    const statusFilter = document.getElementById('filterStatus').value;

    complaintsManager.filteredComplaints = complaintsManager.complaints.filter(complaint => {
        if (projectFilter && complaint.project_id !== projectFilter) return false;
        if (categoryFilter && complaint.category !== categoryFilter) return false;
        if (priorityFilter && complaint.priority !== priorityFilter) return false;
        if (statusFilter) {
            if (statusFilter === 'sla_breach') {
                if (!complaintsManager.isSLABreach(complaint)) return false;
            } else if (complaint.status !== statusFilter) {
                return false;
            }
        }
        return true;
    });

    complaintsManager.renderTable();
}

function resetFilters() {
    document.getElementById('filterProject').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterPriority').value = '';
    document.getElementById('filterStatus').value = '';
    complaintsManager.filteredComplaints = [...complaintsManager.complaints];
    complaintsManager.renderTable();
}

function showCreateComplaintModal() {
    complaintsManager.populateCreateComplaintForm();
    new bootstrap.Modal(document.getElementById('createComplaintModal')).show();
}

async function submitComplaint() {
    const formData = {
        project_id: document.getElementById('projectId').value,
        category: document.getElementById('category').value,
        priority: document.getElementById('priority').value,
        assigned_to: document.getElementById('assignedTo').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        contact_method: document.getElementById('contactMethod').value,
        preferred_contact_time: document.getElementById('preferredTime').value,
        status: 'open',
        created_at: Date.now(),
        updated_at: Date.now()
    };

    try {
        const response = await fetch('tables/complaints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Complaint created successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('createComplaintModal')).hide();
            await complaintsManager.loadData();
            complaintsManager.renderTable();
            complaintsManager.updateStatistics();
            complaintsManager.createCharts();
        } else {
            throw new Error('Failed to create complaint');
        }
    } catch (error) {
        console.error('Error creating complaint:', error);
        showToast('Error creating complaint', 'error');
    }
}

function openStatusModal(complaintId) {
    document.getElementById('complaintId').value = complaintId;
    new bootstrap.Modal(document.getElementById('updateStatusModal')).show();
}

async function updateComplaintStatus() {
    const complaintId = document.getElementById('complaintId').value;
    const formData = {
        status: document.getElementById('newStatus').value,
        status_comments: document.getElementById('statusComments').value,
        resolution_time: document.getElementById('resolutionTime').value ? parseFloat(document.getElementById('resolutionTime').value) : null,
        updated_at: Date.now()
    };

    try {
        const response = await fetch(`tables/complaints/${complaintId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Complaint status updated successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('updateStatusModal')).hide();
            await complaintsManager.loadData();
            complaintsManager.renderTable();
            complaintsManager.updateStatistics();
            complaintsManager.createCharts();
        } else {
            throw new Error('Failed to update complaint status');
        }
    } catch (error) {
        console.error('Error updating complaint status:', error);
        showToast('Error updating complaint status', 'error');
    }
}

function viewComplaintDetails(complaintId) {
    const complaint = complaintsManager.complaints.find(c => c.id === complaintId);
    if (complaint) {
        const project = complaintsManager.projects.find(p => p.id === complaint.project_id);
        const assignedUser = complaintsManager.users.find(u => u.id === complaint.assigned_to);
        const slaDueDate = complaintsManager.getSLADueDate(complaint);
        const slaBreach = complaintsManager.isSLABreach(complaint);

        const details = `
            <strong>Complaint ID:</strong> ${complaint.id}<br>
            <strong>Project:</strong> ${project ? project.project_id : 'Unknown'}<br>
            <strong>Customer:</strong> ${project ? project.customer_name : 'Unknown'}<br>
            <strong>Category:</strong> ${complaint.category}<br>
            <strong>Priority:</strong> ${complaint.priority}<br>
            <strong>Status:</strong> ${complaint.status}<br>
            <strong>Subject:</strong> ${complaint.subject}<br>
            <strong>Description:</strong> ${complaint.description}<br>
            <strong>Created:</strong> ${complaintsManager.formatDateTime(complaint.created_at)}<br>
            <strong>SLA Due:</strong> ${complaintsManager.formatDateTime(slaDueDate)}<br>
            ${slaBreach ? '<strong class="text-danger">SLA Breach: Yes</strong><br>' : ''}
            <strong>Assigned To:</strong> ${assignedUser ? assignedUser.full_name : 'Unassigned'}<br>
            <strong>Contact Method:</strong> ${complaint.contact_method}<br>
            ${complaint.status_comments ? `<strong>Comments:</strong> ${complaint.status_comments}<br>` : ''}
        `;
        
        showModal('Complaint Details', details);
    }
}

function addComment(complaintId) {
    showToast('Add comment functionality will be implemented', 'info');
}

function assignTechnician(complaintId) {
    showToast('Assign technician functionality will be implemented', 'info');
}

function checkSLABreaches() {
    const breaches = complaintsManager.complaints.filter(c => complaintsManager.isSLABreach(c));
    if (breaches.length > 0) {
        showToast(`Found ${breaches.length} SLA breach(es)!`, 'warning');
    } else {
        showToast('No SLA breaches found', 'success');
    }
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    complaintsManager = new ComplaintsManager();
});