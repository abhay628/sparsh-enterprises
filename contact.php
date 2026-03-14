<?php include('include/header.php') ?>
<style>
    @import url("css/contact.css");
</style>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1>Contact Us</h1>
            <p>Get in touch with our solar experts for a free consultation and quote</p>
        </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-info-section">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Visit Us</h3>
                    <p>Kailsa by Pass Road,</p><p> Near City Hospital </p>
                    <p>Amroha, Uttar Pradesh</p>
                    <p>PIN - 244221</p>
                    <a href="https://www.google.com/maps/place/Sparsh+Enterprises/@28.9024973,78.4725674,19.5z/data=!4m22!1m15!4m14!1m6!1m2!1s0x390b0900300c535b:0x8c03988428a66c28!2sSparsh+Enterprises!2m2!1d78.4729825!2d28.9025592!1m6!1m2!1s0x390b0900300c535b:0x8c03988428a66c28!2sSparsh+Enterprises+WF3F%2B25H+Azad+Rd,+near+Rana+Petrol+Pump,+Sarrafa+Bazar+Katra+Amroha,+Uttar+Pradesh+244221!2m2!1d78.4729825!2d28.9025592!3m5!1s0x390b0900300c535b:0x8c03988428a66c28!8m2!3d28.9025592!4d78.4729825!16s%2Fg%2F11wxbygfkw?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" target="_blank" class="map-link">
                        <i class="fas fa-external-link-alt"></i>
                        View on Map
                    </a>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h3>Call Us</h3>
                    <p>+91 8395871001</p>
                    <p>+91 9258976855</p>
                    <small>Mon-Sat: 9:00 AM - 6:00 PM</small>
                    <a href="tel:+919758497584" class="contact-link">
                        <i class="fas fa-phone"></i>
                        Call Now
                    </a>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3>Email Us</h3>
                    <p>info@thesparshenterprises.com</p>
                    <a href="mailto:info@thesparshenterprises.com" class="contact-link">
                        <i class="fas fa-envelope"></i>
                        Send Email
                    </a>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <h3>WhatsApp</h3>
                    <p>+91 9258976855</p>
                    <small>Quick Response</small>
                    <a href="https://wa.me/9258976855" target="_blank" class="whatsapp-link">
                        <i class="fab fa-whatsapp"></i>
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section">
        <div class="container">
            <div class="form-container">
                <div class="form-header">
                    <h2>Get Your Free Solar Quote</h2>
                    <p>Fill out the form below and our solar expert will contact you within 24 hours</p>
                </div>
                
                <form id="contactForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fullName">Full Name *</label>
                            <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="whatsapp">WhatsApp Number *</label>
                            <input type="tel" id="whatsapp" name="whatsapp" placeholder="Enter your WhatsApp number" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="monthlyBill">Monthly Electricity Bill *</label>
                            <select id="monthlyBill" name="monthlyBill" required>
                                <option value="">Select your monthly bill</option>
                                <option value="<1500">Less than ₹1,500</option>
                                <option value="1500-2500">₹1,500 - ₹2,500</option>
                                <option value="2500-4000">₹2,500 - ₹4,000</option>
                                <option value="4000-8000">₹4,000 - ₹8,000</option>
                                <option value=">8000">More than ₹8,000</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="pincode">Pincode *</label>
                            <input type="text" id="pincode" name="pincode" placeholder="Enter your pincode" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="city">City *</label>
                            <input type="text" id="city" name="city" placeholder="Enter your city" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="systemType">Interested System Type</label>
                            <select id="systemType" name="systemType">
                                <option value="">Select system type</option>
                                <option value="on-grid">On-Grid System</option>
                                <option value="off-grid">Off-Grid System</option>
                                <option value="hybrid">Hybrid System</option>
                                <option value="not-sure">Not Sure - Need Advice</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="roofArea">Approximate Roof Area (sq ft)</label>
                            <input type="number" id="roofArea" name="roofArea" placeholder="Enter roof area if known">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" placeholder="Tell us more about your requirements, preferred time to call, etc." rows="4"></textarea>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-container">
                            <input type="checkbox" id="newsletter" name="newsletter" checked>
                            <span class="checkmark"></span>
                            I would like to receive updates about solar technology and government schemes
                        </label>
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i>
                        Submit                    
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <h2 class="section-title">Frequently Asked Questions</h2>
            
            <div class="faq-container">
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>How long does it take to install a solar system?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Typically, residential solar installations take 1-2 days for the actual installation. However, the complete process including site survey, design, government approvals, and commissioning takes 7-10 working days.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>What is the warranty on solar panels?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>We provide 25 years warranty on solar panels, 5-10 years on inverters, and 25 years on mounting structures. The warranty covers manufacturing defects and performance guarantees.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>How much can I save with solar panels?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>You can save up to 80% on your electricity bills. The exact savings depend on your system size, electricity consumption, and local sunlight conditions. Use our eligibility calculator to get personalized estimates.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Is my roof suitable for solar installation?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Most roofs are suitable for solar installation. Key requirements include: adequate sunlight exposure (5+ hours), structural integrity, and minimum 100 sq ft shadow-free area. We provide free site assessment to determine suitability.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>What government subsidies are available?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>The government provides subsidies up to ₹18,000 per kW for the first 3 kW, and ₹9,000 per kW thereafter. Maximum subsidy is ₹1,08,000 for systems up to 10 kW. Additional state-specific incentives may apply.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Go Solar?</h2>
                <p>Join thousands of satisfied customers who have switched to clean, affordable solar energy</p>
                <a href="tel:+919258976855" class="cta-button">
                    <i class="fas fa-phone"></i>
                    Call Now: +91 9258976855
                </a>
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications">
        <div class="container">
            <h2 class="section-title">Our Certifications & Licenses</h2>
            <p class="section-subtitle">M/s Sparsh Enterprises is a certified and licensed organization, ensuring quality and compliance in all our services.</p>
            <div class="certifications-grid">
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/contractor-badge.png" alt="A-Class Contractor License" class="certification-img">
                    </div>
                    <h3>A-Class Vendor/Contractor</h3>
                    <p>Government authorized electrical contractor with A-Class license for all types of electrical installations and solar projects.</p>
                </div>
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/msme-logo.png" alt="MSME Certificate" class="certification-img">
                    </div>
                    <h3>MSME Registered</h3>
                    <p>Registered with Ministry of Micro, Small and Medium Enterprises, Government of India.</p>
                </div>
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/iso-certification.png" alt="ISO Certification" class="certification-img">
                    </div>
                    <h3>ISO Certified</h3>
                    <p>ISO 9001:2015 certified for quality management systems, ensuring consistent quality in products and services.</p>
                </div>
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/labour-license.png" alt="Labour License" class="certification-img">
                    </div>
                    <h3>Labour License</h3>
                    <p>Registered labour contractor with valid license from the Labour Department, Government of India.</p>
                </div>
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/epfo-logo.png" alt="EPFO Registration" class="certification-img">
                    </div>
                    <h3>EPFO Registered</h3>
                    <p>Registered with Employees' Provident Fund Organisation, ensuring employee welfare and compliance.</p>
                </div>
                <div class="certification-card">
                    <div class="certification-icon">
                        <img src="images/esic-logo.png" alt="ESIC Registration" class="certification-img">
                    </div>
                    <h3>ESIC Registered</h3>
                    <p>Registered with Employees' State Insurance Corporation, providing health insurance benefits to employees.</p>
                </div>
            </div>
        </div>
    </section>
<script src="js/contact.js"></script>
<?php include('include/footer.php') ?>
