// Project Management JavaScript

let allProjects = [];
let filteredProjects = [];

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showToast('An error occurred. Please try again.', 'error');
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project Management page loaded');
    loadProjects();
    initializeProjectTimelineChart();
    
    // Ensure functions are available globally
    window.updateProjectStatus = updateProjectStatus;
    window.editProject = editProject;
});

// Load projects
async function loadProjects() {
    try {
        // Simulate API call with mock data
        allProjects = generateMockProjects(20);
        filteredProjects = [...allProjects];
        
        displayProjects();
        updateProjectStats();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showToast('Error loading projects', 'error');
    }
}

// Generate mock projects
function generateMockProjects(count) {
    const mockData = [];
    const statuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'HANDED_OVER'];
    const panelBrands = ['Waaree', 'Adani', 'Tata Power', 'Vikram Solar'];
    const inverterBrands = ['Solis', 'Growatt', 'SMA', 'Fronius'];
    const customers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Maria Garcia', 'David Wilson'];
    
    for (let i = 1; i <= count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const capacity = (Math.random() * 10 + 2).toFixed(1); // 2-12 kW
        const progress = status === 'PLANNED' ? 0 : status === 'IN_PROGRESS' ? Math.floor(Math.random() * 60) + 20 : 
                        status === 'COMPLETED' ? 100 : 100;
        
        const installationDate = new Date();
        installationDate.setDate(installationDate.getDate() - Math.floor(Math.random() * 60));
        
        const commissioningDate = new Date(installationDate);
        commissioningDate.setDate(commissioningDate.getDate() + Math.floor(Math.random() * 10) + 3);
        
        const warrantyEndDate = new Date(commissioningDate);
        warrantyEndDate.setFullYear(warrantyEndDate.getFullYear() + 5);
        
        mockData.push({
            id: 'PROJ' + String(i).padStart(4, '0'),
            title: `Solar Installation - Project ${i}`,
            customer_id: 'CUST' + String(Math.floor(Math.random() * 5) + 1).padStart(3, '0'),
            customer_name: customers[Math.floor(Math.random() * customers.length)],
            system_capacity_kw: parseFloat(capacity),
            panel_brand: panelBrands[Math.floor(Math.random() * panelBrands.length)],
            inverter_brand: inverterBrands[Math.floor(Math.random() * inverterBrands.length)],
            installation_date: installationDate.toISOString().split('T')[0],
            commissioning_date: commissioningDate.toISOString().split('T')[0],
            warranty_end_date: warrantyEndDate.toISOString().split('T')[0],
            status: status,
            progress: progress,
            created_at: new Date().toISOString()
        });
    }
    
    return mockData;
}

