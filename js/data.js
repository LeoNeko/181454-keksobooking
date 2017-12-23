'use strict';

(function () {
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

  /*
  *
  * Формирует список фьючерсов для объявления
  * Принимаем массив ключей фьючерсов
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


  /*
  *
  * Отрисовка пинов при фильтрации
  * {arr} - массив булевых значений
  *
  */
  var NUMBER_RENDER = 5;

  function renderFilterApply(arrBools) {
    var unCgangeArr = window.xhr;
    var similarListElement = document.querySelector('.map__pins');
    var activePins = similarListElement.querySelectorAll('.map__pin');
    var fragment = document.createDocumentFragment();
    var nameLengths = unCgangeArr.reduce(function (accumulator, currentValue, index) {
      if (arrBools[index] === true) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    nameLengths.forEach( function(item, i) {
      if (i < NUMBER_RENDER) {
        fragment.appendChild(window.renderRented(nameLengths[i], nameLengths));
      }
    });

    for (var j = 0; j < activePins.length; j++) {
      if (j !== 0) {
        similarListElement.removeChild(activePins[j]);
      }
    }
    similarListElement.appendChild(fragment);
  }

  window.renderFilterApply = renderFilterApply;
})();
