'use strict';
(function () {
  // Показывает скрытый блок карты
  var userDialog = document.querySelector('.map');

  var pinStart = document.querySelector('.map__pin--main');
  var formElement = document.querySelector('.notice__form');
  var formFieldsets = document.querySelector('.form__element');
  var form = document.querySelector('.notice__form');
  window.fieldsetsToggle(formFieldsets);

  /*
  * Собитие на плашке
  * Отпустить нажатие мышки
  *
  */
  function activeSitePageHandle() {
    var filterPanel = document.querySelector('.map__filters');

    userDialog.classList.remove('map--faded'); // Убрать затемнение с карты
    formElement.classList.remove('notice__form--disabled'); // Убрать затемнение с карты формы
    window.fieldsetsToggle(formFieldsets);

    // Загрузка данных с сервера
    window.backend.load(window.backend.errorHandler, window.backend.errorHandler);

    pinStart.removeEventListener('mouseup', activeSitePageHandle);

    // Вешается обработчик фильтров
    filterPanel.addEventListener('change', window.filtersChangeHandler);
  }


  pinStart.addEventListener('mouseup', activeSitePageHandle);

  /*
  * Слушает отправку формы, сбрасывает действия по умолчанию и делает то что надо
  *
  */
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.backend.errorHandler, window.backend.errorHandler);
    form.reset();
  });
})();

