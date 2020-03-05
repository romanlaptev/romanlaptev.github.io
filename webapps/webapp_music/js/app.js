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
					output.innerHTML = msg + output.innerHTML;
				}
				
			} else {
				console.log(msg);
				//alert(msg);
				//document.writeln(msg);
			}
			
			//if( typeof _showHiddenLog === "function"){
		//console.log(_showHiddenLog);
				//_showHiddenLog();
			//}
			if( output.style.display !== "block"){
				output.style.display = "block";
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
			if( attr.length === 0){
				return false;
			}
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



		function _parseHashParams( parseStr ) { 
//console.log(parseStr);
//console.log(window.hash);
			if( !parseStr ){
				var parse_url = window.location.hash.substring(1).split("&"); 
			} else {
				p = parseStr.split("#");
			//console.log(p);
				parseStr = p["1"];
				var parse_url = parseStr.split("&"); 
			}
			
			var $_GET = {}; 
			for(var n = 0; n < parse_url.length; n++) { 
			var getVar = parse_url[n].split("="); 
				if( typeof(getVar[1])=="undefined" ){
					$_GET[ getVar[0] ] = "";
				} else {
				 $_GET[ getVar[0] ] = getVar[1];
				}
			}//next
			return $_GET; 
		}//end _parseHashParams() 


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
				
				//https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/responseType
				"responseType" : "", //"", "arraybuffer", "blob", "document","json","text","moz-chunked-arraybuffer","ms-stream"				
				
				"enctype" : "application/x-www-form-urlencoded",
				//"enctype" : "multipart/form-data",
				"url" : false, 
				"params": null,//params object
				"formData": null,
				"async" :  true,
				"callback" : null,
				"onProgress" : null,
				"onError" : null,
				"onLoadEnd" : null,
				"noCache" : false
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			var logMsg;
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
				}
			//}
			
			if( p["noCache"] ){
				if( url.indexOf("?") !== -1 ){
					url += "&noCache=";
				} else {
					url += "?noCache=";
				}
				url += (new Date().getTime()) + Math.random(); //no cache
			}

			
			if( !url || url.length === 0){
				logMsg = "error,  empty 'url' value.";			
console.log( logMsg );
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"message" : logMsg
					});
				}
				return false;
			}

			
			var xhr = _createRequestObject();
			if ( !xhr ) {
console.log("error, ", xhr);
				logMsg = "_createRequestObject() error";			
console.log( logMsg, xhr );
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"message" : "error creating XHR...."
					});
				}
				return false;
			}

			var timeStart = new Date();

			try{
				xhr.open( requestMethod, url, async );
			} catch(e){
				//logMsg = "ajax request error...";			
//console.log( logMsg );
//for( var key in e){
//console.log(key +" : "+ e[key]);
//}//next
				if( typeof  p["onError"] === "function"){
					p["onError"](e);
				}
				return false;
			}//end catch
			
			//Check responseType support:
		//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
		//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
		//Error, "The response type cannot be changed for synchronous requests made from a document."
			// Opera 12 crash!!!!
			if( "responseType" in xhr && p["async"] ){
				xhr.responseType = p["responseType"];
			}
				
			xhr.onreadystatechange  = function() { 
		//console.log("state:", xhr.readyState);
				if( xhr.readyState == 4) {
		//console.log( xhr  );
		//for(var key in xhr){
		//console.log( key +" : "+xhr[key] );
		//}

		//console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
		//console.log( "xhr.onerror = ", xhr.onerror  );

				
						if( xhr.status === 200){
							
							var timeEnd = new Date();
							var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
//console.log(msg);
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
//alert("responseText" in xhr);	true in IE6
//alert("response" in xhr);	false in IE6
								if( "response" in xhr){
									var data = xhr.response;
								} else {
									var data = xhr.responseText;
								}
								
//fix IE8 (not property "responseType")
//console.log("Content-Type:: " + xhr.getResponseHeader("Content-Type") );
								var contentType = xhr.getResponseHeader("Content-Type");
								//if( contentType === "application/xml" || contentType === "text/xml"){
								if( contentType.indexOf("application/xml") !== -1 || contentType.indexOf("text/xml") !== -1 ){
									data = xhr.responseXML;
								}
								
								//if( contentType === "text/plain"){
								if( contentType.indexOf("text/plain") !== -1){
									data = xhr.responseText;
								} 

								callback( data, runtime, xhr );
							}
							
							//if browser not define callback "onloadend"
							var test = "onloadend" in xhr;
							if( !test ){
								_loadEnd();
							}

						} else {
//console.log(xhr);					
//console.log("Ajax load error, url: " + xhr.responseURL);
//console.log("status: " + xhr.status);
//console.log("statusText:" + xhr.statusText);
							if( typeof  p["onError"] === "function"){
								p["onError"]({
									"message" : "ajax load request error.",
									"url" : xhr.responseURL,
									"xhr.status" : xhr.status,
									"xhr.statusText" : xhr.statusText
								});
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
				var _headers = {
					"all" : xhr.getAllResponseHeaders(),
					"content-type" : xhr.getResponseHeader('content-type')
				};
//console.log( _headers );
				if( typeof  p["onLoadEnd"] === "function"){
					p["onLoadEnd"]( _headers);
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
/*				
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
*/
			}
			
			//send query	
			if( requestMethod !== "POST"){
				try{
					xhr.send();
				}catch(e){
console.log(e);
					if( typeof  p["onError"] === "function"){
						p["onError"]({
							"message" : "error send XHR...."
						});
					}
				}
			}
			
//------------------------------------- form POST body
			if( requestMethod === "POST"){ //http://learn.javascript.ru/xhr-forms 
			
				if( p["enctype"] === "multipart/form-data"){
					xhr.send( p["formData"] );
				}
				
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

		
		
//test and remove!!!!!!
		var _runAjaxCorrect = function( opt ){
			
			var p = {
				"requestMethod" : "GET", 
				"url" : false, 
				"async" :  true,
				"onProgress" : null,
				"onSuccess" : null,
				"onError" : null//,
				//"onLoadEnd" : null
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			var requestMethod = p["requestMethod"]; 
			var url = p["url"]; 
			var async = p["async"]; 

			try{
				var xhr = new XMLHttpRequest();
			} catch(e){
console.log(e);
			}		
			
			var timeStart = new Date();
			
			xhr.open( requestMethod, url, async );
			xhr.onreadystatechange = function(){
//console.log("state:", xhr.readyState);
				if( xhr.readyState === 4){
console.log("end request, state ", xhr.readyState, ", status: ", xhr.status);
//console.log( "xhr.responseText: ", xhr.responseText );
//console.log( "xhr.responseXML: ", xhr.responseXML );

					if( xhr.status === 200){
//console.log( xhr.responseText );

						//if browser not define callback "onloadend"
						//var test = "onloadend" in xhr;
						//if( !test ){
							//_loadEnd();
						//}
						if( typeof  p["onSuccess"] === "function"){
							var timeEnd = new Date();
							var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
							var data = xhr.responseText;
							p["onSuccess"](data, runtime, xhr);
						}

					}

					if( xhr.status !== 200){
console.log("Ajax load error, url: " + xhr.responseURL);
//console.log("status: " + xhr.status);
console.log("statusText:" + xhr.statusText);
							if( typeof  p["onError"] === "function"){
								p["onError"](xhr);
							}
					}

				}
			};// end onreadystatechange
			
			if( "onerror" in xhr ){
				xhr.onerror = function(e){
console.log( "xhr.onerror,", e);
//console.log("event type:" + e.type);
//console.log("time: " + e.timeStamp);
//console.log("total: " + e.total);
//console.log("loaded: " + e.loaded);
				}
			};
			
			if( "onloadend" in xhr ){
				xhr.onloadend = function(e){
		//console.log(arguments);
//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
					//_loadEnd();
				}//end event callback
			};
			
			function _loadEnd(){
				var timeEnd = new Date();
				var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
				
				//if( typeof callback === "function"){
					//var data = xhr.responseText;
					//callback( data, runtime, xhr );
				//}
				// if( typeof  p["onLoadEnd"] === "function"){
					// var data = xhr.responseText;
					// p["onLoadEnd"]( data, runtime, xhr);
				// }
				
			}//end _loadEnd()
			
			xhr.send();
			
		};//_runAjaxCorrect()
		
		
//================================
//Usage :  var today = func.timeStampToDateStr({
//timestamp : ....timestamp string....,
//format : "yyyy-mm-dd hh:min" 
//});
//================================
		function _timeStampToDateStr( opt ){
			var p = {
				"timestamp" : null,
				"format" : ""
			};
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log( p );
			
			//date.setTime( timestamp);
			if( !p.timestamp || p.timestamp.length === 0){
				var d = new Date();
			} else {
				var d = new Date( p.timestamp );
			}
			
			var sYear = d.getFullYear();

			var sMonth = d.getMonth() + 1;
	//console.log( sMonth, typeof sMonth );
			if( sMonth < 10){
				sMonth = "0" + sMonth;
			}
			
			var sDate = d.getDate();
			if( sDate < 10){
				sDate = "0" + sDate;
			}
			
			var sHours = d.getHours();
			if( sHours < 10){
				sHours = "0" + sHours;
			}
			
			var sMinutes = d.getMinutes();
			if( sMinutes < 10){
				sMinutes = "0" + sMinutes;
			}
			
			var sSec = d.getSeconds();
			if( sSec < 10){
				sSec = "0" + sSec;
			}
			
			var dateStr =  sDate + "-" + sMonth + "-" + sYear + " " + sHours + ":" + sMinutes + ":" + sSec;
			
			switch( p.format ){
				
				case "yyyy-mm-dd":
					dateStr = sYear + "-" + sMonth + "-" + sDate;
				break;
				
				case "yyyy-mm-dd hh:min":
					dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;
				break;
				
				case "yyyy-mm-dd hh:min:sec":
					dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes + ":" + sSec;
				break;
				
			}//end switch
			
			return dateStr;
		}//end _timeStampToDateStr()
		
		

/*
//"15-May-2015 09:58:16" --> 1431662296000
var arr = "15-May-2015 09:58:16".split(" ");
var dateArr = arr[0].split("-");
var timeArr = arr[1].split(":");
var split_values = {
	"day" : dateArr[0],
	"month" : dateArr[1],
	"year" : dateArr[2],
	"hour" : timeArr[0],
	"min" : timeArr[1],
	"sec" : timeArr[2]
};
var timeStamp = func.getTimeStampFromDateStr( split_values );
*/
		function _getTimeStampFromDateStr( dateObj ){
			var _day = parseInt( dateObj["day"] );
			if ( isNaN( _day ) ){
				_day = 0;
			}
			
			var _month = 0;
			_month = _getNumMonthByName( dateObj["month"] );

			var _year = parseInt( dateObj["year"] );
			if ( isNaN( _year ) ){
				_year = 0;
			}

			var _hour = parseInt( dateObj["hour"] );
			if ( isNaN( _hour ) ){
				_hour = 0;
			}
			var _min = parseInt( dateObj["min"] );
			if ( isNaN( _min ) ){
				_min = 0;
			}
			var _sec = parseInt( dateObj["sec"] );
			if ( isNaN( _sec ) ){
				_sec = 0;
			}
			var timeStamp = new Date ( _year, _month, _day, _hour, _min, _sec).getTime();
			return timeStamp;
		}//end _getTimeStampFromDateStr()
		
		function _getMonthNameByNum( num, lang ){
			var sMonth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
			if( lang === "RU" || lang === "ru" ){
				sMonth = ["янв", "фев", "март", "апр", "май", "июн", "июл", "авг", "сент", "окт", "ноя", "дек"];
			}
			return sMonth[num];
		}//end _getMonthNameByNum()

		function _getNumMonthByName( monthName, lang ){
			var sMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			if( lang ){
				if( lang === "RU" || lang === "ru" ){
					sMonth = ["Янв", "Фев", "Март", "Апр", "Май", "Июн", "Июл", "Авг", "Сент", "Окт", "Ноя", "Дек"];
				}
			}
			var num = sMonth.indexOf(monthName);
			return num;
		}//end _getNumMonthByName()
		
		//Convert str to Hash code
		var _hashCode = function(str){
			var hash = 0;
			if (str.length == 0) return hash;
			for (i = 0; i < str.length; i++) {
				char = str.charCodeAt(i);
				hash = ((hash<<5)-hash)+char;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		};//_hashCode

		
		function _convertXmlToObj(xml){
//console.log( xml.childNodes.item(0).nodeName );			
//console.log( xml.firstChild.nodeName );			
//console.log( xml.documentElement.nodeName );			
			var rootTagName = xml.documentElement.nodeName;
			var xmlDoc = xml.getElementsByTagName( rootTagName);
//console.log( xmlDoc, typeof xmlDoc) ;
//console.log( xmlDoc.item(0), typeof xmlDoc.item(0)) ;
//console.log( xmlDoc.length) ;
//console.log( xmlDoc.item(0).childNodes.length ) ;
//console.log( xmlDoc.item(0).childNodes.item(1).nodeName ) ;
// for(var key in xmlDoc){
// console.log( key +", "+ xmlDoc[key]+ ", " + typeof xmlDoc[key]);
// }
			var xmlObj = {};
			for(var n1 = 0; n1 < xmlDoc.length; n1++){
//console.log( xmlDoc.item(n1) );
//console.log( xmlDoc.item(n1).childNodes ) ;
				var _node = xmlDoc.item(n1);
				var key = _node.nodeName;
				xmlObj[key] = {};
				_parseChildNodes( _node, xmlObj[key] );
			}
			//console.log(xmlObj);				
			return xmlObj;

			function _parseChildNodes( node, nodeObj ){
				var _childNodes = node.childNodes;
// if( !node.children){
// console.log("Internet Explorer (including version 11!) does not support the .children property om XML elements.!!!!");
// }
				if( _childNodes.length > 0){
					if( _childNodes.length === 1 &&
						_childNodes.item(0).nodeType === 3
					){//one child node of type TEXT cannot contain the "children" property!!!!
							//_ch["_itemType"] = ;
					} else {
						nodeObj["childNodes"] = {};
					}
				}
				
				for(var n = 0; n < _childNodes.length; n++){
					var child = _childNodes.item(n);//<=IE9
//console.log( "nodeType: "+ child.nodeType);
//console.log( "nodeName: "+ child.nodeName);

					if (child.nodeType !== 1){// not Node.ELEMENT_NODE
						if (child.nodeType === 3){// #text
							
							var _text = "";
							if ("textContent" in child){
								_text = child.textContent;
								
							} else {
								_text = child.text;
							}
							
							_text = _text.trim();
							if( _text.length > 0){
								if( 
									_text !== "\n" &&
									_text !== "\n\n" &&
									_text !== "\n\n\n"
								){
									nodeObj["text"] = _text;
								}
							}
						}
					} else {
//console.log( "nodeName: "+ child.nodeName);
						var key = child.nodeName;

						//if( !nodeObj["children"] ){
							//nodeObj["children"] = {};
						//}
						if( !nodeObj["childNodes"][key] ){
							nodeObj["childNodes"][key] = [];
						}

						var _ch = {
							//"_length": child.childNodes.length
						};
						var attr = __getAttrToObject(child.attributes);
						if(attr){
							_ch["attributes"] = attr;
						}
						
						//if( child.childNodes.length === 1){
							////continue;
							//_ch["nodeType"] = child.nodeType;
							//_ch["_child_nodes"] = child.childNodes;
							//_ch["_item"] = child.childNodes.item(0);
							//_ch["_itemType"] = child.childNodes.item(0).nodeType;
						//}
						
						nodeObj["childNodes"][key].push(_ch);

						_parseChildNodes(child, _ch );
					}
				}
			}//end _parseChildNodes()

			function __getAttrToObject( attr ){
				if( attr.length === 0){
					return false;
				}
				var item_attr = {};
				for(var item = 0; item < attr.length; item++) {
					item_attr[attr[item].name] = attr[item].value;
				}
				return item_attr;
			}//end _get_attr_to_obj()
		
		}//end _convertXmlToObj()		
		
/*
var func = sharedFunc();
//console.log("func:", func);

xmlNodes = func.parseXmlToObj( 
	func, //link on  sharedFunc() !!!!
	xml 
);
console.log(xmlNodes);

//------------------
parse XML document to array
<table><note>....</note>, <note>...</note></table>

IN:
<templates>
	<tpl name="tpl-node_photogallery_image">
		<html_code><![CDATA[
......
		]]></html_code>
	</tpl>
.................
</templates>

OUT:
[ { name: "attr value", html_code: "......" },
{ name: "attr value", html_code: "......" }]
ONLY second LEVEL !!!!!!!!!!!!							  
*/

		function _parseXmlToObj(_func, xml){
		//console.log( xml.childNodes.item(0).nodeName );			
		//console.log( xml.firstChild.nodeName );			
		//console.log( xml.documentElement.nodeName );			
			var rootTagName = xml.documentElement.nodeName;
			var xmlDoc = xml.getElementsByTagName( rootTagName);
		//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;
		//console.log( xmlDoc.childNodes.length ) ;
		//console.log( xmlDoc.item(0).childNodes.item(1).nodeName ) ;
		// for(var key in xmlDoc){
		// console.log( key +", "+ xmlDoc[key]+ ", " + typeof xmlDoc[key]);
		// }
			var xmlObj = [];
			for (var n = 0; n < xmlDoc.item(0).childNodes.length; n++) {
				var child = xmlDoc.item(0).childNodes.item(n);//<=IE9
		//console.log( "nodeType: "+ child.nodeType);
				if (child.nodeType !== 1){// not Node.ELEMENT_NODE
					continue;
				}
				var node = __parseChildNode( child );
		//console.log(node);			
				xmlObj.push ( node );
			}//next
		//console.log(xmlObj);				
			return xmlObj;
			
			function __parseChildNode( nodeXml ){
		//console.log( "nodeName: "+ nodeXml.nodeName);
		//console.log( "text: "+ nodeXml.text);
		//console.log( "textContent: "+ nodeXml.textContent);
		// var test = nodeXml;				
		// for(var key in test ){
		// console.log( key +", "+ test[key]+ ", " + typeof test[key]);
		// }

				var nodeObj = _func.get_attr_to_obj( nodeXml.attributes ) ;
				for (var n2 = 0; n2 < nodeXml.childNodes.length; n2++) {
					var _child = nodeXml.childNodes.item(n2);
		//console.log( "nodeType: "+ _child.nodeType);
					if ( _child.nodeType !== 1){// not Node.ELEMENT_NODE
						continue;
					}
		// console.log( "nodeName: "+ _child.nodeName);
		// console.log( "text: "+ _child.text);
		// console.log( "textContent: "+ _child.textContent);
					var _name = _child.nodeName;
					if ("textContent" in _child){
						nodeObj[_name] = _child.textContent;
					} else {
						nodeObj[_name] = _child.text;
					}
				}//next

		// if( !record.children){
		// console.log("Internet Explorer (including version 11!) does not support the .children property om XML elements.!!!!");
		// }
				return nodeObj;
			}//end __parseChildNode()

		}//end _parseXmlToObj()

		function _alertUIkit( message, level ){
			switch (level) {
				case "info":
					message = "<p class='uk-alert uk-alert-primary'>" + message + "</p>";
					_log(message);
				break;
				
				case "warning":
					message = "<p class='uk-alert uk-alert-warning'>" + message + "</p>";
					_log(message);
				break;
				
				case "danger":
				case "error":
					message = "<p class='uk-alert uk-alert-danger'>" + message + "</p>";
					_log(message);
				break;
				
				case "success":
					message = "<p class='uk-alert uk-alert-success'>" + message + "</p>";
					_log(message);
				break;
				
				default:
					_log(message);
				break;
			}//end switch
			
		}//end _alert()		
	
		function _wrapLogMsg( message, level ){
			switch (level) {
				case "info":
					message = "<p class='alert alert-info'>" + message + "</p>";
					return message;
				break;
				
				case "warning":
					message = "<p class='alert alert-warning'>" + message + "</p>";
					return message;
				break;
				
				case "danger":
				case "error":
					message = "<p class='alert alert-danger'>" + message + "</p>";
					return message;
				break;
				
				case "success":
					message = "<p class='alert alert-success'>" + message + "</p>";
					return message;
				break;
				
				default:
					return message;
				break;
			}//end switch
			
		}//end _wrapLogMsg()
		
	
		function _addEvent( element, eventName, func ) {
			if ( element.addEventListener ) {
				return element.addEventListener(eventName, func, false);
			} else if ( element.attachEvent ) {
				return element.attachEvent("on" + eventName, func);
			}
		};//end _addEvent()
		

		function _testSupport() {
			return {
				"jsonSupport" : JSON ? true : false,
				"promiseSupport": window.Promise  ? true : false,
				"cacheSupport" : window.caches ? true : false,
				"serviceWorkerSupport" : navigator.serviceWorker ? true : false,
				"indexedDBsupport" : window.indexedDB ? true : false,
				"webSQLsupport" : window.openDatabase  ? true : false,
				"localStorageSupport" : window['localStorage']  ? true : false,
				"dataStoreType" : _detectDataStoreType(),
				"geolocationSupport" :  typeof navigator.geolocation !== "undefined",
				"supportTouch" : _supportTouch(),
				"fileAPI" :  _supportFileAPI(),
				"formData": typeof window.FormData === "function"
			};
		};//end _testSupport()
		
		function _detectDataStoreType(){
			var dataStoreType = false;
			if( window['localStorage']  ? true : false ){
				dataStoreType = "localStorage";
			}
			if( window.openDatabase  ? true : false ){
				dataStoreType = "webSQL";
			}
			if( window.indexedDB ? true : false ){
				dataStoreType = "indexedDB";
			}
			return dataStoreType;
		}//end _detectDataStoreType()
		
		var _supportTouch = function() {
			//return !!('ontouchstart' in window);
			
			var supportTouch = false;
			if ('ontouchstart' in window) {
				//iOS & Android
				supportTouch = true;
			//} else if(window.navigator.msPointerEnabled) { // msPointerEnabled does not detect mobile, it also exists in desktop IE, use msMaxTouchPoints/maxTouchPoints instead!
			} else if(window.navigator.msMaxTouchPoints) {
				//WinPhone
				supportTouch = true;
			}
			return supportTouch;
		};//end _supportTouch
		
		var _supportFileAPI = function(){
			if( window.File && window.FileList && window.FileReader ){
				return true;
			}
			return false;
		}//end __supportFileAPI()
		
		
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
			parseHashParams: _parseHashParams,
			
			runAjax: _runAjax,
			runAjaxCorrect: _runAjaxCorrect,
			
			timeStampToDateStr: _timeStampToDateStr,
			getTimeStampFromDateStr: _getTimeStampFromDateStr,
			getMonthByNameNum: _getMonthNameByNum,
			getNumMonthByName: _getNumMonthByName,
			
			hashCode: _hashCode,
			parseXmlToObj: _parseXmlToObj,
			convertXmlToObj: _convertXmlToObj,
			
			//logAlert: _alert,
			logAlert: _alertUIkit,
			wrapLogMsg: _wrapLogMsg,
			addEvent: _addEvent,
			testSupport: _testSupport
			
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
			
			var id = "log";
			var log = false;
			if( document.querySelector ){
				log = document.querySelector("#"+id);
			}
	
			if( document.getElementById ){
				log = document.getElementById(id);
			}
	
			if( document.all ){
				log = document.all[id];
			}
	
			//if( document.layers ){
				//var log = document.layers[id];
			//}
	

			if(log){
				log.innerHTML += msg +"<br>";
			} else {
				alert(msg);
				//document.writeln(msg);
			}
		}
	}
};



if( typeof window.jQuery === "function"){
//var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
//console.log(msg);
	$(document).ready(function(){
		
		//------------------------- scroll to top
		$("#scroll-to-top").click(function(e) {
			e.preventDefault;
			$('html,body').animate({
				scrollTop: 0
				}, 500);
			return false;
		});

	});//end ready	
}

var func = sharedFunc();
//console.log("func:", func);

var _vars = {
	"logMsg": "",
	start_scroll_pos:0,
	end_scroll_pos:0//,
};
//console.log( _vars );

/*
document.onreadystatechange = function(e){
console.log(e);
//console.log("eventPhase:" + e.eventPhase);
console.log("--- document.readyState = " + document.readyState, typeof document.readyState);
	if (document.readyState == "interactive") {
		initApplication();
	}
}
*/

if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function(){////DOM ready, but not load images
//console.log("DOMContentLoaded");
//console.log("-- document.readyState = " + document.readyState);
		initApplication();
	},false);//end dom load
}

window.onload = function(){
//console.log("window.onload");
//console.log("-- document.readyState = " + document.readyState);
	//Start webApp
	if( typeof webApp === "object"){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize
	}
}//end load()


if( typeof window.jQuery === "function"){
	$(document).ready(function(){
//console.log( "jQuery: document.ready" );
//console.log("-- document.readyState = " + document.readyState);
		_initPage();
	});//end ready()
	
	$(window).scroll( function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );
		if ( $(this).scrollTop() > _vars.start_scroll_pos  ) {
			$("#btn-scroll-to-top").show();
		} 

		if ( $(this).scrollTop() < _vars.end_scroll_pos ) {
			$("#btn-scroll-to-top").hide();
		}
	});//end scroll
	
}



