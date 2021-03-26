var func = sharedFunc();
//console.log("func:", func);

window.onload = function(){
func.logAlert( navigator.userAgent, "info");
	
	//Start webApp
	if( typeof webApp === "object"){
		_runApp();
	}

	function _runApp(){
		webApp.init(function(){
console.log("end webApp initialize....");
		});
	}//end _runApp()
	
};//end onload

var webApp = {
	
	"vars" : {
		"transportAPI": {
			"apiKey" : "b07a64bc-f237-4e79-9efb-b951ec68eaf7",
			//"dataUrl" : "data/2019-04-26.xml",
			"dataUrl" : "v1/data/2019-04-26.json",
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
/*
			"dataUrl" : "https://romanlaptev-cors.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/search/?\
from={{from_code}}&\
to={{to_code}}&\
apikey={{apikey}}&\
date={{date}}&\
transport_types=suburban&\
system=esr&\
show_systems=esr",
*/
			"requestParams" : {
				"from" : {
					"title" : "Новосибирск-восточный",
					"esr_code" : 851508
				},
				"to" : {
					"title" : "Раздолье (3362 км)",
					"esr_code" : 851635
				},
			},
			"copyRight": {
				//"url": "https://cors-anywhere.herokuapp.com/\
	//https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
				"url": "https://romanlaptev-cors.herokuapp.com/\
	https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
				"data": ""
			},
			"blocks": [
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

			],
			
		},//end transportAPI
		
		"weatherAPI": {
			"apiKey" : "dab03f2c-c76d-4fb6-9445-faa84fa80973",
			"key2": "7440bb4eee1e2d8d92bd8ca4a926ddd6",

			"dataUrl" : "https://romanlaptev-cors.herokuapp.com/\
https://api.weather.yandex.ru/v2/informers?\
lat={{latitude}}&\
lon={{longitude}}&\
lang=ru_RU",
/*
			"dataUrl" : "http://api.openweathermap.org/data/2.5/weather?\
lat={{latitude}}\
&lon={{longitude}}\
&units=metric\
&appid={{key2}}\
&callback=jsonp_callback",
*/
			//"dataUrl" : "files/test_ya_pogoda.json",
			//"dataUrl" : "files/openweathermap_Mochishche.json,
			//"dataUrl" : "files/openweathermap_Novosibirsk.json
			//"dataUrl" : "files/openweathermap_Novosibirsk_forecast.json

			"requestParams" : {
				//Moskow
				//"latitude": 55.75396,
				//"longitude": 37.620393,
			
//Новосибирск, Дзержинский район, Волочаевский жилмассив, 
				"latitude": 55.038115899999994,
				"longitude": 83.0094459,

//Дачная улица, 38
//посёлок Октябрьский, Мошковский район, Новосибирская область, Россия
				//"latitude": 55.169005, 
				//"longitude": 83.160846
			},
			
			dataTpl : {
//Объект фактической информации о погоде			
				"fact": {
//"Код расшифровки погодного описания"					
"condition": function(selectedOption){
	var options = {
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
	return options[selectedOption];
},
//Направление ветра
"wind_dir": function(selectedOption){
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
},

"daytime": function(selectedOption){
	var options = {
"d": "светлое время суток",
"n": "темное время суток"
	};
	return options[selectedOption];
},

"season": function(selectedOption){
	var options = {
"summer": "лето",
"autumn": "осень",
"winter": "зима",
"spring": "весна"
	};
	return options[selectedOption];
},

				},//end object fact
				
//forecast, Объект прогнозной информации о погоде
				"forecast": {
//Текстовый код для фазы Луны					
"moon_text": function(selectedOption){
	var options = {
"moon-code-0": "полнолуние",
"moon-code-1": "убывающая луна",
"moon-code-2": "убывающая луна",
"moon-code-3": "убывающая луна",
"moon-code-4": "последняя четверть",
"moon-code-5": "убывающая луна",
"moon-code-6": "убывающая луна",
"moon-code-7": "убывающая луна",
"moon-code-8": "новолуние",
"moon-code-9": "растущая луна",
"moon-code-10": "растущая луна",
"moon-code-11": "растущая луна",
"moon-code-12": "первая четверть",
"moon-code-13": "растущая луна",
"moon-code-14": "растущая луна",
"moon-code-15": "растущая луна"
	};
	return options[selectedOption];
},

//Название времени суток
"part_name": function(selectedOption){
	var options = {
"night": "ночь",
"morning": "утро",
"day": "день",
"evening": "вечер"
	};
	return options[selectedOption];
},


					
				},
			}//end forecast object
			
		},//end weatherAPI
		
		"logMsg" : "",
		
		"templates_url" : "tpl/templates.xml",
		"templates" : {},
		"init_url" : "?q=list-nodes",
		"timers": {
			"request":{}
		}
	},//end vars
	
	
	"init" : function( postFunc ){
console.log("init webapp!");

		this["vars"]["App"] = func.getById("App");
		this["vars"]["log"] = func.getById("log");
		
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		this["vars"]["waitWindow"] = func.getById("win1");
		this["vars"]["numTotalLoad"] = func.getById("num-total-load");
		
		var today = _timeStampToDateStr( new Date() );
//console.log(today);
		//$("#date-widget").val(today);
		this["vars"]["dateWidget"] = webApp.vars.App.querySelector("#date-widget");
		this["vars"]["dateWidget"].value = today;

		this["vars"]["tab-transport"] = webApp.vars.App.querySelector("#tab-transport");
		this["vars"]["tab-weather"] = webApp.vars.App.querySelector("#tab-weather");
		this["vars"]["tab-buttons"] = webApp.vars.App.querySelectorAll("#tab-buttons .tab-btn");
		
		//$("#from-title").val( webApp.vars["requestParams"]["from"]["title"] );
		this["vars"]["transportAPI"]["requestParams"]["from"]["title"] = webApp.vars.App.querySelectorAll("#from-title");
		$("#from-title").data("code", webApp.vars["transportAPI"]["requestParams"]["from"]["esr_code"]);
		
		//$("#to-title").val( webApp.vars["requestParams"]["to"]["title"] );
		$("#to-title").data("code", webApp.vars["transportAPI"]["requestParams"]["to"]["esr_code"]);
		this["vars"]["transportAPI"]["requestParams"]["to"]["title"] = webApp.vars.App.querySelectorAll("#to-title");

		_loadTemplates(function(){
//console.log("Load templates end...", webApp.vars["templates"] );
			defineEvents();
			
			//_runRequest({
				//callback : postFunc
			//});
			
		});
		
	}//end init()
	
};//end webApp()
console.log(webApp);



function _runRequest( opt ){
		var p = {
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);
	
	webApp.vars["timers"]["request"]["start"] = new Date();
	//view overlay
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
	}
	
	_loadData({
		"postFunc" : function(res){
//console.log(arguments);
//console.log(window.location);	
			//_loadCopyRightCode(function(){
				
				var parse_url = webApp.vars["init_url"];
				webApp.vars["GET"] = func.parseGetParams( parse_url ); 
				_urlManager();
				
				if( typeof p["callback"] === "function"){
					p.callback();
				}
				
			//});
			
		}//end callback
	});
	
}//end _runRequest()


