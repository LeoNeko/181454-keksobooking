'use strict';

var RentaCount = 8;
var RentaArr = [];

// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// Вставка плашек в map__pins
var similarListElement = userDialog.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarDescriptionTemplate = document.querySelector('template').content.querySelector('.map__card');

var fragment = document.createDocumentFragment();
var fragmentDes = document.createDocumentFragment();

// Функция вывода случайного индекса массива.
// Принимает длинну массива
function randomNumber(min, max) {
  return Math.floor((min + Math.random() * (max + 1 - min)));
}

function randomFeatures(lenght, arr) {
  var lines = '';

  for (var i = 0; i < lenght; i++) {
    lines = lines + arr[i];
  }

  return lines;
}

// Функция отрисовки плашки одного пункта о съеме
// Принимает объект
function renderRented(renta) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'top:' + renta.location.y + 'px;' + 'left:' + renta.location.x + 'px;');
  pinElement.querySelector('img').src = renta.author.avatar;
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
  desElement.querySelector('h4').textContent = renta.offer.type;
  desElement.getElementsByTagName('p')[2].textContent = renta.offer.rooms + ' для ' + renta.offer.guests;
  desElement.getElementsByTagName('p')[3].textContent = 'Заезд после' + renta.offer.checkin + ', выезд до ' + renta.offer.checkout;
  desElement.setAttribute('style', 'top:' + renta.location.y + 'px;' + 'left:' + renta.location.x + 'px;');
  desElement.querySelector('img').src = renta.author.avatar;
  return desElement;
}

// Заполненение массива объектами
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

  for (var i = 1; i < Count; i++) {
    RentaArr.push({
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
    });
  }

  return RentaArr;
}

fillRented(RentaCount);

// Цикл заполнения
for (var i = 0; i < RentaArr.length; i++) {
  fragment.appendChild(renderRented(RentaArr[i]));
}

fragmentDes.appendChild(renderRentedDescription(RentaArr[0]));

similarListElement.appendChild(fragment);
userDialog.insertBefore(fragmentDes, userDialog.children[0]);
