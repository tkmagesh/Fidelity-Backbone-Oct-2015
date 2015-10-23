/*
Create an object and assign it to a variable 'spinner'
*/

function getSpinner(){
    var count = 0;
    return {
        up : function(){
            return ++count;
        },
        down : function(){
            return --count;
        }
    }
}

var spinner = getSpinner();

/*
The object should exhibit the following behavior
*/

spinner.up() // => 1
spinner.up() // => 2
spinner.up() // => 3
spinner.up() // => 4

spinner.down() // => 3
spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1

