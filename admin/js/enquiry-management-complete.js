// Enquiry Management JavaScript - Complete Implementation

let currentPage = 1;
const itemsPerPage = 10;
let allEnquiries = [];
let filteredEnquiries = [];
let currentEnquiryId = null; // For tracking current enquiry being edited

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadEnquiries();
    initializeFilters();
});

// Load enquiries
async function loadEnquiries() {
    try {
        // Simulate API call with mock data
        allEnquiries = generateMockEnquiries(25);
        filteredEnquiries = [...allEnquiries];
        
        displayEnquiries();
        updatePagination();
        
    } catch (error) {
        console.error('Error loading enquiries:', error);
        showToast('Error loading enquiries', 'error');
    }
}

// Generate mock enquiries
function generateMockEnquiries(count) {
    const mockData = [];
    const statuses = ['NEW', 'CONTACTED', 'FOLLOW-UP', 'CONVERTED', 'REJECTED'];
    const systemTypes = ['grid-tied', 'off-grid', 'hybrid'];
    const cities = ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];
    
    for (let i = 1; i <= count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
        
        mockData.push({
            id: 'ENQ' + String(i).padStart(6, '0'),
            enquiry_id: 'ENQ' + String(i).padStart(6, '0'),
            full_name: `Customer ${i}`,
            email: `customer${i}@email.com`,
            whatsapp: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            city: cities[Math.floor(Math.random() * cities.length)],
            pincode: String(Math.floor(Math.random() * 900000) + 100000),
            monthly_bill: Math.floor(Math.random() * 10000) + 2000,
            roof_area: Math.floor(Math.random() * 1000) + 500,
            system_type: systemTypes[Math.floor(Math.random() * systemTypes.length)],
            planning_after_months: [0, 12, 24, 36][Math.floor(Math.random() * 4)],
            status: status,
            created_at: createdAt.toISOString(),
            assigned_to: Math.random() > 0.5 ? 'OP001' : null,
            notes: `Sample notes for enquiry ${i}`,
            conversations: [] // Initialize empty conversations array
        });
    }
    
    return mockData;
}

