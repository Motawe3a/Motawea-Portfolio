const THEME_COLOR_KEY = 'theme-color';
const THEME_SKIN_KEY = 'theme-skin';
const DEFAULT_COLOR = 'pink';
const DEFAULT_SKIN = 'light';
const DARK_SKIN_CLASS = 'dark';

const colorSwatches = document.querySelectorAll('.color-swatch');
const bodySkinInputs = document.querySelectorAll('.body-skin');
const styleSwitcher = document.querySelector('.style-switcher');
const toggleBtn = document.querySelector('.toggle-style-switcher');

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // localStorage may be unavailable (e.g. privacy mode); ignore.
    }
}

function readFromStorage(key, fallback) {
    try {
        return localStorage.getItem(key) || fallback;
    } catch (e) {
        return fallback;
    }
}

// Themes are plain CSS: [data-theme="..."] on <html> redefines the single
// --accent custom property in style.css, and every themed element already
// reads from var(--accent) — so switching themes is just this one attribute.
function setActiveStyle(color, save = true) {
    document.documentElement.setAttribute('data-theme', color);

    colorSwatches.forEach((swatch) => {
        swatch.classList.toggle('active', color === swatch.dataset.theme);
    });

    if (save) saveToStorage(THEME_COLOR_KEY, color);
}

function setBodySkin(skin, save = true) {
    document.body.className = skin === DARK_SKIN_CLASS ? DARK_SKIN_CLASS : '';

    const matchingRadio = document.querySelector(`.body-skin[value="${skin}"]`);
    if (matchingRadio) matchingRadio.checked = true;

    if (save) saveToStorage(THEME_SKIN_KEY, skin);
}

function restoreSavedTheme() {
    const savedColor = readFromStorage(THEME_COLOR_KEY, DEFAULT_COLOR);
    const savedSkin = readFromStorage(THEME_SKIN_KEY, DEFAULT_SKIN);
    setActiveStyle(savedColor, false);
    setBodySkin(savedSkin, false);
}

colorSwatches.forEach((swatch) => {
    swatch.addEventListener('click', () => setActiveStyle(swatch.dataset.theme));
});

bodySkinInputs.forEach((input) => {
    input.addEventListener('change', () => setBodySkin(input.value));
});

if (toggleBtn && styleSwitcher) {
    toggleBtn.addEventListener('click', () => {
        const isOpen = styleSwitcher.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });
}

restoreSavedTheme();
