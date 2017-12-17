'use strict';

(function () {
  var rentaCount = 8;
  var userDialog = document.querySelector('.map');

  var fragmentDes = document.createDocumentFragment();

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
  function dialogOpenHandler(event, rentaArr) {
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
      window.makePinsInactive(allPins);
      window.makePinActive(pin);

      // Ищем элемент на котором сработало событие
      for (var i = 0; i <= rentaCount; i++) {
        if (mapPinSelectorActive[i].getAttribute('class') === 'map__pin map__pin--active') {
          adNumber = i - 1;
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
    if (event.button === 0 || event.keyCode === 13) {
      userDialog.removeChild(popup);
    }
    window.makePinsInactive(allPins);
  }

  /* --------------------------------------------------------------------------
  * Отлавливает закрытие на ESC
  *
  */
  function keydownEscClosePopup(event, allPins) {
    if (event.keyCode === 27) {
      var popup = userDialog.querySelector('.popup');
      userDialog.removeChild(popup);
      window.makePinsInactive(allPins);
    }
  }
})();