function defineEvents(){
	webApp.vars["App"].addEventListener("click", function(e){
//console.log(e.type);
		event = e || window.e;
		var target = event.target || event.srcElement;
//console.log( target);
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
		if( target.tagName === "A"){
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
	
//------------------------------------------------------------------

/*
	$("#date-widget").on("change", function(event) {
console.log(event.type, $("#date-widget").val() );
		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
	});//end event
	
	$("#btn-update").on("click", function(event) {
//console.log("event...", $("#date-widget").val() );

		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
		
	});//end event
*/
	webApp.vars["dateWidget"].addEventListener("change", function(e){
console.log(e.type);
	});//end event

/*	
	$("#btn-change-direction").on("click", function(event) {
//console.log("event...", event.type );
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}

		var code1 = $("#from-title").data("code");
		var title1 = $("#from-title").val();
		
		var code2 = $("#to-title").data("code");
		var title2 = $("#to-title").val();
		
		$("#from-title").data("code", code2);
		$("#from-title").val( title2 );
		
		$("#to-title").data("code", code1);
		$("#to-title").val( title1 );
		
		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
		
	});//end event
*/
//------------------------------------------------------------------	
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

			case "list-nodes":
console.log("-- start build page --");

				_buildPage({"callback" : function(){
					
//hide overlay
//setTimeout(function(){
					if( webApp["vars"]["waitWindow"] ){
						webApp["vars"]["waitWindow"].style.display="none";
					}		
//}, 1000*3);
				webApp.vars["timers"]["request"]["end"] = new Date();
				webApp.vars["logMsg"] = "request runtime: " + _getRunTime( webApp.vars["timers"]["request"] ) + "sec";
				func.logAlert( webApp.vars["logMsg"],"info" );

console.log("-- end build page --");
					}
				});
			break;
			
			case "switch-tab":
				webApp.vars["tab-transport"].classList.remove("tab-active");
				webApp.vars["tab-weather"].classList.remove("tab-active");
				
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
				
				if( !webApp.vars["GET"]["api"] || 
					webApp.vars["GET"]["api"].length === 0
				){
webApp.logMsg = "error, empty or undefined API name";
func.logAlert(webApp.logMsg, "error");
					return false;
				}
				
				var apiName = webApp.vars["GET"]["api"];
				if( !webApp.vars[apiName] ){
webApp.logMsg = "error, wrong API object "+apiName;
func.logAlert(webApp.logMsg, "error");
					return false;
				}

				if( !webApp.vars[apiName]["dataUrl"] || 
					webApp.vars[apiName]["dataUrl"].length === 0
				){
webApp.logMsg = "error, empty or undefined API parameter 'dataUrl'";
func.logAlert(webApp.logMsg, "error");
					return false;
				}
				
				var requestParams = webApp.vars[apiName]["requestParams"];
				var url = webApp.vars[apiName]["dataUrl"];
				for(var key in requestParams){
					url = url.replace( new RegExp("{{"+key+"}}", "g"), requestParams[key] );
				}//next
				
//jsonp
//#https://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp				
 //var script = document.createElement('script');
 //script.src = url;
 //document.body.appendChild(script);
//return;				
    
				sendRequest({
					"dataUrl": url,
					"apiName" : apiName,
					"apiKey" : webApp.vars[apiName]["apiKey"],
					"callback" : function( response ){
//console.log(arguments);

						if(response){
							_parseAjax({
								"responseType": webApp.vars["responseType"],
								"response": response,
								"postFunc" : function( data ){
//console.log(arguments);
									if( data ){
										webApp.vars[apiName]["data"] = data;
										_buildWeatherHtml({
											"data": data
										});
									}
								}
							});
var logMsg = "end parse ajax response";
func.logAlert( logMsg, "info");
						}

					}//end callback
				});

			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);
			break;
		}//end switch
		
}//end _urlManager()


//============================== TEMPLATES
	function _loadTemplates( callback ){
		
		_loadTemplatesFromFile();
		
		function _loadTemplatesFromFile(){
			
			if( !webApp.vars["templates_url"] || 
				webApp.vars["templates_url"].length === 0 ){
webApp.vars["logMsg"] = "- error, not found 'templates_url'...";
func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
				if( typeof callback === "function"){
					callback(false);
				}
				return false;
			}
			
			func.runAjax({
				"requestMethod" : "GET", 
				"url" : webApp.vars["templates_url"], 
				//"onProgress" : function( e ){},
				//"onLoadEnd" : function( headers ){},
				"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error ajax load " + webApp.vars["templates_url"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				},
				
				"callback": function( data ){
webApp.vars["logMsg"] = "- read templates from <b>" + webApp.vars["templates_url"] +"</b>";
func.logAlert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );
//console.log( data );

					if( !data ){
console.log("error, loadTemplates(), not find data templates'....");
						if( typeof callback === "function"){
							callback(false);
						}
						return false;
					}
				
					try{
						//xmlNodes = func.convertXmlToObj( data );
						xmlNodes = func.parseXmlToObj( func, data );
//console.log(xmlNodes);
						if( xmlNodes.length > 0 ){
							for( var n= 0; n < xmlNodes.length; n++){
								var key = xmlNodes[n]["name"];

								var value = xmlNodes[n]["html_code"]
								.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
								.replace(/\t/g,"")
								.replace(/\n/g,"");
								
								webApp.vars["templates"][key] = value;
							}//next
							delete xmlNodes;
							
							//webApp.db.saveTemplates( webApp.draw.vars["templates"] );
						} else {
	console.log("error, loadTemplates(), cannot parse templates data.....");
						}
						
					} catch(e){
console.log(e, typeof e);
webApp.vars["logMsg"] = "TypeError: " + e;
func.logAlert( webApp.vars["logMsg"], "error");
					}//end try

					if( typeof callback === "function"){
						callback();
					}
				}//end
			});
			
		}//end _loadTemplatesFromFile()
		
	}//end _loadTemplates()



