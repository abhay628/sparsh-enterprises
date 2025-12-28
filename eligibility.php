<?php include('include/header.php') ?>
<style>
    @import url("css/eligibility.css");
</style>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1>Eligibility Calculator</h1>
            <p>Check your eligibility for solar panel installation and calculate your requirements</p>
        </div>
    </section>
    

    <!-- Eligibility Calculator -->
    <section class="calculator-section">
        <div class="container">
            <div class="calculator-content">
                <div class="calculator-form">
                    <h2>Calculate Your Solar Requirements</h2>
                    <p>Fill in your details to get a personalized solar solution</p>
                    
                    <form id="eligibilityForm" class="calculator-form-el">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="monthly-bill">Monthly Electricity Bill *</label>
                                <select id="monthly-bill" name="monthlyBill" required>
                                    <option value="">Select your monthly bill</option>
                                    <option value="<1500">Less than ₹1,500</option>
                                    <option value="1500-2500">₹1,500 - ₹2,500</option>
                                    <option value="2500-4000">₹2,500 - ₹4,000</option>
                                    <option value="4000-8000">₹4,000 - ₹8,000</option>
                                    <option value=">8000">More than ₹8,000</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="roof-area">Available Roof Area (sq ft) *</label>
                                <input type="number" id="roof-area" name="roofArea" placeholder="Enter roof area" required min="100">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="household-type">Household Type *</label>
                                <select id="household-type" name="householdType" required>
                                    <option value="">Select household type</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="industrial">Industrial</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="location">Location *</label>
                                <input type="text" id="location" name="location" placeholder="Enter your city/area" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="average-sunlight">Average Sunlight Hours</label>
                                <select id="average-sunlight" name="averageSunlight">
                                    <option value="5">5 hours (Average)</option>
                                    <option value="6">6 hours (Good)</option>
                                    <option value="7">7 hours (Very Good)</option>
                                    <option value="8">8 hours (Excellent)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="shadow-analysis">Shadow Analysis</label>
                                <select id="shadow-analysis" name="shadowAnalysis">
                                    <option value="none">No Shadow</option>
                                    <option value="minimal">Minimal Shadow</option>
                                    <option value="moderate">Moderate Shadow</option>
                                    <option value="heavy">Heavy Shadow</option>
                                </select>
                            </div>
                        </div>
                        
                        <button type="submit" class="calculate-btn">
                            <i class="fas fa-calculator"></i>
                            Calculate My Requirements
                        </button>
                    </form>
                </div>
                
                <div class="calculator-results" id="calculatorResults" style="display: none;">
                    <h2>Your Solar Requirements</h2>
                    
                    <div class="results-grid">
                        <div class="result-card">
                            <div class="result-icon">
                                <i class="fas fa-solar-panel"></i>
                            </div>
                            <div class="result-content">
                                <h3>Required System Size</h3>
                                <p class="result-value" id="systemSize">-</p>
                                <p class="result-unit">kW</p>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <div class="result-icon">
                                <i class="fas fa-area-chart"></i>
                            </div>
                            <div class="result-content">
                                <h3>Required Roof Area</h3>
                                <p class="result-value" id="requiredArea">-</p>
                                <p class="result-unit">sq ft</p>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <div class="result-icon">
                                <i class="fas fa-rupee-sign"></i>
                            </div>
                            <div class="result-content">
                                <h3>Estimated Cost</h3>
                                <p class="result-value" id="estimatedCost">-</p>
                                <p class="result-unit">₹</p>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <div class="result-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="result-content">
                                <h3>Monthly Savings</h3>
                                <p class="result-value" id="monthlySavings">-</p>
                                <p class="result-unit">₹</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="results-details">
                        <h3>Detailed Analysis</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <span class="detail-label">Annual Generation:</span>
                                <span class="detail-value" id="annualGeneration">-</span>
                                <span class="detail-unit">kWh</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Payback Period:</span>
                                <span class="detail-value" id="paybackPeriod">-</span>
                                <span class="detail-unit">years</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">CO2 Savings:</span>
                                <span class="detail-value" id="co2Savings">-</span>
                                <span class="detail-unit">tons/year</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Government Subsidy:</span>
                                <span class="detail-value" id="govtSubsidy">-</span>
                                <span class="detail-unit">₹</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Net Cost:</span>
                                <span class="detail-value" id="customerContribution">-</span>
                                <span class="detail-unit">₹</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="eligibility-status">
                        <div class="status-indicator" id="eligibilityStatus">
                            <i class="fas fa-check-circle"></i>
                            <span>Your location is eligible for government subsidy</span>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button type="button" class="btn-secondary" onclick="resetCalculator()">
                            <i class="fas fa-redo"></i>
                            Recalculate
                        </button>
                        <a href="contact.html" class="btn-primary">
                            <i class="fas fa-phone"></i>
                            Get Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Eligibility Criteria -->
    <section class="criteria-section">
        <div class="container">
            <h2 class="section-title">Eligibility Criteria</h2>
            
            <div class="criteria-grid">
                <div class="criteria-card">
                    <div class="criteria-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Property Ownership</h3>
                    <ul>
                        <li>✓ Must be property owner or have written consent from owner</li>
                        <li>✓ Roof should be structurally sound</li>
                        <li>✓ Minimum 100 sq ft shadow-free area</li>
                        <li>✓ Clear access to roof for maintenance</li>
                    </ul>
                </div>
                
                <div class="criteria-card">
                    <div class="criteria-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Location Requirements</h3>
                    <ul>
                        <li>✓ Must be in Amroha or nearby areas</li>
                        <li>✓ Adequate sunlight exposure (5+ hours)</li>
                        <li>✓ No major shading from trees/buildings</li>
                        <li>✓ Proper roof orientation (South-facing preferred)</li>
                    </ul>
                </div>
                
                <div class="criteria-card">
                    <div class="criteria-icon">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <h3>Documentation</h3>
                    <ul>
                        <li>✓ Valid electricity bill</li>
                        <li>✓ Property ownership documents</li>
                        <li>✓ Government-issued ID proof</li>
                        <li>✓ Passport size photographs</li>
                    </ul>
                </div>
                
                <div class="criteria-card">
                    <div class="criteria-icon">
                        <i class="fas fa-rupee-sign"></i>
                    </div>
                    <h3>Financial Criteria</h3>
                    <ul>
                        <li>✓ Minimum monthly bill ₹1,500 for subsidy eligibility</li>
                        <li>✓ Capacity limit as per government norms</li>
                        <li>✓ No previous subsidy claims for same property</li>
                        <li>✓ Payment capacity for initial contribution</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
        <div class="container">
            <h2 class="section-title">Benefits of Going Solar</h2>
            
            <div class="benefits-grid">
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h3>Environmental Impact</h3>
                    <p>Reduce your carbon footprint by up to 1.5 tons of CO2 per year with a 5kW system</p>
                </div>
                
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <h3>Financial Savings</h3>
                    <p>Save up to 80% on electricity bills with payback period of 4-6 years</p>
                </div>
                
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Energy Independence</h3>
                    <p>Reduce dependence on grid electricity and protect against rising tariffs</p>
                </div>
                
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Property Value</h3>
                    <p>Increase your property value by 3-4% with solar installation</p>
                </div>
                
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Low Maintenance</h3>
                    <p>Minimal maintenance required with 25-year panel warranty</p>
                </div>
                
                <div class="benefit-item" style="display: grid !important;">
                    <div class="benefit-icon">
                        <i class="fas fa-gift"></i>
                    </div>
                    <h3>Government Incentives</h3>
                    <p>Avai government subsidies and tax benefits for renewable energy adoption</p>
                </div>
            </div>
        </div>
    </section>

<script src="js/calculator.js"></script>
<?php include('include/footer.php') ?>
