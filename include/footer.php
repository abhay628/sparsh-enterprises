    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="images/logo.png" alt="Sparsh Enterprises" class="footer-logo-img">
                    </div>
                    <p>Leading solar company in Amroha with 12+ years of excellence in electrical and solar solutions.</p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index">Home</a></li>
                        <li><a href="products">Product Kit</a></li>
                        <li><a href="eligibility">Eligibility</a></li>
                        <li><a href="contact">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Our Services</h4>
                    <ul class="footer-links">
                        <li><a href="solar-ongrid">Solar On-grid Systems</a></li>
                        <li><a href="solar-offgrid">Solar Off-grid Systems</a></li>
                        <li><a href="solar-hybrid">Solar Hybrid Systems</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Moh. Kala Kuan Near Shiv Mandir, Amroha (U.P.) - 244221</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>8395871001, 9258976855</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>info@thesparshenterprises.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y') ?> M/s Sparsh Enterprises. All rights reserved. | Site by <a href="https://www.thesparshenterprises.com/">Sparsh Enterprises</a></p>
            </div>
        </div>
    </footer>

    <!-- Materialize JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    
    <!-- JavaScript -->
    <script src="js/main.js"></script>
    
    <!-- Initialize Materialize Components -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize sidenav
            M.Sidenav.init(document.querySelectorAll('.sidenav'), {edge: 'left', draggable: true});
            M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {hover: false, coverTrigger: false, constrainWidth: false});
            M.Collapsible.init(document.querySelectorAll('.collapsible'));
            
            // Initialize select
            var selectElems = document.querySelectorAll('select');
            var selectInstances = M.FormSelect.init(selectElems);
        });
    </script>
</body>
</html>