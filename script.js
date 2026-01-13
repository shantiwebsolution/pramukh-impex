$(document).ready(function() {
    // Hero background image rotation
    const heroImages = ['assets/1/1.jpg', 'assets/1/2.jpg'];
    const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
    $('.hero').css('background-image',
        'linear-gradient(135deg, rgba(248,249,250,0.8) 0%, rgba(233,236,239,0.8) 100%), url(' + randomImage + ')'
    );

    // Smooth scrolling for nav links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Adjust for sticky header
            }, 1000);
        }
    });

    // Mobile menu toggle
    $('.hamburger').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
        $(this).attr('aria-expanded', $(this).hasClass('active'));
    });

    // Close mobile menu on link click
    $('.nav-menu a').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active').attr('aria-expanded', 'false');
    });

    // Close mobile menu on ESC
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) { // ESC
            $('.nav-menu').removeClass('active');
            $('.hamburger').removeClass('active').attr('aria-expanded', 'false');
        }
    });

    // FAQ Accordion
    $('.accordion-toggle').on('click', function() {
        var panelId = $(this).attr('aria-controls');
        var panel = $('#' + panelId);
        var isExpanded = $(this).attr('aria-expanded') === 'true';

        // Close all panels
        $('.accordion-panel').attr('hidden', true);
        $('.accordion-toggle').attr('aria-expanded', 'false');

        // Open clicked panel if not already open
        if (!isExpanded) {
            panel.removeAttr('hidden');
            $(this).attr('aria-expanded', 'true');
        }
    });

    // Keyboard navigation for accordion
    $('.accordion-toggle').on('keydown', function(e) {
        if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
            e.preventDefault();
            $(this).click();
        }
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    }, observerOptions);

    // Observe sections for reveal
    $('section').each(function() {
        $(this).addClass('reveal');
        observer.observe(this);
    });

    // Back to top button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    $('#back-to-top').on('click', function() {
        $('html, body').stop().animate({ scrollTop: 0 }, 800);
    });

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable smooth scrolling and animations
        $('html, body').css('scroll-behavior', 'auto');
        $('.reveal').removeClass('reveal').addClass('visible');
    }
});
