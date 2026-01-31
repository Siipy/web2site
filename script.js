// Video Hover Player Variables
let hoverPlayer;
let hoverPlayerContainer;
let hoverTimeout;
// If you want to send directly from the browser, put your webhook here.
// WARNING: exposing the webhook in client-side code allows anyone to use it.
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1444689979015168050/_2Gvzu5AhHNxOJmnGqySUsW_CYm5x0SshnHOUvJmxl1XRpD1YZbFb-U5ocTZTp2bCCjl';

// Internationalization
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.gallery': 'Gallery',
        'nav.drone': 'Drone',
        'nav.contact': 'Contact',
        'hero.subtitle': 'PHOTOGRAPHER • FILMMAKER • DRONE PILOT',
        'gallery.title': 'Featured Work',
        'gallery.all': 'All',
        'gallery.photo': 'Photography',
        'gallery.video': 'Videography',
        'drone.title': 'AERIAL PERSPECTIVES',
        'drone.subtitle': 'Elevating visual storytelling through drone cinematography',
        'contact.heading': 'Questions?',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Your Project Details',
        'contact.submit': 'Send Message'
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.gallery': 'Galerie',
        'nav.drone': 'Drone',
        'nav.contact': 'Contact',
        'hero.subtitle': 'PHOTOGRAPHE • CINÉASTE • PILOTE DE DRONE',
        'gallery.title': 'Travaux récents',
        'gallery.all': 'Tous',
        'gallery.photo': 'Photographie',
        'gallery.video': 'Vidéographie',
        'drone.title': 'PERSPECTIVES AÉRIENNES',
        'drone.subtitle': 'Élevez la narration visuelle grâce à la cinématographie par drone',
        'contact.heading': 'Besoin de plus d\'info ?',
        'contact.name': 'Nom',
        'contact.email': 'Email',
        'contact.message': 'Détails du Projet',
        'contact.submit': 'Envoyer le Message'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update language toggle button text
    const toggle = document.querySelector('#lang-toggle');
    if (toggle) {
        toggle.textContent = lang === 'en' ? 'EN / FR' : 'EN / FR';
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function initLanguageToggle() {
    const toggle = document.querySelector('#lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'fr' : 'en';
            setLanguage(newLang);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize video player elements after DOM is ready
    hoverPlayer = document.querySelector('.hover-video');
    hoverPlayerContainer = document.querySelector('.video-hover-player');
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Initialize all components
    initNav();
    initHero();
    initGallery();
    initLightbox();
    initAnimations();
    initParallax();
    initContactForm();
    initLanguageToggle();
});

// Navigation
function initNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Hero Animation
function initHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroImage = document.querySelector('.hero-image img');
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 500);
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 800);
    
    setTimeout(() => {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateY(0)';
    }, 1100);
    
    setTimeout(() => {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
    }, 1400);
}

