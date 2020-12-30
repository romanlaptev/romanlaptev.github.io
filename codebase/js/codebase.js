/*
//====== FIREBUG on mobile
//====== EVENTS
//====== COOKIES
//====== DATE
//====== XML
//====== FORMS
//====== DETECT BROWSERS, navigator.userAgent
//====== AJAX
*/

//--------------------------------- hide input type="range" if not support
//https://learn.javascript.ru/dom-polyfill
var testRangeSupport = document.getElementById("page-range").type;
console.log( testRangeSupport );
if( testRangeSupport !== "range"){
	document.getElementById("page-range").style.display="none";
}
//---------------------------------

//================================= FIREBUG on mobile

	if ('ontouchstart' in window){
		var script = document.createElement('script');
		script.src = "https://getfirebug.com/firebug-lite.js";
		//document.body.appendChild( script );
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() {
//alert( "onload " + this.src);
		};
		script.onerror = function(e) {
//alert( "error load script " + this.src);
		};  
	}

//============================== EVENTS

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


//============================== COOKIES

function set_cookie(name, value, expires){
alert(name);
	if (!expires){
		expires = new Date();
	}
//http://javascript.ru/date/togmtstring	
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/";
}//end set_cookie


	var setCookie = function (name, value, session){
		if(session == undefined) session = false;
		date = new Date();
		expires = new Date(date.getFullYear() + 10, 0, 1);
		cookie_string = name + "=" + escape(value);
		if(!session) cookie_string += "; expires=" + expires.toGMTString();
		document.cookie = cookie_string;
	};//setCookie
/*
function set_cookie(name, value, expires){
alert(name);
	if (!expires){
		expires = new Date();
	}
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/";
}
*/

	var delCookie = function (name){
		document.cookie = name + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	};//delCookie

	var getCookie = function (name){
		// cookies are separated by semicolons
		var aCookie = document.cookie.split("; ");
		for (var i=0; i < aCookie.length; i++){
			// a name/value pair (a crumb) is separated by an equal sign
			var aCrumb = aCookie[i].split("=");
			if (name == aCrumb[0])
				if(aCrumb[1]) return unescape(aCrumb[1]);
				else return null;
		}
		// a cookie with the requested name does not exist
		return null;
	};//getCookie



//============================== DATE

	//get date format like dd.mm.yyyy
	var _getStringDate = function(date){
		var today = date,
			dd = date.getDate(),
			mm = date.getMonth()+1,
			yyyy = date.getFullYear();

		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;

		return dd+'.'+mm+'.'+yyyy;

	};//_getStringDate
	
		//get current date format like dd.mm.yyyy hh:mi:se
	var _getStringSysDateTime = function(date){
		var today = new Date(),
				dd = today.getDate(),
				mm = today.getMonth()+1,
				yyyy = today.getFullYear(),
				hh = today.getHours().toString(),
				mi = today.getMinutes().toString(),
				se = today.getSeconds().toString();

		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;
		se = (se.length==1)?("0"+se):(se);
		mi = (mi.length==1)?("0"+mi):(mi);
		hh = (hh.length==1)?("0"+hh):(hh);

		return dd+'.'+mm+'.'+yyyy+' '+hh+':'+mi+':'+se;

	};//_getStringSysDateTime


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
	
	//=================================
		var _setTimer = function (){
		_timer = new Date;
		return _timer.getTime();
	};//_setTimer
	
	var _getTimer = function (time){
		if (!time) time=_timer;
		var d = new Date;
		return parseFloat((d.getTime() - time)/1000);
	};//_getTimer
	
//=================================
	var _setSessionObj = function(key,data){
		sessionStorage.setItem(key, JSON.stringify(data));
	};//_setSessionObj
	
	var _getSessionObj = function(key){
		if(sessionStorage.getItem(key)=="undefined") return undefined; // #GB, 12.10.2017, IE fails on JSON.parse(undefined) with `Invalid character` error
		return JSON.parse(sessionStorage.getItem(key));
	};//_getSessionObj
	
	
	var _setStorageObj = function(key,data){
		localStorage.setItem(key, JSON.stringify(data));
	};//_setStorageObj
	
	var _getStorageObj = function(key){
		if(localStorage.getItem(key)=="undefined") return undefined; // #GB, 12.10.2017, IE fails on JSON.parse(undefined) with `Invalid character` error
		return JSON.parse(localStorage.getItem(key));
	};//_getStorageObj
	
	var _clearStorage = function(key){
		localStorage.clear();
	};//_clearStorage

	var _clearSession = function(key){
		sessionStorage.clear();
	};//_clearSession

