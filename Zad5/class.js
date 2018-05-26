"use strict"

var obj = {
    className: 'first bordered'
 };

 switchClassName(obj, 'chujCiWoko');
 switchClassName(obj, 'first');
 function switchClassName(obj, element) {
    if (obj.className.indexOf(element) > -1) {
        let splitedArray = obj.className.split(' ');
        let filteredArray = splitedArray.filter( record => record != element);
        return;
    }
    obj.className += ' ' + element;
 }

