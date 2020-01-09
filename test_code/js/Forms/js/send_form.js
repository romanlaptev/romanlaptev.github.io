var func = sharedFunc();
//console.log("func:", func);

var _vars = {
	"logMsg" : "",
	"support" : func.testSupport(),
	"requestUrl" : "getRequest.php"
};
console.log(_vars);
	
window.onload = function(){
	_vars.logMsg = navigator.userAgent;
	func.logAlert( _vars.logMsg, "info");
	
	if( _vars["support"]["fileAPI"] ){
		_vars.logMsg = "This browser supports File API";
		func.logAlert( _vars.logMsg, "success");
	} else {
		_vars.logMsg = "This browser does not support File API";
		func.logAlert( _vars.logMsg, "error");
	}

	if( _vars["support"]["formData"] ){
		_vars.logMsg = "This browser supports FormData object";
		func.logAlert( _vars.logMsg, "success");
	} else {
		_vars.logMsg = "This browser does not support FormData object";
		func.logAlert( _vars.logMsg, "error");
	}
	
	if( _vars["support"]["promiseSupport"] ){
		_vars.logMsg = "This browser supports Promise object";
		func.logAlert( _vars.logMsg, "success");
	} else {
		_vars.logMsg = "This browser does not support Promise object";
		func.logAlert( _vars.logMsg, "error");
	}
	
	_vars["log"] = func.getById("log");
	_vars["btnClearLog"] = func.getById("btn-clear-log");
	_vars["formMessage"] = func.getById("message-form");
	_vars["nameLabel"] = func.getById("name-label");
	_vars["messageLabel"] = func.getById("text-message-label");

	_vars["formUpload"] = func.getById("upload-form");
	_vars["fileLabel"] = func.getById("file-label");
	
	_vars["canvas"] = func.getById("canvas1");
	_vars["context"] = _vars["canvas"].getContext("2d");
//console.log( _vars["context"] );		
	//create test image
	_vars["context"].strokeStyle = "red";
	_vars["context"].fillRect(10,10,50,50);
	_vars["context"].stroke();	


	//===============================
	_vars["btnClearLog"].onclick = function( event ){
//console.log("click...", e);			
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		_vars.log.innerHTML = "";
	};//end event
	
	//===============================
	//document.forms["form_message"].onsubmit = function(e){
	_vars["formMessage"].onsubmit = function(e){
//console.log(e.type, e);
//console.log(this);
			checkForm({
				"form" : this,
				"action" : "save_message"
			});
		return false;
	}//end event
	
	//=============================== UPLOAD
	//document.forms["form_upload"].onsubmit = function(e) {
	_vars["formUpload"].onsubmit = function(e){
		e.preventDefault();
			checkForm({
				"form" : this,
				"action" : "upload"
			});
		//_upload( document.forms["form_import"] );
	};//end event

	//===============================
/*	
	//_vars["canvas"].onmousemove = function(e) {
	_vars["canvas"].onclick = function(e) {
console.log(e.type, e.clientX, e.clientY);
console.log(e);
		
_vars["context"].moveTo(e.clientX, e.clientY);
_vars["context"].lineTo(100, 0);

		// _vars["context"].lineWidth = 2;
		// _vars["context"].strokeStyle = "#000000";
		// _vars["context"].lineTo(e.clientX, e.clientY);
		_vars["context"].stroke();
	};
*/
	
}//end load()


