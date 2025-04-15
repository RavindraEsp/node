

var fs = require("fs");
var os = require("os");

console.log("data");

console.log(os.userInfo().username);

fs.appendFile("gretting.txt","Hello this is msg\n",() => console.log("File created"))