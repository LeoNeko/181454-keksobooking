'use strict';

// Число сдаваемых аппартаментов
var RentaCount = 8;
// Пустой массив для заполнения сдаваемых аппартаментов
var RentaArr = [];

// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');

var pinStart = document.querySelector('.map__pin--main');
var formElement = document.querySelector('.notice__form');
var formFieldsets = document.getElementsByClassName('form__element');

/* ---------------------------------------------------------
 *  Принимает массив полей формы
 *
 *  Производит переключение свойства Disabled для всех полей
 *  формы, при вызове этой функции
 */
function fieldsetsToggle(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = !arr[i].disabled;
  }
}

fieldsetsToggle(formFieldsets);

// Вставка плашек в map__pins
var similarListElement = userDialog.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarDescriptionTemplate = document.querySelector('template').content.querySelector('.map__card');

var fragment = document.createDocumentFragment();
var fragmentDes = document.createDocumentFragment();

// Функция вывода случайного индекса массива.
// Принимает длинну массива
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция заполнения поля features
// Принимает длиннц массива и сам массив
// Возращает массив индексов
function randomFeatures(lenght, arr) {
  var lines = arr.slice();
  // var randomIndex = randomNumber(0, lenght);
  var tresh = [];
  var dumb = randomNumber(0, lenght);
  var counter = dumb;

  for (var i = 0; i <= dumb - 1; i++) {
    tresh.push(lines.indexOf(lines[randomNumber(0, counter)]));
    // lines.indexOf(lines.splice(counter, 1));
    // console.log(lines.splice(randomNumber(0, randomIndex), 1));
    counter--;
  }

  return tresh;
}

// Функция отрисовки плашки одного пункта о съеме
// Принимает объект
function renderRented(renta) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'top:' + renta.location.y + 'px;' + 'left:' + renta.location.x + 'px;');
  pinElement.querySelector('img').src = renta.author.avatar;

  pinElement.addEventListener('click', dialogOpenHandler);
  pinElement.addEventListener('keypress', dialogOpenHandler);

  return pinElement;
}

// Функция отрисовки описания одного пункта о съеме
// Принимает объект
function renderRentedDescription(renta) {
  var desElement = similarDescriptionTemplate.cloneNode(true);

  desElement.querySelector('h3').textContent = renta.offer.title;
  desElement.querySelector('small').textContent = renta.location.x + ' ' + renta.location.y;
  desElement.querySelector('.popup__price').textContent = renta.offer.price + '₽/ночь';
  desElement.querySelector('h4').textContent = renta.offer.type;
  desElement.getElementsByTagName('p')[2].textContent = renta.offer.rooms + ' для ' + renta.offer.guests;
  desElement.getElementsByTagName('p')[3].textContent = 'Заезд после' + renta.offer.checkin + ', выезд до ' + renta.offer.checkout;
  desElement.querySelector('img').src = renta.author.avatar;
  return desElement;
}

