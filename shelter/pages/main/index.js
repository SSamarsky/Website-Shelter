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

// Slider
const slider = doc.querySelector(".slider__inner");
const btnLeft = doc.querySelector(".slider__btn-left");
const btnRight = doc.querySelector(".slider__btn-right");
const popup = doc.querySelector('.popup');
const popupBg = doc.querySelector('.popup__bg');


let itemsSlider = [];
itemsSlider.push(makeArrItems(3));

itemsSlider[0].forEach((el) => createItem(el));

function makeArrItems(n, trend = undefined) {
  let arr = [];
  while (arr.length < n) {
    const item = Math.floor(Math.random() * 8);
    const isItemInArr = arr.includes(item);
    let isItemInSlider = false;
    if (trend === "right" && itemsSlider.at(-1) !== undefined) {
      isItemInSlider = itemsSlider.at(-1).includes(item);
    } else if (trend === "left" && itemsSlider[0] !== undefined) {
      isItemInSlider = itemsSlider[0].includes(item);
    }
    if (!isItemInArr && !isItemInSlider) arr.push(item);
  }
  return arr;
}

function createItem(index, trend = undefined) {
  const petItem = doc.createElement("div");
  petItem.className = "pets__item";
  petItem.innerHTML = index;

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

  if (trend === "right") {
    slider.prepend(petItem);
  } else {
    slider.appendChild(petItem);
  }

  petItem.addEventListener('click', togglePopup);
  petItem.addEventListener('click', () => textPopup(index));
}

function clickSlideRight(n) {
  let newArrItems = [];

  newArrItems = makeArrItems(n, "right");
  itemsSlider.push(newArrItems);

  newArrItems.forEach((el) => createItem(el, "right"));

  let items = doc.querySelectorAll(".pets__item");

  items.forEach((el) => {
    el.classList.add("left");
    el.style.right = 0;
  });

  setTimeout(() => {
    items.forEach((el) => el.classList.remove("left"));
    toggleDisableBtns(false);
  }, 1000);

  if (itemsSlider.length > 2) {
    itemsSlider.shift();
    items.forEach((el, i) => {
      if (i > 6) el.remove("div");
    });
  }

  toggleDisableBtns(true);
}

function clickSlideLeft(n) {
  let newArrItems = [];

  newArrItems = makeArrItems(n, "left");
  itemsSlider.unshift(newArrItems);

  newArrItems.forEach((el) => createItem(el));

  let items = doc.querySelectorAll(".pets__item");

  items.forEach((el) => {
    el.classList.add("right");
    el.style.right = "1100px";
  });

  setTimeout(() => {
    items.forEach((el) => el.classList.remove("right"));
    toggleDisableBtns(false);
  }, 1000);

  if (itemsSlider.length > 2) {
    itemsSlider.pop();
    items.forEach((el, i) => {
      if (i < 3) el.remove("div");
    });
  }

  toggleDisableBtns(true);
}

function toggleDisableBtns(flag) {
  if (flag) {
    btnRight.disabled = true;
    btnLeft.disabled = true;
    btnRight.classList.add("disabled");
    btnLeft.classList.add("disabled");
  } else if (!flag) {
    btnRight.disabled = false;
    btnLeft.disabled = false;
    btnRight.classList.remove("disabled");
    btnLeft.classList.remove("disabled");
  }
}

btnRight.addEventListener("click", () => clickSlideRight(3));
btnLeft.addEventListener("click", () => clickSlideLeft(3));


//Popup

function togglePopup() {
  popup.classList.toggle("active");
  popupBg.classList.toggle("active");
  body.classList.toggle("active");
}

const popupBtn = document.querySelector(".popup__btn");

popupBtn.addEventListener("click", togglePopup);

document.addEventListener("click", (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove("active");
    popup.classList.remove("active");
    body.classList.toggle("active");
  }
});

function textPopup(index) {
  popup.querySelector(".popup__name").textContent = pets[index].name;
  popup.querySelector(".popup__breed").textContent = `${pets[index].type} - ${pets[index].breed}`
  popup.querySelector(".popup__text").textContent = pets[index].description;
  popup.querySelector(
    ".popup__photo"
  ).style.backgroundImage = `url(../../assets/images/pets/${pets[index].name}.png)`;
  popup.querySelector("#pet__age").textContent = pets[index].age;
  popup.querySelector("#pet__inoculations").textContent =pets[index].inoculations;
  popup.querySelector("#pet__diseases").textContent = pets[index].diseases;
  popup.querySelector("#pet__parasites").textContent = pets[index].parasites;
}