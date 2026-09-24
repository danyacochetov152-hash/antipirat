/* =========================================================
   Linkrepear — Interactive Scripts
   ========================================================= */

(function () {
    'use strict';

    /* =====================================================
       1. Mobile menu toggle
       ===================================================== */
    function initMobileMenu() {
        const toggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        if (!toggle || !navLinks) return;

        toggle.addEventListener('click', function () {
            const isActive = navLinks.classList.toggle('active');
            toggle.classList.toggle('active', isActive);
            toggle.setAttribute('aria-expanded', String(isActive));
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* =====================================================
       2. Smooth scroll for anchor links
       ===================================================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId.length < 2) return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();
                const headerOffset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* =====================================================
       3. Reveal on scroll (IntersectionObserver)
       ===================================================== */
    function initScrollReveal() {
        const revealTargets = document.querySelectorAll(
            '.feature-card, .pricing-card, .cta-section, .pricing-header, .hero-content > *'
        );

        revealTargets.forEach(function (el) {
            el.classList.add('reveal');
        });

        if (!('IntersectionObserver' in window)) {
            revealTargets.forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* =====================================================
       4. Header shadow on scroll
       ===================================================== */
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener(
            'scroll',
            function () {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 20) {
                    header.style.boxShadow = '0 4px 20px rgba(15, 26, 46, 0.06)';
                } else {
                    header.style.boxShadow = 'none';
                }
            },
            { passive: true }
        );
    }

    /* =====================================================
       Init on DOM ready
       ===================================================== */
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initScrollReveal();
        initHeaderScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();