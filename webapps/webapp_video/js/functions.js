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

		
		function _timeStampToDateStr( timestamp ){

			var sYear = timestamp.getFullYear();

			
			var sMonth = timestamp.getMonth() + 1;
	//console.log( sMonth, typeof sMonth );
			if( sMonth < 10){
				sMonth = "0" + sMonth;
			}
			sMonth = "" + sMonth;
			
	//"15-Sep-2018 22:13:00";
			switch(sMonth){
				
				case "01":
					sMonth = "Jan"
				break;
				
				case "02":
					sMonth = "Feb"
				break;
				
				case "03":
					sMonth = "Mar"
				break;
				
				case "04":
					sMonth = "Apr"
				break;
				
				case "05":
					sMonth = "May"
				break;
				
				case "06":
					sMonth = "Jun"
				break;
				
				case "07":
					sMonth = "Jul"
				break;
				
				case "08":
					sMonth = "Aug"
				break;
				
				case "09":
					sMonth = "Sep"
				break;
				
				case "10":
					sMonth = "Okt"
				break;
				
				case "11":
					sMonth = "Nov"
				break;
				
				case "12":
					sMonth = "Dec"
				break;
				
			}//end switch
			
			var sDate = timestamp.getDate();
			if( sDate < 10){
				sDate = "0" + sDate;
			}
			
			var sHours = timestamp.getHours();
			if( sHours < 10){
				sHours = "0" + sHours;
			}
			
			var sMinutes = timestamp.getMinutes();
			if( sMinutes < 10){
				sMinutes = "0" + sMinutes;
			}
			
			var sSec = timestamp.getSeconds();
			if( sSec < 10){
				sSec = "0" + sSec;
			}
			
        			
			//var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;
			var dateStr =  sDate + "-" + sMonth + "-" + sYear + " " + sHours + ":" + sMinutes + ":" + sSec;
			return dateStr;
		}//end _timeStampToDateStr()

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


/*
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
		function _parseXmlToObj(xml){
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
				//xmlObj[ _node.nodeName ] = {};

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
		nodeObj["children"] = {};
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
			
			//continue;
		} else {
//console.log( "nodeName: "+ child.nodeName);
			var key = child.nodeName;

			//if( !nodeObj["children"] ){
				//nodeObj["children"] = {};
			//}
			if( !nodeObj["children"][key] ){
				nodeObj["children"][key] = [];
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
			
			nodeObj["children"][key].push(_ch);

			_parseChildNodes(child, _ch );
		}
	}
}//end _parseChildNodes()

return;
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
		
		}//end _parseXmlToObj()

		
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
			runAjax: _runAjax,
			timeStampToDateStr: _timeStampToDateStr,
			hashCode: _hashCode,
			parseXmlToObj: _parseXmlToObj			
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
		
	};//end sharedFunc
	

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




//**************************************
//  создать объект XMLHttpRequest
//**************************************
function getXMLDocument(url)  {  
	var xml;  
	if(window.XMLHttpRequest) {  
		xml=new window.XMLHttpRequest();  
		xml.open("GET", url, false);  
		xml.send("");  
		//alert (xml.responseText);
		return xml.responseXML;  
	}  else  {
		if(window.ActiveXObject) {  
			xml=new ActiveXObject("Microsoft.XMLDOM");  
			xml.async=false;  
			xml.load(url);  
			return xml;  
		}  else  {  
			alert("XML download is not supported in this browser");  
			return null;  
		}  
	}
}//end getXMLDocument

function create_MSXML(){
	if (typeof (ActiveXObject) === "undefined") {
		return false;
	}
	var progIDs = [
					"Msxml2.DOMDocument.6.0", 
					"Msxml2.DOMDocument.5.0", 
					"Msxml2.DOMDocument.4.0", 
					"Msxml2.DOMDocument.3.0", 
					"MSXML2.DOMDocument", 
					"MSXML.DOMDocument"
				  ];
	for(var n = 0; n < progIDs.length; n++) {
		try { 
			var xml = {
				"xml_obj" : new ActiveXObject( progIDs[n] ),
				"version" : progIDs[n]
			}
			return xml; 
		}  catch(e) {
console.log("error: " + e);
			for( var item in e )	{
console.log(item + ": " + e[item]);
			}
		};
	}
}//end create_MSXML()



function runAjaxJQuery( params ) {

	var timeStart = new Date();
	
	$("#load-progress").show();
	
	$.ajax({
		type: "GET",
		url: params["filename"],
		dataType: "text",
		//dataType: "xml",
		//data: {},
		//cache: false,
		xhr: function(){//https://wcoder.github.io/notes/progress-indicator-with-jquery
			var xhr = new window.XMLHttpRequest();
/*					
			// прогресс загрузки на сервер
			xhr.upload.addEventListener("progress", function(evt){
console.log("xhr, upload progress callback function....", evt);
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
console.log(percentComplete);
				}
			}, false);
			
			// прогресс скачивания с сервера
			xhr.addEventListener("progress", function(evt){
console.log("xhr, download progress callback function....", evt);
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
console.log(percentComplete);
				}
			}, false);
*/
			xhr.addEventListener("progress", function(e){
//console.log("xhr, download progress callback function....", e);
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
				if( _vars["loadProgressBar"] ){
					_vars["loadProgressBar"].className = "progress-bar";
					_vars["loadProgressBar"].style.width = percentComplete+"%";
					_vars["loadProgressBar"].innerHTML = percentComplete+"%";
					
					_vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
				}
			}, false);
			
			return xhr;
		},
		
		beforeSend: function(XMLHttpRequest){
//console.log("ajax beforeSend, ", arguments);
/*					
			// прогресс загрузки на сервер
			//https://wcoder.github.io/notes/progress-indicator-with-jquery
			XMLHttpRequest.upload.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {  
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
				}
			}, false);

			// прогресс скачивания с сервера
			XMLHttpRequest.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {  
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
				}
			}, false);
*/					
		},				
		
		complete: function(xhr, state){
//console.log("ajax load complete, ", arguments);
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
			_vars["runtime"]["ajax_load"] = {
				"time" : runTime
			};
			
			//_vars["logMsg"] = "ajax load " + params["filename"] + " complete";
			//_vars["logMsg"] += ", runtime: <b>" + runTime + "</b> sec";
			//_vars["logMsg"] += ", <b>state</b>: " + state;
//_log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );

			//if( _vars["waitWindow"] ){
				//_vars["waitWindow"].style.display="none";
			//}
			
		},
		
		success: function( data ){
//_vars["logMsg"] = "Successful download xml file " + params["filename"];
//_log("<p class='alert alert-success'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
			params.callback( data );	
		},
		
		error: function( data, status, errorThrown ){
//console.log( "error", arguments );
_vars["logMsg"] = "error ajax load " + params["filename"]+ ", " + errorThrown["message"];
_log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );

