'use strict';

(function () {
  // var rentaArr = [];
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
  /*
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
*/
  // Функция заполнения поля features
  // Принимает длиннц массива и сам массив
  // Возращает массив индексов
  /*
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
*/

  function fuateresParser(arr) {
    var dumbArr = '';
    for (var i = 0; i < arr.length; i++) {
      dumbArr = dumbArr + '<li class="feature feature--' + arr[i] + '"></li>';
    }
    return dumbArr;
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

    desElement.querySelector('img').src = renta.author.avatar;
    desElement.querySelector('h3').textContent = renta.offer.title;
    desElement.querySelector('small').textContent = renta.offer.address;
    desElement.querySelector('.popup__price').textContent = renta.offer.price + '₽/ночь';
    desElement.querySelector('.popup__features').innerHTML = fuateresParser(renta.offer.features);
    desElement.querySelector('h4').textContent = renta.offer.type;
    desElement.getElementsByTagName('p')[2].textContent = renta.offer.rooms + ' для ' + renta.offer.guests;
    desElement.getElementsByTagName('p')[3].textContent = 'Заезд после ' + renta.offer.checkin + ', выезд до ' + renta.offer.checkout;
    desElement.getElementsByTagName('p')[4].textContent = renta.offer.description;
    return desElement;
  }

  window.renderRentedDescription = renderRentedDescription;
})();
