'use strict';

(function () {

  function synchronizeFields(unchange, change, unchangeValues, changeValues, synchronize) {

    var unchangeValueIndex = unchangeValues.indexOf(unchange.value);
    var syncValue = changeValues[unchangeValueIndex];

    if (typeof synchronize === 'function') {
      synchronize(change, syncValue);
    }
  }

  window.synchronizeFields = synchronizeFields;
})();
