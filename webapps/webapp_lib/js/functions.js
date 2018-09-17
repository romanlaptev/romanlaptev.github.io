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

function _push( ar, item){
	if( ar.push ){
		ar.push(item);
	} else {
		var num = ar.length;
		ar[num] = item;
	}
}// end _push()


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
	
	var output = getById(id);
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

function getById(id){
	
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
}//end getById()

var _timer = {};
var _set_timer = function (){
	var d = new Date;
	return d.getTime();
};

var _get_timer = function (timer){
	var d = new Date;
	return parseFloat((d.getTime() - timer)/1000);
};

function get_attr_to_obj( attr ){
	var item_attr = {};
	for(var item = 0; item < attr.length; item++) {
		item_attr[attr[item].name] = attr[item].value;
	}
	return item_attr;
}//end get_attr_to_obj()


//**************************************
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//$_GET = parseGetParams(); 
//or 
//$_GET = parseGetParams("?test=1"); 
//console.log( $_GET);
//**************************************
function parseGetParams( parseStr ) { 
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
}//end parseGetParams() 


function createRequestObject() 
{
	var request = false;
	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari, Opera ...
		request = new XMLHttpRequest();
	} 

	if(!request)
	{ // IE
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(!request)
	{
		request=new ActiveXObject('Msxml2.XMLHTTP');
	}

	return request;
}

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
/*
for ( item in XMLHttpRequest)
{
	console.log("XMLHttpRequest[" +item+ "] = " + XMLHttpRequest[item]);
}
*/
				//return false; //отмена запроса
			},
/*
			dataFilter: function (data, type) // функция предназначена для предварительной обработки ответа.
			{
console.log("dataFilter function , type - " + type);
			  //return data;
			},
*/
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
/*
(Эта настройка появилась в jQuery-1.5) В этом поле можно указать дополнительные заголовки запроса (header). Эти изменения будут введены до вызова beforeSend, в которой могут быть произведены окончательные правки заголовков.
*/

		}
	);
/*
	$.get( url, function(data)
	{
x = data.documentElement.childNodes;
console.log("Number of elements: " + x.length);
		return data;
	});
*/	
	
}//------------------------- end func
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



if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);

	$(document).ready(function(){
		
	});//end ready	

	$(window).scroll(function() {
var st = $(window).scrollTop();
document.title = st;
//console.log ("scrollTop = " + st );

			//if ( $(this).scrollTop() > start_scroll_pos  ) {
				//$("#btn-scroll-to-top").show();
			//} 

			//if ( $(this).scrollTop() < end_scroll_pos ) {
				//$("#btn-scroll-to-top").hide();
			//}
	});//end scroll

}
