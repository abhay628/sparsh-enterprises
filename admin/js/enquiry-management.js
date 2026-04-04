// Enquiry Management JavaScript

let currentPage = 1;
const itemsPerPage = 10;
let allEnquiries = [];
let filteredEnquiries = [];

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showToast('An error occurred. Please try again.', 'error');
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enquiry Management page loaded');
    loadEnquiries();
    initializeFilters();
    
    // Ensure functions are available globally
    window.addConversation = addConversation;
    window.editEnquiry = editEnquiry;
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
            assigned_to: Math.random() > 0.5 ? 'OP001' : null
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
                        <button class="btn btn-outline-success" onclick="addConversation('${enquiry.id}')" title="Add Conversation">
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

// Initialize filters
function initializeFilters() {
    // Set default date filter to today
    document.getElementById('dateFilter').valueAsDate = new Date();
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
            const filterDate = new Date(dateFilter);
            const enquiryDate = new Date(enquiry.created_at);
            if (enquiryDate.toDateString() !== filterDate.toDateString()) {
                matches = false;
            }
        }
        
        // Search filter
        if (searchFilter) {
            const searchIn = `${enquiry.full_name} ${enquiry.email} ${enquiry.city} ${enquiry.enquiry_id}`.toLowerCase();
            if (!searchIn.includes(searchFilter)) {
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
    document.getElementById('dateFilter').valueAsDate = new Date();
    document.getElementById('searchFilter').value = '';
    filterEnquiries();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHtml += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHtml;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayEnquiries();
        updatePagination();
        
        // Scroll to top of table
        document.querySelector('.table-responsive').scrollIntoView({ behavior: 'smooth' });
    }
}

