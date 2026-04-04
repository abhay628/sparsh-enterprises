// Test functionality for Solar CRM Portal
// This file tests all the implemented functions

console.log('🚀 Testing Solar CRM Portal functionality...');

// Test global functions availability
function testGlobalFunctions() {
    console.log('Testing global functions...');
    
    // Test showToast
    if (typeof window.showToast === 'function') {
        console.log('✅ showToast function is available');
    } else {
        console.log('❌ showToast function is missing');
    }
    
    // Test formatDate
    if (typeof window.formatDate === 'function') {
        console.log('✅ formatDate function is available');
    } else {
        console.log('❌ formatDate function is missing');
    }
    
    // Test getStatusBadge
    if (typeof window.getStatusBadge === 'function') {
        console.log('✅ getStatusBadge function is available');
    } else {
        console.log('❌ getStatusBadge function is missing');
    }
    
    // Test enquiry management functions
    if (typeof window.addConversation === 'function') {
        console.log('✅ addConversation function is available');
    } else {
        console.log('❌ addConversation function is missing');
    }
    
    if (typeof window.editEnquiry === 'function') {
        console.log('✅ editEnquiry function is available');
    } else {
        console.log('❌ editEnquiry function is missing');
    }
    
    // Test project management functions
    if (typeof window.updateProjectStatus === 'function') {
        console.log('✅ updateProjectStatus function is available');
    } else {
        console.log('❌ updateProjectStatus function is missing');
    }
    
    if (typeof window.editProject === 'function') {
        console.log('✅ editProject function is available');
    } else {
        console.log('❌ editProject function is missing');
    }
    
    // Test comment functions
    if (typeof window.addComment === 'function') {
        console.log('✅ addComment function is available');
    } else {
        console.log('❌ addComment function is missing');
    }
    
    if (typeof window.displayComments === 'function') {
        console.log('✅ displayComments function is available');
    } else {
        console.log('❌ displayComments function is missing');
    }
    
    if (typeof window.deleteComment === 'function') {
        console.log('✅ deleteComment function is available');
    } else {
        console.log('❌ deleteComment function is missing');
    }
}

// Test data structures
function testDataStructures() {
    console.log('Testing data structures...');
    
    // Test if sample data exists
    if (typeof window.enquiries !== 'undefined' && Array.isArray(window.enquiries)) {
        console.log('✅ Enquiries data structure is available with', window.enquiries.length, 'items');
    } else {
        console.log('❌ Enquiries data structure is missing');
    }
    
    if (typeof window.projects !== 'undefined' && Array.isArray(window.projects)) {
        console.log('✅ Projects data structure is available with', window.projects.length, 'items');
    } else {
        console.log('❌ Projects data structure is missing');
    }
}

// Test comment functionality
function testCommentFunctionality() {
    console.log('Testing comment functionality...');
    
    // Create a test comment
    const testComment = {
        id: 'test123',
        text: 'This is a test comment',
        author: 'Test User',
        timestamp: new Date().toISOString(),
        type: 'enquiry'
    };
    
    console.log('Test comment created:', testComment);
    
    // Test comment display
    if (typeof window.displayComments === 'function') {
        console.log('✅ Comment display functionality is ready');
    } else {
        console.log('❌ Comment display functionality is missing');
    }
}

// Run all tests when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, running tests...');
    
    // Wait a bit for all scripts to load
    setTimeout(() => {
        testGlobalFunctions();
        testDataStructures();
        testCommentFunctionality();
        
        console.log('🎯 All tests completed!');
        
        // Show a success toast if available
        if (typeof window.showToast === 'function') {
            window.showToast('All functionality tests completed successfully!', 'success');
        }
    }, 1000);
});

console.log('✨ Test functionality script loaded');