// Gallery
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewMoreBtn = document.querySelector('#view-more-btn');
    let showingAll = false;
    let currentFilteredItems = [];
    
    // Sample gallery items (replace with your actual data)
    const galleryItems = [
        {
            src: 'https://lh3.googleusercontent.com/d/132NFYG6BvFY8foy_OofHj0cnwyo3hpbt',
            category: 'Image',
            caption: 'Mountain Landscape - 2025',
            type: 'image'
        },
        {
            src: 'https://ia801502.us.archive.org/24/items/0333_20250505/0333.mp4',
            category: 'video',
            caption: 'Chalk Horse - 2024',
            type: 'video',
            thumbnail: 'https://lh3.googleusercontent.com/d/1hIFDmfV2TrZK6j2ENrT4Y7xlYuLsVRl2'
        },
        {
            src: 'https://archive.org/download/httpsarchive.orgdownloadwb2-0296dji_0296.png/DJI_0317.png',
            category: 'image',
            caption: 'Temple - 2024',
            type: 'image'
        },
        {
            src: '',
            category: 'photo',
            caption: 'Temple',
            type: 'image'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1Kk9quq-AbN6vVwiWTyCWEwpL0ATkf1Vf',
            category: 'photo',
            caption: 'Coast - 2025',
            type: 'image'
        },
        {
            src: 'https://ia601205.us.archive.org/13/items/0505_20250505_20250505/0505.mp4',
            category: 'video',
            caption: 'Temple',
            type: 'video',
            thumbnail: 'https://lh3.googleusercontent.com/d/1b3TKmvPvk9O-o4FxqIPco6hWTi-t4K07'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1rn9agTGPCUsY3ffemDkj_z8hvx22gj11',
            category: 'photo',
            caption: 'Uffington Castle',
            type: 'image'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1oL-9UZZSReYd29v6-HfGlmzNyjV5Zigg',
            category: 'photo',
            caption: 'Countryside',
            type: 'image'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1MEDlVQIK8ntJXN1Gxbqw9Q4fmK0S0e4t',
            category: 'photo',
            caption: 'Countryside',
            type: 'image'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1NRkTAA1dadthHB8cFJqNV8JRSsmh8sFb',
            category: 'photo',
            caption: 'Scottish coast',
            type: 'image'
        },
        {
            src: 'https://lh3.googleusercontent.com/d/1qZZ_jgodaYhPJPr01e_UcF4N399FY1nv',
            category: 'photo',
            caption: 'Bangkok Skyline',
            type: 'image'
        }
    ];
    
    // Render gallery items (if limited=true show up to 6 items)
    // Items can include an optional numeric `priority` field where 1 = highest priority.
    // Items with lower priority values appear before higher ones. Items without a priority
    // are treated as lowest priority.
    function renderGallery(items, limited = false) {
        galleryGrid.innerHTML = '';

        // Sort by priority (ascending). Treat missing/non-numeric priority as very large.
        const sortedItems = items.slice().sort((a, b) => {
            const pa = (typeof a.priority === 'number') ? a.priority : 9999;
            const pb = (typeof b.priority === 'number') ? b.priority : 9999;
            if (pa === pb) return 0;
            return pa - pb;
        });

        const displayItems = (limited && sortedItems.length > 6) ? sortedItems.slice(0, 6) : sortedItems;

        displayItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.dataset.category = item.category;
            galleryItem.dataset.caption = item.caption;
            
            if (item.type === 'video') {
                galleryItem.innerHTML = `
                    <div class="video-thumbnail">
                        <img src="${item.thumbnail}" alt="${item.caption}">
                        <div class="video-hover-player">
                            <video muted loop class="hover-video"></video>
                        </div>
                        <div class="video-overlay">
                            <div class="overlay-label">Hover to play</div>
                        </div>
                    </div>
                `;

                const videoContainer = galleryItem.querySelector('.video-hover-player');
                const videoElement = galleryItem.querySelector('.hover-video');
                const overlay = galleryItem.querySelector('.video-overlay');

                // Hover effects for videos
                galleryItem.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        // set src then show video and hide overlay
                        videoElement.src = item.src;
                        overlay.classList.add('hidden');
                        videoContainer.classList.add('visible');
                        videoElement.play().catch(e => console.log("Autoplay prevented:", e));
                    }, 300);
                });

                galleryItem.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    videoContainer.classList.remove('visible');
                    videoElement.pause();
                    videoElement.currentTime = 0;
                    // restore overlay after short delay for smoother UX
                    setTimeout(() => overlay.classList.remove('hidden'), 150);
                });

                galleryItem.addEventListener('click', () => {
                    clearTimeout(hoverTimeout);
                    window.open(item.src, '_blank');
                });
                
            } else {
                galleryItem.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
                galleryItem.addEventListener('click', () => openLightbox(item.src, item.caption));
            }
            
            galleryGrid.appendChild(galleryItem);
        });

        // Show or hide view-more button depending on total items
        if (viewMoreBtn) {
            if (items.length > 6) {
                viewMoreBtn.style.display = 'inline-flex';
                viewMoreBtn.setAttribute('aria-expanded', showingAll ? 'true' : 'false');
                viewMoreBtn.textContent = showingAll ? 'View Less' : 'View More';
            } else {
                viewMoreBtn.style.display = 'none';
            }
        }
    }
    
    // Filter gallery
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            currentFilteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
            // Reset to limited view when changing filters
            showingAll = false;
            renderGallery(currentFilteredItems, true);
        });
    });
    
    // Initial render (show limited set)
    currentFilteredItems = galleryItems;
    renderGallery(currentFilteredItems, true);

    // View more/less toggle
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            showingAll = !showingAll;
            this.setAttribute('aria-expanded', showingAll ? 'true' : 'false');
            renderGallery(currentFilteredItems, !showingAll);
        });
    }
}

