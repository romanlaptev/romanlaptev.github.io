var func = sharedFunc();
func.vars["logOrderBy"] = "DESC";
//console.log("func:", func);

window.onload = function(){
	func.logAlert( navigator.userAgent, "info");
	if ('ontouchstart' in window) { 
		document.body.classList.add("touch");
	}
	//Start webApp
	if( typeof webApp === "object"){
		webApp.init(function(){
console.log("end webApp initialize....");
		});
	}
	
};//end onload

var webApp = {
	"vars": {
		//"transportAPI": _transport_api(),
		"weatherAPI": {
				//"yandex": _yandex_api(),
				"openweathermap": _openweathermap_api()
		},
		"logMsg" : "",
	},//end vars
	"init": function( postFunc ){
console.log("init webapp!");
		this["vars"]["App"] = func.getById("App");
		this["vars"]["log"] = func.getById("log");
		
		this["vars"]["waitWindow"] = func.getById("modal-wait-window");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		this["vars"]["percentComplete"] = func.getById("percent-complete");
		//this["vars"]["numTotal"] = func.getById("num-total-load");
		this["vars"]["numLoaded"] = func.getById("num-loaded");

		//this["vars"]["tab-transport"] = webApp.vars.App.querySelector("#tab-transport");
		this["vars"]["tab-weather"] = webApp.vars.App.querySelector("#tab-weather");
		this["vars"]["tab-info"] = webApp.vars.App.querySelector("#tab-info");
		this["vars"]["tab-buttons"] = webApp.vars.App.querySelectorAll("#tab-buttons .tab-btn");
		
		//webApp.vars["transportAPI"].init();
		
		webApp.vars["weatherAPI"]["selectAddr"] = func.getById("select-addr");
		webApp.vars["weatherAPI"]["selectApiName"] = func.getById("select-api");
		
		webApp.vars["weatherAPI"]["latitudeInput"] = func.getById("latitude-input");
		webApp.vars["weatherAPI"]["latitudeRange"] = func.getById("latitude-range");
		webApp.vars["weatherAPI"]["longitudeInput"] = func.getById("longitude-input");
		webApp.vars["weatherAPI"]["longitudeRange"] = func.getById("longitude-range");
		
		//webApp.vars["weatherAPI"]["yandex"].init();
		webApp.vars["weatherAPI"]["openweathermap"].init();

		webApp.vars["weatherAPI"]["btnRequest"] = webApp.vars["tab-weather"].querySelector(".btn-send-request");
		webApp.vars["weatherAPI"]["tpl_requestUrl"] = webApp.vars["weatherAPI"]["btnRequest"].href;
		
		defineEvents();
		
webApp.vars["weatherAPI"]["selectApiName"].selectedIndex = 1;
//webApp.vars["weatherAPI"]["selectApiName"].dispatchEvent(new Event('change'));
if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    webApp.vars["weatherAPI"]["selectApiName"].dispatchEvent(evt);
} else {
    webApp.vars["weatherAPI"]["selectApiName"].fireEvent("onchange"); 
}
/*
if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    element.dispatchEvent(evt);
}
else
    element.fireEvent("onchange"); 
//--------------
// Create a new 'change' event
var event = new Event('change');

// Dispatch it.
element.dispatchEvent(event);
*/
		
	}//end init()
	
};//end webApp()
console.log(webApp);

