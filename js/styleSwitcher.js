var links = document.querySelectorAll('.alternative-style');

function setActiveStyle(color, save = true) {
    for (let i = 0; i < links.length; i++) {
        if (color === links[i].getAttribute('title')) {
            links[i].removeAttribute('disabled');
        } else {
            links[i].setAttribute('disabled','true');
        }
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

document.querySelector('.toggle-style-switcher').addEventListener('click',() => {
    document.querySelector('.style-switcher').classList.toggle('open')
    document.querySelector('.fa-cog').classList.toggle('fa-spin')
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