function initApplication(){
	_vars.logMsg = navigator.userAgent;
	func.logAlert( _vars.logMsg, "info");

//===============================
/*
	_vars["logPanel"] = func.getById("log");
	func.addEvent( 
		func.getById("btn-clear-log"), 
		"click", 
		function(event){
//console.log( event.type );
			event = event || window.event;
			var target = event.target || event.srcElement;
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			_vars.logPanel.innerHTML = "";
		}
	);//end event
*/

/*
//------------------------ Image load error
	_vars.blockNodeList = document.querySelector("#block-nodelist");
//console.log(_vars);	
	var images = _vars.blockNodeList.getElementsByTagName("img");
//console.log( "images =  " + images.length);
//console.log( "images.onerror =  "+ typeof images[0].onerror);

//if( typeof images[0].onerror !== "object"){
//console.log( "error, 'images.onerror' callback not supported...");
//} else {

	for( var n = 0; n < images.length; n++){
		//if( images[n].clientHeight === 0 ){
//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
//console.log( "img load error: ", images[n].getAttribute("src") );	
			images[n].onerror = function(e){
_vars["logMsg"] = "error, image not load: <small><b>" + e.target["src"] + "</b></small>";
_vars["logMsg"] += ", waiting time: " + e["timeStamp"] / 1000 + " sec";
//func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
//console.log(e.target.parentNode);				
				var _blockImages = e.target.parentNode;
				_blockImages.innerHTML = "<div class='uk-alert uk-alert-danger'>"+_vars["logMsg"] +"</div>";
			}

			images[n].onload = function(e){
//console.log(e);
				var _blockImages = e.target.parentNode;
				_blockImages.style.background = "transparent";
			}
			
		//};
	};//next
//}
//------------------------
*/
}//end initApplication()


function _initPage(){
	
//--------------------- Scroll
	//Detect top position for scroll block
	_vars.start_scroll_pos = $("#main").offset().top + 100;
	_vars.end_scroll_pos = _vars.start_scroll_pos - 20;
	
	$("#btn-scroll-to-top").hide();
	$(".scroll-to").addClass("nolink").on("click", function(){
		if($(this).attr("href")){
			var id = $(this).attr("href");
		} else {
			var id = "#" + $(this).attr("data-target");
		}
//console.log("id: " , id);

		//$('body').scrollTo( elem, 800, {offset: -50});//need jquery.scrollTo-1.4.3.1-min.js!!!!

		var start_scroll_pos = $(id).offset().top;// Get  start position for scroll block
		 start_scroll_pos = start_scroll_pos - 100;// minus height, padding #top block
//console.log("start_scroll_pos: " , start_scroll_pos);

		$('html,body').animate({
			scrollTop: start_scroll_pos
			}, 500);
		return false;
	});//end event
	//---------------------

		// document.forms["formSearch"].onsubmit = function(event){
			
			// event = event || window.event;
			// var target = event.target || event.srcElement;
			
			// if (event.preventDefault) { 
				// event.preventDefault();
			// } else {
				// event.returnValue = false;
			// }
// console.log("Submit form", event, this);
			// var form = document.forms["formSearch"]
// console.log(form);
// //console.log(form.elements.targetField, form.elements.targetField.length);
// //console.log(form.elements.keyword.value);

		// };//end event
//console.log( document.forms["formSearch"] );
	
}//_initPage()
var webApp = {
	
//Modules
	"app" : _app(),
	"db" : _db(),
	//"iDBmodule" : iDBmodule(),
	"draw" : _draw(),
	"player" : _player(),
	"fileManager" : _fileManager(),
	
	"vars" : {
		"app_title" : "music collection",
		"logMsg" : "",
		"GET" : {},
		"audioTypes" : {
//"ogg" : { testParam:['video/ogg; codecs="theora, vorbis"'], support:false },
		},
		
		"use_file_manager": true,
		"support" : func.testSupport(),
		
		"blocks": [
//===========================================
			{
				"locationID" : "block-player",
				"title" : "block player", 
				"templateID" : "blockPlayer",
				"content" : function(){
					this.content = "";
					webApp.draw.buildBlock( this );
					webApp.player.init();
				}
			}, //end block

			{
				"locationID" : "block-tracklist",
				"title" : "block tracklist", 
				"templateID" : "blockTrackList",
				"content" : function(){
					var html = webApp.player.formHtmlTrackList();
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			}, //end block

//===========================================
			{
				"locationID" : "block-tag-groups",
				"title" : "block tag groups", 
				"templateID" : "blockTagGroups",
				"content" : function(){
					var html = webApp.app.formHtmlTagGroups();
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			}, //end block

//===========================================
			{
				"locationID" : "block-taglist",
				"title" : "block taglist", 
				"templateID" : "blockTagList",
				"content" : function(){
					var html = webApp.app.formHtmlTagList({
						"vid" : webApp.vars["GET"].vid,
						"group_name": webApp.vars["GET"].group_name
					});
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			}, //end block

//===========================================
			{
				"locationID" : "block-file-manager",
				"title" : "block file manager", 
				"templateID" : "blockFileManager",
				"content" : function(){
					
					webApp.fileManager.formHtmlFileManager({
						"postFunc" : function(html){
//console.log( html );
							if( html && html.length > 0){
								webApp.vars["blocksByName"]["blockFM"].content = html;
								webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
							}
							
						}
					});
					
				}
			}, //end block

//===========================================
			{
				"locationID" : "block-pager",
				"title" : "block pager", 
				"templateID" : "blockPager",
				"visibility":true//,
				// "content" : function(){
					// var html = webApp.app.formHtmlPager();
					// if( html && html.length > 0){
						// this.content = html;
						// webApp.draw.buildBlock( this );
					// }
				// }
			}, //end block

//===========================================
			{
				"locationID" : "block-list",
				"title" : "block nodelist", 
				"templateID" : "blockNodes",
				"visibility":true,
				"content" : function(){
					var html = webApp.app.formHtmlNodeList();
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
					webApp.app.imagesLoadEventHandler();
					$("a[href='?q=load-tracklist&url=']").hide();//hide button if empty playlist_filepath
					webApp.draw.updatePager();
				}
			}, //end block
			
//===========================================
			{
				"locationID" : "block-links",
				"title" : "footer links", 
				"templateID" : "blockFooterLinks",
				"visibility":true,
				"content" : function(){
					//var html = "<i>static text!!!!</i>";
					var html = webApp.draw.wrapData({
						//"data": webApp.db.vars["footerLinks"][0],
						//"templateID": "blockLinksListItem"
						
						"data": webApp.db.vars["footerLinks"],
						"templateID": "blockLinksList",
						"templateListItemID": "blockLinksListItem"
					});
//console.log( html );
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			} //end block
		],
		"blocksByName": {},
		"imageNotLoad": "img/image_not_load.png",
		"menuWidth" : 270,//270px
		
		//"init_action" : "get_data",
		//"init_url" : "#?q=list_nodes&num_page=1"
	},//end vars
	
	
	"init" : function( postFunc ){
console.log("init webapp!");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		//webApp.app.init();
		webApp.db.init();
		//webApp.iDBmodule.init();
//console.log(iDBmodule, typeof iDBmodule);			
		webApp.draw.init();
		webApp.player.testMediaSupport();
		
		if( webApp.vars["use_file_manager"] ){
			webApp.fileManager.init({
				"postFunc" : _initCallback
			});
		} else {
			_initCallback();
		}

		function _initCallback(){
			webApp.vars["blocksByName"]["blockPlayer"] = 	webApp.vars["blocks"][0];
			webApp.vars["blocksByName"]["blockTrackList"] = 	webApp.vars["blocks"][1];
			webApp.vars["blocksByName"]["blockTagGroups"] = 	webApp.vars["blocks"][2];
			webApp.vars["blocksByName"]["blockTagList"] = 	webApp.vars["blocks"][3];
			webApp.vars["blocksByName"]["blockFM"] = 	webApp.vars["blocks"][4];
			webApp.vars["blocksByName"]["blockPager"] = 	webApp.vars["blocks"][5];
			webApp.vars["blocksByName"]["blockNodes"] = 	webApp.vars["blocks"][6];
			webApp.vars["blocksByName"]["blockFooterLinks"] = 	webApp.vars["blocks"][7];
			
			webApp.vars["logPanel"] = func.getById("log");
			webApp.vars["waitWindow"] = func.getById("win1");
			webApp.vars["loadProgress"] = func.getById("load-progress");
			webApp.vars["loadProgressBar"] = func.getById("load-progress-bar");
			webApp.vars["numTotalLoad"] = func.getById("num-total-load");
			webApp.vars["percentComplete"] = func.getById("percent-complete");
			webApp.vars["totalBytes"] = func.getById("total");
			webApp.vars["totalMBytes"] = func.getById("total-mb");
			webApp.vars["loaded"] = func.getById("loaded");
			webApp.vars["loadInfo"] = func.getById("load-info");
			
			webApp.vars.$offcanvas = $("#off-canvas2");
			webApp.vars.$offcanvasBar = $("#off-canvas2 .my-offcanvas-bar");
			webApp.vars.$offcanvasMenu = $("#off-canvas2 .uk-nav-offcanvas > li > a");
			webApp.vars.$blockList = document.querySelector("#block-list");
			
			// hide input type="range" if not support
			//https://learn.javascript.ru/dom-polyfill
			var _testRangeType = $("#page-range").attr("type");
	//console.log( _testRangeType );
			if( _testRangeType !== "range"){
				$("#page-range").hide();
			}
			
			_runApp();
		}//end _initCallback()
		
	},//end init()
	
	
};//end webApp()
console.log(webApp);


function _runApp(){
	//testMediaSupport( webApp.vars["audioTypes"]);

	//start block
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
	}
	
	webApp.db.getData(function(res){
//console.log(arguments);
//console.log(window.location);	

//clear block
//setTimeout(function(){
		if( webApp["vars"]["waitWindow"] ){
			webApp["vars"]["waitWindow"].style.display="none";
		}		
//}, 1000*3);

		if( webApp.db.vars["nodes"] && webApp.db.vars["nodes"].length > 0){
			_postLoad();
		}
	});

}//end _runApp()

function _postLoad(){

	var parse_url = window.location.search; 
	//var parse_url = window.location.hash;
//console.log( parse_url );
	
	if( parse_url.length > 0 ){
		webApp.app.urlManager( parse_url );
	}

//-----------------
console.log("-- start build page --");
	webApp.draw.buildPage();
console.log("-- end build page --");

	webApp.app.defineEvents();
//console.log( $("#form-search").onsubmit);
//console.log( document.forms["formSearch"] );
	
}//_postLoad()



function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		duration : 600//speed toggle animation
	};// _vars
	
	//var _init = function( opt ){
//console.log("init app");
	//};//end _init()

	function _defineEvents(){
		
//------------------------------------------------------------------
		$(document).on("keydown", function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log(e);
//console.log("e.keyCode = " + e.keyCode );

//----------------------------
			if (event.keyCode == 27) {
//console.log("press ESC ", e.target);

				var id = "#modal-edit-node";
				var $modalWindow = $(id);
				
				if( $modalWindow.is(":visible") ){
					_toggleBlock( id );
				}
				
				id = "#modal-insert-track";
				$modalWindow = $(id);
				if( $modalWindow.is(":visible") ){
					_toggleBlock( id );
				}
				
			}
			
//---------------------------- input page number
			if( target.getAttribute("id") === "page-number"){
//console.log("event.keyCode = " + event.keyCode );

				if (event.keyCode == 13) {
					//return;
//console.log(target.value);
//console.log( parseInt(target.value) );
//console.log( isNaN(target.value) );
					_changePage( target.value );
				}
				
				//filter input, only numbers
				if ( event.keyCode == 46 || 
					event.keyCode == 8 || 
					event.keyCode == 9 || 
					event.keyCode == 27 ||
						(event.keyCode == 65 && event.ctrlKey === true) ||
							(event.keyCode >= 35 && event.keyCode <= 39)
				) {
					return;
				} else {
					if ( (event.keyCode < 48 || event.keyCode > 57) &&
						(event.keyCode < 96 || event.keyCode > 105 )
					) {
						event.preventDefault();
					}
				}

			}//end event
			
		});//end event
		
		$(document).on("change", function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event.type, event);
//console.log( target, target.value );

//---------------------------- end of moving  'input range'
			if( target.getAttribute("id") === "page-range"){
//console.log( target, target.value );
				$("#page-number").val( target.value );
				_changePage( target.value );
			}//end event
			
//---------------------------- select sort type
			if( target.getAttribute("id") === "select-sort"){
//console.log( target, target.value );
				webApp.db.vars["sortByKey"] =  target.value;
				_changePage( 1 );
			}//end event

		});//end event