//=================================

	var _translit = function(str){
		//_writeConsole('_translit='+str);
		if (!str) return "";
		if(typeof str != "string") return str;
		var n = "ēĒŗŖūŪīĪāĀšŠģĢķĶļĻžŽčČņŅ".split("");
		var l = "eErRuUiIaAsSgGkKlLzZcCnN".split("");
		for(var i =0; i < n.length; i++) str = str.replace(new RegExp(n[i],"g"), l[i]);
		return str;
	};//_translit
	
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

	//get unique random id
	var _getID = function(name){
		var id = (new Date()).getTime();
		
		if (!name) return id;

		return name+"_"+id;
		
	};//_getID

    var _loadCss = function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };//_loadCss


//=================================
//if not arr1.indefOf()....arr1.in_array()
Array.prototype.in_array = function(value){
	var _len = this.length;
	for (var n = 0; n < _len; n++)
		if (this[n] === value) {
      return true;
    }
	return false;
};
// var arr1 = [1,2,3];
// var test = arr1.in_array(2);
// console.log(test);

//=================================
if(document.getElementsByClassName == undefined) { 
   document.getElementsByClassName = function(cl) { 
      var retnode = []; 
      var myclass = new RegExp('\\b'+cl+'\\b'); 
      var elem = this.getElementsByTagName('*'); 
      for (var i = 0; i < elem.length; i++) { 
         var classes = elem[i].className; 
         if (myclass.test(classes)) { 
            retnode.push(elem[i]); 
         } 
      } 
      return retnode; 
   } 
}; 

//================================= create xmlhttprequest
/*
var request = false;

try {

	request = new XMLHttpRequest();
  
} catch (trymicrosoft) {

	try {

   		request = new ActiveXObject("Msxml2.XMLHTTP");

 	} catch (othermicrosoft) {

   		try {

     		request = new ActiveXObject("Microsoft.XMLHTTP");

   		} catch (failed) {

    		request = false;

   		}  
 	}
}   
*/

//=================================
/*
$(document).ready(
	function()
	{
	
		$("#attach-pdf-submit").click(
			function()
			{
				$("#attach-filelist").empty();
			}
		);
	
		$("#attach-pdf-remove").click(
			function()
			{
				var attach_file = $("#attach-file").text();
//console.log("attach_file = " + attach_file);			
				var category_id = $("input[name=attach_pdf_category_id]").val();
//console.log("category_id = " + category_id);			

				$.ajax({
					type: 'POST',
					url: '/templates/qdec2/includes/attach_pdf.php',
					data: 'action=remove&category_id=' + category_id + '&attach_file=' + attach_file,
						success: function(data){
console.log(data);			
							//var error = 0;
						},
						error: function(data) {
console.log("error, " + data);			
							//var error = 1;
						}
				});
				$("#attach-file").empty();

			}
		);
		
	}
);//end ready
*/

//=================================

if ( window.console ){ 
	if("time" in console){
console.time( "timer_loadData" );
	}
}
//......
if ( window.console ){ 
	if("timeEnd" in console){
console.timeEnd( "timer_loadData");
	}
}

//================================= from Z.Engine
function _trim(str){
	var re = /[ \s\t\n\r]+/gi;
	//alert('['+str+'], [' + str.replace(re, "") + ']');
	return str.replace(re, "");
}

if(Array.prototype.item == undefined)
{
	Array.prototype.item = function(i) { return this[i]; }
}

//================================= 
function _hideObject(obj){
	try{
		if(obj.style.display != "none"){
			//alert("hide object: " + obj.id);
			obj.style.display		= "none";
		}
	}catch(e){
		//alert("Could not hide object: " + e.message);
		return;
	}
}


function _hideObjectV(obj){
	try{
		if(obj.style.visibility != "hidden"){
			obj.style.visibility = "hidden";
		}
	}catch(e){
		return;
	}
}


function _showObject(obj){
	try{
		if(obj.style.display != "inline"){
			obj.style.display		= "inline";
		}
	}catch(e){
		return;
	}
}


function _showObjectV(obj){
	try{
		if(obj.style.visibility != "visible"){
			obj.style.visibility	= "visible";
		}
	}catch(e){
		return;
	}
}

//================================= XML

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


function _getXMLVersion(){
	if(_isXML("6.0")) return ".6.0";
	if(_isXML("4.0")) return ".4.0";
	if(_isXML("3.0")) return ".3.0";
	return "";
}

