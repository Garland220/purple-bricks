;(function() {
  'use strict';

  window.addEventListener('load', function() {
    var inputs = document.querySelectorAll('input.text');

    for (var i=0; i<inputs.length; i+=1) {
      inputs[i].addEventListener('keyup', function(e) {
        var input = this.value;

        input = input.replace(/[\D\s]+/g, '');
        input = input ? parseInt( input, 10 ) : 0;

        this.value = input.toLocaleString('en-US');
      });
    }
  });
})();