//---------------------------- search form submit
		document.forms["formSearch"].onsubmit = function(event){
		//$("#form-search").on("submit", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
			
			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
//console.log("Submit form", event, this);
			var form = document.forms["formSearch"]
//console.log(form);
//console.log(form.elements.targetField, form.elements.targetField.length);
//console.log(form.elements.keyword.value);

			//------------------- check input values
			var res = true;
			
			var _keyword = form.elements.keyword.value;
			if( _keyword.length === 0 ){
_vars["logMsg"] = "error, empty keyword...";
func.logAlert( _vars["logMsg"], "error");
//console.log( "-- " + _vars["logMsg"] );
				res = false;
			}
			
			var _targetField = false;
//fix
if( form.elements.targetField.length > 0){
			for( var n = 0; n < form.elements.targetField.length; n++){
//console.log( n, form.elements.targetField[n] );

				var $element = $(form.elements.targetField[n]);
				var _checked = $element.prop("checked");
	//console.log( $element.attr("value"), _checked );
				if( _checked){
					_targetField = $element.attr("value");
					break;
				}
			}//next
} else {
	_targetField = form.elements.targetField.value;
}
//console.log( "TEST:", _targetField, _targetField.length );

			// if( !_targetField || _targetField.length === 0 ){
// webApp.vars["logMsg"] = "error, not select search field, 'targetField'...";
// func.logAlert( webApp.vars["logMsg"], "error");
// //console.log( webApp.vars["logMsg"] );
				// res = false;
			// }		

			if(res){
				var _url = "?q=search&targetField="+_targetField+"&keyword="+_keyword;
				_urlManager( _url );
			}

		//});//end event
		};//end event

//---------------------------- insert/update track form submit handler
		document.forms["form_insert_track"].onsubmit = function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
			
			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			
//console.log("Submit form", event, this);
			var form = document.forms["form_insert_track"]
//console.log(form);
//console.log(form.elements, form.elements.length);
//console.log(form.elements["number"]);
//console.log( webApp.player.vars["GET"]);

			//change form action for UPDATE track
			//if( form.elements["number"] && form.elements["number"].value.length > 0){
			var _action = webApp.player.vars["GET"]["q"];
console.log(_action, webApp.player.vars["GET"]);
			if( _action === "edit-track" ){
				$("#insert-track-form").attr("action", "?q=update-track");
			} else {
				$("#insert-track-form").attr("action", "?q=insert-track");
			}
console.log(form.action);
			
			//------------------- check input values
			var _url = form.action;

			var res = true;
			for( var n = 0; n < form.elements.length; n++){
				var _element = form.elements[n];
				
				//if( _element.type === "text" ){
					
					if( _element.className.indexOf("require-form-element") !== -1 ){
	//console.log( _element.value );
							if( _element.value.length === 0 ){
								var res = false;
	_vars["logMsg"] = "error, empty required input field <b>'" + _element.name +"'</b>";
	func.logAlert( _vars["logMsg"], "error");
								break;
							}
					}
					
					if( _element.value.length > 0 ){
						_url += "&"+ _element.name + "=" + _element.value;
					}
					
				//}
				
			}//next
//console.log( _url );
			
			if(res){
				webApp.player.urlManager( _url );
			}
			
			//clear form input ( number edit track) 
			//document.forms["form_insert_track"].elements["number"].value = "";
			//document.forms["form_insert_track"].reset();
			
		};//end event submit

//---------------------------- move input range
		$("#page-range").on("input", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log("input range...", event.target.value);
			$("#page-number").val( target.value );
		});//end event

//---------------------------- end input to "#page-number", loss of focus field
		$("#page-number").on("blur", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event.type, event);
			_changePage( target.value );
		});//end event

//------------------------------------------------------------------
		$(document).on("click", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event, event.type, target.tagName );
//console.log( this );
//console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );

//if( target.href === "A" || target.tagName === "SPAN"){
//if( target.href === "A"){
if( target.className.indexOf("no-block-link") === -1){
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			_clickHandler( target );
}
		});
		
//---------------------------------
		$("#btn-toggle-menu").on("click", function(e){
//console.log( e.type );
			_toggleMenu();
		});//end event
		
		$("#btn-close-menu").on("click", function(e){
//console.log( e.type );
			_toggleMenu();
		});//end event
		
		webApp.vars.$offcanvasMenu.on("click", function(e){
//console.log( e.target );
			$(".collapse").hide();
//console.log( $( e.target ).data()  );
			var _target = $( e.target ).data("toggle");
//console.log( _target );
			//$( _target ).slideToggle( _vars.duration, function(e){
			$( _target ).show( _vars.duration, function(e){
//console.log(arguments)
				_toggleMenu();
			});
		});//end event

	
//------------------------------------------------------------------
		function _clickHandler( target ){
//console.log( target.tagName );

//---------------------------- toggle node
				if( target.className.indexOf("btn-dropdown") !== -1){
//console.log( target );
					var _p = target.parentNode;
					var $blockContent = $(_p).find(".block-content");
			//console.log( $blockContent );
					$blockContent.slideToggle(_vars.duration);
					
					var $buttonDropDown = $(target);
			//console.log( $buttonDropDown );
					var test = $buttonDropDown.hasClass("icon-chevron-down");
					if( test ){
						$buttonDropDown.removeClass("icon-chevron-down");
						$buttonDropDown.addClass("icon-chevron-up");
						//$blockContent.slideDown(_vars.duration);
					} else {
						$buttonDropDown.removeClass("icon-chevron-up");
						$buttonDropDown.addClass("icon-chevron-down");
						//$blockContent.slideUp(_vars.duration);
					}

				}//end event

//------------------------------- page number
//console.log( target.getAttribute("id") );
				if( target.getAttribute("id") === "btn-page-number-more"){
					var num = parseInt( $("#page-number").val() );
					if( num < webApp.db.vars["numPages"] ){
						$("#page-number").val( num+1 );
						$("#page-range").val( num+1 );
						_changePage( $("#page-range").val() );
					}
				}//end event
				
				if( target.getAttribute("id") === "btn-page-number-less"){
					var num = parseInt( $("#page-number").val() );
					if( num > 1){
						$("#page-number").val( num-1 );
						$("#page-range").val( num-1 );
						_changePage( $("#page-range").val() );
					}					
				}//end event

				if( target.tagName === "A"){

//------------------------------- close, toggle buttons
					if( target.getAttribute("data-toggle") ){
//console.log( target.getAttribute("data-toggle"), target.getAttribute("data-toggle").length );
						var id = $( target ).data("toggle");
//console.log( id );
						if ( target.href.indexOf("?q=close") !== -1 ||
								 target.href.indexOf("?q=toggle") !== -1
							){
								_toggleBlock( id );
							//fix (clear last action in player, need for insert/edit track)
							webApp.player.vars["GET"] = {};
						}
					}

//------------------------------- get modal window
					if ( target.href.indexOf("q=edit-node") !== -1){
						//webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.app.urlManager( target.href );
					}
					// //if ( target.href.indexOf("#close-modal") !== -1){
					// if ( target.href.indexOf("?q=close-modal") !== -1){
						// var id = $( target ).data("toggle");
						// _toggleModal( id );
					// }

//------------------------------- get tag list
//?q=get-tag-list&vid=2				
					if ( target.href.indexOf("get-tag-list") !== -1){
						//webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.app.urlManager( target.href );
					}
				
//------------------------------- get node tags
//?q=get-nodes-by-tag&vid=2&tid=110&group_name=music_styles
					if ( target.href.indexOf("get-nodes-by-tag") !== -1){
						webApp.app.urlManager( target.href+"&tag_name="+$(target).text() );
					}
					
//------------------------------- player, tracklist actions
					if ( target.href.indexOf("q=get-tracklist-url") !== -1 ||
							target.href.indexOf("q=load-tracklist") !== -1 ){
						webApp.player.urlManager( target.href );
					}
					
					if ( target.href.indexOf("q=load-track&") !== -1 ||
							target.href.indexOf("prev-track") !== -1 ||
								target.href.indexOf("next-track") !== -1 ||
									target.href.indexOf("clear-tracklist") !== -1 ||
										target.href.indexOf("remove-track") !== -1 ||
											target.href.indexOf("edit-track") !== -1
					){
//console.log("TEST1");						
						if( webApp.player.vars["trackList"].length > 0){
							webApp.player.urlManager( target.href );
						} else {
webApp.vars["logMsg"] = "warning, empty media track list ...";
func.logAlert(webApp.vars["logMsg"], "warning");
						}
					}

//------------------------------- File system actions
					if ( target.href.indexOf("q=get-folder") !== -1 ||
							target.href.indexOf("q=define-location") !== -1 ||
							target.href.indexOf("q=level-up") !== -1 ||
							target.href.indexOf("q=check-all") !== -1 ||
							target.href.indexOf("q=clear-all") !== -1 ||
							target.href.indexOf("q=rename-file") !== -1 ||
							target.href.indexOf("q=delete-file") !== -1 ||
							target.href.indexOf("q=add-track") !== -1
					){
						var url = target.href;
						if( target.href.indexOf("q=get-folder") !== -1 ) {
//console.log("TEST2", target.getAttribute("href") );
							url = target.getAttribute("href");//without url decode, without replacing the space charaster %20
						}
						webApp.fileManager.urlManager( url );
					}

				}//end event


		}//end _clickHandler()
		
	}//end _defineEvents()


	function _urlManager( url ){
//console.log(url);
		// if( url.indexOf("#") !== -1){
			// url = url.replace("#", "");
		// }
		webApp.vars["GET"] = func.parseGetParams( url ); 

		if( webApp.vars["GET"]["num_page"] && webApp.vars["GET"]["num_page"].length > 0){
			webApp.db.vars["numberPage"] = webApp.vars["GET"]["num_page"];
		}
		
		if( webApp.vars["GET"]["dir"] && webApp.vars["GET"]["dir"].length > 0){
			webApp.fileManager.vars["aliasLocation"] = webApp.vars["GET"]["dir"];
			webApp.fileManager.vars["fsPath"] = webApp.vars["GET"]["dir"];
		}
		
		switch( webApp.vars["GET"]["q"] ) {
			
			// case "get_data":
				// webApp.db.getData(function(res){
			// //console.log(arguments);
			// //console.log(window.location);	
			
// //clear block
// //setTimeout(function(){
					// if( webApp["vars"]["waitWindow"] ){
						// webApp["vars"]["waitWindow"].style.display="none";
					// }		
// //}, 1000*3);
			
					// if( webApp.db.vars["nodes"] && webApp.db.vars["nodes"].length > 0){
							// var parse_url = window.location.search; 
							// if( parse_url.length > 0 ){
								// webApp.vars["GET"] = func.parseGetParams(); 
								// _urlManager();
							// } else {
								// if( webApp.vars["init_url"] ){
									// //parse_url = webApp.vars["init_url"].substring(2);
									// parse_url = webApp.vars["init_url"];
						// //console.log(parse_url);
								// }
								// webApp.vars["GET"] = func.parseGetParams( parse_url ); 
								// _urlManager();
								// _defineEvents();
							// }
					// }

				// });
			// break;
			
			// case "list_nodes":
// console.log("-- start build page --");
				// webApp.draw.buildPage();
// console.log("-- end build page --");
			// break;
			
//?q=edit-node&nid={{nid}}
			case "edit-node":
				_toggleBlock( "#modal-edit-node" );
/*
			if( $( target ).attr("href").indexOf("&") !== -1 ){
				var arr = $( e.target ).attr("href").split("&");
				arr = arr[1].split("=");
//console.log(arr);
				var nodeId = arr[1];
//console.log(nodeId);
				if( id === "#modal-edit-node"){
					_getFieldValues(id, nodeId);
				}
			}
			
*/			
			var form = document.forms["form_node"];
//console.log(form);
//console.log(form.elements);
				form.elements.id.value = webApp.vars["GET"]["nid"];
			break;
			
			//case "clear-query-result":
			//break;
			
//-------------------------------------------- TAGLIST
//href="#?q=get-tag-list&vid={{vid}}"			
			case "get-tag-list":
//console.log( webApp.vars["GET"] );
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTagList"] );
			break;
			
			case "get-nodes-by-tag":
//console.log( webApp.vars["GET"] );

				webApp.db.getNodesByTag({
						"tagName" : webApp.vars["GET"]["tag_name"],
						"callback" : function( data ){
//console.log(data);
							if( !data || data.length ===0){
webApp.vars["logMsg"] = "not found records for tag <b>"+ webApp.vars["GET"]["tag_name"] + "</b>...";
func.logAlert(webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records for tag &quot;<b>"+ webApp.vars["GET"]["tag_name"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");

								webApp.db.vars["queryRes"] = data;
								webApp.db.vars["numberPage"] = 1;
								webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
								
								//hide block tag list
								var id = "#"+webApp.vars["blocksByName"]["blockTagList"]["locationID"];
//console.log(id, $( id ) );
								$( id ).slideToggle( _vars.duration , function(e){});
								
							}
						}//end callback
				});
			break;
			
			case "reset_tags_select":
				webApp.db.vars["queryRes"] = [];
				webApp.db.vars["numberPage"] = 1;
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
			break;

//-------------------------------------------- SEARCH
			case "search":
				
				webApp.db.search({
					"targetField" : webApp.vars["GET"]["targetField"],
					"keyword" : webApp.vars["GET"]["keyword"],
					"callback" : function( data ){
//console.log(data);

						if( !data || data.length ===0){
webApp.vars["logMsg"] = "no records found by keyword <b>&quot;"+ webApp.vars["GET"]["keyword"] + "&quot;</b>...";
func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							return false;
						} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records by keyword &quot;<b>"+ webApp.vars["GET"]["keyword"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");
						}
						
						webApp.db.vars["queryRes"] = data;
						webApp.db.vars["numberPage"] = 1;
						webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );

					}//end callback
				});
				
			break;
			