function _openweathermap_api(){
	_vars = {
		"dataUrl" : "",
/*
		"weatherUrl" : "http://api.openweathermap.org/data/2.5/weather?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{apiKey}}\
&callback=jsonp_callback",
*/
		"weatherUrl" : "https://api.openweathermap.org/data/2.5/weather?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{apiKey}}\
&lang=ru",
		//"weatherUrl" : "files/openweathermap_Mochishche.json",
		//"weatherUrl" : "files/openweathermap_Novosibirsk.json",

		//https://openweathermap.org/forecast5
		"forecastUrl" : "https://api.openweathermap.org/data/2.5/forecast?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{apiKey}}\
&lang=ru",

//&callback=jsonp_callback",
		//"forecastUrl" : "files/openweathermap_Novosibirsk_forecast.json",
		//"forecastUrl" : "/projects/test_code.git/test_api/files_ignore/openweathermap_Novosibirsk_forecast.json",
		"requestParams" : {
			"apiKey" : "7440bb4eee1e2d8d92bd8ca4a926ddd6",
			"latitude": 55.038115899999994,
			"longitude": 83.0094459,
	//Дачная улица, 38
	//посёлок Октябрьский, Мошковский район, Новосибирская область, Россия
				//"latitude": 55.169005, 
				//"longitude": 83.160846
		},
		"templates" : {},
	}//end _vars

	_vars["init"] = function(){
		webApp.vars["weatherAPI"]["openweathermap"]["targetContainer"] = func.getById("response-weather-api");
		webApp.vars["weatherAPI"]["openweathermap"]["templates"] = _defineTemplates();
		webApp.vars["weatherAPI"]["openweathermap"]["dataProcess"] = _dataProcess;
	};
	var _defineTemplates = function(){
		var templates = {
"tpl-openweathermap--weather": "",
"tpl-openweathermap--forecast": ""
		};
		
		for(var key in templates){
			templates[key] = getTpl(key);
		}//next
	
	
		//define template keys info
		templates["tplKeys"] = {};

		var keyName = "weather";
		var keyId = "tpl-openweathermap-weather-list";
		templates["tplKeys"][keyName] = {
			"description": "array",
			"listTpl": getTpl(keyId)
		};
		
		var keyName = "list";
		var keyId = "tpl-openweathermap-forecast--list";
		templates["tplKeys"][keyName] = {
			"description": "array",
			"listTpl": getTpl(keyId)
		};

		var keyName = "weather-forecast";
		var keyId = "tpl-openweathermap-forecast--list-weather";
		templates["tplKeys"][keyName] = {
			"description": "array",
			"listTpl": getTpl(keyId)
		};

		var keyName = "record_num";
		templates["tplKeys"][keyName] = {
			"description": "num_element"
		};

		var keyName = "dt";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
					//"format": "yyyy-mm-dd hh:min:sec"
				});
				return timeStr;
			}
		};
		
		var keyName = "timezone";
		templates["tplKeys"][keyName] = {
			"description": "Shift in seconds from UTC",
			"process": function(sec){
				var hourStr = (sec / 60) /60;
				return "+"+hourStr+" hour from UTC";
			}
		};

		var keyName = "sys.sunrise";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
				});
				return timeStr;
			}
		};

		var keyName = "sys.sunset";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
				});
				return timeStr;
			}
		};

		var keyName = "city.timezone";
		templates["tplKeys"][keyName] = {
			"description": "Shift in seconds from UTC",
			"process": function(sec){
				var hourStr = (sec / 60) /60;
				return "+"+hourStr+" hour from UTC";
			}
		};

		var keyName = "city.sunrise";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
				});
				return timeStr;
			}
		};

		var keyName = "city.sunset";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
				});
				return timeStr;
			}
		};


		var keyName = "list.dt";
		templates["tplKeys"][keyName] = {
			"type": "array_tpl_item",
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
					"format": "dd full-month hh:min",
					"s_case": true//subjective_case, именительный падеж
				});
				return timeStr;
			},
			"process": function( dataArr ){
				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					_d["dt"] = this["formatDate"]( _d["dt"] );
				}//next
			}
		};

		var keyName = "list.sys.pod";
		templates["tplKeys"][keyName] = {
			"type": "array_tpl_item",
			"description": "select list",
			"listValue": function(selectedOption){
//Название времени суток
var options = {
"n": "ночь",
"d": "день",
};
				return options[selectedOption];
			},
			"process": function( dataArr ){
				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					var selectedOption = _d["sys"]["pod"];
					_d["sys"]["pod"] = this["listValue"]( selectedOption );
				}//next
			}
		};

		var keyName = "list.grad_fluid_height";
		templates["tplKeys"][keyName] = {
			"description": "thermometer fluid height, px",
			"process": function(dataArr){
//calculate temperature position in pixels				
				var _thermometerHeightPx = 400; //px, .thermometer height
				var _numDegree = 100; //number of degrees on the thermometer scale
				var _pixelsPerDegree = _thermometerHeightPx / _numDegree;
				var _startPosPx = 200; //px, .thermometer .grad-fluid height

				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					var _tempPx = _d["main"]["temp"] * _pixelsPerDegree;
					var _h = _startPosPx + _tempPx;
					_d["grad_fluid_height"] = _h;
					
					_d["grad_fluid_color"] = "#ff0000";//red
					if( _d["main"]["temp"] < 0){
						_d["grad_fluid_color"] = "#0000ff";//blue
					}
					
					var _tempPx = _d["main"]["feels_like"] * _pixelsPerDegree;
					var _h = _startPosPx + _tempPx;
					_d["temp_feels_like"] = _h;//px

				}//next
			}
		};

		templates["mainTpl"] = templates["template-weather--openweathermap"];
		return templates;
	};//end _defineTemplates()

	
	var _dataProcess = function(jsonObj){
		
		var tplKeys = this.templates["tplKeys"];
		
if(jsonObj["dt"]){		
		if( tplKeys["dt"] &&
			typeof tplKeys["dt"]["formatDate"] === "function"
		){
			jsonObj["dt"] = tplKeys["dt"]["formatDate"]( jsonObj["dt"] );
		}
}		

if(jsonObj["timezone"]){
		if( tplKeys["timezone"] &&
			typeof tplKeys["timezone"]["process"] === "function"
		){
			jsonObj["timezone"] = tplKeys["timezone"]["process"]( jsonObj["timezone"] );
		}
}		
		
if(jsonObj["sys"]){		
		if( tplKeys["sys.sunrise"] &&
			typeof tplKeys["sys.sunrise"]["formatDate"] === "function"
		){
			jsonObj["sys"]["sunrise"] = tplKeys["sys.sunrise"]["formatDate"]( 
				jsonObj["sys"]["sunrise"] 
			);
		}
		
		if( tplKeys["sys.sunset"] &&
			typeof tplKeys["sys.sunset"]["formatDate"] === "function"
		){
			jsonObj["sys"]["sunset"] = tplKeys["sys.sunset"]["formatDate"]( 
				jsonObj["sys"]["sunset"] 
			);
		}
}		

if(jsonObj["city"]){
		if( tplKeys["city.timezone"] &&
			typeof tplKeys["city.timezone"]["process"] === "function"
		){
			jsonObj["city"]["timezone"] = tplKeys["city.timezone"]["process"]( 
				jsonObj["city"]["timezone"] 
			);
		}
		
		if( tplKeys["city.sunrise"] &&
			typeof tplKeys["city.sunrise"]["formatDate"] === "function"
		){
			jsonObj["city"]["sunrise"] = tplKeys["city.sunrise"]["formatDate"]( 
				jsonObj["city"]["sunrise"] 
			);
		}
		
		if( tplKeys["city.sunset"] &&
			typeof tplKeys["city.sunset"]["formatDate"] === "function"
		){
			jsonObj["city"]["sunset"] = tplKeys["city.sunset"]["formatDate"]( 
				jsonObj["city"]["sunset"] 
			);
		}
}

if(jsonObj["list"]){

		var keyDataObj = jsonObj["list"];
	
		var tpl_keyName ="list.dt";
		if( tplKeys[tpl_keyName] &&	
				typeof tplKeys[tpl_keyName]["process"] === "function"	)
		{
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}

		var tpl_keyName ="list.sys.pod";
//console.log(keyDataObj);
		if( tplKeys[tpl_keyName] &&	
				typeof tplKeys[tpl_keyName]["process"] === "function"	)
		{
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}
		
		var tpl_keyName = "list.grad_fluid_height";
		if( tplKeys[tpl_keyName] &&	
				typeof tplKeys[tpl_keyName]["process"] === "function"	)
		{
			tplKeys[tpl_keyName]["process"](keyDataObj);
		}
}
		
		return true;
	};//end _dataProcess()
	
	return _vars;
}//end _openweathermap_api()

