(function(){
  'use strict'

  function DOM(nodes) {
    if(!(this instanceof DOM))
      return new DOM(nodes)

    this.element = document.querySelectorAll(nodes);
    if (this.element.length === 1)
      return this.get()
  }

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element, function (item) {
      item.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element, function (item) {
      item.removeEventListener(event, callback, false);
    });
  };

  DOM.prototype.get = function get(index) {
    if (!index)
      return this.element[0];
    return this.element[index]
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.forEach2 = function forEach() {
    return Array.prototype.forEach.call(this.element, function(item) {
      console.log(item.firstChild.nodeValue)
    });
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments)
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.call(this.element, function(item) {
      console.log(item.firstChild.nodeValue)
    });
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.call(this.element, function(item) {
      console.log(item.firstChild.nodeValue)
    });
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.call(this.element, function(item) {
      console.log(item.firstChild.nodeValue)
    });
  };

  DOM.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  DOM.isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  DOM.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  }

  DOM.isNumber = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
  }

  DOM.isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
  }

  DOM.isBoolean = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]'
  }

  DOM.isNull = function(obj) {
    return obj === null || obj === undefined
  }

  function universalCallback(event) {
    event.preventDefault();
    console.log("Clicou");
  }

  window.DOM = DOM


})()
