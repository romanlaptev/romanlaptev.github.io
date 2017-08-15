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

	var formValues = {
		"url" : form.getAttribute("action"),
		"action" : form.action.value,
		"creation_date" : form.creation_date.value//,
		//"user_ip" : "111.111.111.111"
	};

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

function sendForm( formValues ){
console.log( formValues);
/*
			runAjax( {
				"requestMethod" : "GET", 
				//"requestMethod" : "HEAD", 
				"url" : url, 
				"onProgress" : function(e){
					var percentComplete = 0;
					if(e.lengthComputable) {
						percentComplete = Math.ceil(e.loaded / e.total * 100);
						if( webApp.vars["loadProgress"] ){
							webApp.vars["loadProgress"].value = percentComplete;
						}
						if( webApp.vars["loadProgressBar"] ){
							webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
						}

					}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

					
				},//end onProgress()
				"callback": function( data ){
var msg = "load " + url ;
console.log(msg);

					if( !data || data.length === 0){
	console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					if( typeof p["callback"] === "function"){
						p["callback"](data);
						return false;
					} 
					
				}//end callback()
});
*/
}//end sendForm
