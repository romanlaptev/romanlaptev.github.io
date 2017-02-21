//list directory
//node list_dir.js d:\

console.log( process.argv );
var dir = ".";
//var dir = "D:\\documents\\laptev\\www\\test\\";

if( process.argv[2]){
console.log ( process.argv[2] );
var dir = process.argv[2];
}

var fs = require("fs");
var files = fs.readdirSync( dir );
for( fn in files){
console.log( fn, files[fn] );
}
