class QuickPayCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .card-container {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                    position: relative;
                    overflow: hidden;
                }
                
                .card-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0, 209, 255, 0.4), transparent);
                }
                
                .glow-orb {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, transparent 70%);
                    top: -150px;
                    right: -150px;
                    pointer-events: none;
                }
                
                .pay-button {
                    width: 100%;
                    padding: 1.25rem;
                    background: linear-gradient(135deg, #00D1FF 0%, #00a8cc 100%);
                    border: none;
                    border-radius: 1rem;
                    color: #0D1117;
                    font-weight: 700;
                    font-size: 1.125rem;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 30px rgba(0, 209, 255, 0.3),
                                0 4px 20px rgba(0, 0, 0, 0.2),
                                inset 0 1px 0 rgba(255, 255, 255, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                }
                
                .pay-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 40px rgba(0, 209, 255, 0.5),
                                0 8px 30px rgba(0, 0, 0, 0.3),
                                inset 0 1px 0 rgba(255, 255, 255, 0.5);
                }
                
                .pay-button:active {
                    transform: translateY(0);
                }
                
                .pay-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transition: left 0.6s;
                }
                
                .pay-button:hover::before {
                    left: 100%;
                }
                
                .security-note {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.875rem;
                }
                
                .shield-icon {
                    color: #00D1FF;
                }
                
                @media (max-width: 640px) {
                    .card-container {
                        padding: 1.5rem;
                    }
                    
                    .pay-button {
                        font-size: 1rem;
                        padding: 1rem;
                    }
                }
                
                .apple-icon, .google-icon {
                    width: 24px;
                    height: 24px;
                }
            </style>
            
            <div class="card-container">
                <div class="glow-orb"></div>
                
                <div class="text-center mb-8 relative z-10">
                    <h2 class="text-2xl font-bold mb-2">Quick Pay</h2>
                    <p class="text-gray-400 text-sm">Instant digital wallet checkout</p>
                </div>
                
                <button class="pay-button" id="mainPayBtn" aria-label="Pay with Apple Pay or Google Pay">
                    <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Pay with</span>
                    <span style="font-weight: 500;">Apple Pay</span>
                    <span style="opacity: 0.7;">/</span>
                    <span style="font-weight: 500;">Google Pay</span>
                </button>
                
                <div class="security-note">
                    <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>End-to-end encrypted • PCI Compliant</span>
                </div>
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const btn = this.shadowRoot.getElementById('mainPayBtn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Show loading overlay
                const overlay = document.querySelector('loading-overlay');
                if (overlay) {
                    overlay.show();
                }
            });
        }
    }
}

customElements.define('quick-pay-card', QuickPayCard);