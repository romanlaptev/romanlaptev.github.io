var func = sharedFunc();
func.vars["logOrderBy"] = "DESC";
//console.log("func:", func);

window.onload = function(){
func.logAlert( navigator.userAgent, "info");
	
	//Start webApp
	if( typeof webApp === "object"){
		webApp.init(function(){
console.log("end webApp initialize....");
		});
	}
	
};//end onload

var webApp = {
	
	"vars" : {
		"transportAPI": _transport_api(),
		
		"weatherAPI": {
				"yandex": _yandex_api(),
				"openweathermap": _openweathermap_api()
		},
		
		"logMsg" : "",
	},//end vars
	
	"init" : function( postFunc ){
console.log("init webapp!");

		this["vars"]["App"] = func.getById("App");
		this["vars"]["log"] = func.getById("log");
		
		this["vars"]["waitWindow"] = func.getById("modal-wait-window");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		this["vars"]["percentComplete"] = func.getById("percent-complete");
		//this["vars"]["numTotal"] = func.getById("num-total-load");
		this["vars"]["numLoaded"] = func.getById("num-loaded");
		

		this["vars"]["tab-transport"] = webApp.vars.App.querySelector("#tab-transport");
		this["vars"]["tab-weather"] = webApp.vars.App.querySelector("#tab-weather");
		this["vars"]["tab-info"] = webApp.vars.App.querySelector("#tab-info");
		this["vars"]["tab-buttons"] = webApp.vars.App.querySelectorAll("#tab-buttons .tab-btn");
		
		
		webApp.vars["transportAPI"].init();
		webApp.vars["weatherAPI"]["yandex"].init();
		webApp.vars["weatherAPI"]["openweathermap"].init();

		defineEvents();
	}//end init()
	
};//end webApp()
console.log(webApp);


