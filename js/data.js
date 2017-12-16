'use strict';

(function () {
  var rentaArr = [];
  // var userDialog = document.querySelector('.map');
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

  window.fieldsetsToggle = fieldsetsToggle;

  // Вставка плашек в map__pins
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var similarDescriptionTemplate = document.querySelector('template').content.querySelector('.map__card');

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
  function renderRented(renta, arr) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.setAttribute('style', 'top:' + renta.location.y + 'px;' + 'left:' + renta.location.x + 'px;');
    pinElement.querySelector('img').src = renta.author.avatar;

    pinElement.addEventListener('click', function (evt) {
      window.dialogOpenHandler(evt, arr);
    });
    pinElement.addEventListener('keypress', function (evt) {
      window.dialogOpenHandler(evt, arr);
    });

    return pinElement;
  }

  window.renderRented = renderRented;

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

  window.renderRentedDescription = renderRentedDescription;

  // Заполненение массива объектами
  // Принимает количество объектов
  // Возвращает массив объектов
  window.fillRented = function (Count) {
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

      rentaArr.push(newObject);
    }

    return rentaArr;
  };
})();
