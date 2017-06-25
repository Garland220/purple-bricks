;(function() {
  'use strict';

  window.includes = function(value, arr) {
    return arr.some(function(value2) {
      return value === value2;
    });
  };

  window.formatNumber = function(e) {
      var input = this.value;

      if (window.getSelection().toString() !== '') {
        return;
      }
      if (window.includes(e.keyCode, [38,40,37,39])) {
        return;
      }
      if (e.ctrlKey) {
        return;
      }

      input = input.replace(/[\D\s]+/g, '');
      input = input ? parseInt(input, 10) : 0;

      this.value = input.toLocaleString('en-US');
  };

  window.addEventListener('load', function() {
    var inputs = document.querySelectorAll('input.text');

    for (var i=0; i<inputs.length; i+=1) {
      inputs[i].addEventListener('keyup', window.formatNumber);
    }
  });

})();