// Заполненение массива объектами
// Принимает количество объектов
// Возвращает массив объектов
function fillRented(Count) {
  var ADDRESS = ['Большая уютная квартира', 'Маленькая неуютная квартира',
                 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
                 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
                 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTO = [];

  for (var i = 1; i <= Count; i++) {
    var newObject = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: ADDRESS[randomNumber(1, ADDRESS.length)],
        address: '',
        price: randomNumber(1000, 1000000),
        type: TYPE[randomNumber(1, TYPE.length)],
        rooms: randomNumber(1000, 5),
        guests: randomNumber(1, 3),
        checkin: CHECKIN[randomNumber(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[randomNumber(0, CHECKOUT.length - 1)],
        features: randomFeatures(FEATURES.length, FEATURES),
        description: '',
        photos: PHOTO
      },
      location: {
        x: randomNumber(300, 900),
        y: randomNumber(100, 500)
      }
    };

    RentaArr.push(newObject);
  }

  return RentaArr;
}

fillRented(RentaCount);

/*
* Собитие на плашке
* Отпустить нажатие мышки
*
*/
pinStart.addEventListener('mouseup', function () {
  userDialog.classList.remove('map--faded'); // Убрать затемнение с карты
  formElement.classList.remove('notice__form--disabled'); // Убрать затемнение с карты формы
  fieldsetsToggle(formFieldsets);

  // Цикл формирования разметки плашек
  for (var i = 0; i < RentaArr.length; i++) {
    fragment.appendChild(renderRented(RentaArr[i]));
  }
  // отрисовка плашек похожих объявлений
  similarListElement.appendChild(fragment);

}
);

/* ---------------------------------------------------------------------------
* Делает конкретную метку на карте активной
*
* @param {HTMLElement} - элемент-метка
*/
function makePinActive(pin) {
  pin.classList.add('map__pin--active');
}

/* ---------------------------------------------------------------------------
* Делает все метки на карте неактивными
*
* @param {NodeList} - набор элементов-меток
*/
function makePinsInactive(pinsNodeList) {
  [].forEach.call(pinsNodeList, function (pin) {
    pin.classList.remove('map__pin--active');
  });
}

/* ---------------------------------------------------------------------------
* Устанавливает логику обработки события открытия окна
*
* @param {Object} - объект события
*/
function dialogCanOpen(event) {
  return event.button === 0 || event.keyCode === 13;
}

/* ---------------------------------------------------------------------------
* Обработчик события открытия диалогового окна
*
* @param {Object} - объект события
*/
function dialogOpenHandler(event) {
  var pin = event.currentTarget;
  var adNumber = 0;
  var allPins = pin.parentNode.querySelectorAll('.map__pin--active');
  var activePinAlredy = userDialog.querySelector('.map__card');
  var mapPinSelectorActive = document.querySelectorAll('.map__pin');

  // удаляем старый элемент, если он не был закрыт вручную
  if (activePinAlredy) {
    userDialog.removeChild(userDialog.children[0]);
  }

  if (dialogCanOpen(event)) {
    makePinsInactive(allPins);
    makePinActive(pin);

    // Ищем элемент на котором сработало событие
    for (var i = 0; i <= RentaCount; i++) {
      if (mapPinSelectorActive[i].getAttribute('class') === 'map__pin map__pin--active') {
        adNumber = i - 1;
      }
    }
    // Вставка элемента в макет
    fragmentDes.appendChild(renderRentedDescription(RentaArr[adNumber]));
    userDialog.insertBefore(fragmentDes, userDialog.children[0]);
    dialogClosePopup();
  }
}

/* ---------------------------------------------------------------------------
* Обработчик события закрытия окна попапа, при нажатии
* на закрывающий элемент, либо с клавиатуры
* @param ничего не принимает
*/
function dialogClosePopup() {
  var popupElementFind = document.querySelector('.popup__close');

  popupElementFind.addEventListener('click', function (event) {
    if (event.button === 0 || event.keyCode === 13) {
      userDialog.removeChild(userDialog.children[0]);
    }
  });
}


/* ---------------------------------------------------------------------
*
* ВАЛИДАЦИЯ ФОРМЫ
*
*/

// Поле адресс
var inputAdress = formElement.querySelector('#address');
inputAdress.setAttribute('readonly', 'readonly');
inputAdress.setAttribute('required', 'required');

inputAdress.value = 'Здесь должен быть адресс';

// Поле названия
var inputTittle = formElement.querySelector('#title');
inputTittle.setAttribute('required', 'required');

// Поле цены
var inputPrice = formElement.querySelector('#price');
inputPrice.setAttribute('placeholder', '1000');

/* ---------------------------------------------------------------------------
*
* Валидация поля адресса
*/

inputAdress.addEventListener('input', function (evt) {
  var target = evt.target;
});

/* ---------------------------------------------------------------------------
*
* Валидация поля Заголовка объявления
*/
inputTittle.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Имя должно состоять минимум из 30-х символов');
  } else if (target.value.length > 100) {
    target.setCustomValidity('Имя должно состоять максимум из 100-х символов');
  } else {
    target.setCustomValidity('');
  }
});

/* ---------------------------------------------------------------------------
*
* Валидация поля цены
*/
inputPrice.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value < 0) {
    target.setAttribute('style', 'border: 2px solid red;');
    target.setCustomValidity('Сумма должна быть больше нуля');
  } else if (target.value > 1000000) {
    target.setAttribute('style', 'border: 2px solid red;');
    target.setCustomValidity('Да вы прифегели батюшка!');
  } else {
    target.setCustomValidity('');
  }
});

/* ----------------------------------------------------------------------------
*
* Проверка валидации перед отправкой данных на сервер
*
*/

var sendFormHandler = formElement.querySelector('.form__submit');

sendFormHandler.addEventListener('click', function () {
  var allInputs = formElement.querySelectorAll('input');

  for (var i = 0; i < allInputs.length; i++) {
    if (!allInputs[i].validity.valid) {
      allInputs[i].setAttribute('style', 'border: 2px solid red;');
    } else {
      allInputs[i].removeAttribute('style');
    }
  }
});

/* -----------------------------------------------------------------------------
*
* Согласование времени заезда и выезда
*
*/
var timein = formElement.querySelector('#timein');
var timeout = formElement.querySelector('#timeout');

function timeHandler(event) {
  if (event.target === timein) {
    timeout.value = event.target.value;
  } else {
    timein.value = event.target.value;
  }
}

timein.addEventListener('change', timeHandler);
timeout.addEventListener('change', timeHandler);

/* --------------------------------------------------------------------------
*
* Синхронизация типа жилья с минимальной ценой
*
*
*/
var offerTypesPrices = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var typeRent = document.querySelector('#type');

function apartmentTypeHandler(event) {
  inputPrice.min = offerTypesPrices[event.target.value];
}


typeRent.addEventListener('change', apartmentTypeHandler);

/* --------------------------------------------------------------------------
*
* Синхронизация количество комнат и количество гостей
*
*/

var numberRooms = document.querySelector('#room_number');
var numberGuests = document.querySelector('#capacity');

function roomsChangesHandler(event) {
  var number = event.target.options.selectedIndex;
  if (number === 0) {
    numberGuests.options.selectedIndex = 2;
  } else if (number === 1) {
    numberGuests.options.selectedIndex = 1;
  } else if (number === 2) {
    numberGuests.options.selectedIndex = 0;
  } else {
    numberGuests.options.selectedIndex = 3;
  }
}

numberRooms.addEventListener('change', roomsChangesHandler);
