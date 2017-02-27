//document.write("браузер - " + navigator.appName + "<br>");
//if (navigator.javaEnabled() == 1)
//  document.write("Браузер поддерживает JavaScript<br>");
//else
//  document.write("Браузер не поддерживает JavaScript<br>");

//http://javascript.ru/window-location
function getenv(i)
{
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
}//end function getenv()

function parseGetParams() { 
   var $_GET = {}; 
   var parse_url = window.location.search.substring(1).split("&"); 
   for(var n = 0; n < parse_url.length; n++) 
   { 
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

function load_json( json_filename )
{
	$.getJSON("json/"+json_filename,function(data)
		{
console.log(JSON.stringify(data)); 
		}
	);
}//------------ end func


$(document).ready(function(){
//-------------------------------
//ввод только цифр
		$('.only-numbers').on('keydown', 
			function(event) {
//console.log("event.keyCode = " + event.keyCode );
				if (event.keyCode == 13) 
				{
					return;
				}

				if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode
				== 9 || event.keyCode == 27 ||
				(event.keyCode == 65 && event.ctrlKey === true) ||
				(event.keyCode >= 35 && event.keyCode <= 39)) 
				{
					return;
				}
				else 
				{
					if ((event.keyCode < 48 || event.keyCode > 57) &&
					(event.keyCode < 96 || event.keyCode > 105 )) 
					{
						event.preventDefault();
					}
				}
			}
		);

//------------------------- scroll to top
$("#scroll-to-top").click(function(e) {
	e.preventDefault;
	$('html,body').animate({
		scrollTop: 0
		}, 500);
	return false;
});


});//end ready