// console.log(`
// Моя оценка - 100 баллов
// `);

// Burger-Menu
const doc = document,
  burger = doc.querySelector(".burger"),
  burgerLine = doc.querySelectorAll("burger__line"),
  nav = doc.querySelector(".nav"),
  navLinks = doc.querySelectorAll(".nav__link"),
  body = doc.querySelector(".body"),
  logo = doc.querySelector(".logo"),
  shadow = doc.querySelector(".shadow"),
  logoNav = doc.querySelector(".logo--nav"),
  header = doc.querySelector(".header");

function toggleMenu() {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  body.classList.toggle("open");
  logo.classList.toggle("open");
  shadow.classList.toggle("open");
  logoNav.classList.toggle("open");
  header.classList.toggle("open");
}

function closeMenu(event) {
  if (event.target.classList.contains("nav__link")) {
    burger.classList.remove("open");
    nav.classList.remove("open");
    body.classList.remove("open");
    logo.classList.remove("open");
    logoNav.classList.remove("open");
    shadow.classList.remove("open");
    header.classList.remove("open");
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

// Pagination
const containerPets = doc.querySelector(".pets__container"),
  countPageBtn = doc.querySelector("#count-page"),
  btnRight = doc.querySelector("#btn-right"),
  btnRightLastPage = doc.querySelector("#btn-right-last"),
  btnLeft = doc.querySelector("#btn-left"),
  btnLeftStartPage = doc.querySelector("#btn-left-last");

let screenWidth = window.screen.width;
let initIndexes = [];
let maxCountPage = 6;
let maxCountItems = 8;
let countPage = 1;

let isCheckPoint768 = true;
let isCheckPoint320 = true;

if (screenWidth > 768) {
  isCheckPoint768 = true;
  isCheckPoint320 = true;
  maxCountPage = 6;
  maxCountItems = 8;
  initIndexes = makeArrPages(maxCountPage, maxCountItems);
} else if (screenWidth > 320) {
  isCheckPoint768 = false;
  isCheckPoint320 = true;
  maxCountPage = 8;
  maxCountItems = 6;
  initIndexes = makeArrPages(maxCountPage, maxCountItems);
} else if (screenWidth <= 320) {
  isCheckPoint768 = true;
  isCheckPoint320 = false;
  maxCountPage = 16;
  maxCountItems = 3;
  initIndexes = makeArrPages(maxCountPage, maxCountItems);
}

window.addEventListener("resize", changeViewPage);

function changeViewPage() {
  width = window.screen.width;

  if (width > 768 && !isCheckPoint768) {
    isCheckPoint768 = true;
    isCheckPoint320 = true;
    maxCountPage = 6;
    maxCountItems = 8;
    doc
      .querySelectorAll(".pets__item")
      .forEach((el) => containerPets.removeChild(el));
    initIndexes = makeArrPages(maxCountPage, maxCountItems);
    initIndexes[0].forEach((index) => createPage(index));

    countPage = 1;
    countPageBtn.textContent = countPage;
    btnRight.classList.remove("disabled");
    btnRightLastPage.classList.remove("disabled");
    btnLeft.classList.add("disabled");
    btnLeftStartPage.classList.add("disabled");
  }

  if (width <= 768 && width > 320 && isCheckPoint768) {
    isCheckPoint768 = false;
    isCheckPoint320 = true;
    maxCountPage = 8;
    maxCountItems = 6;
    doc
      .querySelectorAll(".pets__item")
      .forEach((el) => containerPets.removeChild(el));
    initIndexes = makeArrPages(maxCountPage, maxCountItems);
    initIndexes[0].forEach((index) => createPage(index));

    countPage = 1;
    countPageBtn.textContent = countPage;
    btnRight.classList.remove("disabled");
    btnRightLastPage.classList.remove("disabled");
    btnLeft.classList.add("disabled");
    btnLeftStartPage.classList.add("disabled");
  } else if (width <= 320 && isCheckPoint320) {
    isCheckPoint768 = true;
    isCheckPoint320 = false;
    maxCountPage = 16;
    maxCountItems = 3;
    doc
      .querySelectorAll(".pets__item")
      .forEach((el) => containerPets.removeChild(el));
    initIndexes = makeArrPages(maxCountPage, maxCountItems);
    initIndexes[0].forEach((index) => createPage(index));

    countPage = 1;
    countPageBtn.textContent = countPage;
    btnRight.classList.remove("disabled");
    btnRightLastPage.classList.remove("disabled");
    btnLeft.classList.add("disabled");
    btnLeftStartPage.classList.add("disabled");
  }
}

initIndexes[0].forEach((index) => createPage(index));

btnRight.addEventListener("click", nextPage);
btnRightLastPage.addEventListener("click", renderFinishPage);
btnLeft.addEventListener("click", prevPage);
btnLeftStartPage.addEventListener("click", renderStartPage);

function createPage(index) {
  const petItem = doc.createElement("div");
  petItem.className = "pets__item";

  const img = doc.createElement("img");
  img.className = "pets__photo";
  img.src = pets[index].img;
  img.alt = pets[index].name;
  petItem.appendChild(img);

  const namePet = doc.createElement("h3");
  namePet.className = "pets__name";
  namePet.textContent = pets[index].name;
  petItem.appendChild(namePet);

  const button = doc.createElement("button");
  button.className = "pets__btn";
  button.textContent = "Learn more";
  petItem.appendChild(button);

  containerPets.appendChild(petItem);
}

function makeArrPages(pages, items) {
  let arrPages = [];
  let arrItems = [];
  let arrRandomItems = [];

  while (arrPages.length < pages) {
    arrItems.length = 0;

    while (arrItems.length < items) {
      if (arrRandomItems.length === 0) {
        arrRandomItems = makeArrRandomItems(pets.length);
      }
      let item = arrRandomItems.pop();
      let isItem = arrItems.includes(item);
      if (!isItem) arrItems.push(item);
      else arrRandomItems.unshift(item);
    }
    let itms = [];
    itms = [...arrItems];
    arrPages.push(itms);
  }
  return arrPages;
}

function makeArrRandomItems(n) {
  let arr = [];
  while (arr.length < n) {
    const item = Math.floor(Math.random() * 8);
    const isItem = arr.includes(item);
    if (!isItem) arr.push(item);
  }
  return arr;
}

function nextPage() {
  if (countPage >= maxCountPage) return;

  doc
    .querySelectorAll(".pets__item")
    .forEach((el) => containerPets.removeChild(el));

  countPage++;
  countPageBtn.textContent = countPage;

  btnLeft.classList.remove("disabled");
  btnLeftStartPage.classList.remove("disabled");

  if (countPage === maxCountPage) {
    btnRight.classList.add("disabled");
    btnRightLastPage.classList.add("disabled");
  } else {
    btnRight.classList.remove("disabled");
    btnRightLastPage.classList.remove("disabled");
  }

  initIndexes[countPage - 1].forEach((index) => createPage(index));
}

function renderFinishPage() {
  doc
    .querySelectorAll(".pets__item")
    .forEach((el) => containerPets.removeChild(el));

  countPage = maxCountPage;
  countPageBtn.textContent = countPage;

  btnLeft.classList.remove("disabled");
  btnLeftStartPage.classList.remove("disabled");
  btnRight.classList.add("disabled");
  btnRightLastPage.classList.add("disabled");

  initIndexes[countPage - 1].forEach((index) => createPage(index));
}

function prevPage() {
  if (countPage <= 1) return;

  doc
    .querySelectorAll(".pets__item")
    .forEach((el) => containerPets.removeChild(el));

  countPage--;
  countPageBtn.textContent = countPage;

  btnRight.classList.remove("disabled");
  btnRightLastPage.classList.remove("disabled");

  if (countPage === 1) {
    btnLeft.classList.add("disabled");
    btnLeftStartPage.classList.add("disabled");
  } else {
    btnLeft.classList.remove("disabled");
    btnLeftStartPage.classList.remove("disabled");
  }

  initIndexes[countPage - 1].forEach((index) => createPage(index));
}

function renderStartPage() {
  doc
    .querySelectorAll(".pets__item")
    .forEach((el) => containerPets.removeChild(el));

  countPage = 1;
  countPageBtn.textContent = countPage;

  btnLeft.classList.add("disabled");
  btnLeftStartPage.classList.add("disabled");
  btnRight.classList.remove("disabled");
  btnRightLastPage.classList.remove("disabled");

  initIndexes[countPage - 1].forEach((index) => createPage(index));
}