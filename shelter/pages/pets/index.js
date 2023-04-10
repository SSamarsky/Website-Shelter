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

const popup = doc.querySelector(".popup");
const popupBg = doc.querySelector(".popup__bg");

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

  petItem.addEventListener("click", togglePopup);
  petItem.addEventListener("click", () => textPopup(index));
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
  popup.querySelector(
    ".popup__breed"
  ).textContent = `${pets[index].type} - ${pets[index].breed}`;
  popup.querySelector(".popup__text").textContent = pets[index].description;
  popup.querySelector(
    ".popup__photo"
  ).style.backgroundImage = `url(../../assets/images/pets/${pets[index].name}.png)`;
  popup.querySelector("#pet__age").textContent = pets[index].age;
  popup.querySelector("#pet__inoculations").textContent =
    pets[index].inoculations;
  popup.querySelector("#pet__diseases").textContent = pets[index].diseases;
  popup.querySelector("#pet__parasites").textContent = pets[index].parasites;
}



console.log(`Ваша оценка - 98 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px) 

2) сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного 

3) при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования) 

Выполненные пункты:
1) при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка 

2) при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов 

3) высота адаптивного меню занимает всю высоту экрана 

4) при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно 

5) бургер-иконка создана при помощи html+css, без использования изображений 

6) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню 

7) при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно 

8) расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая 

9) область, свободная от бургер-меню, затемняется 

10) страница под бургер-меню не прокручивается 

11) при нажатии на стрелки происходит переход к новому блоку элементов 

12) смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется) 

13) слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек 

14) в текущем блоке слайда карточки с питомцами не повторяются 

15) в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде 

16) при каждой перезагрузке страницы формируется новая последовательность карточек 

17) генерация наборов карточек происходит на основе 8 объектов с данными о животными 

18) при перезагрузке страницы всегда открывается первая страница пагинации 

19) при нажатии кнопок '>' или '<' открывается следующая или предыдущая страница пагинации соответственно 

20) при нажатии кнопок '>>' или '<<' открывается последняя или первая страница пагинации соответственно 

21) при открытии первой страницы кнопки '<<' и '<' неактивны 

22) при открытии последней страницы кнопки '>' и '>>' неактивны 

23) в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный 

24) при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз 

25) при каждой перезагрузке страницы формируется новый массив со случайной последовательностью 

26) карточки питомцев не должны повторяться на одной странице 

27) при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек) 

28) при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы 

29) общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц 

30) при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации) 

31) попап появляется при нажатии на любое место карточки с описанием конкретного животного 

32) часть страницы вне попапа затемняется 

33) при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным 

34) при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит 

35) кнопка с крестиком интерактивная 

36) окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом 

`)