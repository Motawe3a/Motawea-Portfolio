const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const aside = document.querySelector(".aside");
const navToggler = document.querySelector(".nav-toggler");

for (let i = 0; i < navList.length; i++) {
    const a = navList[i].querySelector("a")
    a.addEventListener("click", ()=>{
        for (let j = 0; j < navList.length; j++) {
            navList[j].querySelector('a').classList.remove("active");
        }
        a.classList.add("active")
        aside.classList.remove("open");
    });
}

navToggler.addEventListener("click", () => {
    aside.classList.toggle("open");
});

// Highlight the nav link for whichever section is currently in view
const sections = document.querySelectorAll("section[id]");
const navLinksById = {};
navList.forEach((li) => {
    const a = li.querySelector("a");
    navLinksById[a.getAttribute("href").slice(1)] = a;
});

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = navLinksById[entry.target.id];
        if (!link) return;
        navList.forEach((li) => li.querySelector("a").classList.remove("active"));
        link.classList.add("active");
    });
}, { rootMargin: "-50% 0px -50% 0px" });

sections.forEach((section) => spyObserver.observe(section));

// Reveal-on-scroll animations
const revealSelectors = ".section-title, .about-text, .personal-info, .skills, .education, .experiance, .service-item, .blog-item, .contact-info-item, .contact-form";
document.querySelectorAll(revealSelectors).forEach((el) => el.classList.add("reveal"));

// Stagger the project cards row by row for a nicer cascade effect
document.querySelectorAll(".blog .blog-item").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));