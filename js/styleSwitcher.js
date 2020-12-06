var links = document.querySelectorAll('.alternative-style');
console.log(links);
var totalLinks = links.length;
function setActiveStyle(color) {
    for (let i = 0; i < totalLinks; i++) {
        if (color == links[i].getAttribute('title')) {
            links[i].removeAttribute('disabled');
        } else {
            links[i].setAttribute('disabled','true');
        }
    }
}

document.querySelector('.toggle-style-switcher').addEventListener('click',() => {
    document.querySelector('.style-switcher').classList.toggle('open')
    document.querySelector('.fa-cog').classList.toggle('fa-spin')
});