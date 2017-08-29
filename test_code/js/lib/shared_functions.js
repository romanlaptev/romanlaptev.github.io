//console.log for old IE
if (!window.console){ 
	window.console = {
		"log" : function( msg ){
			var log = getDOMobj("log");
			if(log){
				log.innerHTML += msg +"<br>";
			} else {
				alert(msg);
				//document.writeln(msg);
			}
		}
	}
};

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
	
	var output = getDOMobj(id);
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

function getDOMobj(id){
	
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
}//end getDOMobj()


var _set_timer = function (){
	var d = new Date;
	return d.getTime();
};
var _get_timer = function (timer){
	var d = new Date;
	return parseFloat((d.getTime() - timer)/1000);
};


/*
	var item_attr = get_attr_to_obj( this.attributes );
	for(attr in item_attr){
		column_obj[attr] = item_attr[attr];
	}
*/
function get_attr_to_obj( attr ){
	var item_attr = {};
	for(var item = 0; item < attr.length; item++) {
		item_attr[attr[item].name] = attr[item].value;
	}
	return item_attr;
}//end get_attr_to_obj()


//print source code
//var source_txt = document.getElementById("code1");
//code1_out.innerHTML +="<br><br>";
//code1_out.appendChild( document.createTextNode( source_txt.outerHTML ) );


//Мышь: IE8-, исправление события
//https://learn.javascript.ru/fixevent
// elem.onclick = function(event) {
// если IE8-, то получить объект события window.event и исправить его
// event = event || fixEvent.call(this, window.event);
// ...
// }
function fixEvent(e) {
	e.currentTarget = this;
	e.target = e.srcElement;

	if (e.type == 'mouseover' || e.type == 'mouseenter') e.relatedTarget = e.fromElement;
	if (e.type == 'mouseout' || e.type == 'mouseleave') e.relatedTarget = e.toElement;

	if (e.pageX == null && e.clientX != null) {
		var html = document.documentElement;
		var body = document.body;

		e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
		e.pageX -= html.clientLeft || 0;

		e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
		e.pageY -= html.clientTop || 0;
	}

	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
	}
	return e;
}//end fixEvent()

/*addListener(). Use:
		addListener(btn_test, 'click', function (event) {
console.log("btn_test, click");			
console.log(event);			
			event.stopPropagation();
		});
dont work under iE8...why?
*/
function addListener(object, event, listener) {
	event = event || fixEvent.call(this, window.event);
	if (object && event && listener) {
		if (object.addEventListener) {
			object.addEventListener(event, listener, false);
		} else if (object.attachEvent) {
			object.attachEvent('on' + event, listener);
		}
	}
}//end addListener()

//**************************************
//var dirname = getenv("dirname");
//**************************************
function getenv(i){
	if (!i.length) 
	{ 
		return false; 
	}  
	qStr = document.location.href;
	strpos = qStr.indexOf("?"+i+"=");

	if ( strpos ==-1) 
	{ 
		strpos = qStr.indexOf("&"+i+"="); 
	}

	if ( strpos == qStr.length || strpos ==-1 )
	{
		return false; 
	}

	val = qStr.substring( (strpos+i.length)+2, qStr.length);

	strpos = val.indexOf("&");

	if ( strpos !=-1 ) 
	{ 
		val = val.substring(0, strpos ); 
	}

	if ( !val.length ) 
	{ 
		return false; 
	}
	else 
	{ 
		return val; 
	}

}//end getenv

//**************************************
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//$_GET = parseGetParams(); 
//or 
//$_GET = parseGetParams("?test=1"); 
//console.log( $_GET);
//**************************************
function parseGetParams( parseStr ) { 

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		var parse_url = parseStr.split("&"); 
	}
//console.log(parse_url);
	
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
}//end parseGetParams() 


