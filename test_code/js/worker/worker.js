this.onmessage = function (event) {
    if (event.data == "hello worker!") {
        postMessage("hello there, right back at you");
		run();	
    } else {
        postMessage("Can't you see I'm busy, leave me alone");
    }
};

function run() {
    var n = 1;
    search: while (true) {
        n += 1;
        for (var i = 2; i <= Math.sqrt(n); i += 1)
            if(n % i == 0)
				continue search;
        // нашли простое число!
        postMessage(n);
    }
}