//===============================================
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		//if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="modal-backdrop in";
			//webApp.vars["wait"].style.display="block";
		//}
		
		var p = {
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);

		//draw blocks
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _block = webApp.vars["blocks"][n];
//console.log(_block["title"]);				

			if( typeof _block["buildBlock"] === "function"){//dynamic form content
				//if( _block["visibility"]){
					_block["buildBlock"]();
					//_block["draw"] = true;
				//}
			} else {
//webApp.vars["logMsg"] = "warning, not found buld function....";
//console.log( "-- " + webApp.vars["logMsg"], _block );
					if( _block["content"] && _block["content"].length > 0 ){
						_draw_buildBlock( _block );
					}
			}
			
		}//next
/*
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _opt = webApp.vars["blocks"][n];
			
			//do not redraw existing block
			if( _opt["draw"] && !_opt["refresh"]){
				continue;
			}
			
			if( _opt["visibility"]){
				
				//closures, need for async data getting from indexedDB
				(function(_opt_){
					//setTimeout(function(){ 
						//console.log("-- closure function, ", _opt_); 
					//}, 1000);
					//_draw_buildBlock( _opt_ );
					
					if( typeof _opt_["buildBlock"] === "function"){
						//if( _opt_["visibility"]){
							_opt_["buildBlock"]();
							_opt_["draw"] = true;
						//}
					} else {
webApp.vars["logMsg"] = "warning, not found buld function....";
console.log( "-- " + webApp.vars["logMsg"], _opt_ );
					}
				})(_opt);//end closure
			}

		}//next
*/

		//if( webApp.vars["wait"] ){
			////webApp.vars["wait"].className="";
			//webApp.vars["wait"].style.display="none";
		//}

		if( typeof p["callback"] === "function"){//return from _buildPage()
			p["callback"]();
		}
			
	};//end _buildPage()

