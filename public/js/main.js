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
            if (!status || !button) return;

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

    // Swiper Initialization
    if (typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            loop: true, speed: 1200,
            autoplay: { delay: 7000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }
});