//--------------------------------------------
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()



	function _formHtmlNodeList(){

	webApp.db.vars["records"] = webApp.db.vars["nodes"];
	//------------ fill output buffer from query result
	if( webApp.db.vars["queryRes"].length > 0 ){
		webApp.db.vars["records"] = webApp.db.vars["queryRes"];
	}

	//------------------ sort NODES
	if( webApp.db.vars["sortByKey"] && webApp.db.vars["sortByKey"].length > 0){
		//if( p.sortByKey !== webApp.vars["DB"]["prevSortKey"]){
			webApp.db.sortNodes({
				records: webApp.db.vars["records"],
				"sortOrder": webApp.db.vars["sortOrder"], //"asc", //desc
				"sortByKey": webApp.db.vars["sortByKey"]
			});
			//webApp.vars["DB"]["prevSortKey"] = p.sortByKey;
		//}
	}
	//------------------

//--------------------	get page data, copy nodes to outputBuffer
		webApp.db.vars["outputBuffer"] = [];
		
		var numPage = parseInt( webApp.db.vars["numberPage"] )-1;
		var numRecordsPerPage = webApp.db.vars["numRecordsPerPage"];
		var startPos = numPage * numRecordsPerPage;
		var endPos = startPos + numRecordsPerPage;
		
		if( startPos > webApp.db.vars["records"].length ){
webApp.vars["logMsg"] = "-- warning, incorrect page number, not more than " + webApp.db.vars["numPages"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"](data);
			//}
			return false;
		}
		if( endPos > webApp.db.vars["records"].length ){
			var n = endPos - webApp.db.vars["records"].length;
			endPos = endPos - n;
//console.log("TEST...", n);
		}
//console.log( startPos, numRecordsPerPage, endPos, webApp.db.vars["records"].length);
		
		for( var n = startPos; n < endPos; n++){
			webApp.db.vars["outputBuffer"].push( webApp.db.vars["records"][n] );
		}
//console.log( webApp.db.vars["outputBuffer"] );
//--------------------	
		
//------------------- filter outputBuffer nodes
		for( var n = 0; n < webApp.db.vars["outputBuffer"].length; n++){
			
			//webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.vars["imageNotLoad"];
			webApp.db.vars["outputBuffer"][n]["main_picture"] = "";
			if( webApp.db.vars["outputBuffer"][n]["images"] ){
				webApp.db.vars["outputBuffer"][n]["images"][0]["template"]= "hide";
				webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.db.vars["outputBuffer"][n]["images"][0]["src"];
/*				
				if( webApp.db.vars["outputBuffer"][n]["images"].length === 1){//if only one attached image
//console.log(webApp.db.vars["outputBuffer"][n]["images"]);
					//webApp.db.vars["outputBuffer"][n]["images"] = [];
					delete webApp.db.vars["outputBuffer"][n]["images"];
				}
*/
			}
	
	
			if( webApp.db.vars["outputBuffer"][n].related_links ){
				var related_links = webApp.db.vars["outputBuffer"][n].related_links;
//console.log( related_links );
				for(var n2 = 0; n2 < related_links.length; n2++){
					var link = related_links[n2];
					if( link["data-type"] === "playlist-file"){
						webApp.db.vars["outputBuffer"][n]["playlist_filepath"] = link["href"];
						link["template"] = "hide element";
					}
				}//next
			}
			
		}//next
//------------------------

		var html = webApp.draw.wrapData({
			"data": webApp.db.vars["outputBuffer"],
			"templateID": "blockList",
			"templateListItemID": "blockListItem"
		});
		
//console.log( html );
		return html;
	}//_formHtmlNodeList()


	function _formHtmlTagGroups(){

		var _tagGroupsList = [];
		for( var n =0; n < webApp.db.vars["tagGroups"].length; n++){
			_group = webApp.db.vars["tagGroups"][n];
			var _tagList = _getTagsByGroupName( _group["name"], webApp.db.vars["tagList"] );
			if( _tagList.length > 0 ){
				_group["num"] = _tagList.length;
				_tagGroupsList.push( _group );
			}
		}//next
		
		var html = webApp.draw.wrapData({
			"data": _tagGroupsList, 
			"templateID": "tagGroupsList",
			"templateListItemID": "tagGroupsListItem"
		});		
//console.log( html );
		return html;
	}//_formHtmlTagGroups()
	
	function _formHtmlTagList( opt ){
		var p = {
			"vid" : null,
			"group_name" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		var _filterList = _getTagsByGroupName(  p["group_name"], webApp.db.vars["tagList"] );
		
		for( var n =0; n < _filterList.length; n++){
			var _nodeList = _getNodesByTag( _filterList[n], webApp.db.vars["nodes"] );
//console.log( _nodeList );
			_filterList[n]["num"] = "0";
			if( _nodeList.length > 0 ){
				_filterList[n]["num"] = _nodeList.length;
			}
		}//next
		
		var html = webApp.draw.wrapData({
			"data": _filterList, 
			"templateID": "tagList",
			"templateListItemID": "tagListItem"
		});		
//console.log( html );
		return html;
	}//_formHtmlTagList()


	function _getTagsByGroupName( groupName, tagList ){
		var tags = [];
		for( var n =0; n < tagList.length; n++){
			if( tagList[n]["group_name"] === groupName ){
				tags.push( tagList[n] );
			}
		}//next
		return tags;
	}//end _getTagsByGroupName()

	function _getNodesByTag( tagObj, nodeList ){
		var nodes = [];
		for( var n =0; n < nodeList.length; n++){
//console.log(nodeList[n]["node_tags"]);

			if( nodeList[n]["node_tags"]){
				if( nodeList[n]["node_tags"].length > 0){
					
					var _nodeTags = nodeList[n]["node_tags"];
					for( var n2 =0; n2 < _nodeTags.length; n2++){
						
						//if( _nodeTags[n2]["vid"] === tagObj["vid"] ){
						//if( _nodeTags[n2]["tid"] === tagObj["tid"] ){
						if( _nodeTags[n2]["text"] === tagObj["text"] ){
							nodes.push( nodeList[n] );
						}
						
					}//next
					
				}
			}
		}//next
		return nodes;
	}//end _getNodesByTag()





	function _changePage( pageNumValue){
//console.log( pageNumValue );
		//var num = parseInt( target.value );
		var num = parseInt( pageNumValue );
		
		if( isNaN(num) ){
webApp.vars["logMsg"] = "-- error, incorrect input " + num;
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
			num = 1;
			$("#page-number").val( num );
			return false;
		}
			
		if( num === 0 ){
webApp.vars["logMsg"] = "-- error, wrong num page";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"], num, webApp.db.vars["numPages"]);
			num = 1;
			$("#page-number").val( num );
		}
		
		if( num > webApp.db.vars["numPages"] ){
webApp.vars["logMsg"] = "-- error, wrong num page";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"], num, webApp.db.vars["numPages"]);
			num = webApp.db.vars["numPages"];
			$("#page-number").val( num );
		}
		
		$("#page-range").val( num );
		webApp.db.vars["numberPage"] = num;
		
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
	}//end _changePage()


	function _toggleMenu(){
		var _w = parseInt( webApp.vars.$offcanvasBar.css("width") );
//console.log( webApp.vars.$offcanvasBar.css("width"), _w);
		
		if( _w == 0){
			webApp.vars.$offcanvas.css("display","block");
			webApp.vars.$offcanvasBar.css("width", webApp.vars.menuWidth);
		}

		if( parseInt(_w) == webApp.vars.menuWidth){
			webApp.vars.$offcanvas.css("display","none");
			webApp.vars.$offcanvasBar.css("width", 0);
		}
	}//end _toggleMenu()

	// function _toggleModal( id ){
		// $modalWindow = $(id);
		// if( $modalWindow.hasClass("uk-open") ){
			// $modalWindow.hide( _vars.duration );
			// //$modalWindow.slideUp( _vars.duration, function () {
			// //$modalWindow.fadeOut( 600, function () {
	// //console.log("-- end of hide....");				
			// //});
			// $modalWindow.removeClass("uk-open");
		// } else {
			// //$modalWindow.show("fast", function () {
			// $modalWindow.slideDown( _vars.duration, function () {
			// //$modalWindow.fadeIn( 600, function () {
	// //console.log("-- end of show....");				
			// });
			// $modalWindow.addClass("uk-open");
		// }
	// }//end _toggleModal()
	
	// function _closeModal( id ){
		// $m = $(id);
		// if( $m.hasClass("uk-open") ){
			// $m.hide( _vars.duration );
			// $m.removeClass("uk-open");
		// }
	// }//end _toggleModal()
	

	function _toggleBlock( id ){
//console.log( id );
		
		if( $( id ).hasClass("uk-hidden") ){
			//$( id ).toggleClass("uk-hidden");
			$( id ).removeClass("uk-hidden");
			$( id ).hide();
			//return;
		}

		if( $( id ).hasClass("uk-open") ){
			$( id ).removeClass("uk-open");
			//$( id ).hide( _vars.duration );
		} else {
			$( id ).addClass("uk-open");
		};

		$( id ).slideToggle( _vars.duration , function(e){
//console.log(arguments);
			// if( id === "#block-tags"){// reset tags select
				// webApp.db.vars["queryRes"] = [];
				// _urlManager("?q=reset_tags_select");
			// }
			if( id === "#log"){
				webApp.vars["logPanel"].innerHTML = "";
			}
		});
		
	}//end _toggleBlock()



	function _imagesLoadEventHandler(){
	//console.log( webApp.vars.$blockList );
		var images = webApp.vars.$blockList.getElementsByTagName("img");
	//console.log( "images =  " + images.length);
	//console.log( "images.onerror =  "+ typeof images[0].onerror);
		for( var n = 0; n < images.length; n++){
			//if( images[n].clientHeight === 0 ){
	//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
	//console.log( "img load error: ", images[n].getAttribute("src") );	
				images[n].onerror = function(e){
	//console.log(e.type, e);
					webApp.vars["logMsg"] = "error, image not load, <small><b>" + e.target["src"] + "</b></small>";
					//webApp.vars["logMsg"] += ", waiting time: " + e["timeStamp"] / 1000 + " sec";
	//console.log(e.target.parentNode);				
					var _blockImages = e.target.parentNode;
					//_blockImages.style.background = "transparent";
					_blockImages.className = "block-images-not-load";
					e.target.outerHTML = "<div class='img-not-load'>"+ webApp.vars["logMsg"] +"</div>";
				}

				images[n].onload = function(e){
	//console.log(e.type, e);
					var _blockImages = e.target.parentNode;
					_blockImages.style.background = "transparent";
				}
				
			//};
		};//next
	}//end _imagesLoadEventHandler()

	// public interfaces
	return{
		//vars : _vars,
		//init:	function(opt){ 
			//return _init(opt); 
		//},
		defineEvents: _defineEvents,
		urlManager:	function(url){ 
			return _urlManager(url); 
		},
		//formHtmlPager : _formHtmlPager,
		formHtmlNodeList : _formHtmlNodeList,
		formHtmlTagGroups : _formHtmlTagGroups,
		formHtmlTagList : _formHtmlTagList,
		imagesLoadEventHandler: _imagesLoadEventHandler,
		toggleBlock: _toggleBlock
		//buildBlock:	function(opt){ 
			//return _buildBlock(opt); 
		//},
		//buildPage:	function(opt){ 
			//return _buildPage(opt); 
		//},
		//serverRequest:	function(opt){ 
			//return _serverRequest(opt); 
		//},
		//loadTemplates : _loadTemplates,
		//formQueryObj : _formQueryObj
	};
}//end _app()

function _db( opt ){
//console.log(arguments);	

	// // private variables and functions
	var _vars = {
		// "indexedDBsupport" : window.indexedDB ? true : false,
		// "webSQLsupport" : window.openDatabase  ? true : false,
		// "localStorageSupport" : window['localStorage']  ? true : false,
		// // "dataStoreType" : _detectDataStore(),
		// // "tables": {}
		"dataUrl" : "db/export_music.xml",
		"dbType" : "xml",
		//"db_type" : "json",
		"dbName": "music",
			
		"tagNameNodes": "node",
		"tagName": "tag",
		"tagListName": "tag_list",
		"tagGroupsName": "tag_groups",
		"footerLinks" : [
{ url : "https://music.yandex.ru/users/roman-laptev/playlists", title: "music.yandex.ru" },
{ url : "https://www.youtube.com/channel/UCgp8hFrPYEx2F1SqEB8yUMg/playlists", title: "youtube playlists" },
//{ url : "https://vk.com/audios36466377", title: "music on VK.com", template : "blockLinksListItem3" },
{ url : "https://vk.com/audios36466377", title: "music on VK.com" },
{ url : "https://ok.ru/music/profile/508693848602", title: "music on OK.ru" },
{ url : "https://cloud.mail.ru/public/bbb2f6a3eb1d/music", title: "music on cloud.mail.ru" }
		],
		
		"numRecordsPerPage": 5,
		"numberPage": 1,
		"numPages": null,
		
		"sortOrder": "asc",
		"sortByKey": "", //"title", //"updated", 
		"dateFormat": "dd-mm-yyyy hh:mm:ss",

		"outputBuffer": [],
		"queryRes":[]
	};

	var _init = function( opt ){
//console.log("_db: ", _vars);
// console.log( "indexedDBsupport: " + _vars["indexedDBsupport"] );			
// console.log( "webSQLsupport: " + _vars["webSQLsupport"] );			
// console.log( "localStorageSupport: " + _vars["localStorageSupport"] );			
// console.log( "Data store type: " + _vars["dataStoreType"] );			
/*
		if( webApp.vars["support"]["indexedDBsupport"]){
			indexedDatabase = iDBmodule();
//console.log("indexedDatabase module:", indexedDatabase);
		}
		if( webApp.vars["support"]["webSQLsupport"]){
			webSqlDb = webSQLmodule();
//console.log("webSQLmodule:", webSqlDb);
		}
*/
		//storage.init();// _init_cache
//---------------------
	};//end _init()

	function _detectDataStore(){
//console.log(arguments);		
//console.log( this );		
		var dataStoreType = false;
		if( window['localStorage']  ? true : false ){
			dataStoreType = "localStorage";
		}
		if( window.openDatabase  ? true : false ){
			dataStoreType = "webSQL";
		}
		if( window.indexedDB ? true : false ){
			dataStoreType = "indexedDB";
		}
		return dataStoreType;
	}//end _detectDataStore()

	
	function _getData( postFunc ){
//console.log("webApp.db.getData() ", arguments);

		// if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			// _vars["dataStoreType"] = false;
		// } 

		switch(_vars["dataStoreType"]) {				
			
			case "indexedDB":
				// webApp.iDBmodule.getListStores({//DB exists?
					// "dbName" : webApp.iDBmodule.dbInfo["dbName"],
					// "callback" : function( listStores ){
// console.log(listStores);				
						// webApp.iDBmodule.checkState({
							// "listStores" : listStores,
							// "callback" : postFunc//draw page
						// });
// //console.log("test!");				
					// }//end callback
				// });
				// return false;
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
				if( !_vars["dataUrl"] ||
					_vars["dataUrl"].length === 0 ){
webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
					if( typeof postFunc === "function"){
						postFunc();
					}
					return false;
				}

				webApp.vars["loadProgress"].style.display="block";
				func.runAjax( {
					"requestMethod" : "GET", 
					"url" : _vars["dataUrl"], 
					
					"onProgress" : function( e ){
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
						webApp.vars["totalBytes"].innerHTML = e.total;
						webApp.vars["totalMBytes"].innerHTML = (( e.total / 1024) / 1024).toFixed(2);
						webApp.vars["loaded"].innerHTML = e.loaded;

						if( webApp.vars["loadProgressBar"] ){
							//webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							//webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
						}
					},
						
					"onLoadEnd" : function( headers ){
//console.log( headers );
						//webApp.vars["loadProgress"].style.display="none";
						var logMsg = webApp.vars["loadInfo"].textContent.trim();
						logMsg += ", " + _vars["dataUrl"];
						func.logAlert( logMsg, "info");
					},
					
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
						for( var key in e){
							webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
							func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
						}//next

webApp.vars["logMsg"] = "error, ajax load failed..." + _vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
						if( typeof postFunc === "function"){
							postFunc();
						}
						//return false;
					},

					"callback": function( data ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( !data ){
webApp.vars["logMsg"] = "error, no data in " + _vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
							if( typeof postFunc === "function"){
								postFunc(false);
							}
							return false;
						}

						//if( data ){
							// if( webApp.vars["cache"]["cacheUpdate"] ){
		// webApp.vars["logMsg"]= "need to update cache data - " + webApp.vars["dataUrl"];
		// //func.logAlert( webApp.vars["logMsg"], "warning");
		// console.log( webApp.vars["logMsg"] );
								// storage.saveAppData({
									// "dataStoreType": webApp.vars["support"]["dataStoreType"],
									// "data": data,
									// "callback" : function( state ){
		// //webApp.vars["logMsg"]= "Update cache data, " + webApp.vars["dataUrl"];
		// //func.logAlert( webApp.vars["logMsg"], "success");
		// //console.log( webApp.vars["logMsg"] );
										// webApp.vars["cache"]["cacheUpdate"] = false;
									// }
								// });
							// }
							_parseAjax( data );
							if( typeof postFunc === "function"){
								postFunc();
							}
						//}


					}//end callback()
				});
				
			break;
		}//end switch

		//return false;
			
		function _parseAjax( data ){
			
			if( _vars["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + _vars["dbType"];
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			switch( _vars["dbType"] ){
				case "xml":
					_parseXML( data );
				break;
				
				case "json":
//_parseJSON( data );
				break;
				
				case "csv":
//_parseCSVBlocks(data);
				break;
			}//end switch
			
		}//_parseAjax()
		
	}//end _getData()
	
	
	function _parseXML(xml){
//console.log("function _parseXML()");
var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj( xml );
//console.log(xmlObj);
delete xml;
			_vars["nodes"] = _getNodesObj(xmlObj);
			
//--------------------			
			for( var n = 0; n < _vars.numRecordsPerPage; n++){
				_vars["outputBuffer"].push( _vars["nodes"][n] );
			}//next
//--------------------			
			
			_vars["tagList"] = _getTagListObj(xmlObj);
			_vars["tagGroups"] = _getTagGroupsObj(xmlObj);
delete xmlObj;

			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["getDataRes"] = true;

			var timeEnd = new Date();
			var runTime = ( timeEnd.getTime() - timeStart.getTime() ) / 1000;
			webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
			func.logAlert( webApp.vars["logMsg"], "info");
//console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.logAlert( webApp.vars["logMsg"], "error");
console.log( error );
				for( var key in error ){
					webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ error[key];
					func.logAlert( webApp.vars["logMsg"], "error");
				}//next

		}//end catch

	}//end _parseXML()

	function _getNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagName = _vars["tagNameNodes"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var tagNodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagName];
			}
		}//next

		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n].attributes.type
				};

				for(var item in tagNodes[n]["childNodes"]){
					var _content = tagNodes[n]["childNodes"][item][0]["text"];
//console.log( item, _content );	

					//if( !_content ){
					if( tagNodes[n]["childNodes"][item][0]["childNodes"] ){
						_content = __convertMultipleField( tagNodes[n]["childNodes"][item][0]["childNodes"]);
					}
					
					obj[item] = _content;
				}
				
				obj["nid"] = n;//create unique id for node
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
			}//next
		}

//------------------ form timestamp (for sort by 'updated')
		__addTimeStamp();
		//__checkSupport();
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
//console.log( item1, _xf );	
				for(var item2 in _xf){
					if( _xf[item2]["childNodes"] ){
						var _xff = _xf[item2]["childNodes"];
						//var obj = {};
						for( var key3 in _xff ){
							//obj[key3] = _xff[key3];
//console.log(_xff[key3][0]);	
							//fields.push( _xff[key3][0]["attributes"] );//<li><a...>(only one tag!!!)</li>
							var obj = {};
							if( _xff[key3][0]["attributes"] ){
								obj = _xff[key3][0]["attributes"];
							}
							if( _xff[key3][0]["text"] ){
								obj["text"] = _xff[key3][0]["text"];
							}
							fields.push( obj );
							
						}
					} else {
//console.log( _xf[item2] );	
						//fields.push( _xf[item2] );
						
						var obj = {};
						if( _xf[item2]["attributes"] ){
							obj = _xf[item2]["attributes"];
						}
						if( _xf[item2]["text"] ){
							obj["text"] = _xf[item2]["text"];
						}
						fields.push( obj );
						
					}
				}
			}
			return fields;
		}//end __convertMultipleField()


		function __addTimeStamp(){
			if( webApp.db.vars["dateFormat"] !== "dd-mm-yyyy hh:mm:ss"){
				return false;
			}
			
			for(var n = 0; n < nodes.length; n++){
				if( nodes[n]["updated"] && nodes[n]["updated"].length > 0){
					var arr = nodes[n]["updated"].split(" ");
					var dateArr = arr[0].split("-");
					var timeArr = arr[1].split(":");
						
					var split_values = {
						"day" : dateArr[0],
						"month" : dateArr[1],
						"year" : dateArr[2],
						"hour" : timeArr[0],
						"min" : timeArr[1],
						"sec" : timeArr[2]
					};
					nodes[n]["timestamp"] = func.getTimeStampFromDateStr( split_values );
				}
			}//next
		}// end __addTimeStamp()
		
