'use strict';


   function cached(c, fun) {
    
	 var recur = function(n) {
          if (c.length > n && n >= 0) {
            return c[n];
        }

        if (n === 0) {
            return 0;
        }
        if (n === 1) {
            return 1;
        }
        if (n > 0) {
            return fun(recur, n);
        }
    };
    
    return recur;
}


var fibonacci = cached([0, 1], function(recur, n) {
    return recur(n - 1) + recur(n - 2);
});

var factorial = cached([1], function (recur, n) {
    return recur(n - 1) *n;
});