function detectBrowsers(){
	var out = navigator.userAgent+"\n\r";
	var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
	var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
	var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
	var Chrome = navigator.userAgent.toLowerCase().indexOf("chrome");
	var Firefox = navigator.userAgent.toLowerCase().indexOf("firefox");
	  if(isiPhone > -1){
			out += "iPhone detect\n\r";
			$("body").addClass("iphone");
		   var iHeight = window.screen.height;
		   if(iHeight <= 480) {
			  out += 'iPhone 2 or iPhone 3 or iPhone 3GS\n\r';
		   }
		   else if(iHeight > 480 && iHeight <=960) {
			   out += 'iPhone 4\n\r';
		   }
		   else if(iHeight > 960) {
			  out += 'iPhone 5\n\r';
		   }
	  }
	  if(isiPad > -1) {
			out += "iPad detect\n\r";
	  }
	  if(isiPod > -1) {
			out = "iPod detect\n\r";
	  }
	  if( Chrome > -1) {
			out += "Chrome detect\n\r";
			$("body").addClass("chrome");
	  }
	  if( Firefox > -1) {
			out += "Firefox detect\n\r";
			$("body").addClass("firefox");
	  }

}//end detectBrowsers

	/*
		if ((navigator.appName == "Microsoft Internet Explorer"))
		{
			if(navigator.userAgent.indexOf("MSIE 9")!=-1)
					{
					..............
			}
		}
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("msie 9.0") != -1) {
		}

		// Gecko = Mozilla + Firefox + Netscape
		if (ua.indexOf("gecko") != -1) {
		}
	*/

function getNameBrowser() {
	var ua = navigator.userAgent.toLowerCase();
	// Internet Explorer
	if (ua.indexOf("msie") != -1 && ua.indexOf("opera") == -1 && ua.indexOf("webtv") == -1) {
		return "msie"
	}
	// Opera
	if (ua.indexOf("opera") != -1) {
		return "opera"
	}
	// Gecko = Mozilla + Firefox + Netscape
	if (ua.indexOf("gecko") != -1) {
		return "gecko";
	}
	// Safari, используется в MAC OS
	if (ua.indexOf("safari") != -1) {
		return "safari";
	}
	// Konqueror, используется в UNIX-системах
	if (ua.indexOf("konqueror") != -1) {
		return "konqueror";
	}
	return "unknown";
}//end getNameBrowser


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
			alert("Загрузка XML не поддерживается браузером");  
			return null;  
		}  
	}
}//end getXMLDocument


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
function runAjax( opt ){
//console.log(arguments);
	
	var p = {
		"requestMethod" : "GET", 
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
	
	var timeStart = new Date();

	xhr.open( requestMethod, url, async );
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
var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
console.log(msg);
//console.log( xhr.responseText );
//console.log( xhr.responseXML );

					if( typeof callback === "function"){
						
						if( xhr.responseXML ){
//var test = xhr.responseXML.selectNodes("//pma_xml_export");	
//var test = xhr.responseXML.getElementsByTagName("database");
//console.log( test.item(0).nodeName);
							var data = xhr.responseXML;
							callback(data);
						} else {
							var data = xhr.responseText;
							callback(data);
						}
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
			var all_headers = xhr.getAllResponseHeaders();
//console.log( all_headers );
			if( typeof  p["onLoadEnd"] === "function"){
				p["onLoadEnd"](all_headers);
			}
		}
	}

//console.log( "onprogress" in xhr  );
//console.log( xhr.responseType, typeof xhr.responseType );
//console.log( window.ProgressEvent, typeof  window.ProgressEvent);
	if( "onprogress" in xhr ){
		xhr.onprogress = function(e){
//console.log("ajax onprogress");
//console.log(arguments);
			var percentComplete = 0;
			if(e.lengthComputable) {
				percentComplete = Math.ceil(e.loaded / e.total * 100);
			}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

			var loadProgressBar = getDOMobj("load-progress-bar");
			if( loadProgressBar ){
				//loadProgress.value = percentComplete;
				loadProgressBar.className = "progress-bar";
				loadProgressBar.style.width = percentComplete+"%";
				loadProgressBar.innerHTML = percentComplete+"%";
			}

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
	
}//end runAjax()



// фильтрация ввода, только цифры
function filter_input(e,regexp){
  e=e || window.event;
  var target=e.target || e.srcElement;
  var isIE=document.all;

  if (target.tagName.toUpperCase()=='INPUT')
  {
    var code=isIE ? e.keyCode : e.which;
    if (code<32 || e.ctrlKey || e.altKey) return true;

    var char=String.fromCharCode(code);
    if (!regexp.test(char)) return false;
  }
  return true;
}

function check_form(){
//console.log(document.forms.sendform[0].value);
	var error = true;
	var error_text = "";
	var frm = document.forms.sendform;
	for (item in frm.elements) {
		if (item == "email")
		{
//console.log(frm.elements[item].value);
			var email_value = frm.elements[item].value;
			if (email_value.length > 0)
			{
// /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
				var reg = /^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,4})+$/;
				if (email_value.search(reg) !=-1 )
				{
					error = false;
				}

			} else {
				error_text += "enter email";
				//frm.elements[item].styles="enter email!!!";
			}
		}
	}

	if (!error){
		document.forms.sendform.submit();
//return false;
	} else {
		alert ('Error: ' + error_text);
	}
}//end check_form()