console.log( "status:" + status );
for(var key in errorThrown){
console.log( key +" : "+ errorThrown[key] );
}

		}
	})
	.done(function () {
console.log("$.ajax, Done...");
	})
	.fail(function (xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
console.log("textStatus:" + textStatus);
	});
}//end runAjaxJQuery();


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


//console.log("window.addEventListener:" + window.addEventListener);
//console.log("window.attachEvent:" + window.attachEvent);
if ( window.addEventListener ) {
	window.addEventListener("load", function(e) {
console.log("window.addEventListener, event load");
	}, false);
} else {
	if (window.attachEvent)	{
		window.attachEvent("onload", function(){
console.log("window.attachEvent, event onload");
		});
	}
};

/* for Mozilla/Firefox/Opera 9 */
if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function(){
console.log("DOMContentLoaded");
	},false);//end dom load
}

if( typeof window.jQuery === "function"){
//var msg = 'jQuery version: ' + jQuery.fn.jquery;
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
		
		$(".scroll-to").addClass("nolink").on("click", function(){
			if($(this).attr("href")){
				var id = $(this).attr("href");
			} else {
				var id = "#" + $(this).attr("data-target");
			}
//console.log("id: " , id);

			//$('body').scrollTo( elem, 800, {offset: -50});//need jquery.scrollTo-1.4.3.1-min.js!!!!

			var start_scroll_pos = $(id).offset().top;// Get  start position for scroll block
//console.log("start_scroll_pos: " , start_scroll_pos);

			$('html,body').animate({
				scrollTop: start_scroll_pos
				}, 500);
			return false;
		});


	});//end ready	

	$(window).scroll(function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );

			//if ( $(this).scrollTop() > start_scroll_pos  ) {
				//$("#btn-scroll-to-top").show();
			//} 

			//if ( $(this).scrollTop() < end_scroll_pos ) {
				//$("#btn-scroll-to-top").hide();
			//}
	});//end scroll

}
