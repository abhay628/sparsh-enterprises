# Solar CRM - Complete Solar Project Management System

A comprehensive frontend prototype for solar project management, built with static HTML/CSS/JavaScript and featuring interactive dashboards, charts, and a complete user interface.

## 🌟 Overview

Solar CRM is a complete frontend solution for managing solar projects from initial enquiry through 5-year maintenance. This prototype demonstrates the full user interface and user experience design, complete with sample data, interactive charts, and responsive layouts.

## 🚀 Features

### ✅ Completed Modules

1. **Enquiry Management** - Capture and track customer enquiries with automated follow-ups
2. **Project & Installation** - Complete project management from design to commissioning  
3. **Maintenance Schedule** - 5-year maintenance with automated service scheduling
4. **Complaints & SLA** - Priority-based complaint handling with SLA breach detection
5. **Generation Monitoring** - Real-time solar generation tracking with analytics
6. **JWT Authentication** - Secure role-based access control simulation
7. **Analytics Dashboard** - Interactive charts and comprehensive KPI tracking
8. **Customer Portal** - Dedicated customer interface for project tracking

### 🎯 Key Capabilities

- **Multi-Role Access**: Admin, Operator, and Customer roles with different permissions
- **Interactive Charts**: Chart.js integration for data visualization
- **Responsive Design**: Mobile-first design with Bootstrap 5
- **Sample Data**: Complete demo dataset for testing and demonstration
- **Form Validation**: Client-side validation for all forms
- **Modern UI/UX**: Clean, professional interface with animations
- **Comments/Notes**: Add and manage comments on enquiries and projects
- **Global Functions**: Centralized function library for consistency

## 📁 Project Structure

```
solar-crm/
├── index.html                    # Landing page with hero section
├── login.html                    # JWT authentication page
├── admin-dashboard.html          # Admin analytics dashboard
├── customer-dashboard.html       # Customer portal dashboard
├── enquiry-management.html       # Enquiry management interface
├── project-management.html       # Project tracking system
├── maintenance-schedule.html     # Maintenance scheduling
├── complaints.html             # Complaint & SLA management
├── monitoring.html               # Generation monitoring dashboard
├── css/
│   └── style.css                 # Main stylesheet with custom styling
├── js/
│   ├── main.js                   # Core JavaScript functions
│   ├── crm-functions.js          # Shared CRM functions library
│   ├── admin-dashboard.js        # Admin dashboard functionality
│   ├── customer-dashboard.js   # Customer portal functionality
│   ├── enquiry-management.js   # Enquiry management features
│   ├── project-management.js   # Project tracking system
│   ├── maintenance-schedule.js   # Maintenance scheduling
│   ├── complaints.js             # Complaint management
│   ├── monitoring.js             # Generation monitoring
│   └── sample-data.js            # Sample data generator
└── README.md                     # This file
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5, Font Awesome icons
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)
- **Data**: RESTful Table API for data persistence

## 🎯 User Roles

### Admin Role
- Full system access and configuration
- Comprehensive analytics and reporting
- User management and role assignment
- System-wide settings and preferences

### Operator Role  
- Enquiry management and follow-ups
- Project tracking and installation management
- Maintenance scheduling and completion
- Complaint handling and resolution

### Customer Role
- View project status and progress
- Track daily/monthly generation data
- Submit complaints and track resolution
- Access maintenance schedule and history

## 📊 Dashboard Features

### Admin Dashboard
- Total enquiries, conversion rate, active projects
- Upcoming services, open complaints, SLA breaches
- Interactive charts for trends and analytics
- Real-time KPI monitoring

### Customer Dashboard
- Project overview and current status
- Daily/monthly generation tracking
- Maintenance schedule and history
- Complaint submission and status tracking

## 🔧 Installation & Setup

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Navigate** to different sections using the navigation menu
4. **Login** with demo credentials:
   - Admin: `admin@solarcrm.com` / `admin123`
   - Operator: `operator@solarcrm.com` / `operator123`  
   - Customer: `customer@example.com` / `customer123`

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradients and shadows
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, transitions, and animations
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Loading States**: Spinner animations and progress indicators
- **Error Handling**: User-friendly error messages and validation

## 📈 Charts & Analytics

- **Generation Trends**: Daily and monthly generation tracking
- **Performance Analytics**: System efficiency and performance metrics
- **SLA Compliance**: Service level agreement monitoring
- **Conversion Analytics**: Enquiry to project conversion tracking
- **Maintenance Overview**: Service completion and scheduling

## 🔐 Security Features

- **JWT Token Simulation**: Secure authentication simulation
- **Role-Based Access**: Different permissions for each user role
- **Session Management**: Token expiration and refresh handling
- **Input Validation**: Client-side form validation and sanitization

## 🧪 Demo Data

The system includes comprehensive sample data for demonstration:

- **Users**: 5 sample users across different roles
- **Enquiries**: 4 sample enquiries with different statuses
- **Projects**: 2 sample solar installation projects
- **Maintenance**: 3 sample maintenance schedules
- **Complaints**: 3 sample complaints with different priorities
- **Generation**: 60 days of sample generation data

## 🚀 Getting Started

1. **Start with the Landing Page**: Open `index.html` to see the marketing page
2. **Try the Login**: Navigate to `login.html` and use demo credentials
3. **Explore Admin Dashboard**: Check `admin-dashboard.html` for analytics
4. **Test Customer Portal**: Visit `customer-dashboard.html` for customer view
5. **Manage Enquiries**: Use `enquiry-management.html` for enquiry tracking
6. **Manage Projects**: Use `project-management.html` for project tracking

## 🎯 Recent Updates

### ✅ Fixed Issues (March 2026)
- **Fixed undefined function errors** on Enquiry Management page for `addConversation` and `editEnquiry`
- **Fixed undefined function errors** on Project Management page for `updateProjectStatus` and `editProject`
- **Implemented comments/notes functionality** for both Enquiry and Project Management pages
- **Added global function registry** in `crm-functions.js` for better function management
- **Enhanced error handling** with global error handler and improved toast notifications

### 🛠️ Technical Improvements
- **Centralized function library** (`crm-functions.js`) for shared functionality
- **Comments system** with add, display, and delete functionality
- **Better error handling** and user feedback
- **Improved code organization** and maintainability

## 📱 Mobile Responsiveness

The system is fully responsive and optimized for:
- **Desktop**: Full-featured interface with all functionality
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Streamlined interface for on-the-go access

## 🎯 Next Steps

For production deployment, consider:

1. **Backend Integration**: Connect with PHP/MySQL backend
2. **Real Authentication**: Implement proper JWT authentication
3. **API Integration**: Replace mock data with real API calls
4. **Advanced Analytics**: Add more sophisticated reporting
5. **Mobile App**: Develop companion mobile application

## 📞 Support

This is a frontend prototype demonstrating the complete user interface and experience. For backend integration and production deployment, additional development work would be required.

---

**Built with ❤️ for solar project management**