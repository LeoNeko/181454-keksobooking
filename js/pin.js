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

  /* ----------------------------------------------------------------------------
  *
  * Отслеживает перемещение главного пина объявления пользователя
  * @param no
  */
  var pinMainElement = document.querySelector('.map__pin--main');

  pinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    pinMainElement.style.zIndex = '999';

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var borderCoords = {
      x1: 20,
      x2: 1180,
      y1: 100,
      y2: 500
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainElement.style.top = (pinMainElement.offsetTop - shift.y) + 'px';
      pinMainElement.style.left = (pinMainElement.offsetLeft - shift.x) + 'px';

      if (pinMainElement.offsetTop - shift.y < borderCoords.y1) {
        pinMainElement.style.top = borderCoords.y1 + 'px';
      } else if (pinMainElement.offsetTop - shift.y > borderCoords.y2) {
        pinMainElement.style.top = borderCoords.y2 + 'px';
      } else if (pinMainElement.offsetLeft - shift.x < borderCoords.x1) {
        pinMainElement.style.left = borderCoords.x1 + 'px';
      } else if (pinMainElement.offsetLeft - shift.x > borderCoords.x2) {
        pinMainElement.style.left = borderCoords.x2 + 'px';
      }
      window.fillAdressInput(pinMainElement.style.top, pinMainElement.style.left);
    }

    function onMouseUp(event) {
      event.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
