var products = [
    {id :5, name : "Pen", cost : 50, units : 60, category : 1},
    {id :8, name : "Hen", cost : 90, units : 70, category : 2},
    {id :4, name : "Ten", cost : 70, units : 50, category : 1},
    {id :9, name : "Den", cost : 60, units : 80, category : 2},
    {id :3, name : "Zen", cost : 80, units : 30, category : 1}
];

/*
sort
filter
all
any
min
max
avg
count
sum
aggregate
transform
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
        function filter(list, criteriaFn){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (criteriaFn(list[i]))
                    result.push(list[i]);
            return result;
        }
        describe("Costly products [cost > 50]", function(){
            var cosltyProductCriteria = function(product){
                return product.cost > 50;
            };
            var costlyProducts = filter(products, cosltyProductCriteria);
            console.table(costlyProducts);
        });
        describe("Category 1 products", function(){
            var category1Criteria = function(product){
                return product.category === 1;
            };
            var category1Products = filter(products, category1Criteria);
            console.table(category1Products);
        });
    });
});
