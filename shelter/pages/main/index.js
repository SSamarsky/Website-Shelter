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
const popup = doc.querySelector(".popup");
const popupBg = doc.querySelector(".popup__bg");

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

  petItem.addEventListener("click", togglePopup);
  petItem.addEventListener("click", () => textPopup(index));
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