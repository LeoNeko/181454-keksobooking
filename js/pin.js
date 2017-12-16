'use strict';

(function () {
  /* ---------------------------------------------------------------------------
  * Делает конкретную метку на карте активной
  *
  * @param {HTMLElement} - элемент-метка
  */
  function makePinActive(pin) {
    pin.classList.add('map__pin--active');
  }

  window.makePinActive = makePinActive;
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

  window.makePinsInactive = makePinsInactive;
})();