/*		
		function __checkSupport(){
			for(var n = 0; n < nodes.length; n++){
				var links = nodes[n]["ul"];
				if(!links){
					continue;
				}
				for( var n2 = 0; n2 < links.length; n2++){
					//links[n2]["class-support"] = "";
					if( links[n2]["data-type"] === "local-file"){
						var filepath = links[n2]["href"];
						//get file type
						var arr = filepath.split(".");
						var filetype = arr[ (arr.length-1) ];
						var videoType = webApp.vars["videoTypes"][filetype];
//console.log(filetype, videoType);

						if( videoType && videoType["support"]){
							//links[n2]["class-support"] = "1";
						} else {
							links[n2]["class_support"] = "wrong-video-type";
						}
					}
				}
			}//next
		}// end __checkSupport()
*/		
	}//end _getNodesObj()


	function _getTagListObj(xmlObj){
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagListName = _vars["tagListName"];//"tag_list"
		var tagName = _vars["tagName"];//"tag"
		
		var nodes = [];
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
//var nodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagListName][n]["childNodes"][tagName];
var xTagList = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagListName][n]["childNodes"][tagName];
				for( var n2 = 0; n2 < xTagList.length; n2++ ){
					var obj = {};
					if( xTagList[n2]["attributes"] ){
						obj = xTagList[n2]["attributes"];
					}
					if( xTagList[n2]["text"] ){
						obj["text"] = xTagList[n2]["text"];
					}
					nodes.push( obj );
				}//next
				
			}
		}//next
		
		if( nodes.length > 0){
			func.sortRecords({
				"records" : nodes,
				"sortOrder": "asc", //desc
				"sortByKey": "text"
			});
			
			return nodes;
		} else {
			return false;
		}
				
	}//end _getTagListObj()


	function _getTagGroupsObj(xmlObj){
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagName = "item";
		var tagGroupsName = _vars["tagGroupsName"];//"tag_groups"
		
		var nodes = [];
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var xTagGroupList = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagGroupsName][n]["childNodes"][tagName];
//console.log( xTagGroupList);	
				for( var n2 = 0; n2 < xTagGroupList.length; n2++ ){
					var obj = {};
					if( xTagGroupList[n2]["attributes"] ){
						obj = xTagGroupList[n2]["attributes"];
					}
					if( xTagGroupList[n2]["text"] ){
						obj["text"] = xTagGroupList[n2]["text"];
					}
					nodes.push( obj );
					
				}//next
			}
		}//next
		
		if( nodes.length > 0){
			func.sortRecords({
				"records" : nodes,
				"sortOrder": "asc", //desc
				"sortByKey": "text"
			});
			
			return nodes;
		} else {
			return false;
		}
				
	}//end _getTagGroupsObj()
	
	
	function _getNodesByTag( opt ){
		var p = {
			"tagName" : null,
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}

		if( !p["tagName"] || p["tagName"].length === 0){
webApp.vars["logMsg"] = "-- error, not found tag name value, webApp.db.getNodesByTag()...";
console.log( webApp.vars["logMsg"] );
			return false;
		}

		var data = [];
		for(var n = 0; n < _vars["nodes"].length; n++){
			var node = _vars["nodes"][n];
			if( !node["node_tags"] ){
console.log(node);		
				continue;			
			}
			var tags = node["node_tags"];
			for(var n2 = 0; n2 < tags.length; n2++){
//console.log( tags[n2]["text"], tags[n2]["text"].length, p["tagName"], p["tagName"].length, tags[n2]["text"] === p["tagName"]);
				var tagName = p["tagName"].trim();
				var nodeTagName = tags[n2]["text"].trim();
//console.log( nodeTagName, nodeTagName.length, tagName, tagName.length, nodeTagName === tagName);
				if( nodeTagName === tagName){
					data.push( node );
				}
			}//next
			
		}//next

		//_vars["queryRes"] = data;

		if( typeof p["callback"] === "function"){
			p["callback"](data);
		}
		//return false;
		
	}//end _getNodesByTag()


	function _search( opt ){
		var p = {
			"targetField" : null,
			"keyword" : null,
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
	//console.log(p);
		var fieldKey = p["targetField"];
		var itemKey;
		
		if( fieldKey === "title"){
			itemKey = "text";
		}
		
		//if( fieldKey === "filename"){
			//fieldKey = "ul";
			//itemKey = "href";
		//}
		
		var data = [];
		for(var n = 0; n < _vars["nodes"].length; n++){
			var node = _vars["nodes"][n];
			var item = node[fieldKey];
//console.log(item);

			if(!item){
				continue;
			}

			if( itemKey && itemKey.length > 0){//search into multi fields
				for(var n2 = 0; n2 < item.length; n2++){
					if( item[n2][itemKey]){
						var test = item[n2][itemKey].toLowerCase();
						var keyword = p["keyword"].toLowerCase();
						if( test.indexOf(keyword) !==-1 ){
							data.push( node );
							break;
						}
					}
				}//next
			} else {
	//console.log(node[fieldKey], typeof node[fieldKey]);
				if( typeof node[fieldKey] !== "string"){
					continue;
				}
				var test = node[fieldKey].toLowerCase();
				var keyword = p["keyword"].toLowerCase();
				if( test.indexOf(keyword) !==-1 ){
					data.push( node );
				}
			}
			
		}//next

		_vars["queryRes"] = data;

		if( typeof p["callback"] === "function"){
			p["callback"](data);
		}

	};//end _search()


	function _sortNodes(opt){
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
			var logMsg = "error, not found sorting records...";
func.logAlert( logMsg, "error");
console.log( logMsg );
			return false;
		}
				
		if(!p.sortByKey){
			var logMsg = "error, not found 'sortByKey'...";
func.logAlert( logMsg, "error");
console.log( logMsg );
			return false;
		}
				
		p.records.sort(function(a,b){
	//console.log(a, b);
			var s1,s2;
			
			s1 = a[p.sortByKey];
			s2 = b[p.sortByKey];
			
			if( p.sortByKey === "title" ){
				s1 = a[p.sortByKey][0]["text"].toLowerCase();
				s2 = b[p.sortByKey][0]["text"].toLowerCase();
			}
			
			if( p.sortByKey === "updated" ){
				s1 = a["timestamp"];
				s2 = b["timestamp"];
			}
			
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
		
	}//end _sortNodes()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		getData:	function( opt ){ 
			return _getData( opt ); 
		},
		getNodesByTag: _getNodesByTag,
		search: _search,
		sortNodes: _sortNodes
	};
}//end _db()
function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"templates":{

//=========================================
			"blockPlayer" : '<div class="uk-card uk-card-default uk-margin-small">\
						<div class="row">\
							<div class="uk-float-right">\
									<a data-toggle="#block-player" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body w60 uk-padding-small wrapper">\
							<div class="uk-margin-small">\
								<h5 id="track-info"></h5>\
<audio id="audio-player" controls="controls" class="w100"><source src="" />Tag <b>audio</b> not supported by this browser....</audio>\
							</div>\
							<div class="uk-margin-small">\
<iframe type="text/html" id="iframe-player" src="" style="display: none;" width="640" height="385" frameborder="1"></iframe>\
<video id="video-player" controls="controls" width="640" height="385">\
	<source src="">\
	Tag <b>video</b> not supported by this browser.... \
</video>\
							</div>\
							<div id="player-buttons">\
								<ul class="button-group uk-list">\
<!--<button id="btn-play" class="btn btn-blue">play</button>\
<button id="btn-pause" class="btn btn-blue">pause</button>-->\
<li><a href="?q=prev-track" class="btn btn-blue">previous track</a></li>\
<li><a href="?q=next-track" class="btn btn-blue">next track</a></li>\
								</ul>\
							</div>\
						</div>\
{{content}}\
					</div>',
			
//=========================================
			"blockTrackList" : '<div class="wrapper">{{content}}</div>',
			"trackList" : '\
<div class="row">\
			<div class="uk-float-left">\
				<h4>{{tracklist_title}}</h4>\
			</div>\
			<div class="uk-float-right">\
					<a data-toggle="#block-tracklist" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
			</div>\
</div>\
		<div class="">\
			<ul class="menu-track-action button-group uk-list">\
<li><a href="?q=clear-tracklist" class="uk-button uk-button-danger uk-button-small">clear track list</a></li>\
<li><a href="?q=toggle" data-toggle="#modal-insert-track" class="uk-button uk-button-primary uk-button-small">insert track</a></li>\
<li><a href="?q=get-tracklist-url&action=load-tracklist" title="load track list from JSON file" class="uk-button uk-button-primary uk-button-small">Load track list</a></li>\
<li><a href="?q=get-tracklist-url&action=save-tracklist" title="save track list to JSON file" class="uk-button uk-button-primary uk-button-small">Save track lists</a></li>\
			</ul>\
		</div>\
<div class="media-list">\
	<ul id="track-list" class="list-unstyled">{{list}}</ul>\
</div>',
						
			"trackListItem" :  '<li class="list-group-item">\
	<div class="uk-clearfix">\
		<div class="uk-float-left">{{number}}.\
			<a class="track-name" href="?q=load-track&amp;num={{number}}">{{artist}}, {{title}}</a>\
		</div>\
		<div class="uk-float-right">\
<a class="edit-track" href="?q=edit-track&amp;num={{number}}">edit</a> | \
<a class="remove-track" href="?q=remove-track&amp;num={{number}}" title="Remove this track from tracklist">x</a>\
		</div>\
	</div>\
</li>',

			
//=========================================
			"blockTags" : "{{block-tag-groups}} {{block-taglist}}",
			"blockTagGroups" : '\
						<div class="uk-card uk-card-primary">\
						<div class="row">\
							<div class="uk-float-left uk-padding-small">\
								<b>Tag groups</b>\
							</div>\
							<div class="uk-float-right">\
<a data-toggle="#block-tags" href="?q=close" title="reset tags select" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
{{content}}\
						</div>\
					</div>',
			"tagGroupsList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagGroupsListItem" :  '<li><a  href="?q=get-tag-list&vid={{vid}}&group_name={{name}}">{{name}} </a><small>({{num}})</small></li>',
					
			"blockTagList" : '\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-syles">\
							<div class="uk-card-body uk-padding-small">\
{{content}}\
							</div>\
						</div>',
			"tagList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagListItem" :  '<li><a href="?q=get-nodes-by-tag&vid={{vid}}&tid={{tid}}&group_name={{group_name}}">{{text}} </a><small>({{num}})</small></li>',
			
//=========================================
			"blockFileManager" : '<div class="uk-card uk-card-default wrapper">{{content}}</div>',
			"contentFileManager" : '<div class="row">\
							<div class="uk-float-left uk-padding-small">\
									<b>File manager</b>\
							</div>\
							<div class="uk-float-right">\
<a data-toggle="#fm-settings" href="?q=toggle" class="btn icon-cog"></a>\
<a data-toggle="#block-file-manager" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
<div id="fm-settings" class="wrapper uk-margin-small uk-padding-small uk-hidden">\
<b>Define location music collection: </b>\
	<input name="inp_location_path" id="input-location-path" value="{{location}}" type="text" class="uk-input w80">\
	<a href="?q=define-location" class="btn btn-blue">Reload</a>\
	<p>/mnt/d2/music; /home/www/music; d:/music</p>\
	<b>web alias:</b><input name="inp_web_alias" id="input-web-alias" value="{{web_alias}}" type="text" class="uk-input w60">\
	<p>/music; /www; /video....</p>\
</div>\
							<div class="wrapper">\
{{buttons_fs_action}}\
<div class="row">\
	{{btn_change_level}}\
	<div class="breadcrumbs uk-float-left w90"><p><b>fs path</b>: {{fs_path}}</p> <p><b>url path</b>: {{url_path}}</p></div>\
</div>\
{{filelist}}\
							</div>\
						</div>',
					
			"buttonsFSaction": '<div class="">\
	<ul class="btn-fs-action button-group">\
<li><a href="?q=check-all" class="btn btn-blue">select all</a></li>\
<li><a href="?q=clear-all" class="btn btn-blue">clear all</a></li>\
<li><a href="?q=rename-file" class="btn btn-orange">rename selected</a></li>\
<li><a href="?q=delete-file" class="group-remove uk-button uk-button-small uk-button-danger" >delete selected</a></li>\
<li><a href="?q=add-track" class="uk-button uk-button-small uk-button-primary">add track to tracklist</a></li>\
	</ul>\
</div>',

		"btnChangeLevel": '<div class="uk-padding-small uk-float-left">\
<a class="up-link icon-level-up" href="?q=level-up"></a>\
</div>',

			"fileList": '<div class="wfm">{{subfolders}}{{files}}</div>',

			"subfolders_listTpl" : '<ul class="folders-list uk-list uk-list-striped">{{list}}</ul>', 
			"subfolders_itemTpl" : '<li>\
<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
<a class="subfolder" href="?q=get-folder&foldername={{name}}"><span class="icon-folder"></span>{{name}}</a>\
</li>',

		"files_listTpl" : '<ul class="files-list uk-list uk-list-striped">{{list}}</ul>', 
		
		"files_itemTpl" : '<li><div>\
		<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
		<a class="file-name no-block-link" href="{{url}}" target="_blank">{{name}}</a>\
	</div></li>',
	
		"files_itemTpl_block" : '<li>\
	<div>\
		<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
		<span class="file-name">{{name}}</span>\
	</div>\
</li>',


//=========================================
			"blockPager" : '<div class="row">\
<div class="uk-float-left">\
records: <b><span id="total-records">{{total_nodes}}</span></b> \
(<small><b><span id="num-pages">{{num_pages}}</span></b> pages</small>)\
</div>\
							<div class="uk-float-right">\
<form name="formSearch" id="form-search" action="">\
	<div class="form-group">search by: \
		<label><input type="radio" name="targetField" value="title" checked>title</label>\
<!--		<label><input type="radio" name="targetField" value="description">description</label> -->\
<!--		<label><input type="radio" name="targetField" value="filename" >attached filename</label>-->\
	</div>\
	<ul class="button-group">\
		<li><input name="keyword" id="input-keyword" placeholder="enter keyword" autocomplete="off" value="" type="text" class="uk-input"></li>\
		<li><button type="submit" class="uk-button uk-button-small uk-button-primary no-block-link"><i class="icon-search no-block-link"></i></button></li>\
		<li><button type="reset" class="uk-button uk-button-small uk-button-danger no-block-link"><i class="icon-remove no-block-link"></i></button></li>\
	</ul>\
</form>\
							</div>\
					</div>\
					<div class="row">\
						<div class="block-num-page uk-float-left w20">\
<small>page №:</small>\
<button id="btn-page-number-less" class="">-</button>\
<input id="page-number" type="text" value="" size="3" maxlength="3" autocomplete="off" class="only-numbers">\
<button id="btn-page-number-more" class="">+</button>\
						</div>\
						<div class="uk-float-left w60 box-range">\
<input id="page-range" type="range" min="1" max="5" step="1" value="1" autocomplete="off" class="range uk-width-1-1">\
						</div>\
					</div>\
					<div class="row">\
						<div class="uk-float-right">\
							<label class="uk-label">sort by</label>\
							<select id="select-sort" class="" autocomplete="off">\
								<option value="" selected=""></option>\
								<option value="title">title</option>\
								<option value="updated">update date</option>\
							</select>\
						</div>\
					</div>',
			// "pageInfo" : '<div class="uk-float-left">\
// records: <b><span id="total-records">{{total_nodes}}</span></b> \
// <small>(<b><span id="num-pages">{{num_pages}}</span></b> pages )</small> \
			// </div>',
			
			"blockNodes" : '{{content}}',
			"blockList" : '<div>{{list}}</div>',
			"blockListItem" : '<div class="uk-card uk-card-default node pls-8">\
<div class="node-wrap">\
						<div class="uk-card-header uk-padding-small block-titles">\
{{title}}\
						</div>\
						<div class="uk-card-body uk-padding-small block-images">\
							<img src="{{main_picture}}">\
						</div>\
</div>\
						<div class="toggle-content">\
							<button class="btn-dropdown icon-chevron-down"></button>\
							<div class="uk-card-body uk-padding-small block-content">\
								<ul class="uk-list">\
<li><a href="?q=load-tracklist&url={{playlist_filepath}}" class="btn btn-blue-c4 btn-load-tracklist">add to tracklist</a></li>\
<li><a href="?q=edit-node&nid={{nid}}" class="btn btn-blue-c4">edit</a></li>\
								</ul>\
{{related_links}}\
								<div class="description">{{description}}</div>\
{{node_tags}}\
{{images}}\
								<div>\
									<small>published: {{published}},	updated: {{updated}}</small>\
								</div>\
							</div>\
						</div>\
			</div>',

//sub LISTs

			title : {
				"listTpl" : '{{list}}', 
				"itemTpl" : '<h3>{{text}}</h3>',
			},
			images : {
				"listTpl" : '<div class="uk-card-body uk-padding-small">{{list}}</div>', 
				"itemTpl" : '<div class="block-images"><img src="{{src}}" alt="" title=""></div>',
			},
			related_links : {
				"listTpl" : '<ul class="related-links">{{list}}</ul>', 
				"itemTpl" : '<li><a href="{{href}}" data-type="{{data-type}}" target="_blank" class="no-block-link">{{text}}</a></li>',
			},
			node_tags : {
"listTpl" : '<div><ul class="list-inline node-tags">{{list}}</ul></div>', 
"itemTpl" : '<li><a href="?q=get-nodes-by-tag&group-name={{group_name}}" class="">{{text}}</a></li>',
			},
			
//=========================================
		"blockFooterLinks" : '<!-- <h2>{{block_title}}</h2>-->\
<div class="uk-card uk-card-primary">\
{{content}}\
</div>',
		"blockLinksList" : '<ul class="uk-card-body uk-text-center">{{list}}</ul>',
		"blockLinksListItem" : '<li class="uk-inline"><a class="no-block-link" href="{{url}}" target="_blank">{{title}}</a></li>',
		//"blockLinksListItem3" : '<li>use specific template: {{template}},<br> {{url}} {{title}}</li>'//,
		
		//"blockLinksListItem6" : '<li>use specific template: {{template}}, {{url}} {{titles}}</li>',
		//"blockLinksListItem6_listTpl" : '<ul>{{list}}</ul>',
		//"blockLinksListItem6_itemTpl" : '<li>{{url}} {{title}}</li>'
		}//end templates
		
	};

	var _init = function(){
//console.log("init _draw");
	};
	
	var _buildPage = function( opt ){
		var p = {
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);

		//for( var n = 0; n < webApp.vars["blocks"].length; n++){
			//_buildBlock( webApp.vars["blocks"][n] );
		//}//next
		
		_buildBlock( webApp.vars["blocksByName"]["blockTagGroups"] );
		_buildBlock( webApp.vars["blocksByName"]["blockPager"] );
		_buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
		
		_buildBlock( webApp.vars["blocksByName"]["blockPlayer"] );
		_buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( webApp.vars["use_file_manager"] ){
			_buildBlock( webApp.vars["blocksByName"]["blockFM"] );
		}
		
		_buildBlock( webApp.vars["blocksByName"]["blockFooterLinks"] );

	};//end _buildPage()


	var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
		var timeStart = new Date();
		var p = {
			"title": "",
			"content" : "",
			"templateID" : "tpl-block",
			//"contentType" : "",
			//"contentTpl" : "tpl-list",//"tpl-menu"
			//"contentListTpl" : false,
			"postFunc" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);
				if( typeof p["callback"] === "function"){
					p["callback"]();//return from _buildBlock()
				}
			},//end postFunc
			"callback" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
