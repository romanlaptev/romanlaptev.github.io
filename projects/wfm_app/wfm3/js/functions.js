//console.log for old IE
if(!window.console){
	console = {
		log : function(message){
			alert(message);
		}
	}
}

var _timer = {};
var _set_timer = function (){
	var d = new Date;
	return d.getTime();
};

var _get_timer = function (timer){
	var d = new Date;
	return parseFloat((d.getTime() - timer)/1000);
};


function _log( msg, id){
	if(!id) id = "log";
	if( msg.length === 0){
		document.getElementById(id).innerHTML = "";
	}
	//if( window.console && window.console.log) {
		//console.log(msg)
	//};
	document.getElementById(id).innerHTML += "<p>" + msg + "</p>";
}

//document.write("браузер - " + navigator.appName + "<br>");
//if (navigator.javaEnabled() == 1)
//  document.write("Браузер поддерживает JavaScript<br>");
//else
//  document.write("Браузер не поддерживает JavaScript<br>");

//**************************************
//var dirname = getenv("dirname");
//**************************************
function getenv(i){
	
	if (!i.length){ 
		return false; 
	}  
	qStr = document.location.href;
	strpos = qStr.indexOf("?"+i+"=");

	if( strpos ==-1){ 
		strpos = qStr.indexOf("&"+i+"="); 
	}

	if ( strpos == qStr.length || strpos ==-1 ){
		return false; 
	}

	val = qStr.substring( (strpos+i.length)+2, qStr.length);
	strpos = val.indexOf("&");

	if ( strpos !=-1 ){ 
		val = val.substring(0, strpos ); 
	}

	if ( !val.length ){ 
		return false; 
	} else { 
		return val; 
	}

}// end getenv()

//**************************************
//$_GET = parseGetParams(); 
//console.log( $_GET);
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//**************************************
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
}//end func

/*
function select_checkbox( form ){
//   alert ("select all checkbox");
   var frm = document.form_ls;
   for (var n1=1; n1 < frm.elements.length; n1++)
      {
        var elmnt = frm.elements[n1];
        if (elmnt.type == 'checkbox')
          {
            elmnt.checked = true;
          }
      }
 }

function clear_checkbox (){
//     alert ("clear all checkbox");
      var frm = document.form_ls;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
         }
}
*/

$(document).ready(function(){
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

});//end ready