// View enquiry details
function viewEnquiryDetails(enquiryId) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    const content = `
        <div class="row g-4">
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Customer Information</h6>
                <div class="mb-2"><strong>Name:</strong> ${enquiry.full_name}</div>
                <div class="mb-2"><strong>Email:</strong> ${enquiry.email}</div>
                <div class="mb-2"><strong>WhatsApp:</strong> ${enquiry.whatsapp}</div>
                <div class="mb-2"><strong>Location:</strong> ${enquiry.city}, ${enquiry.pincode}</div>
            </div>
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Enquiry Details</h6>
                <div class="mb-2"><strong>Enquiry ID:</strong> ${enquiry.enquiry_id}</div>
                <div class="mb-2"><strong>Monthly Bill:</strong> ₹${enquiry.monthly_bill.toLocaleString()}</div>
                <div class="mb-2"><strong>Roof Area:</strong> ${enquiry.roof_area} sq ft</div>
                <div class="mb-2"><strong>System Type:</strong> ${enquiry.system_type.replace('-', ' ')}</div>
                <div class="mb-2"><strong>Planning:</strong> ${enquiry.planning_after_months === 0 ? 'Immediate' : enquiry.planning_after_months + ' months'}</div>
            </div>
            <div class="col-12">
                <h6 class="text-muted mb-3">Status & Assignment</h6>
                <div class="row">
                    <div class="col-md-4">
                        <div class="mb-2"><strong>Status:</strong> ${getStatusBadge(enquiry.status)}</div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-2"><strong>Assigned To:</strong> ${enquiry.assigned_to ? 'Operator' : 'Unassigned'}</div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-2"><strong>Created:</strong> ${new Date(enquiry.created_at).toLocaleDateString('en-IN')}</div>
                    </div>
                </div>
            </div>
            ${enquiry.message ? `
            <div class="col-12">
                <h6 class="text-muted mb-3">Customer Message</h6>
                <div class="bg-light p-3 rounded">
                    ${enquiry.message}
                </div>
            </div>
            ` : ''}
            
            <!-- Comments Section -->
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
                                <button class="btn btn-primary btn-sm" onclick="addComment('enquiry', '${enquiry.id}')">
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
                <h6 class="text-muted mb-3">Quick Actions</h6>
                <div class="btn-group" role="group">
                    <button class="btn btn-primary" onclick="updateEnquiryStatus('${enquiry.id}', 'CONTACTED')">
                        <i class="fas fa-phone me-1"></i>Mark Contacted
                    </button>
                    <button class="btn btn-warning" onclick="updateEnquiryStatus('${enquiry.id}', 'FOLLOW-UP')">
                        <i class="fas fa-clock me-1"></i>Follow-up
                    </button>
                    <button class="btn btn-success" onclick="convertEnquiry('${enquiry.id}')">
                        <i class="fas fa-check me-1"></i>Convert
                    </button>
                    <button class="btn btn-danger" onclick="updateEnquiryStatus('${enquiry.id}', 'REJECTED')">
                        <i class="fas fa-times me-1"></i>Reject
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('enquiryDetailsContent').innerHTML = content;
    new bootstrap.Modal(document.getElementById('enquiryDetailsModal')).show();
    
    // Load comments after modal is shown
    setTimeout(() => {
        displayComments('enquiry', enquiryId);
    }, 300);
}

// Add new enquiry
function addNewEnquiry() {
    const formData = {
        full_name: document.getElementById('addFullName').value,
        email: document.getElementById('addEmail').value,
        whatsapp: document.getElementById('addWhatsApp').value,
        monthly_bill: parseFloat(document.getElementById('addMonthlyBill').value),
        city: document.getElementById('addCity').value,
        pincode: document.getElementById('addPincode').value,
        roof_area: parseFloat(document.getElementById('addRoofArea').value),
        system_type: document.getElementById('addSystemType').value,
        planning_after_months: parseInt(document.getElementById('addPlanningAfter').value) || 0,
        assigned_to: document.getElementById('addAssignedTo').value,
        message: document.getElementById('addMessage').value,
        status: 'NEW'
    };
    
    try {
        // Simulate API call
        const newEnquiry = {
            id: 'ENQ' + String(allEnquiries.length + 1).padStart(6, '0'),
            enquiry_id: 'ENQ' + String(allEnquiries.length + 1).padStart(6, '0'),
            ...formData,
            created_at: new Date().toISOString()
        };
        
        allEnquiries.unshift(newEnquiry);
        filteredEnquiries = [...allEnquiries];
        
        displayEnquiries();
        updatePagination();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('addEnquiryModal')).hide();
        document.getElementById('addEnquiryForm').reset();
        
        showToast('Enquiry added successfully!', 'success');
        
    } catch (error) {
        console.error('Error adding enquiry:', error);
        showToast('Error adding enquiry', 'error');
    }
}

// Update enquiry status
function updateEnquiryStatus(enquiryId, newStatus) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    enquiry.status = newStatus;
    enquiry.updated_at = new Date().toISOString();
    
    displayEnquiries();
    showToast(`Enquiry marked as ${newStatus}`, 'success');
}

// Convert enquiry to project
function convertEnquiry(enquiryId) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    // Simulate conversion to project
    enquiry.status = 'CONVERTED';
    enquiry.updated_at = new Date().toISOString();
    
    showToast('Enquiry converted to project successfully!', 'success');
    
    // Redirect to project creation page (in a real app)
    setTimeout(() => {
        window.location.href = `project-management.html?enquiryId=${enquiryId}`;
    }, 1500);
}

// Add conversation to enquiry
function addConversation(enquiryId) {
    try {
        const enquiry = allEnquiries.find(e => e.id === enquiryId);
        if (!enquiry) {
            console.error('Enquiry not found:', enquiryId);
            return;
        }
        
        // Create modal for adding conversation
        const modalHtml = `
            <div class="modal fade" id="addConversationModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-comment me-2"></i>Add Conversation - ${enquiry.enquiry_id}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addConversationForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Conversation Type</label>
                                        <select class="form-select" id="conversationType" required>
                                            <option value="">Select Type</option>
                                            <option value="CALL">Phone Call</option>
                                            <option value="EMAIL">Email</option>
                                            <option value="WHATSAPP">WhatsApp</option>
                                            <option value="MEETING">Meeting</option>
                                            <option value="FOLLOW_UP">Follow-up</option>
                                            <option value="NOTE">Internal Note</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Next Action Required</label>
                                        <select class="form-select" id="nextAction">
                                            <option value="">No Action</option>
                                            <option value="FOLLOW_UP">Follow-up Required</option>
                                            <option value="SITE_VISIT">Site Visit</option>
                                            <option value="QUOTATION">Send Quotation</option>
                                            <option value="CONVERT">Convert to Project</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label">Conversation Notes *</label>
                                        <textarea class="form-control" id="conversationNotes" rows="4" placeholder="Enter conversation details, notes, or comments..." required></textarea>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Follow-up Date</label>
                                        <input type="date" class="form-control" id="followUpDate">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Priority</label>
                                        <select class="form-select" id="conversationPriority">
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM" selected>Medium</option>
                                            <option value="HIGH">High</option>
                                            <option value="URGENT">Urgent</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="saveConversation('${enquiryId}')">
                                <i class="fas fa-save me-1"></i>Save Conversation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('addConversationModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        new bootstrap.Modal(document.getElementById('addConversationModal')).show();
        
    } catch (error) {
        console.error('Error adding conversation:', error);
        showToast('Error opening conversation dialog', 'error');
    }
}