//============================================== DATA
function _loadCopyRightCode( postFunc ){
/*	
	$.getJSON(  webApp.vars["copyRight"]["url"], function(data){
console.log(arguments);
		webApp.vars["copyRight"]["data"] = data;
		if( postFunc === "function"){
			postFunc();
		}
	});
	.done(function () {
console.log("$.ajax, Done...");
	})
	.fail(function (xhr, textStatus) {
webApp.vars["logMsg"] = "$.ajax, Fail..." + webApp.vars["copyRight"]["url"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"], arguments );
		if( typeof postFunc === "function"){
			postFunc();
		}
	});
*/	
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
console.log( webApp.vars["logMsg"] );
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


function _loadData( opt ){
//console.log("_loadData() ", arguments);
		var p = {
			"postFunc": null,
			"from_code" : $("#from-title").data("code"),
			"to_code" : $("#to-title").data("code"),
			"date": $("#date-widget").val()//2019-04-26
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p.date ||  p.date.length === 0){
webApp.vars["logMsg"] = "error, empty or wrong date...";
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
/*
		if( !p.from_code ||  p.from_code.length === 0){
webApp.vars["logMsg"] = "error, empty or from_code...";
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
		
		if( !p.to_code ||  p.to_code.length === 0){
webApp.vars["logMsg"] = "error, empty or to_code...";
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
*/		
		
		var dataUrl = webApp.vars["DB"]["dataUrl"]
		.replace("{{from_code}}", p["from_code"] )
		.replace("{{to_code}}", p["to_code"] )
		.replace("{{apikey}}", webApp.vars["apiKey"] )
		.replace("{{date}}", p.date );
console.log( dataUrl );		
//return;

		func.runAjax( {
			"requestMethod" : "GET", 
			"url" :  dataUrl, 
			
			"onProgress" : function( e ){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
				if( webApp.vars["loadProgressBar"] ){
					webApp.vars["loadProgressBar"].className = "progress-bar";
					webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
					webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
					
					webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
				}
				
			},
				
			"onLoadEnd" : function( headers ){
//console.log( headers );
			},
			
			"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["DB"]["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
				if( typeof p["postFunc"] === "function"){
					p["postFunc"]();
				}
				//return false;
			},

			"callback": function( data, runtime, xhr ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
				_parseAjax({
					"responseType": xhr.getResponseHeader('content-type'),
					"response": data
				});

				if( typeof p["postFunc"] === "function"){
					p["postFunc"]();
				}
			}//end callback()
		});

		//return false;
		
	}//end _loadData()


	function _parseAjax( opt ){
		
		var p = {
			"responseType": null,
			"response": false,
			"postFunc": null
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

		if( typeof p["postFunc"] === "function"){
			p["postFunc"]( parseData );
		}
		
	}//_parseAjax()



	function sendRequest( opt ){
		var p = {
			"dataUrl" : false,
			"apiKey" : false,
			"apiName" : false,
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

		var dataUrl = p["dataUrl"];
		try{
			var xhr = new XMLHttpRequest();
			xhr.open("GET", dataUrl, true);
			if(p.apiName === "weatherAPI"){
				xhr.setRequestHeader("X-Yandex-API-Key", p["apiKey"] );
				//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
			}
			xhr.onload = function(e) {
	console.log(arguments);
	// console.log("event type:" + e.type);
	console.log("time: " + e.timeStamp);
	console.log("total: " + e.total);
	console.log("loaded: " + e.loaded);	
	//console.log( this.responseText );
	//func.log( this.responseText, "response");
				
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
	console.log(arguments);		
	console.log(e);		
	//for(var key in xhr){
	//console.log( key +" : "+xhr[key] );
	//}

	webApp.vars["logMsg"] = "error, ajax load failed...";
	//func.logAlert( _vars["logMsg"], "error");
	func.logAlert( webApp.vars["logMsg"], "danger");
				p.callback(false);
			}
			
			xhr.onloadend = function(e){
	//console.log(xhr.getResponseHeader('X-Powered-By') );
	console.log( xhr.getAllResponseHeaders() );
			}//end onloadend
			
			xhr.send();
			
		} catch(e){
	console.log(e);	
		}	
		
	}//end sendRequest()


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
/*
			//correct departure, duration, arrival
			for( var n = 0; n < jsonObj["segments"].length; n++){
				var record = jsonObj["segments"][n];
				record["duration"] = Math.round( record["duration"] / 60);
				// if( record["duration"] > 60){
					// record["duration"] = record["duration"] / 60;
				// }
				var _d = new Date( record["departure"] );
				record["departure_day"] = _d.getDate() +" "+ func.getMonthByNameNum( _d.getMonth(), "ru" );
				var _min = _d.getMinutes();
				if( _min < 10){
					_min = "0" + _min;
				}
				record["departure_time"] = _d.getHours() +":"+_min;
				delete record["departure"];
				
				var _d = new Date( record["arrival"] );
				record["arrival_day"] = _d.getDate() +" "+ func.getMonthByNameNum( _d.getMonth(), "ru" );
				var _min = _d.getMinutes();
				if( _min < 10){
					_min = "0" + _min;
				}
				record["arrival_time"] = _d.getHours() +":"+_min;
				delete record["arrival"];
			}//next
*/			
			return jsonObj;
			
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
func.logAlert( webApp.vars["logMsg"], "error");
			return;
		}//end catch

	}//end _parseJSON()
	
//==============================================
function _buldScheduleHtml(opt){
//console.log(opt);
	var p = {
		data: false
	}
	
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);
	
	if( !p.data ){
webApp.vars["logMsg"] = "error, not find data object..." ;
func.logAlert( webApp.vars["logMsg"], "error");
return false;
	}
/*
	var data = webApp.vars["DB"]["data"]["search"];
	data["from_title"] = data["from"]["title"];
	data["to_title"] = data["to"]["title"];
	var htmlSearch = _draw_wrapData({
		"data": data,
		"templateID": "tpl-schedule-search",
		//"templateListItemID": "tpl-playlist-item"
	});
*/
	var htmlTable = webApp.vars["templates"]["tpl-schedule-table"];
	webApp.vars["tplNameList"] = "tpl-schedule-table--tr";
	if( window.screen.width <= 460 ){
//console.log("TEEST");
		var htmlTable = webApp.vars["templates"]["tpl-schedule-mobile"];
		webApp.vars["tplNameList"] = "tpl-schedule-mobile--record";
	}

	var data = p.data["segments"];
	var htmlTableList = "";
	for(var n = 0; n < data.length; n++){
		htmlTableList += __buildTableList( data[n] );
	}//next
	htmlTable = htmlTable.replace("{{list}}", htmlTableList);
	
	//var html = htmlSearch + htmlTable;
	var html = htmlTable;
//console.log( html);

	return html;
	
	
	function __buildTableList( data ){
		//var htmlList = webApp.vars["templates"]["tpl-schedule-table--tr"];
		var record = {};
		
		//copy data object
		for(var key in data){
//console.log(key, data[key], typeof data[key] );
			if( typeof data[key] === "object"){
				__addObjectFiels( key, data[key], record );
			} else {
				record[key] = data[key];
			}
		}//next
		
//console.log(record);
		
		var htmlList = _draw_wrapData({
			"data": record,
			//"templateID": "tpl-schedule-table--tr",
			"templateID": webApp.vars["tplNameList"],
		});
		return htmlList;
	}//end __buildTableList()
	
	function __addObjectFiels( parentKey, srcObj, dstObj ){
		for(var key in srcObj){
			if( typeof srcObj[key] === "object"){
				__addObjectFiels( key, srcObj[key], dstObj );
			} else {
				var _key = parentKey+"_"+key;
				dstObj[_key] = srcObj[key];
			}
		}//next
	}//end __addObjectFields()
	
}//end _buildScheduleHtml()


