window.onload = function(){
	var webNotes = _notes();
console.log( webNotes );	
	webNotes.init();
}//end load

$(document).ready(function(){
	$("input[type=file]").bootstrapFileInput();
});//end ready	

var _notes = function ( opt ){
//console.log(arguments);	
	var _vars = {
		"requestUrl" : "api/notes_mysql.php",
		"requestRemoteUrl" : "http://graphic-art-collection.16mb.com/notes/api/notes_mysql.php",
		"messages" : getDOMobj("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list")
		},
		"messagesList" : getDOMobj("messages"),		
		"controlPanel" : getDOMobj("control-btn")
	};
	
	//correct for remote run
	if( window.location.hostname === "romanlaptev.github.io"){
		_vars["requestUrl"] = _vars["requestRemoteUrl"];
		var btn_export = getDOMobj("btn-export");
		btn_export.href = _vars["requestRemoteUrl"] + "?action=export_notes";
//console.log( btn_export.href );	
	}
//test	
// console.log(_vars["controlPanel"]["children"]);
// for( var key in _vars["controlPanel"]["children"]){
	// var btn = _vars["controlPanel"]["children"][key];
// console.log( key, btn["tagName"], btn["href"] );	
// }

	var _init = function(){
//console.log("init _notes");
		defineEvents();
		loadMessages();
	};

	function _getTpl( id ){
		var tpl = getDOMobj(id);
		var html = tpl.innerHTML;
		return html;
	}//end _getTpl()
	

	function defineEvents(){
//console.log( _vars.messagesList );

		document.forms["form_message"].onsubmit = function(e){  
//console.log("Submit form", e, this);
			_checkForm(this);
			return false;
		};//end event
		

		form_import.onsubmit = function(e) {
			var form = form_import;
			e.preventDefault();
			
			if( window.FileList ){
				
				//var fileSelect = getDOMobj("file-select");
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

		};//end event

		
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
	
		if( _vars.messagesList ){
			_vars.messagesList.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
// //console.log( this );//page-container
// //console.log( target.tagName );
// //console.log( event.eventPhase );
// //console.log( "preventDefault: " + event.preventDefault );
				// //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
				// //event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
				
				if( target.tagName === "A"){
					if ( target.href.indexOf("#") !== -1){
						
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							var search = target.href.split("#"); 
							var parseStr = search[1]; 
//console.log( search, parseStr );
							if( parseStr.length > 0 ){
								if( parseStr.indexOf("edit_note") !== -1 ||
									parseStr.indexOf("delete_note") !== -1){
										var p = parseStr.split("-");
										serviceAction({
											"action" : p[0],
											"id": p[1]
										});
								}
							} else {
		// console.log( "Warn! error parse url in " + target.href );
							}
					}
				}
				
			}//end event
		}
		
		var btn_clear_log = getDOMobj("clear-log");
		if( btn_clear_log ){
			btn_clear_log.onclick = function(e){
				var log = getDOMobj("log");
				log.innerHTML = "";
				return false;
			}
		}

		if( _vars.controlPanel ){
			_vars.controlPanel.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
				if( target.tagName === "A"){
					if ( target.href.indexOf("#") !== -1){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							var search = target.href.split("#"); 
							var parseStr = search[1]; 
//console.log( search, parseStr );
							if( parseStr.length > 0 ){
									var p = parseStr.split("-");
//console.log( p );
									serviceAction({
										"action" : p[0],
										"id": p[1]
									});
									
							} else {
		// console.log( "Warn! error parse url in " + target.href );
							}
					}
				}

			}//end event
		}
		
		var btn_import = getDOMobj("btn-import");
		if( btn_import ){
			btn_import.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}
				serviceAction({"action" : "import_notes"}, function(){
					$("#importModal").modal("hide");
				});
				
			}//end event
		}
		
	}//end defineEvents()
	
	function _checkForm(form){
//console.log(form);
	//for(var key in form){
	//console.log(key, form[key]);
	//}
	//	for( var n = 0; n < form.elements.length; n++){
	//console.log(form.elements[n]);
	//	}//next

		var formValues = {
			"requestMethod" : form.getAttribute("method"),
			"enctype" : form.getAttribute("enctype") ? form.getAttribute("enctype") : null
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
		
		var title = form.elements.title.value;
		if( title.length > 0){
			formValues["title"] = title;
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
			$("#newModal").modal("hide");
		} else{
			//e.preventDefault();
var msg = "<p>error in form..</p>";
_log("<div class='alert alert-warning'>" + msg + "</div>");
		}	
		return false;
		
	}//end _checkForm()	
	
	function sendForm( opt ){
		var p = {
			"creation_date" : "",
			"authorName" : "anonymous",
			"title" : "no subject",
			"textMessage" : "",
			"action": "save_note",
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

		var url = p["url"];
		var params = {
			"action" : p["action"],
			"date" : p["creation_date"]
		};
		
		if(typeof FormData === "undefined"){
var msg = "<p>This browser not support object FormData! send (ajax) form data not possible... </p>";
_log("<div class='alert alert-error'>" + msg + "</div>");
			return false;
		}
		
		runAjax( {
			"requestMethod" : p["requestMethod"], 
			"enctype" : p["enctype"],
			"url" : url, 
			"params" : params,
			"formData" : new FormData( form_message ),
			"callback": function( log ){
				
var msg = "<p>"+log+"</p>";
				var _className = "alert-success";
				if( log.indexOf("error") !== -1){
					_className = "alert-danger";
				}
_log("<div class='alert " +_className+ "'>" + msg + "</div>");
				loadMessages();
			}//end callback()
		});

	}//end sendForm

	function loadMessages(){
//console.log( _vars["templates"] );

		// var data = [];
		// data.push({
			// "textMessage": "test1",
			// "authorName" : "author1"
		// });
		// data.push({
			// "textMessage": "test2",
			// "authorName" : "author2"
		// });
		// data.push({
			// "textMessage": "test3",
			// "authorName" : "author3"
		// });
		
		_vars["messagesList"].innerHTML = "";
//_log("<p>-- loadMessages(), clear #messagesList</p>");

		var params = {
			"action" : "get_notes"
		};
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			"params" : params,
			"callback": function( data ){
//console.log(data.length, typeof data, data);				

				if( data.length > 0){
						try{
							var jsonObj = JSON.parse( data, function(key, value) {
//console.log( key, value );
								return value;
							});							
//console.log( jsonObj );

							_insertMessages({
								"data": jsonObj
							});
						} catch(error) {
var msg = "";
msg += "<p>error in server response data</p>";
msg += "<p>" + error + "</p>";
//msg += "<p>" + data + "</p>";
_log("<div class='alert alert-danger'>" + msg + "</div>");
						}//end catch

				} else {
					_vars["messagesList"].innerHTML = "<h2>no added notes</h2>";
				}
				
			}//end callback()
		});
		
	}//end loadMessages()

	function _insertMessages( opt ){
		var p = {
			"templateID": "tpl-message-list",
			"data" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
		var templateID = p["templateID"];
		//var html = _vars["templates"][templateID];
		//html = html.replace("{{textMessage}}", p["data"][0]["textMessage"] );
		//_vars["messages"].innerHTML = html;
		
		var listHtml = "";
		var itemHtml = "";
		for( var n= 0; n < p["data"].length; n++){
			
			itemHtml = _vars["templates"][ templateID];
			var items = p["data"][n];
			
			//filter text message
			items["text_message"] = __filter( items["text_message"] );
			
			for( var key in items){
//console.log(key, items[key]);
				if( itemHtml.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, items[key]);
					var key2 = "{{"+key+"}}";
					itemHtml = itemHtml.replace(new RegExp(key2, 'g'), items[key]);
				}
			}//next
			listHtml += itemHtml;
//console.log(listHtml);
			
		}//next
		
		_vars["messages"].innerHTML = listHtml;

		function __filter(textMessage){
//console.log(textMessage);
			textMessage = textMessage
.replace(/\[code\]/g, "<pre>")
.replace(/\[\/code\]/g, "</pre>")
.replace(/\[br\]/g, "<br/>");

			//var test = "[[http://www.google.com|Это ссылка на Google]]";
			var regexp = /\[\[(.*?)\]\]/g;
			var links = [];
			links["nowrap"] = [];
			while( result = regexp.exec( textMessage )){
			//console.log(result[1]);
				links["nowrap"].push( result[1] );
			}

			if( links["nowrap"].length > 0){
				links["html"] = [];
				for(var n = 0; n < links["nowrap"].length; n++){
					var link = links["nowrap"][n];
					var _sp = link.split("|");
			//console.log(link, _sp);
					var _url = _sp[0];
					var _text = _sp[1];
					links["html"].push("<a href='"+_url+"'>"+_text+"</a>");
				}//next
				
				for(var n = 0; n < links["nowrap"].length; n++){
					var linkText = links["nowrap"][n];
					var linkHtml = links["html"][n];
					textMessage = textMessage.replace("[["+linkText+"]]", linkHtml);
				}//next
			}
//console.log(links);
			
			return textMessage;
		}//end __filter()
		
	}//end _insertMessages()
	
	function serviceAction(opt, callback){
		var p = {
			"action" : ""//,
			//"id" : null
		};
		
		//extend parameters object
		for(var key in opt ){
			p[key] = opt[key];
		}

		// if( p["action"] === "export_notes"){
// console.log( window.location );
			// window.location = window.location + "?action="+p["action"];
			// return;
		// }
		
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			"params" : p,
			"callback": function( log ){
var msg = "<p>"+log+"</p>";
_log("<div class='alert alert-success'>" + msg + "</div>");
				loadMessages();
				if( typeof callback === "function"){
					callback();
				}
			}//end callback()
		});
		
	}//end seviceAction

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
	function _postUpload(log){
console.log(arguments);		
		var msg = "<p>"+log+"</p>";
		var _className = "alert-success";
		if( log.indexOf("error") !== -1){
			_className = "alert-danger";
		}
		_log("<div class='alert " +_className+ "'>" + msg + "</div>");

		$("#importModal").modal("hide");
		loadMessages();		
	}//end _posrtUpload()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		}
	};
	
}//end _notes()
