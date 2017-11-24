'use strict';


// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');


var fragment = document.createDocumentFragment();

// Функция вывода случайного индекса массива.
// Принимает длинну массива
function randomNumber(min, max) {
  return Math.floor((min + Math.random() * (max + 1 - min)));
}

function randomFeatures(lenght) {
  var line = '';

  for (var i = 0; i < lenght; i++) {
    var line = line + FEATURES[i];
  }

  return line;
}

// Функция отрисовки одного волшебника
// Принимает объект
/*
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}*/

// Заполненение массива объектами
function fillArrWizards(Count) {
  var ADDRESS  = ['Большая уютная квартира', 'Маленькая неуютная квартира',
                  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
                  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
                  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTO = [];

  for (var i = 0; i < Count; i++) {
    wizards.push({
      author: {
        avatar : 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title : ADDRESS[randomNumber(1, ADDRESS.length)],
        address : location.x + ' ' + location.y,
        price : randomNumber(1000, 1000000),
        type : TYPE[randomNumber(1, TYPE.length)],
        rooms : randomNumber(1000, 5),
        guests : randomNumber(1, 3),
        checkin : CHECKIN[randomNumber(1, CHECKIN.length)],
        checkout : CHECKOUT[randomNumber(1, CHECKOUT.length)],
        features : randomFeatures(1, FEATURES.length),
        description : '',
        photos : PHOTO
      },
      location: {
        x : randomNumber(300, 900),
        y : randomNumber(100, 500)
      }
    });
  }

  return wizards;
}

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