function _buildWeatherHtml(opt){
//console.log(opt);
	var p = {
		data: false
	}
	
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);
	
	if( !p.data ){
webApp.vars["logMsg"] = "error, not find data object..." ;
func.logAlert( webApp.vars["logMsg"], "error");
return false;
	}

	var html = document.querySelector("#response").innerHTML;
	
	var serverTime = func.timeStampToDateStr({
		"timestamp": p.data["now"],
		"format": "yyyy-mm-dd hh:min:sec"
	});
	html = html.replace("%now%", serverTime)
.replace("%now_dt%", p.data["now_dt"]);	

//info
	html = html
.replace("%lat%", p.data["info"]["lat"])
.replace("%lon%", p.data["info"]["lon"])
.replace("%url%", p.data["info"]["url"]);	

//fact
	var selectedCondition = webApp.vars.weatherAPI.dataTpl.fact.condition(
		p.data["fact"]["condition"]
	);
	var selectedWind = webApp.vars.weatherAPI.dataTpl.fact.wind_dir(
		p.data["fact"]["wind_dir"]
	);
	var selectedDayTime = webApp.vars.weatherAPI.dataTpl.fact.daytime(
		p.data["fact"]["daytime"]
	);
	var selectedSeason = webApp.vars.weatherAPI.dataTpl.fact.season(
		p.data["fact"]["season"]
	);
	var obsTime = func.timeStampToDateStr({
		"timestamp": p.data["fact"]["obs_time"],
		"format": "yyyy-mm-dd hh:min"
	});

	html = html
