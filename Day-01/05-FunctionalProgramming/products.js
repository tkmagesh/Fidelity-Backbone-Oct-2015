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
    //sort()
        console.table(products);
    });
    describe("By any attribute", function(){
        function sort(){
        }
        describe("Products by id", function(){
            //sort(products)
            console.table(products);
        })
        describe("Products by cost", function(){
             //sort(products)
            console.table(products);
        })
    })
});
