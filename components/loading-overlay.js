class LoadingOverlay extends HTMLElement {
    constructor() {
        super();
        this.isVisible = false;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                }
                
                :host([visible]) {
                    display: flex;
                }
                
                .overlay-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(13, 17, 23, 0.95);
                    backdrop-filter: blur(20px);
                }
                
                .content {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                }
                
                .shield-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .shield-ring {
                    position: absolute;
                    inset: 0;
                    border: 3px solid rgba(0, 209, 255, 0.2);
                    border-radius: 50%;
                    animation: pulse-ring 2s ease-out infinite;
                }
                
                .shield-ring:nth-child(2) {
                    animation-delay: 0.5s;
                }
                
                .shield-icon {
                    color: #00D1FF;
                    animation: secure-pulse 2s ease-in-out infinite;
                    filter: drop-shadow(0 0 20px rgba(0, 209, 255, 0.5));
                }
                
                .text-container {
                    text-align: center;
                }
                
                .main-text {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.5rem;
                    letter-spacing: 0.05em;
                }
                
                .sub-text {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                }
                
                .progress-bar {
                    width: 200px;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #00D1FF, #00ffff);
                    width: 0%;
                    animation: fill-progress 1s ease-out forwards;
                    box-shadow: 0 0 10px #00D1FF;
                }
                
                @keyframes pulse-ring {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                
                @keyframes secure-pulse {
                    0%, 100% { 
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.8;
                        transform: scale(1.1);
                    }
                }
                
                @keyframes fill-progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                
                .cancel-btn {
                    margin-top: 2rem;
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: rgba(255, 255, 255, 0.5);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                
                .cancel-btn:hover {
                    border-color: rgba(255, 255, 255, 0.4);
                    color: white;
                }
                
                @media (max-width: 640px) {
                    .main-text {
                        font-size: 1.25rem;
                    }
                }
            </style>
            
            <div class="overlay-backdrop"></div>
            <div class="content">
                <div class="shield-container">
                    <div class="shield-ring"></div>
                    <div class="shield-ring"></div>
                    <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                </div>
                
                <div class="text-container">
                    <div class="main-text">Securing Connection...</div>
                    <div class="sub-text">Establishing encrypted handshake with Monzo</div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                
                <button class="cancel-btn" id="cancelBtn">Cancel</button>
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const cancelBtn = this.shadowRoot.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hide());
        }
        
        // Close on backdrop click
        const backdrop = this.shadowRoot.querySelector('.overlay-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => this.hide());
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.setAttribute('visible', '');
        document.body.style.overflow = 'hidden';
        
        // Start the redirect sequence
        this.redirectTimeout = setTimeout(() => {
            this.performRedirect();
        }, 1000);
    }
    
    hide() {
        this.isVisible = false;
        this.removeAttribute('visible');
        document.body.style.overflow = '';
        
        if (this.redirectTimeout) {
            clearTimeout(this.redirectTimeout);
            this.redirectTimeout = null;
        }
    }
    
    performRedirect() {
        // Open Monzo in new tab
        const url = 'https://monzo.me/dylanalcoy';
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        
        if (newWindow) {
            // Brief delay before hiding overlay so user sees success state
            setTimeout(() => {
                this.hide();
                // Show success toast in original window
                if (window.showToast) {
                    window.showToast('Secure payment portal opened');
                }
            }, 500);
        } else {
            // If popup blocked, show error and stay on overlay
            const subText = this.shadowRoot.querySelector('.sub-text');
            if (subText) {
                subText.textContent = 'Please allow popups and try again';
                subText.style.color = '#ff6b6b';
            }
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.hide();
            }, 2000);
        }
    }
}

customElements.define('loading-overlay', LoadingOverlay);