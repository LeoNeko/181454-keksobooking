'use strict';

// Число сдаваемых аппартаментов
// var rentaCount = 8;
// Пустой массив для заполнения сдаваемых аппартаментов
// var rentaArr = [];

// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');

var pinStart = document.querySelector('.map__pin--main');
var formElement = document.querySelector('.notice__form');
var formFieldsets = document.getElementsByClassName('form__element');
// var similarListElement = userDialog.querySelector('.map__pins');
// var fragment = document.createDocumentFragment();
var form = document.querySelector('.notice__form');
// window.fillRented(RentaCount);

window.fieldsetsToggle(formFieldsets);

/*
* Собитие на плашке
* Отпустить нажатие мышки
*
*/

//
// rentaArr = window.fillRented(rentaCount);
var onError = function (message) {
  console.error(message);
};

var onSuccess = function (data) {
  console.log(data);
};

function activeSitePageHandle() {
  userDialog.classList.remove('map--faded'); // Убрать затемнение с карты
  formElement.classList.remove('notice__form--disabled'); // Убрать затемнение с карты формы
  window.fieldsetsToggle(formFieldsets);

  // отрисовка плашек похожих объявлений
  // similarListElement.appendChild(fragment);

  // Загрузка данных с сервера
  window.backend.load(onSuccess, onError);

  pinStart.removeEventListener('mouseup', activeSitePageHandle);
}


pinStart.addEventListener('mouseup', activeSitePageHandle);


form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.save(new FormData(form), function () {
    userDialog.classList.add('hidden');
  }, window.backend.errorHandler);
  form.reset();
});
