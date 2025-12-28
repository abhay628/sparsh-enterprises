<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparsh Enterprises - Solar Solutions for Residential & Commercial</title>
    <meta name="description" content="Leading solar company in Amroha offering complete solar solutions for residential and commercial customers. 12+ years of excellence in electrical services.">
    <meta name="keywords" content="solar panels Amroha, solar company Amroha, solar installation, solar energy, residential solar, commercial solar">
    <meta name="author" content="M/s Sparsh Enterprises">
    <meta property="og:title" content="M/s Sparsh Enterprises - Solar Solutions">
    <meta property="og:description" content="12+ years of excellence in electrical and solar services">
    <meta property="og:url" content="https://www.thesparshenterprises.com/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="M/s Sparsh Enterprises">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>
    
    <!-- Google Search Console -->
    <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
    
    <!-- Materialize CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    
    <!-- Google Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <!-- Header -->
    <header>
        <nav class="navbar-fixed">
            <nav class="white">
                <div class="nav-wrapper container">
                    <a href="index.php" class="brand-logo">
                        <img src="images/logo.png" alt="Sparsh Enterprises Logo" class="logo-img">
                    </a>
                    <a href="#" data-target="mobile-nav" class="sidenav-trigger">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <?php $page = basename($_SERVER['PHP_SELF']); ?>
                        <li><a href="index" class="<?php if ($page == 'index') echo 'active'; ?>">Home</a></li>
                        <li><a href="products" class="<?php if ($page == 'products') echo 'active'; ?>">Product Kit</a></li>
                        <li><a href="eligibility" class="<?php if ($page == 'eligibility') echo 'active'; ?>">Eligibility</a></li>
                        <li><a href="contact" class="<?php if ($page == 'contact') echo 'active'; ?>">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
        </nav>
        
        <!-- Mobile Side Navigation -->
        <ul class="sidenav" id="mobile-nav">
            <li>
                <div class="user-view">
                    <!-- <div class="background">
                        <img src="images/solar-hero-1.jpg" alt="Background">
                    </div> -->
                    <a href="index.html">
                        <img class="circle" src="images/logo.png" alt="Logo">
                    </a>
                    <!-- <a href="index.html">
                        <span class="white-text name">M/s Sparsh Enterprises</span>
                    </a> -->
                    <!-- <a href="index.html">
                        <span class="white-text email">Solar Solutions</span>
                    </a> -->
                </div>
            </li>
            <li><a href="index.html" class="waves-effect"><i class="material-icons">home</i>Home</a></li>
            <li><a href="products.html" class="waves-effect"><i class="material-icons">shopping_cart</i>Product Kit</a></li>
            <li><a href="eligibility.html" class="waves-effect"><i class="material-icons">check_circle</i>Eligibility</a></li>
            <li><a href="contact.html" class="waves-effect"><i class="material-icons">contact_phone</i>Contact Us</a></li>
            <li><div class="divider"></div></li>
            <li><a href="tel:+919758497584" class="waves-effect"><i class="material-icons">phone</i>+91 97584 97584</a></li>
        </ul>
    </header>