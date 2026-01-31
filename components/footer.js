class PortalFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode 'open' });
        this.shadowRoot.innerHTML = `
            style
                host {
                    display block;
                    width 100%;
                    margin-top auto;
                }
                
                footer {
                    border-top 1px solid rgba(255, 255, 255, 0.05);
                    background rgba(13, 17, 23, 0.8);
                    backdrop-filter blur(10px);
                    padding 2rem 1rem;
                    margin-top 4rem;
                }
                
                .container {
                    max-width 5xl;
                    margin 0 auto;
                    display flex;
                    flex-direction column;
                    gap 1.5rem;
                }
                
                .top-row {
                    display flex;
                    justify-content center;
                    align-items center;
                    gap 1.5rem;
                }
                
                .security-badges {
                    display flex;
                    gap 1rem;
                    flex-wrap wrap;
                    justify-content center;
                }
                
                .badge {
                    display flex;
                    align-items center;
                    gap 0.5rem;
                    padding 0.5rem 1rem;
                    background rgba(255, 255, 255, 0.03);
                    border 1px solid rgba(255, 255, 255, 0.08);
                    border-radius 9999px;
                    font-size 0.75rem;
                    color rgba(255, 255, 255, 0.6);
                }
                
                .badge svg {
                    color #00D1FF;
                }
                
                .bottom-row {
                    text-align center;
                    color rgba(255, 255, 255, 0.4);
                    font-size 0.875rem;
                }
                
                .divider {
                    width 4px;
                    height 4px;
                    background rgba(255, 255, 255, 0.2);
                    border-radius 50%;
                    display inline-block;
                    margin 0 0.5rem;
                    vertical-align middle;
                }
                
                @media (max-width 640px) {
                    .top-row {
                        flex-direction column;
                    }
                }
            style
            
            footer
                div class=container
                    div class=top-row
                        div class=security-badges
                            div class=badge
                                svg xmlns=httpwww.w3.org2000svg width=14 height=14 viewBox=0 0 24 24 fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round
                                    rect x=3 y=11 width=18 height=11 rx=2 ry=2rect
                                    path d=M7 11V7a5 5 0 0 1 10 0v4path
                                svg
                                256-bit SSL
                            div
                            div class=badge
                                svg xmlns=httpwww.w3.org2000svg width=14 height=14 viewBox=0 0 24 24 fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round
                                    path d=M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zpath
                                svg
                                PCI DSS Compliant
                            div
                            div class=badge
                                svg xmlns=httpwww.w3.org2000svg width=14 height=14 viewBox=0 0 24 24 fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round
                                    path d=M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zpath
                                    path d=m9 12 2 2 4-4path
                                svg
                                Verified Identity
                            div
                        div
                    div
                    
                    div class=bottom-row
                        span© 2024 Dylan Alcoyspan
                        span class=dividerspan
                        spanSecure Payment Portalspan
                        span class=dividerspan
                        span style=color #00D1FF;Monzo Verifiedspan
                    div
                div
            footer
        `;
    }
}

customElements.define('portal-footer', PortalFooter);