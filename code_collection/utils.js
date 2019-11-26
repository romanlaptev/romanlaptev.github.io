/*
	function fixEvent(e) {
	function addListener(object, event, listener) {
	
	var setCookie = function (name, value, session){
	var delCookie = function (name){
	var getCookie = function (name){
	var getOrientation = function(){

	var _isMobile = function() {
	var _isMSIEPhone = function(){
	var _isMSIE = function(){
	var _isCEF = function(){
	var _isPOS = function(){
	var _isAndroidPhone = function(){
    var _isAndroidPhoneKeyboard = function(textChr){
	var _isAndroidPhoneFF = function(){
	var _isMSIETablet = function(){
	var _isIphoneIpad = function(){
	var _getMSIEVersion = function(){
	var _getOS = function(){
	var _getOSVersion = function(){
	var _isWin10MS11 = function(){
		
	var _getStringDate = function(date){
	var _getStringSysDateTime = function(date){

	var _setTimer = function (){
	var _getTimer = function (time){

	var _setSessionObj = function(key,data){
	var _getSessionObj = function(key){
	var _setStorageObj = function(key,data){
	var _getStorageObj = function(key){
	var _clearStorage = function(key){
	var _clearSession = function(key){

	var _translit = function(str){
	var _hashCode = function(str){

	var _getID = function(name){

    var _loadCss = function(url) {

	Array.prototype.in_array = function(value){
	document.getElementsByClassName = function(cl) { 
	create xmlhttprequest
*/

//==============================

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


//==============================

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



//==============================
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

//==============================

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
