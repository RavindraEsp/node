


console.log('Server file is running ======> ');


//function code start 
// how to write function in js
//1.
// function add(a,b){
//     return a+b;
// }

//2.
// var add = function(a,b) {
//     return a+b;
// }

//3.
//var add = (a,b) =>  {return a+b};

//4.
//var add = (a,b) => a+b;


//call the method 
//var result = add(23,30);

//console.log('Result is '+result);


// function code end



// call back function long way 
/*
function callbackmethod(){

   console.log('call back call ');

}


const add  = function(a,b,callback){
var result = a+b;

console.log('Result '+result);
 callback();
}


add(32,39,callbackmethod);

*/


// call back function short way 

const add = function (a, b, callback) {
    var result = a + b;
    console.log('Result ' + result);
    callback();
}


add(32, 39, function () {
    console.log('call back call on start end');

});






var fs = require("fs");
var os = require("os");

console.log("data");

console.log(os.userInfo().username);

fs.appendFile("gretting.txt","Hello this is msg\n",() => console.log("File created"))