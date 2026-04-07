/**
 * THE GATEKEEPER: Cloudflare-Style Cookie Consent Logic
 * Build 20.0 - B2B Industrial Compliance
 */

const STORAGE_KEY = 'ocpp_consent_v20';

function initCookieGatekeeper() {
    const barrier = document.getElementById('cookie-barrier');
    const pbar = document.getElementById('cookie-scan-progress');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsBtn = document.getElementById('cookie-settings');

    // Removed the persistent check to force Gatekeeper on EVERY reload
    showGatekeeper();

    function showGatekeeper() {
        // Lock the page
        document.body.classList.add('cookie-lock');
        
        // Use a tiny delay to ensure CSS opacity transition is visible
        setTimeout(() => {
            barrier.classList.add('show');
        }, 100);
        
        // Start cosmetic progress bar
        setTimeout(() => {
            if (pbar) pbar.classList.add('active');
        }, 500);
    }

    function hideGatekeeper(type) {
        // Save consent
        const data = {
            timestamp: new Date().toISOString(),
            choice: type,
            version: '20.0'
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        // Unlock page with animation
        barrier.style.transition = 'opacity 500ms ease-out';
        barrier.classList.remove('show');
        
        setTimeout(() => {
            document.body.classList.remove('cookie-lock');
        }, 500);

        // Custom event for downstream scripts
        window.dispatchEvent(new CustomEvent('ocpp-consent-updated', { detail: data }));
    }

    // Event Listeners
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => hideGatekeeper('all'));
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => hideGatekeeper('minimal'));
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Placeholder: Show advanced settings modal if needed
            alert('Infrastructure Preferences: Under Development for ESPR 2027.');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCookieGatekeeper);
