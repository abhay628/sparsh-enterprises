// Shared CRM Functions Library
// This file contains all the common functions used across the Solar CRM Portal

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showToast('An error occurred. Please try again.', 'error');
});

// Toast notification function (shared across all pages)
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

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function getStatusBadge(status, type = 'enquiry') {
    if (type === 'enquiry') {
        const badges = {
            'NEW': '<span class="badge bg-secondary">NEW</span>',
            'CONTACTED': '<span class="badge bg-info">CONTACTED</span>',
            'FOLLOW-UP': '<span class="badge bg-warning">FOLLOW-UP</span>',
            'CONVERTED': '<span class="badge bg-success">CONVERTED</span>',
            'REJECTED': '<span class="badge bg-danger">REJECTED</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">UNKNOWN</span>';
    } else if (type === 'project') {
        const badges = {
            'PLANNED': '<span class="badge bg-secondary">PLANNED</span>',
            'IN_PROGRESS': '<span class="badge bg-warning">IN PROGRESS</span>',
            'COMPLETED': '<span class="badge bg-info">COMPLETED</span>',
            'HANDED_OVER': '<span class="badge bg-success">HANDED OVER</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">UNKNOWN</span>';
    }
    return '<span class="badge bg-secondary">UNKNOWN</span>';
}

// Global function registry to ensure functions are available
window.CRMFunctions = {
    showToast: showToast,
    formatDate: formatDate,
    getStatusBadge: getStatusBadge
};

// Make functions globally available
window.showToast = showToast;
window.formatDate = formatDate;
window.getStatusBadge = getStatusBadge;

// Enquiry Management Functions
window.addConversation = function(enquiryId) {
    const enquiry = enquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    currentEnquiry = enquiry;
    document.getElementById('conversationModalLabel').textContent = `Add Conversation - ${enquiry.customerName}`;
    document.getElementById('conversationText').value = '';
    new bootstrap.Modal(document.getElementById('conversationModal')).show();
};

window.editEnquiry = function(enquiryId) {
    const enquiry = enquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    currentEnquiry = enquiry;
    document.getElementById('editEnquiryModalLabel').textContent = `Edit Enquiry - ${enquiry.customerName}`;
    document.getElementById('editCustomerName').value = enquiry.customerName;
    document.getElementById('editCustomerEmail').value = enquiry.email;
    document.getElementById('editCustomerPhone').value = enquiry.phone;
    document.getElementById('editMonthlyBill').value = enquiry.monthlyBill;
    document.getElementById('editCity').value = enquiry.city;
    document.getElementById('editPincode').value = enquiry.pincode;
    document.getElementById('editRoofArea').value = enquiry.roofArea;
    document.getElementById('editSystemType').value = enquiry.systemType;
    document.getElementById('editTimeline').value = enquiry.timeline;
    document.getElementById('editStatus').value = enquiry.status;
    
    new bootstrap.Modal(document.getElementById('editEnquiryModal')).show();
};

// Project Management Functions
window.updateProjectStatus = function(projectId, newStatus) {
    if (confirm(`Are you sure you want to update this project status to ${newStatus}?`)) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            project.status = newStatus;
            if (newStatus === 'COMPLETED') {
                project.progress = 100;
            } else if (newStatus === 'IN_PROGRESS') {
                project.progress = Math.max(project.progress, 50);
            }
            displayProjects();
            updateProjectStats();
            showToast(`Project status updated to ${newStatus}`, 'success');
        }
    }
};

window.editProject = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    currentProject = project;
    document.getElementById('editProjectModalLabel').textContent = `Edit Project - ${project.title}`;
    document.getElementById('editProjectTitle').value = project.title;
    document.getElementById('editProjectCustomer').value = project.customer;
    document.getElementById('editProjectCapacity').value = project.capacity;
    document.getElementById('editPanelBrand').value = project.panelBrand;
    document.getElementById('editInverterBrand').value = project.inverterBrand;
    document.getElementById('editInstallationDate').value = project.installationDate;
    document.getElementById('editCommissioningDate').value = project.commissioningDate;
    document.getElementById('editWarrantyEnd').value = project.warrantyEnd;
    document.getElementById('editProjectStatus').value = project.status;
    
    new bootstrap.Modal(document.getElementById('editProjectModal')).show();
};

// Comments/Notes functionality
window.addComment = function(type, id) {
    const commentText = document.getElementById('commentText').value.trim();
    if (!commentText) {
        showToast('Please enter a comment', 'error');
        return;
    }
    
    const timestamp = new Date().toISOString();
    const comment = {
        id: Date.now().toString(),
        text: commentText,
        author: 'Current User', // In real app, this would come from user session
        timestamp: timestamp,
        type: type
    };
    
    if (type === 'enquiry') {
        const enquiry = enquiries.find(e => e.id === id);
        if (enquiry) {
            if (!enquiry.comments) enquiry.comments = [];
            enquiry.comments.push(comment);
            showToast('Comment added successfully', 'success');
            document.getElementById('commentText').value = '';
            displayComments('enquiry', id);
        }
    } else if (type === 'project') {
        const project = projects.find(p => p.id === id);
        if (project) {
            if (!project.comments) project.comments = [];
            project.comments.push(comment);
            showToast('Comment added successfully', 'success');
            document.getElementById('commentText').value = '';
            displayComments('project', id);
        }
    }
};

window.displayComments = function(type, id) {
    let item;
    if (type === 'enquiry') {
        item = enquiries.find(e => e.id === id);
    } else if (type === 'project') {
        item = projects.find(p => p.id === id);
    }
    
    if (!item || !item.comments) return;
    
    const commentsContainer = document.getElementById('commentsContainer');
    if (!commentsContainer) return;
    
    let commentsHtml = '';
    item.comments.forEach(comment => {
        commentsHtml += `
            <div class="comment-item mb-3 pb-3 border-bottom">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <p class="mb-1">${comment.text}</p>
                        <small class="text-muted">
                            By ${comment.author} on ${formatDate(comment.timestamp)}
                        </small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteComment('${type}', '${id}', '${comment.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    if (item.comments.length === 0) {
        commentsHtml = '<p class="text-muted">No comments yet. Be the first to add one!</p>';
    }
    
    commentsContainer.innerHTML = commentsHtml;
};

window.deleteComment = function(type, itemId, commentId) {
    if (confirm('Are you sure you want to delete this comment?')) {
        let item;
        if (type === 'enquiry') {
            item = enquiries.find(e => e.id === itemId);
        } else if (type === 'project') {
            item = projects.find(p => p.id === itemId);
        }
        
        if (item && item.comments) {
            item.comments = item.comments.filter(c => c.id !== commentId);
            displayComments(type, itemId);
            showToast('Comment deleted successfully', 'success');
        }
    }
};