// Display enquiries
function displayEnquiries() {
    const tbody = document.getElementById('enquiriesTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredEnquiries.slice(startIndex, endIndex);
    
    if (pageItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4 text-muted">
                    <i class="fas fa-inbox fa-3x mb-3 opacity-50"></i>
                    <p>No enquiries found</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pageItems.map(enquiry => {
        const statusBadge = getStatusBadge(enquiry.status);
        const planText = enquiry.planning_after_months === 0 ? 'Immediate' : `${enquiry.planning_after_months} months`;
        
        return `
            <tr>
                <td>
                    <strong>${enquiry.enquiry_id}</strong>
                    <br><small class="text-muted">${planText}</small>
                </td>
                <td>
                    <strong>${enquiry.full_name}</strong>
                    <br><small class="text-muted">${enquiry.email}</small>
                </td>
                <td>
                    <i class="fab fa-whatsapp text-success me-1"></i>
                    ${enquiry.whatsapp}
                </td>
                <td>
                    <strong>${enquiry.city}</strong>
                    <br><small class="text-muted">${enquiry.pincode}</small>
                </td>
                <td>
                    <span class="badge bg-secondary text-capitalize">${enquiry.system_type.replace('-', ' ')}</span>
                </td>
                <td>
                    <strong>₹${enquiry.monthly_bill.toLocaleString()}</strong>
                </td>
                <td>
                    ${statusBadge}
                </td>
                <td>
                    <small class="text-muted">${new Date(enquiry.created_at).toLocaleDateString('en-IN')}</small>
                </td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-primary" onclick="viewEnquiryDetails('${enquiry.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="editEnquiry('${enquiry.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-success" onclick="addConversation('${enquiry.id}')" title="Add Conversation/Note">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // Update counts
    document.getElementById('totalCount').textContent = `${filteredEnquiries.length} Enquiries`;
    document.getElementById('showingCount').textContent = pageItems.length;
    document.getElementById('totalEnquiries').textContent = filteredEnquiries.length;
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        'NEW': '<span class="badge bg-secondary">NEW</span>',
        'CONTACTED': '<span class="badge bg-info">CONTACTED</span>',
        'FOLLOW-UP': '<span class="badge bg-warning">FOLLOW-UP</span>',
        'CONVERTED': '<span class="badge bg-success">CONVERTED</span>',
        'REJECTED': '<span class="badge bg-danger">REJECTED</span>'
    };
    return badges[status] || '<span class="badge bg-secondary">UNKNOWN</span>';
}

// View enquiry details
async function viewEnquiryDetails(enquiryId) {
    try {
        const enquiry = allEnquiries.find(e => e.id === enquiryId);
        if (!enquiry) {
            showToast('Enquiry not found', 'error');
            return;
        }
        
        // Create detailed modal content
        const modalContent = `
            <div class="row">
                <div class="col-md-6">
                    <h6><i class="fas fa-user me-2"></i>Customer Information</h6>
                    <table class="table table-sm">
                        <tr><td><strong>Name:</strong></td><td>${enquiry.full_name}</td></tr>
                        <tr><td><strong>Email:</strong></td><td>${enquiry.email}</td></tr>
                        <tr><td><strong>WhatsApp:</strong></td><td>${enquiry.whatsapp}</td></tr>
                        <tr><td><strong>City:</strong></td><td>${enquiry.city}</td></tr>
                        <tr><td><strong>Pincode:</strong></td><td>${enquiry.pincode}</td></tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-solar-panel me-2"></i>System Requirements</h6>
                    <table class="table table-sm">
                        <tr><td><strong>Monthly Bill:</strong></td><td>₹${enquiry.monthly_bill.toLocaleString()}</td></tr>
                        <tr><td><strong>Roof Area:</strong></td><td>${enquiry.roof_area} sq ft</td></tr>
                        <tr><td><strong>System Type:</strong></td><td>${enquiry.system_type.replace('-', ' ')}</td></tr>
                        <tr><td><strong>Planning:</strong></td><td>${enquiry.planning_after_months === 0 ? 'Immediate' : enquiry.planning_after_months + ' months'}</td></tr>
                        <tr><td><strong>Status:</strong></td><td>${getStatusBadge(enquiry.status)}</td></tr>
                    </table>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <h6><i class="fas fa-comments me-2"></i>Conversations & Notes</h6>
                    <div id="conversationsList" class="mb-3">
                        ${renderConversations(enquiry.conversations || [])}
                    </div>
                    <div class="input-group">
                        <textarea class="form-control" id="newConversation" rows="2" placeholder="Add a note or conversation..."></textarea>
                        <button class="btn btn-success" onclick="saveConversation('${enquiryId}')">
                            <i class="fas fa-save me-1"></i>Save
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <h6><i class="fas fa-info-circle me-2"></i>Additional Information</h6>
                    <p class="text-muted">${enquiry.notes || 'No additional notes available.'}</p>
                    <small class="text-muted">Created: ${new Date(enquiry.created_at).toLocaleString('en-IN')}</small>
                </div>
            </div>
        `;
        
        document.getElementById('enquiryDetailsContent').innerHTML = modalContent;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('enquiryDetailsModal'));
        modal.show();
        
    } catch (error) {
        console.error('Error viewing enquiry details:', error);
        showToast('Error viewing enquiry details', 'error');
    }
}

// Render conversations
function renderConversations(conversations) {
    if (!conversations || conversations.length === 0) {
        return '<div class="text-muted text-center py-3">No conversations yet. Add your first note!</div>';
    }
    
    return conversations.map(conv => `
        <div class="border-start border-primary border-3 ps-3 mb-3">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong>${conv.type || 'Note'}</strong>
                    <div class="text-muted small">${new Date(conv.created_at).toLocaleString('en-IN')}</div>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteConversation('${conv.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="mt-2">${conv.content}</div>
        </div>
    `).join('');
}

// Add conversation/note
function addConversation(enquiryId) {
    currentEnquiryId = enquiryId;
    
    // Create a simple prompt for quick note addition
    const noteContent = prompt('Enter your note or conversation:');
    if (!noteContent || noteContent.trim() === '') {
        return;
    }
    
    saveConversation(enquiryId, noteContent.trim());
}

// Save conversation
async function saveConversation(enquiryId, content = null) {
    try {
        const conversationContent = content || document.getElementById('newConversation')?.value;
        if (!conversationContent || conversationContent.trim() === '') {
            showToast('Please enter a conversation or note', 'warning');
            return;
        }
        
        const enquiry = allEnquiries.find(e => e.id === enquiryId);
        if (!enquiry) {
            showToast('Enquiry not found', 'error');
            return;
        }
        
        // Create new conversation
        const newConversation = {
            id: 'CONV' + Date.now(),
            content: conversationContent.trim(),
            type: 'NOTE',
            created_at: new Date().toISOString(),
            created_by: 'Current User'
        };
        
        // Add to enquiry's conversations array
        if (!enquiry.conversations) {
            enquiry.conversations = [];
        }
        enquiry.conversations.unshift(newConversation);
        
        // Clear input if using modal
        const input = document.getElementById('newConversation');
        if (input) input.value = '';
        
        // Refresh the details view if modal is open
        const modal = document.getElementById('enquiryDetailsModal');
        if (modal && modal.classList.contains('show')) {
            viewEnquiryDetails(enquiryId);
        }
        
        showToast('Conversation added successfully!', 'success');
        
    } catch (error) {
        console.error('Error saving conversation:', error);
        showToast('Error saving conversation', 'error');
    }
}

// Delete conversation
function deleteConversation(conversationId) {
    if (!confirm('Are you sure you want to delete this conversation?')) {
        return;
    }
    
    try {
        // Find the enquiry containing this conversation
        for (let enquiry of allEnquiries) {
            if (enquiry.conversations) {
                const convIndex = enquiry.conversations.findIndex(c => c.id === conversationId);
                if (convIndex !== -1) {
                    enquiry.conversations.splice(convIndex, 1);
                    
                    // Refresh the details view if modal is open
                    const modal = document.getElementById('enquiryDetailsModal');
                    if (modal && modal.classList.contains('show')) {
                        viewEnquiryDetails(enquiry.id);
                    }
                    
                    showToast('Conversation deleted successfully!', 'success');
                    return;
                }
            }
        }
        
        showToast('Conversation not found', 'error');
        
    } catch (error) {
        console.error('Error deleting conversation:', error);
        showToast('Error deleting conversation', 'error');
    }
}

// Edit enquiry
function editEnquiry(enquiryId) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) {
        showToast('Enquiry not found', 'error');
        return;
    }
    
    // Populate edit form
    document.getElementById('editEnquiryId').value = enquiry.id;
    document.getElementById('editFullName').value = enquiry.full_name;
    document.getElementById('editEmail').value = enquiry.email;
    document.getElementById('editWhatsApp').value = enquiry.whatsapp;
    document.getElementById('editCity').value = enquiry.city;
    document.getElementById('editPincode').value = enquiry.pincode;
    document.getElementById('editMonthlyBill').value = enquiry.monthly_bill;
    document.getElementById('editRoofArea').value = enquiry.roof_area;
    document.getElementById('editSystemType').value = enquiry.system_type;
    document.getElementById('editPlanningAfter').value = enquiry.planning_after_months;
    document.getElementById('editStatus').value = enquiry.status;
    document.getElementById('editNotes').value = enquiry.notes || '';
    
    // Show edit modal
    const modal = new bootstrap.Modal(document.getElementById('editEnquiryModal'));
    modal.show();
}

// Save edited enquiry
async function saveEditedEnquiry() {
    try {
        const enquiryId = document.getElementById('editEnquiryId').value;
        const enquiry = allEnquiries.find(e => e.id === enquiryId);
        
        if (!enquiry) {
            showToast('Enquiry not found', 'error');
            return;
        }
        
        // Update enquiry data
        enquiry.full_name = document.getElementById('editFullName').value;
        enquiry.email = document.getElementById('editEmail').value;
        enquiry.whatsapp = document.getElementById('editWhatsApp').value;
        enquiry.city = document.getElementById('editCity').value;
        enquiry.pincode = document.getElementById('editPincode').value;
        enquiry.monthly_bill = parseFloat(document.getElementById('editMonthlyBill').value);
        enquiry.roof_area = parseFloat(document.getElementById('editRoofArea').value);
        enquiry.system_type = document.getElementById('editSystemType').value;
        enquiry.planning_after_months = parseInt(document.getElementById('editPlanningAfter').value);
        enquiry.status = document.getElementById('editStatus').value;
        enquiry.notes = document.getElementById('editNotes').value;
        enquiry.updated_at = new Date().toISOString();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editEnquiryModal'));
        modal.hide();
        
        // Refresh display
        displayEnquiries();
        
        showToast('Enquiry updated successfully!', 'success');
        
    } catch (error) {
        console.error('Error updating enquiry:', error);
        showToast('Error updating enquiry', 'error');
    }
}

// Add new enquiry
async function addNewEnquiry() {
    try {
        const formData = {
            full_name: document.getElementById('addFullName').value,
            email: document.getElementById('addEmail').value,
            whatsapp: document.getElementById('addWhatsApp').value,
            monthly_bill: parseFloat(document.getElementById('addMonthlyBill').value),
            city: document.getElementById('addCity').value,
            pincode: document.getElementById('addPincode').value,
            roof_area: parseFloat(document.getElementById('addRoofArea').value),
            system_type: document.getElementById('addSystemType').value,
            planning_after_months: parseInt(document.getElementById('addPlanningAfter').value),
            message: document.getElementById('addMessage').value,
            status: 'NEW',
            created_at: new Date().toISOString(),
            notes: '',
            conversations: []
        };
        
        // Validate required fields
        if (!formData.full_name || !formData.email || !formData.whatsapp) {
            showToast('Please fill in all required fields', 'warning');
            return;
        }
        
        // Generate unique ID
        formData.id = 'ENQ' + Date.now().toString().slice(-6);
        formData.enquiry_id = formData.id;
        
        // Add to enquiries array
        allEnquiries.unshift(formData);
        filteredEnquiries = [...allEnquiries];
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEnquiryModal'));
        modal.hide();
        document.getElementById('addEnquiryForm').reset();
        
        // Refresh display
        currentPage = 1;
        displayEnquiries();
        updatePagination();
        
        showToast('Enquiry added successfully!', 'success');
        
    } catch (error) {
        console.error('Error adding enquiry:', error);
        showToast('Error adding enquiry', 'error');
    }
}

// View enquiry details (placeholder - implemented above)
// editEnquiry() - implemented above
// addConversation() - implemented above

// Initialize filters
function initializeFilters() {
    // Set default date filter to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFilter').value = '';
}

// Filter enquiries
function filterEnquiries() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
    
    filteredEnquiries = allEnquiries.filter(enquiry => {
        let matches = true;
        
        // Status filter
        if (statusFilter && enquiry.status !== statusFilter) {
            matches = false;
        }
        
        // Date filter
        if (dateFilter) {
            const enquiryDate = new Date(enquiry.created_at).toISOString().split('T')[0];
            if (enquiryDate !== dateFilter) {
                matches = false;
            }
        }
        
        // Search filter
        if (searchFilter) {
            const searchableText = `${enquiry.full_name} ${enquiry.email} ${enquiry.city} ${enquiry.enquiry_id}`.toLowerCase();
            if (!searchableText.includes(searchFilter)) {
                matches = false;
            }
        }
        
        return matches;
    });
    
    currentPage = 1;
    displayEnquiries();
    updatePagination();
}

// Reset filters
function resetFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('searchFilter').value = '';
    filterEnquiries();
}

// Export enquiries
function exportEnquiries() {
    try {
        const csvContent = [
            ['Enquiry ID', 'Customer Name', 'Email', 'WhatsApp', 'City', 'System Type', 'Monthly Bill', 'Status', 'Created Date'],
            ...filteredEnquiries.map(enquiry => [
                enquiry.enquiry_id,
                enquiry.full_name,
                enquiry.email,
                enquiry.whatsapp,
                enquiry.city,
                enquiry.system_type.replace('-', ' '),
                enquiry.monthly_bill,
                enquiry.status,
                new Date(enquiry.created_at).toLocaleDateString('en-IN')
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `enquiries_export_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        showToast('Enquiries exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error exporting enquiries:', error);
        showToast('Error exporting enquiries', 'error');
    }
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a></li>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a></li>`;
    }
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    displayEnquiries();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast element
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'primary'} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Add to toast container or create one
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(toastContainer.lastElementChild);
    toast.show();
    
    // Remove after hiding
    setTimeout(() => {
        if (toastContainer.lastElementChild) {
            toastContainer.removeChild(toastContainer.lastElementChild);
        }
    }, 5000);
}