function _transport_api(){
	_vars = {
		//"dataUrl" : "data/2019-04-26.xml",
		//"dataUrl" : "v1/data/2019-04-26.json",
		//"dataUrl" : "files/test_ya_schedule.json",
		//"dataUrl" : "files/test_ya_schedule_error.json",
		
/*
		"dataUrl" : "https://cors-anywhere.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/search/?\
from={{from_code}}&\
to={{to_code}}&\
apikey={{apikey}}&\
date={{date}}&\
transport_types=suburban&\
system=esr&\
show_systems=esr",
*/

		"dataUrl" : "https://romanlaptev-cors.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/search/?\
from={{from_code}}&\
to={{to_code}}&\
apikey={{apiKey}}&\
date={{date}}&\
transport_types=suburban&\
system=esr&\
show_systems=esr",

		"requestParams" : {
			"apiKey" : "b07a64bc-f237-4e79-9efb-b951ec68eaf7",
			"from" : {
				"title" : "Новосибирск-восточный",
				"esr_code" : 851508
			},
			"to" : {
				"title" : "Раздолье (3362 км)",
				"esr_code" : 851635
			},
			//"stations": {
				//"esr_code" : {
					//"851508": "Новосибирск-восточный",
					//"851635": "Раздолье (3362 км)"
				//}
			//}
		},
		
		"copyRight": {
//"url": "https://cors-anywhere.herokuapp.com/\
	//https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
			"url": "https://romanlaptev-cors.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
			"data": ""
		},
		"blocks": [
/*		
			{
				"locationID" : "block-schedule",
				"title" : "transport schedule", 
				"templateID" : "tpl-schedule",
				"content" : "",
				//"visibility" : true,
				"buildBlock" : function(){
//console.log(this);
					var html = _buldScheduleHtml();
					if( html && html.length > 0 ){
						this.content = html;
						_draw_buildBlock( this );
					}
				}
			}, //end block
*/ 
/*
			{
				"locationID" : "block-copyright",
				"title" : "copy Right!", 
				"templateID" : "tpl-copyright",
				"content" :  "",
				"buildBlock" : function(){
//console.log(this);
					var data = webApp.vars["copyRight"]["data"];
					var html = _draw_wrapData({
						"data": data,
						"templateID": "tpl-copyright-content",
					});
//console.log(html);
					if( html && html.length > 0 ){
						this.content = html;
						_draw_buildBlock( this );
					}
				}
			}, //end block
*/
		],//end blocks
	}//end _vars

	_vars["requestParams"]["from_code"] = _vars["requestParams"]["from"]["esr_code"];
	_vars["requestParams"]["to_code"] = _vars["requestParams"]["to"]["esr_code"];
	var today = func.timeStampToDateStr({
		"format": "yyyy-mm-dd"
	});
//console.log(today);
	_vars["requestParams"]["date"] = today;


	_vars["init"] = function(){
		
		//set transport input fields
		webApp.vars["transportAPI"].inputFrom = func.getById("inp-from-title");
		webApp.vars["transportAPI"].selectFrom = func.getById("select-from-title");
		
		webApp.vars["transportAPI"].inputTo = func.getById("inp-to-title");
		webApp.vars["transportAPI"].selectTo = func.getById("select-to-title");

		webApp.vars["transportAPI"]["dateWidget"] = webApp.vars.App.querySelector("#date-widget");
		webApp.vars["transportAPI"]["btnDir"] = webApp.vars.App.querySelector("a[href='#change-direction']");

		initTransportFields({
			"from_code": webApp.vars["transportAPI"]["requestParams"]["from_code"],
			"to_code": webApp.vars["transportAPI"]["requestParams"]["to_code"],
			"list_date": webApp.vars["transportAPI"]["requestParams"]["date"]
		});
		
		webApp.vars["transportAPI"]["targetContainer"] = func.getById("response-transport-api");
		webApp.vars["transportAPI"]["templates"] = _getTemplates();
		webApp.vars["transportAPI"]["dataProcess"] = _dataProcess;
		
		
//------------------		
		webApp.vars["transportAPI"]["selectFrom"].addEventListener("change", function(e){
//console.log(e.target);
			var code = e.target.selectedOptions[0].value;
			webApp.vars["transportAPI"].inputFrom.value = code;
			//webApp.vars["transportAPI"]["requestParams"]["from_code"] = code;
			
			if( webApp.vars["transportAPI"].inputFrom.value === webApp.vars["transportAPI"].inputTo.value){
				webApp.vars["transportAPI"].inputTo.value = "";
				webApp.vars["transportAPI"].selectTo.selectedIndex = 0;
			}
		});//end event
		
//------------------		
		webApp.vars["transportAPI"]["selectTo"].addEventListener("change", function(e){
			var code = e.target.selectedOptions[0].value;
			webApp.vars["transportAPI"].inputTo.value = code;
			//webApp.vars["transportAPI"]["requestParams"]["to_code"] = code;
			
			if( webApp.vars["transportAPI"].inputTo.value === webApp.vars["transportAPI"].inputFrom.value){
				webApp.vars["transportAPI"].inputFrom.value = "";
				webApp.vars["transportAPI"].selectFrom.selectedIndex = 0;
			}
		});//end event
		
//------------------		
		webApp.vars["transportAPI"]["dateWidget"].addEventListener("change", function(e){
//console.log(e.type, e.target);
			webApp.vars["transportAPI"]["requestParams"]["date"] = e.target.value;
		});//end event
		
//------------------		
		webApp.vars["transportAPI"]["btnDir"].addEventListener("click", function(e){
//console.log(e.type, e.target);
			var codeFromIndex = webApp.vars["transportAPI"].selectFrom.selectedIndex;
			var codeFrom = webApp.vars["transportAPI"].selectFrom.selectedOptions[0].value;
			
			var codeToIndex = webApp.vars["transportAPI"].selectTo.selectedIndex;
			var codeTo = webApp.vars["transportAPI"].selectTo.selectedOptions[0].value;
			
			webApp.vars["transportAPI"].selectFrom.selectedIndex = codeToIndex;
			webApp.vars["transportAPI"].inputFrom.value = codeTo;
			webApp.vars["transportAPI"].selectTo.selectedIndex = codeFromIndex;
			webApp.vars["transportAPI"].inputTo.value = codeFrom;
		});//end event

	};//_transport_api()
	
	
	function initTransportFields(opt){
		var p = {
			"from_code" : false,
			"to_code" : false,
			"list_date": false
		};
	//console.log(opt);

		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		webApp.vars["transportAPI"].inputFrom.value = p.from_code;
		for(var n =0; n < webApp.vars["transportAPI"].selectFrom.length; n++){
			var option = webApp.vars["transportAPI"].selectFrom[n];
//console.log(option, option.value);
			if( parseInt(option.value) === p.from_code){
				webApp.vars["transportAPI"].selectFrom.selectedIndex = n;
			}
		}//next
		
		webApp.vars["transportAPI"].inputTo.value = p.to_code;
		for(var n =0; n < webApp.vars["transportAPI"].selectTo.length; n++){
			var option = webApp.vars["transportAPI"].selectTo[n];
//console.log(option, option.value);
			if( parseInt(option.value) === p.to_code){
				webApp.vars["transportAPI"].selectTo.selectedIndex = n;
			}
		}//next


		webApp.vars["transportAPI"]["dateWidget"].value = p.list_date;
	}//end initTransportFields()
	
	
	var _getTemplates = function(){

		var templates = {
			//"tpl-copyright": "",
			//"tpl-copyright-content": "",
			"tpl-yandex--transport": "",
			//"tpl-schedule-table": "",
			//"tpl-schedule-mobile": ""
		};
		
		for(var key in templates){
			templates[key] = getTpl(key);
		}//next
		
		//define template keys info
		templates["tplKeys"] = {};

		var keyName = "segments";
		var keyId = "segments-list-tpl--transport";
		templates["tplKeys"][keyName] = {
			"description": "array",
			"listTpl": getTpl(keyId)
		};

		var keyName = "segments.tickets_info.et_marker";
		templates["tplKeys"][keyName] = {
			"clearValue": "%segments.tickets_info.et_marker%" //key name as in the template page
		};
		
	
		var keyName = "record_num";
		templates["tplKeys"][keyName] = {
			"description": "num_element"
		};

		var keyName = "places";//segments.tickets_info.places
		var keyId = "tpl--segments-tickets_info-places";
		templates["tplKeys"][keyName] = {
			"description": "array",
			"listTpl": getTpl(keyId),
			"clearValue": "%places%" //key name as in the template page
		};


		templates["mainTpl"] = templates["tpl-yandex--transport"];
		
		return templates;
	};//end _getTemplates()

	
	var _dataProcess = function(jsonObj){
//console.log(jsonObj);
//https://yandex.ru/dev/rasp/doc/reference/schedule-point-point.html#format
		//correct date: departure, duration, arrival
		for( var n = 0; n < jsonObj["segments"].length; n++){
			
			var record = jsonObj["segments"][n];
			record["duration"] = Math.round( record["duration"] / 60);
			if( record["duration"] > 60){
				record["duration"] = record["duration"] / 60;
			}
			
			//convert date ISO 8601 (YYYY-MM-DDThh:mm:ss±hh:mm) -> dd mm hh:min
			var _d = new Date( record["departure"] );
//console.log(_d);
			var _d_format = func.convertDateToStr({
				"dateObj": _d,
				//"format": "dd full-month hh:min"
				"format": "hh:min"
			});
//console.log(_d_format);			
			record["departure"] = _d_format;

			var _d = new Date( record["arrival"] );
			var _d_format = func.convertDateToStr({
				"dateObj": _d,
				"format": "hh:min"
			});
			record["arrival"] = _d_format;
		}//next
		
	};//end _dataProcess()
	
	return _vars;
}//end _transport_api()


