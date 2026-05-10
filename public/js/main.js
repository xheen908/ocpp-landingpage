// Unified Programmatic Interactivity (SSR Build 7.0 - Strategic Overhaul)
document.addEventListener('DOMContentLoaded', () => {
    console.log('BUILD 7.0 (Strategic Overhaul) - Customs Highway & Revenue Engine Ready');

    // ── Robust HTML-Aware Typewriter Effect for H1 Hero Headline ────────────────
    const h1Span = document.querySelector('#h1-text .gradient-text');
    if (h1Span) {
        const originalHTML = h1Span.innerHTML.trim();
        h1Span.innerHTML = ''; 
        
        let idx = 0;
        const startDelay = setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (idx < originalHTML.length) {
                    // If we hit an HTML tag opening, fast-forward past the entire tag instantly
                    if (originalHTML[idx] === '<') {
                        const tagEnd = originalHTML.indexOf('>', idx);
                        if (tagEnd !== -1) {
                            idx = tagEnd + 1;
                        } else {
                            idx++;
                        }
                    } else {
                        idx++;
                    }
                    
                    // Render the current slice. Browser's automatic DOM healing will handle 
                    // temporary unclosed tags flawlessly step-by-step.
                    h1Span.innerHTML = originalHTML.substring(0, idx) + '<span class="typewriter-cursor" aria-hidden="true"></span>';
                } else {
                    clearInterval(typeInterval);
                    // Binking phase over, perform cursor teardown
                    const cursor = h1Span.querySelector('.typewriter-cursor');
                    if (cursor) {
                        setTimeout(() => {
                            cursor.style.transition = 'opacity 0.6s ease';
                            cursor.style.opacity = '0';
                            setTimeout(() => cursor.remove(), 700);
                        }, 1500);
                    }
                }
            }, 30); // 30ms per visual unit for dynamic feel
        }, 300);
    }
    // ────────────────────────────────────────────────────────────────────────────



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
            "@context": [
                "https://ref.gs1.org/contexts/gs1-context.jsonld",
                {
                    "schema": "http://schema.org/",
                    "idpp": "https://v-ledger.com/voc/"
                }
            ],
            "@type": "gs1:Product",
            "@id": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
            "name": "V-Ledger Demo Batterie",
            "description": "V-Ledger Demo Batterie",
            "image": "ipfs://QmazCNumbt2RCVWMALkcxcSSpdHexTxJjtNG1z7PUeXPmZ",
            "brand": {
                "@type": "Brand",
                "name": "V-Ledger"
            },
            "gs1:gtin": "04200000000001",
            "gs1:serialNumber": "04B84542152390",
            "gs1:productionDate": "2026-05-01",
            "gs1:countryOfOrigin": "CN",
            "tokenId": "1328507507778448",
            "status": "ACTIVE",
            "smartContract": "0x2523822b6182f3c9705bd928f3481b61b182d61e",
            "transactionHash": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422",
            "idpp:hardware": {
                "chipType": "NXP NTAG 424 DNA",
                "status": "AUTHENTIC",
                "verificationCount": 3
            },
            "links": [
                {
                    "rel": "gs1:pip",
                    "target": "https://v-ledger.com/product-info",
                    "title": "Produktinformationsseite"
                },
                {
                    "rel": "gs1:repairAndServiceInfo",
                    "target": "https://v-ledger.com/support",
                    "title": "Support & Reparatur"
                },
                {
                    "rel": "gs1:certificationInfo",
                    "target": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390?format=vc",
                    "title": "Amtlicher DPP (Verifiable Credential)"
                }
            ],
            "custom_dpp_data": {
                "gtin": "04200000000001",
                "hsCode": "85076000",
                "category": "battery",
                "service_url": "",
                "svhc_exists": false,
                "batch_number": "BATCH-2026-A1",
                "repair_guide": "",
                "originCountry": "CN",
                "conformity_url": "https://v-ledger.com/compliance/doc",
                "manufacturer_gln": "4012345678901",
                "manufacturer_name": "V-Ledger Precision Labs",
                "manufacturingDate": "2026-04-26",
                "manufacturer_address": "Friedrichstraße 100, 10117 Berlin, Germany",
                "material_composition": {
                    "Kobalt": 30,
                    "Mangan": 20,
                    "Nickel": 40,
                    "Lithium": 10
                }
            },
            "history": [
                {
                    "id": 57,
                    "tokenId": "1328507507778448",
                    "action": "MINT",
                    "actor": "xhe***@gmail.com",
                    "locationName": "V-Ledger Factory",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": "{\"gtin\":\"04200000000001\"}",
                    "transactionHash": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "test",
                    "timestamp": "2026-05-01T01:02:28.000Z",
                    "createdAt": "2026-05-01T01:02:28.000Z",
                    "updatedAt": "2026-05-01T01:02:28.000Z"
                },
                {
                    "id": 58,
                    "tokenId": "1328507507778448",
                    "action": "QC_PASSED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Quality Control",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": "{\"demo\":true}",
                    "transactionHash": "0x9ec1aa2ec62a1fa632866b9c9f201f45bf3e1a0ed1a48ded8f528c67d07ac032",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:32.000Z",
                    "createdAt": "2026-05-03T22:48:32.000Z",
                    "updatedAt": "2026-05-03T22:48:32.000Z"
                },
                {
                    "id": 59,
                    "tokenId": "1328507507778448",
                    "action": "EXPORT_CLEARED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Export Port",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": "{\"demo\":true}",
                    "transactionHash": "0xca2dddf8fff0d26777a481f2891f8e4de301566d20e22f168ed16b490cc2518d",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:36.000Z",
                    "createdAt": "2026-05-03T22:48:36.000Z",
                    "updatedAt": "2026-05-03T22:48:36.000Z"
                },
                {
                    "id": 60,
                    "tokenId": "1328507507778448",
                    "action": "IMPORT_CLEARED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Import Hub",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": "{\"demo\":true}",
                    "transactionHash": "0x52e2535e36521d5f5a8944825c27ca39fc818adb24081cfc00263be20cc5e6d1",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:40.000Z",
                    "createdAt": "2026-05-03T22:48:40.000Z",
                    "updatedAt": "2026-05-03T22:48:40.000Z"
                },
                {
                    "id": 61,
                    "tokenId": "1328507507778448",
                    "action": "INITIAL_SALE",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Retail Arrival",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": "{\"demo\":true}",
                    "transactionHash": "0xb88e9a580eefaedb29bbf9f9f41d7dc85beb3408abe47f76adf5235337bdc254",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:44.000Z",
                    "createdAt": "2026-05-03T22:48:44.000Z",
                    "updatedAt": "2026-05-03T22:48:44.000Z"
                },
                {
                    "id": 62,
                    "tokenId": "1328507507778448",
                    "action": "AUTHORIZE_CLAIM",
                    "actor": "xhe***@gmail.com",
                    "locationName": "Brand Headquarters",
                    "latitude": 48.137,
                    "longitude": 11.575,
                    "metadata": "{\"authorizedAccount\":\"0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735\"}",
                    "transactionHash": "0xb79514247c0f79c53f7b6aecb1206f7d0b163ef86f026bf034544a9c74db939f",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:48.000Z",
                    "createdAt": "2026-05-03T22:48:48.000Z",
                    "updatedAt": "2026-05-03T22:48:48.000Z"
                },
                {
                    "id": 63,
                    "tokenId": "1328507507778448",
                    "action": "CLAIM_OWNERSHIP",
                    "actor": "xhe***@googlemail.com",
                    "locationName": "Consumer Wallet",
                    "latitude": 48.137,
                    "longitude": 11.575,
                    "metadata": "{\"newOwner\":\"0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735\"}",
                    "transactionHash": "0xeeddf81e342103675912f819cc10e5db8bc772440e94dbcc5a14ce718470eddb",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:52.000Z",
                    "createdAt": "2026-05-03T22:48:52.000Z",
                    "updatedAt": "2026-05-03T22:48:52.000Z"
                },
                {
                    "id": 64,
                    "tokenId": "1328507507778448",
                    "action": "RECYCLE_TRANSFER",
                    "actor": "int***@remondis-recycling.com",
                    "locationName": "Recycling Hub",
                    "latitude": 51.5,
                    "longitude": 7.4,
                    "metadata": "{\"from\":\"0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735\",\"to\":\"0xf01BAdDCAC6aacD04cBdf3Bf2aEDFb074c8C791b\"}",
                    "transactionHash": "0x581f1fcfd6a72c9da79b39c0aab5ffce848a1138f82b0106372fd9b01b98c317",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:56.000Z",
                    "createdAt": "2026-05-03T22:48:56.000Z",
                    "updatedAt": "2026-05-03T22:48:56.000Z"
                }
            ]
        },
        textile: {
            "@context": [
                "https://www.w3.org/ns/credentials/v2",
                "https://www.w3.org/ns/status/v1",
                "https://vocabulary.uncefact.org/untp/v1",
                {
                    "schema": "http://schema.org/",
                    "dpp": "https://ec.europa.eu/espr/dpp/v1#",
                    "idpp": "https://v-ledger.com/voc/",
                    "provenance": "idpp:provenance"
                }
            ],
            "id": "urn:dpp:gtin:04200000000001:serial:04B84542152390:v1",
            "type": [
                "VerifiableCredential",
                "DigitalProductPassport"
            ],
            "issuer": "did:web:dashboard.v-ledger.com",
            "validFrom": "2026-05-09T17:59:04.697Z",
            "credentialStatus": {
                "id": "https://api.v-ledger.com/credentials/status/1#04B84542152390",
                "type": "BitstringStatusListEntry",
                "statusPurpose": "revocation",
                "statusListIndex": "0",
                "statusListCredential": "https://api.v-ledger.com/credentials/status/1"
            },
            "credentialSubject": {
                "id": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
                "type": "Product",
                "dpp:upi": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
                "dpp:modelIdentifier": "04200000000001",
                "dpp:instanceIdentifier": "04B84542152390",
                "schema:name": "V-Ledger Demo Wool Coat",
                "dpp:hsCode": "62014000",
                "dpp:originCountry": "IT",
                "dpp:materialComposition": [
                    {
                        "type": "MaterialComponent",
                        "schema:name": "Schurwolle",
                        "dpp:percentage": 90
                    },
                    {
                        "type": "MaterialComponent",
                        "schema:name": "Kaschmir",
                        "dpp:percentage": 10
                    }
                ],
                "idpp:hardware": {
                    "chipType": "NXP NTAG 424 DNA",
                    "status": "AUTHENTIC",
                    "verificationCount": 5
                },
                "dpp:conformity": {
                    "type": "ConformityAssessment",
                    "dpp:complianceStatus": "compliant",
                    "dpp:declarationOfConformity": "https://v-ledger.com/compliance/doc"
                },
                "dpp:economicOperator": {
                    "type": "Manufacturer",
                    "schema:name": "V-Ledger Textile Labs",
                    "schema:address": "Via della Moda 50, Milan, Italy",
                    "idpp:gln": "4012345000002"
                },
                "provenance": [
                    {
                        "action": "MINT",
                        "location": "Milan Factory",
                        "actor": "did:vledger:actor:e8f18cc71a8cf19a",
                        "latitude": 45.464,
                        "longitude": 9.19,
                        "timestamp": "2026-05-02T10:00:00.000Z",
                        "tx": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422"
                    },
                    {
                        "action": "QC_PASSED",
                        "location": "Quality Assurance",
                        "actor": "did:vledger:actor:fbf60f75ed43d95e",
                        "latitude": 45.464,
                        "longitude": 9.19,
                        "timestamp": "2026-05-03T14:30:00.000Z",
                        "tx": "0x9ec1aa2ec62a1fa632866b9c9f201f45bf3e1a0ed1a48ded8f528c67d07ac032"
                    }
                ],
                "dpp:batchNumber": "BATCH-WOOL-2026",
                "dpp:emissionsScorecard": {
                    "type": "EmissionsData",
                    "dpp:carbonFootprint": {
                        "type": "Measurement",
                        "value": 0.8,
                        "unit": "KGM",
                        "metricName": "GHG emissions"
                    }
                },
                "dpp:circularityScorecard": {
                    "type": "CircularityData",
                    "dpp:recycledContent": {
                        "type": "Measurement",
                        "value": 100,
                        "unit": "P1"
                    },
                    "dpp:repairabilityScore": {
                        "type": "Measurement",
                        "value": 9.5,
                        "unit": "SCORE"
                    }
                }
            },
            "proof": {
                "type": "DataIntegrityProof",
                "cryptosuite": "eddsa-rdfc-2022",
                "created": "2026-05-09T17:59:04.697Z",
                "verificationMethod": "did:web:dashboard.v-ledger.com#key-1",
                "proofPurpose": "assertionMethod",
                "proofValue": "z5TSNbxh2fuLgWBgHQpTPXJCoa368kuXzr6ejBWQG3xdBGZnY1E2Av36Wv6PotVBBHDpSatoxFrMbyNfyFJLrGLbX"
            }
        },
        watch: {
            "id": "https://api.v-ledger.com/aas/01/04200000000001/21/04B84542152390",
            "idType": "IRI",
            "modelType": "AssetAdministrationShell",
            "assetInformation": {
                "assetKind": "Instance",
                "globalAssetId": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
                "specificAssetIds": [
                    {
                        "name": "GTIN",
                        "value": "04200000000001",
                        "semanticId": {
                            "type": "ExternalReference",
                            "keys": [
                                {
                                    "type": "GlobalReference",
                                    "value": "0173-1#02-BAA120#008"
                                }
                            ]
                        }
                    },
                    {
                        "name": "SerialNumber",
                        "value": "04B84542152390",
                        "semanticId": {
                            "type": "ExternalReference",
                            "keys": [
                                {
                                    "type": "GlobalReference",
                                    "value": "0173-1#02-AAO034#002"
                                }
                            ]
                        }
                    }
                ]
            },
            "submodels": [
                {
                    "idShort": "DigitalNameplate",
                    "id": "https://api.v-ledger.com/aas/submodels/nameplate/04B84542152390",
                    "modelType": "Submodel",
                    "semanticId": {
                        "type": "ExternalReference",
                        "keys": [
                            {
                                "type": "GlobalReference",
                                "value": "https://admin-shell.io/zvei/nameplate/2/0/Nameplate"
                            }
                        ]
                    },
                    "submodelElements": [
                        {
                            "idShort": "ManufacturerName",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "0173-1#02-AAO677#002"
                                    }
                                ]
                            },
                            "value": "V-Ledger Precision Labs"
                        },
                        {
                            "idShort": "SerialNumber",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "0173-1#02-AAO034#002"
                                    }
                                ]
                            },
                            "value": "04B84542152390"
                        },
                        {
                            "idShort": "BatteryModel",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "0173-1#02-BAA120#008"
                                    }
                                ]
                            },
                            "value": "BAT-LITHIUM-PRO-X"
                        }
                    ]
                },
                {
                    "idShort": "SustainabilityData",
                    "id": "https://api.v-ledger.com/aas/submodels/sustainability/04B84542152390",
                    "modelType": "Submodel",
                    "semanticId": {
                        "type": "ExternalReference",
                        "keys": [
                            {
                                "type": "GlobalReference",
                                "value": "https://admin-shell.io/idta/CarbonFootprint/1/0"
                            }
                        ]
                    },
                    "submodelElements": [
                        {
                            "idShort": "CarbonFootprint",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "0173-1#02-ADF012#001"
                                    }
                                ]
                            },
                            "value": "1.2 kg CO2e"
                        },
                        {
                            "idShort": "RecycledContent",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "0173-1#02-BAA489#005"
                                    }
                                ]
                            },
                            "value": "95%"
                        },
                        {
                            "idShort": "StateOfHealth",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "https://admin-shell.io/idta/BatteryPass/Submodel/02003-1-2/SoH"
                                    }
                                ]
                            },
                            "value": "100%"
                        }
                    ]
                },
                {
                    "idShort": "Security",
                    "id": "https://api.v-ledger.com/aas/submodels/security/04B84542152390",
                    "modelType": "Submodel",
                    "semanticId": {
                        "type": "ExternalReference",
                        "keys": [
                            {
                                "type": "GlobalReference",
                                "value": "https://v-ledger.com/aas/Security/1/0"
                            }
                        ]
                    },
                    "submodelElements": [
                        {
                            "idShort": "ChipType",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "https://v-ledger.com/semantic/ChipType"
                                    }
                                ]
                            },
                            "value": "NXP NTAG 424 DNA"
                        },
                        {
                            "idShort": "CryptographicStatus",
                            "modelType": "Property",
                            "valueType": "xs:string",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "https://v-ledger.com/semantic/CryptoStatus"
                                    }
                                ]
                            },
                            "value": "AUTHENTIC"
                        },
                        {
                            "idShort": "SunCounter",
                            "modelType": "Property",
                            "valueType": "xs:integer",
                            "semanticId": {
                                "type": "ExternalReference",
                                "keys": [
                                    {
                                        "type": "GlobalReference",
                                        "value": "https://v-ledger.com/semantic/SunCounter"
                                    }
                                ]
                            },
                            "value": 3
                        }
                    ]
                }
            ],
            "extensions": [
                {
                    "name": "eclassVersion",
                    "valueType": "xs:string",
                    "value": "12.0"
                }
            ]
        },
        lifecycle: {
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
                "material": "V-Ledger Demo Batterie",
                "warrantyExpiry": null,
                "metadataUrl": "ipfs://QmR8qpMFWqLrdn8N3nNAxR7RR1yGfzvAS5tJBFtomtag1Q",
                "sapMaterialId": null,
                "sapSerial": null,
                "sapOrderId": null,
                "vledgerUid": "2b130671-a603-4037-ab2b-4ea0ed56ed3d",
                "parentUid": null,
                "transactionHash": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422",
                "mintBlock": 40914530,
                "mintTimestamp": "2026-05-01T01:02:27.000Z",
                "lockedDeposit": "1.62",
                "metadataCache": {
                    "name": "V-Ledger Demo Batterie",
                    "image": "ipfs://QmazCNumbt2RCVWMALkcxcSSpdHexTxJjtNG1z7PUeXPmZ",
                    "chipUid": "04B84542152390",
                    "nfcData": {
                        "cmac": "AFEAEBC91A841FFAnc=XXtest",
                        "urlPath": "https://dashboard.v-ledger.com/verify/01/04200000000001/21/04B84542152390",
                        "piccData": "93D47B697065490EF296ABEBCD9BFB22"
                    },
                    "attributes": [
                        {
                            "value": 2026,
                            "trait_type": "Herstellungsjahr",
                            "display_type": "number"
                        },
                        {
                            "value": "Batterie Fabrik China (Shenzhen, CN)",
                            "trait_type": "Herkunft"
                        },
                        {
                            "value": "BATTERY",
                            "trait_type": "Kategorie"
                        },
                        {
                            "value": "1.2 kg CO2e",
                            "trait_type": "CO2-Fußabdruck"
                        },
                        {
                            "value": "CERT-04B84542152390",
                            "trait_type": "Echtheits-ID"
                        },
                        {
                            "value": "V-Ledger Precision Labs",
                            "trait_type": "Hersteller"
                        },
                        {
                            "value": "BATCH-2026-A1",
                            "trait_type": "Charge"
                        },
                        {
                            "value": "Konform",
                            "trait_type": "REACH Konformität"
                        },
                        {
                            "value": "85 kWh",
                            "trait_type": "Kapazität"
                        },
                        {
                            "value": "NMC (Nickel-Mangan-Kobalt)",
                            "trait_type": "Chemie"
                        }
                    ],
                    "description": "V-Ledger Demo Batterie",
                    "external_url": "",
                    "custom_dpp_data": {
                        "gtin": "04200000000001",
                        "hsCode": "85076000",
                        "category": "battery",
                        "service_url": "",
                        "svhc_exists": false,
                        "batch_number": "BATCH-2026-A1",
                        "repair_guide": "",
                        "originCountry": "CN",
                        "conformity_url": "https://v-ledger.com/compliance/doc",
                        "manufacturer_gln": "4012345678901",
                        "manufacturer_name": "V-Ledger Precision Labs",
                        "manufacturingDate": "2026-04-26",
                        "manufacturer_address": "Friedrichstraße 100, 10117 Berlin, Germany",
                        "material_composition": {
                            "Kobalt": 30,
                            "Mangan": 20,
                            "Nickel": 40,
                            "Lithium": 10
                        }
                    }
                },
                "contractAddress": "0x6e3e71841bda1b4a82ef86a961842f3e89928752",
                "environment": "test",
                "status": "ACTIVE",
                "createdAt": "2026-05-01T01:02:27.000Z",
                "updatedAt": "2026-05-01T01:02:28.000Z"
            },
            "chainOfCustody": {
                "totalEvents": 8,
                "firstSeen": "2026-05-01T01:02:28.000Z",
                "lastSeen": "2026-05-03T22:48:56.000Z",
                "integrityHash": "304a2b32099904ee1ea8fb9be273bf0f9e872e5aad52669d275150186e83c274"
            },
            "events": [
                {
                    "id": 57,
                    "tokenId": "1328507507778448",
                    "action": "MINT",
                    "actor": "xhe***@gmail.com",
                    "locationName": "V-Ledger Factory",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": {
                        "gtin": "04200000000001"
                    },
                    "transactionHash": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "test",
                    "timestamp": "2026-05-01T01:02:28.000Z",
                    "createdAt": "2026-05-01T01:02:28.000Z",
                    "updatedAt": "2026-05-01T01:02:28.000Z",
                    "actorEmail": "xhe***@gmail.com"
                },
                {
                    "id": 58,
                    "tokenId": "1328507507778448",
                    "action": "QC_PASSED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Quality Control",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": {},
                    "transactionHash": "0x9ec1aa2ec62a1fa632866b9c9f201f45bf3e1a0ed1a48ded8f528c67d07ac032",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:32.000Z",
                    "createdAt": "2026-05-03T22:48:32.000Z",
                    "updatedAt": "2026-05-03T22:48:32.000Z",
                    "actorEmail": "fac***@shenzhen-assembly.com"
                },
                {
                    "id": 59,
                    "tokenId": "1328507507778448",
                    "action": "EXPORT_CLEARED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Export Port",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": {},
                    "transactionHash": "0xca2dddf8fff0d26777a481f2891f8e4de301566d20e22f168ed16b490cc2518d",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:36.000Z",
                    "createdAt": "2026-05-03T22:48:36.000Z",
                    "updatedAt": "2026-05-03T22:48:36.000Z",
                    "actorEmail": "fac***@shenzhen-assembly.com"
                },
                {
                    "id": 60,
                    "tokenId": "1328507507778448",
                    "action": "IMPORT_CLEARED",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Import Hub",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": {},
                    "transactionHash": "0x52e2535e36521d5f5a8944825c27ca39fc818adb24081cfc00263be20cc5e6d1",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:40.000Z",
                    "createdAt": "2026-05-03T22:48:40.000Z",
                    "updatedAt": "2026-05-03T22:48:40.000Z",
                    "actorEmail": "fac***@shenzhen-assembly.com"
                },
                {
                    "id": 61,
                    "tokenId": "1328507507778448",
                    "action": "INITIAL_SALE",
                    "actor": "fac***@shenzhen-assembly.com",
                    "locationName": "Retail Arrival",
                    "latitude": 0,
                    "longitude": 0,
                    "metadata": {},
                    "transactionHash": "0xb88e9a580eefaedb29bbf9f9f41d7dc85beb3408abe47f76adf5235337bdc254",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:44.000Z",
                    "createdAt": "2026-05-03T22:48:44.000Z",
                    "updatedAt": "2026-05-03T22:48:44.000Z",
                    "actorEmail": "fac***@shenzhen-assembly.com"
                },
                {
                    "id": 62,
                    "tokenId": "1328507507778448",
                    "action": "AUTHORIZE_CLAIM",
                    "actor": "xhe***@gmail.com",
                    "locationName": "Brand Headquarters",
                    "latitude": 48.137,
                    "longitude": 11.575,
                    "metadata": {
                        "authorizedAccount": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735"
                    },
                    "transactionHash": "0xb79514247c0f79c53f7b6aecb1206f7d0b163ef86f026bf034544a9c74db939f",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:48.000Z",
                    "createdAt": "2026-05-03T22:48:48.000Z",
                    "updatedAt": "2026-05-03T22:48:48.000Z",
                    "actorEmail": "xhe***@gmail.com"
                },
                {
                    "id": 63,
                    "tokenId": "1328507507778448",
                    "action": "CLAIM_OWNERSHIP",
                    "actor": "xhe***@googlemail.com",
                    "locationName": "Consumer Wallet",
                    "latitude": 48.137,
                    "longitude": 11.575,
                    "metadata": {
                        "newOwner": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735"
                    },
                    "transactionHash": "0xeeddf81e342103675912f819cc10e5db8bc772440e94dbcc5a14ce718470eddb",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:52.000Z",
                    "createdAt": "2026-05-03T22:48:52.000Z",
                    "updatedAt": "2026-05-03T22:48:52.000Z",
                    "actorEmail": "xhe***@googlemail.com"
                },
                {
                    "id": 64,
                    "tokenId": "1328507507778448",
                    "action": "RECYCLE_TRANSFER",
                    "actor": "int***@remondis-recycling.com",
                    "locationName": "Recycling Hub",
                    "latitude": 51.5,
                    "longitude": 7.4,
                    "metadata": {
                        "from": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735",
                        "to": "0xf01BAdDCAC6aacD04cBdf3Bf2aEDFb074c8C791b"
                    },
                    "transactionHash": "0x581f1fcfd6a72c9da79b39c0aab5ffce848a1138f82b0106372fd9b01b98c317",
                    "blockNumber": null,
                    "contractAddress": null,
                    "environment": "live",
                    "timestamp": "2026-05-03T22:48:56.000Z",
                    "createdAt": "2026-05-03T22:48:56.000Z",
                    "updatedAt": "2026-05-03T22:48:56.000Z",
                }
            ],
            "hardware": {
                "chipUid": "04B84542152390",
                "chipType": "NXP NTAG 424 DNA",
                "status": "AUTHENTIC",
                "verified": true,
                "counter": 3
            }
        },
        customs: {
            "@context": [
                "https://www.w3.org/ns/credentials/v2",
                "https://www.w3.org/ns/status/v1",
                "https://vocabulary.uncefact.org/untp/v1",
                {
                    "schema": "http://schema.org/",
                    "dpp": "https://ec.europa.eu/espr/dpp/v1#",
                    "idpp": "https://v-ledger.com/voc/",
                    "provenance": "idpp:provenance"
                }
            ],
            "id": "urn:dpp:gtin:04200000000001:serial:04B84542152390:customs-v1",
            "type": [
                "VerifiableCredential",
                "CustomsDeclarationCredential"
            ],
            "issuer": "did:web:dashboard.v-ledger.com",
            "validFrom": "2026-05-09T17:59:04.697Z",
            "credentialStatus": {
                "id": "https://api.v-ledger.com/credentials/status/1#04B84542152390",
                "type": "BitstringStatusListEntry",
                "statusPurpose": "revocation",
                "statusListIndex": "0",
                "statusListCredential": "https://api.v-ledger.com/credentials/status/1"
            },
            "credentialSubject": {
                "id": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
                "type": "Product",
                "dpp:upi": "https://api.v-ledger.com/01/04200000000001/21/04B84542152390",
                "dpp:modelIdentifier": "04200000000001",
                "dpp:instanceIdentifier": "04B84542152390",
                "schema:name": "V-Ledger Demo Batterie (Industrial-Grade)",
                "dpp:hsCode": "85076000",
                "dpp:originCountry": "CN",
                "dpp:materialComposition": [
                    {
                        "type": "MaterialComponent",
                        "schema:name": "Nickel",
                        "dpp:percentage": 40
                    },
                    {
                        "type": "MaterialComponent",
                        "schema:name": "Kobalt",
                        "dpp:percentage": 30
                    }
                ],
                "idpp:hardware": {
                    "chipType": "NXP NTAG 424 DNA",
                    "status": "AUTHENTIC",
                    "verificationCount": 3
                },
                "dpp:conformity": {
                    "type": "ConformityAssessment",
                    "dpp:complianceStatus": "compliant",
                    "dpp:declarationOfConformity": "https://v-ledger.com/compliance/doc"
                },
                "dpp:economicOperator": {
                    "type": "Exporter",
                    "schema:name": "V-Ledger Precision Labs",
                    "schema:address": "Friedrichstraße 100, 10117 Berlin, Germany",
                    "idpp:gln": "4012345678901"
                },
                "provenance": [
                    {
                        "action": "MINT",
                        "location": "V-Ledger Factory",
                        "actor": "did:vledger:actor:e8f18cc71a8cf19a",
                        "latitude": 22.543,
                        "longitude": 114.057,
                        "timestamp": "2026-05-01T01:02:28.000Z",
                        "tx": "0x784496e3199dbbc68696a217d1c41e1bb60c4ddf79313e0af249af51a9f16422"
                    },
                    {
                        "action": "QC_PASSED",
                        "location": "Quality Control",
                        "actor": "did:vledger:actor:fbf60f75ed43d95e",
                        "latitude": 22.543,
                        "longitude": 114.057,
                        "timestamp": "2026-05-03T22:48:32.000Z",
                        "tx": "0x9ec1aa2ec62a1fa632866b9c9f201f45bf3e1a0ed1a48ded8f528c67d07ac032"
                    }
                ],
                "dpp:batchNumber": "BATCH-2026-A1",
                "dpp:emissionsScorecard": {
                    "type": "EmissionsData",
                    "dpp:carbonFootprint": {
                        "type": "Measurement",
                        "value": 1.2,
                        "unit": "KGM",
                        "metricName": "GHG emissions"
                    }
                },
                "dpp:circularityScorecard": {
                    "type": "CircularityData",
                    "dpp:recycledContent": {
                        "type": "Measurement",
                        "value": 95,
                        "unit": "P1"
                    }
                }
            },
            "proof": {
                "type": "DataIntegrityProof",
                "cryptosuite": "eddsa-rdfc-2022",
                "created": "2026-05-09T17:59:04.697Z",
                "verificationMethod": "did:web:dashboard.v-ledger.com#key-1",
                "proofPurpose": "assertionMethod",
                "proofValue": "z5TSNbxh2fuLgWBgHQpTPXJCoa368kuXzr6ejBWQG3xdBGZnY1E2Av36Wv6PotVBBHDpSatoxFrMbyNfyFJLrGLbX"
            }
        },
        resell: {
            "transaction": {
                "id": "TX-928507507778",
                "type": "ON_CHAIN_SECONDARY_RESALE",
                "tokenId": "1328507507778448",
                "chipUid": "04B84542152390",
                "status": "COMPLETED",
                "blockchain": "Base Layer-2",
                "contractAddress": "0x6e3e71841bda1b4a82ef86a961842f3e89928752",
                "transactionHash": "0xeeddf81e342103675912f819cc10e5db8bc772440e94dbcc5a14ce718470eddb",
                "timestamp": "2026-05-09T20:09:56.000Z"
            },
            "ownership": {
                "previousOwner": "0x24954DA952B9590d7726DEDd1C1ccD4bB130F9b8",
                "newOwner": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735",
                "verificationMethod": "NFC Secure Authenticated Claim"
            },
            "paymentDetails": {
                "provider": "Stripe Escrow Connect",
                "currency": "EUR",
                "amount": 100.00,
                "splitRouting": {
                    "sellerPayout": {
                        "percentage": "94.0%",
                        "amount": 94.00,
                        "destinationWallet": "0x24954DA952B9590d7726DEDd1C1ccD4bB130F9b8"
                    },
                    "brandRoyalty": {
                        "percentage": "5.0%",
                        "amount": 5.00,
                        "destinationWallet": "0x6e3e71841bda1b4a82ef86a961842f3e89928752"
                    },
                    "platformSystemFee": {
                        "percentage": "1.0%",
                        "amount": 1.00,
                        "destinationWallet": "0x1111111111111111111111111111111111111111"
                    }
                }
            }
        },
        recycling: {
            "circularEconomy": {
                "id": "REC-829038592019",
                "type": "PFAND_DEPOSIT_REFUND_RECEIPT",
                "tokenId": "1328507507778448",
                "chipUid": "04B84542152390",
                "status": "REFUNDED",
                "materialRecoveryRate": "95.4%",
                "recoveredMaterials": [
                    { "name": "Lithium-Carbonate", "weightKg": 4.2, "purity": "99.8%" },
                    { "name": "Cobalt-Sulfate", "weightKg": 3.1, "purity": "99.4%" },
                    { "name": "Nickel-Sulfate", "weightKg": 8.5, "purity": "99.7%" }
                ],
                "co2SavedKg": 412.5,
                "timestamp": "2026-05-09T20:13:50.000Z"
            },
            "depositEscrow": {
                "initialPfandLocked": 100.00,
                "currency": "EUR",
                "releasingContract": "0x581f1fcfd6a72c9da79b39c0aab5ffce848a1138f82b0106372fd9b01b98c317",
                "destinationConsumerWallet": "0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735",
                "gaslessRelayerReward": 5.00
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
                else if (btn.id === 'demo-prod-lifecycle') activeProduct = 'lifecycle';
                else if (btn.id === 'demo-prod-customs') activeProduct = 'customs';
                else if (btn.id === 'demo-prod-resell') activeProduct = 'resell';
                else if (btn.id === 'demo-prod-recycling') activeProduct = 'recycling';

                demoTerminalLog.innerHTML = `<span class="text-white/40">Product category switched to ${activeProduct.toUpperCase()}. Ready for cryptographic NFC scan.</span>`;
            });
        });

        // Scan button click handler
        demoScanBtn.addEventListener('click', () => {
            demoTerminalLog.innerHTML = '';
            
            if (activeProduct === 'lifecycle') {
                const stepLogs = [
                    { text: `> INITIALIZING SECURE CRADLE-TO-CRADLE E2E LEDGER INQUIRY...`, delay: 0, color: '#a88c5a' },
                    { text: `> SCANNING CHIP UID: 04E22857416210 WITH SUN SIGNATURE... PASSED`, delay: 400, color: '#ffffff' },
                    { text: `> FETCHING COMPLETE LIFECYCLE HISTORY FROM BASE LAYER-2 LEDGER...`, delay: 800, color: '#ffffff' },
                    { text: `\n=== STARTING ON-CHAIN LIFECYCLE SIMULATION (10 PHASES) ===`, delay: 1200, color: '#a88c5a' },
                    { text: `[1/10] RAW_MATERIAL_MINING -> PRIMARY MINING OPERATOR (Katanga Mining Hub)\n       Status: COMPLIANT | ESG Verification Hash: 0x9a8f...`, delay: 1600, color: '#e0cfb3' },
                    { text: `[2/10] REFINED_MATERIAL_BATCH -> ADVANCED REFINERY HUB (Harjavalta Refinery)\n       Status: VERIFIED | Cathode Material Grade-A Cert: Issued`, delay: 2200, color: '#e0cfb3' },
                    { text: `[3/10] CELL_MANUFACTURING -> GIGAFACTORY CELL PRODUCTION (Ett Skellefteå Plant)\n       Status: VERIFIED | Attached Cryptographic NXP Identity`, delay: 2800, color: '#e0cfb3' },
                    { text: `[4/10] PACK_ASSEMBLY -> TIER-1 VEHICLE ASSEMBLY (Dingolfing Plant)\n       Status: QC_PASSED | On-Chain Battery Passport Minted`, delay: 3400, color: '#e0cfb3' },
                    { text: `[5/10] CUSTOMS_GATEWAY_EXPORT -> GLOBAL PORT LOGISTICS (Port of Gothenburg)\n       Status: CLEARED | EU Border Transit Pre-Approved`, delay: 4000, color: '#e0cfb3' },
                    { text: `[6/10] CUSTOMS_GATEWAY_IMPORT -> CUSTOMS GERMANY (Port of Duisburg)\n       Status: CLEARED | Verification Key Decrypted & Verified`, delay: 4600, color: '#e0cfb3' },
                    { text: `[7/10] VEHICLE_INTEGRATION_SALE -> RETAIL DELIVERY HUB (Munich Showroom)\n       Status: ACTIVE_DRIVE | Owner Wallet Set to Consumer DID`, delay: 5200, color: '#e0cfb3' },
                    { text: `[8/10] SECOND_LIFE_STATIONARY -> STATIONARY GRID STORAGE (Essen Storage Hub)\n       Status: PURPOSED | Battery Re-assigned to Grid Storage`, delay: 5800, color: '#e0cfb3' },
                    { text: `[9/10] CIRCULAR_RECYCLING -> CERTIFIED RECYCLING FACILITY (Duisburg Center)\n       Status: DEPOSIT_RELEASED | On-Chain 100 EUR Deposit Reclaimed`, delay: 6400, color: '#e0cfb3' },
                    { text: `[10/10] RE-ENTRY_RAW_POWDER -> CLOSED-LOOP RECOVERY LABS (Schwarzheide Plant)\n        Status: COMPLETED_CRADLE | Zero-Waste Loop Back to Step 1`, delay: 7000, color: '#22c55e' },
                    { text: `\n> SUCCESS! ALL 10 BLOCKCHAIN COMPLIANCE EVENTS VERIFIED END-TO-END.`, delay: 7600, color: '#22c55e' }
                ];

                stepLogs.forEach(log => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.style.color = log.color;
                        line.style.whiteSpace = 'pre-wrap';
                        line.innerText = log.text;
                        demoTerminalLog.appendChild(line);
                        demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                    }, log.delay);
                });

                // Print formatted JSON & Append Conversion Hook
                setTimeout(() => {
                    const jsonBlock = document.createElement('pre');
                    jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-4 rounded-2xl border border-white/5 overflow-x-auto select-all font-mono';
                    jsonBlock.style.fontSize = '8px';
                    jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                    demoTerminalLog.appendChild(jsonBlock);
                    
                    // Create Action Hook Button
                    const hookBtn = document.createElement('button');
                    hookBtn.type = 'button';
                    hookBtn.className = 'w-full mt-4 bg-gradient-to-r from-[#a88c5a] to-[#c7aa74] hover:from-[#bfa573] hover:to-[#dec495] text-black font-extrabold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(168,140,90,0.3)] animate-pulse flex items-center justify-center gap-2';
                    hookBtn.innerHTML = '<span>Request Strategic Pilot Integration for this Flow</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    hookBtn.addEventListener('click', () => {
                        const contactModal = document.getElementById('contact-modal');
                        const leadTextarea = document.querySelector('textarea[name="message"]');
                        if (contactModal && leadTextarea) {
                            leadTextarea.value = 'I am highly interested in launching a strategic pilot project based on the End-to-End Lifecycle flow simulation. Please contact me with more information regarding the compliance scope.';
                            contactModal.classList.remove('hidden');
                        }
                    });
                    demoTerminalLog.appendChild(hookBtn);
                    
                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, 8000);
            } else if (activeProduct === 'customs') {
                const stepLogs = [
                    { text: `> INITIALIZING UNTP COMPLIANCE TRANSIT INQUIRY...`, delay: 0, color: '#a88c5a' },
                    { text: `> NFC SCAN TRIGGERED: EXTRACTING CHIP SIGNATURE... PASSED`, delay: 400, color: '#ffffff' },
                    { text: `> DECRYPTING VERIFIABLE CREDENTIAL PAYLOAD VIA W3C STANDARDS...`, delay: 800, color: '#ffffff' },
                    { text: `> RETRIEVING DECENTRALIZED IDENTITY DOC: did:web:dashboard.v-ledger.com... SUCCESS`, delay: 1200, color: '#ffffff' },
                    { text: `> VALIDATING DATA INTEGRITY PROOF (eddsa-rdfc-2022)... VALID`, delay: 1600, color: '#22c55e' },
                    { text: `> CHECKING BITSTRING STATUS LIST INDEX 0 FOR REVOCATION... NOT REVOKED`, delay: 2000, color: '#22c55e' },
                    { text: `> EVALUATING CONFORMITY STATUS: compliant`, delay: 2400, color: '#22c55e' },
                    { text: `> CROSS-CHECKING HS-CODE: 85076000 (LI-ION BATTERY) WITH ORIGIN: CN`, delay: 2800, color: '#e0cfb3' },
                    { text: `> BORDER TRANSIT CLEARED. GENERATING UNTP VERIFIABLE CREDENTIAL FOR CUSTOMS...`, delay: 3200, color: '#22c55e' }
                ];

                stepLogs.forEach(log => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.style.color = log.color;
                        line.style.whiteSpace = 'pre-wrap';
                        line.innerText = log.text;
                        demoTerminalLog.appendChild(line);
                        demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                    }, log.delay);
                });

                // Print formatted JSON & Append Conversion Hook
                setTimeout(() => {
                    const jsonBlock = document.createElement('pre');
                    jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-4 rounded-2xl border border-white/5 overflow-x-auto select-all font-mono';
                    jsonBlock.style.fontSize = '8px';
                    jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                    demoTerminalLog.appendChild(jsonBlock);
                    
                    // Create Action Hook Button
                    const hookBtn = document.createElement('button');
                    hookBtn.type = 'button';
                    hookBtn.className = 'w-full mt-4 bg-gradient-to-r from-[#a88c5a] to-[#c7aa74] hover:from-[#bfa573] hover:to-[#dec495] text-black font-extrabold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(168,140,90,0.3)] animate-pulse flex items-center justify-center gap-2';
                    hookBtn.innerHTML = '<span>Request Customs Pilot Integration</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    hookBtn.addEventListener('click', () => {
                        const contactModal = document.getElementById('contact-modal');
                        const leadTextarea = document.querySelector('textarea[name="message"]');
                        if (contactModal && leadTextarea) {
                            leadTextarea.value = 'I am highly interested in launching a strategic pilot project based on the UNTP Customs Verification flow simulation. Please contact me with more information regarding the border transit compliance scope.';
                            contactModal.classList.remove('hidden');
                        }
                    });
                    demoTerminalLog.appendChild(hookBtn);
                    
                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, 3800);
            } else if (activeProduct === 'resell') {
                const stepLogs = [
                    { text: `> DETECTING PENDING RE-SELL ON-CHAIN FOR TOKENID: 1328507507778448...`, delay: 0, color: '#a88c5a' },
                    { text: `> NFC SCAN TRIGGERED: SCANNING CHIP UID: 04B84542152390 SECURE ANCHOR... PASSED`, delay: 400, color: '#ffffff' },
                    { text: `> EXTRACTING PICCDATA CRYPTOGRAPHIC CMAC SIGNATURE... MATCHED`, delay: 800, color: '#22c55e' },
                    { text: `> INITIATING SECURE ESCROW DISPATCH PROTOCOL ON BASE L2...`, delay: 1200, color: '#ffffff' },
                    { text: `> PROCESSING STRIPE ESCROW SECONDARY MARKET PAYMENT ROUTING...`, delay: 1600, color: '#a88c5a' },
                    { text: `  * TRANSACTION AMOUNT: €100.00 EUR`, delay: 1800, color: '#e0cfb3' },
                    { text: `  * 94.0% SELLER RETENTION ROUTED: €94.00 EUR TO PREVIOUS OWNER WALLET (0x2495...)`, delay: 2000, color: '#e0cfb3' },
                    { text: `  * 5.0% AUTOMATED BRAND ROYALTY ROUTED: €5.00 EUR TO BRAND POOL CONTRACT (0x6e3e...)`, delay: 2200, color: '#e0cfb3' },
                    { text: `  * 1.0% PLATFORM SYSTEM FEE ROUTED: €1.00 EUR TO FEE TREASURY (0x1111...)`, delay: 2400, color: '#e0cfb3' },
                    { text: `> PAYMENT IN EUR CLEARED THROUGH STRIPE ESCROW CONNECT... SUCCESS`, delay: 2800, color: '#22c55e' },
                    { text: `> RETRIEVING PURCHASER SMART ACCOUNT DECENTRALIZED IDENTITY... SUCCESS`, delay: 3200, color: '#ffffff' },
                    { text: `> CALLING claimOwnership ON-CHAIN VIA RELAYER (GASLESS ERC-4337)... COMPLETED`, delay: 3600, color: '#22c55e' },
                    { text: `> TRANSACTION CONFIRMED (TX HASH: 0xeeddf81e...)... SUCCESS`, delay: 4000, color: '#22c55e' },
                    { text: `> SUCCESS! OWNERSHIP OFFICIALLY TRANSFERRED TO: 0x8b4FeAb0aaA199724e57A4b01d9aFa66dA9C1735`, delay: 4400, color: '#22c55e' }
                ];

                stepLogs.forEach(log => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.style.color = log.color;
                        line.style.whiteSpace = 'pre-wrap';
                        line.innerText = log.text;
                        demoTerminalLog.appendChild(line);
                        demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                    }, log.delay);
                });

                // Print formatted JSON & Append Conversion Hook
                setTimeout(() => {
                    const jsonBlock = document.createElement('pre');
                    jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-4 rounded-2xl border border-white/5 overflow-x-auto select-all font-mono';
                    jsonBlock.style.fontSize = '8px';
                    jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                    demoTerminalLog.appendChild(jsonBlock);
                    
                    // Create Action Hook Button
                    const hookBtn = document.createElement('button');
                    hookBtn.type = 'button';
                    hookBtn.className = 'w-full mt-4 bg-gradient-to-r from-[#a88c5a] to-[#c7aa74] hover:from-[#bfa573] hover:to-[#dec495] text-black font-extrabold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(168,140,90,0.3)] animate-pulse flex items-center justify-center gap-2';
                    hookBtn.innerHTML = '<span>Request Resell Escrow Integration</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    hookBtn.addEventListener('click', () => {
                        const contactModal = document.getElementById('contact-modal');
                        const leadTextarea = document.querySelector('textarea[name="message"]');
                        if (contactModal && leadTextarea) {
                            leadTextarea.value = 'I am highly interested in launching a strategic pilot project based on the Ownership Resell & Royalty payment flow simulation. Please contact me with more information regarding secondary market integration.';
                            contactModal.classList.remove('hidden');
                        }
                    });
                    demoTerminalLog.appendChild(hookBtn);
                    
                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, 5000);
            } else if (activeProduct === 'recycling') {
                const stepLogs = [
                    { text: `> DETECTING RECYCLING DEPOSIT INQUIRY FOR TOKENID: 1328507507778448...`, delay: 0, color: '#a88c5a' },
                    { text: `> NFC SCAN TRIGGERED: SCANNING CHIP UID: 04B84542152390 SECURE ANCHOR... PASSED`, delay: 400, color: '#ffffff' },
                    { text: `> VERIFYING HARDWARE INTEGRITY & CMAC AUTHENTICATION COUNTER... PASSED (Counter: 3)`, delay: 800, color: '#22c55e' },
                    { text: `> RETRIEVING DEPLOYED PFAND-ESCROW CONTRACT ADDRESS ON BASE L2...`, delay: 1200, color: '#ffffff' },
                    { text: `> AUDITING CERTIFIED MATERIAL RECOVERY VALUE IN CLOSED LOOP...`, delay: 1600, color: '#e0cfb3' },
                    { text: `  * RECOVERABLE LITHIUM-CARBONATE PURITY: 99.8% (95.4% TOTAL RECOVERY VALUE)`, delay: 1800, color: '#e0cfb3' },
                    { text: `  * CO2 EMISSIONS RECLAIMED: 412.5 KG SAVED`, delay: 2000, color: '#e0cfb3' },
                    { text: `> PFAND-ESCROW AUDIT COMPLETED successfully.`, delay: 2400, color: '#22c55e' },
                    { text: `> RELEASING LOCKED ON-CHAIN PFAND-DEPOSIT...`, delay: 2800, color: '#a88c5a' },
                    { text: `  * €100.00 EUR REFUND ROUTED TO CONSUMER WALLET (0x8b4F...) THROUGH STRIPE CONNECT`, delay: 3000, color: '#22c55e' },
                    { text: `  * €5.00 EUR RELAYER INCENTIVE AWARDED TO REGISTERED RECYCLER HUB (0x581f...)`, delay: 3200, color: '#22c55e' },
                    { text: `> DEPOSIT REFUND CONFIRMED ON-CHAIN (TX HASH: 0x581f1fcf...)`, delay: 3600, color: '#22c55e' },
                    { text: `> UPDATING DPP STATE TO: RECYCLED_COMPLETED (Closed-Loop Cradle-to-Cradle)`, delay: 4000, color: '#22c55e' }
                ];

                stepLogs.forEach(log => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.style.color = log.color;
                        line.style.whiteSpace = 'pre-wrap';
                        line.innerText = log.text;
                        demoTerminalLog.appendChild(line);
                        demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                    }, log.delay);
                });

                // Print formatted JSON & Append Conversion Hook
                setTimeout(() => {
                    const jsonBlock = document.createElement('pre');
                    jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-4 rounded-2xl border border-white/5 overflow-x-auto select-all font-mono';
                    jsonBlock.style.fontSize = '8px';
                    jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                    demoTerminalLog.appendChild(jsonBlock);
                    
                    // Create Action Hook Button
                    const hookBtn = document.createElement('button');
                    hookBtn.type = 'button';
                    hookBtn.className = 'w-full mt-4 bg-gradient-to-r from-[#a88c5a] to-[#c7aa74] hover:from-[#bfa573] hover:to-[#dec495] text-black font-extrabold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(168,140,90,0.3)] animate-pulse flex items-center justify-center gap-2';
                    hookBtn.innerHTML = '<span>Request Circular Economy Pilot</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    hookBtn.addEventListener('click', () => {
                        const contactModal = document.getElementById('contact-modal');
                        const leadTextarea = document.querySelector('textarea[name="message"]');
                        if (contactModal && leadTextarea) {
                            leadTextarea.value = 'I am highly interested in launching a strategic pilot project based on the Circular Economy Recycling & Pfand-deposit refund flow simulation. Please contact me with more information regarding closed-loop integration.';
                            contactModal.classList.remove('hidden');
                        }
                    });
                    demoTerminalLog.appendChild(hookBtn);
                    
                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, 4600);
            } else {
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

                // Print formatted JSON & Append Conversion Hook
                setTimeout(() => {
                    const jsonBlock = document.createElement('pre');
                    jsonBlock.className = 'text-[#e0cfb3] mt-2 bg-black/40 p-4 rounded-2xl border border-white/5 overflow-x-auto select-all font-mono';
                    jsonBlock.style.fontSize = '8px';
                    jsonBlock.innerText = JSON.stringify(dppPayloads[activeProduct], null, 2);
                    demoTerminalLog.appendChild(jsonBlock);

                    // Create Action Hook Button
                    const hookBtn = document.createElement('button');
                    hookBtn.type = 'button';
                    hookBtn.className = 'w-full mt-4 bg-gradient-to-r from-[#a88c5a] to-[#c7aa74] hover:from-[#bfa573] hover:to-[#dec495] text-black font-extrabold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(168,140,90,0.3)] animate-pulse flex items-center justify-center gap-2';
                    hookBtn.innerHTML = `<span>Request Pilot Integration for ${activeProduct.toUpperCase()}</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                    hookBtn.addEventListener('click', () => {
                        const contactModal = document.getElementById('contact-modal');
                        const leadTextarea = document.querySelector('textarea[name="message"]');
                        if (contactModal && leadTextarea) {
                            leadTextarea.value = `I am highly interested in launching a strategic pilot project based on the ${activeProduct.toUpperCase()} flow simulation. Please contact me with more information regarding the compliance scope.`;
                            contactModal.classList.remove('hidden');
                        }
                    });
                    demoTerminalLog.appendChild(hookBtn);

                    demoTerminalLog.scrollTop = demoTerminalLog.scrollHeight;
                }, 3000);
            }
        });
    }
});
