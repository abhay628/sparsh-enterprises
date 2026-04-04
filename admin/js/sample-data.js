// Sample data generator for Solar CRM demo
async function generateSampleData() {
    console.log('Generating sample data for Solar CRM...');
    
    // Sample users
    const users = [
        { id: 'admin-001', full_name: 'Admin User', email: 'admin@solarcrm.com', role: 'ADMIN', phone: '+91-9876543210', created_at: Date.now() - 86400000 * 30 },
        { id: 'operator-001', full_name: 'John Operator', email: 'operator@solarcrm.com', role: 'OPERATOR', phone: '+91-9876543211', created_at: Date.now() - 86400000 * 25 },
        { id: 'operator-002', full_name: 'Sarah Manager', email: 'sarah@solarcrm.com', role: 'OPERATOR', phone: '+91-9876543212', created_at: Date.now() - 86400000 * 20 },
        { id: 'customer-001', full_name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'CUSTOMER', phone: '+91-9876543213', created_at: Date.now() - 86400000 * 15 },
        { id: 'customer-002', full_name: 'Priya Sharma', email: 'priya@example.com', role: 'CUSTOMER', phone: '+91-9876543214', created_at: Date.now() - 86400000 * 10 }
    ];
    
    // Add users
    for (const user of users) {
        await fetch('tables/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }
    
    // Sample enquiries
    const enquiries = [
        {
            id: 'ENQ-2024-001',
            full_name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            whatsapp: '+91-9876543213',
            monthly_electricity_bill: 4500,
            city: 'Mumbai',
            pincode: '400001',
            roof_area: 800,
            system_type: 'Grid-Tied',
            message: 'Interested in installing solar panels for my home. Looking for a reliable solution.',
            status: 'CONVERTED',
            planning_after_years: 0,
            created_at: Date.now() - 86400000 * 60,
            updated_at: Date.now() - 86400000 * 45
        },
        {
            id: 'ENQ-2024-002',
            full_name: 'Priya Sharma',
            email: 'priya@example.com',
            whatsapp: '+91-9876543214',
            monthly_electricity_bill: 3200,
            city: 'Pune',
            pincode: '411001',
            roof_area: 600,
            system_type: 'Hybrid',
            message: 'Want to reduce electricity bills and have backup power during outages.',
            status: 'FOLLOW_UP',
            planning_after_years: 1,
            created_at: Date.now() - 86400000 * 45,
            updated_at: Date.now() - 86400000 * 30
        },
        {
            id: 'ENQ-2024-003',
            full_name: 'Amit Patel',
            email: 'amit@example.com',
            whatsapp: '+91-9876543215',
            monthly_electricity_bill: 5800,
            city: 'Ahmedabad',
            pincode: '380001',
            roof_area: 1200,
            system_type: 'Grid-Tied',
            message: 'Commercial installation for my factory. Need high capacity system.',
            status: 'CONTACTED',
            planning_after_years: 0,
            created_at: Date.now() - 86400000 * 30,
            updated_at: Date.now() - 86400000 * 20
        },
        {
            id: 'ENQ-2024-004',
            full_name: 'Sunita Verma',
            email: 'sunita@example.com',
            whatsapp: '+91-9876543216',
            monthly_electricity_bill: 2800,
            city: 'Jaipur',
            pincode: '302001',
            roof_area: 500,
            system_type: 'Off-Grid',
            message: 'Need solar solution for my farmhouse with battery backup.',
            status: 'NEW',
            planning_after_years: 2,
            created_at: Date.now() - 86400000 * 20,
            updated_at: Date.now() - 86400000 * 10
        }
    ];
    
    // Add enquiries
    for (const enquiry of enquiries) {
        await fetch('tables/enquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiry)
        });
    }
    
    // Sample conversations
    const conversations = [
        {
            id: 'conv-001',
            enquiry_id: 'ENQ-2024-001',
            conversation_text: 'Called customer to discuss requirements. Explained different system types and benefits. Customer interested in grid-tied system.',
            created_at: Date.now() - 86400000 * 55
        },
        {
            id: 'conv-002',
            enquiry_id: 'ENQ-2024-001',
            conversation_text: 'Site visit completed. Measured roof area and checked structural integrity. System design in progress.',
            created_at: Date.now() - 86400000 * 50
        },
        {
            id: 'conv-003',
            enquiry_id: 'ENQ-2024-002',
            conversation_text: 'Initial discussion about hybrid system. Customer has budget constraints. Need to provide financing options.',
            created_at: Date.now() - 86400000 * 40
        }
    ];
    
    // Add conversations
    for (const conversation of conversations) {
        await fetch('tables/enquiry_conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(conversation)
        });
    }
    
    // Sample follow-up reminders
    const reminders = [
        {
            id: 'rem-001',
            enquiry_id: 'ENQ-2024-002',
            reminder_date: new Date(Date.now() + 86400000 * 365).toISOString().split('T')[0],
            status: 'pending',
            created_at: Date.now() - 86400000 * 45
        },
        {
            id: 'rem-002',
            enquiry_id: 'ENQ-2024-004',
            reminder_date: new Date(Date.now() + 86400000 * 730).toISOString().split('T')[0],
            status: 'pending',
            created_at: Date.now() - 86400000 * 20
        }
    ];
    
    // Add reminders
    for (const reminder of reminders) {
        await fetch('tables/follow_up_reminders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reminder)
        });
    }
    
    // Sample solar projects
    const projects = [
        {
            id: 'PROJ-2024-001',
            project_id: 'SOL-2024-001',
            customer_name: 'Rajesh Kumar',
            customer_email: 'rajesh@example.com',
            customer_phone: '+91-9876543213',
            system_capacity_kw: 5.5,
            panel_brand: 'Waaree',
            inverter_brand: 'SMA',
            installation_date: new Date(Date.now() - 86400000 * 30).toISOString().split('T')[0],
            commissioning_date: new Date(Date.now() - 86400000 * 25).toISOString().split('T')[0],
            warranty_end_date: new Date(Date.now() + 86400000 * 365 * 5).toISOString().split('T')[0],
            status: 'installed',
            created_at: Date.now() - 86400000 * 35,
            updated_at: Date.now() - 86400000 * 25
        },
        {
            id: 'PROJ-2024-002',
            project_id: 'SOL-2024-002',
            customer_name: 'Priya Sharma',
            customer_email: 'priya@example.com',
            customer_phone: '+91-9876543214',
            system_capacity_kw: 3.2,
            panel_brand: 'Tata Power',
            inverter_brand: 'Delta',
            installation_date: new Date(Date.now() - 86400000 * 15).toISOString().split('T')[0],
            commissioning_date: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0],
            warranty_end_date: new Date(Date.now() + 86400000 * 365 * 5).toISOString().split('T')[0],
            status: 'installed',
            created_at: Date.now() - 86400000 * 20,
            updated_at: Date.now() - 86400000 * 10
        }
    ];
    
    // Add projects
    for (const project of projects) {
        await fetch('tables/solar_projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
    }
    
    // Sample maintenance schedule
    const maintenance = [
        {
            id: 'maint-001',
            project_id: 'PROJ-2024-001',
            year: 1,
            cycle: 'Q1',
            scheduled_date: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
            status: 'scheduled',
            technician_name: null,
            technician_remarks: null,
            created_at: Date.now() - 86400000 * 5,
            updated_at: Date.now() - 86400000 * 5
        },
        {
            id: 'maint-002',
            project_id: 'PROJ-2024-001',
            year: 1,
            cycle: 'Q2',
            scheduled_date: new Date(Date.now() + 86400000 * 120).toISOString().split('T')[0],
            status: 'scheduled',
            technician_name: null,
            technician_remarks: null,
            created_at: Date.now() - 86400000 * 4,
            updated_at: Date.now() - 86400000 * 4
        },
        {
            id: 'maint-003',
            project_id: 'PROJ-2024-001',
            year: 1,
            cycle: 'Q1',
            scheduled_date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
            status: 'completed',
            technician_name: 'Technician A',
            technician_remarks: 'Routine cleaning completed. System performing optimally.',
            created_at: Date.now() - 86400000 * 10,
            updated_at: Date.now() - 86400000 * 2
        }
    ];
    
    // Add maintenance
    for (const maint of maintenance) {
        await fetch('tables/maintenance_schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(maint)
        });
    }
    
    // Sample complaints
    const complaints = [
        {
            id: 'comp-001',
            project_id: 'PROJ-2024-001',
            category: 'Inverter',
            priority: 'HIGH',
            subject: 'Inverter showing error code E05',
            description: 'Inverter is showing error code E05 and not producing power since morning. Need immediate assistance.',
            status: 'open',
            created_at: Date.now() - 86400000 * 3,
            updated_at: Date.now() - 86400000 * 2,
            assigned_to: 'operator-001'
        },
        {
            id: 'comp-002',
            project_id: 'PROJ-2024-002',
            category: 'Panel',
            priority: 'MEDIUM',
            subject: 'Low generation output',
            description: 'Solar panels are generating 20% less power than expected. Need inspection.',
            status: 'in_progress',
            created_at: Date.now() - 86400000 * 5,
            updated_at: Date.now() - 86400000 * 1,
            assigned_to: 'operator-002'
        },
        {
            id: 'comp-003',
            project_id: 'PROJ-2024-001',
            category: 'Generation',
            priority: 'LOW',
            subject: 'Minor drop in efficiency',
            description: 'System efficiency dropped slightly. May be due to dust accumulation.',
            status: 'resolved',
            created_at: Date.now() - 86400000 * 10,
            updated_at: Date.now() - 86400000 * 8,
            assigned_to: 'operator-001'
        }
    ];
    
    // Add complaints
    for (const complaint of complaints) {
        await fetch('tables/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint)
        });
    }
    
    // Sample generation data
    const generationData = [];
    const weatherConditions = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'foggy'];
    
    // Generate 30 days of data for each project
    for (let day = 0; day < 30; day++) {
        const date = new Date();
        date.setDate(date.getDate() - day);
        const dateStr = date.toISOString().split('T')[0];
        
        for (const project of projects) {
            const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            const baseUnits = project.system_capacity_kw * 4; // 4 hours average
            const weatherFactor = {
                'sunny': 1.0,
                'partly_cloudy': 0.8,
                'cloudy': 0.6,
                'rainy': 0.3,
                'foggy': 0.4
            };
            
            const dailyUnits = baseUnits * weatherFactor[weather] * (0.8 + Math.random() * 0.4);
            const peakPower = project.system_capacity_kw * (0.7 + Math.random() * 0.3);
            const efficiency = 60 + Math.random() * 30;
            
            generationData.push({
                id: `gen-${project.id}-${dateStr}`,
                project_id: project.id,
                date: dateStr,
                daily_units: dailyUnits.toFixed(2),
                peak_power: peakPower.toFixed(2),
                efficiency: efficiency.toFixed(1),
                weather_condition: weather,
                notes: `Daily generation data for ${dateStr}`,
                created_at: Date.now() - 86400000 * day,
                updated_at: Date.now() - 86400000 * day
            });
        }
    }
    
    // Add generation data
    for (const data of generationData) {
        await fetch('tables/solar_generation_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    console.log('Sample data generation completed!');
    console.log(`Added ${users.length} users, ${enquiries.length} enquiries, ${conversations.length} conversations, ${reminders.length} reminders, ${projects.length} projects, ${maintenance.length} maintenance records, ${complaints.length} complaints, and ${generationData.length} generation data points.`);
}

// Generate sample data when script loads
generateSampleData();