function _yandex_api(){
	_vars = {
		
		"dataUrl" : "https://romanlaptev-cors.herokuapp.com/\
https://api.weather.yandex.ru/v2/informers?\
lat={{latitude}}&\
lon={{longitude}}&\
lang=ru_RU",

		//"dataUrl" : "files/test_ya_pogoda.json",
		
		"requestParams" : {
			"apiKey" : "dab03f2c-c76d-4fb6-9445-faa84fa80973",
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
		webApp.vars["weatherAPI"]["yandex"]["targetContainer"] = func.getById("response-weather-api");
		webApp.vars["weatherAPI"]["yandex"]["templates"] = _getTemplates();;
		webApp.vars["weatherAPI"]["yandex"]["dataProcess"] = _dataProcess;
	};
	
	var _getTemplates = function(){

		var templates = {
"tpl-yandex--weather": ""
		};
		
		for(var key in templates){
			templates[key] = getTpl(key);
		}//next
		
		//define template keys info
		templates["tplKeys"] = {};

//"Код расшифровки погодного описания"
var condition_opt = {
"clear": "ясно",
"partly-cloudy": "малооблачно",
"cloudy": "облачно с прояснениями",
"overcast": "пасмурно",
"drizzle": "морось",
"light-rain": "небольшой дождь",
"rain": "дождь",
"moderate-rain": "умеренно сильный дождь",
"heavy-rain": "сильный дождь",
"continuous-heavy-rain": "длительный сильный дождь",
"showers": "ливень",
"wet-snow": "дождь со снегом",
"light-snow": "небольшой снег",
"snow": "снег",
"snow-showers": "снегопад",
"hail": "град",
"thunderstorm": "гроза",
"thunderstorm-with-rain": "дождь с грозой",
"thunderstorm-with-hail": "гроза с градом"	
};

		var keyName = "fact.condition";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			//"listTpl": getTpl(keyId)
			//"clearValue": ""
			"listValue": function(selectedOption){
				var options = condition_opt;
				return options[selectedOption];
			}
		};

		var keyName = "fact.wind_dir";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			"listValue": function(selectedOption){
//Направление ветра
var options = {
"nw": "северо-западное",
"n": "северное",
"ne": "северо-восточное",
"e": "восточное",
"se": "юго-восточное",
"s": "южное",
"sw": "юго-западное",
"w": "западное",
"с": "штиль"
};
				return options[selectedOption];
			}
		};

		var keyName = "fact.daytime";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			"listValue": function(selectedOption){
var options = {
"d": "светлое время суток",
"n": "темное время суток"
};
				return options[selectedOption];
			}
		};


		var keyName = "fact.season";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			"listValue": function(selectedOption){
var options = {
"summer": "лето",
"autumn": "осень",
"winter": "зима",
"spring": "весна"
};
				return options[selectedOption];
			}
		};

		var keyName = "fact.obs_time";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
					"format": "yyyy-mm-dd hh:min:sec"
				});
				return timeStr;
			}
		};

		var keyName = "now";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
					"format": "yyyy-mm-dd hh:min:sec"
				});
				return timeStr;
			}
		};
		
		var keyName = "forecast.date_ts";
		templates["tplKeys"][keyName] = {
			"description": "date",
			"formatDate": function(_timestamp){
				var timeStr = func.timeStampToDateStr({
					"timestamp": _timestamp,
					"format": "dd full-month yyyy",
					"s_case": true//subjective_case, именительный падеж
				});
				return timeStr;
			}
		};

		var keyName = "forecast.moon_code";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			"listValue": function(selectedOption){
//код для фазы Луны
var options = {
"0": "полнолуние",
"1": "убывающая луна",
"2": "убывающая луна",
"3": "убывающая луна",
"4": "последняя четверть",
"5": "убывающая луна",
"6": "убывающая луна",
"7": "убывающая луна",
"8": "новолуние",
"9": "растущая луна",
"10": "растущая луна",
"11": "растущая луна",
"12": "первая четверть",
"13": "растущая луна",
"14": "растущая луна",
"15": "растущая луна"
};
//console.log(selectedOption, typeof selectedOption, options[selectedOption]);
				return options[selectedOption];
			},
			"process": function( _d ){
//console.log( this );
				var selectedOption = _d["moon_code"];
				if( this["listValue"] && 
					typeof this["listValue"] === "function" ){
					_d["moon_code"] = this["listValue"]( selectedOption );
				}
			}
		};


		var keyName = "parts";
		var keyId = "tpl-yandex--forecast-parts";
		templates["tplKeys"][keyName] = {
			"type": "array_tpl",
			"listTpl": getTpl(keyId)
		};


		var keyName = "parts.daytime";
		templates["tplKeys"][keyName] = {
			"type": "array_tpl_item",
			"description": "select list",
			"listValue": function(selectedOption){
var options = {
"d": "светлое время суток",
"n": "темное время суток"
};
				return options[selectedOption];
			},
			"process": function( dataArr ){
				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					var selectedOption = _d["daytime"];
					_d["daytime"] = this["listValue"]( selectedOption );
				}//next
			}
		};

		var keyName = "parts.part_name";
		templates["tplKeys"][keyName] = {
			"type": "array_tpl_item",
			"description": "select list",
			"listValue": function(selectedOption){
//Название времени суток
var options = {
"night": "ночь",
"morning": "утро",
"day": "день",
"evening": "вечер"
};
				return options[selectedOption];
			},
			"process": function( dataArr ){
				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					var selectedOption = _d["part_name"];
					_d["part_name"] = this["listValue"]( selectedOption );
				}//next
			}
		};

		var keyName = "parts.condition";
		templates["tplKeys"][keyName] = {
			"description": "select list",
			"listValue": function(selectedOption){
				var options = condition_opt;
				return options[selectedOption];
			},
			"process": function( dataArr ){
				for(var n = 0; n < dataArr.length; n++){
					var _d = dataArr[n];
					var selectedOption = _d["condition"];
					_d["condition"] = this["listValue"]( selectedOption );
				}//next
			}
		};


		templates["mainTpl"] = templates["tpl-yandex--weather"];
		return templates;
	};//end _getTemplates()

	
