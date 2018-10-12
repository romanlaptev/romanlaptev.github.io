/*
use module:
//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);

	var func = sharedFunc();
//console.log("func:", func);

	func.sortRecords({
		"records" : terminNodes,
		"sortOrder": "asc", //desc
		"sortByKey": "author"
	});
*/

//(function(){
	var sharedFunc =  sharedFunc || function(){


		if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);

			$(document).ready(function(){
//....				
			});//end ready	

		}
		
		// private variables and functions
		//.......

		function _getById(id){
			
			if( document.querySelector ){
				var obj = document.querySelector("#"+id);
				return obj;
			}
			
			if( document.getElementById ){
				var obj = document.getElementById(id);
				return obj;
			}
			
			if( document.all ){
				var obj = document.all[id];
				return obj;
			}
			
			//if( document.layers ){
				//var obj = document.layers[id];
				//return obj;
			//}
			
			return false;
		}//end _getById()


		function _log( msg, id){
//console.log(arguments);
//alert(arguments.length);
//		for( var n = 0; n < arguments.length; n++){
//			var _s = "<li> arguments." + n +" = "+ arguments[n] + "</li>";
//alert( _s );
//		}
			var id = id || arguments[1];//IE4 fix
//alert( msg );
//alert( id );

			if(!id){
				var id = "log";
			}
			
			var output = _getById(id);
			if( output ){	
				if( msg.length == 0){
					output.innerHTML = "";
				} else {
					output.innerHTML += msg;
				}
				
			} else {
				console.log(msg);
				//alert(msg);
				//document.writeln(msg);
			}
			
			if( typeof _showHiddenLog === "function"){
		//console.log(_showHiddenLog);
				_showHiddenLog();
			}
			
		}//end _log()

		function _push( ar, item){
			if( ar.push ){
				ar.push(item);
			} else {
				var num = ar.length;
				ar[num] = item;
			}
		}// end _push()


		var _timer = {};
		var _set_timer = function (){
			var d = new Date;
			return d.getTime();
		};

		var _get_timer = function (timer){
			var d = new Date;
			return parseFloat((d.getTime() - timer)/1000);
		};


		function _get_attr_to_obj( attr ){
			var item_attr = {};
			for(var item = 0; item < attr.length; item++) {
				item_attr[attr[item].name] = attr[item].value;
			}
			return item_attr;
		}//end _get_attr_to_obj()


		// SORT by key, alphabetical sorting
		function _sortRecords(opt){
		//console.log(opt);
			var p = {
				records: [],
				"sortOrder": "asc", //desc
				"sortByKey": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
		//console.log(p);

			if(p.records.length === 0 ){
				var logMsg = "error, not found sorting records, function sortRecords()";
		_log("<div class='alert alert-danger'>" + logMsg + "</div>");
console.log( logMsg );
				return false;
			}
			
			if(!p.sortByKey){
				var logMsg = "error, not found 'sortByKey', function sortRecords()";
		_log("<div class='alert alert-danger'>" + logMsg + "</div>");
console.log( logMsg );
				return false;
			}
			
			p.records.sort(function(a,b){
		//console.log(a, b);
				var s1 = a[p.sortByKey];
				var s2 = b[p.sortByKey];
				switch(p.sortOrder){
					case "asc":
						if (s1 > s2) {
							return 1;
						}
						if (s1 < s2) {
							return -1;
						}
						// s1 === s2
						return 0;
					break
					
					case "desc":
						if (s1 > s2) {
							return -1;
						}
						if (s1 < s2) {
							return 1;
						}
						// s1 === s2
						return 0;
					break
				}//end swith()
			});//end sort
			
		}//end _sortRecords()


		//**************************************
		//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
		//$_GET = parseGetParams(); 
		//or 
		//$_GET = parseGetParams("?test=1"); 
		//console.log( $_GET);
		//**************************************
		function _parseGetParams( parseStr ) { 
//console.log(parseStr);
//console.log(window.location);

			if( !parseStr ){
				var parse_url = window.location.search.substring(1).split("&"); 
			} else {
				p = parseStr.split("?");
			//console.log(p);
				parseStr = p["1"];
				var parse_url = parseStr.split("&"); 
			}
			
			var $_GET = {}; 
			for(var n = 0; n < parse_url.length; n++) { 
			var getVar = parse_url[n].split("="); 
				//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
				if( typeof(getVar[1])=="undefined" ){
					$_GET[ getVar[0] ] = "";
				} else {
				 $_GET[ getVar[0] ] = getVar[1];
				}
			}//next
			return $_GET; 
		}//end _parseGetParams() 



		/*
			runAjax( {
				"requestMethod" : "GET", 
				"enctype" : "application/x-www-form-urlencoded",
				"url" : _vars["db_url"], 
				"params" : params,// object
				"formData": null, //object formData
				"onProgress" : function(e){	},
				"callback": _postFunc
			});
		*/
		function _runAjax( opt ){
//console.log(arguments);
			
			var p = {
				"requestMethod" : "GET", 
				"responseType" : "", //arraybuffer, blob, document, ms-stream, text
				"enctype" : "application/x-www-form-urlencoded",
				//"enctype" : "multipart/form-data",
				"url" : false, 
				"params": null,//params object
				"formData": null,
				"async" :  true,
				"callback" : null,
				"onProgress" : null,
				"onError" : null,
				"onLoadEnd" : null
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
		//console.log(p);

			var requestMethod = p["requestMethod"]; 
			var url = p["url"]; 
			var async = p["async"]; 
			var callback = p["callback"]; 

			//get values from params and form paramsStr....
			//if( requestMethod === "GET"){
				var num=0;
				if( p["params"] ){
					var paramsStr = "";
					for( var item in p["params"]){
						var value = encodeURIComponent( p["params"][item] );
						if( num > 0){
							paramsStr += "&";
						}
						paramsStr += item + "=" + value;
						num++;
					}//next
					url += "?"+ paramsStr;
					url += "&noCache=" + (new Date().getTime()) + Math.random(); //no cache
				} else {
					url += "?noCache=" + (new Date().getTime()) + Math.random(); //no cache
				}
			//}

			
			if( !url || url.length === 0){
				var msg = "Parameters error, needed 'url'";			
		console.log( msg );
		//_log( "<p  class='text-danger'>" +msg+"</p>");
				return false;
			}
			
			var xhr = _createRequestObject();

			if ( !xhr ) {
		console.log("error, ", xhr);
				var msg = "_createRequestObject() error";			
		console.log( msg, xhr );
		//_log( "<p  class='text-danger'>" +msg+"</p>");
				return false;
			}

		/*
			//block overlay and wait window
			var overlay = getById("overlay");
			if( overlay ){
				overlay.className="modal-backdrop in";
				overlay.style.display="block";
			}
			var waitWindow = getById("wait-window");
			if( waitWindow ){
				waitWindow.className="modal-dialog";
				waitWindow.style.display="block";
			}
		*/
			
			var timeStart = new Date();

			xhr.open( requestMethod, url, async );
			
			//Check responseType support:
		//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
		//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
		//Error, "The response type cannot be changed for synchronous requests made from a document."
			// Opera 12 crash!!!!
			// if( "responseType" in xhr && p["async"] ){
				// xhr.responseType = p["responseType"];
			// }
				
			xhr.onreadystatechange  = function() { 
		//console.log("state:", xhr.readyState);
				if( xhr.readyState == 4) {
		//console.log( xhr  );
		//for(var key in xhr){
		//console.log( key +" : "+xhr[key] );
		//}

		//console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
		//console.log( "xhr.onerror = ", xhr.onerror  );

		/*
						//hide block overlay and wait window
						if( overlay ){
							//overlay.className="";
							overlay.style.display="none";
						}
						if( waitWindow ){
							waitWindow.style.display="none";
						}
		*/					
						if( xhr.status === 200){
							
							var timeEnd = new Date();
							var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
		var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
		console.log(msg);
		// console.log( "xhr.responseText: ", xhr.responseText );
		// console.log( "xhr.responseXML: ", xhr.responseXML );
		// if( "responseType" in xhr){
		// console.log( "xhr.response: ", xhr.response );
		// console.log( "responseType: " + xhr.responseType );
		// }

		// try{
		// console.log( "xhr.responseText: ", xhr.responseText );
		// } catch(e){
		// console.log( e );
		// }

		// try{
		// console.log( "xhr.responseXML: ", xhr.responseXML );
		// } catch(e){
		// console.log( e );
		// }
							if( typeof callback === "function"){
								
								if( xhr.responseXML ){
		//var test = xhr.responseXML.selectNodes("//pma_xml_export");	
		//var test = xhr.responseXML.getElementsByTagName("database");
		//console.log( test.item(0).nodeName);

									//fix IE8
		//console.log("Content-Type:: " + xhr.getResponseHeader("Content-Type") );
									var contentType = xhr.getResponseHeader("Content-Type");
									if( contentType === "application/xml" ||
										contentType === "text/xml"){
										var data = xhr.responseXML;
									} else {
										var data = xhr.responseText;
									}

									callback( data, runtime, xhr );
								} else {
									var data = xhr.responseText;
									callback( data, runtime, xhr );
								}
							}
							//if browser not define callback "onloadend"
							var test = "onloadend" in xhr;
							if( !test ){
								_loadEnd();
							}

						} else {
		//console.log(xhr);					
		console.log("Ajax load error, url: " + xhr.responseURL);
		console.log("status: " + xhr.status);
		console.log("statusText:" + xhr.statusText);

		// var msg = "";
		// msg += "<p>Ajax load error</p>";
		// msg += "<p>url: " + xhr.responseURL + "</p>";
		// msg += "<p>status: " + xhr.status + "</p>";
		// msg += "<p>status text: " + xhr.statusText + "</p>";
		// _log("<div class='alert alert-danger'>" + msg + "</div");

							if( typeof  p["onError"] === "function"){
								p["onError"](xhr);
							}
						}
						
				}
			};//end xhr.onreadystatechange
			
			if( "onloadstart" in xhr ){
				xhr.onloadstart = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

			if( "onload" in xhr ){
				xhr.onload = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

			if( "onloadend" in xhr ){
				xhr.onloadend = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
		//console.log(xhr.getResponseHeader('X-Powered-By') );
					_loadEnd();
				}//end event callback
			}
			
			function _loadEnd(){
				var all_headers = xhr.getAllResponseHeaders();
		//console.log( all_headers );
				if( typeof  p["onLoadEnd"] === "function"){
					p["onLoadEnd"](all_headers);
				}
			}//end _loadEnd()
			
		//console.log( "onprogress" in xhr  );
		//console.log( xhr.responseType, typeof xhr.responseType );
		//console.log( window.ProgressEvent, typeof  window.ProgressEvent);
			if( "onprogress" in xhr ){
				xhr.onprogress = function(e){
		//console.log("ajax onprogress");
		//console.log(arguments);

					if( typeof  p["onProgress"] === "function"){
						p["onProgress"](e);
					}
				}
				
				//xhr.addEventListener('progress', function(e) {
		//console.log("ajax onprogress", e);
				//}, false);
				
		//console.log( "xhr.onprogress ", xhr.onprogress);
		//console.log( "xhr.onprogress ", xhr.onprogress.handleEvent  );
			}

			if( "onabort" in xhr ){
				xhr.onabort = function(e){
		// console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

		//console.log( "onerror" in xhr  );
		//console.log( "xhr.onerror " + xhr.onerror  );
			if( "onerror" in xhr ){
		//console.log( "xhr.onerror = ", xhr.onerror  );
				xhr.onerror = function(e){
		//console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
					// if( typeof  p["onError"] === "function"){
						// p["onError"]({
							// "url" : xhr.responseURL,
							// "status" : xhr.status,
							// "statusText" : xhr.statusText
						// });
					// }
				}
			}

		//console.log(xhr.upload);
			if( xhr.upload ){
				
				xhr.upload.onerror = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};
			
				xhr.upload.onabort = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};
			
				xhr.upload.onload = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};
			
				xhr.upload.onloadstart = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};
				
				xhr.upload.onloadend = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};
				
				//Listen to the upload progress.
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						var percent = (e.loaded / e.total) * 100;
		console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percent+"%" );
					}
				};
				
				xhr.upload.ontimeout = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};

			}
			
			//send query	
			if( requestMethod !== "POST"){
				xhr.send();
			} else {
				
				//http://learn.javascript.ru/xhr-forms
				//form POST body
				if( p["enctype"] === "application/x-www-form-urlencoded"){
					
					var test = "setRequestHeader" in xhr;
			//console.log( "setRequestHeader: " + test );
					if (test) {
						xhr.setRequestHeader("Content-Type", p["enctype"]);
					}
					
					var body = "";
					var n = 0;
					for(var key in p["formData"]){
						var value = p["formData"][key];
						if( n > 0){
							body += "&";
						}
						body += key + "=" + encodeURIComponent(value);
						n++;
					}//next
		//console.log( body );
					xhr.send( body );
				} else {
					xhr.send( p["formData"] );
				}
			}

			function _createRequestObject() {
				var request = false;
				
				if (window.XMLHttpRequest) { // Mozilla, Safari, Opera ...
		//console.log("try use XMLHttpRequest");		
					request = new XMLHttpRequest();
				} 

				if(!request){ // IE
		//console.log("try use Microsoft.XMLHTTP");		
					request = new ActiveXObject("Microsoft.XMLHTTP");
				}

				if(!request){
		//console.log("try use Msxml2.XMLHTTP");		
					request=new ActiveXObject('Msxml2.XMLHTTP');
				}

				return request;
			}//end _createRequestObject()
			
		}//end _runAjax()

		
		// public interfaces
		return{
			getById: _getById,
			log:	_log,
			
			push: _push,
			set_timer: _set_timer,
			get_timer: _get_timer,
			get_attr_to_obj: _get_attr_to_obj,
			
			sortRecords: _sortRecords,
			parseGetParams: _parseGetParams,
			runAjax: _runAjax//,
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
		
	};//end sharedFunc
	
	//window.Lib = Lib;
