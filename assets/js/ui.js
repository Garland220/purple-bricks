;(function() {
  'use strict';

  window.includes = function(value, arr) {
    return arr.some(function(value2) {
      return value === value2;
    });
  };

  window.toThousands = function(number) {
    return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,');
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

      this.value = window.toThousands(input);
  };

  window.collapseSection = function(target) {
    var parent = target.parentElement.parentElement.parentElement;
    var sibling = parent.nextElementSibling;

    sibling.style.display = 'none';
    target.className += ' hidden';
    target.innerHTML = 'show <i class="fa fa-chevron-down" aria-hidden="true"></i>';
    parent.className = '';
  };

  window.showSection = function(target) {
    var parent = target.parentElement.parentElement.parentElement;
    var sibling = parent.nextElementSibling;

    sibling.style.display = 'block';
    target.className = target.className.replace(' hidden', '');
    target.innerHTML = 'hide <i class="fa fa-chevron-up" aria-hidden="true"></i>';
    parent.className = 'title';
  };

  window.toggleSection = function(e) {
    var target = e.target;

    if (target.className.indexOf('hidden') > -1) {
      window.showSection(target);
    }
    else {
      window.collapseSection(target);
    }
  };

  window.addEventListener('load', function() {
    var inputs = document.querySelectorAll('input.text'),
        hiders = document.querySelectorAll('.toggle');

    for (var i=0; i<inputs.length; i+=1) {
      inputs[i].addEventListener('keyup', window.formatNumber);
    }
    for (var i=0; i<hiders.length; i+=1) {
      hiders[i].addEventListener('click', window.toggleSection);
    }

    // flexibility(document.body);
  });

})();