.replace("%temp%", p.data["fact"]["temp"])
.replace("%feels_like%", p.data["fact"]["feels_like"])
.replace("%temp_water%", p.data["fact"]["temp_water"])
.replace("%icon%", p.data["fact"]["icon"])
.replace("%condition%", selectedCondition )
.replace("%wind_speed%", p.data["fact"]["wind_speed"])
.replace("%wind_gust%", p.data["fact"]["wind_gust"])
.replace("%wind_dir%", selectedWind)
.replace("%pressure_mm%", p.data["fact"]["pressure_mm"])
.replace("%pressure_pa%", p.data["fact"]["pressure_pa"])
.replace("%humidity%", p.data["fact"]["humidity"])
.replace("%daytime%", selectedDayTime)
.replace("%polar%", p.data["fact"]["polar"])
.replace("%season%", selectedSeason)
.replace("%obs_time%", obsTime);

//forecast
	var selectedMoonText = webApp.vars.weatherAPI.dataTpl.forecast.moon_text(
		p.data["forecast"]["moon_text"]
	);
	
	html = html
.replace("%date%", p.data["forecast"]["date"])
.replace("%date_ts%", p.data["forecast"]["date_ts"])
.replace("%week%", p.data["forecast"]["week"])
.replace("%sunrise%", p.data["forecast"]["sunrise"])
.replace("%sunset%", p.data["forecast"]["sunset"])
.replace("%week%", p.data["forecast"]["week"])
//.replace("%moon_code%", p.data["forecast"]["moon_code"])
.replace("%moon_text%", selectedMoonText);

//forecast parts
	var html_parts=document.querySelector("#forecast-parts-0").innerHTML;
	
	var partObj = p.data["forecast"]["parts"][0];
	var selectedPartName = webApp.vars.weatherAPI.dataTpl.forecast.part_name(
		partObj["part_name"]
	);
	var selectedCondition2 = webApp.vars.weatherAPI.dataTpl.fact.condition(
		partObj["condition"]
	);
	var selectedWind2 = webApp.vars.weatherAPI.dataTpl.fact.wind_dir(
		partObj["wind_dir"]
	);
	var selectedDayTime2 = webApp.vars.weatherAPI.dataTpl.fact.daytime(
		partObj["daytime"]
	);

	html_parts = html_parts
.replace("%part_name%", selectedPartName)
.replace("%temp_min%", partObj["temp_min"])
.replace("%temp_max%", partObj["temp_max"])
.replace("%temp_avg%", partObj["temp_avg"])
.replace("%feels_like%", partObj["feels_like"])
.replace("%icon%", partObj["icon"])
.replace("%condition%", selectedCondition2)
.replace("%daytime%", selectedDayTime2)
.replace("%polar%", partObj["polar"])
.replace("%wind_speed%", partObj["wind_speed"])
.replace("%wind_gust%", partObj["wind_gust"])
.replace("%wind_dir%", selectedWind2)
.replace("%pressure_mm%", partObj["pressure_mm"])
.replace("%pressure_pa%", partObj["pressure_pa"])
.replace("%humidity%", partObj["humidity"])
.replace("%prec_mm%", partObj["prec_mm"])
.replace("%prec_period%", partObj["prec_period"])
.replace("%prec_prob%", partObj["prec_prob"]);
	html = html.replace("%forecast_part0%", html_parts);