//})();


		//console.log for old IE
		if (!window.console){ 
			window.console = {
				"log" : function( msg ){
					var log = getById("log");
					if(log){
						log.innerHTML += msg +"<br>";
					} else {
						alert(msg);
						//document.writeln(msg);
					}
				}
			}
		};



 //**************************************
//  создать объект XMLHttpRequest
 //**************************************
function getXMLDocument(url)  
{  
     var xml;  
     if(window.XMLHttpRequest)  
     {  
         xml=new window.XMLHttpRequest();  
         xml.open("GET", url, false);  
         xml.send("");  
//alert (xml.responseText);
         return xml.responseXML;  
     }  
     else  
         if(window.ActiveXObject)  
         {  
             xml=new ActiveXObject("Microsoft.XMLDOM");  
             xml.async=false;  
             xml.load(url);  
             return xml;  
         }  
         else  
         {  
             alert("Загрузка XML не поддерживается браузером");  
             return null;  
         }  
}//-----------------------------------------------------------------end func
/*
function load_xml( url, func_success )
{
	$.ajax ({
			//async: false,
			type: "POST", //GET, PUT, DELETE
			url: url,
			dataType:"xml",// xml, html, script, json, jsonp, text
			//data: ({fs_path: dirname, file: file}), //"name=John&location=Boston"
			//processData:false,// Если необходимо отослать документ DOM, то установите данную опцию в false.
			//cache:false, //отключить кеширование браузером запрашиваемых страниц
			//contentType 	Строка 	По умолчанию: «application/x-www-form-urlencoded»
			beforeSend: function (XMLHttpRequest) 
			{
console.log("beforeSend function");

//for ( item in XMLHttpRequest)
//{
	//console.log("XMLHttpRequest[" +item+ "] = " + XMLHttpRequest[item]);
//}

				//return false; //отмена запроса
			},

			//dataFilter: function (data, type) // функция предназначена для предварительной обработки ответа.
			//{
//console.log("dataFilter function , type - " + type);
			  ////return data;
			//},

			success: func_success,
			error:function( data, status, errorThrown )
			{
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
			},
			complete: function (XMLHttpRequest, textStatus) 
			{
console.log("complete function , status - " + textStatus);
			},
			//global: true, //Для предотвращения запуска глобальных обработчиков таких, как ajaxStart или ajaxStop, установите значение данной опции в false. 
			//username: "",
			//password: "", //Пароль, который будет использован для HTTP запроса авторизации.
			//jsonp: "", //Переопределяет имя функциив в запросе jsonp
			//scriptCharset:"",
			//timeout: int, //Устанавливает локальное время ожидания для запроса (в миллисекундах)
			//xhr: function(){}
			//headers:map({})

//(Эта настройка появилась в jQuery-1.5) В этом поле можно указать дополнительные заголовки запроса (header). Эти изменения будут введены до вызова beforeSend, в которой могут быть произведены окончательные правки заголовков.


		}
	);


	//$.get( url, function(data)
	//{
//x = data.documentElement.childNodes;
//console.log("Number of elements: " + x.length);
		//return data;
	//});

	
}//------------------------- end func
*/