//https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info.html#resp-format	
	var _dataProcess = function(jsonObj){
//console.log(jsonObj)

		var tplKeys = this.templates["tplKeys"];
	//console.log(tplKeys, typeof tplKeys["fact.condition"]["listValue"] === "function");
		if( tplKeys["fact.condition"] &&
			typeof tplKeys["fact.condition"]["listValue"] === "function"
		){
			jsonObj["fact"]["condition"] = tplKeys["fact.condition"]["listValue"]( jsonObj["fact"]["condition"] );
		}
		
		if( tplKeys["fact.wind_dir"] &&
			typeof tplKeys["fact.wind_dir"]["listValue"] === "function"
		){
			jsonObj["fact"]["wind_dir"] = tplKeys["fact.wind_dir"]["listValue"]( jsonObj["fact"]["wind_dir"] );
		}
		
		if( tplKeys["fact.daytime"] &&
			typeof tplKeys["fact.daytime"]["listValue"] === "function"
		){
			jsonObj["fact"]["daytime"] = tplKeys["fact.daytime"]["listValue"]( jsonObj["fact"]["daytime"] );
		}
		
		if( tplKeys["fact.season"] &&
			typeof tplKeys["fact.season"]["listValue"] === "function"
		){
			jsonObj["fact"]["season"] = tplKeys["fact.season"]["listValue"]( jsonObj["fact"]["season"] );
		}

		if( tplKeys["fact.obs_time"] &&
			typeof tplKeys["fact.obs_time"]["formatDate"] === "function"
		){
			jsonObj["fact"]["obs_time"] = tplKeys["fact.obs_time"]["formatDate"]( jsonObj["fact"]["obs_time"] );
		}

		if( tplKeys["now"] &&
			typeof tplKeys["now"]["formatDate"] === "function"
		){
			jsonObj["now"] = tplKeys["now"]["formatDate"]( jsonObj["now"] );
		}

		if( tplKeys["forecast.date_ts"] &&
			typeof tplKeys["forecast.date_ts"]["formatDate"] === "function"
		){
			jsonObj["forecast"]["date_ts"] = tplKeys["forecast.date_ts"]["formatDate"]( 
				jsonObj["forecast"]["date_ts"] 
			);
		}

		var tpl_keyName ="forecast.moon_code";
		var keyDataObj = jsonObj["forecast"];
		//var data_keyName ="moon_code";
		//if( tplKeys[tpl_keyName] &&	typeof tplKeys[tpl_keyName]["listValue"] === "function"	){
			//keyDataObj[data_keyName] = tplKeys[tpl_keyName]["listValue"]( keyDataObj[data_keyName] );
	//console.log( keyDataObj );
		//}
		if( tplKeys[tpl_keyName] &&	typeof tplKeys[tpl_keyName]["process"] === "function"	){
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}

		var tpl_keyName ="parts.daytime";
		var keyDataObj = jsonObj["forecast"]["parts"];
		if( tplKeys[tpl_keyName] &&	typeof tplKeys[tpl_keyName]["process"] === "function"	){
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}
	
		var tpl_keyName ="parts.part_name";
		var keyDataObj = jsonObj["forecast"]["parts"];
		if( tplKeys[tpl_keyName] &&	typeof tplKeys[tpl_keyName]["process"] === "function"	){
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}

		var tpl_keyName ="parts.condition";
		var keyDataObj = jsonObj["forecast"]["parts"];
		if( tplKeys[tpl_keyName] &&	typeof tplKeys[tpl_keyName]["process"] === "function"	){
			tplKeys[tpl_keyName]["process"]( keyDataObj );
		}
	
	};//end _dataProcess()
	
	return _vars;
}//end _yandex_api()


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

		"weatherUrl" : "http://api.openweathermap.org/data/2.5/weather?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{apiKey}}\
&lang=ru",

		//"weatherUrl" : "files/openweathermap_Mochishche.json",
		//"weatherUrl" : "files/openweathermap_Novosibirsk.json",
		

		//https://openweathermap.org/forecast5

		"forecastUrl" : "http://api.openweathermap.org/data/2.5/forecast?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{apiKey}}\
&lang=ru",

