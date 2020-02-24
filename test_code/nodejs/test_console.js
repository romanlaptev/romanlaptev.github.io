var _path = require("path");
var _fs = require("fs");
var _os = require("os");
var _util = require("util");

console.log( "dirname: " + __dirname );
console.log( "filename: " + __filename );

//------------------------- test module PATH
// console.log("File name:" + _path.basename(__filename) );
// console.log("Dir name:" + _path.dirname(__filename) );
// console.log("Extension name:" + _path.extname(__filename) );

// console.log( _path.join( __dirname, "/server/", "index.html") );
// console.log( _path.isAbsolute( __dirname ) );
// console.log( _path.isAbsolute( "public/myProjects" ) );

//var pathParts = _path.parse( __dirname );
//console.log( pathParts );

// console.log( "System separator: " +_path.sep );


//------------------------- test module FS
// var _dirName = _path.join( __dirname, "test1");
// _fs.mkdir( _dirName, function(err){
// console.log("err:", err);
	// if(err){
		// throw(err);
	// } else {
// console.log("Created folder " + _dirName);
	// }
	
// });


// var _filePath = _path.join( __dirname, "test1.txt");
// var _text = "Hello NodeJS\n";

// _fs.writeFile( _filePath, _text, function(err){
// console.log("writeFile, err:", err);
	// if(err){
		// throw(err);
	// } else {
// console.log("Create file " + _filePath);
		// _appendFile("Hello again...\n");
	// }
// });

function _appendFile( _text ){
	_fs.appendFile( _filePath, _text, function(err){
console.log("appendFile, err:", err);
		if(err){
			throw(err);
		} else {
	console.log("Write text to file " + _filePath);
			_readFile( _filePath);
		}
	});
}//end _appendFile()



function _readFile( _fsPath ){

	_fs.exists( _fsPath, function(res){
		if(res){
	console.log( _fsPath + " is exists...");
		}
	});

	_fs.readFile( _fsPath, function(err, _content){
console.log("readFile, err:", err);
		if(err){
			throw(err);
		} else {
console.log("File content buffer: ", _content);
			var _data = Buffer.from( _content );
console.log("File content: ", _data.toString() );

			var fileContent = _fs.readFileSync( _fsPath, "utf8");
console.log( fileContent ); 

		}
	});
}//end _readFile()


//------------------------- test module OS
console.log("===================================");
console.log("Operation system platform:" + _os.platform() );
console.log("Processor architecture:" + _os.arch() );

console.dir ( _os.cpus() ); 
var _cpuInfo = _util.inspect( _os.cpus() ); 

console.log("Processor info:" +  _cpuInfo);
console.log("Number of processor cores:" + _os.cpus().length );

console.log("Free memory:" + _os.freemem() );
console.log("Total memory:" + _os.totalmem() );
console.log("Home directory:" + _os.homedir() );
console.log("Uptime:" + _os.uptime() );



//------------------------- process info
console.log("===================================");
console.log( "Processor architecture:",  process.arch );
console.log( "Platform:",  process.platform );//win32, linux

console.log( "Command line arguments: ", process.argv );
console.log( "ENV variables: ", process.env );
console.log( "server path: ", process.execPath );
console.log( "Node version: ", process.version );
console.log( "Memory usage: ", process.memoryUsage() );


//------------------------- test module UTILS
console.log("===================================");
var _arr = [1,2,3];
var _obj = {a:1, b:2, c:3};
var _num = 45;
var _str = "Laptev Roman";
var _und = null;

console.log( "_arr is array: ", _util.isArray( _arr ) );
console.log( "_obj is object: ", _util.isObject( _obj ) );
console.log( "_num is number: ", _util.isNumber( _num ) );
console.log( "_str is string: ", _util.isString( _str ) );
console.log( "_und is NULL: ", _util.isNull( _und ) );
console.log( "_und is function: ", _util.isFunction( _und ) );

//---------------------------- timer
console.log("===================================");
var testArr = [];
console.time("first");// start  timer
for( var n = 0; n < 1000000; n++){
	testArr[n] = (n+1)*2;
}//next
console.log("Run time: ");
console.timeEnd("first");// time in ms
console.log("===================================");

//---------------------------- INPUT
const _readLine = require("readline");
const rl = _readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('Test input, enter any string (type \'.exit\' for quit from program):');
rl.on("line", function(line){
	console.log('You typed %s', line);
	if( line === ".exit"){
		rl.close();
	}
});