//console.log( typeof p["content"]);

		if( typeof p["content"] === "function"){//dynamic form content
			p["content"]();
		} else {
			_insertBlock( p );
		}
	};//end _buildBlock()
	
	
	var _insertBlock = function( opt ){
		var p = {
			"templateID": false,
			"locationID": "",
			"title" : "block",
			"content" : false,
			"postFunc":null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log("_draw_insertBlock()", p);

		var templateID = p["templateID"];
		if( !webApp.draw.vars["templates"][templateID] ){
webApp.vars["logMsg"] = "_insertBlock(), error, not found template, id:" + templateID;
func.logAlert( webApp.vars["logMsg"], "error");
console.log( "-- " + webApp.vars["logMsg"] );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		if( !p["content"] || p["content"].length === 0){
webApp.vars["logMsg"] = "_insertBlock(), warning, not found or empty content block " + p["locationID"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- "+webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"]();
			//}
			//return false;
		}
		
		var html = webApp.draw.vars["templates"][templateID];
		html = html.replace("{{block_title}}", p["title"]);
		html = html.replace("{{content}}", p["content"]);
		
		var locationBlock = func.getById( p["locationID"] );
		if( locationBlock ){
			locationBlock.innerHTML = html;
			
			//show block if hidden
			if( locationBlock.style.display === "none"){
				locationBlock.style.display = "block";
			}
//console.log( locationBlock, locationBlock.style.display );
			
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["postFunc"] === "function"){
			p["postFunc"]();
		}

	};//end _insertBlock()


	function _wrapData( opt ){
		var p = {
			"data": null,
			"templateID" : false,
			"templateListItemID": false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw.wrapData(), error, incorrect data ...");
			return false;
		}
		if( !p["templateID"] ){
console.log("-- _draw.wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.draw.vars["templates"][p.templateID] ){
console.log("-- _draw.wrapData(),  error, not find template, id: " + p.templateID);
			return false;
		}
		
		var html = "";
//console.log( p["data"].length );

		if( p["data"].length > 0 ){
			html = __formListHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
		} else {
			html = __formNodeHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
		}
		
//console.log(html);
		return html;

		//function __formNodeHtml( data, _html ){
		function __formNodeHtml( data, template ){
//----------------- load unique template for data element
//hide element - write not defined template ID
		if( data["template"]){
//console.log(data);
//console.log(data["template"].length);
			
			if( data["template"].length > 0){
				var tplName = data["template"];
				if( webApp.draw.vars["templates"][ tplName ] ){
					template = webApp.draw.vars["templates"][ tplName ];
				} else {
//console.log("-- warning, no draw element because not defined template: '" + tplName + "'...");
//console.log(data);
					return "";
				}
			}

		}
			
			var _html = template;
			for( var key in data ){
//console.log(key, data[key]);
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, data[key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
				}
			}//next
			
//--------------- clear undefined keys (text between {{...}} )
			_html = _html.replace( new RegExp(/{{(.*?)}}/g), "");

			return _html;
		}//end __formNodeHtml()
		
		function __formListHtml( data, _html ){
//console.log( data);
//console.log( data instanceof Array, data);
			var test = data instanceof Array;
			if( !test){
console.log("-- error, info block data  is not instanceof Array: ", typeof data, data );
				return false;
			}
			
			var listHtml = "";
			for( var n = 0; n < data.length; n++){
//console.log( n );
//console.log( data[n], typeof data[n], data.length);

				//form list items
				var item = data[n];
				
				var itemHtml = webApp.draw.vars["templates"][ p.templateListItemID];
//----------------- load unique template for data element
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.draw.vars["templates"][ tplName ] ){
						itemHtml = webApp.draw.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
						continue;
					}
				}

//--------------- get keys from template (text between {{...}} )
				//if(n === 1){
					var tplKeys = itemHtml.match(/{{(.*?)}}/g);
					for(var n1 = 0; n1 < tplKeys.length; n1++){
						tplKeys[n1] = tplKeys[n1].replace("{{","").replace("}}","");
					}//next
//console.log( tplKeys, p.templateListItemID, item, itemHtml );
				//}
//---------------

				//make copy object item
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){//child array in data element
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							//item[key2] = "<span class='not-found-item 1'>not found " + key2 +"</span>";
						} else {
							//read templates for sub list
							var subOrdList = _vars["templates"][key2]["listTpl"];
							var itemTpl = _vars["templates"][key2]["itemTpl"];
//console.log(subOrdList);
//console.log(itemTpl);
//console.log(item[key2], key2);
				
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
							//itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item 2'>not found " + key2 +"</span>");
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "");
						} else {
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

	}//end _wrapData()

/*
	function _wrapDataMod( opt ){
		var p = {
			"data": null,
			"templateID" : false,
			"template" : false,
			"templateListItemID": false,
			"templateListItem": false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw.wrapData(), error, incorrect data ...");
			return false;
		}
		
		var _template = p.templateID;
console.log(_template);

		if( ! _template || _template.length === 0 ){
console.log("-- error, _draw.wrapData(),  template is not defined...");
			return false;
		}
		
		
		var html = "";
//console.log( p["data"].length );

		if( p["data"].length > 0 ){
			html = __formListHtml( p["data"], _template );
		} else {
			html = __formNodeHtml( p["data"], _template );
		}
		
//console.log(html);
		return html;

		//function __formNodeHtml( data, _html ){
		function __formNodeHtml( data, tpl ){
//----------------- load unique template for data element
//hide element - write not defined template ID
		if( data["template"]){
//console.log(data);
//console.log(data["template"].length);
			
			if( data["template"].length > 0){
				var tplName = data["template"];
				if( webApp.draw.vars["templates"][ tplName ] ){
					tpl = webApp.draw.vars["templates"][ tplName ];
				} else {
//console.log("-- warning, no draw element because not defined template: '" + tplName + "'...");
//console.log(data);
					return "";
				}
			}

		}
			
			var _html = tpl;
			for( var key in data ){
//console.log(key, data[key]);
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, data[key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
				}
			}//next
			
//--------------- clear undefined keys (text between {{...}} )
			_html = _html.replace( new RegExp(/{{(.*?)}}/g), "");

			return _html;
		}//end __formNodeHtml()
		
		function __formListHtml( data, tpl ){
//console.log( data);
//console.log( data instanceof Array, data);
			var test = data instanceof Array;
			if( !test){
console.log("-- error, info block data  is not instanceof Array: ", typeof data, data );
				return false;
			}
			
			var listHtml = "";
			for( var n = 0; n < data.length; n++){
//console.log( n );
//console.log( data[n], typeof data[n], data.length);

				//form list items
				var item = data[n];
				
				var itemHtml = tpl;
//----------------- load unique template for data element
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.draw.vars["templates"][ tplName ] ){
						itemHtml = webApp.draw.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
						continue;
					}
				}

//--------------- get keys from template (text between {{...}} )
				//if(n === 1){
					var tplKeys = itemHtml.match(/{{(.*?)}}/g);
					for(var n1 = 0; n1 < tplKeys.length; n1++){
						tplKeys[n1] = tplKeys[n1].replace("{{","").replace("}}","");
					}//next
//console.log( tplKeys, p.templateListItemID, item, itemHtml );
				//}
//---------------

				//make copy object item
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){//child array in data element
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							//item[key2] = "<span class='not-found-item 1'>not found " + key2 +"</span>";
						} else {
							//read templates for sub list
							var subOrdList = _vars["templates"][key2]["listTpl"];
							var itemTpl = _vars["templates"][key2]["itemTpl"];
//console.log(subOrdList);
//console.log(itemTpl);
//console.log(item[key2], key2);
				
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
							//itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item 2'>not found " + key2 +"</span>");
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "");
						} else {
							itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), _tmp[key2] );
						}
					}
					
				}//next
					
				listHtml += itemHtml;
//console.log(items);
//console.log(listHtml);

			}//next
			
			_html = tpl.replace("{{list}}", listHtml);
			return _html;
			
		}//end __formListHtml

	}//end _wrapDataMod()
*/
	
	function _updatePager(opt){
		
		if( webApp.db.vars["queryRes"].length === 0){
			var totalNodes = webApp.db.vars["nodes"].length;
		} else {
			var totalNodes = webApp.db.vars["queryRes"].length;
		}
		var numPages = Math.ceil( totalNodes / webApp.db.vars["numRecordsPerPage"]);
		webApp.db.vars["numPages"] = numPages;
		
		$("#total-records").text( totalNodes );
		$("#num-pages").text( numPages );
		
//---------------------------------
		$("#page-number").val( webApp.db.vars["numberPage"] );
		$("#page-range").val( webApp.db.vars["numberPage"] );
		$("#page-range").attr("max", webApp.db.vars["numPages"]);
		
	}//end _updatePager()


	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		},
		buildPage: _buildPage,
		buildBlock: _buildBlock,
		insertBlock:	function( opt ){ 
			return _insertBlock( opt ); 
		},
		wrapData:	function( opt ){ 
			return _wrapData( opt ); 
		},
		//wrapDataMod: _wrapDataMod,
		updatePager: _updatePager
	};
}//end _draw()

/*
<div id="field-tracklist-url" class="uk-hidden uk-margin-small">\
<input type="text" name="input_tracklist_url" value="" placeholder="enter track list url" class="uk-input w80">\
<a href="?q=get-tracklist-url" class="btn btn-blue">load</a>\
<a data-toggle="#field-tracklist-url" href="?q=close" class="btn">x</a>\
</div>\
*/
function _fileManager( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"testPHP_url": "api/test.php",
		"supportPHP": false,
		//"testUrlASPX": "api/aspx/test.aspx",
		
		"alias" : "/music",
		//"aliasLocation" : "/home/www/music",
		"aliasLocation" : "/mnt/d2/music",
		//"aliasLocation" : "d:/temp/music",
		//"aliasLocation" : "./",
		"fsPath" : ""
	};//end _vars

	var _init = function( opt ){
//console.log("init _fileManager", opt);
		
		_vars["fsPath"] = _vars["aliasLocation"];
		_vars["urlPath"] = _vars["alias"];
//-----------------
//var parseUrl = window.location.search; 
//if( parseUrl.length > 0 ){
	//_vars["GET"] = func.parseGetParams(); 
//}

//-----------------
		if( !webApp.vars.support["promiseSupport"]){
			_vars["supportPHP"] = false;
			_noPHPSupport();
			if( typeof opt["postFunc"] === "function"){
				opt["postFunc"]();
			}
			return false;
		}
		
		_phpSupport().then(
			function( res ){
//console.log( "-- THEN, promise resolve" );
//console.log(res);
					_vars["fileListUrl"] = "api/filelist.php"
					//_vars["copy_url"] = "api/copy.php";
					_vars["renameUrl"] = "api/rename.php";
					_vars["removeUrl"] = "api/remove.php";
					//_vars["mkdir_url"] = "api/mkdir.php";
					_vars["saveTrackListUrl"] = "api/save_pls.php"
					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]();
					}
					return false;
			}, 
			function( error ){
//console.log( "-- THEN, promise reject, ", error );
				_noPHPSupport();
				if( typeof opt["postFunc"] === "function"){
					opt["postFunc"]();
				}
				return false;
			}
		);
	};//end _init()

	
	//check PHP support
	function _phpSupport( callback ){
		return new Promise( function(resolve, reject) {

			$.ajax({
				type: "GET",
				//dataType: "text",
				dataType: "json",
				url: _vars["testPHP_url"],
				success: function(data, status){
//console.log("-- status: " + status);
//console.log("-- data: ", data);

					if (data["testResult"] === 4 ){
						_vars["supportPHP"] = true;
						_vars.logMsg = status +", PHP script language supported by server, version " + data["version"];
						func.logAlert( _vars.logMsg, "success");
					} else {
						_noPHPSupport();
					}
					
					resolve();
				},
				
				error:function (XMLHttpRequest, textStatus, errorThrown) {
	//console.log( "XMLHttpRequest: ", XMLHttpRequest );
	//console.log( "textStatus: ", textStatus );
console.log( "-- errorThrown: ", errorThrown );
					_vars["supportPHP"] = false;
					reject();
				}
			});
		
		});//end promise
	}// end _phpSupport()

	function _noPHPSupport(){
		webApp.vars["use_file_manager"]	= false;
		_vars.logMsg = "PHP script language NOT supported by server.";
		func.logAlert( _vars.logMsg, "error");
	}//end
	
	
	
	
	function _getFileList(opt){
		
		var $d = $.Deferred();
//console.log( $d );

		var p = {
			"dirName" : false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( p.dirName.length === 0){
_vars["logMsg"] = "-- warning, root level ...";
console.log( _vars["logMsg"] );
console.log(p);
			p.dirName = "/";
		}

		if( !p.dirName){
_vars["logMsg"] = "-- error, incorrect input parameters....";
console.log( _vars["logMsg"] );
console.log(p);
			$d.reject( false );
		}
		
		$.ajax({
			type: "GET",
			dataType: "json",
			url: _vars["fileListUrl"],
			data: ({dir: p.dirName}),
			success: function(data, status){
//console.log("-- status: " + status);
//console.log("-- data: ", data);

				if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
					$d.reject( false );
				}
				
				if( data["eventType"] && data["eventType"] === "warning"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "warning");
					data["files"] =[{}];
				}

				if( data["subfolders"] || data["files"]){
					var html = __formHtml( data );
//console.log( html );
					$d.resolve( html );
				} else {
					$d.reject( false );
				}
				
			},
			
			error:function (XMLHttpRequest, textStatus, errorThrown) {
//console.log( "XMLHttpRequest: ", XMLHttpRequest );
console.log( "textStatus: " +  textStatus );
console.log( "-- errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");

				$d.reject( false );
			}
		});
		return $d;
		
		function __formHtml( data ){
			// var data = {
				// "subfolders" : [
	// {"name": "A","fs_path": "/mnt/d2/music/A"},
	// {"name": "E","fs_path": "/mnt/d2/music/E"}
				// ],
				// "files": [
	// {"name": "log.txt", "url": "/music/log.txt"}
				// ]
			// };

			var html_subfolders = "";
			if( data["subfolders"] ){
				html_subfolders =  webApp.draw.wrapData({
					"data": data["subfolders"],
					"templateID": "subfolders_listTpl",
					"templateListItemID": "subfolders_itemTpl"
				});
			}
//console.log( html_subfolders );

			var html_files = "";
			if( data["files"] ){
//----------------------- create url path
_vars["urlPath"] = _getUrlPath( _vars.fsPath );
for( var n = 0; n < data["files"].length; n++){
	var _file = data["files"][n];
	
	if( _vars["urlPath"] ){
		_file["url"] = _vars["urlPath"] + "/" + _file["name"];
	} else {
		_file["url"] = "#";
		_file["template"] = "files_itemTpl_block";
	}
	
}//next
//-----------------------

				html_files =  webApp.draw.wrapData({
					"data": data["files"],
					"templateID": "files_listTpl",
					"templateListItemID": "files_itemTpl"
				});
			}

			var html = webApp.draw.wrapData({
				"data": {
					"subfolders": html_subfolders,
					"files": html_files
				},
				"templateID": "fileList"
			});
			
//console.log( html );
			return html;
		}//end __formHtml()
		
	}//end _getFileList()
	
	
	function _formHtmlFileManager(opt){

		if( !webApp.vars.support["promiseSupport"]){
			_vars["logMsg"] = "error, window.Promise not supported...";
			func.logAlert( _vars["logMsg"], "error" );
			
			if( typeof opt["postFunc"] === "function"){
				opt["postFunc"]();
			}
			return false;
		}

		_getFileList({
			"dirName" : _vars["fsPath"]
		}).then(
			
			function( htmlFilelist ){
//console.log( "-- THEN, promise resolved", html );

				_dataObj = {
					"web_alias" : _vars["alias"],
					"location" : _vars["aliasLocation"],
					"buttons_fs_action" : webApp.draw.vars.templates["buttonsFSaction"],
					"btn_change_level" : webApp.draw.vars.templates["btnChangeLevel"],
					"fs_path" : _vars["fsPath"],
					"url_path" : _getUrlPath( _vars.fsPath ),
					"filelist" : htmlFilelist
				};
				//----------- hide change level button on FS root level
				if( _vars["fsPath"].length === 0){
					delete _dataObj["btn_change_level"];
					_dataObj["fs_path"] = "/";
				}
				
				var html = webApp.draw.wrapData({
					"data": _dataObj, 
					"templateID": "contentFileManager"
				});
//console.log( html );

				if( typeof opt["postFunc"] === "function"){
					opt["postFunc"]( html );
				}
			}, 
			
			function(res){
console.log( "-- THEN, promise rejected", res );

				//correct fs path after unread directory (/opt)
				var upLink = _vars["fsPath"].substring( 0, _vars["fsPath"].lastIndexOf("/") );
//console.log(_vars["fsPath"]);
//console.log( upLink );
				_vars["fsPath"] = upLink;

					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]( res );
					}
			}
			
		);//end then

	}//_formHtmlFileManager()

	
	
	function _urlManager( url ){
//console.log(url);
		_vars["GET"] = func.parseGetParams( url );
		switch( _vars["GET"]["q"] ) {
			
//--------------------------------------------
			case "get-folder":
				_vars["fsPath"] = _vars["fsPath"] + "/" +_vars["GET"]["foldername"];
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						}
					}
				});
			break;
			
//--------------------------------------------
			case "level-up":
				var upLink = _vars["fsPath"].substring( 0, _vars["fsPath"].lastIndexOf("/") );
