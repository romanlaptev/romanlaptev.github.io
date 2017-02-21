//list directory
var fs = require("fs");
var files = fs.readdirSync(".");
for( fn in files){
console.log( fn, files[fn] );
}