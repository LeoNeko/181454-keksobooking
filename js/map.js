'use strict';

// Число сдаваемых аппартаментов
var RentaCount = 8;
// Пустой массив для заполнения сдаваемых аппартаментов
var RentaArr = [];

// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');

var pinStart = document.querySelector('.map__pin--main');
var formElement = document.querySelector('.notice__form');
var formFieldsets = document.getElementsByClassName('form__element');
var similarListElement = userDialog.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// window.fillRented(RentaCount);

window.fieldsetsToggle(formFieldsets);

/*
* Собитие на плашке
* Отпустить нажатие мышки
*
*/

//
RentaArr = window.fillRented(RentaCount);

pinStart.addEventListener('mouseup', function () {
  userDialog.classList.remove('map--faded'); // Убрать затемнение с карты
  formElement.classList.remove('notice__form--disabled'); // Убрать затемнение с карты формы
  window.fieldsetsToggle(formFieldsets);

  // Цикл формирования разметки плашек
  for (var i = 0; i < RentaArr.length; i++) {
    fragment.appendChild(window.renderRented(RentaArr[i], RentaArr));
  }
  // отрисовка плашек похожих объявлений
  similarListElement.appendChild(fragment);

}
);

