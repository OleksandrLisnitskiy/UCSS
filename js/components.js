class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="top-strip">
                    <div class="container top-strip__inner">
                        <a href="https://www.facebook.com/ucssedmonton" target="_blank" rel="noopener">Let's get connected on Facebook too</a>
                        <span>СУСПІЛЬНА СЛУЖБА УКРАЇНЦІВ КАНАДИ - ЕДМОНТОН</span>
                    </div>
                </div>
                <div class="container nav-shell">
                    <a class="brand" href="index.html">
                        <img src="images/cropped-cropped-7-e1642027652176-1-e1642028055733.png" alt="UCSS Edmonton logo">
                        <span>UCSS Edmonton</span>
                    </a>
                    <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
                    <nav class="main-nav" aria-label="Primary navigation">
                        <a href="index.html">Home</a>
                        <a href="about.html">About</a>
                        <a href="services.html">Services</a>
                        <a href="useful-info.html">Useful Info</a>
                        <a href="index.html#contact">Contact Us</a>
                        <a class="nav-donate" href="donations.html">Donations</a>
                    </nav>
                    <div class="language-switch" aria-label="Language switcher">
                        <button type="button" data-lang="en" class="is-active">
                            <span class="flag flag--svg" aria-hidden="true"><svg viewBox="0 0 60 40" focusable="false"><rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d80621"/><rect x="45" width="15" height="40" fill="#d80621"/><path fill="#d80621" d="M30 4l2.1 7.1 4.2-4.5-.9 7.2 6.4-2.2-3.1 6.1 6.8 1.6-6.6 3.1 3.2 5.8-7.1-1.3.2 7.1-5.2-4.4-5.2 4.4.2-7.1-7.1 1.3 3.2-5.8-6.6-3.1 6.8-1.6-3.1-6.1 6.4 2.2-.9-7.2 4.2 4.5z"/></svg></span>
                            <span>EN</span>
                        </button>
                        <button type="button" data-lang="uk">
                            <span class="flag flag--svg" aria-hidden="true"><svg viewBox="0 0 60 40" focusable="false"><rect width="60" height="20" fill="#0057b7"/><rect y="20" width="60" height="20" fill="#ffd700"/></svg></span>
                            <span>UA</span>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="container footer-grid footer-grid--rich">
                    <div class="footer-brand-block">
                        <a class="brand brand--footer" href="index.html"><img src="images/6-230x230.png" alt="UCSS Edmonton icon"><span>UCSS Edmonton</span></a>
                        <p>Registered Charity / Foundation</p>
                    </div>
                    <div class="footer-contact" aria-label="Footer contact details">
                        <a href="tel:+17804714477"><span class="material-symbols-outlined">call</span>(780) 471-4477</a>
                        <a href="mailto:ucss@shaw.ca"><span class="material-symbols-outlined">mail</span>ucss@shaw.ca</a>
                    </div>
                    <nav class="footer-nav" aria-label="Footer navigation">
                        <a href="about.html">About</a>
                        <a href="services.html">Services</a>
                        <a href="useful-info.html">Useful Info</a>
                        <a href="donations.html">Donations</a>
                    </nav>
                    <div class="footer-social" aria-label="Social links">
                        <a class="social-icon social-icon--facebook" href="https://www.facebook.com/ucssedmonton" target="_blank" rel="noopener" aria-label="Facebook"></a>
                    </div>
                    <p class="footer-copy">&copy; 2026 Ukrainian Canadian Social Services - Edmonton. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
