console.log(`
Моя оценка - 100 баллов
`);

// Burger-Menu
const doc = document,
  burger = doc.querySelector(".burger"),
  burgerLine = doc.querySelectorAll("burger__line"),
  nav = doc.querySelector(".nav"),
  navLinks = doc.querySelectorAll(".nav__link"),
  body = doc.querySelector(".body"),
  logo = doc.querySelector(".logo"),
  logoNav = doc.querySelector(".logo--nav"),
  shadow = doc.querySelector(".shadow");

function toggleMenu() {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  body.classList.toggle("open");
  logo.classList.toggle("open");
  logoNav.classList.toggle("open");
  shadow.classList.toggle("open");
}

function closeMenu(event) {
  if (event.target.classList.contains("nav__link")) {
    burger.classList.remove("open");
    nav.classList.remove("open");
    body.classList.remove("open");
    logo.classList.remove("open");
    logoNav.classList.remove("open");
    shadow.classList.remove("open");
  }
}

burger.addEventListener("click", toggleMenu);
burgerLine.forEach((el) => el.addEventListener("click", toggleMenu));
navLinks.forEach((element) => element.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  let target = e.target;
  let itsNav = target == nav || nav.contains(target);
  let itsBurger = target == burger;
  let navIsOpen = nav.classList.contains("open");

  if (!itsNav && !itsBurger && navIsOpen) {
    toggleMenu();
  }
});