function getTpl( id ){
		//window.addEventListener("load",function(event) {		
			var tpl = func.getById(id);
			if( tpl && tpl.innerHTML.length > 0 ){
				return tpl.innerHTML;
			} else {
	var logMsg = "error, empty or undefined tpl " + id;
	console.log(logMsg);
				return false;
			}
		//},false);		
}//end _getTpl()

function defineEvents(){
	webApp.vars["App"].addEventListener("click", function(e){
//console.log(e.type);
		event = e || window.e;
		var target = event.target || event.srcElement;
//console.log( target);

//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
		if( target.tagName === "A"){
			
			if ( target.href.indexOf("#change-direction") !== -1){
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}
			}
			
			if ( target.href.indexOf("?q=") !== -1){
				
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}

				var parseStr = target.href; 
//console.log( parseStr );
					if( parseStr.length > 0 ){
						webApp.vars["GET"] = func.parseGetParams( parseStr ); 
						_urlManager( target );
					} else {
console.log( "Warn! error parse url in " + target.href );
					}
			}
		}

	}, false);//end event
	

//------------------		
	webApp.vars["weatherAPI"]["selectAddr"].addEventListener("change", function(e){
//console.log(e.type);
		var dataSet = e.target.selectedOptions[0].dataset;
//console.log(dataSet);
		webApp.vars["weatherAPI"]["latitudeInput"].value = dataSet.lat;
		webApp.vars["weatherAPI"]["latitudeRange"].value = dataSet.lat;
		
		webApp.vars["weatherAPI"]["longitudeInput"].value = dataSet.lon;
		webApp.vars["weatherAPI"]["longitudeRange"].value = dataSet.lon;
		
	}, false);//end event

