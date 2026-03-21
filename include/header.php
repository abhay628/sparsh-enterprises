<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparsh Enterprises | Best Solar Company in Amroha UP</title>
    <meta name="description" content="Sparsh Enterprises provides end-to-end solar solutions in Amroha, Uttar Pradesh including rooftop solar installation, EPC services, and solar panel supply.">

    <meta name="keywords" content="Sparsh Enterprises, solar company Amroha, solar installation Amroha, solar panel dealer Amroha, solar EPC services UP, solar panel installation Uttar Pradesh, rooftop solar Amroha">

    <meta name="author" content="Sparsh Enterprises">
    <meta property="og:title" content="Sparsh Enterprises - Solar Provider in Amroha">
    <meta property="og:description" content="Complete solar energy solutions in Amroha. Rooftop solar installation, EPC services, and solar systems by Sparsh Enterprises.">
    <meta property="og:url" content="https://www.thesparshenterprises.com/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="The Sparsh Enterprises">


    <!-- Twitter SEO -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Sparsh Enterprises Solar Amroha">
    <meta name="twitter:description" content="Best solar installation company in Amroha providing end-to-end solar solutions.">

        
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0B8WSKXCKM"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-0B8WSKXCKM');
    </script>
    
    <!-- Google Search Console -->
    <meta name="google-site-verification" content="R4_lzs4HaONMzMb6R0bUmFEeTuDTpseAoOXgiul7ruU" />
    
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
                    <a href="index" class="brand-logo">
                        <img src="images/logo.png" alt="Sparsh Enterprises Logo" class="logo-img">
                    </a>
                    <a href="#" data-target="mobile-nav" class="sidenav-trigger">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <?php 
                            $page = basename($_SERVER['PHP_SELF'], '.php'); 
                            $services = ['solar-ongrid', 'solar-offgrid', 'solar-hybrid'];
                            $isServicesActive = in_array($page, $services) ? 'active' : '';
                        ?>
                        <li><a href="index" class="<?php if ($page == 'index') echo 'active'; ?>">Home</a></li>
                        <li><a class="dropdown-trigger <?php echo $isServicesActive; ?>" href="#!" data-target="services-dropdown">Our Services<i class="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="products" class="<?php if ($page == 'products') echo 'active'; ?>">Product Kit</a></li>
                        <li><a href="eligibility" class="<?php if ($page == 'eligibility') echo 'active'; ?>">Eligibility</a></li>
                        <li><a href="contact" class="<?php if ($page == 'contact') echo 'active'; ?>">Contact Us</a></li>
                    </ul>
                    <ul id="services-dropdown" class="dropdown-content">
                        <li><a href="solar-ongrid" class="<?php if ($page == 'solar-ongrid') echo 'active'; ?>">Solar On-grid Systems</a></li>
                        <li><a href="solar-offgrid" class="<?php if ($page == 'solar-offgrid') echo 'active';?>">Solar Off-grid Systems</a></li>
                        <li><a href="solar-hybrid" class="<?php if ($page == 'solar-hybrid') echo 'active'; ?>">Solar Hybrid Systems</a></li>
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
                    <a href="index">
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
            <li><a href="index" class="waves-effect"><i class="material-icons">home</i>Home</a></li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li class="<?php echo $isServicesActive; ?>">
                        <a class="collapsible-header waves-effect"><i class="material-icons">build</i>Our Services<i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="solar-ongrid" class="waves-effect <?php if ($page == 'solar-ongrid') echo 'active'; ?>">Solar On-grid Systems</a></li>
                                <li><a href="solar-offgrid" class="waves-effect <?php if ($page == 'solar-offgrid') echo 'active'; ?>">Solar Off-grid Systems</a></li>
                                <li><a href="solar-hybrid" class="waves-effect <?php if ($page == 'solar-hybrid') echo 'active'; ?>">Solar Hybrid Systems</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li><a href="products" class="waves-effect"><i class="material-icons">shopping_cart</i>Product Kit</a></li>
            <li><a href="eligibility" class="waves-effect"><i class="material-icons">check_circle</i>Eligibility</a></li>
            <li><a href="contact" class="waves-effect"><i class="material-icons">contact_phone</i>Contact Us</a></li>
            <li><div class="divider"></div></li>
            <li><a href="tel:+919758497584" class="waves-effect"><i class="material-icons">phone</i>+91 97584 97584</a></li>
        </ul>
    </header>