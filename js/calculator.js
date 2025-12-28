// Solar Eligibility Calculator

class SolarCalculator {
    constructor() {
        this.form = document.getElementById('eligibilityForm');
        this.resultsSection = document.getElementById('calculatorResults');
        this.initializeCalculator();
    }

    initializeCalculator() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleCalculation(e));
            this.setupInputValidation();
        }
    }

    setupInputValidation() {
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('focus', () => this.clearInputError(input));
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        const name = input.name;

        if (input.hasAttribute('required') && !value) {
            this.showInputError(input, 'This field is required');
            return false;
        }

        switch (name) {
            case 'roofArea':
                if (value && (isNaN(value) || parseFloat(value) < 100)) {
                    this.showInputError(input, 'Roof area must be at least 100 sq ft');
                    return false;
                }
                break;
            case 'location':
                if (value && value.length < 3) {
                    this.showInputError(input, 'Location must be at least 3 characters');
                    return false;
                }
                break;
        }

        this.clearInputError(input);
        return true;
    }

    showInputError(input, message) {
        this.clearInputError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error);
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        input.style.borderColor = 'var(--error)';
        input.parentNode.appendChild(errorDiv);
    }

    clearInputError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = 'var(--gray-medium)';
    }

    handleCalculation(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate all inputs
        let isValid = true;
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Perform calculations
        const results = this.calculateSolarRequirements(data);
        
        // Display results
        this.displayResults(results, data);
        
        // Show results section
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    calculateSolarRequirements(data) {
        // Base calculations
        const monthlyBill = this.getMonthlyBillValue(data.monthlyBill);
        const roofArea = parseFloat(data.roofArea);
        const householdType = data.householdType;

        // Determine recommended capacity based on monthly bill
        const recommendedCapacity = this.getRecommendedCapacity(monthlyBill);
        
        // Get pricing data for the recommended capacity
        const pricingData = this.getPricingData(recommendedCapacity);
        
        // Calculate required roof area
        const requiredArea = recommendedCapacity * 100; // 100 sq ft per kW
        
        // Check if roof area is sufficient
        const areaSufficient = roofArea >= requiredArea;

        // Calculate monthly savings (approximately 80% of bill)
        const monthlySavings = Math.round(monthlyBill * 0.80);
        
        // Calculate annual generation
        const averageSunlight = 5; // Average sunlight hours in India
        const annualGeneration = recommendedCapacity * averageSunlight * 365 * 0.8; // 0.8 for system losses
        
        // Calculate payback period
        const netCost = pricingData.customerContribution;
        const paybackPeriod = netCost / (monthlySavings * 12);
        
        // Calculate CO2 savings
        const co2Savings = annualGeneration * 0.00082; // 0.82 kg CO2 per kWh
        
        // Check eligibility
        const eligibility = this.checkEligibility(data, recommendedCapacity);

        return {
            systemSize: recommendedCapacity,
            requiredArea: Math.ceil(requiredArea),
            estimatedCost: pricingData.estimatedCost,
            govtSubsidy: pricingData.grant,
            customerContribution: pricingData.customerContribution,
            monthlySavings: monthlySavings,
            annualGeneration: Math.round(annualGeneration),
            paybackPeriod: paybackPeriod.toFixed(1),
            co2Savings: co2Savings.toFixed(2),
            areaSufficient: areaSufficient,
            eligibility: eligibility
        };
    }

    getMonthlyBillValue(billRange) {
        switch (billRange) {
            case '<1500': return 1200;
            case '1500-2500': return 2000;
            case '2500-4000': return 3250;
            case '4000-8000': return 6000;
            case '>8000': return 10000;
            default: return 3000;
        }
    }

    getRecommendedCapacity(monthlyBill) {
        // Determine capacity based on monthly bill
        if (monthlyBill < 1500) {
            return 1;
        } else if (monthlyBill < 2500) {
            return 2;
        } else if (monthlyBill < 4000) {
            return 3;
        } else if (monthlyBill < 8000) {
            return 4;
        } else {
            return 5;
        }
    }

    getPricingData(capacity) {
        // Pricing table based on capacity
        const pricingTable = {
            1: { capacity: 1, grant: 45000, estimatedCost: 65000, customerContribution: 20000 },
            2: { capacity: 2, grant: 90000, estimatedCost: 130000, customerContribution: 40000 },
            3: { capacity: 3, grant: 108000, estimatedCost: 180000, customerContribution: 72000 },
            4: { capacity: 4, grant: 108000, estimatedCost: 240000, customerContribution: 132000 },
            5: { capacity: 5, grant: 108000, estimatedCost: 275000, customerContribution: 167000 }
        };

        return pricingTable[capacity] || pricingTable[3];
    }



    checkEligibility(data, systemSize) {
        const eligible = {
            subsidy: false,
            installation: false,
            location: false
        };

        // Check subsidy eligibility
        const monthlyBill = this.getMonthlyBillValue(data.monthlyBill);
        if (monthlyBill >= 1500 && systemSize <= 10) {
            eligible.subsidy = true;
        }

        // Check installation eligibility
        const roofArea = parseFloat(data.roofArea);
        const requiredArea = systemSize * 100;
        if (roofArea >= requiredArea) {
            eligible.installation = true;
        }

        // Check location eligibility (simplified)
        const location = data.location.toLowerCase();
        const eligibleLocations = ['amroha', 'moradabad', 'ghaziabad', 'noida', 'delhi', 'gurgaon'];
        eligible.location = eligibleLocations.some(loc => location.includes(loc));

        return eligible;
    }

    displayResults(results, inputData) {
        // Update result values
        document.getElementById('systemSize').textContent = results.systemSize;
        document.getElementById('requiredArea').textContent = results.requiredArea.toLocaleString();
        document.getElementById('estimatedCost').textContent = '₹' + results.estimatedCost.toLocaleString();
        document.getElementById('govtSubsidy').textContent = '₹' + results.govtSubsidy.toLocaleString();
        if (document.getElementById('customerContribution')) {
            document.getElementById('customerContribution').textContent = '₹' + results.customerContribution.toLocaleString();
        }
        document.getElementById('monthlySavings').textContent = '₹' + results.monthlySavings.toLocaleString();
        document.getElementById('annualGeneration').textContent = results.annualGeneration.toLocaleString();
        document.getElementById('paybackPeriod').textContent = results.paybackPeriod;
        document.getElementById('co2Savings').textContent = results.co2Savings;

        // Update eligibility status
        const statusElement = document.getElementById('eligibilityStatus');
        if (results.eligibility.subsidy && results.eligibility.installation) {
            statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Your location is eligible for government subsidy</span>';
            statusElement.className = 'status-indicator eligible';
        } else if (results.eligibility.installation) {
            statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Installation possible, but subsidy may not apply</span>';
            statusElement.className = 'status-indicator warning';
        } else {
            statusElement.innerHTML = '<i class="fas fa-times-circle"></i><span>Installation not recommended with current roof area</span>';
            statusElement.className = 'status-indicator not-eligible';
        }

        // Add area sufficiency warning
        if (!results.areaSufficient) {
            const areaWarning = document.createElement('div');
            areaWarning.className = 'area-warning';
            areaWarning.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <span>Your roof area (${inputData.roofArea} sq ft) may not be sufficient for optimal system size. Consider a smaller system or contact us for custom solutions.</span>
            `;
            
            const resultsGrid = document.querySelector('.results-grid');
            if (!document.querySelector('.area-warning')) {
                resultsGrid.parentNode.insertBefore(areaWarning, resultsGrid);
            }
        }
    }
}

// Global functions for HTML onclick handlers
function resetCalculator() {
    const form = document.getElementById('eligibilityForm');
    const resultsSection = document.getElementById('calculatorResults');
    const areaWarning = document.querySelector('.area-warning');
    
    // Reset form
    form.reset();
    
    // Hide results
    resultsSection.style.display = 'none';
    
    // Remove area warning if exists
    if (areaWarning) {
        areaWarning.remove();
    }
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SolarCalculator();
});