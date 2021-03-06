'use strict';

(function () {
  var userDialog = document.querySelector('.map');

  var fragmentDes = document.createDocumentFragment();

  /* ---------------------------------------------------------------------------
  * Устанавливает логику обработки события открытия окна
  *
  * @param {Object} - объект события
  */

  var CLICK_KEY = 0;
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  function dialogCanOpen(event) {
    return event.button === CLICK_KEY || event.keyCode === ENTER_KEY;
  }

  /* ---------------------------------------------------------------------------
  * Обработчик события открытия диалогового окна
  *
  * @param {Object} - объект события
  */
  function dialogOpenHandler(event, rentaArr) {
    var pin = event.currentTarget;
    var adNumber = 0;
    var MAX_ELEMENTS = 5;
    var allPins = pin.parentNode.querySelectorAll('.map__pin--active');
    var activePinAlredy = userDialog.querySelector('.map__card');
    var mapPinSelectorActive = document.querySelectorAll('.map__pin');

    // удаляем старый элемент, если он не был закрыт вручную
    if (activePinAlredy) {
      userDialog.removeChild(userDialog.children[0]);
    }

    if (dialogCanOpen(event)) {
      window.makePinsInactive(allPins);
      window.makePinActive(pin);

      // Ищем элемент на котором сработало событие
      for (var i = 0; i <= MAX_ELEMENTS; i++) {
        if (mapPinSelectorActive[i].getAttribute('class') === 'map__pin map__pin--active') {
          adNumber = i - 1;
          break;
        }
      }

      // Вставка элемента в макет
      fragmentDes.appendChild(window.renderRentedDescription(rentaArr[adNumber]));
      userDialog.insertBefore(fragmentDes, userDialog.children[0]);
      dialogClosePopup();
    }
  }

  window.dialogOpenHandler = dialogOpenHandler;

  /* ---------------------------------------------------------------------------
  * Обработчик события закрытия окна попапа, при нажатии
  * на закрывающий элемент, либо с клавиатуры
  * @param ничего не принимает
  */

  function dialogClosePopup() {
    var popupElementFind = document.querySelector('.popup__close');
    var allPins = document.querySelectorAll('.map__pin');

    popupElementFind.addEventListener('click', function (evt) {
      keydownClickClosePopup(evt, allPins);
    });

    userDialog.addEventListener('keydown', function (evt) {
      keydownEscClosePopup(evt, allPins);
    });
  }

  /* -------------------------------------------------------------------------
  *
  * Отлавливает закрытие на клип по элементу закрытия
  *
  */
  function keydownClickClosePopup(event, allPins) {
    var popup = userDialog.querySelector('.popup');
    if (event.button === CLICK_KEY || event.keyCode === ENTER_KEY) {
      userDialog.removeChild(popup);
    }
    window.makePinsInactive(allPins);
  }

  /* --------------------------------------------------------------------------
  * Отлавливает закрытие на ESC
  *
  */
  function keydownEscClosePopup(event, allPins) {
    if (event.keyCode === ESC_KEY) {
      var popup = userDialog.querySelector('.popup');
      if (popup) {
        userDialog.removeChild(popup);
        window.makePinsInactive(allPins);
      }
    }
  }
})();
