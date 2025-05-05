document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNav();
    initHero();
    initGallery();
    initLightbox();
    initAnimations();
    initParallax();
    initContactForm();
});

// Video Hover Player Variables
const hoverPlayer = document.querySelector('.hover-video');
const hoverPlayerContainer = document.querySelector('.video-hover-player');
let hoverTimeout;

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
    
    // Sample gallery items (replace with your actual data)
    const galleryItems = [
        { 
            src: 'images/photo1.jpg', 
            category: 'photo', 
            caption: 'Mountain Landscape - 2023',
            type: 'image'
        },
        { 
            src: 'images/photo2.jpg', 
            category: 'photo', 
            caption: 'Urban Portrait - 2023',
            type: 'image'
        },
        { 
            src: 'images/video1.jpg', 
            category: 'video', 
            caption: 'Commercial Shoot - 2023',
            type: 'image'
        },
        { 
            src: 'images/drone1.jpg', 
            category: 'drone', 
            caption: 'Aerial View - 2023',
            type: 'image'
        },
        { 
            src: 'images/photo3.jpg', 
            category: 'photo', 
            caption: 'Wedding Photography - 2023',
            type: 'image'
        },
        { 
            src: 'https://ia601205.us.archive.org/13/items/0505_20250505_20250505/0505.mp4', 
            category: 'video', 
            caption: 'Music Video - 2023',
            type: 'video',
            thumbnail: 'images/video-thumbnail.jpg'
        }
    ];
    
    // Render gallery items
    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.dataset.category = item.category;
            galleryItem.dataset.caption = item.caption;
            
            if (item.type === 'video') {
                galleryItem.innerHTML = `
                    <div class="video-thumbnail">
                        <img src="${item.thumbnail}" alt="${item.caption}">
                        <div class="play-icon"><i class="fas fa-play"></i></div>
                    </div>
                `;
                
                // Hover effects for videos
                galleryItem.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        hoverPlayer.src = item.src;
                        hoverPlayerContainer.style.left = `${galleryItem.getBoundingClientRect().left}px`;
                        hoverPlayerContainer.style.top = `${galleryItem.getBoundingClientRect().top}px`;
                        hoverPlayerContainer.classList.add('visible');
                        hoverPlayer.play().catch(e => console.log("Autoplay prevented:", e));
                    }, 300);
                });
                
                galleryItem.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    hoverPlayerContainer.classList.remove('visible');
                    hoverPlayer.pause();
                    hoverPlayer.currentTime = 0;
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
    }
    
    // Filter gallery
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const itemsToShow = filter === 'all' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === filter);
                
            renderGallery(itemsToShow);
        });
    });
    
    // Initial render
    renderGallery(galleryItems);
    
    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
        if (hoverPlayerContainer.classList.contains('visible')) {
            hoverPlayerContainer.style.left = `${e.clientX + 20}px`;
            hoverPlayerContainer.style.top = `${e.clientY + 20}px`;
        }
    });
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
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 2000);
            }, 1500);
        });
    }
}