//------------------		
	webApp.vars["weatherAPI"]["selectApiName"].addEventListener("change", function(e){
//console.log(e.type);
//console.log(e.target.selectedIndex);
//console.log(typeof e.target.selectedIndex);
//console.log(typeof e.target.selectedOptions);
//for(var key in e.target){
//console.log(key +": "+ e.target[key]);
//}//next
		var dataSet = e.target.selectedOptions[0].dataset;
//console.log(dataSet, dataSet.length, typeof dataSet);
//console.log("test: "+dataSet.type);
		var apiType = "";
		var apiObjectName = "";
		if( dataSet.type && dataSet.type.length > 0){
			apiType = dataSet.type;
		}
		if( dataSet.source && dataSet.source.length > 0){
			apiObjectName = dataSet.source;
		}
//console.log(apiType+", "+apiObjectName);
		
var requestUrl = webApp.vars["weatherAPI"]["tpl_requestUrl"]
.replace("{{api-type}}", apiType)
.replace("{{api-object}}", apiObjectName);

console.log(requestUrl);
		webApp.vars["weatherAPI"]["btnRequest"].href = requestUrl;
	}, false);//end event

//------------------		
	//webApp.vars["weatherAPI"]["latitudeRange"].addEventListener("change", function(e){
//console.log(e.type, e.target);
		//webApp.vars["weatherAPI"]["latitudeInput"].value = e.target.value;
	//}, false);//end event

//------------------		
	webApp.vars["weatherAPI"]["latitudeRange"].addEventListener("input", function(e){
console.log(e.type, e.target);
		webApp.vars["weatherAPI"]["latitudeInput"].value = e.target.value;
	}, false);//end event

//------------------		
	webApp.vars["weatherAPI"]["longitudeRange"].addEventListener("input", function(e){
//console.log(e.type, e.target);
		webApp.vars["weatherAPI"]["longitudeInput"].value = e.target.value;
	}, false);//end event


}//end defineEvents()