//---------------
	var html_parts=document.querySelector("#forecast-parts-0").innerHTML;
	
	var partObj = p.data["forecast"]["parts"][1];
	var selectedPartName = webApp.vars.weatherAPI.dataTpl.forecast.part_name(
		partObj["part_name"]
	);
	var selectedCondition2 = webApp.vars.weatherAPI.dataTpl.fact.condition(
		partObj["condition"]
	);
	var selectedWind2 = webApp.vars.weatherAPI.dataTpl.fact.wind_dir(
		partObj["wind_dir"]
	);
	var selectedDayTime2 = webApp.vars.weatherAPI.dataTpl.fact.daytime(
		partObj["daytime"]
	);

	html_parts = html_parts
.replace("%part_name%", selectedPartName)
.replace("%temp_min%", partObj["temp_min"])
.replace("%temp_max%", partObj["temp_max"])
.replace("%temp_avg%", partObj["temp_avg"])
.replace("%feels_like%", partObj["feels_like"])
.replace("%icon%", partObj["icon"])
.replace("%condition%", selectedCondition2)
.replace("%daytime%", selectedDayTime2)
.replace("%polar%", partObj["polar"])
.replace("%wind_speed%", partObj["wind_speed"])
.replace("%wind_gust%", partObj["wind_gust"])
.replace("%wind_dir%", selectedWind2)
.replace("%pressure_mm%", partObj["pressure_mm"])
.replace("%pressure_pa%", partObj["pressure_pa"])
.replace("%humidity%", partObj["humidity"])
.replace("%prec_mm%", partObj["prec_mm"])
.replace("%prec_period%", partObj["prec_period"])
.replace("%prec_prob%", partObj["prec_prob"]);
	html = html.replace("%forecast_part1%", html_parts);

	document.querySelector("#response").innerHTML = html;
}//end _buildWeatherHtml()



//============================================== DRAW
	function _draw_wrapData( opt ){
		var p = {
			"data": null,
			//"type" : "",
			//"wrapType" : "menu",
			"templateID" : false,
			"templateListItemID": false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw_wrapData(), error, incorrect data ...");
			return false;
		}
		if( !p["templateID"] ){
console.log("-- _draw_wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.vars["templates"][p.templateID] ){
webApp.vars["logMsg"] = "-- _draw_wrapData(),  error, not find template, id: " + p.templateID;
func.logAlert( webApp.vars["logMsg"], "warning");
console.log(webApp.vars["logMsg"]);
			return false;
		}
		
		var html = "";
//console.log( p["data"].length );

		p["wrapType"] = "item";
		if( p["data"].length > 0 ){
			p["wrapType"] = "list";
		}
		switch( p["wrapType"] ){
			case "item" :
				html = __formNodeHtml( p["data"], webApp.vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListItemID"] ){
webApp.vars["logMsg"] = "-- wrapData(), error, var templateListItemID incorrect...";
console.log(webApp.vars["logMsg"]);							
					return false;
				}
				html = __formListHtml( webApp.vars["templates"][ p.templateID ] );
			break;
		}//end switch
		
//console.log(html);
		return html;

		function __formNodeHtml( data, _html ){
			
			for( var key in data ){
//console.log(key, data[key]);
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, data[key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
				}
			}//next
			
//--------------- clear undefined keys (text between {{...}} )
_html = _html.replace( new RegExp(/{{(.*?)}}/g), "");
//--------------------			

			return _html;
		}//end __formNodeHtml()
		
		function __formListHtml( _html ){
			
			var listHtml = "";
			for( var n = 0; n < p["data"].length; n++){
//console.log( n );
//console.log( p["data"][n], typeof p["data"][n], p["data"].length);

				//form list items
				var item = p["data"][n];
					
				//var itemTpl = _vars["templates"][ p.templateListID];
				//var itemHtml = __formNodeHtml( item, itemTpl );
				
				var itemHtml = webApp.vars["templates"][ p.templateListItemID];
				
				
				//load unique template for item
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.vars["templates"][ tplName ] ){
						itemHtml = webApp.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
					}
				}

//--------------- get keys from template (text between {{...}} )
				//if(n === 1){
					var tplKeys = itemHtml.match(/{{(.*?)}}/g);
					for(var n1 = 0; n1 < tplKeys.length; n1++){
						tplKeys[n1] = tplKeys[n1].replace("{{","").replace("}}","");
					}//next
//console.log( tplKeys, p.templateListItemID, item );
				//}
//---------------

				//make copy object item
				//var _tmp = {
					//"number": item["number"]
				//};
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							item[key2] = "<span class='not-found-item'>not found " + key2 +"</span>";
						} else {
							var subOrdList = item[key2]["listTpl"];
							var itemTpl = item[key2]["itemTpl"];
	/*						
							if( key2 === "title" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-title"];
							}

							if( key2 === "ul" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-links"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-ul"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}

							if( key2 === "tags" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-tags"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-tag"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}
							
							if( key2 === "pictures" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-pictures"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-img"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
	////console.log( "subOrdListHtml: ", subOrdListHtml );
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
	////console.log( subOrdList );
								//item[key2] = subOrdList;
							}
	*/						
							var subOrdListHtml = "";
							for( var n2 = 0; n2 < item[key2].length; n2++){
//console.log( item[key2][n2]["text"] );
								subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
							}//next
//console.log( subOrdListHtml );
							subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
//console.log( subOrdList );
							//item[key2] = subOrdList;
							
							//do not add HTML code to item object!!!
							_tmp[key2] = subOrdList;
						}							
					}
					
					if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