/*
function ajax_success( data, status )
{
console.log("ajax_success function, status - " + status);

//for(var p in data.childNodes)
//{
//console.log( "data["+ p + "] = " + data[p] );
//console.log( data.childNodes[p] );
//}

console.log("data - " + data);

				//return data;
}//------------------------- end func
*/


//http://api.jquery.com/jquery.post/
//http://jquery.page2page.ru/index.php5/Ajax_%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%BC_POST
/*
			var jqxhr = $.get( config["tpl_file"], function() {
console.log( "success " + config["tpl_file"]);
				lib_obj["templates"]["html"] = jqxhr.responseText;
				
				var message = "<br>load templates from " + config["tpl_file"];
				info.push( message );
			})
			.done(function() {
console.log( "done " + config["tpl_file"]);
			})
			.fail(function() {
console.log( "error " + config["tpl_file"]);
			})
			.always(function() {
console.log( "always finished " + config["tpl_file"]);
			});
*/


window.onload = function(){
	//btn_scroll = getById("btn-scroll-to-top");
}//end load

window.onscroll = function(event) {
//console.log("scroll on ");
//console.log( "btn_scroll: ", btn_scroll.style );
	//if( btn_scroll.style.display === "" || btn_scroll.style.display === "none"){
		//btn_scroll.style.display = "block";
	//}
}//end event
	
window.onresize = function(event) {
//console.log("resize window");
}//end event
