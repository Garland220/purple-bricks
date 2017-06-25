;(function() {
  'use strict';

  window.purplebricks = {};

  purplebricks.ui = {
    includes: function(value, arr) {
      return arr.some(function(value2) {
        return value === value2;
      });
    },

    toThousands: function(number) {
      return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,');
    },

    formatNumber: function(e) {
      var input = this.value;

      if (window.getSelection().toString() !== '') {
        return;
      }
      if (purplebricks.ui.includes(e.keyCode, [38,40,37,39])) {
        return;
      }
      if (e.ctrlKey) {
        return;
      }

      input = input.replace(/[\D\s]+/g, '');
      input = input ? parseInt(input, 10) : 0;

      this.value = purplebricks.ui.toThousands(input);
    },

    collapseSection: function(target) {
      var parent = target.parentElement.parentElement.parentElement;

      target.innerHTML = 'show <i class="fa fa-chevron-down" aria-hidden="true"></i>';
      parent.className += ' toggled';
    },

    showSection: function(target) {
      var parent = target.parentElement.parentElement.parentElement;

      target.innerHTML = 'hide <i class="fa fa-chevron-up" aria-hidden="true"></i>';
      parent.className = parent.className.replace(' toggled', '');
    },

    toggleSection: function(e) {
      var target = e.target;
      var parent = target.parentElement.parentElement.parentElement;

      if (parent.className.indexOf('toggled') > -1) {
        purplebricks.ui.showSection(target);
      }
      else {
        purplebricks.ui.collapseSection(target);
      }
    },

    submitForm: function(e) {
      var target = e.target,
          input = document.querySelector('.text'),
          errors = document.querySelector('.errors'),
          value = 0;

      value = input.value;

      value = value.replace(/[\D\s]+/g, '');
      value = value ? parseInt(value, 10) : 0;

      errors.innerHTML = '';

      if (!!console) {
        console.log({'offer': value});
      }

      if (value === 0) {
        errors.innerHTML = '<div class="alert alert-danger fade in">Offer must be greater than zero</div>';
      }
      else {
        errors.innerHTML = '<div class="alert alert-success fade in">Submitted</div>';
      }
    }
  };

  window.addEventListener('load', function() {
    var inputs = document.querySelectorAll('input.text'),
        hiders = document.querySelectorAll('.toggle'),
        submit = document.querySelector('.submit');

    for (var i=0; i<inputs.length; i+=1) {
      inputs[i].addEventListener('keyup', purplebricks.ui.formatNumber);
    }
    for (var i=0; i<hiders.length; i+=1) {
      hiders[i].addEventListener('click', purplebricks.ui.toggleSection);
    }
    submit.addEventListener('click', purplebricks.ui.submitForm);
  });

})();