function _urlManager( target ){
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {

			case "toggle-log":
//console.log(log.style.display);
				if( webApp.vars["log"].style.display==="none"){
					webApp.vars["log"].style.display="block";
				} else {
					webApp.vars["log"].style.display="none";
				}
			break;
			
			case "clear-log":
				webApp.vars["log"].innerHTML="";
			break;

			case "test":
				var funcName = _vars["GET"]["func"];
				window[funcName]();
			break;
			
			case "switch-tab":
				//webApp.vars["tab-transport"].classList.remove("tab-active");
				webApp.vars["tab-weather"].classList.remove("tab-active");
				webApp.vars["tab-info"].classList.remove("tab-active");
				
				var activePaneId = webApp.vars["GET"]["target_id"];
				webApp.vars[activePaneId].classList.add("tab-active");
				
//console.log(target);
				for(var n = 0; n < webApp.vars["tab-buttons"].length; n++){
					var btn = webApp.vars["tab-buttons"][n];
					btn.classList.remove("btn-active");
				}//next
				
				target.classList.add("btn-active");
			break;

			case "send-request":
//-------------------
				var apiType = webApp.vars["GET"]["api-type"];
				if( !apiType || apiType.length === 0
				){
webApp.logMsg = "error, empty or undefined API api-type";
func.logAlert(webApp.logMsg, "error");
					return false;
				}
				//if( apiType === "transport"){
					//apiObj = webApp.vars["transportAPI"];
/*					
var code = webApp.vars["transportAPI"].inputFrom.value;
webApp.vars["transportAPI"]["requestParams"]["from_code"] = code;
			
var code = webApp.vars["transportAPI"].inputTo.value;
webApp.vars["transportAPI"]["requestParams"]["to_code"] = code;
*/
				//}
				
				if( apiType === "weather"){
					apiObj = webApp.vars["weatherAPI"];
				}
				if( apiType === "forecast"){
					apiObj = webApp.vars["weatherAPI"];
				}
//-------------------
				var apiObjectName = webApp.vars["GET"]["api-object"];
				if( !apiObjectName || apiObjectName.length === 0 ){
webApp.logMsg = "warning, empty or undefined API name";
//func.logAlert(webApp.logMsg, "warning");
console.log( webApp.logMsg );
				} else{
					apiObj = apiObj[apiObjectName];
				}
//-------------------
//console.log(apiObj);
if( apiObj["requestParams"]["from_code"] ){
	var code = webApp.vars["transportAPI"].inputFrom.value;
	apiObj["requestParams"]["from_code"] = code;
}
if( apiObj["requestParams"]["to_code"] ){
	var code = webApp.vars["transportAPI"].inputTo.value;
	apiObj["requestParams"]["to_code"] = code;
}
if( apiObj["requestParams"]["latitude"] ){
	apiObj["requestParams"]["latitude"] = webApp.vars["weatherAPI"]["latitudeInput"].value;
}
if( apiObj["requestParams"]["longitude"] ){
	apiObj["requestParams"]["longitude"] = webApp.vars["weatherAPI"]["longitudeInput"].value;
}
//console.log(apiObj["requestParams"]);
				var dataUrl = apiObj["dataUrl"];
//-------------------
				if( apiObjectName === "openweathermap")	{
					if( apiType === "weather")	{
						dataUrl = apiObj["weatherUrl"];
						apiObj.templates["mainTpl"] = apiObj.templates["tpl-openweathermap--weather"];
					}
				
					if( apiType === "forecast") {
						dataUrl = apiObj["forecastUrl"];
						apiObj.templates["mainTpl"] = apiObj.templates["tpl-openweathermap--forecast"];
//console.log(apiObj);
//fix					
apiObj.templates["tplKeys"]["weather"]["listTpl"] = apiObj.templates["tplKeys"]["weather-forecast"]["listTpl"];
					}
				}
//-------------------
				if( !dataUrl || dataUrl.length === 0 ){
webApp.logMsg = "error, empty or undefined API parameter 'dataUrl'";
func.logAlert(webApp.logMsg, "error");
					return false;
				}
//console.log(dataUrl);
				
//jsonp
//#https://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp				
 //var script = document.createElement('script');
 //script.src = url;
 //document.body.appendChild(script);
//console.log(url);
//return;				

//webApp.vars["timers"]["request"]["start"] = new Date();

//view overlay
if( webApp["vars"]["waitWindow"] ){
	webApp["vars"]["waitWindow"].style.display="block";
}
//---------------------- test wait window
/*
var totalBytes = 516800;
var sizeBlockBytes = 5168;
var totalLoadedBytes = 0;
var percentComplete = 0;
var bytesPerPercent = totalBytes / 100;
			
var num = 1;
var interval = setInterval(function(){
	num++;
//console.log(num);
				
	totalLoadedBytes += sizeBlockBytes;
	webApp.vars["numLoaded"].innerHTML = totalLoadedBytes;

	if( num > 100){
		clearInterval(interval);
	}
				
	percentComplete = Math.ceil( totalLoadedBytes / totalBytes * 100);
	//test = Math.ceil( totalLoadedBytes / bytesPerPercent );
//console.log( percentComplete +"%" );
	
	webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
	webApp.vars["percentComplete"].innerHTML = percentComplete+"%";

}, 500);

return false;
*/
//----------------------
console.log("-- start server request --");
				sendRequest({
					"dataUrl": dataUrl,
					"apiObjectName" : apiObjectName,
					"requestParams": apiObj["requestParams"],
					"callback" : function( response ){
//console.log(arguments);

						var responseData = null;
						if(response){
							responseData = parseServerResponse({
								"responseType": webApp.vars["responseType"],
								"response": response
							});
//var logMsg = "end parse ajax response";
//func.logAlert( logMsg, "info");
						}
						
						if( responseData ){
							drawResponse({
								data: responseData,
								apiObj: apiObj
							});
						}

//webApp.vars["timers"]["request"]["end"] = new Date();
//webApp.vars["logMsg"] = "request runtime: " + _getRunTime( webApp.vars["timers"]["request"] ) + "sec";
//func.logAlert( webApp.vars["logMsg"],"info" );
console.log("-- end server request --");
						//hide block overlay and wait window
						if( webApp["vars"]["waitWindow"] ){
							webApp["vars"]["waitWindow"].style.display="none";
						}

					}//end callback
				});
				
				//hide block overlay and wait window
				//if( webApp["vars"]["waitWindow"] ){
					//webApp["vars"]["waitWindow"].style.display="none";
				//}

			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);
			break;
		}//end switch
		
}//end _urlManager()

