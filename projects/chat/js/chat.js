window.onload = function(){
	//init();
/*
	document.forms["form_message"].onsubmit = function(e){  
console.log("Submit form", e);
		return false;
	};
*/
}//end load

//function init(){
	//form_message.author_name.onchange = _nameOnChange;
	//form_message.onsubmit = _validate;
//}	

	
function checkForm(form){
//console.log(form);
//for(var key in form){
//console.log(key, form[key]);
//}
//	for( var n = 0; n < form.elements.length; n++){
//console.log(form.elements[n]);
//	}//next

	var formValues = {};

	var isValid = true;
	var name = form.elements.author_name.value;
//console.log (name, name.length);
	if(name.length === 0){
		document.querySelector("#name-label").className="alert-danger";
		form.elements.author_name.className = "form-control alert-danger";
		isValid = false;
	} else {
		document.querySelector("#name-label").className="";
		form.elements.author_name.className = "form-control";
		formValues["authorName"] = name;
	}
	
	var text = form.elements.text_message.value;
//console.log (text, text.length);
	if(text.length === 0){
		document.querySelector("#text-message-label").className="alert-danger";
		form.elements.text_message.className = "form-control alert-danger";
		isValid = false;
	} else {
		document.querySelector("#text-message-label").className="";
		form.elements.text_message.className = "form-control";
		formValues["textMessage"] = text;
	}
					
	if (isValid){
		sendForm( formValues );
	} else{
		//e.preventDefault();
console.log("error in form..");
	}	
	return false;
	
}//end checkForm()	

// function _nameOnChange(){
// console.log("function nameOnChange()", this);
	// //var pattern = /[a-zA-Z]/;
	// //validate( this, pattern );
// }

// function validate( elem, pattern ){
	// var res = pattern.test( elem.value );
// console.log( res, pattern, elem.value);
	// if ( res ){
		// elem.className = "form-control alert-success";
	// } else {
		// elem.className += "form-control alert-danger";
	// }
// }

function sendForm( opt ){
	var p = {
		"action": "save_message",
		"creation_date" : "",
		"authorName" : "anonymous",
		"textMessage" : "",
		"url" : "chat.php",
		"callback": null
	};
		
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}	
//console.log( p );
	
	//get creation date
	var now = new Date();
	var sYear = now.getFullYear();
	var sMonth = now.getMonth();
	var intMonth = parseInt( sMonth ) + 1;
	var sDate = now.getDate();
	var d = sYear + "-" + intMonth + "-" + sDate;
	var t = now.toTimeString();
//console.log(d, t);
	p["creation_date"] = d +" "+ t;

	var params = "action="+p["action"]+"&authorName="+p["authorName"]+"&textMessage="+p["textMessage"]+"&date="+p["creation_date"];
	var url = p["url"]+"?" + params;
console.log( url );

	runAjax( {
		"requestMethod" : "GET", 
		"url" : url, 
		// "onProgress" : function(e){
			// var percentComplete = 0;
			// if(e.lengthComputable) {
				// percentComplete = Math.ceil(e.loaded / e.total * 100);
			// }
// console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
		// },//end onProgress()
		"callback": function( data ){
var msg = "load " + url ;
console.log(msg);

			// if( !data || data.length === 0){
// console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
				// data = [];
			// }
			
			// if( typeof p["callback"] === "function"){
				// p["callback"](data);
				//return false;
			// } 
			
		}//end callback()
	});

}//end sendForm
