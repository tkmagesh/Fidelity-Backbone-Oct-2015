
function getPrimeFinder(){
    var cache = {};
    function isPrime(x){
        console.log("processing for ", x);
        if (x <= 3) return true;
        for(var i=2; i <= (x/2); i++)
            if (x % i === 0) return false;
        return true;
    }
    function checkPrime(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = isPrime(n);
        return cache[n];
    }
    return checkPrime;
}


function getAdder(){
    var cache = {};

    function add(x,y){
        console.log("processing ", x , " and ", y);
        return x + y;
    }

    return function(x,y){
        var key = x + "-" + y;
        if (typeof cache[key] === 'undefined')
            cache[key] = add(x,y);
        return cache[key];
    }
}

function memoize(fn){
    var cache = {};

    return function(){
        var key = JSON.stringify(arguments);;
        if (typeof cache[key] === 'undefined')
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

function memoize(fn, keyGenerator, comparer){
    var cache = {};

    function keyExists(key){
        for(var cacheKey in cache){
            if (comparer(cacheKey, key) === 0)
                return true;
        }
        return false;
    }
    return function(){
        var key = keyGenerator.apply(this, arguments);
        if (!keyExists(key))
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}