function sendRequest( opt ){
	var p = {
		"dataUrl" : false,
		"apiObjectName" : false,
		"requestParams": false,
		"callback" : function(){
//console.log(arguments);
		}//end callback
	};
//console.log(opt);

	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( !p.requestParams){
webApp.logMsg = "error, undefined 'requestParams'";
func.logAlert(webApp.logMsg, "error");
		return false;
	}

	var dataUrl = p["dataUrl"];
	for(var key in p.requestParams){
		if( !p.requestParams[key]){
webApp.logMsg = "error, undefined requestParams <b>" + key + "</b>";
func.logAlert(webApp.logMsg, "error");
			return false;
		}
		dataUrl = dataUrl.replace( new RegExp("{{"+key+"}}", "g"), p.requestParams[key] );
	}//next
//console.log( dataUrl );		
//return false;

	var timeStart = new Date();
	try{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", dataUrl, true);
/*		
		if(p.apiObjectName === "yandex"){
			xhr.setRequestHeader("X-Yandex-API-Key", p.requestParams["apiKey"] );
			//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
		}
*/		
		xhr.onprogress = function( e ){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
				webApp.vars["numLoaded"].innerHTML = e.loaded;
				//webApp.vars["numTotal"].innerHTML = e.total;

				if( webApp.vars["loadProgressBar"] ){
					webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
					webApp.vars["percentComplete"].innerHTML = percentComplete+"%";
				}
		},//end onprogress

		xhr.onload = function(e) {
//console.log(arguments);
// console.log("event type:" + e.type);
//console.log( this.responseText );
//func.log( this.responseText, "response");
var logMsg = "ajax load time: " + e.timeStamp + " ms, "+ (e.timeStamp / 1000)+" sec , "; 
logMsg += "total: " + e.total + " bytes, "; 
logMsg += "loaded: " + e.loaded + " bytes, " + (e.loaded / 1024).toFixed(2)+" Kbytes"; 
//console.log( logMsg );	
func.logAlert( logMsg, "info");

			var timeEnd = new Date();
			var runtime = (timeEnd.getTime() - timeStart.getTime());
var logMsg = "ajax runtime: " + runtime + " ms, "+ (runtime / 1000)+" sec";
func.logAlert( logMsg, "info");
			
			var _response = false;
			if( this.responseText.length > 0 ){
				_response = this.responseText;
				webApp.vars["responseType"] = xhr.getResponseHeader('content-type');
			}
			
			if( typeof p.callback === "function"){
				p.callback(_response);
			}
		}//end onload
		
		xhr.onerror = function(e) {
//console.log(arguments);		
console.log(e);		

webApp.vars["logMsg"] = "<ul class='bg-orange color-black'>";
webApp.vars["logMsg"] += "error, ajax load failed...";
//func.logAlert( _vars["logMsg"], "error");
			for( var key in e){
//console.log( key +" : "+e[key] );
				webApp.vars["logMsg"] += "<li class=''><b>"+key +"</b> : "+ e[key]+"</li>";
			}//next
webApp.vars["logMsg"] += "</ul>";
func.logAlert( webApp.vars["logMsg"], "danger");

			p.callback(false);
		}//end error callback

		
		xhr.onloadend = function(e){
//console.log(xhr.getResponseHeader('X-Powered-By') );
//console.log( xhr.getAllResponseHeaders() );
webApp.vars["logMsg"] = xhr.getAllResponseHeaders();
webApp.vars["logMsg"] = webApp.vars["logMsg"].replace(/\r\n/g, "<br>");
func.logAlert( webApp.vars["logMsg"], "info");
		}//end onloadend
		
		xhr.send();
		
	} catch(e){
console.log(e);	
	}	
	
}//end sendRequest()

function parseServerResponse( opt ){
	
	var p = {
		"responseType": null,
		"response": false,
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( !p.response ||  p.response.length === 0){
webApp.vars["logMsg"] = "error, empty or wrong response data...";
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		if( typeof p["postFunc"] === "function"){
			p["postFunc"]();
		}
		return false;
	}

	var parseData = false;
	if( p.responseType.indexOf("application/xml") !== -1){
		parseData = _parseXML( p.response );
	}
	
	if( p.responseType.indexOf("application/json") !== -1){
		parseData = _parseJSON( p.response );
	}

	return parseData;
}//parseServerResponse()

	function _parseXML(xml){
//console.log("function _parseXML()");

var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj( xml );
//console.log(xmlObj);
delete xml;
			webApp.vars["DB"]["nodes"] = _data_formNodesObj(xmlObj);
//delete xmlObj;
			
			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["loadDataRes"] = true;
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
func.logAlert( webApp.vars["logMsg"], "info");
console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.logAlert( webApp.vars["logMsg"], "error");
console.log( error );
		}//end catch

	}//end _parseXML()

	function _data_formNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		
		var _response = xmlObj["response"]["childNodes"]["segment"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < _response.length; n++){
			var tagNode = _response[n]["childNodes"];
/*			
var node = {
	"arrival" : "",
	
	"tickets_info" : {
		"et_marker": false,
		"place": {
			"currency":"",
			"price": {
				"cents": 0
				"whole":0
			}
			"name": ""
		}
		
	}
	
};
*/			
			for(var key in tagNode){
console.log( key, tagNode[key] );
			}//next
			
		}//next