//&callback=jsonp_callback",

		//"forecastUrl" : "files/openweathermap_Novosibirsk_forecast.json",
		
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
		webApp.vars["weatherAPI"]["openweathermap"]["templates"] = _getTemplates();
		webApp.vars["weatherAPI"]["openweathermap"]["dataProcess"] = _dataProcess;
	};
	
	var _getTemplates = function(){
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


		templates["mainTpl"] = templates["template-weather--openweathermap"];
		return templates;
	};//end _getTemplates()

	
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
}

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

	});//end event
	

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
				webApp.vars["tab-transport"].classList.remove("tab-active");
				webApp.vars["tab-weather"].classList.remove("tab-active");
				webApp.vars["tab-info"].classList.remove("tab-active");
				
				var activePaneId = webApp.vars["GET"]["target_id"];
				webApp.vars[activePaneId].classList.add("tab-active");
				
console.log(target);
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
				if( apiType === "transport"){
					apiObj = webApp.vars["transportAPI"];
var code = webApp.vars["transportAPI"].inputFrom.value;
webApp.vars["transportAPI"]["requestParams"]["from_code"] = code;
			
var code = webApp.vars["transportAPI"].inputTo.value;
webApp.vars["transportAPI"]["requestParams"]["to_code"] = code;
				}
				
				if( apiType === "weather"){
					apiObj = webApp.vars["weatherAPI"];

				}
				if( apiType === "forecast"){
					apiObj = webApp.vars["weatherAPI"];
				}

