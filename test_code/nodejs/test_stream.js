const fs = require("fs");
const {Console} = require("console");

let _outlog = fs.createWriteStream("./stdout.log");
let _outerror = fs.createWriteStream("./stderr.log");

let _console = new Console( _outlog, _outerror);

_console.log("-- test log message.");
_console.error("Danger, danger..... the monster is coming !!!!!");
