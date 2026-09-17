var links = document.querySelectorAll('.alternative-style');
var swatches = document.querySelectorAll('.color-swatch');

function setActiveStyle(color, save = true) {
    for (let i = 0; i < links.length; i++) {
        if (color === links[i].getAttribute('title')) {
            links[i].removeAttribute('disabled');
        } else {
            links[i].setAttribute('disabled','true');
        }
    }
    let accent = '';
    for (let i = 0; i < swatches.length; i++) {
        const isActive = color === swatches[i].getAttribute('title');
        swatches[i].classList.toggle('active', isActive);
        if (isActive) accent = getComputedStyle(swatches[i]).backgroundColor;
    }
    if (accent) {
        document.querySelector('.style-switcher').style.setProperty('--accent', accent);
    }
    if (save) {
        try {
            localStorage.setItem('theme-color', color);
        } catch (e) {}
    }
}

function setBodySkin(skin, save = true) {
    document.body.className = skin === 'dark' ? 'dark' : '';
    const radio = document.querySelector('.body-skin[value="' + skin + '"]');
    if (radio) radio.checked = true;
    if (save) {
        try {
            localStorage.setItem('theme-skin', skin);
        } catch (e) {}
    }
}

const bodySkin = document.querySelectorAll('.body-skin')
for (let i = 0; i < bodySkin.length; i++) {
    bodySkin[i].addEventListener('change', function () {
        setBodySkin(this.value);
    })
}

const toggleBtn = document.querySelector('.toggle-style-switcher');
toggleBtn.addEventListener('click', () => {
    const isOpen = document.querySelector('.style-switcher').classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
});

// Restore the color theme and body skin the user last picked
(function restoreSavedTheme() {
    let savedColor = 'pink';
    let savedSkin = 'light';
    try {
        savedColor = localStorage.getItem('theme-color') || savedColor;
        savedSkin = localStorage.getItem('theme-skin') || savedSkin;
    } catch (e) {}
    setActiveStyle(savedColor, false);
    setBodySkin(savedSkin, false);
})();