//if(n === 1){
//console.log(key2, item[key2]);
//}						
						if( typeof item[key2] === "undefined"){
//if(n === 1){
//console.log(key2, item[key2], typeof item[key2]);
//}						
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item'>not found " + key2 +"</span>");
						} else {
							//itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), item[key2] );
							itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), _tmp[key2] );
						}
					}
					
				}//next
					
				listHtml += itemHtml;
//console.log(items);
//console.log(listHtml);
			}//next
			
			_html = _html.replace("{{list}}", listHtml);
			return _html;
		}//end __formListHtml

	}//end _draw_wrapData()


	var _draw_buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
		var timeStart = new Date();
		var p = {
			"title": "",
			"content" : "",
			//"contentType" : "",
			"templateID" : "tpl-block",
			"contentTpl" : "tpl-list",//"tpl-menu"
			"contentListTpl" : false,
			
			"callback" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);			
				//webApp.app.vars["runtime"].push({
					//"source" : msg,
					//"ms" : ms,
					//"sec" : ms / 1000
				//});
				
				//if( typeof p["callback2"] === "function"){
					//p["callback2"]();//return from _buildBlock()
				//}
				
			}//,//end callback
			//"callback2" : null
		};
//console.log(opt);
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		_draw_insertBlock( p );
	};//end _draw_buildBlock()


	var _draw_insertBlock = function( opt ){
		var p = {
			"templateID": false,
			"locationID": "block-1",
			"title" : "block",
			"content" : false,
			"callback":null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log("_draw_insertBlock()", p);

		var templateID = p["templateID"];
		if( !webApp.vars["templates"][templateID] ){
webApp.vars["logMsg"] = "_draw_insertBlock(), error, not found template, id:" + templateID;
//func.logAlert( webApp.vars["logMsg"], "error");
console.log( "-- " + webApp.vars["logMsg"] );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		if( !p["content"] || p["content"].length === 0){
webApp.vars["logMsg"] = "_draw_insertBlock(), warning, not found or empty content block " + p["locationID"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- "+webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"]();
			//}
			//return false;
		}
		
		var html = webApp.vars["templates"][templateID];
		html = html.replace("{{block_title}}", p["title"]);
		html = html.replace("{{content}}", p["content"]);
		
		var locationBlock = func.getById( p["locationID"] );
		if( locationBlock ){
			locationBlock.innerHTML = html;
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["callback"] === "function"){
			p["callback"]();
		}

	};//end _draw_insertBlock()

//=================================================
	function _timeStampToDateStr( timestamp ){
		var sYear = timestamp.getFullYear();

		var sMonth = timestamp.getMonth() + 1;
		//console.log( sMonth, typeof sMonth );
			if( sMonth < 10){
				sMonth = "0" + sMonth;
			}
			sMonth = "" + sMonth;
			
			var sDate = timestamp.getDate();
			if( sDate < 10){
				sDate = "0" + sDate;
			}
				
			var dateStr = sYear + "-" + sMonth + "-" + sDate;
			return dateStr;
	}//end _timeStampToDateStr()
	
	function _getRunTime( timer){
		return ( timer.end.getTime() - timer.start.getTime() ) / 1000;
	}//end _getRunTime()


function jsonp_callback(response){
console.log("test jsonp", response);
}
