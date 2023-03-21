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
const pets = [
  {
    name: "Jennifer",
    img: "../../assets/images/pets/Jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Sophia",
    img: "../../assets/images/pets/Sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Woody",
    img: "../../assets/images/pets/Woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    name: "Scarlett",
    img: "../../assets/images/pets/Scarlett.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Katrine",
    img: "../../assets/images/pets/Katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Timmy",
    img: "../../assets/images/pets/Timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    name: "Freddie",
    img: "../../assets/images/pets/Freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Charly",
    img: "../../assets/images/pets/Charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
];

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