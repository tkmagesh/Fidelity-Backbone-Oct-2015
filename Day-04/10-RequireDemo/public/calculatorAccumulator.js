define(['calculator'], function(calculator){
    function run(){
        var result = 0;
        result += calculator.add(10,20);
        result += calculator.subtract(5,2);
        return result;
    }
    return {
        run : run
    };
});