function _getXMLVersionNumber(){
	if(_isXML("6.0")) return 6;
	if(_isXML("4.0")) return 4;
	if(_isXML("3.0")) return 3;
	return 0;
}

function _isXML(version){
	var obj;
	try{
		obj = new ActiveXObject("Msxml2.DOMDocument." + version);
	}
	catch(e){
		return false;
	}
	obj = undefined;
	return true;
}

function _isXML30(){
	return _isXML("3.0");
}

function _isXML40(){
	return _isXML("4.0");
}

function _isXML60(){
	return _isXML("6.0");
}

//=================================
function _msgbox(text, onok, mode, title, hint, features){
	if(features == undefined) features = '';
	if(!document.all._msg_div_){
		var dvw = document.createElement('<div id="_msg_wait_div_" class="msg-wait-div">&#xA0;</div>');
		var dv = document.createElement('<div id="_msg_div_" class="msg-div"></div>');
		var divHTML = "";

		divHTML += '	<table width="100%" height="100%" border="0">';
		divHTML += '		<tr><td align="center" valign="middle">';
		divHTML += '			<div id="_msg_title_" class="msg-box-title" style="display:none"></div>';
		divHTML += '			<div class="msg-box">';
		divHTML += '				<table width="100%" border="0">';
		divHTML += '					<tr><td align="center" id="_msg_text_td_" class="msg-text"><div id="_msg_text_" style="width:100%;height:100%;overflow:auto;text-align:center"></div></td></tr>';
		divHTML += '					<tr><td align="center"><hr class="msg-box-hr"></td></tr>';
		divHTML += '					<tr><td align="center" nowrap="1">';

		divHTML += '						<input type="button" id="_msg_ok_" value="$res:msgbox.ok$" class="doc-button" onclick="_msgboxclose();">';

		divHTML += '						<input type="button" id="_msg_yes_" value="$res:msgbox.yes$" class="doc-button" style="display:none">';
		divHTML += '						<input type="button" id="_msg_no_" value="$res:msgbox.no$" class="doc-button" style="display:none">';
		divHTML += '						<input type="button" id="_msg_cancel_" value="$res:msgbox.cancel$" class="doc-button" style="display:none">';

		divHTML += '					</td></tr>';
		divHTML += '				</table>';
		divHTML += '			</div>';
		divHTML += '		</td></tr>';
		divHTML += '	</table>';

		dv.innerHTML = divHTML;

		document.body.appendChild(dvw);
		document.body.appendChild(dv);
	}

	if(title){
//
	}

	if(text){
		if(mode == "html")
			document.all._msg_text_.innerHTML = text;
		else
			document.all._msg_text_.innerText = text;
	}

	if(hint)
		document.all._msg_text_.title = hint;
	else
		document.all._msg_text_.title = '';

	_msgboxData.onok = undefined;

	// init msgbox with only _msg_ok_
	_hideObject(document.all._msg_yes_);
	_hideObject(document.all._msg_no_);
	_hideObject(document.all._msg_cancel_);
	_showObject(document.all._msg_ok_);

	if(onok){
		if(onok.push){
			_hideObject(document.all._msg_ok_);
			_showObject(document.all._msg_yes_);
			_showObject(document.all._msg_no_);

			document.all._msg_yes_.onclick	= onok[0];
			document.all._msg_no_.onclick	= onok[1];
			if(onok.length == 3){
				_showObject(document.all._msg_cancel_);
				document.all._msg_cancel_.onclick = onok[2];
			}
		}else{
			_msgboxData.onok = onok;
			document.all._msg_ok_.onclick = _msgbox_onok;
		}
	}else{
		document.all._msg_ok_.onclick = _msgboxclose;
	}

	_showObject(document.all._msg_wait_div_);
	_showObject(document.all._msg_div_);

	if(features != ''){
		var feature = _get_feature(features, 'text-align');
		if(feature) document.all._msg_text_.style.textAlign = feature;
	}

	var h = parseInt(document.body.clientHeight * 0.30, 10);
	if(document.all._msg_text_td_.offsetHeight > h)
		document.all._msg_text_td_.style.height = h;

	if(!onok){
		document.all._msg_ok_.focus();
	}else{
		if(!onok.push){
			document.all._msg_ok_.focus();
		}else{
			if(onok.length == 3)
				document.all._msg_cancel_.focus();
			else
				document.all._msg_yes_.focus();
		}
	}
}