// Display projects
function displayProjects() {
    const tbody = document.getElementById('projectsTable');
    
    if (filteredProjects.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4 text-muted">
                    <i class="fas fa-inbox fa-3x mb-3 opacity-50"></i>
                    <p>No projects found</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredProjects.map(project => {
        const statusBadge = getProjectStatusBadge(project.status);
        const progressBar = `
            <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-${project.progress === 100 ? 'success' : 'primary'}" 
                     role="progressbar" 
                     style="width: ${project.progress}%"
                     aria-valuenow="${project.progress}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                </div>
            </div>
            <small class="text-muted">${project.progress}%</small>
        `;
        
        return `
            <tr>
                <td>
                    <strong>${project.id}</strong>
                    <br><small class="text-muted">${project.title}</small>
                </td>
                <td>
                    <strong>${project.customer_name}</strong>
                </td>
                <td>
                    <strong>${project.system_capacity_kw} kW</strong>
                    <br><small class="text-muted">${project.panel_brand}</small>
                </td>
                <td>
                    <div><strong>Panels:</strong> ${project.panel_brand}</div>
                    <div><strong>Inverter:</strong> ${project.inverter_brand}</div>
                </td>
                <td>
                    <div><strong>Install:</strong> ${formatDate(project.installation_date)}</div>
                    <div><strong>Commission:</strong> ${formatDate(project.commissioning_date)}</div>
                    <div><strong>Warranty:</strong> ${formatDate(project.warranty_end_date)}</div>
                </td>
                <td>
                    ${statusBadge}
                </td>
                <td>
                    ${progressBar}
                </td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-primary" onclick="viewProjectDetails('${project.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="editProject('${project.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-info" onclick="addProjectComment('${project.id}')" title="Add Comment">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button class="btn btn-outline-success" onclick="updateProjectStatus('${project.id}', 'COMPLETED')" title="Complete">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Get project status badge
function getProjectStatusBadge(status) {
    const badges = {
        'PLANNED': '<span class="badge bg-secondary">PLANNED</span>',
        'IN_PROGRESS': '<span class="badge bg-warning">IN PROGRESS</span>',
        'COMPLETED': '<span class="badge bg-info">COMPLETED</span>',
        'HANDED_OVER': '<span class="badge bg-success">HANDED OVER</span>'
    };
    return badges[status] || '<span class="badge bg-secondary">UNKNOWN</span>';
}

// Update project stats
function updateProjectStats() {
    const stats = {
        total: allProjects.length,
        planned: allProjects.filter(p => p.status === 'PLANNED').length,
        inProgress: allProjects.filter(p => p.status === 'IN_PROGRESS').length,
        completed: allProjects.filter(p => p.status === 'COMPLETED').length,
        handedOver: allProjects.filter(p => p.status === 'HANDED_OVER').length
    };
    
    document.getElementById('totalProjects').textContent = stats.total;
    document.getElementById('inProgressProjects').textContent = stats.inProgress;
    document.getElementById('completedProjects').textContent = stats.completed;
    document.getElementById('handedOverProjects').textContent = stats.handedOver;
}

// Filter projects
function filterProjects() {
    const selectedStatus = document.querySelector('input[name="statusFilter"]:checked').id.replace('Status', '').toUpperCase();
    
    if (selectedStatus === 'ALL') {
        filteredProjects = [...allProjects];
    } else {
        filteredProjects = allProjects.filter(p => p.status === selectedStatus);
    }
    
    displayProjects();
}

// Initialize project timeline chart
function initializeProjectTimelineChart() {
    const ctx = document.getElementById('projectTimelineChart').getContext('2d');
    
    // Generate timeline data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const plannedData = [5, 8, 12, 15, 18, 22, 25, 28, 31, 35, 38, 42];
    const inProgressData = [3, 5, 8, 12, 15, 18, 20, 22, 25, 28, 30, 32];
    const completedData = [2, 3, 5, 8, 12, 15, 18, 20, 22, 25, 28, 30];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Planned',
                data: plannedData,
                borderColor: '#6c757d',
                backgroundColor: 'rgba(108, 117, 125, 0.1)',
                tension: 0.4
            }, {
                label: 'In Progress',
                data: inProgressData,
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                tension: 0.4
            }, {
                label: 'Completed',
                data: completedData,
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Projects'
                    }
                }
            }
        }
    });
}

// View project details
function viewProjectDetails(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const content = `
        <div class="row g-4">
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Project Information</h6>
                <div class="mb-2"><strong>Project ID:</strong> ${project.id}</div>
                <div class="mb-2"><strong>Title:</strong> ${project.title}</div>
                <div class="mb-2"><strong>Customer:</strong> ${project.customer_name}</div>
                <div class="mb-2"><strong>Capacity:</strong> ${project.system_capacity_kw} kW</div>
                <div class="mb-2"><strong>Status:</strong> ${getProjectStatusBadge(project.status)}</div>
            </div>
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Equipment Details</h6>
                <div class="mb-2"><strong>Panel Brand:</strong> ${project.panel_brand}</div>
                <div class="mb-2"><strong>Inverter Brand:</strong> ${project.inverter_brand}</div>
                <div class="mb-2"><strong>Installation:</strong> ${formatDate(project.installation_date)}</div>
                <div class="mb-2"><strong>Commissioning:</strong> ${formatDate(project.commissioning_date)}</div>
                <div class="mb-2"><strong>Warranty End:</strong> ${formatDate(project.warranty_end_date)}</div>
            </div>
            <div class="col-12">
                <h6 class="text-muted mb-3">Project Progress</h6>
                <div class="progress mb-2" style="height: 20px;">
                    <div class="progress-bar bg-${project.progress === 100 ? 'success' : 'primary'}" 
                         role="progressbar" 
                         style="width: ${project.progress}%"
                         aria-valuenow="${project.progress}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${project.progress}%
                    </div>
                </div>
                <small class="text-muted">Project completion status</small>
            </div>
        </div>
        
        <!-- Comments Section -->
        <div class="row mt-4">
            <div class="col-12">
                <h6 class="text-muted mb-3">Comments & Notes</h6>
                <div class="row">
                    <div class="col-md-8">
                        <div id="commentsContainer" class="comments-list">
                            <!-- Comments will be loaded here -->
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">Add Comment</h6>
                                <textarea id="commentText" class="form-control mb-3" rows="3" placeholder="Enter your comment or note..."></textarea>
                                <button class="btn btn-primary btn-sm" onclick="addComment('project', '${project.id}')">
                                    <i class="fas fa-plus me-1"></i>Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h6 class="text-muted mb-3">Actions</h6>
                <div class="btn-group" role="group">
                    <button class="btn btn-primary" onclick="generateMaintenanceSchedule('${project.id}')">
                        <i class="fas fa-wrench me-1"></i>Generate Maintenance
                    </button>
                    <button class="btn btn-info" onclick="viewProjectDocuments('${project.id}')">
                        <i class="fas fa-file-alt me-1"></i>Documents
                    </button>
                    <button class="btn btn-success" onclick="handoverProject('${project.id}')">
                        <i class="fas fa-handshake me-1"></i>Handover
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('projectDetailsContent').innerHTML = content;
    new bootstrap.Modal(document.getElementById('projectDetailsModal')).show();
    
    // Load comments after modal is shown
    setTimeout(() => {
        displayComments('project', projectId);
    }, 300);
}

// Update project status
function updateProjectStatus(projectId, newStatus) {
    try {
        const project = allProjects.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // Show confirmation dialog
        const confirmMessage = `Are you sure you want to update project ${projectId} to ${newStatus}?`;
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Update project status
        project.status = newStatus;
        project.updated_at = new Date().toISOString();
        
        // Update progress based on status
        switch (newStatus) {
            case 'PLANNED':
                project.progress = 0;
                break;
            case 'IN_PROGRESS':
                project.progress = Math.max(project.progress, 20);
                break;
            case 'COMPLETED':
                project.progress = 100;
                break;
            case 'HANDED_OVER':
                project.progress = 100;
                break;
        }
        
        // Refresh display
        displayProjects();
        updateProjectStats();
        
        // Show success message
        showToast(`Project ${projectId} status updated to ${newStatus}`, 'success');
        
    } catch (error) {
        console.error('Error updating project status:', error);
        showToast('Error updating project status', 'error');
    }
}

// Edit project
function editProject(projectId) {
    try {
        const project = allProjects.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // Create modal for editing project
        const modalHtml = `
            <div class="modal fade" id="editProjectModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            <h5 class="modal-title">
                                <i class="fas fa-edit me-2"></i>Edit Project - ${project.id}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editProjectForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Project Title</label>
                                        <input type="text" class="form-control" id="editProjectTitle" value="${project.title}" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Customer</label>
                                        <select class="form-select" id="editCustomer" required>
                                            <option value="">Select Customer</option>
                                            <option value="CUST001" ${project.customer_id === 'CUST001' ? 'selected' : ''}>John Doe</option>
                                            <option value="CUST002" ${project.customer_id === 'CUST002' ? 'selected' : ''}>Jane Smith</option>
                                            <option value="CUST003" ${project.customer_id === 'CUST003' ? 'selected' : ''}>Robert Johnson</option>
                                            <option value="CUST004" ${project.customer_id === 'CUST004' ? 'selected' : ''}>Maria Garcia</option>
                                            <option value="CUST005" ${project.customer_id === 'CUST005' ? 'selected' : ''}>David Wilson</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">System Capacity (kW)</label>
                                        <input type="number" class="form-control" id="editSystemCapacity" value="${project.system_capacity_kw}" step="0.1" min="1" max="100" required>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Panel Brand</label>
                                        <select class="form-select" id="editPanelBrand" required>
                                            <option value="">Select Brand</option>
                                            <option value="Waaree" ${project.panel_brand === 'Waaree' ? 'selected' : ''}>Waaree</option>
                                            <option value="Adani" ${project.panel_brand === 'Adani' ? 'selected' : ''}>Adani</option>
                                            <option value="Tata Power" ${project.panel_brand === 'Tata Power' ? 'selected' : ''}>Tata Power</option>
                                            <option value="Vikram Solar" ${project.panel_brand === 'Vikram Solar' ? 'selected' : ''}>Vikram Solar</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Inverter Brand</label>
                                        <select class="form-select" id="editInverterBrand" required>
                                            <option value="">Select Brand</option>
                                            <option value="Solis" ${project.inverter_brand === 'Solis' ? 'selected' : ''}>Solis</option>
                                            <option value="Growatt" ${project.inverter_brand === 'Growatt' ? 'selected' : ''}>Growatt</option>
                                            <option value="SMA" ${project.inverter_brand === 'SMA' ? 'selected' : ''}>SMA</option>
                                            <option value="Fronius" ${project.inverter_brand === 'Fronius' ? 'selected' : ''}>Fronius</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Installation Date</label>
                                        <input type="date" class="form-control" id="editInstallationDate" value="${project.installation_date}" required>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Commissioning Date</label>
                                        <input type="date" class="form-control" id="editCommissioningDate" value="${project.commissioning_date}" required>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Warranty End Date</label>
                                        <input type="date" class="form-control" id="editWarrantyEndDate" value="${project.warranty_end_date}" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Project Status</label>
                                        <select class="form-select" id="editProjectStatus" required>
                                            <option value="PLANNED" ${project.status === 'PLANNED' ? 'selected' : ''}>PLANNED</option>
                                            <option value="IN_PROGRESS" ${project.status === 'IN_PROGRESS' ? 'selected' : ''}>IN_PROGRESS</option>
                                            <option value="COMPLETED" ${project.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
                                            <option value="HANDED_OVER" ${project.status === 'HANDED_OVER' ? 'selected' : ''}>HANDED_OVER</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Progress (%)</label>
                                        <input type="number" class="form-control" id="editProgress" value="${project.progress}" min="0" max="100" required>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label">Notes</label>
                                        <textarea class="form-control" id="editProjectNotes" rows="3" placeholder="Any additional notes or comments">${project.notes || ''}</textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-warning" onclick="saveEditedProject('${projectId}')">
                                <i class="fas fa-save me-1"></i>Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('editProjectModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        new bootstrap.Modal(document.getElementById('editProjectModal')).show();
        
    } catch (error) {
        console.error('Error editing project:', error);
        showToast('Error opening edit project', 'error');
    }
}

// Save edited project
function saveEditedProject(projectId) {
    try {
        const project = allProjects.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // Get form data
        const updatedData = {
            title: document.getElementById('editProjectTitle').value,
            customer_id: document.getElementById('editCustomer').value,
            system_capacity_kw: parseFloat(document.getElementById('editSystemCapacity').value),
            panel_brand: document.getElementById('editPanelBrand').value,
            inverter_brand: document.getElementById('editInverterBrand').value,
            installation_date: document.getElementById('editInstallationDate').value,
            commissioning_date: document.getElementById('editCommissioningDate').value,
            warranty_end_date: document.getElementById('editWarrantyEndDate').value,
            status: document.getElementById('editProjectStatus').value,
            progress: parseInt(document.getElementById('editProgress').value),
            notes: document.getElementById('editProjectNotes').value,
            updated_at: new Date().toISOString()
        };
        
        // Validate required fields
        if (!updatedData.title || !updatedData.customer_id) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Update project
        Object.assign(project, updatedData);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('editProjectModal')).hide();
        
        // Refresh display
        displayProjects();
        updateProjectStats();
        
        // Show success message
        showToast('Project updated successfully!', 'success');
        
        // Remove modal from DOM
        setTimeout(() => {
            document.getElementById('editProjectModal').remove();
        }, 500);
        
    } catch (error) {
        console.error('Error saving edited project:', error);
        showToast('Error saving project changes', 'error');
    }
}

// Add new project
function addNewProject() {
    const formData = {
        title: document.getElementById('addProjectTitle').value,
        customer_id: document.getElementById('addCustomer').value,
        system_capacity_kw: parseFloat(document.getElementById('addSystemCapacity').value),
        panel_brand: document.getElementById('addPanelBrand').value,
        inverter_brand: document.getElementById('addInverterBrand').value,
        installation_date: document.getElementById('addInstallationDate').value,
        commissioning_date: document.getElementById('addCommissioningDate').value,
        status: document.getElementById('addProjectStatus').value,
        progress: 0
    };
    
    try {
        // Simulate API call
        const newProject = {
            id: 'PROJ' + String(allProjects.length + 1).padStart(4, '0'),
            ...formData,
            warranty_end_date: new Date(new Date(formData.commissioning_date).getTime() + (5 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            created_at: new Date().toISOString()
        };
        
        allProjects.unshift(newProject);
        filteredProjects = [...allProjects];
        
        displayProjects();
        updateProjectStats();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
        document.getElementById('addProjectForm').reset();
        
        showToast('Project added successfully!', 'success');
        
    } catch (error) {
        console.error('Error adding project:', error);
        showToast('Error adding project', 'error');
    }
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Add project comment
function addProjectComment(projectId) {
    try {
        const project = allProjects.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // Create modal for adding project comment
        const modalHtml = `
            <div class="modal fade" id="addProjectCommentModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-comment me-2"></i>Add Project Comment - ${project.id}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addProjectCommentForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Comment Type</label>
                                        <select class="form-select" id="commentType" required>
                                            <option value="">Select Type</option>
                                            <option value="NOTE">Internal Note</option>
                                            <option value="UPDATE">Status Update</option>
                                            <option value="ISSUE">Issue/Risk</option>
                                            <option value="DECISION">Decision Made</option>
                                            <option value="CUSTOMER">Customer Communication</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Priority</label>
                                        <select class="form-select" id="commentPriority">
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM" selected>Medium</option>
                                            <option value="HIGH">High</option>
                                            <option value="URGENT">Urgent</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label">Comment *</label>
                                        <textarea class="form-control" id="commentText" rows="4" placeholder="Enter your comment, note, or update..." required></textarea>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Follow-up Required</label>
                                        <select class="form-select" id="followUpRequired">
                                            <option value="NO" selected>No</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Follow-up Date</label>
                                        <input type="date" class="form-control" id="followUpDate">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-info" onclick="saveProjectComment('${projectId}')">
                                <i class="fas fa-save me-1"></i>Save Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('addProjectCommentModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        new bootstrap.Modal(document.getElementById('addProjectCommentModal')).show();
        
    } catch (error) {
        console.error('Error adding project comment:', error);
        showToast('Error opening comment dialog', 'error');
    }
}

// Save project comment
function saveProjectComment(projectId) {
    try {
        const commentData = {
            type: document.getElementById('commentType').value,
            text: document.getElementById('commentText').value,
            priority: document.getElementById('commentPriority').value,
            followUpRequired: document.getElementById('followUpRequired').value,
            followUpDate: document.getElementById('followUpDate').value,
            created_at: new Date().toISOString()
        };
        
        // Validate required fields
        if (!commentData.type || !commentData.text) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate API call
        console.log('Saving project comment:', { projectId, commentData });
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('addProjectCommentModal')).hide();
        
        // Show success message
        showToast('Project comment added successfully!', 'success');
        
        // Remove modal from DOM
        setTimeout(() => {
            document.getElementById('addProjectCommentModal').remove();
        }, 500);
        
    } catch (error) {
        console.error('Error saving project comment:', error);
        showToast('Error saving comment', 'error');
    }
}

// Placeholder functions for project actions
function generateMaintenanceSchedule(projectId) {
    showToast(`Maintenance schedule generated for project ${projectId}`, 'success');
}

function viewProjectDocuments(projectId) {
    showToast(`Document viewer for project ${projectId}`, 'info');
}

function handoverProject(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    
    if (confirm(`Are you sure you want to handover project ${projectId}?`)) {
        project.status = 'HANDED_OVER';
        project.progress = 100;
        project.updated_at = new Date().toISOString();
        
        displayProjects();
        updateProjectStats();
        showToast(`Project ${projectId} handed over successfully!`, 'success');
    }
}

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

// Global function registry
window.ProjectFunctions = {
    updateProjectStatus: updateProjectStatus,
    editProject: editProject,
    viewProjectDetails: viewProjectDetails,
    saveEditedProject: saveEditedProject,
    addProjectComment: addProjectComment,
    saveProjectComment: saveProjectComment
};