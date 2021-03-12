window.onload = function(){
//console.log("onload");
	if( document.getElementById("current_date") ) {
		_calcUpTime();
	}


if( document.querySelector ){
	var ua_header = document.querySelector("#user-agent");
	var flex_info = document.querySelector("#supportFlex");
	var grid_info = document.querySelector("#supportGrid");
} else {
	var ua_header = document.getElementById("ua");
	var flex_info = document.getElementById("supportFlex");
	var grid_info = document.getElementById("supportGrid");
}

	ua_header.innerHTML = navigator.userAgent;

	if( typeof CSS !== "undefined" ){
		if( typeof CSS.supports === "function" ){

	var supportFlex = CSS.supports("display", "flex");
	flex_info.innerHTML += " : " + supportFlex;

	var supportGrid = CSS.supports("display", "grid");
	grid_info.innerHTML += " : " + supportGrid;

		} else {
				flex_info.innerHTML += " false, method CSS.supports not defined....";
		}

	} else {
			flex_info.innerHTML += " false, object CSS not defined....";
	}

}//end load


if( typeof window.AG_jQuery === "function"){
	window.$ = window.AG_jQuery;
}

if( typeof window.$ === "function" 	){

	var msg = 'You are running jQuery version: ' + $.fn.jquery;
console.log(msg);

	$(document).ready(function(e){
//console.log(arguments);

/*
	url = "content_list.html";
//https://jquery-docs.ru/jQuery.get/
	var _contentList = $.get( url, function( data, res ){
		if( data.length > 0 ){
			//$("body").prepend( data );
			$("body").append( data );
			_contentClick();
		}
	})
//	  .done(function() {
//console.log( "promise callback done..." );
//		})
//	  .fail(function() {
//console.log( "promise callback fail...", arguments );
//		})
//	  .always(function() {
////console.log( "promise callback always...", arguments );
//		});
*/

	});//end ready
}

function _contentClick(){
		if( $("#content-list") ){
			$("#content-list li").each( function(num, element){
//console.log( arguments );

				var pageUrl	=	$(this).text();
//console.log( pageUrl );
				if( window.location.href.indexOf(pageUrl) !== -1 ){
					$(this).addClass("active");
					return;
				}

//console.log( typeof $("#content-list li").on === "undefined" );
//console.log(  "on" in $("#content-list li") );
				if( "on" in $(this) === false){
//console.log(  "000" );
					$(this).click( function(e){//click event for old jQuery
//console.log( $(this).text() );
						var pageUrl	=	$(this).text();
						window.location.href = pageUrl;
					});//end event
					return;
				}

				$(this).on("click", function(e){
//console.log( $(this).text() );
					var pageUrl	=	$(this).text();
					window.location.href = pageUrl;
				});//end event

			});//next

		}
}//end _contentClick()



function _calcUpTime(){
	//get uptime
	var now = new Date(); 
	var month = now.getMonth()+1;
	if( month < 10){
		month = "0" + month;
	}

	document.getElementById("current_date").innerHTML = now.getDate()+ "." + month +"."+now.getFullYear();
	var startDate = new Date(2016,4,28);//28.05.2016
	
	var day_in_ms = 1000*60*60*24;
	var Days = Math.floor((now.getTime() - startDate.getTime())/ day_in_ms );
	document.getElementById("uptime").innerHTML = Days;
	//document.getElementById("current_date").innerHTML += ", ("+Days+") "; 
	 
	//detect type year
	//год является високосным в двух случаях: либо он кратен 4, но при этом не кратен 100, либо кратен 400
	var year = now.getFullYear();
	//var year = 1600;
	var test1 = year % 4;
	//console.log(test1);
	if( test1 === 0){
		test1 = true;
	
		var test2 = year % 400;
		if( test2 > 0){
			test1 = false;
		}

	} else {
		test1 = false;
	}
	if( test1){
	//console.log("год является високосным!");	
		var numDaysInYear = 366;
	} else {
	//console.log("год не является високосным!");
		var numDaysInYear = 365;
	}

	var numYears = Math.floor(Days / numDaysInYear);
	var numDays = Days % numDaysInYear;
	document.getElementById("uptime2").innerHTML = numYears +" year "+numDays;

}//end _calcUpTime()

