class BankDetailsCard extends HTMLElement {
    constructor() {
        super();
        this.details = [
            { label: 'Account Name', value: 'Dylan Alcoy', icon: 'user' },
            { label: 'Sort Code', value: '07-12-26', icon: 'grid' },
            { label: 'Account Number', value: '01412205', icon: 'hash' },
            { label: 'IBAN', value: 'GB63 NAIA 0712 2601 41 2205', icon: 'globe' }
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        const rows = this.details.map((detail, index) => `
            <div class="detail-row" data-index="${index}" role="button" tabindex="0" aria-label="Copy ${detail.label}">
                <div class="detail-info">
                    <div class="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            ${this.getIconPath(detail.icon)}
                        </svg>
                    </div>
                    <div class="text-content">
                        <div class="label">${detail.label}</div>
                        <div class="value">${detail.value}</div>
                    </div>
                </div>
                <div class="copy-indicator">
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span class="copy-text">Copy</span>
                </div>
            </div>
        `).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1.5rem;
                    overflow: hidden;
                    position: relative;
                }
                
                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0, 209, 255, 0.3), transparent);
                }
                
                .header {
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: white;
                }
                
                .subtitle {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin-top: 0.25rem;
                }
                
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.25rem 0.75rem;
                    background: rgba(0, 209, 255, 0.1);
                    border: 1px solid rgba(0, 209, 255, 0.2);
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    color: #00D1FF;
                    font-weight: 500;
                }
                
                .content {
                    padding: 0.5rem 0;
                }
                
                .detail-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 2rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                    position: relative;
                }
                
                .detail-row:last-child {
                    border-bottom: none;
                }
                
                .detail-row:hover {
                    background: rgba(255, 255, 255, 0.03);
                }
                
                .detail-row:hover .copy-indicator {
                    color: #00D1FF;
                    border-color: rgba(0, 209, 255, 0.3);
                }
                
                .detail-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .icon-wrapper {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.7);
                }
                
                .text-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .label {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .value {
                    font-size: 1rem;
                    color: white;
                    font-weight: 500;
                    font-family: 'Courier New', monospace;
                    letter-spacing: 0.02em;
                }
                
                .copy-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                
                .copy-indicator.copied {
                    background: rgba(0, 209, 255, 0.1);
                    border-color: #00D1FF;
                    color: #00D1FF;
                }
                
                @media (max-width: 640px) {
                    .header, .detail-row {
                        padding-left: 1.25rem;
                        padding-right: 1.25rem;
                    }
                    
                    .value {
                        font-size: 0.875rem;
                    }
                    
                    .copy-text {
                        display: none;
                    }
                }
                
                .copied-toast {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: rgba(0, 209, 255, 0.1);
                    border: 1px solid rgba(0, 209, 255, 0.3);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.75rem;
                    backdrop-filter: blur(10px);
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 100;
                }
                
                .copied-toast.show {
                    transform: translateY(0);
                    opacity: 1;
                }
            </style>
            
            <div class="card">
                <div class="header">
                    <div>
                        <div class="title">Bank Transfer</div>
                        <div class="subtitle">Click any detail to copy to clipboard</div>
                    </div>
                    <div class="badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        Secure
                    </div>
                </div>
                <div class="content">
                    ${rows}
                </div>
            </div>
        `;
    }

    getIconPath(icon) {
        const paths = {
            user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
            grid: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line>',
            hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',
            globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>'
        };
        return paths[icon] || paths.user;
    }

    setupEventListeners() {
        const rows = this.shadowRoot.querySelectorAll('.detail-row');
        rows.forEach((row, index) => {
            const detail = this.details[index];
            
            row.addEventListener('click', () => this.copyDetail(row, detail));
            
            row.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.copyDetail(row, detail);
                }
            });
        });
    }

    async copyDetail(row, detail) {
        try {
            await navigator.clipboard.writeText(detail.value);
            
            // Visual feedback
            const indicator = row.querySelector('.copy-indicator');
            const originalHTML = indicator.innerHTML;
            
            indicator.classList.add('copied');
            indicator.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
            `;
            
            // Dispatch custom event for global toast
            window.dispatchEvent(new CustomEvent('bank-detail-copied', { 
                detail: { label: detail.label } 
            }));
            
            // Reset after 2 seconds
            setTimeout(() => {
                indicator.classList.remove('copied');
                indicator.innerHTML = originalHTML;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
}

customElements.define('bank-details-card', BankDetailsCard);