const burger = document.querySelector('.burger');
const burgerLine = document.querySelectorAll('burger__line');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const body = document.querySelector('.body');
const logo = document.querySelector('.logo');
const shadow = document.querySelector('.shadow');
const header = document.querySelector('.header');

function toggleMenu() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    body.classList.toggle('open');
    logo.classList.toggle('open');
    shadow.classList.toggle('open');
    header.classList.toggle('open');
}

function closeMennu(event) {
    if (event.target.classList.contains('nav__link')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('open');
        logo.classList.remove('open');
        shadow.classList.remove('open');
        header.classList.remove('open');
    }
}

burger.addEventListener('click', toggleMenu);
burgerLine.forEach((el) =>el.addEventListener('click', toggleMenu));
navLinks.forEach((element) => element.addEventListener('click', closeMennu));

document.addEventListener('click', e => {
    let target = e.target;
    let itsNav = target == nav || nav.contains(target);
    let itsBurger = target == burger;
    let navIsOpen = nav.classList.contains('open');
    
    if (!itsNav && !itsBurger && navIsOpen) {
      toggleMenu();
    }
})