/*		
		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n]["type"]
				};

				for(var item in tagNodes[n]["children"]){
					var _content = tagNodes[n]["children"][item][0]["text"];
//"producer"
//"roles"
//"creators"
//"description"
//"published"
//"updated"
					
					if( !_content ){
//tags
//title
//ul
						_content = __convertMultipleField( tagNodes[n]["children"][item][0]["children"]);
					}
					obj[item] = _content;
				}
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
				
			}//next
		}
*/
		return nodes;
		
	}//end _data_formNodesObj()

	function _parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
//console.log( jsonObj );
			return jsonObj;
			
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
func.logAlert( webApp.vars["logMsg"], "error");
			return;
		}//end catch

	}//end _parseJSON()

function drawResponse(opt){
	var p = {
		data: null,
		apiObj: null
	}
//console.log(opt);
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( !p.apiObj ){
webApp.vars["logMsg"] = "error, undefined API object...";
func.logAlert( webApp.vars["logMsg"], "error");
		return false;
	}
	
	if( !p.data ){
webApp.vars["logMsg"] = "error, undefined data object...";
func.logAlert( webApp.vars["logMsg"], "error");
		return false;
	}
	
	if( p.apiObj.dataProcess && typeof p.apiObj.dataProcess === "function"){
		var res = p.apiObj.dataProcess( p.data );
	}
	
	if(!res){
		return false;
	}
	
	var html = wrapData( {
		"data": p.data,
		"template" : p.apiObj.templates["mainTpl"],
		"tplKeys" : p.apiObj.templates["tplKeys"]
	});
//console.log(html);

	if( html && html.length > 0){
		
		//clear unfilled template keys
		for(var key in p.apiObj.templates["tplKeys"]){
			if( p.apiObj.templates["tplKeys"][key]["clearValue"] ){
	//console.log(key, ": ", p.apiObj.templates["tplKeys"][key]);
				var keyName = p.apiObj.templates["tplKeys"][key]["clearValue"];
				html = html.replace( new RegExp( keyName, "g"), "" );
			}
		}//next
		
		p.apiObj.targetContainer.innerHTML = html;
	}
}//end drawResponse()
//============================================== DATA
/*	
function _loadCopyRightCode( postFunc ){
	//$.getJSON(  webApp.vars["copyRight"]["url"], function(data){
//console.log(arguments);
		//webApp.vars["copyRight"]["data"] = data;
		//if( postFunc === "function"){
			//postFunc();
		//}
	//});
	//.done(function () {
//console.log("$.ajax, Done...");
	//})
	//.fail(function (xhr, textStatus) {
//webApp.vars["logMsg"] = "$.ajax, Fail..." + webApp.vars["copyRight"]["url"];
//func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"], arguments );
		//if( typeof postFunc === "function"){
			//postFunc();
		//}
	//});

	func.runAjax( {
		"requestMethod" : "GET", 
		"url" :  webApp.vars["copyRight"]["url"], 
		
		"onLoadEnd" : function( headers ){
//console.log( headers );
		},
		
		"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["copyRight"]["url"];
func.logAlert( webApp.vars["logMsg"], "error");

				for( var key in e){
					webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
					func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
				}//next
				
			if( typeof  postFunc === "function"){
				postFunc();
			}
			//return false;
		},

		"callback": function( data, runtime, xhr ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
			webApp.vars["copyRight"]["data"] = __parseJSON( data );

			if( typeof postFunc === "function"){
				postFunc();
			}
		}//end callback()
	});
	
	function __parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
//console.log( jsonObj );
			return jsonObj["copyright"];
			
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
func.logAlert( webApp.vars["logMsg"], "error");
			return false;
		}//end catch

	}//end __parseJSON()

}//end _loadCopyRightCode()
*/