//-------------------
				var apiName = webApp.vars["GET"]["api-name"];
				if( !apiName || apiName.length === 0 ){
webApp.logMsg = "warning, empty or undefined API name";
//func.logAlert(webApp.logMsg, "warning");
console.log( webApp.logMsg );
				} else{
					apiObj = apiObj[apiName];
				}
				
				var dataUrl = apiObj["dataUrl"];
				
//-------------------
				if( apiName === "openweathermap")	{
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
					"apiName" : apiName,
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
		"apiName" : false,
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

	try{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", dataUrl, true);
		
		if(p.apiName === "yandex"){
			xhr.setRequestHeader("X-Yandex-API-Key", p.requestParams["apiKey"] );
			//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
		}
		
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

var logMsg = "ajax load time: " + e.timeStamp + "ms, "+ (e.timeStamp / 1000)+" sec , "; 
logMsg += "total: " + e.total + " bytes, "; 
logMsg += "loaded: " + e.loaded + " bytes, " + (e.loaded / 1024).toFixed(2)+" Kbytes"; 
//console.log( logMsg );	
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

webApp.vars["logMsg"] = "error, ajax load failed...";
//func.logAlert( _vars["logMsg"], "error");
func.logAlert( webApp.vars["logMsg"], "danger");

			for( var key in e){
//console.log( key +" : "+e[key] );
				webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
				func.logAlert( webApp.vars["logMsg"], "error");
			}//next
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
		p.apiObj.dataProcess( p.data );
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