//console.log(_vars["fsPath"]);
//console.log( upLink );

				_vars["fsPath"] = upLink;
				
				//change url path
				_vars["urlPath"] = _getUrlPath( _vars.fsPath );
				
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						}
					}
				});
			break;
			
//--------------------------------------------
			case "define-location":
				var fsLocation = $("#input-location-path").val();
//console.log( fsLocation);
				if( !fsLocation || fsLocation.length === 0){
					return false;
				}
				var webAlias = $("#input-web-alias").val();

				//save old values
				_alias = _vars["alias"];
				_alias_loc = _vars["aliasLocation"];
				_fs_path = _vars["fsPath"];
				
				//get new values
				_vars["aliasLocation"] = fsLocation.trim();
				_vars["fsPath"] = _vars["aliasLocation"];
				_vars["alias"] = webAlias.trim();
				
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						} else {
							//restore old values if access to the folder fails
							_vars["alias"] = _alias;
							_vars["aliasLocation"] = _alias_loc;
							_vars["fsPath"] = _fs_path;
						}
						
					}
				});
				
			break;
			
//--------------------------------------------
			case "check-all":
				$("#block-file-manager").find(".wfm input[type=checkbox]").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", true);
				});				
			break;
			
			case "clear-all":
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", false);
				});				
			break;
			
//--------------------------------------------
			case "delete-file":
				var checkedFiles = [];
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					checkedFiles.push( $(item).val() );
				});

				if( !webApp.vars.support["promiseSupport"]){
					_vars["logMsg"] = "error, window.Promise not supported...";
					func.logAlert( _vars["logMsg"], "error" );
					return false;
				}
				
				_deleteFile({
					"fsPath": _vars["fsPath"],
					"files": checkedFiles
				})
				.then(
					function( data ){
//console.log( "-- THEN, promise resolve" );
//console.log(data);
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);

			break;
			
//-------------------------------------------- rename, move FIRST selected file
			case "rename-file":
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					if( !webApp.vars.support["promiseSupport"]){
						_vars["logMsg"] = "error, window.Promise not supported...";
						func.logAlert( _vars["logMsg"], "error" );
						return false;
					}
					
					if( num === 0){
						var _oldName = _vars["fsPath"] + "/"+ $(item).val();

						_renameFile({
							"fsPath": _vars["fsPath"],
							"oldName": _oldName,
							"newName": _inputNewFileName( _oldName )
						})
						.then(
							function( data ){
		console.log( "-- THEN, promise resolve" );
		//console.log(data);
							},
							function( error ){
		console.log( "-- THEN, promise reject, ", error );
		//console.log(arguments);					
							}
						);
						
					} else {
						$(item).prop("checked", false);
					}
				});
			
			break;
			
//--------------------------------------------
			case "add-track":
				var checkedFiles = [];
				//$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
				$("#block-file-manager").find(".files-list :checkbox:checked").each( function(num, item){
//console.log(num, item);
					var _fileName = $(item).val();
					if( _vars["urlPath"] ){
						
						if( _checkMediaType(_fileName) ){
							var _fileObj = {
								"artist" : _getLastDirName( _vars["urlPath"] ),
								"title" : _fileName,
								"source_url" : _vars["urlPath"] + "/"+ _fileName
							}
							checkedFiles.push( _fileObj );
							
						} else {
_vars["logMsg"] = "- warning, could not add file "+ _fileName +" to tracklist, incorrect media type...."
//func.logAlert( _vars["logMsg"], "warning" );
console.log( _vars["logMsg"] );
							
						}
						
					} else {
_vars["logMsg"] = "- warning, could not add file "+ _fileName +" to tracklist, incorrect web-alias...."
//func.logAlert( _vars["logMsg"], "warning" );
console.log( _vars["logMsg"] );
					}
				});//next
				
				//clear checked checkboxes
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", false);
				});				
				
				if( checkedFiles.length > 0){
					_addTrackToTrackList({
						"fileList" : checkedFiles
					});
				} else {
_vars["logMsg"] = "- warning, could not add selected files  to tracklist...."
func.logAlert( _vars["logMsg"], "warning" );
				}
				
			break;
			
//--------------------------------------------
			default:
console.log("-- fileManager.urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch

	}//end _urlManager()
	

	//change url path
	function _getUrlPath( fsPath ){
		var startPos = fsPath.indexOf( _vars.alias );
		if( startPos !== -1){
			var urlPath = fsPath.substring( startPos, fsPath.length );
//console.log(urlPath);
			return urlPath;
		} else {
			return false;
		}
	}//end


	function _inputNewFileName( oldName ){
		var _newFileName = window.prompt("rename/move file, enter new path/name:", oldName );
		// if( _newFileName && _newFileName.length > 0 ){
		// }
		return _newFileName;
	}//end _inputNewFileName()

//==================== delete file(s), directory(ies)
	function _deleteFile(opt){
		var p = {
			"fsPath": false,
			"files": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["fsPath"] || p["fsPath"].length === 0){
_vars["logMsg"] = "error, incorrect parameter fsPath...";
console.log( _vars.logMsg);
			return false;
		}
		
		if( !p["files"] || p["files"].length === 0){
_vars["logMsg"] = "error, wrong parameter files...";
console.log( _vars.logMsg);
			return false;
		}
		
		var _param = {
			fs_path: p["fsPath"], 
			file: p["files"]
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["removeUrl"],
				dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
//console.log( data );

					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}

					if( data["eventType"] && data["eventType"] === "success"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "success");
						_formHtmlFileManager({
							"postFunc" : function(html){
		//console.log( html );
								if( html && html.length > 0){
									webApp.vars["blocksByName"]["blockFM"].content = html;
									webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
								}
							}
						});

						resolve(data);
					}
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");
					reject( false);
				}
			});//end ajax query

		});//end promise
		
//console.log( _df );
		return _df;

	}//end _deleteFile()


//=============================== rename files
	function _renameFile(opt){
		var p = {
			"oldName": false, 
			"newName": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);

		if( !p["oldName"] || p["oldName"].length === 0){
_vars["logMsg"] = "error, incorrect parameter oldName...";
console.log( _vars.logMsg);
			return false;
		}
		
		if( !p["newName"] || p["newName"].length === 0){
_vars["logMsg"] = "error, wrong parameter newName...";
console.log( _vars.logMsg);
			return false;
		}
		
		var _param = {
			"old_name": p.oldName, 
			"new_name": p.newName
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["renameUrl"],
				dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
console.log( data );

					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}

					if( data["eventType"] && data["eventType"] === "success"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "success");
						_formHtmlFileManager({
							"postFunc" : function(html){
		//console.log( html );
								if( html && html.length > 0){
									webApp.vars["blocksByName"]["blockFM"].content = html;
									webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
								}
							}
						});

						resolve(data);
					}
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");
					reject( false);
				}
			});//end ajax query

		});//end promise
		
//console.log( _df );
		return _df;

	}//end _renameFile()