//============================================== DRAW
function wrapData( opt ){
	var p = {
		"data": null,
		"template" : "",
		tplKeys: null,
		"markerLeft":"%",
		"markerRight":"%"
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
console.log(p);
//console.log( p["data"].length );

	if( !p["data"] || p["data"].length === 0){
console.log("-- _wrapData(), error, incorrect data ...");
		return false;
	}
	if( !p["template"].length === 0 ){
console.log("-- wrapData(), error, empty template ...");
		return false;
	}

	var html = _formHtml({
			"data": p.data, 
			"tpl": p.template, 
			"tplKeys": p.tplKeys, 
			"markerLeft": p.markerLeft,
			"markerRight": p.markerRight
		});
//console.log(html);
	return html;

}//end wrapData()

function _formHtml(opt){
	var p = {
		data: null,
		tpl:"", 
		tplKeys: null, 
		keyPrefix:"",
		markerLeft:"%",
		markerRight:"%"
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	var _html = p.tpl;
	
	for( var key in p.data ){
//console.log(key, p.data[key], typeof  p.data[key], p.data[key] instanceof Object );

		var tplKey = p.markerLeft + p.keyPrefix + key + p.markerRight;
//console.log(tplKey);
//console.log(key, p.data[key], typeof  p.data[key], tplKey);

//!!!!!!!!!!!!!
		//if( !p.data[key] ){
//console.log(key, p.data[key], typeof  p.data[key], tplKey);
			//_html = _html.replace( new RegExp( tplKey, "g"), "+" );
		//}

		//data type String, Number, Boolean
if( _html.indexOf( tplKey ) !== -1  ){
//console.log( tplKey, p.data[key], typeof p.data[key]);
//console.log( tplKey);
			if( typeof p.data[key] === "string" ||
					typeof p.data[key] === "number"){
				_html = _html.replace( new RegExp( tplKey, "g"), p.data[key] );
			}
			
			if( typeof p.data[key] === "boolean"){
				_html = _html.replace( new RegExp( tplKey, "g"), p.data[key] );
			}
}

		//data type Object
		if( p.data[key] instanceof Object ){
			if( !(p.data[key] instanceof Array)  ){
//console.log(key, p.data[key], typeof  p.data[key] );
				
				var objectKeyPrefix = p.keyPrefix+key+".";
//console.log("objectKeyPrefix: ", objectKeyPrefix );
				
				_html = _formHtml({
					"data": p.data[key],
					"tpl": _html,
					"keyPrefix": objectKeyPrefix,
					"tplKeys": p.tplKeys
				});
			}
		}

		//data type Array
		if( p.data[key] instanceof Array ){
//console.log(_vars["templates"]);
//console.log(p.tplKeys);
//console.log(key, p.data[key], typeof  p.data[key], p.data[key] instanceof Array);
//console.log(key, p.data[key][0], typeof p.data[key][0], p.data[key][0] instanceof Array);

			//if ( !p.data["templates"] ){
//_vars["logMsg"] = "error, not define template keys info, skip array " + key;
//func.logAlert(_vars["logMsg"], "warning");
				//continue;
			//}
			if ( !p.tplKeys ){
_vars["logMsg"] = "error, not define template keys info, skip array "+ key ;
func.logAlert(_vars["logMsg"], "warning");
				continue;
			}
			if ( !p.tplKeys[key] ){
_vars["logMsg"] = "error, not define template keys info, skip array "+ key ;
func.logAlert(_vars["logMsg"], "warning");
				continue;
			}
			if ( p.tplKeys[key]["listTpl"].length === 0 ){
_vars["logMsg"] = "error, empty listTpl for array " +key;
func.logAlert(_vars["logMsg"], "warning");
				continue;
			}
	
			var _htmlRecords = "";
			for( var n = 0; n < p["data"][key].length; n++){
				
				var objectKeyPrefix = p.keyPrefix + key+".";
			//console.log("objectKeyPrefix: ", objectKeyPrefix, p.data[key][n], key );

				_htmlRecords += _formHtml({
					"data": p.data[key][n],
					"tpl": p.tplKeys[key]["listTpl"],
					"keyPrefix": key+".",
					//"keyPrefix": p.keyPrefix+key+".",
					"tplKeys": p.tplKeys
				});

				//change additional extended keys (%num% ....)
				__processTplKeys({"record_num": n+1});
			}//next
			//console.log(_htmlRecords);
			_html = _html.replace(p.markerLeft + key + p.markerRight, _htmlRecords);
		}

	}//next
	
	return _html;
	
	function __processTplKeys(options){
//console.log(p.tplKeys, _htmlRecords);
		if( p.tplKeys["record_num"] ){
			var _key = p.markerLeft + "record_num" + p.markerRight;
			var _value = options["record_num"];
			_htmlRecords = _htmlRecords.replace(_key, _value);
		}
	}//end __processTplKeys()
	
}//end _formHtml()

//=================================================
function jsonp_callback(response){
console.log("test jsonp", response);
}
