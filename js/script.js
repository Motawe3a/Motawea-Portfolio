const REVEAL_SELECTORS = '.section-title, .about-text, .personal-info, .skills, .education, .experiance, .service-item, .blog-item, .contact-info-item, .contact-cta';
const PROJECT_CARD_STAGGER_STEP_S = 0.12;
const PROJECT_CARDS_PER_ROW = 3;

const nav = document.querySelector('.nav');
const navLinks = Array.from(nav.querySelectorAll('li a'));
const aside = document.querySelector('.aside');
const navToggler = document.querySelector('.nav-toggler');

function setActiveNavLink(activeLink) {
    navLinks.forEach((link) => link.classList.toggle('active', link === activeLink));
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setActiveNavLink(link);
        aside.classList.remove('open');
    });
});

navToggler.addEventListener('click', () => {
    aside.classList.toggle('open');
});

// Highlight the nav link for whichever section is currently in view
const sections = document.querySelectorAll('section[id]');
const navLinkById = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = navLinkById.get(entry.target.id);
        if (link) setActiveNavLink(link);
    });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach((section) => spyObserver.observe(section));

// Reveal-on-scroll animations
document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => el.classList.add('reveal'));

// Stagger the project cards row by row for a nicer cascade effect
document.querySelectorAll('.blog .blog-item').forEach((el, i) => {
    el.style.transitionDelay = `${(i % PROJECT_CARDS_PER_ROW) * PROJECT_CARD_STAGGER_STEP_S}s`;
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Contact: "Email Me" uses a plain mailto: link, which only does something
// if the browser has a mail app registered to handle it. As a fallback for
// visitors who don't (or are in a context where mailto is blocked), let
// them copy the address directly; both buttons flash a brief confirmation.
const copyBtn = document.getElementById('contact-email-copy');

if (copyBtn && navigator.clipboard) {
    const copyLabel = copyBtn.textContent;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(copyBtn.textContent);
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = copyLabel;
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (e) {
            // Clipboard API unavailable/denied; the address is still
            // selectable as plain text, so no further fallback needed.
        }
    });
}
