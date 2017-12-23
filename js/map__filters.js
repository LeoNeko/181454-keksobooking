'use strict';

(function () {
  var MIN_PRICE_LOW = 10000;
  var MAX_PRICE_MIDDLE = 50000;

  function isOff(feature) {
    return feature === false;
  }

  function priceToString(price) {
    if (price < MIN_PRICE_LOW) {
      return 'low';
    } else if (price < MAX_PRICE_MIDDLE) {
      return 'middle';
    } else {
      return 'high';
    }
  }

  function filterProcess(selects, checkboxes) {
    var filterResult = [];
    var adList = window.xhr;

    adList.forEach(function (ad) {
      var allOptionsIsAny = Object.keys(selects).length === 0;
      var allCheckboxesUncheked = checkboxes.every(isOff);

      if (allOptionsIsAny && allCheckboxesUncheked) {
        filterResult.push(true);
      } else {
        var isSelectsPass = true;
        var adOptions = [];
        adOptions['housing-type'] = ad.offer.type;
        adOptions['housing-price'] = priceToString(ad.offer.price);
        adOptions['housing-rooms'] = ad.offer.rooms.toString();
        adOptions['housing-guests'] = ad.offer.guests.toString();

        for (var property in selects) {
          if (adOptions[property] !== selects[property]) {
            isSelectsPass = false;
          }
        }

        var isCheckboxesPass = true;
        var adFeatures = ad.offer.features.slice();

        checkboxes.forEach(function (feature) {
          if (!adFeatures.includes(feature)) {
            isCheckboxesPass = false;
          }
        });

        filterResult.push(isSelectsPass && isCheckboxesPass);
      }
    });

    return filterResult;
  }

  /* ---------------------------------------------------------------------------
   * Handler of the filters selects and checkboxes changing
   * @param {Object} - event object
   */
  function filtersChangeHandler(event) {
    var selects = event.currentTarget.querySelectorAll('select');
    var selectsValues = [];
    [].forEach.call(selects, function (select) {
      if (select.value !== 'any') {
        selectsValues[select.name] = select.value;
      }
    });

    var checkboxes = event.currentTarget.querySelectorAll('input');
    var checkboxesValues = [];
    [].forEach.call(checkboxes, function (checkbox) {
      if (checkbox.checked) {
        checkboxesValues.push(checkbox.value);
      }
    });

    var filters = filterProcess(selectsValues, checkboxesValues);

    window.debounce(function () {
      window.renderFilterApply(filters);
    });
  }

  window.filtersChangeHandler = filtersChangeHandler;

})();
