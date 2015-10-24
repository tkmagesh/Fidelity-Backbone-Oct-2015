var products = [
    {id :5, name : "Pen", cost : 50, units : 60, category : 1},
    {id :8, name : "Hen", cost : 90, units : 70, category : 2},
    {id :4, name : "Ten", cost : 70, units : 50, category : 1},
    {id :9, name : "Den", cost : 60, units : 80, category : 2},
    {id :3, name : "Zen", cost : 80, units : 30, category : 1}
];

/*
sort - done
filter - done
all - done
any - done
min
max
avg
countBy
sum - done
aggregate - done
transform - done
groupBy -
*/

function describe(title, fn){
    console.group(title);
    fn()
    console.groupEnd();
}

describe("Default List", function(){
    console.table(products);
});


describe("Sorting", function(){
    describe("Default sorting [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++){
                    var left = products[i],
                        right = products[j];
                    if (left.id > right.id){
                        products[i] = products[j];
                        products[j] = left;
                    }
                }
        }
        sort();
        console.table(products);
    });
    describe("Any list by any attribute", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (left[attrName] > right[attrName]){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        describe("Products by cost", function(){
            sort(products, "cost")
            console.table(products);
        })
        describe("Products by units", function(){
            sort(products, "units")
            console.table(products);
        })
    })
    describe("Any list by anything", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (comparerFn(left, right) > 0){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        describe("Products by value [ cost * units ]", function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units;
                var p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByValue)
            console.table(products);
        });
    });
});

describe("Filter", function(){
    describe("Costly products [ cost > 50 ]", function(){
        function filterCostlyProducts(){
            var result = [];
            for(var i=0; i<products.length; i++)
                if (products[i].cost > 50)
                    result.push(products[i]);
            return result;
        }
        var costlyProducts= filterCostlyProducts();
        console.table(costlyProducts);
    });
    describe("Any list by any criteria", function(){
        function filter(list, predicate){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (predicate(list[i]))
                    result.push(list[i]);
            return result;
        }
        var cosltyProductPrdicate = function(product){
            return product.cost > 50;
        };
        describe("Costly products [cost > 50]", function(){
            var costlyProducts = filter(products, cosltyProductPrdicate);
            console.table(costlyProducts);
        });
        function negate(predicateFn){
            return function(){
                return !predicateFn.apply(this, arguments);
            };
        }
        describe("Affordable products [cost > 50]", function(){
           /* var affordableProductPrdicate = function(product){
                return product.cost <= 50;
            };*/
            /*var affordableProductPrdicate = function(product){
                return !cosltyProductPrdicate(product);
            };*/
            var affordableProductPredicate = negate(cosltyProductPrdicate);
            var affordableProducts = filter(products, affordableProductPredicate);
            console.table(affordableProducts);
        });
        var category1Prdicate = function(product){
                return product.category === 1;
            };
        describe("Category 1 products", function(){
            var category1Products = filter(products, category1Prdicate);
            console.table(category1Products);
        });
        describe("Non Category 1 products", function(){
            /*var nonCategory1Prdicate = function(product){
                return !category1Prdicate(product);
            }*/
            var nonCategory1Prdicate = negate(category1Prdicate);
            var nonCategory1Products = filter(products, nonCategory1Prdicate);
            console.table(nonCategory1Products);
        });

    });
});

describe("All", function(){
    function all(list, predicate){
        for(var i=0; i<list.length; i++)
            if (!predicate(list[i])) return false;
        return true;
    }
    var costlyProductPredicate = function(product){ return product.cost > 50 };
    console.log("Are all products costly ? ", all(products, costlyProductPredicate));
});

describe("Any", function(){
    function any(list, predicate){
        for(var i=0; i<list.length; i++)
            if (predicate(list[i])) return true;
        return false;
    }
    var costlyProductPredicate = function(product){ return product.cost > 50 };
    console.log("Are there Any costly products? ", any(products, costlyProductPredicate));
});

describe("Sum", function(){
    function sum(list, valueSelector){
        var result = 0;
        for(var i=0; i<list.length; i++){
            var value = valueSelector(list[i]);
            result += value;
        }
        return result;
    }
    console.log("Sum of stock ", sum(products, function(p){ return p.units; }));
    console.log("Overall stock value ", sum(products, function(p){ return p.cost * p.units ;}));
});

function aggregate(list, aggregator, initialValue){
    var result = initialValue;
    for(var i=0; i<list.length; i++)
        result = aggregator(result, list[i]);
    return result;
};
describe("Aggregate", function(){
    console.log("Sum of stock ", aggregate(products, function(result, product){
        return result + product.units;
    }, 0));
    console.log("cost of cheapest product", aggregate(products, function(result, product){
        return result < product.cost ? result : product.cost;
    }, Number.MAX_VALUE));
    console.log("cost of costliest product", aggregate(products, function(result, product){
        return result > product.cost ? result : product.cost;
    }, Number.MIN_VALUE));
})

describe("Transform", function(){
    function transform(list, transformationFn){
        var result = [];
        for(var i=0; i<list.length; i++)
            result.push(transformationFn(list[i]));
        return result;
    }
    describe("Products with value", function(){
        var productsWithValue = transform(products, function(product){
            return {
                id : product.id,
                name : product.name,
                cost : product.cost,
                units : product.units,
                value : product.cost * product.units
            };
        });
        console.table(productsWithValue);
        var stockValue = aggregate(productsWithValue, function(result, pv){
            return result + pv.value;
        }, 0);
        console.log("Overall stock value = ", stockValue);
    });
});

describe("GroupBy", function(){
    function groupBy(list, keySelector){
        var result = {};
        for(var i=0; i<list.length; i++){
            var key = keySelector(list[i]);
            if (typeof result[key] === 'undefined')
                result[key] = [];
            result[key].push(list[i]);
        }
        return result;
    };
    function printGroup(title, obj){
        console.group(title);
        for(var key in obj){
            describe("Key - " + key, function(){
                console.table(obj[key]);
            });
        }
        console.groupEnd();
    }
    var productsByCategory = groupBy(products, function(p){ return p.category; });
    printGroup("Products By Category", productsByCategory);

    var productsByCost = groupBy(products, function(product){
        return product.cost > 50 ? "costly" : "affordable";
    });
    printGroup("Products By Cost", productsByCost);

});
