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

    // Advanced Scroll Storytelling System (Build 17.0 - "The Flying Experience")
    const storySection = document.getElementById('tech-story');
    const storyLevels = document.querySelectorAll('.story-layer');
    const storyProgress = document.getElementById('story-progress-fill');
    const bg1 = document.getElementById('bg-1');
    const bg2 = document.getElementById('bg-2');

    if (storySection && storyLevels.length > 0) {
        const handleStoryScroll = () => {
            const sectionRect = storySection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Global Progress (0 to 1)
            let globalProgress = -sectionTop / (sectionHeight - windowHeight);
            globalProgress = Math.max(0, Math.min(1, globalProgress));

            if (storyProgress) storyProgress.style.width = `${globalProgress * 100}%`;

            // Background Parallax Switch
            if (globalProgress > 0.5) {
                if (bg1) bg1.classList.remove('active');
                if (bg2) bg2.classList.add('active');
            } else {
                if (bg1) bg1.classList.add('active');
                if (bg2) bg2.classList.remove('active');
            }

            storyLevels.forEach((layer) => {
                const start = parseFloat(layer.dataset.start);
                const end = parseFloat(layer.dataset.end);
                const duration = end - start;
                
                // Calculate local progress within this beat's range
                let localProgress = (globalProgress - start) / duration;
                localProgress = Math.max(0, Math.min(1, localProgress));

                const img = layer.querySelector('.fly-image');
                const text = layer.querySelector('.fly-text');

                // ENTRANCE (0 to 0.5 local progress)
                // EXIT (0.5 to 1 local progress)
                
                if (globalProgress >= start && globalProgress <= end) {
                    layer.classList.add('active');
                    
                    if (localProgress < 0.5) {
                        // Incoming
                        const inFactor = localProgress * 2; // 0 to 1
                        layer.style.opacity = inFactor;
                        
                        if (img) {
                            layer.style.transform = `translateX(${(1 - inFactor) * 100}px) scale(${0.8 + inFactor * 0.2})`;
                        } else if (text) {
                            layer.style.transform = `translateY(${(1 - inFactor) * 50}px) scale(${0.9 + inFactor * 0.1})`;
                        }
                    } else {
                        // Outgoing
                        const outFactor = (localProgress - 0.5) * 2; // 0 to 1
                        layer.style.opacity = 1 - outFactor;
                        
                        if (img) {
                            layer.style.transform = `translateY(${-outFactor * 100}px) scale(${1 + outFactor * 0.1})`;
                        } else if (text) {
                            layer.style.transform = `translateY(${-outFactor * 50}px) scale(1)`;
                        }
                    }
                } else {
                    layer.classList.remove('active');
                    layer.style.opacity = 0;
                }
            });
        };

        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(handleStoryScroll);
        });
        handleStoryScroll();
    }
});
