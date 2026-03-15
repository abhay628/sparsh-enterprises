CREATE DATABASE solar_crm;
USE solar_crm;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    whatsapp VARCHAR(15),
    password VARCHAR(255),
    role ENUM('ADMIN','OPERATOR','CUSTOMER') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ENQUIRIES
CREATE TABLE enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id VARCHAR(30) UNIQUE,
    full_name VARCHAR(100),
    email VARCHAR(100),
    whatsapp VARCHAR(15),
    monthly_bill VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    roof_area INT NULL,
    system_type VARCHAR(50) NULL,
    message TEXT NULL,
    planning_after_years INT DEFAULT 0,
    status ENUM('NEW','CONTACTED','FOLLOW-UP','CONVERTED','REJECTED') DEFAULT 'NEW',
    created_from ENUM('WEB','ADMIN') DEFAULT 'WEB',
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE enquiries
ADD COLUMN state VARCHAR(100) NULL;

-- ENQUIRY COMMENTS
CREATE TABLE enquiry_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id INT,
    comment TEXT,
    commented_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FOLLOW-UP REMINDERS
CREATE TABLE follow_up_reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id INT,
    reminder_date DATE,
    status ENUM('PENDING','SENT') DEFAULT 'PENDING'
);

-- PROJECTS
CREATE TABLE solar_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(30) UNIQUE,
    user_id INT,
    system_capacity DECIMAL(5,2),
    inverter_brand VARCHAR(100),
    panel_brand VARCHAR(100),
    install_date DATE,
    commission_date DATE,
    warranty_end DATE,
    status ENUM('PLANNED','INSTALLED','ACTIVE') DEFAULT 'PLANNED'
);

-- MAINTENANCE (3 per year, 5 years)
CREATE TABLE maintenance_schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    service_year INT,
    cycle ENUM('Q1','Q2','Q3'),
    scheduled_date DATE,
    completed ENUM('YES','NO') DEFAULT 'NO',
    remarks TEXT
);

-- COMPLAINTS
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id VARCHAR(30) UNIQUE,
    project_id INT,
    user_id INT,
    category VARCHAR(50),
    priority ENUM('HIGH','MEDIUM','LOW') DEFAULT 'MEDIUM',
    description TEXT,
    sla_due_at DATETIME,
    status ENUM('OPEN','RESOLVED','CLOSED') DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SOLAR GENERATION
CREATE TABLE solar_generation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    generation_date DATE,
    units DECIMAL(10,2),
    peak_power DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