// Lightbox
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    
    function openLightbox(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    window.openLightbox = openLightbox;
}

// Animations
function initAnimations() {
    const droneTitle = document.querySelector('.drone-overlay h2');
    const droneText = document.querySelector('.drone-overlay p');
    
    setTimeout(() => {
        droneTitle.style.opacity = '1';
        droneTitle.style.transform = 'translateY(0)';
    }, 500);
    
    setTimeout(() => {
        droneText.style.opacity = '1';
        droneText.style.transform = 'translateY(0)';
    }, 800);
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed);
            const offset = scrollPosition * speed;
            
            if (element.classList.contains('hero-title') || 
                element.classList.contains('hero-subtitle') ||
                element.classList.contains('scroll-indicator')) {
                element.style.transform = `translateY(${offset}px)`;
            } else if (element.classList.contains('hero-image')) {
                element.style.transform = `translateY(${offset}px)`;
            } else if (element.classList.contains('drone-overlay') && 
                      element.querySelector('h2')) {
                element.querySelector('h2').style.transform = `translateY(${offset * 0.7}px)`;
                element.querySelector('p').style.transform = `translateY(${offset * 0.5}px)`;
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.querySelector('#contact-submit');
            const name = document.querySelector('#contact-name').value.trim();
            const email = document.querySelector('#contact-email').value.trim();
            const message = document.querySelector('#contact-message').value.trim();

            if (!name || !email || !message) return;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Build Discord embed
            const safeMessage = message.length > 1900 ? message.slice(0, 1897) + '...' : message;
            const embed = {
                title: 'New contact form submission',
                fields: [
                    { name: 'Name', value: name, inline: true },
                    { name: 'Email', value: email, inline: true },
                    { name: 'Message', value: safeMessage, inline: false }
                ],
                timestamp: new Date().toISOString()
            };

            const body = JSON.stringify({ embeds: [embed] });

            // Try a normal fetch first (preferred). If blocked by CORS, fallback to no-cors.
            let sent = false;
            try {
                const res = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });

                if (res && res.ok) {
                    sent = true;
                } else {
                    // Non-OK status; attempt no-cors fallback
                    console.warn('Discord webhook POST returned non-ok, status:', res && res.status);
                }
            } catch (err) {
                // Likely a CORS error — fallback to no-cors attempt below
                console.warn('Fetch to webhook failed (possible CORS). Trying no-cors fallback.', err);
            }

            if (!sent) {
                // Fallback: try sending with mode:'no-cors'. This sends an opaque request
                // and we can't check the status — treat as best-effort.
                try {
                    await fetch(DISCORD_WEBHOOK_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body
                    });
                    sent = true; // optimistic
                } catch (err2) {
                    console.error('No-cors fallback failed:', err2);
                }
            }

            if (sent) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span data-i18n="contact.submit">Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 1800);
            } else {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Send Failed';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span data-i18n="contact.submit">Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 2500);
            }
        });
    }
}
