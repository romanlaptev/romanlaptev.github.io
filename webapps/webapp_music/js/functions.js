//document.write("браузер - " + navigator.appName + "<br>");
//if (navigator.javaEnabled() == 1)
//  document.write("Браузер поддерживает JavaScript<br>");
//else
//  document.write("Браузер не поддерживает JavaScript<br>");

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

}//----------------------------------end func


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

$(document).ready(
	function()
	{
//-------------------------------
		$(document).ajaxStart(
			function(){ 
			  $('#ajaxBusy').show(); 
			}
		).ajaxStop(
			function()
			{ 
			  $('#ajaxBusy').hide();
			}
		);

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


	}
);//end ready

