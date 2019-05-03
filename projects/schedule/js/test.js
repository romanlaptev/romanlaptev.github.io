//window.location.href="https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr";

//console.log("000000000000", webApp.vars["DB"]["dataUrl"]);

//$.getJSON(webApp.vars["DB"]["dataUrl"], function(){
//console.log(arguments);
//});
//my_func({a:1});

  src = webApp.vars["DB"]["dataUrl"]; 
  var tmpElem = document.createElement('div');

  tmpElem.innerHTML = '<iframe name="test_frame" id="test-frame" src="' + src + '">';
  var iframe = tmpElem.firstChild;

	var debug = true;
  if (!debug) {
    iframe.style.display = 'none';
  }

	document.body.appendChild(iframe);
//for( var key in iframe.contentDocument){
//console.log(key, iframe.contentDocument[key]);
//}

console.log("99", iframe.contentWindow );
