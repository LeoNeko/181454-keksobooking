/* ---------------------------------------------------------------------
*
* ВАЛИДАЦИЯ ФОРМЫ
*
*/
'use strict';

(function () {

  var formElement = document.querySelector('.notice__form');

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
  * Заполнение поля адреса
  * @param {object} - объект с координатами главног опина
  */
  function fillAdressInput(x, y) {
    var elementAdress = formElement.querySelector('#address');
    elementAdress.value = 'y: ' + x + ', x: ' + y;
  }

  window.fillAdressInput = fillAdressInput;
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
    if (target.value < 0 || target.value === '') {
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
      if (!allInputs[i].validity.valid || !allInputs[i].validity.valueMissing) {
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

  var offerTypesTime = ['12:00', '13:00', '14:00'];

  function syncValuesTime(element, value) {
    element.value = value;
  }

  timein.addEventListener('change', function () {
    window.synchronizeFields(timein, timeout, offerTypesTime, offerTypesTime, syncValuesTime);
  });

  timeout.addEventListener('change', function () {
    window.synchronizeFields(timeout, timein, offerTypesTime, offerTypesTime, syncValuesTime);
  });

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
  // установка значения по умолчанию
  inputPrice.min = 1000;

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
  // Установка значения по умолчанию
  numberGuests.options.selectedIndex = 2;
  disabledOptionsGuests(numberGuests.options, '1');

  function disabledOptionsGuests(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      switch (value) {
        case '1':
          arr[0].disabled = 'disabled';
          arr[1].disabled = 'disabled';
          arr[2].disabled = '';
          arr[3].disabled = 'disabled';
          break;
        case '2':
          arr[0].disabled = 'disabled';
          arr[1].disabled = '';
          arr[2].disabled = '';
          arr[3].disabled = 'disabled';
          break;
        case '3':
          arr[0].disabled = '';
          arr[1].disabled = '';
          arr[2].disabled = '';
          arr[3].disabled = 'disabled';
          break;
        case '100':
          arr[0].disabled = 'disabled';
          arr[1].disabled = 'disabled';
          arr[2].disabled = 'disabled';
          arr[3].disabled = '';
          break;
      }
    }
  }

  var setNumberRooms = ['1', '2', '3', '100'];

  numberRooms.addEventListener('change', function () {
    window.synchronizeFields(numberRooms, numberGuests.options, setNumberRooms, setNumberRooms, disabledOptionsGuests);
  });
})();
