const nestedRoutes = new Set(['about', 'services', 'useful-info', 'donations']);

function sitePrefix() {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || '';

    if (nestedRoutes.has(lastSegment)) return '../';
    if (lastSegment === 'index.html' && nestedRoutes.has(segments[segments.length - 2] || '')) return '../';
    return '';
}

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const prefix = sitePrefix();
        const homeHref = `${prefix}index.html`;
        const aboutHref = `${prefix}about.html`;
        const servicesHref = `${prefix}services.html`;
        const usefulInfoHref = `${prefix}useful-info.html`;
        const donationsHref = `${prefix}donations.html`;

        this.innerHTML = `
            <header class="site-header">
                <div class="top-strip">
                    <div class="container top-strip__inner">
                        <a href="https://www.facebook.com/ucssedmonton" target="_blank" rel="noopener">Let's get connected on Facebook too</a>
                        <span>СУСПІЛЬНА СЛУЖБА УКРАЇНЦІВ КАНАДИ - ЕДМОНТОН</span>
                    </div>
                </div>
                <div class="container nav-shell">
                    <a class="brand" href="${homeHref}">
                        <img src="${prefix}images/cropped-cropped-7-e1642027652176-1-e1642028055733.png" alt="UCSS Edmonton logo">
                        <span>UCSS Edmonton</span>
                    </a>
                    <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
                    <nav class="main-nav" aria-label="Primary navigation">
                        <a href="${homeHref}">Home</a>
                        <a href="${aboutHref}">About</a>
                        <a href="${servicesHref}">Services</a>
                        <a href="${usefulInfoHref}">Useful Info</a>
                        <a href="${homeHref}#contact">Contact Us</a>
                        <a class="nav-donate" href="${donationsHref}">Donations</a>
                    </nav>
                    <div class="language-switch" aria-label="Language switcher">
                        <button type="button" data-lang="en" class="is-active">
                            <span class="flag" aria-hidden="true">
                                <img src="${prefix}images/flag-canada.svg" alt="">
                            </span>
                            <span>EN</span>
                        </button>
                        <button type="button" data-lang="uk">
                            <span class="flag" aria-hidden="true">
                                <img src="${prefix}images/flag-ukraine.svg" alt="">
                            </span>
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
        const prefix = sitePrefix();
        const homeHref = `${prefix}index.html`;
        const aboutHref = `${prefix}about.html`;
        const servicesHref = `${prefix}services.html`;
        const usefulInfoHref = `${prefix}useful-info.html`;
        const donationsHref = `${prefix}donations.html`;

        this.innerHTML = `
            <footer class="site-footer">
                <div class="container footer-grid footer-grid--rich">
                    <div class="footer-brand-block">
                        <a class="brand brand--footer" href="${homeHref}"><img src="${prefix}images/6-230x230.png" alt="UCSS Edmonton icon"><span>UCSS Edmonton</span></a>
                        <p>Registered Charity / Foundation</p>
                    </div>
                    <div class="footer-contact" aria-label="Footer contact details">
                        <a href="tel:+17804714477"><span class="material-symbols-outlined">call</span>(780) 471-4477</a>
                        <a href="mailto:ucss@shaw.ca"><span class="material-symbols-outlined">mail</span>ucss@shaw.ca</a>
                    </div>
                    <nav class="footer-nav" aria-label="Footer navigation">
                        <a href="${aboutHref}">About</a>
                        <a href="${servicesHref}">Services</a>
                        <a href="${usefulInfoHref}">Useful Info</a>
                        <a href="${donationsHref}">Donations</a>
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
