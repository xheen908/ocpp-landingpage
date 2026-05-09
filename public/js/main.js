// Unified Programmatic Interactivity (SSR Build 7.0 - Strategic Overhaul)
document.addEventListener('DOMContentLoaded', () => {
    console.log('BUILD 7.0 (Strategic Overhaul) - Customs Highway & Revenue Engine Ready');

    // ── Typewriter Effect for H1 Hero Headline ──────────────────────────────
    const h1Span = document.querySelector('#h1-text .gradient-text');
    if (h1Span) {
        const originalHTML = h1Span.innerHTML.trim();
        // Split on <br> to preserve line breaks
        const parts = originalHTML.split(/<br\s*\/?>/i);
        // Build char array: strings interleaved with null (= line break marker)
        const charQueue = [];
        parts.forEach((part, i) => {
            [...part].forEach(c => charQueue.push(c));
            if (i < parts.length - 1) charQueue.push(null); // null = <br>
        });

        // Clear and set up cursor
        h1Span.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        h1Span.appendChild(cursor);

        let idx = 0;
        // Small delay so the page paint completes first
        const startDelay = setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (idx < charQueue.length) {
                    const ch = charQueue[idx];
                    if (ch === null) {
                        cursor.insertAdjacentHTML('beforebegin', '<br>');
                    } else {
                        cursor.insertAdjacentText('beforebegin', ch);
                    }
                    idx++;
                } else {
                    clearInterval(typeInterval);
                    // Blink for 1.5 s then fade out cursor
                    setTimeout(() => {
                        cursor.style.transition = 'opacity 0.6s ease';
                        cursor.style.opacity = '0';
                        setTimeout(() => cursor.remove(), 700);
                    }, 1500);
                }
            }, 35); // 35ms per char ≈ fast typewriter
        }, 300);
    }
    // ────────────────────────────────────────────────────────────────────────


    const modal = document.getElementById('contact-modal');
    const heroBtn = document.getElementById('v2-hero-trigger');
    const bottomBtn = document.getElementById('v2-bottom-trigger');
    const closeBtn = document.getElementById('modal-close');
    const leadForm = document.getElementById('lead-form');

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

    // Form Submission (Build 11.1)
    if (leadForm) {
        leadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const status = document.getElementById('form-status');
            const button = document.getElementById('contact-button');
            const consent = document.getElementById('privacy-consent');
            if (!status || !button || !consent) return;

            if (!consent.checked) {
                status.classList.remove('hidden');
                status.innerText = 'PLEASE AGREE TO THE PRIVACY POLICY.';
                status.style.color = '#ef4444';
                return;
            }

            status.classList.remove('hidden');
            status.innerText = 'Sending...';
            button.disabled = true;

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
                    }, 3000);
                } else {
                    throw new Error();
                }
            } catch (error) {
                status.innerText = 'ERROR. PLEASE TRY AGAIN.';
                status.style.color = '#ef4444';
                button.disabled = false;
            }
        });
    }

    // Sidebar Drawer (Build 15.3)
    const burgerTrigger = document.getElementById('burger-trigger');
    const burgerClose = document.getElementById('burger-close');
    const sidebarDrawer = document.getElementById('sidebar-drawer');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const sidebarLinks = sidebarDrawer?.querySelectorAll('a');

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
    if (sidebarLinks) sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));

    const menuContactTrigger = document.getElementById('menu-contact-trigger');
    if (menuContactTrigger) {
        menuContactTrigger.addEventListener('click', () => {
            closeSidebar();
            setTimeout(openModal, 400);
        });
    }

    // Global Reveal-on-Scroll Observer (Build 21.0)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: keep animating or once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.05,
        rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // Flying Article Stack (Build 20.0 - Dynamic Multi-Slide)
    const articleStack = document.getElementById('article-stack');
    const stackItems = document.querySelectorAll('.article-row-stack');
    const stackProgress = document.getElementById('stack-progress-fill');

    if (articleStack && stackItems.length > 0) {
        const handleStackScroll = () => {
            // Option 2 Implementation: Animations on mobile via Reveal-on-Scroll, 
            // Desktop keeps the sticky Stack effect.
            if (window.innerWidth < 768) {
                // Ensure desktop styles don't interfere if window was resized
                stackItems.forEach(item => {
                    item.style.transform = '';
                    item.style.opacity = '';
                    item.style.zIndex = '';
                });
                return;
            }

            const rect = articleStack.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            let totalProgress = -sectionTop / (sectionHeight - windowHeight);
            totalProgress = Math.max(0, Math.min(1, totalProgress));

            if (stackProgress) stackProgress.style.width = `${totalProgress * 100}%`;

            const totalItems = stackItems.length;
            
            stackItems.forEach((item, index) => {
                const itemStep = 1 / totalItems;
                const itemStart = index * itemStep;
                
                let itemProgress = (totalProgress - itemStart) / itemStep;
                itemProgress = Math.max(0, Math.min(1, itemProgress));

                // Layering logic
                item.style.zIndex = totalItems - index;

                // SPECIAL LOGIC FOR FIRST ITEM: Always visible at start
                const isFirstItemAtStart = (index === 0 && totalProgress === 0);

                if (index < totalItems - 1) {
                    if (itemProgress > 0.5) {
                        // Exit phase (flying out)
                        const factor = (itemProgress - 0.5) * 2;
                        item.style.transform = `translateX(${-factor * 120}%) translateY(${-factor * 20}px) rotate(${-factor * 5}deg)`;
                        item.style.opacity = 1 - factor;
                        item.style.pointerEvents = 'none';
                        item.style.visibility = 'visible';
                    } else if (itemProgress > 0 || isFirstItemAtStart) {
                        // Active phase (sitting still)
                        item.style.transform = 'translateX(0) translateY(0) rotate(0)';
                        item.style.opacity = '1';
                        item.style.pointerEvents = 'auto';
                        item.style.visibility = 'visible';
                    } else {
                        // Waiting phase
                        item.style.opacity = '0';
                        item.style.visibility = 'hidden';
                        item.style.pointerEvents = 'none';
                    }
                } else {
                    // Last item settles in
                    item.style.opacity = itemProgress > 0 ? '1' : '0';
                    item.style.visibility = itemProgress > 0 ? 'visible' : 'hidden';
                    item.style.transform = `scale(${0.95 + (itemProgress * 0.05)})`;
                }
            });
        };

        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(handleStackScroll);
        });
        handleStackScroll();
    }

    // FAQ Accordion Toggle (Build 3.0)
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        document.querySelectorAll('.faq-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all other items for a clean accordion effect
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ── Interactive DPP Live Simulator (B2B Sandbox Demo) ───────────────────
    const demoButtons = document.querySelectorAll('.demo-prod-btn');
    const demoScanBtn = document.getElementById('demo-scan-btn');
    const demoTerminalLog = document.getElementById('demo-terminal-log');

    let activeProduct = 'battery'; // Default active product

    const dppPayloads = {
        battery: {
            "context": "SAP/Oracle Enterprise Sync",
            "integrationInfo": {
                "systemSource": "V-Ledger IaaS",
                "dataIntegrity": "BLOCKCHAIN_VERIFIED"
            },
            "productData": {
                "id": 14,
                "tokenId": "1328507507778448",
                "chipUid": "04B84542152390",
                "productId": "CERT-04B84542152390",
                "ownerWallet": "0x24954DA952B9590d7726DEDd1C1ccD4bB130F9b8",
                "material": "V-Ledger Demo Batterie (Lithium NMC)",
                "vledgerUid": "2b130671-a603-4037-ab2b-4ea0ed56ed3d",
                "status": "ACTIVE"
            },
            "chainOfCustody": {
                "totalEvents": 5,
                "firstSeen": "2026-05-01T01:02:28.000Z",
                "lastSeen": "2026-05-09T14:30:00.000Z",
                "integrityHash": "304a2b32099904ee1ea8fb9be273bf0f9e872e5aad52669d275150186e83c274"
            },
            "events": [
                {
                    "action": "MINT",
                    "actor": "manufacturer@v-ledger.com",
                    "locationName": "Duisburg Assembly Plant",
                    "transactionHash": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422",
                    "timestamp": "2026-05-01T01:02:28.000Z"
                },
                {
                    "action": "QC_PASSED",
                    "actor": "qc-officer@v-ledger.com",
                    "locationName": "Quality Control Lab",
                    "transactionHash": "0x9ec1aa2ec62a1fa632866b9c9f201f45bf3e1a0ed1a48ded8f528c67d07ac032",
                    "timestamp": "2026-05-03T22:48:32.000Z"
                },
                {
                    "action": "IMPORT_CLEARED",
                    "actor": "customs@duisburg-port.de",
                    "locationName": "Port of Duisburg",
                    "transactionHash": "0x52e2535e36521d5f5a8944825c27ca39fc818adb24081cfc00263be20cc5e6d1",
                    "timestamp": "2026-05-04T10:15:40.000Z"
                },
                {
                    "action": "CLAIM_OWNERSHIP",
                    "actor": "logistic-partner@blue-cargo.com",
                    "locationName": "Regional Distribution Hub",
                    "transactionHash": "0xeeddf81e342103675912f819cc10e5db8bc772440e94dbcc5a14ce718470eddb",
                    "timestamp": "2026-05-06T11:22:52.000Z"
                },
                {
                    "action": "RECYCLE_TRANSFER",
                    "actor": "intake@remondis-recycling.com",
                    "locationName": "Recycling Center Duisburg",
                    "transactionHash": "0x304a2b32099904ee1ea8fb9be273bf0f9e872e5aad52669d275150186e83c274",
                    "timestamp": "2026-05-09T14:30:00.000Z"
                }
            ]
        },
        textile: {
            "id": "https://api.v-ledger.com/aas/01/04200000000001/21/04C92518413990",
            "idType": "IRI",
            "modelType": "AssetAdministrationShell",
            "assetInformation": {
                "assetKind": "Instance",
                "globalAssetId": "https://api.v-ledger.com/01/04200000000001/21/04C92518413990",
                "specificAssetIds": [
                    { "name": "GTIN", "value": "04200000000001" },
                    { "name": "SerialNumber", "value": "04C92518413990" }
                ]
            },
            "submodels": [
                { 
                    "id": "DigitalTwin-Identity", 
                    "type": "W3C_VerifiableCredential",
                    "lifecycleState": "QC_PASSED"
                },
                { 
                    "id": "Circular-Economy-ESPR", 
                    "purity": "100% Recycled Wool",
                    "recyclabilityIndex": "94.8% A-Grade"
                }
            ],
            "lifecycle": {
                "currentStatus": "CLAIMED",
                "history": [
                    { "step": "MINT", "date": "2026-05-02" },
                    { "step": "QC_PASSED", "date": "2026-05-03" },
                    { "step": "RETAIL_SALE", "date": "2026-05-05" },
                    { "step": "CLAIMED", "date": "2026-05-08" }
                ]
            }
        },
        watch: {
            "context": "W3C Verifiable Credential",
            "id": "urn:uuid:6ca8420-1a28-490f-90db-28104c990a2a",
            "type": ["VerifiableCredential", "DigitalProductPassport"],
            "credentialSubject": {
                "id": "did:vledger:04D11645392880",
                "brand": "Elite Chrono Manufacture",
                "modelName": "Precision Chronograph",
                "material": "904L Oystersteel / Ceramic",
                "resaleRoyaltyRate": "5.00% (On-Chain Lock)",
                "blockchainAnchor": "Base L2 Ledger",
                "currentOwner": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735"
            },
            "chainOfCustody": {
                "status": "AUTHENTICITY_SECURED",
                "lifecycleEvents": [
                    { "event": "ORIGIN_MINT", "timestamp": "2026-05-01T12:00:00Z" },
                    { "event": "BOUTIQUE_RECEIPT", "timestamp": "2026-05-04T09:30:00Z" },
                    { "event": "FIRST_OWNER_CLAIM", "timestamp": "2026-05-09T18:45:00Z" }
                ]
            }
        }
    };

    if (demoButtons.length > 0 && demoScanBtn && demoTerminalLog) {
        // Toggle active product
        demoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                demoButtons.forEach(b => {
                    b.classList.remove('active', 'border-[#a88c5a]/40', 'bg-[#a88c5a]/10');
                    b.classList.add('border-white/5', 'bg-white/5');
                });
                btn.classList.add('active', 'border-[#a88c5a]/40', 'bg-[#a88c5a]/10');
                btn.classList.remove('border-white/5', 'bg-white/5');

                if (btn.id === 'demo-prod-battery') activeProduct = 'battery';
                else if (btn.id === 'demo-prod-textile') activeProduct = 'textile';
                else if (btn.id === 'demo-prod-watch') activeProduct = 'watch';

                demoTerminalLog.innerHTML = `<span class="text-white/40">Product category switched to ${activeProduct.toUpperCase()}. Ready for cryptographic NFC scan.</span>`;
            });
        });

        // Scan button click handler
        demoScanBtn.addEventListener('click', () => {
            demoTerminalLog.innerHTML = '';
            
            const logs = [
                { text: `> SCANNING PHYSICAL OBJECT VIA NFC (NTAG 424 DNA)...`, delay: 0, color: '#a88c5a' },
                { text: `> EXTRACTING SUN CRYPTO SIGNATURE (CMAC): ${activeProduct === 'battery' ? '04B84542152390' : activeProduct === 'textile' ? '04C92518413990' : '04D11645392880'}80AFEAEB92...`, delay: 500, color: '#ffffff' },
                { text: `> COMMUNICATING WITH BASE L2 DEPLOYED PAYMASTER...`, delay: 1000, color: '#a88c5a' },
                { text: `> VERIFYING AES-128 DECRYPTION KEY... MATCHED successfully.`, delay: 1500, color: '#22c55e' },
                { text: `> REQUESTING DIGITAL TWIN STATE FOR TOKENID ON-CHAIN...`, delay: 2000, color: '#ffffff' },
                { text: `> SUCCESS! GENERATING DIGITAL PRODUCT PASSPORT (DPP) PAYLOAD:`, delay: 2500, color: '#22c55e' }
            ];

            logs.forEach(log => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.style.color = log.color;
                    line.innerText = log.text;
                    demoTerminalLog.appendChild(line);
                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, log.delay);
            });

            // Print formatted JSON
            setTimeout(() => {
                const jsonBlock = document.createElement('pre');
                jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-3 rounded border border-white/5 overflow-x-auto select-all';
                jsonBlock.style.fontSize = '8px';
                jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                demoTerminalLog.appendChild(jsonBlock);
                demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
            }, 3000);
        });
    }
});