if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);
	$(document).ready(function(){
		
		//ввод только цифр
		$('.only-numbers').on('keydown', function(event) {
//console.log("event.keyCode = " + event.keyCode );
			if (event.keyCode == 13) {
				return;
			}

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
		});
		
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
				var elem = $(this).attr("href");
			} else {
				var elem = $(this).attr("data-target");
			}
			//$('body').scrollTo( elem, 800, {offset: -50});//need jquery.scrollTo-1.4.3.1-min.js!!!!
			$('html,body').animate({
				scrollTop: 0
				}, 500);
			return false;
		});
		
		$(".fancybox").fancybox({
			helpers : {
				overlay : {
					locked : false
				}
			}
		});
		
	});//end ready	
}


// Вывод всех элементов формы
function print_forms() {
	var frm = document.form_ls;
	for ( var n2=1; n2 < frm.elements.length; n2++)
	   {
		var elmnt = frm.elements[n2];
		document.write ("element " + n2 + "= " + elmnt.name+", ");
		document.write (elmnt.type + ", ");
		document.write (elmnt.value+"<br>");
	   }
}//end print_forms()

//Dump for object
/*  
print_f (cell_hover_top.style); //Dump IE styles
.......
textDecorationBlink
scrollbarFaceColor
.......
*/
function print_f( id ){
	var str = '';
   if(typeof(id) == "object"){
      for(a in id){
         str += (a +"<br>");   
      }   
   }
	document.write (str);
}//end

function select_checkbox() {
   var frm = document.form_ls;
   for (var n1=1; n1 < frm.elements.length; n1++)
      {
        var elmnt = frm.elements[n1];
        if (elmnt.type == 'checkbox')
          {
            elmnt.checked = true;
          }
      }
 }//end function

function select_change_action() {
   var num = 0;
   var a = '';
   num = document.forms.form_ls.change_action.selectedIndex;
   a = document.forms.form_ls.change_action[num].value;
//   window.alert (a);
}//end 
 
//-----------------------------------------------------------
// очистить помеченные checkbox
//-----------------------------------------------------------
function clear_checkbox (){
      var frm = document.form_ls;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
         }
}//end

//-----------------------------------------------------------
// слои
//-----------------------------------------------------------
  function init() {
     IE = (document.all)
     NC = (document.layers)
     Opera = (document.getElementById)
   }

  function hiddenLayer(filename)  {
    init();
    if (IE) eval('document.all["desc"].style.visibility = "hidden"')
    if (NC) eval('document.layers["desc"].visibility = "hidden"')
    if (Opera) eval('document.getElementById("desc").style.visibility = "hidden"')
   }

  function showLayer(filename) {
    init();
    if (IE) eval('document.all["desc"].style.visibility = "visible"')
    if (NC) eval('document.layers["desc"].visibility = "visible"')
    if (Opera) eval('document.getElementById("desc").style.visibility = "visible"')
   }

  function processnode111(nnodeid)
   {
    if (document.getElementById("div_" + nnodeid).style.display == "none")
      {
      document.getElementById("div_" + nnodeid).style.display = ""
      }
    else
      {
      document.getElementById("div_" + nnodeid).style.display = "none"
      }
   }

  function processnode(nnodeid)
   {
    if (document.getElementById(nnodeid).style.display == "none")
      {
      document.getElementById(nnodeid).style.display = ""
      }
    else
      {
      document.getElementById(nnodeid).style.display = "none"
      }
   }

   
function set_cookie(name, value, expires){
alert(name);
	if (!expires){
		expires = new Date();
	}
//http://javascript.ru/date/togmtstring	
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/";
}//end set_cookie


function convertTimestamp(timestamp) {
	var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
	yyyy = d.getFullYear(),
	mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
	dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
	hh = d.getHours(),
	h = hh,
	min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
	ampm = 'AM',
	time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
}//end convertTimestamp()