//=================================
function escapeXML(str){
	var amp_re	= /\&/gi;
	var gt_re	= /\>/gi;
	var lt_re	= /\</gi;
	var quot_re	= /\"/gi;
	var apos_re	= /\'/gi;
	return str.replace(amp_re, "&amp;").replace(gt_re, "&gt;").replace(lt_re, "&lt;").replace(quot_re, "&quot;").replace(apos_re, "&apos;");
}

function unescapeXML(str){
	var amp_re	= /\&amp\;/gi;
	var gt_re	= /\&gt\;/gi;
	var lt_re	= /\&lt\;/gi;
	var quot_re	= /\&quot\;/gi;
	var apos_re	= /\&apos\;/gi;
	return str.replace(amp_re, "&").replace(gt_re, ">").replace(lt_re, "<").replace(quot_re, '"').replace(apos_re, "'");
}

//=================================
function alert_e(e, sender){
	if(sender == undefined) sender = "";
	var mess = "";
	if(e.constructor == Error || e.constructor == '[object Error]')
		mess = "message: " + e.message + "\ndescription: " + e.description + "\nfacilty: " + (e.number>>16 & 0x1FFF) + "\ncode: " + (e.number & 0xFFFF);
	else
		mess = e;
	alert("EXCEPTION - " + sender + ":\n------------------------\n" + mess);
}


//=================================
function get_user_name(){
	var username = _nvl(getCookie('IIS_Authorizied_Username'), 'unknow_user');
	return username;
}

function get_user_id(){
	var userid = _nvl(getCookie('IIS_Authorizied_Userid'), '0');
	return userid;
}


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

//================================= FORMS

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


// фильтрация ввода, только цифры
function filter_input(e,regexp){
  e=e || window.event;
  var target=e.target || e.srcElement;
  var isIE=document.all;

  if (target.tagName.toUpperCase()=='INPUT')
  {
    var code=isIE ? e.keyCode : e.which;
    if (code<32 || e.ctrlKey || e.altKey) return true;

    var _char=String.fromCharCode(code);
    if (!regexp.test( _char )) return false;
  }
  return true;
}


//=================================
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


//================================= DETECT BROWSERS, navigator.userAgent
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

//-----------------
	var getOrientation = function(){
		if(_isMobile()) return (screen.height > screen.width)?"portrait":"landscape";
		else return((window.orientation == -90 || window.orientation == 90)?"landscape":"portrait");
	};//getOrientation

	var _isMobile = function() {
		//return !!('ontouchstart' in window);
		
		var supportsTouch = false;
		if ('ontouchstart' in window) {
			//iOS & Android
			supportsTouch = true;
		//} else if(window.navigator.msPointerEnabled) { // msPointerEnabled does not detect mobile, it also exists in desktop IE, use msMaxTouchPoints/maxTouchPoints instead!
		} else if(window.navigator.msMaxTouchPoints) {
			//WinPhone
			supportsTouch = true;
		}
		return supportsTouch;
	};//_isMobile
	
//if ( navigator.userAgent.match(/Mobi/) ) {
	//test["result"] = true;
//}
//.........
// if( ('ontouchstart' in window) ||
	// (navigator.maxTouchPoints > 0) ||
	// (navigator.msMaxTouchPoints > 0)
// ){
	// test["result"] = true;
	// //test["msg"] = "browser with either Touch Events of Pointer Events running on touch-capable device";
// }
// if ( typeof window.orientation !== "undefined") {
	// test["result"] = true;
	// test["msg"] = "window.orientation = " + window.orientation;