//=============================== add track to playlist
	function _addTrackToTrackList( opt ){
		var p = {
			"fileList": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["fileList"] || p["fileList"].length === 0){
_vars["logMsg"] = "error, incorrect parameter fileList...";
console.log( _vars.logMsg);
			return false;
		}

		var _trackFormat = webApp.player.vars["trackFormat"];
		var _trackList = [];
		
		for( var n = 0; n < p.fileList.length; n++){
			
			var _trackObj = {};
			for( var key in _trackFormat ){
				_trackObj[key] = "";
			}//next
//console.log( _trackObj );
			
			//write key:value to _fileObj ( only matching  keys by "trackFormat" )
			var _fileObj = p.fileList[n];
			for( var key in _trackObj ){
				_trackObj[key] = _fileObj[key];
			}//next
//console.log( _fileObj );
			
			_trackList.push( _trackObj );
		}//next
		
//console.log( _trackList );
		webApp.player.formTrackList( _trackList );
		
	}//end _addTrackToTrackList()
	

	function _checkMediaType(_fileName){
		var checkRes = false;

		for( var _type in webApp.player.vars["mediaTypes"] ){
			var testType = webApp.player.vars["mediaTypes"][_type]["extension"];
			
			var testFileName = _fileName.toLowerCase();
			if( testFileName.lastIndexOf( testType) > 0 ){
				var checkRes = true;
				return checkRes;
			}
			
		}//next
		
		return checkRes;
	}//end _checkMediaType()

	function _getLastDirName( fsPath ){
		
		// var pos1 = fsPath.lastIndexOf("/")+1;
		// var pos2 = fsPath.length;
		// var _dirName = fsPath.substring( pos1, pos2 );
		
		// var _fsPath2 = fsPath.substring( 0, pos1-1 );
		// var pos1 = _fsPath2.lastIndexOf("/")+1;
		// var pos2 = _fsPath2.length;
		// var _prevDirName = _fsPath2.substring( pos1, pos2 );
		
		var _fsPath = fsPath.split("/");
		
		var num = _fsPath.length - 1;
		if( _fsPath[ num ].indexOf(".") !== -1){//exclude filename.type
			num = _fsPath.length-2;
		}
		var _dirName = _fsPath[ num ];

		return _dirName;
	}//end _getLastDirName()


	function _getFileType( fsPath ){
		var _fsPath = fsPath.split("/");
		
		var n1 = _fsPath.length-1;
		
		var _fileName = _fsPath[ n1 ];
		var _file = _fileName.split(".");
//console.log(_file);
		var _lastNum = _file.length -1;
		var _fileType = _file[ _lastNum ];
		
		return _fileType;
	}//end _getFileType()
	
	function _getFileName( fsPath, addType ){
		var _fsPath = fsPath.split("/");
		
		var n1 = _fsPath.length-1;
		
		var _fileName = _fsPath[ n1 ];
		
		if( addType){
			return _fileName;
		}
		
		var _file = _fileName.split(".");
		var _name = _file[0];
		//var _fileType = _file[1];
		
		return _name;
	}//end _getFileName()


	// public interfaces
	return{
		vars : _vars,
		init:	function(opt){ 
//console.log(arguments);
			return _init(opt); 
		},
		getFileList: _getFileList,
		formHtmlFileManager: _formHtmlFileManager,
		urlManager:	_urlManager,
		getUrlPath: _getUrlPath,
		getFileType: _getFileType,
		getFileName: _getFileName,
		getLastDirName: _getLastDirName
	};
	
}//end _fileManager()
function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"trackListName": "new_tracklist.json*",
		"trackListTitle": "",
		"trackList":  [
// {"title" : "Hit The Lights", "source_url" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"source_url" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
		"trackFormat":  {
			"title" : "Hit The Lights",
			"artist" : "Metallica",
			"source_url": "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"
		},
		
		"numTrack": 0,
		//"autoplay" : true//,
		//"unSavedTrackList": false
		"GET" : {},
		
		"mediaTypes" : [
{"extension" : "wav", "testString" : 'audio/wav; codecs=1', support: false },
{ "extension" : "ogg", "testString" : 'audio/ogg; codecs="vorbis"', support: false},
//{ "extension" : "au", "testString" : 'audio/basic', support: false},
//{"extension" : "wav", "testString" : 'audio/L24', support: false, name: "24bit Linear PCM format, at 8-48 kHz, 1-N channels"},
//{ "extension" : "webm", "testString" : 'audio/webm', support: false, name: "WebM open media format."},
{ "extension" : "mp2,mpga,mpega", "testString" : 'audio/x-mpeg', support: false, name: "MPEG audio"},
{ "extension" : "mp3", "testString" : 'audio/mpeg; codecs="mp3"', support: false },
{ "extension" : "mp4,mpg4", "testString" : 'audio/mp4; codecs="mp4a.40.5"', support: false, name: "MPEG-4 audio"},
{ "extension" : "m4a", "testString" : 'audio/x-m4a', support: false, name: "MPEG-4 audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wma', support: false, name: "Windows Media Audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wax', support: false, name: "Windows Media Audio"},
{ "extension" : "3gp", "testString" : 'audio/3gpp', support: false},
{ "extension" : "flac", "testString" : 'audio/flac', support: false, name: "native FLAC format (FLAC in its own container)."},
{ "extension" : "ape", "testString" : 'audio/ape', support: false},
{ "extension" : "mka", "testString" : 'audio/x-matroska', support: false, name: "Matroska audio"},

{ "extension" : "ogg", "testString" : 'video/ogg; codecs="theora, vorbis"', support: false},
{"extension" : "ogv", "testString" : 'video/ogg', support: false },
{"extension" : "mp4", "testString" : 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"', support: false , name: "MPEG-4 video"},
{"extension" : "m4v", "testString" : 'video/x-m4v', support: false },
{"extension" : "webm", "testString" : 'video/webm; codecs="vp8.0, vorbis"', support: false },
{"extension" : "mpg", "testString" : 'video/mpeg', support: false, name: "MPEG-1" },
{"extension" : "mpg,mpeg,mpe", "testString" : 'video/x-mpeg', support: false, name: "MPEG video" },
{"extension" : "mov", "testString" : 'video/quicktime', support: false },
{"extension" : "wmv", "testString" : 'video/x-ms-wmv', support: false, name: "Windows Media Video" },
{"extension" : "3gp", "testString" : 'video/3gpp', support: false},
{"extension" : "flv", "testString" : 'video/x-flv', support: false},
{"extension" : "mkv", "testString" : 'video/x-matroska', support: false, name: "Matroska video"},
{"extension" : "vob", "testString" : 'video/x-ms-vob', support: false},
{"extension" : "avi", "testString" : 'video/vnd.avi', support: false},
{"extension" : "avi", "testString" : 'video/avi', support: false},
{"extension" : "avi", "testString" : 'video/msvideo', support: false},
{"extension" : "avi", "testString" : 'video/x-msvideo', support: false}
		],
		"playVideo": false,
		"playAudio": false
	};//end _vars

	var _init = function( opt ){
		
		_vars["trackListTitle"] =  _vars["trackListName"];
		
		//_vars.$mediaplayer = $("#audio-player")[0];
		_vars.$audioplayer = func.getById("audio-player");
		_vars.$videoplayer = func.getById("video-player");
		
		_vars.$audioplayer.volume = 0.4;
		_vars.$videoplayer.volume = 0.4;
		
//--------------------------
		$(_vars.$audioplayer).on("ended", function(e){
console.log(e);
			_nextTrack();
		});//end event
		
		$(_vars.$videoplayer).on("ended", function(e){
console.log(e);
			_nextTrack();
		});//end event
		
//--------------------------
		$(_vars.$audioplayer).on("error",  function(e){
//console.log(e);
console.log( _vars.$audioplayer.error);
			var err = _vars.$audioplayer.error;
if(err){
			//for( var key in err){
				//webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ err[key];
				//func.logAlert( webApp.vars["logMsg"], "error");
			//}//next
webApp.vars["logMsg"] = "MediaError, <b>code:</b> : "+ err["code"];
webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars.$audioplayer.src;
func.logAlert( webApp.vars["logMsg"], "error");
}
		});//end event
	
//--------------------------
		$(_vars.$videoplayer).on("error",  function(e){
//console.log(e);
console.log( _vars.$videoplayer.error);
			var err = _vars.$videoplayer.error;
if(err){
webApp.vars["logMsg"] = "<b>code:</b> : "+ err["code"];
webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars.$videoplayer.src;
func.logAlert( webApp.vars["logMsg"], "error");
}
		});//end event

//--------------------------
		_vars.$mediaplayer = _vars.$audioplayer;
	
	};//end _init()


	function _urlManager( url ){
//console.log(url);
		_vars["GET"] = func.parseGetParams( url );
		switch( _vars["GET"]["q"] ) {

			case "get-tracklist-url":
				if( _vars["GET"]["action"] === "load-tracklist" ){
					var _defaultValue = webApp.fileManager.vars["alias"] + "/0_playlists/" +_vars["trackListName"].replace("*","");
					var _trackListPath = window.prompt("Load track list, enter url:", _defaultValue);
//console.log( _trackListPath );
					if( _trackListPath && _trackListPath.length > 0 ){
						var _url = "?q=load-tracklist&url="+_trackListPath;
						_urlManager( _url );
					}
				}
				
				if( _vars["GET"]["action"] === "save-tracklist" ){
					if( _vars["trackList"].length > 0){
						var _defaultValue = webApp.fileManager.vars["aliasLocation"] + "/0_playlists/" +_vars["trackListName"].replace("*","");
						var _trackListPath = window.prompt("Save track list, enter file system path:", _defaultValue );
						if( _trackListPath && _trackListPath.length > 0 ){
						var _url = "?q=save-tracklist&fs_path="+_trackListPath;
							_urlManager( _url );
						}
					} else {
webApp.vars["logMsg"] = "warning, empty media track list ...";
func.logAlert(webApp.vars["logMsg"], "warning");
					}
				}
			break;
			
			case "load-tracklist":
				//var _nid = webApp.vars["GET"]["nid"];
				
				if( !_vars["GET"]["url"] || 
						_vars["GET"]["url"].length === 0){
_vars["logMsg"] = "error, not found tracklist url...";
func.logAlert( _vars.logMsg, "error");
					return false;
				}
				
				if( !webApp.vars.support["promiseSupport"]){
					_vars["logMsg"] = "error, window.Promise not supported...";
					func.logAlert( _vars["logMsg"], "error" );
					return false;
				}
				
				_loadTrackList({
					"trackListUrl": _vars["GET"]["url"]
				})
				.then(
					function( data ){
//console.log( "-- THEN, promise resolve" );
//console.log(data);
						_formTrackList(data);
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);
			break;


			case "save-tracklist":
				
				if( !_vars["GET"]["fs_path"] || 
						_vars["GET"]["fs_path"].length === 0){
_vars["logMsg"] = "error, not found tracklist fs_path...";
func.logAlert( _vars.logMsg, "error");
					return false;
				}
				
				if( !webApp.vars.support["promiseSupport"]){
_vars["logMsg"] = "error, window.Promise not supported...";
func.logAlert( _vars["logMsg"], "error" );
					return false;
				}
				
				_saveTrackList({
					"trackListFsPath": _vars["GET"]["fs_path"]
				})
				.then(
					function( data ){
console.log( "-- THEN, promise resolve" );
//console.log(data);
						_vars["unSavedTrackList"] = false;
						_vars["trackListTitle"] = 	webApp.fileManager.getUrlPath( _vars["GET"]["fs_path"] );
						webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);
			break;

			case "clear-tracklist":
				_vars["numTrack"] = 0;
				_vars["trackList"] = [];
				_vars["trackListTitle"] = _vars["trackListName"];
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
			break;

			case "load-track":
				_loadTrackToPlayer({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "prev-track":
				_prevTrack();
			break;
			
			case "next-track":
				_nextTrack();
			break;
			
			case "remove-track":
				_removeTrack({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "edit-track":
				_editTrack({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "insert-track":
//console.log(url);
				_insertTrack({
					"title": _vars["GET"]["input_title"],
					"artist": _vars["GET"]["input_artist"],
					"source_url": _vars["GET"]["input_source_url"]
				});
			break;
			
			case "update-track":
//console.log(url);
				_updateTrack({
					"number": _vars["GET"]["number"],
					"title": _vars["GET"]["input_title"],
					"artist": _vars["GET"]["input_artist"],
					"source_url": _vars["GET"]["input_source_url"]
				});
			break;
			
//--------------------------------------------
			default:
console.log("-- player.urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()
	

	function _loadTrackList(opt){
		var p = {
			//"trackListTitle": false,
			"trackListUrl": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
//for test
//db\Manowar.json
//db\metallica.json
//db\Korpiklaani.json
//p.url = "db/metallica.json";

		var url = p["trackListUrl"];
		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);
			if(!url){
				reject( "-- error, empty url....", url );
				return _df;
			}
			
			$.getJSON( url, function(){
//console.log("getJSON, default...");
				})
				//.abort(function(){
	//console.log("getJSON, Abort...", arguments);
				//})
				//.success(function( data, textStatus, jqXHR ){
	//console.log("getJSON, Success...", arguments);
				//})
				//.complete(function(){
	//console.log("getJSON, Complete...", arguments);
				//})
				
				.done(function( data, textStatus, jqXHR ){
	//console.log("getJSON, Done...", arguments);
	webApp.vars["logMsg"] = "server query done";
	webApp.vars["logMsg"] += ",  "+textStatus +" load track list file <b>"+ url +"</b>";
	func.logAlert( webApp.vars["logMsg"], "success");
	//console.log(data);
					_vars["trackListTitle"] = url;
					resolve( data );
				})
				
				.fail(function( xhr, status, error ){
	webApp.vars["logMsg"] = "error, getJSON fail";
	webApp.vars["logMsg"] += ",  " + error +", "+ url;
	func.logAlert( webApp.vars["logMsg"], "error");
	console.log(xhr);
					reject( status );
				})
				// .error(function(){
	// console.log("getJSON, Error...", arguments);
				// })
				
				//.always(function( data, textStatus, jqXHR ){
	//console.log("getJSON, Always...", textStatus);
	//console.log(" jqXHR: ",  jqXHR);
	//console.log(" status: ",  jqXHR.status);
	//console.log(" statusText: ",  jqXHR.statusText);
				//});

		});//end promise
		
//console.log( _df );
		return _df;
		
	}//end _loadTrackList()
	
	
	
	function _formHtmlTrackList(){
		if( _vars["trackList"].length > 0 ){
			var html = webApp.draw.wrapData({
				"data": _vars["trackList"], 
				"templateID": "trackList",
				"templateListItemID": "trackListItem"
			});
		} else {
			var html = webApp.draw.vars.templates["trackList"].replace("{{list}}", "");
		}
//console.log( html );

//---------------------------- mark unsaved tracklist name
		if( _vars["unSavedTrackList"] ){
			if( _vars["trackListTitle"].indexOf("*") === -1){
				_vars["trackListTitle"] =  _vars["trackListTitle"] + "*";
			}
		} else {
			_vars["trackListTitle"] =  _vars["trackListTitle"].replace("*", "");
		}

		html = html.replace("{{tracklist_title}}", _vars["trackListTitle"]);
		return html;
	}//_formHtmlTrackList()

	
	function _formTrackList(tracks){
		
		for( var n = 0; n < tracks.length; n++){
			tracks[n]["number"] = n+1;// add track order number 
			
			//convert media URL: "mp3" to "source_url"
			if( "mp3" in tracks[n]){
				tracks[n]["source_url"] = tracks[n]["mp3"];
				delete tracks[n]["mp3"];
			}
			
			//filter "source_url", replace %20 to space
			tracks[n]["source_url"] = tracks[n]["source_url"].replace(/%20/g, " ");
			
		}//next
		
		if( _vars["trackList"].length > 0){
			_vars["trackList"] = _vars["trackList"].concat( tracks);
			_vars["trackList"].forEach( function(item, n, arr) {//reorder tracklist
				item["number"] = n+1;
			});
		} else {
			_vars["numTrack"] = 0;
			_vars["trackList"] = tracks;
		}
		
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( !$("#block-player").is(":visible") ){
			$("#block-player").show();
		}

		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
	}//end _formTrackList()
	

	function _saveTrackList(opt){
		var p = {
			"trackListFsPath": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

//------------------------ filter track list
		var _trackFormat = _vars["trackFormat"];
		var _trackList = [];
		for( var n = 0; n < _vars["trackList"].length; n++){
			var _trackObj = {};
			for( var key in _trackFormat ){
				_trackObj[key] = "";
			}//next
//console.log( _trackObj );

			//write key:value to _track ( only matching  keys by "trackFormat" )
			var _track = _vars["trackList"][n];
			for( var key in _trackObj ){
				_trackObj[key] = _track[key];
			}//next
//console.log( _track );
			_trackList.push( _trackObj );
		}//next
console.log( _trackList );

//------------------------
		var _param = {
			"filename": p["trackListFsPath"], 
			//"filename": "", //test
			"playlist": _trackList
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["saveTrackListUrl"],
				dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
console.log( data );
					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}

					if( data["eventType"] && data["eventType"] === "success"){
webApp.vars["logMsg"] = "server query done";
webApp.vars["logMsg"] += ",  "+textStatus +" save track list file <b>"+ p["trackListFsPath"] +"</b>";
func.logAlert( webApp.vars["logMsg"], "success");
						resolve(data);
					}/* else {
_vars["logMsg"] = "unknown server request error....";
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}*/
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");
					reject( false);
				}
			});//end ajax query

		});//end promise
		
//console.log( _df );
		return _df;

	}//end _saveTrackList()


	
	function _loadTrackToPlayer( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		var numTrack = p.trackNum-1;
		_vars["numTrack"] = numTrack;
		
//console.log( numTrack, _vars["trackList"][numTrack], trackUrl );
		if( _vars["trackList"][numTrack] ){
			var track = _vars["trackList"][numTrack];

			if( track["mp3"] ){
				var trackUrl = track["mp3"];
			}
			if( track["source_url"] ){
				var trackUrl = track["source_url"];
			}
			
		} else {
			webApp.vars["logMsg"] = "not found track by num: "+ numTrack;
console.log( "-- " + webApp.vars["logMsg"] );
			return false;
		}
		
		//$(_vars.$mediaplayer).attr("src", trackUrl );
		_vars.$mediaplayer.setAttribute("src", trackUrl );
		//document.querySelector("#block-player audio").setAttribute("src", trackUrl );

		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
	}//end _loadTrackToPlayer()
	
	

	function _nextTrack(){
//console.log( _vars["numTrack"], _vars["trackList"].length);
		if( _vars["numTrack"] < ( _vars["trackList"].length - 1) ){
			_vars["numTrack"]++;
			_setActiveTrack({
				num : _vars["numTrack"]
			});
			
		}
	}//end _nextTrack()
	
	
	function _prevTrack(){
		if( _vars["numTrack"] > 0){
			_vars["numTrack"]--;
			_setActiveTrack({
				num : _vars["numTrack"]
			});
		}
	}//end _prevTrack()
	

	function _setActiveTrack( opt ){
		var  p = {
			num : null, 
			autoplay: true
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
		var activeNum = parseInt( p.num );
//console.log(num, typeof num, isNaN(num) );
		if( isNaN( activeNum ) ){
webApp.vars["logMsg"] = "wrong activeNum: "+ activeNum;
console.log( "-- error, " + webApp.vars["logMsg"] );
			return false;
		}

		
		//load and play track by num
		var track = _vars["trackList"][ activeNum ];
		
		if( !track ){
console.log( "-- error, no track by activeNum = " + activeNum);
			return false;
		}
		
		//form track text title
		var track_info = "";
		if( track["artist"] && track["artist"].length > 0){
			track_info += track["artist"];
		}
		if( track["title"] && track["title"].length > 0){
			if( track_info.length > 0){
				track_info += ", ";
			}
			track_info += track["title"];
		}
		if( track_info.length === 0){
			
			if( track["mp3"] ){
				track_info = track["mp3"];
			}
			if( track["source_url"] ){
				track_info = track["source_url"];
			}
			
		}
		$("#track-info").text( track_info );
		

		if( track["mp3"] ){
			var mediaSrc = track["mp3"];
		}
		if( track["source_url"] ){
			var mediaSrc = track["source_url"];
		}
//console.log(mediaSrc );

		_vars.$audioplayer.pause();
		_vars.$videoplayer.pause();
		
		if( p.autoplay ){
			var _canPlay = _setMediaPlayer( mediaSrc );
			if( _canPlay){
				
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/encodeuri
//1.Yankee_doodle 99%.mp3;
				var encoded = encodeURI (mediaSrc);
				//encoded = encoded.replace(/%2520/g, "%20");
				//var encoded = encodeURIComponent(mediaSrc);
console.log(encoded);

				$(_vars.$mediaplayer).attr("src", encoded);
				
				//$(_vars.$mediaplayer).attr("src", mediaSrc);
				_vars.$mediaplayer.play();
			} else {
_vars["logMsg"] = "Cannot play media file "+ mediaSrc;
func.logAlert( _vars["logMsg"], "error" );
			}
		}

		//set active style
		var activeItem = false;
		$("#track-list a.track-name").each(function(num, value){
//console.log(num)
			$(this).removeClass("active");
//console.log(num, activeNum, typeof activeNum, num === activeNum);
			if( num === activeNum){
				activeItem = value;//this...
			}
		});//end each
		
		if( activeItem ){
			$(activeItem).addClass("active");
		}
		
	}//end _setActiveTrack()
	

	function _removeTrack( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		//$(_vars.$mediaplayer).attr("src", "");
		//_vars.$mediaplayer.pause();
		
		var numTrack = p.trackNum-1;
//console.log( numTrack, _vars["trackList"][numTrack] );
		
		//remove track
		delete _vars["trackList"][numTrack];
//console.log( _vars["trackList"] );
		
		//squeeze tracklist
		var arr = _vars.trackList.filter(function(obj) {
		  return typeof obj !== "undefined";
		});
		
		//reorder tracklist
		arr.forEach( function(item, n, arr) {
			item["number"] = n+1;
		});
//console.log( arr );

		_vars["unSavedTrackList"] = true;
		
//----------------------------
		_vars["trackList"] = arr;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		_setActiveTrack({
			num : _vars["numTrack"], 
			autoplay: false 
		});

	}//end _removeTrack()


	function _editTrack( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		var numTrack = p.trackNum-1;
		//_vars["numTrack"] = numTrack;
		
console.log( numTrack, _vars["trackList"][numTrack] );

		//$("#insert-track-form").attr("action", "?q=update-track");//change form action
		
		document.forms["form_insert_track"].elements["input_title"].value = _vars["trackList"][numTrack]["title"];
		document.forms["form_insert_track"].elements["input_artist"].value = _vars["trackList"][numTrack]["artist"];
		
		if( _vars["trackList"][numTrack]["mp3"] && _vars["trackList"][numTrack]["mp3"].length > 0){
			document.forms["form_insert_track"].elements["input_source_url"].value = _vars["trackList"][numTrack]["mp3"];
		}
		if( _vars["trackList"][numTrack]["source_url"] && _vars["trackList"][numTrack]["source_url"].length > 0){
			document.forms["form_insert_track"].elements["input_source_url"].value = _vars["trackList"][numTrack]["source_url"];
		}
		document.forms["form_insert_track"].elements["number"].value = _vars["trackList"][numTrack]["number"];
		
		webApp.app.toggleBlock( "#modal-insert-track" );
		
	}//end _editTrack()


	function _insertTrack( opt ){
		var p = {
			"title": false,
			"artist": false,
			"source_url": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
		//--------------------------------
		if( !p["title"]){
			p["title"] = webApp.fileManager.getFileName( p["source_url"], true );
		}
		if( !p["artist"]){
			p["artist"] = webApp.fileManager.getLastDirName( p["source_url"] );
		}
//console.log(p);

		var _trackFormat = _vars["trackFormat"];
		var _trackObj = {};
		for( var key in _trackFormat ){
			_trackObj[key] = "";
		}//next
		
		//write key:value to _track ( only matching  keys by "trackFormat" )
		var _track = p;
		for( var key in _trackObj ){
			_trackObj[key] = _track[key];
		}//next
//console.log( _track );
	
		_vars["trackList"].push( _trackObj );
		
		//----------------- add track order number 
		for( var n = 0; n < _vars["trackList"].length; n++){
			_vars["trackList"][n]["number"] = n+1;
		}//next
		
		_vars["unSavedTrackList"] = true;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( !$("#block-player").is(":visible") ){
			$("#block-player").show();
		}

		_vars["numTrack"] = _vars["trackList"].length-1;
		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
		webApp.app.toggleBlock( "#modal-insert-track" );
	}//end _insertTrack()


	function _updateTrack( opt ){
		var p = {
			"number": false,
			"title": false,
			"artist": false,
			"source_url": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
		//--------------------------------
		if( !p["title"]){
			p["title"] = webApp.fileManager.getFileName( p["source_url"], true );
		}
		if( !p["artist"]){
			p["artist"] = webApp.fileManager.getLastDirName( p["source_url"] );
		}
//console.log(p);

		var _trackFormat = _vars["trackFormat"];
		var _trackObj = {};
		for( var key in _trackFormat ){
			_trackObj[key] = "";
		}//next
		
		//write key:value to _track ( only matching  keys by "trackFormat" )
		var _track = p;
		for( var key in _trackObj ){
			_trackObj[key] = _track[key];
		}//next
//console.log( _track );

		var _num = _track.number - 1;
		_vars["trackList"][ _num ] = _trackObj;
		
		//----------------- update track order number 
		for( var n = 0; n < _vars["trackList"].length; n++){
			_vars["trackList"][n]["number"] = n+1;
		}//next
		
		_vars["unSavedTrackList"] = true;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
// 		if( !$("#block-player").is(":visible") ){
// 			$("#block-player").show();
// 		}
// 
// 		_setActiveTrack({
// 			num : _vars["numTrack"]
// 		});
		
		//$("#insert-track-form").attr("action", "?q=insert-track");//restore form action
		webApp.app.toggleBlock( "#modal-insert-track" );
	}//end _updateTrack()



	function _testMediaSupport(){

		var _videoObj = document.createElement("video");
	//for(var key in _video){
		//if( typeof _video[key] === "function"){
	//console.log(key, _video[key]);
		//}
	//}
		if( typeof _videoObj === "object"){
			if( typeof _videoObj["load"] !== "function"){
	_vars["logMsg"] = "creating a object VIDEO failed.";
	func.logAlert(_vars["logMsg"], "error");
			} else {
				_vars["playVideo"] = true;
			}
		}
		
		var _audioObj = document.createElement("audio");
		if( typeof _audioObj === "object"){
			if( typeof _audioObj["load"] !== "function"){
	_vars["logMsg"] = "creating a object AUDIO failed.";
	func.logAlert(_vars["logMsg"], "error");
			} else {
				_vars["playAudio"] = true;
			}
		}
		
		if( _vars["playAudio"] ){
			__testTypeSupport( _audioObj );
		}
		
		if( _vars["playVideo"] ){
			__testTypeSupport( _videoObj );
		}
		
		function __testTypeSupport( mediaObj ){
//console.log( mediaObj );

			for(var n = 0; n < _vars["mediaTypes"].length; n++ ){
				
				var _testString = _vars["mediaTypes"][n]["testString"];
				var _ext = _vars["mediaTypes"][n]["extension"];
				var _name = "";
				if( _vars["mediaTypes"][n]["name"] ){
					_name = "(" + _vars["mediaTypes"][n]["name"] + ")";
				}
				
				var _mediaTypeString = mediaObj.tagName.toLowerCase(); // video or audio
				if( _testString.indexOf( _mediaTypeString ) !== -1){
					
					var _test = mediaObj.canPlayType( _testString );
//console.log( "test " + _mediaTypeString + " format: ", _test, _test.length, _testString);
					if( _test && _test.length > 0){
	_vars["logMsg"] = "test support media format <b>"+ _ext +", "+_name+"</b>, <i>"+ _testString +"</i>: " + _test;
	func.logAlert( _vars["logMsg"], "success");
						_vars["mediaTypes"][n]["support"] = true;
						//break;
					} else {
	_vars["logMsg"] = "not support media format <b>"+ _ext +", "+_name+"</b>, <i>" + _testString +"</i>";
	func.logAlert( _vars["logMsg"], "warning");
					}
					
				}
	
			}//next
		}//end __testTypeSupport()
		
	}//end testMediaSupport()


	function _setMediaPlayer( filePath ){
		var _canPlay = false;

		var _fileType = webApp.fileManager.getFileType( filePath );
//console.log( _fileType );
		for( var n =0; n < _vars["mediaTypes"].length; n++){
			var _testString = _vars["mediaTypes"][n]["testString"];
			var _ext = _vars["mediaTypes"][n]["extension"];
			var _support = _vars["mediaTypes"][n]["support"];
			
			if( _fileType === _ext ){
				if( _support ){
					_canPlay = true;
//------------------------- choose media player: audio, video, or iframe-video
					if( _testString.indexOf("video") !== -1){
						_vars.$mediaplayer = _vars.$videoplayer;
					}
					if( _testString.indexOf("audio") !== -1){
						_vars.$mediaplayer = _vars.$audioplayer;
					}

					break;
				}
			}
			
		}//next

		return _canPlay;
	}//end _setMediaPlayer()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		
		formHtmlTrackList : _formHtmlTrackList,
		//loadTrackList: _loadTrackList,
		formTrackList: _formTrackList,
		//loadTrackToPlayer: _loadTrackToPlayer,
		//setActiveTrack: _setActiveTrack,
		//nextTrack: _nextTrack,
		//prevTrack: _prevTrack,
		//removeTrack: _removeTrack,
		//editTrack: _editTrack,
		urlManager:	_urlManager,
		testMediaSupport: _testMediaSupport
	};
}//end _player()