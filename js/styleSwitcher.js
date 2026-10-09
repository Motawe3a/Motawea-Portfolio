const THEME_COLOR_KEY = 'theme-color';
const THEME_SKIN_KEY = 'theme-skin';
const DEFAULT_COLOR = 'pink';
const DEFAULT_SKIN = 'light';
const DARK_SKIN_CLASS = 'dark';

const themeLinks = document.querySelectorAll('.alternative-style');
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

function setActiveStyle(color, save = true) {
    themeLinks.forEach((link) => {
        const isMatch = color === link.getAttribute('title');
        link.toggleAttribute('disabled', !isMatch);
    });

    let accentColor = '';
    colorSwatches.forEach((swatch) => {
        const isActive = color === swatch.getAttribute('title');
        swatch.classList.toggle('active', isActive);
        if (isActive) accentColor = getComputedStyle(swatch).backgroundColor;
    });

    if (accentColor && styleSwitcher) {
        styleSwitcher.style.setProperty('--accent', accentColor);
    }

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
