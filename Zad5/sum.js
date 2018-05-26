"use strict"

function sum() {
    if (arguments.length  === 0){
        return 'Ilosc arguemntow powinna by wieksza niz 0'
    }
    let result = 0;
    for (var i=0; i < arguments.length; i++) {
        result+= arguments[i];
    }
    return result;
}