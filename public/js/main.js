// Unified Programmatic Interactivity (SSR Build 7.0 - Strategic Overhaul)
document.addEventListener('DOMContentLoaded', () => {
    console.log('BUILD 7.0 (Strategic Overhaul) - Customs Highway & Revenue Engine Ready');

    const modal = document.getElementById('contact-modal');
    const heroBtn = document.getElementById('v2-hero-trigger');
    const bottomBtn = document.getElementById('v2-bottom-trigger');
    const closeBtn = document.getElementById('modal-close');
    const leadForm = document.getElementById('lead-form');

    // Revenue Calculator Elements
    const calcVolume = document.getElementById('calc-volume');
    const calcRate = document.getElementById('calc-rate');
    const calcFee = document.getElementById('calc-fee');
    const calcResult = document.getElementById('calc-result');

    const openModal = () => {
        if (!modal) return;
        modal.classList.add('active');
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }, 400);
    };

    // Language Dropdown Toggle (Build 12.1)
    const langTrigger = document.getElementById('lang-menu-trigger');
    const langDropdown = document.getElementById('lang-menu-dropdown');

    if (langTrigger && langDropdown) {
        langTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target) && !langTrigger.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }

    // Modal Triggers
    if (heroBtn) heroBtn.addEventListener('click', openModal);
    if (bottomBtn) bottomBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    // Revenue Calculator Logic
    const updateCalculator = () => {
        if (!calcVolume || !calcRate || !calcFee || !calcResult) return;
        
        const volume = parseFloat(calcVolume.value) || 0;
        const rate = parseFloat(calcRate.value) || 0;
        const fee = parseFloat(calcFee.value) || 0;
        
        const profit = volume * (rate / 100) * fee;
        calcResult.innerText = profit.toLocaleString('de-DE') + ' €';
    };

    if (calcVolume) calcVolume.addEventListener('input', updateCalculator);
    if (calcRate) calcRate.addEventListener('input', updateCalculator);
    if (calcFee) calcFee.addEventListener('input', updateCalculator);

    // Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const status = document.getElementById('form-status');
            const button = document.getElementById('contact-button');
            const consent = document.getElementById('privacy-consent');
            if (!status || !button || !consent) return;

            // GDPR Validation (Build 11.1)
            if (!consent.checked) {
                status.classList.remove('hidden');
                status.innerText = 'PLEASE AGREE TO THE PRIVACY POLICY.';
                status.style.color = '#ef4444';
                return;
            }

            status.classList.remove('hidden');
            status.innerText = 'Sending...';
            button.disabled = true;
            button.style.opacity = '0.5';

            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.success) {
                    status.innerText = 'SUCCESS. WE WILL CONTACT YOU.';
                    status.style.color = '#a88c5a'; 
                    leadForm.reset();
                    setTimeout(() => {
                        closeModal();
                        status.classList.add('hidden');
                        button.disabled = false;
                        button.style.opacity = '1';
                    }, 3000);
                } else {
                    throw new Error();
                }
            } catch (error) {
                status.innerText = 'ERROR. PLEASE TRY AGAIN.';
                status.style.color = '#ef4444';
                button.disabled = false;
                button.style.opacity = '1';
            }
        });
    }

    // Sidebar Drawer (Build 15.3)
    const burgerTrigger = document.getElementById('burger-trigger');
    const burgerClose = document.getElementById('burger-close');
    const sidebarDrawer = document.getElementById('sidebar-drawer');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    const openSidebar = () => {
        if (!sidebarDrawer || !sidebarBackdrop) return;
        sidebarBackdrop.style.opacity = '1';
        sidebarBackdrop.style.pointerEvents = 'auto';
        sidebarDrawer.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        if (!sidebarDrawer || !sidebarBackdrop) return;
        sidebarBackdrop.style.opacity = '0';
        sidebarBackdrop.style.pointerEvents = 'none';
        sidebarDrawer.style.transform = 'translateX(-100%)';
        document.body.style.overflow = '';
    };

    if (burgerTrigger) burgerTrigger.addEventListener('click', openSidebar);
    if (burgerClose) burgerClose.addEventListener('click', closeSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

    const menuContactTrigger = document.getElementById('menu-contact-trigger');
    if (menuContactTrigger) {
        menuContactTrigger.addEventListener('click', () => {
            closeSidebar();
            setTimeout(openModal, 400); // Wait for sidebar to slide out
        });
    }

    // Auto-close on link click so the menu doesn't freeze the page navigation
    if (sidebarDrawer) {
        const sidebarLinks = sidebarDrawer.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // Guard against Safari/iOS BFCache freezing the body overflow
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            closeSidebar();
        }
    });

    // Sticky Scroll Reveal System (Build 16.0)
    const revealSection = document.getElementById('tech-reveal');
    const revealSlides = document.querySelectorAll('.reveal-slide');
    const progressFill = document.getElementById('reveal-progress-fill');
    const navDots = document.querySelectorAll('.nav-dot');

    if (revealSection && revealSlides.length > 0) {
        const handleRevealScroll = () => {
            const sectionRect = revealSection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress (0 to 1) based on how much of the section has been scrolled
            // We start counting when top of section hits top of window
            // and end when bottom of section hits bottom of window
            let progress = -sectionTop / (sectionHeight - windowHeight);
            progress = Math.max(0, Math.min(1, progress));

            if (progressFill) progressFill.style.width = `${progress * 100}%`;

            // Transition logic for 2 slides
            // Slide 0: 0% to 50% progress
            // Slide 1: 50% to 100% progress
            const threshold = 0.5;
            
            if (progress < threshold) {
                // Show Slide 1
                revealSlides[0].classList.add('active');
                revealSlides[0].classList.remove('inactive');
                revealSlides[1].classList.add('inactive');
                revealSlides[1].classList.remove('active');
                
                if (navDots[0]) navDots[0].classList.add('active');
                if (navDots[1]) navDots[1].classList.remove('active');
            } else {
                // Show Slide 2
                revealSlides[0].classList.add('inactive');
                revealSlides[0].classList.remove('active');
                revealSlides[1].classList.add('active');
                revealSlides[1].classList.remove('inactive');

                if (navDots[0]) navDots[0].classList.remove('active');
                if (navDots[1]) navDots[1].classList.add('active');
            }
        };

        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(handleRevealScroll);
        });
        
        // Initial check
        handleRevealScroll();
    }
});
