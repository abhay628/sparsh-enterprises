<?php include('include/header.php') ?>

    <!-- Hero Section with Carousel -->
    <section class="hero-section">
        <div class="carousel-container">
            <div class="carousel-slide active">
                <img src="images/solar-banner-7.png" alt="Solar Installation" class="carousel-image" >
            </div>
            <div class="carousel-slide">
                <img src="images/solar-banner-5.png" alt="Commercial Solar" class="carousel-image">
                <!-- <div class="carousel-content">
                    <h1>Commercial Solar Solutions</h1>
                    <p>Reduce your electricity bills by up to 80% with our industrial solar systems</p>
                    <a href="#appointment" class="cta-button">Learn More</a>
                </div> -->
            </div>
            <div class="carousel-slide">
                <img src="images/solar-banner-6.png" alt="Residential Solar" class="carousel-image">
                <!-- <div class="carousel-content">
                    <h1>Residential Solar Systems</h1>
                    <p>Affordable solar solutions for homes with government subsidies</p>
                    <a href="#appointment" class="cta-button">Calculate Savings</a>
                </div> -->
            </div>
        </div>
        <div class="carousel-controls">
            <button class="carousel-btn prev" onclick="changeSlide(-1)">❮</button>
            <button class="carousel-btn next" onclick="changeSlide(1)">❯</button>
        </div>
        <div class="carousel-indicators">
            <span class="indicator active" onclick="currentSlide(1)"></span>
            <span class="indicator" onclick="currentSlide(2)"></span>
            <span class="indicator" onclick="currentSlide(3)"></span>
        </div>
    </section>

    <!-- Solar Systems Section -->
    <section class="solar-systems">
        <div class="container">
            <h2 class="section-title">Our Solar Solutions</h2>
            <div class="solar-grid">
                <div class="solar-card">
                    <div class="card-icon">
                        <i class="fas fa-solar-panel"></i>
                    </div>
                    <h3>Solar On-grid Systems</h3>
                    <p>On-grid solar systems harness the sun's abundant energy to generate electricity, which powers the connected establishment and seamlessly feeds excess energy back into the grid.</p>
                    <ul class="benefits-list">
                        <li>✓ Net metering benefits</li>
                        <li>✓ Government subsidies available</li>
                        <li>✓ Zero maintenance cost</li>
                    </ul>
                </div>
                <div class="solar-card">
                    <div class="card-icon">
                        <i class="fas fa-battery-full"></i>
                    </div>
                    <h3>Solar Off-grid Systems</h3>
                    <p>Designed to free you from the limitations of traditional power issues, our off-grid solutions ensure a smooth transition to sustainable energy.</p>
                    <ul class="benefits-list">
                        <li>✓ Independent power source</li>
                        <li>✓ Battery backup included</li>
                        <li>✓ Perfect for remote locations</li>
                    </ul>
                </div>
                <div class="solar-card">
                    <div class="card-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h3>Solar Hybrid Systems</h3>
                    <p>Solar hybrid systems represent the epitome of energy efficiency and resilience through seamlessly integrating solar power with other energy sources.</p>
                    <ul class="benefits-list">
                        <li>✓ Maximum energy efficiency</li>
                        <li>✓ Multiple power sources</li>
                        <li>✓ 24/7 power availability</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <h2 class="section-title">Why Choose Our Solar Solutions</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-rupee-sign"></i>
                    </div>
                    <h3>Financial Benefits</h3>
                    <p>Save up to 80% on electricity bills with government subsidies and tax benefits</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Quality Assurance</h3>
                    <p>25-year warranty on solar panels with premium quality components</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Professional Installation</h3>
                    <p>Expert installation by certified technicians with proper system design</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Round-the-clock customer support and maintenance services</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Make an Appointment Section -->
    <section id="appointment" class="appointment">
        <div class="container">
            <div class="appointment-content">
                <div class="appointment-info">
                    <h2>Get Your Free Solar Consultation</h2>
                    <p>Book an appointment with our solar experts to get a customized quote and energy assessment for your home or business.</p>
                    <div class="appointment-benefits">
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Free site inspection</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Custom system design</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Financial analysis</span>
                        </div>
                    </div>
                </div>
                <div class="appointment-form">
                    <form id="appointmentForm" class="contact-form">
                        <div class="form-group">
                            <input type="text" id="apt-name" name="name" placeholder="Full Name *" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="apt-email" name="email" placeholder="Email Address *" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="apt-phone" name="phone" placeholder="WhatsApp Number *" required>
                        </div>
                        <div class="form-group">
                            <select id="apt-bill" name="monthlyBill" required>
                                <option value="">Monthly Electricity Bill *</option>
                                <option value="<1500">Less than ₹1,500</option>
                                <option value="1500-2500">₹1,500 - ₹2,500</option>
                                <option value="2500-4000">₹2,500 - ₹4,000</option>
                                <option value="4000-8000">₹4,000 - ₹8,000</option>
                                <option value=">8000">More than ₹8,000</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" id="apt-pincode" name="pincode" placeholder="Pincode *" required>
                        </div>
                        <div class="form-group">
                            <input type="text" id="apt-city" name="city" placeholder="City *" required>
                        </div>
                        <button type="submit" class="submit-btn">Book Free Consultation</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- About Us Section -->
    <section class="about-us">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>About M/s Sparsh Enterprises</h2>
                    <div class="experience-badge">
                        <span class="years">12+</span>
                        <span class="text">Years of Excellence</span>
                    </div>
                    <p>M/s Sparsh Enterprises is a full-fledged project based electrical engineering firm. The founder of the firm, Mr. Salil Thakur, has work experience of over 12 years in this field.</p>
                    <p>The company has expertise in all aspects of electrical building systems including creative lighting design, power distribution, UPS and emergency power, communications systems and special control systems.</p>
                    <p>We have worked for both the public and private sector and are involved in a variety of electrical work, ranging from Domestic to Industrial Installations and Electrical Contracting.</p>
                    <div class="about-stats">
                        <div class="stat-item">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">Projects Completed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">1000+</span>
                            <span class="stat-label">Happy Customers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">25+</span>
                            <span class="stat-label">Years Warranty</span>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="images/aboutIndex.jpg" alt="Sparsh Enterprises Team">
                </div>
            </div>
        </div>
    </section>

    <!-- Products & Services Section -->
    <section class="products-services">
        <div class="container">
            <h2 class="section-title">Our Products & Services</h2>
            <div class="products-grid">
                <div class="product-category">
                    <div class="category-header">
                        <i class="fas fa-solar-panel"></i>
                        <h3>Solar Systems</h3>
                    </div>
                    <ul class="product-list">
                        <li>On-grid Solar Systems</li>
                        <li>Off-grid Solar Systems</li>
                        <li>Hybrid Solar Systems</li>
                        <li>Solar Water Heaters</li>
                        <li>Solar Street Lights</li>
                    </ul>
                </div>
                <div class="product-category">
                    <div class="category-header">
                        <i class="fas fa-bolt"></i>
                        <h3>Electrical Services</h3>
                    </div>
                    <ul class="product-list">
                        <li>Electrical Installation</li>
                        <li>Power Distribution</li>
                        <li>Lighting Design</li>
                        <li>UPS Systems</li>
                        <li>Emergency Power</li>
                    </ul>
                </div>
                <div class="product-category">
                    <div class="category-header">
                        <i class="fas fa-tools"></i>
                        <h3>Maintenance</h3>
                    </div>
                    <ul class="product-list">
                        <li>System Monitoring</li>
                        <li>Regular Maintenance</li>
                        <li>Performance Testing</li>
                        <li>Cleaning Services</li>
                        <li>Repair Services</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us">
        <div class="container">
            <h2 class="section-title">Why Choose Us!</h2>
            <div class="choose-content">
                <div class="choose-main">
                    <h3>Complete Commercial & Residential Solar Systems</h3>
                    <p>Complete Commercial & Residential Solar Systems provide a comprehensive solution for harnessing clean, renewable energy. Tailored to meet the unique energy needs of businesses and homes, these systems combine cutting-edge solar panels, inverters, and storage solutions to deliver optimal performance and energy savings.</p>
                    <p>Whether you're looking to reduce operational costs, lower your carbon footprint, or ensure energy independence, our solar systems offer a reliable and sustainable solution for all your energy needs.</p>
                </div>
                <div class="choose-benefits">
                    <div class="benefit-card">
                        <div class="benefit-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <h4>Certified Installers</h4>
                        <p>Government certified solar panel installers with years of experience</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <h4>Quick Installation</h4>
                        <p>Complete installation within 7-10 working days</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <h4>End-to-End Support</h4>
                        <p>From consultation to maintenance, we handle everything</p>
                    </div>
                </div>
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

<?php include('include/footer.php') ?>