// Save conversation
function saveConversation(enquiryId) {
    const conversationData = {
        type: document.getElementById('conversationType').value,
        notes: document.getElementById('conversationNotes').value,
        nextAction: document.getElementById('nextAction').value,
        followUpDate: document.getElementById('followUpDate').value,
        priority: document.getElementById('conversationPriority').value,
        created_at: new Date().toISOString()
    };
    
    // Validate required fields
    if (!conversationData.type || !conversationData.notes) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate API call
    try {
        // In a real app, this would be an API call
        console.log('Saving conversation:', { enquiryId, conversationData });
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('addConversationModal')).hide();
        
        // Show success message
        showToast('Conversation added successfully!', 'success');
        
        // Remove modal from DOM
        setTimeout(() => {
            document.getElementById('addConversationModal').remove();
        }, 500);
        
    } catch (error) {
        console.error('Error saving conversation:', error);
        showToast('Error saving conversation', 'error');
    }
}

// Edit enquiry
function editEnquiry(enquiryId) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    // Create modal for editing enquiry
    const modalHtml = `
        <div class="modal fade" id="editEnquiryModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title">
                            <i class="fas fa-edit me-2"></i>Edit Enquiry - ${enquiry.enquiry_id}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editEnquiryForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="editFullName" value="${enquiry.full_name}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" id="editEmail" value="${enquiry.email}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">WhatsApp Number</label>
                                    <input type="tel" class="form-control" id="editWhatsApp" value="${enquiry.whatsapp}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Monthly Bill (₹)</label>
                                    <input type="number" class="form-control" id="editMonthlyBill" value="${enquiry.monthly_bill}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">City</label>
                                    <input type="text" class="form-control" id="editCity" value="${enquiry.city}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Pincode</label>
                                    <input type="text" class="form-control" id="editPincode" value="${enquiry.pincode}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Roof Area (sq ft)</label>
                                    <input type="number" class="form-control" id="editRoofArea" value="${enquiry.roof_area}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">System Type</label>
                                    <select class="form-select" id="editSystemType" required>
                                        <option value="grid-tied" ${enquiry.system_type === 'grid-tied' ? 'selected' : ''}>Grid-tied</option>
                                        <option value="off-grid" ${enquiry.system_type === 'off-grid' ? 'selected' : ''}>Off-grid</option>
                                        <option value="hybrid" ${enquiry.system_type === 'hybrid' ? 'selected' : ''}>Hybrid</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Planning After (months)</label>
                                    <select class="form-select" id="editPlanningAfter">
                                        <option value="0" ${enquiry.planning_after_months === 0 ? 'selected' : ''}>Immediate</option>
                                        <option value="6" ${enquiry.planning_after_months === 6 ? 'selected' : ''}>6 months</option>
                                        <option value="12" ${enquiry.planning_after_months === 12 ? 'selected' : ''}>12 months</option>
                                        <option value="24" ${enquiry.planning_after_months === 24 ? 'selected' : ''}>24 months</option>
                                        <option value="36" ${enquiry.planning_after_months === 36 ? 'selected' : ''}>36 months</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Status</label>
                                    <select class="form-select" id="editStatus" required>
                                        <option value="NEW" ${enquiry.status === 'NEW' ? 'selected' : ''}>NEW</option>
                                        <option value="CONTACTED" ${enquiry.status === 'CONTACTED' ? 'selected' : ''}>CONTACTED</option>
                                        <option value="FOLLOW-UP" ${enquiry.status === 'FOLLOW-UP' ? 'selected' : ''}>FOLLOW-UP</option>
                                        <option value="CONVERTED" ${enquiry.status === 'CONVERTED' ? 'selected' : ''}>CONVERTED</option>
                                        <option value="REJECTED" ${enquiry.status === 'REJECTED' ? 'selected' : ''}>REJECTED</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Assigned To</label>
                                    <select class="form-select" id="editAssignedTo">
                                        <option value="">Unassigned</option>
                                        <option value="OP001" ${enquiry.assigned_to === 'OP001' ? 'selected' : ''}>Operator 1</option>
                                        <option value="OP002" ${enquiry.assigned_to === 'OP002' ? 'selected' : ''}>Operator 2</option>
                                        <option value="OP003" ${enquiry.assigned_to === 'OP003' ? 'selected' : ''}>Operator 3</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Customer Message</label>
                                    <textarea class="form-control" id="editMessage" rows="3" placeholder="Any additional notes or requirements">${enquiry.message || ''}</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-warning" onclick="saveEditedEnquiry('${enquiryId}')">
                            <i class="fas fa-save me-1"></i>Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('editEnquiryModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    new bootstrap.Modal(document.getElementById('editEnquiryModal')).show();
}

// Save edited enquiry
function saveEditedEnquiry(enquiryId) {
    const enquiry = allEnquiries.find(e => e.id === enquiryId);
    if (!enquiry) return;
    
    // Get form data
    const updatedData = {
        full_name: document.getElementById('editFullName').value,
        email: document.getElementById('editEmail').value,
        whatsapp: document.getElementById('editWhatsApp').value,
        monthly_bill: parseFloat(document.getElementById('editMonthlyBill').value),
        city: document.getElementById('editCity').value,
        pincode: document.getElementById('editPincode').value,
        roof_area: parseFloat(document.getElementById('editRoofArea').value),
        system_type: document.getElementById('editSystemType').value,
        planning_after_months: parseInt(document.getElementById('editPlanningAfter').value) || 0,
        status: document.getElementById('editStatus').value,
        assigned_to: document.getElementById('editAssignedTo').value,
        message: document.getElementById('editMessage').value,
        updated_at: new Date().toISOString()
    };
    
    // Validate required fields
    if (!updatedData.full_name || !updatedData.email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Update enquiry
    Object.assign(enquiry, updatedData);
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editEnquiryModal')).hide();
    
    // Refresh display
    displayEnquiries();
    
    // Show success message
    showToast('Enquiry updated successfully!', 'success');
    
    // Remove modal from DOM
    setTimeout(() => {
        document.getElementById('editEnquiryModal').remove();
    }, 500);
}

// Export enquiries
function exportEnquiries() {
    const csvContent = [
        ['Enquiry ID', 'Customer', 'Email', 'WhatsApp', 'City', 'Monthly Bill', 'System Type', 'Status', 'Date'],
        ...filteredEnquiries.map(e => [
            e.enquiry_id,
            e.full_name,
            e.email,
            e.whatsapp,
            e.city,
            e.monthly_bill,
            e.system_type,
            e.status,
            new Date(e.created_at).toLocaleDateString('en-IN')
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Enquiries exported successfully!', 'success');
}

// Global function registry
window.EnquiryFunctions = {
    addConversation: addConversation,
    editEnquiry: editEnquiry,
    viewEnquiryDetails: viewEnquiryDetails,
    updateEnquiryStatus: updateEnquiryStatus,
    saveConversation: saveConversation,
    saveEditedEnquiry: saveEditedEnquiry
};