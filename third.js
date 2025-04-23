const stringData = '{"name" : "Ravindraa","age" : 27}';



var newdata = JSON.parse(stringData); // string to json object convert 

console.log("String data is "+stringData);

console.log("Json data is "+newdata.name);

console.log("Json data is " + JSON.stringify(newdata));  // json object to string convert