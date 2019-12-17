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
		_vars.logMsg = "Your browser supports File API";
		func.logAlert( _vars.logMsg, "success");
	} else {
		_vars.logMsg = "Your browser does not support File API";
		func.logAlert( _vars.logMsg, "error");
	}
	
	_vars["log"] = func.getById("log");
	_vars["btnClearLog"] = func.getById("btn-clear-log");
	_vars["formMessage"] = func.getById("message-form");
	_vars["nameLabel"] = func.getById("name-label");
	_vars["messageLabel"] = func.getById("text-message-label");

	_vars["formUpload"] = func.getById("upload-form");
	
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

	var nameElement = "upload_file";
	if( form.elements[ nameElement ] ){
		
		if( _vars["support"].fileAPI ){
			
			var files = form.upload_file.files;
	console.log( files, files.length );
			if( files.length === 0){
				isValid = false;
			}
			
		} else {
				isValid = false;
		}
		
	}

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
	var p = {
		"id": null,
		"creation_date" : "",
		"authorName" : "anonymous",
		"title" : "no subject",
		"textMessage" : "",
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
console.log( p );
	
	//get creation date
	p["creation_date"] = func.timeStampToDateStr({
		"format": "yyyy-mm-dd hh:min:sec"
	});
	
	var params = {
		"action" : p["action"],
		"date" : p["creation_date"]
	};
	
	var formData = {
		"id" : p["id"],
		"author_name" : p["authorName"],
		"title" : p["title"],
		"text_message" : p["textMessage"]
	};
// for(var key in form_message){
// console.log( key, form_message[key]);
// }
//console.log( formData );
//return false;
	
	func.runAjax( {
		"requestMethod" : p["requestMethod"],
		//"responseType" : "json",
		"enctype" : p["enctype"],
		"url" : p["url"],
		"params" : params,
		"formData" : formData,
		"callback": function( data, runtime, xhr){
console.log(data);
		}//end callback()
	});
	
}//end sendForm


		/*
			$("form[name='form_import']").submit(function(e) {
				var formData = new FormData($(this)[0]);
		
				$.ajax({
					url: _vars["requestUrl"],
					type: "POST",
					data: formData,
					async: false,
					success: function (msg) {
						alert(msg);
					},
					error: function(msg) {
						alert('Ошибка!');
					},
					cache: false,
					contentType: false,
					processData: false
				});
				e.preventDefault();
			});
		*/




	function _upload( form ){
		if( window.FileList ){
			
			//var fileSelect = getById("file-select");
			//if( fileSelect ){
			//var formData = _getUploadFiles({
			//"fileSelect" : fileSelect
			//});
			
			//check file type
			var files = form.upload_file.files;
//console.log( files );
			var file = files[0];
			if ( file.type !== "text/xml") {
				var msg = "<p>Skip file, incorrect type! " + file.name +",  " +file.type +"</p>";
				_log("<div class='alert alert-warning'>" + msg + "</div>");
				$("#importModal").modal("hide");
				return false;
			}
			
			//var formData = new FormData();
			var formData = new FormData( form );
			//formData.append("upload_file", form.upload_file);
			//if( formData ){
			var p = {
				"url" : _vars["requestUrl"],
				"requestMethod" : form.getAttribute("method"),
				"enctype" : form.getAttribute("enctype") ? form.getAttribute("enctype") : null,
				"params" : { "action" : "upload" },
				"formData" : formData,
				"callback": _postUpload
			};
			runAjax( p );
			/*
			//test
			var xhr = new XMLHttpRequest();
			xhr.open('POST', _vars["requestUrl"], true);
			// xhr.setRequestHeader("Cache-Control", "no-cache");
			// xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			// xhr.setRequestHeader("Content-Type", "multipart/form-data");
			xhr.send(formData);
			//----------
			*/
			//}
			//}
			
		} else {
			var msg = "<p>Your browser does not support File API</p>";
			_log("<div class='alert alert-warning'>" + msg + "</div>");
		}
		
		
		/*
		//http://blog.teamtreehouse.com/uploading-files-ajax
		//https://developer.mozilla.org/en-US/docs/Web/API/FormData/get
			function _getUploadFiles(opt){
				var p = {
					"fileSelect" : null
				};
				
				//extend options object
				for(var key in opt ){
					p[key] = opt[key];
				}
		//console.log( p );

				if( !p["fileSelect"]){
		var msg = "<p>No selected files</p>";
		_log("<div class='alert alert-warning'>" + msg + "</div>");
					return false;
				}
				// Get the selected files from the input.
				var files = p["fileSelect"].files;
		console.log( files );

				// Create a new FormData object.
				var formData = new FormData();
				
				// Loop through each of the selected files.
				for (var n = 0; n < files.length; n++) {
					var file = files[n];
					
					// Check the file type.
					//if (!file.type.match('image.*')) {
					if ( file.type !== "text/xml") {
		//console.log("Skip file, incorrect type!", file.name, file.type);
						//continue;
					}

					// Add the file to the request.
					formData.append("upload_files[]", file, file.name);
				}//next
		// for( var key in formData){
		// console.log(key, formData[key]);
		// }

		// // Display the key/value pairs
		// for (var pair of formData.entries()) {
			// console.log(pair[0]+ ', ' + pair[1]);
		// }

		// Display the keys
		// for (var key of formData.keys()) {
		   // console.log(key);
		// }
				var test = formData.getAll("upload_files[]");
		//console.log( test.length );
				if( test.length > 0 ){
					//formData.append("action", "upload");
					return formData;
				} else {
					return false;
				}
				
			}//end _getUploadFiles()
		*/
		function _postUpload( data ){
//console.log(arguments);
			parseLog({
				"jsonLog" : data
			});
			$("#importModal").modal("hide");
			loadNotes();
		}//end _postUpload()
		
	}//end _upload()	
