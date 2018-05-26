'use strict';

String.prototype.erLik = function (text) {
    var str = this.replace(new RegExp('é|è|ê', 'g'), 'e');
        str = str.replace(new RegExp('É|È|Ê', 'g'), 'E');
        str = str.replace(new RegExp('ó|ò|ô', 'g'), 'o');
        str = str.replace(new RegExp('Ó|Ò|Ô', 'g'), 'O');
        str = str.replace(new RegExp('å', 'g'), 'aa');
        str = str.replace(new RegExp('Å', 'g'), 'Aa');
        str = str.replace(new RegExp('æ', 'g'), 'ae');
        str = str.replace(new RegExp('Æ', 'g'), 'Ae');
        str = str.replace(new RegExp('ø', 'g'), 'oe');
        str = str.replace(new RegExp('Ø', 'g'), 'Oe');
    
    return (str === text);    
};

var test = new String("bokmål");


