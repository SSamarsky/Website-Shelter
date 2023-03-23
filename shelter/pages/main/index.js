// console.log(`
// Моя оценка - 94 баллов
// Отзыв по пунктам ТЗ:
// Не выполненные/не засчитанные пункты:
// 1) при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px) 

// 2) сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного 

// Выполненные пункты:
// 1) при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка 

// 2) при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов 

// 3) высота адаптивного меню занимает всю высоту экрана 

// 4) при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно 

// 5) бургер-иконка создана при помощи html+css, без использования изображений 

// 6) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню 

// 7) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно 

// 8) бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки и дублирующего лого). При этом на странице 'Pets' цветовая схема может быть как темная, так и светлая 

// 9) область, свободная от бургер-меню, затемняется 

// 10) страница под бургер-меню не прокручивается 

// 11) при нажатии на стрелки происходит переход к новому блоку элементов 

// 12) смена блоков происходит с соответствующей анимацией карусели 

// 13) слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет приходить новый набор элементов 

// 14) в текущем блоке слайда карточки с питомцами не повторяются 

// 15) в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде 

// 16) при каждой перезагрузке страницы формируется новая последовательность карточек 

// 17) генерация наборов карточек происходит на основе 8 объектов с данными о животными 

// 18) при перезагрузке страницы всегда открывается первая страница пагинации 

// 19) при нажатии кнопок '>' или '<' открывается следующая или предыдущая страница пагинации соответственно 

// 20) при нажатии кнопок '>>' или '<<' открывается последняя или первая страница пагинации соответственно 

// 21) при открытии первой страницы кнопки '<<' и '<' неактивны 

// 22) при открытии последней страницы кнопки '>' и '>>' неактивны 

// 23) в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный 

// 24) при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз 

// 25) при каждой перезагрузке страницы формируется новый массив со случайной последовательностью 

// 26) карточки питомцев не должны повторяться на одной странице 

// 27) при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек) 

// 28) при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы 

// 29) общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц 

// 30) попап появляется при нажатии на любое место карточки с описанием конкретного животного 

// 31) часть страницы вне попапа затемняется 

// 32) при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным 

// 33) при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит 

// 34) кнопка с крестиком интерактивная 

// 35) окно попапа (не считая кнопку с крестиком) центрировано по всем осям, стилизация визуально совпадает с макетом 


// `);

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

const slider = doc.querySelector('.slider__inner');
const btnLeft = doc.querySelector('.slider__btn-left');
const btnRight = doc.querySelector('.slider__btn-right');

let rightState = [];
let leftState = [];

let itemsSlider = [];
itemsSlider.push(makeArrItems(3))

itemsSlider[0].forEach(el => createItem(el))

function makeArrItems(n, trend = undefined) {
  let arr = [];
  while (arr.length < n) {
    const item = Math.floor(Math.random() * 8);
    const isItemInArr = arr.includes(item);
    let isItemInSlider = false;
    if (trend === 'right' && itemsSlider.at(-1) !== undefined) {
      isItemInSlider = itemsSlider.at(-1).includes(item);
    } else if (trend === 'left' && itemsSlider[0] !== undefined) {
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

  if (trend === 'right') {
    slider.prepend(petItem)
  } else {
    slider.appendChild(petItem);
  }
}


function clickSlideRight(n) {
  let newArrItems = [];

  newArrItems = makeArrItems(n, 'right');
  itemsSlider.push(newArrItems);

  newArrItems.forEach(el => createItem(el, 'right'));

  let items = doc.querySelectorAll('.pets__item');

  items.forEach(el => {
    el.classList.add('left');
    el.style.right = 0;
  });

  setTimeout(() => {
    items.forEach(el => el.classList.remove('left'))
  }, 1000);

  if (itemsSlider.length > 2) {
    itemsSlider.shift();
    items.forEach((el, i) => {
      if (i > 6) el.remove('div')
    });

  }
}

function clickSlideLeft(n) {
  let newArrItems = [];
  newArrItems = makeArrItems(n, 'left');
  itemsSlider.unshift(newArrItems);

  newArrItems.forEach(el => createItem(el));

  let items = doc.querySelectorAll('.pets__item');

  items.forEach(el => {
    el.classList.add('right');
    el.style.right = '1100px';
  });

  setTimeout(() => {
    items.forEach(el => el.classList.remove('right'))
  }, 1000);

  if (itemsSlider.length > 2) {
      itemsSlider.pop();
      items.forEach((el, i) => {
        if (i < 3) el.remove('div')
    });
  }
}

btnRight.addEventListener('click', () => clickSlideRight(3));
btnLeft.addEventListener('click', () => clickSlideLeft(3));