function checkForm(opt){
	var p = {
		"form" : null,
		"action" : ""
	};
//console.log(form);
//for(var key in form){
//console.log(key, form[key]);
//}
//	for( var n = 0; n < form.elements.length; n++){
//console.log(form.elements[n]);
//	}//next
	
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log( p );
	
	var form = p["form"];
	var formValues = {
		"form" : p["form"],
		"action" : p["action"],
		"requestMethod" : form.getAttribute("method"),
		"enctype" : form.getAttribute("enctype") ? form.getAttribute("enctype") : null
	};
	
	var isValid = true;

	//console.log (form.elements);
	if( form.elements["author_name"] ){
		var name = form.elements.author_name.value;
	//console.log (name, name.length);

		if(name.length === 0){
			isValid = false;
			_vars["nameLabel"].className="alert-danger";
			form.elements.author_name.className = "form-control alert-danger";
		} else {
			_vars["nameLabel"].className="";
			form.elements.author_name.className = "form-control";
			formValues["authorName"] = name;
		}
	}
		
	if( form.elements["title"] ){
		var title = form.elements.title.value;
		if( title.length > 0){
			formValues["title"] = title;
		}
	}
	
	var nameElement = "text_message";
	if( form.elements[ nameElement ] ){
		var _text = form.elements[ nameElement ].value;
		//console.log (text, text.length);
		if( _text.length === 0){
			isValid = false;
			_vars["messageLabel"].className="alert-danger";
			form.elements[ nameElement ].className = "form-control alert-danger";
		} else {
			_vars["messageLabel"].className="";
			form.elements[ nameElement ].className = "form-control";
	//filter
			
			_text = _text
			//.replace(/\n/g, "\\u000A")//replace end of line
			//.replace(/\r/g, "\\r")//replace end of line (for correct JSON parsing)
			//.replace(/\n/g, "\\n")//replace end of line (for correct JSON parsing)
			
			//remove old special symbols
				.replace(/\&amp;/g, "&")
				.replace(/\&lt;/g, "<")
				.replace(/\&gt;/g, ">")
				.replace(/\&quot;/g, "\"")
				
				//insert special symbols re-new
				.replace(/&/g, "&amp;")
				.replace(/"/g, "&quot;")
				.replace(/\</g, "&lt;")
				.replace(/\>/g, "&gt;")
				.replace(/'/g, "&#39;");
			
			formValues["textMessage"] = _text;
		}
	}

/*
	var nameElement = "upload_file";
	if( form.elements[ nameElement ] ){
		
		if( _vars["support"].fileAPI ){
			
			var files = form.upload_file.files;
	console.log( files, files.length );
	
			if( files.length === 0){
				isValid = false;
				_vars["fileLabel"].className="alert-danger";
				form.elements[ nameElement ].className = "form-control alert-danger";
			}
				
			if( files.length > 0){
					//check upload file type
					// var file = files[0];
					// if ( file.type !== "text/xml") {
						// _vars.logMsg = "error, incorrect file type, " + file.name +", " +file.type;
						// func.logAlert( _vars.logMsg, "error");
						// return false;
					// }
					
				_vars["fileLabel"].className="";
				form.elements[ nameElement ].className = "form-control";
			}
			
		} else {
			_vars.logMsg = "This browser does not support File API";
			func.logAlert( _vars.logMsg, "error");
			return false;
		}
		
	}
*/

	// if( form.elements.id && form.elements.id.value.length > 0){
		// formValues["id"] = form.elements.id.value;
	// }
		
	if (isValid){
		sendForm( formValues );
	} else{
		//e.preventDefault();
		_vars.logMsg = "error in form..";
		func.logAlert( _vars.logMsg, "error");
	}
	return false;
}//end checkForm()

function sendForm( opt ){
	//default parameters
	var p = {
		"form": null,
		"id": null,
		"action": "",
		"url" : _vars["requestUrl"],
		"requestMethod" : "GET",
		"enctype" : null,
		"callback": null
	};
		
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log( p );

	var params = {
		"action" : p["action"],
		"date" : func.timeStampToDateStr({"format": "yyyy-mm-dd hh:min:sec"})
	};
	
	var form = p["form"];
//console.log (form.elements);

//---------------------------------- create Form Data
if( !p["enctype"]){
	_vars.logMsg = "error, undefined form attribute <b>'enctype'</b> ";
	func.logAlert( _vars.logMsg, "error");
	return false;
}

	
if( p["enctype"] === "application/x-www-form-urlencoded"){

	var formData = {
		"id" : p["id"],
		"author_name" : p["authorName"],
		"title" : p["title"],
		"text_message" : p["textMessage"]
	};
//----------------------------------
	func.runAjax( {
		"requestMethod" : p["requestMethod"],
		//"responseType" : "json",
		"enctype" : p["enctype"],
		"url" : p["url"],
		"params" : params,
		"formData" : formData,
		"callback": function( data, runtime, xhr){
console.log(data);
			func.logAlert( data, "info");
		}//end callback()
	});
	
}

//if( p["action"] === "upload"){
if( p["enctype"] === "multipart/form-data"){
	var formData = new FormData( form );
//console.log( formData );
//for( var key in formData){
//console.log(key, formData[key]);
//}

// // Display the key/value pairs
// for (var pair of formData.entries()) {
	// console.log(pair[0]+ ', ' + pair[1]);
// }

// //Display the keys
// for (var key of formData.keys()) {
// console.log(key);
// }
	//add new fields (input, file..)
	formData.append("firstName", "John");
	//let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
	//_getTestImage();

//for test
//_vars["support"]["promiseSupport"] = false;

	if( _vars["support"]["promiseSupport"] ){
		_getTestImage().then( function( imageBlob ){
console.log(arguments);
			formData.append("image", imageBlob, "testImage.png");
			func.runAjax( {
				"requestMethod" : p["requestMethod"],
				//"responseType" : "json",
				"enctype" : p["enctype"],
				"url" : p["url"],
				"params" : params,
				"formData" : formData,
				"callback": function( data, runtime, xhr){
console.log(data);
					func.logAlert( data, "info");
				}//end callback()
			});
		});
		
	} else {
		
		_getTestImageCallBack(function( imageBlob){
console.log(imageBlob);
			formData.append("image", imageBlob, "testImage.png");
			func.runAjax( {
				"requestMethod" : p["requestMethod"],
				//"responseType" : "json",
				"enctype" : p["enctype"],
				"url" : p["url"],
				"params" : params,
				"formData" : formData,
				"callback": function( data, runtime, xhr){
	console.log(data);
					func.logAlert( data, "info");
				}//end callback()
			});
		});
		
	}

}

	
}//end sendForm

function _getTestImage(){
	//return new Promise(resolve => _vars["canvas"].toBlob(resolve, "image/png"));
//https://developer.mozilla.org/ru/docs/Web/API/HTMLCanvasElement/toBlob
	return new Promise(function(resolve, reject){
		_vars["canvas"].toBlob( 	function callback( blobObj){
console.log(arguments);
			resolve( blobObj );
		}, "image/png");
	});
}//end _getTestImage()

function _getTestImageCallBack( callback ){
	_vars["canvas"].toBlob( getBlobObj, "image/png");
	
	function getBlobObj( blobObj){
//console.log(arguments);
		callback( blobObj );
	}		
}//end _getTestImageCallback()