// }

	var _isMSIEPhone = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if ((uAgent.match(/MSIE/i) || uAgent.match(/RV:/i) || uAgent.match(/EDGE/i)) && uAgent.match(/Windows Phone/i)){
				return true;
			}
		}
		return false;
	};//_isMSIEPhone

	var _isMSIE = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if ((uAgent.match(/MSIE/i) || uAgent.match(/RV:11/i))){
				return true;
			}
		}
		return false;
	};//_isMSIE

	var _isCEF = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if (uAgent.match(/CEF/i)){
				return true;
			}
		}
		return false;
	};//_isCEF

	var _isPOS = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if (uAgent.match(/POS/i)){
				return true;
			}
		}
		return false;
	};//_isPOS

	var _isAndroidPhone = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = (navigator.userAgent).toLowerCase();
			if (!uAgent.match(/windows/i) && uAgent.match(/android/i) && uAgent.match(/chrome/i)){
				return true;
			}
		}
		return false;
	};//_isAndroidPhone

    var _isAndroidPhoneKeyboard = function(textChr){
        if (_isAndroidPhone() && textChr==229) return true;
        return false;
    };//_isAndroidPhoneKeyboard

	var _isAndroidPhoneFF = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = (navigator.userAgent).toLowerCase();
			if (!uAgent.match(/windows/i) && uAgent.match(/android/i) && uAgent.match(/firefox/i)){
				return true;
			}
		}
		return false;
	};//_isAndroidPhoneFF

	var _isMSIETablet = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if ((uAgent.match(/MSIE/i) || uAgent.match(/RV:/i) || uAgent.match(/EDGE/i)) && uAgent.match(/Windows NT/i)){
				return true;
			}
		}
		return false;
	};//_isMSIEPhone

	var _isIphoneIpad = function(){
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent;
			if (uAgent.match(/(iPod|iPhone|iPad)/)){
				return true;
			}
		}

		return false;
	};//_isIphoneIpad

	var _getMSIEVersion = function(){
		return 10;
		var uAgent;
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent.toUpperCase();
			var pos = uAgent.indexOf('MSIE');
			if (pos !=- 1) return parseInt(uAgent.substr(pos + 5, uAgent.indexOf('.', pos) - pos), 10);
			var pos = uAgent.indexOf('RV:');
			if (pos !=- 1) return parseInt(uAgent.substr(pos + 3, 2), 10);
		}
		return 0;
	};//_getMSIEVersion

	var _getOS = function(){
		var _ios = /iPhone OS |iPad; CPU OS /i;
		var _and = /Android /i;
		var _wd = /Windows NT /i;
		var _wm = /Windows Phone /i;
		var ua = navigator.userAgent;

		var os;
		os = _wd.exec(ua);
		if(os) return 'Windows NT';
		os = _wm.exec(ua);
		if(os) return 'Windows Phone';
		os = _ios.exec(ua);
		if(os) return 'iOS';
		os = _and.exec(ua);
		if(os) return 'Android';

		return null;
	};//_getOS

	var _getOSVersion = function(){
		var _ios = /iPhone OS ([\.\_\d]+)|iPad; CPU OS ([\.\_\d]+)/i;
		var _and = /Android ([\.\d]+)/i;
		var _wd = /Windows NT ([\.\d]+)/i;
		var _wm = /Windows Phone ([\.\d]+)/i;
		var ua = navigator.userAgent;

		var os;
		os = _wd.exec(ua);
		if(os) return os[1];
		os = _wm.exec(ua);
		if(os) return os[1];
		os = _ios.exec(ua);
		if(os) return (os[1] ? os[1] : os[2]);
		os = _and.exec(ua);
		if(os) return os[1];

		return null;
	};//_getOSVersion
	
	var _isWin10MS11 = function(){
		var uAgent,
			ie,
			win;
	
		if (navigator && navigator.userAgent){
			uAgent = navigator.userAgent.toUpperCase();
			ie = uAgent.indexOf('RV:');
			if (ie !=- 1) ie = parseInt(uAgent.substr(ie + 3, 2), 10);
			win = uAgent.indexOf('WINDOWS NT ');
			if (win !=- 1) win=parseInt(uAgent.substr(win + 10, 3), 10);
			
			if (win == 10 && ie == 11) return true;
			
		}
		
		return false;
				
	};//_isWin10MS11


//=================================
//print source code
//var source_txt = document.getElementById("code1");
//code1_out.innerHTML +="<br><br>";
//code1_out.appendChild( document.createTextNode( source_txt.outerHTML ) );


//**************************************
//var dirname = getenv("dirname");
//**************************************
/*
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
*/


//================================= AJAX
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


//============================= IMAGES Load error
/*
window.onload = function(){
console.log("window.onload");	
//console.log( "jQuery is " + typeof $);

	//+Обработка проблем загрузки изображений (загрузить с облака гугла)
//	var images = document.getElementsByTagName("img");
//console.log( "images =  ", images, images.length);
//	for( var n = 0; n < images.length; n++){
//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
//		if( images[n].clientHeight === 0 ){
//			load_img_error( images[n] );
//		};
//	};


};//end load

(function($){
    $(function() {
console.log("TEST");

//handler for error load images
		$("img").on("error", function( e ){
console.log("image load error");
			//var src = $(this).attr("src");
			//var new_src = sitecontent + src;
//console.log("fixing image source = " + new_src);
			//$(this).attr("src", new_src);
			$("body").attr("data-image-load-error","1");
			//load_img_error( $(this)[0] );
		});

		$("img").on("load", function( e ){
console.log("image load event", e);
		});

    });
})(jQuery);
*/


//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
