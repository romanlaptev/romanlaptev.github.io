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
/*
elem.onclick = function(event) {
  // если IE8-, то получить объект события window.event и исправить его
  event = event || fixEvent.call(this, window.event);
  ...
}
*/
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
}


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
//$_GET = parseGetParams(); 
//console.log( $_GET);
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//**************************************
function parseGetParams() { 
   var $_GET = {}; 
   var parse_url = window.location.search.substring(1).split("&"); 
   for(var n = 0; n < parse_url.length; n++) { 
      var getVar = parse_url[n].split("="); 
      //$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
	  if( typeof(getVar[1])=="undefined" )
	  {
		$_GET[ getVar[0] ] = "";
	  }
	  else
	  {
		$_GET[ getVar[0] ] = getVar[1];
	  }
   } 
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
		"url" : _vars["db_url"], 
		"callback": _postFunc
	});
*/
function runAjax( opt ){
//console.log(arguments);
	
	var options = {
		"requestMethod" : "GET", 
		"url" : false, 
		"params": "",
		"async" :  true,
		"callback" : null
	};
	//extend options object
	for(var key in opt ){
		options[key] = opt[key];
	}
//console.log(options);

	var requestMethod = options["requestMethod"]; 
	var url = options["url"]; 
	var async = options["async"]; 
	var callback = options["callback"]; 
	
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
				if( xhr.status === 200){
					
//console.log(xhr.getResponseHeader('X-Powered-By') );
					var all_headers = xhr.getAllResponseHeaders();
//console.log( all_headers );
					
				var timeEnd = new Date();
				var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
console.log(msg);
					
//console.log( xhr.responseText );
//console.log( xhr.responseXML );
					if( typeof callback === "function"){
						
						if( xhr.responseXML ){
							var data = xhr.responseXML;
						} else {
							var data = xhr.responseText;
						}
						callback(data);
					}

				} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
				}
				
		}
	};
	
	// if( xhr.onabort ){
		// xhr.onabort = function(){
// _log("ajax onabort");
// //console.log(arguments);
		// }
	// }
// console.log( "xhr.onabort " + xhr.onabort  );

	// if( xhr.onerror ){
		// xhr.onerror = function(){
// _log("ajax onerror");
// console.log(arguments);
// console.log(xhr);					
// _log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
// _log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
// _log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
		// }
	// }
// console.log( "xhr.onerror " + xhr.onerror  );

	// if( xhr.onload ){
		// xhr.onload = function(){
// _log("ajax onload");
// console.log(arguments);
		// }
	// }
// console.log( "xhr.onload " + xhr.onload  );

	// if( xhr.onloadstart ){
		// xhr.onloadstart = function(){
// _log("ajax onloadstart");
// console.log(arguments);
		// }
	// }
// console.log( "xhr.onloadstart " + xhr.onloadstart  );
	
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
			if( document.getElementById("load-progress") ){
				document.getElementById("load-progress").value = percentComplete;
			}
		}
//console.log( "xhr.onprogress ", xhr.onprogress);
//console.log( "xhr.onprogress ", xhr.onprogress.handleEvent  );
	}

//console.log( "setRequestHeader" in xhr  );
	// if (xhr.setRequestHeader) {
		// xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// }
	// var str = '';
	//xhr.send(str);
	xhr.send();

	function _createRequestObject() {
		var request = false;
		
		if (window.XMLHttpRequest) { // Mozilla, Safari, Opera ...
			request = new XMLHttpRequest();
		} 

		if(!request){ // IE
//console.log("use Microsoft.XMLHTTP");		
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(!request){
//console.log("use Msxml2.XMLHTTP");		
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
			}else{
			var elem = $(this).attr("data-target");
			}
			$('body').scrollTo( elem, 800, {offset: -50});
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
