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