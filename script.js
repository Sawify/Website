// JavaScript for the navigation bar and features
document.addEventListener('DOMContentLoaded', function() {
    // Whitelist of allowed redirect domains
    const allowedDomains = [
        'sawify.co',
        'www.sawify.co',
        window.location.origin
    ];
    
    // Function to validate redirect URL
    function isValidRedirectUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            
            // Allow relative URLs (same domain)
            if (url.startsWith('/') || url.startsWith('./') || !url.includes('://')) {
                return true;
            }
            
            // Check if domain is in whitelist
            return allowedDomains.some(domain => urlObj.href.includes(domain));
        } catch (e) {
            return false;
        }
    }
    
    // Handle all buttons with data-href attribute
    document.querySelectorAll('button[data-href]').forEach(button => {
        button.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            
            // Validate URL before redirecting
            if (isValidRedirectUrl(href)) {
                window.location.href = href;
            } else {
                console.error('Invalid redirect URL blocked:', href);
            }
        });
    });
    
    // Smooth scrolling for logo link
    const logoLink = document.querySelector('.logo-link');
    
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 65; // Fixed navbar height
                const windowHeight = window.innerHeight;
                const sectionHeight = targetSection.offsetHeight;
                const sectionTop = targetSection.offsetTop;
                
                // Calculate position to center the section
                let scrollPosition = sectionTop - (windowHeight - sectionHeight) / 2 + navbarHeight / 2;
                
                // Ensure we don't scroll past the top or bottom
                scrollPosition = Math.max(0, scrollPosition);
                scrollPosition = Math.min(document.body.scrollHeight - windowHeight, scrollPosition);
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Glass navbar on scroll functionality
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Video tab functionality with radio buttons
    const videoRadios = document.querySelectorAll('.video-radio');
    const generationWrapper = document.getElementById('generation-wrapper');
    const plannerWrapper = document.getElementById('planner-wrapper');
    
    videoRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'generation') {
                // Show generation video
                generationWrapper.classList.add('active-video');
                plannerWrapper.classList.remove('active-video');
                generationWrapper.style.display = 'block';
                plannerWrapper.style.display = 'none';
                
                // Update tab styling
                document.querySelectorAll('.video-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelector('input[value="generation"]').nextElementSibling.classList.add('active');
            } else if (this.value === 'planner') {
                // Show planner video
                plannerWrapper.classList.add('active-video');
                generationWrapper.classList.remove('active-video');
                plannerWrapper.style.display = 'block';
                generationWrapper.style.display = 'none';
                
                // Update tab styling
                document.querySelectorAll('.video-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelector('input[value="planner"]').nextElementSibling.classList.add('active');
            }
        });
    });
    
    // Feature toggle functionality
    const featureItems = document.querySelectorAll('.feature-item');
    const previewContent = document.querySelector('.preview-content');
    
    // Function to update preview content based on selected feature
    function updatePreviewContent(featureTitle) {
        if (featureTitle === 'AI Writing Assistant') {
            previewContent.innerHTML = '<img src="AIWritingAssistant.png" alt="AI Writing Assistant Preview" style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display: block;">';
        } else if (featureTitle === 'Content Planner') {
            previewContent.innerHTML = '<img src="Calendar.png" alt="Content Planner Preview" style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display: block;">';
        } else if (featureTitle === 'Tables') {
            previewContent.innerHTML = '<img src="Tables.png" alt="Tables Preview" style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display: block;">';
        } else {
            // Default empty state for other features
            previewContent.innerHTML = '<!-- Preview content will be displayed here -->';
        }
    }
    
    featureItems.forEach(item => {
        const header = item.querySelector('.feature-header');
        const toggle = item.querySelector('.feature-toggle');
        const featureTitle = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
        
        if (header) {
            header.addEventListener('click', function() {
            // If clicking on an already active item, don't close it (keep at least one open)
            if (item.classList.contains('active')) {
                return; // Do nothing if trying to close the active item
            }
            
            // Close all other items and activate the clicked one
            featureItems.forEach(otherItem => {
                if (otherItem === item) {
                    // Activate the clicked item
                    otherItem.classList.add('active');
                    const otherToggle = otherItem.querySelector('.feature-toggle');
                    otherToggle.textContent = '−';
                    
                    // Update preview content
                    updatePreviewContent(featureTitle);
                } else {
                    // Close all other items
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.feature-toggle');
                    otherToggle.textContent = '+';
                }
            });
        }
    });
    
    // Initialize with AI Writing Assistant selected (since it's active by default)
    updatePreviewContent('AI Writing Assistant');

    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Check if elements exist
    if (hamburgerMenu && mobileMenu) {
        // Toggle mobile menu
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close the menu
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Scroll to section
                if (targetSection) {
                    const navbarHeight = 65;
                    const windowHeight = window.innerHeight;
                    const sectionHeight = targetSection.offsetHeight;
                    const sectionTop = targetSection.offsetTop;
                    
                    let scrollPosition = sectionTop - (windowHeight - sectionHeight) / 2 + navbarHeight / 2;
                    scrollPosition = Math.max(0, scrollPosition);
                    scrollPosition = Math.min(document.body.scrollHeight - windowHeight, scrollPosition);
                    
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});