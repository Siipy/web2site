class AlternativePayments extends HTMLElement {
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
                
                .container {
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .pill-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                    color: white;
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .pill-button:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(0, 209, 255, 0.4);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(0, 209, 255, 0.1);
                }
                
                .pill-button.revolut:hover {
                    border-color: #0075eb;
                    box-shadow: 0 4px 20px rgba(0, 117, 235, 0.15);
                }
                
                .pill-button.paypal:hover {
                    border-color: #003087;
                    box-shadow: 0 4px 20px rgba(0, 48, 135, 0.15);
                }
                
                .shield-icon {
                    color: #00D1FF;
                    width: 14px;
                    height: 14px;
                }
                
                @media (max-width: 480px) {
                    .container {
                        flex-direction: column;
                        width: 100%;
                    }
                    
                    .pill-button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
            
            <div class="container">
                <a href="https://revolut.me/d_alcoy" target="_blank" rel="noopener noreferrer" class="pill-button revolut">
                    <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Revolut</span>
                </a>
                
                <a href="https://paypal.me/SiipyPippy" target="_blank" rel="noopener noreferrer" class="pill-button paypal">
                    <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>PayPal</span>
                </a>
            </div>
        `;
    }
}

customElements.define('alternative-payments', AlternativePayments);