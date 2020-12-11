const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");

for (let i = 0; i < navList.length; i++) {
    const a = navList[i].querySelector("a")
    a.addEventListener("click", ()=>{
        for (let j = 0; j < navList.length; j++) {
            navList[j].querySelector('a').classList.remove("active");
        }
        this.classList.add("active")
    });
}