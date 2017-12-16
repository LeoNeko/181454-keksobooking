'use strict';

(function () {
  var RentaCount = 8;
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
  function dialogOpenHandler(event, RentaArr) {
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
      for (var i = 0; i <= RentaCount; i++) {
        if (mapPinSelectorActive[i].getAttribute('class') === 'map__pin map__pin--active') {
          adNumber = i - 1;
        }
      }
      // Вставка элемента в макет
      fragmentDes.appendChild(window.renderRentedDescription(RentaArr[adNumber]));
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

    popupElementFind.addEventListener('click', function (event) {
      if (event.button === 0 || event.keyCode === 13) {
        userDialog.removeChild(userDialog.children[0]);
      }
      window.makePinsInactive(allPins);
    });

    function keydownEscClosePopup(event) {
      if (event.keyCode === 27) {
        userDialog.removeChild(userDialog.children[0]);
        window.makePinsInactive(allPins);
        userDialog.removeEventListener('keydown', keydownEscClosePopup);
      }
    }

    userDialog.addEventListener('keydown', keydownEscClosePopup);
  }
})();
