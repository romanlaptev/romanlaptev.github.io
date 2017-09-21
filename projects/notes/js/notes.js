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
		"supportPHP" : false,
		"testUrlPHP": "api/test.php",
		"requestUrl" : "api/notes_mysql.php",
		"exportUrl" : "api/notes_mysql.php?action=export_notes",

		"requestRemoteAjaxUrl" : "http://graphic-art-collection.16mb.com/notes/",
		"xmlUrl" : "upload/notes.xml",

		"supportASPX" : false,
		"testUrlASPX": "api/test.aspx",
		"requestUrlASPX" : "api/notes_mssql.aspx",
		"exportUrlASPX" : "api/notes_mssql.aspx?action=export_notes",

		"supportMSSQL" : false,
		"testUrlMSSQL": "api/test_mssql.aspx",
		"supportMYSQL" : false,
		"testUrlMYSQL": "api/test_mysql.php",
		
		"messages" : getById("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list")
		},
		"messagesList" : getById("messages"),		
		"controlPanel" : getById("control-btn"),
		"hideControlPanel" : false
	};
	
	//correct for remote run
	// if( window.location.hostname === "romanlaptev.github.io"){
		// _vars["requestUrl"] = _vars["requestRemoteAjaxUrl"] + _vars["requestUrl"];
		// var btn_export = getById("btn-export");
		// btn_export.href = _vars["requestUrl"] + "?action=export_notes";
// //console.log( btn_export.href );	
		// _vars["testUrlPHP"] = _vars["requestRemoteAjaxUrl"] + _vars["testUrlPHP"];
	// }
	
//test	
// console.log(_vars["controlPanel"]["children"]);
// for( var key in _vars["controlPanel"]["children"]){
	// var btn = _vars["controlPanel"]["children"][key];
// console.log( key, btn["tagName"], btn["href"] );	
// }

	function _error( id ){
		switch(id){
			case "errorPHP":
				var msg = "<p>test PHP failed, PHP not suppored by server <b>" + window.location.host + "</b>...</p>";
			break
			case "errorASPX":
				var msg = "<p>test ASPX failed, ASP.NET not suppored by server <b>" + window.location.host + "</b>...</p>";
			break
			case "errorMSSQL":
				var msg = "<p>test MSSQL failed, cannot connect to database server...</p>";
			break
		}//end switch()
		_log("<div class='alert alert-danger'>" + msg + "</div>");
	}//end _error()

	var _init = function(){
//console.log("init _notes");
		defineEvents();
		testServer();
	};

	function _getTpl( id ){
		var tpl = getById(id);
		var html = tpl.innerHTML;
		return html;
	}//end _getTpl()
	

	function defineEvents(){
//console.log( _vars.messagesList );

		//ADD NEW NOTE
		document.forms["form_message"].onsubmit = function(e){  
//console.log("Submit form", e, this);
			if( _vars["supportPHP"] ){
				checkForm({
					"form" : this, 
					"modalWindowId" : "#newModal",
					"action" : "save_note"
				});
			} else {
				//_error("errorPHP");
			}
			
			if( _vars["supportASPX"] ){
				checkForm({
					"form" : this, 
					"modalWindowId" : "#newModal",
					"action" : "save_note"
				});
			} else {
				//_error("errorASPX");
			}
			
			return false;
		};//end event

		//EDIT
		$('#editModal').on('show.bs.modal', function (e) {
			var btn = $(e.relatedTarget);
			
			var note_id = btn.data("id");
			$("#message-edit-form input[name=id]").val( note_id );
			
			var title = $("#note-" + note_id + " .title").text();
			$("#message-edit-form input[name=title]").val( title );
			
			var author = $("#note-" + note_id + " .author").text();
			$("#message-edit-form input[name=author_name]").val( author );
			
			var text_message = $("#note-" + note_id + " .text-message").html();
			//var text_message = $("#note-" + note_id + " .text-message").text();
//console.log(text_message, text_message.length );
//filter
			text_message = text_message
.replace(/<!-- \[br\] --><br>/g, "[br]")
.replace(/<pre><!-- \[code\] -->/g, "[code]")
.replace(/<!-- \[\/code\] --><\/pre>/g, "[/code]")
.replace(/\&amp;/g, "&")
.replace(/\&lt;/g, "<")
.replace(/\&gt;/g, ">");
			$("#message-edit-form textarea[name=text_message]").val( text_message.trim() );
			
		});//end event
		
		$("#message-edit-form").on("submit", function(){
			//var error = false;
			// $("#message-edit-form .test").each(function(){
				// if ( $.trim( $(this).val() ).length === 0) {
					// error = true;
					// $(this).addClass("alert-danger");
				// }
			// });

			// if (!error){
				// sendForm( formValues );
				// $("#editModal").modal("hide");
			// } else{
				// //e.preventDefault();
	// var msg = "<p>error in form..</p>";
	// _log("<div class='alert alert-warning'>" + msg + "</div>");
			// }	
			if( _vars["supportPHP"] ){
				checkForm({
					"form" : this, 
					"modalWindowId" : "#editModal",
					"action" : "edit_note"
				});
			} else {
				
				if( _vars["supportASPX"] ){
					if( _vars["supportMSSQL"] ){
						checkForm({
							"form" : this, 
							"modalWindowId" : "#editModal",
							"action" : "edit_note"
						});
					}
				}

			}
			
			return false;
		});//end event
		
		
		//UPLOAD
		document.forms["form_import"].onsubmit = function(e) {
			e.preventDefault();
			if( _vars["supportPHP"] ){
				_upload( document.forms["form_import"] );
			} else {
				//_error("errorPHP");
			}
			if( _vars["supportASPX"] ){
				_upload( document.forms["form_import"] );
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
		//DELETE NOTE
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
								if( parseStr.indexOf("delete_note") !== -1){
										var p = parseStr.split("-");
										serviceAction({
											"action" : p[0],
											"id": p[1]
										}, 
										function(){
											loadNotes();
										});
								}
							} else {
		// console.log( "Warn! error parse url in " + target.href );
							}
					}
				}
				
			}//end event
		}
		
		//CLEAR LOG
		var btn_clear_log = getById("clear-log");
		if( btn_clear_log ){
			btn_clear_log.onclick = function(e){
				var log = getById("log");
				log.innerHTML = "";
				return false;
			}
		}

		//REMOVE ALL NOTES, REFRESH TABLES
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
									}, 
									function(){
										loadNotes();
									});
									
							} else {
		// console.log( "Warn! error parse url in " + target.href );
							}
					}
				}

			}//end event
		}
		
		//IMPORT
		var btn_import = getById("btn-import");
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
					loadNotes();
					$("#importModal").modal("hide");
				});
				
			}//end event
		}
		
		//EXPORT
		var btn_export = getById("btn-export");
		if( btn_export ){
			btn_export.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}
				
				if( _vars["supportPHP"] ){
					var url= _vars["exportUrl"];
					window.location.assign(url);
				} else {
					//_error("errorPHP");
				}
				
				if( _vars["supportASPX"] ){
					var url= _vars["exportUrlASPX"];
					window.location.assign(url);
				} else {
					_error("errorASPX");
				}

			}//end event
		}
		
	}//end defineEvents()
	
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
	
	
	function checkForm(opt){
		var p = {
			"form" : null,
			"modalWindowId" : "", 
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
//filter

			text = text
			//.replace(/'/g, "&#39;")
			//.replace(/\n/g, "\\u000A")//replace end of line
			//.replace(/\r/g, "\\r")//replace end of line (for correct JSON parsing)
			//.replace(/\n/g, "\\n")//replace end of line (for correct JSON parsing)
			
			.replace(/\&amp;/g, "&")
			.replace(/\&lt;/g, "<")
			.replace(/\&gt;/g, ">")
			
			.replace(/&/g, "&amp;")
			.replace(/"/g, "&quot;")
			.replace(/\</g, "&lt;")
			.replace(/\>/g, "&gt;");

			formValues["textMessage"] = text;
		}
		
		if( form.elements.id && form.elements.id.value.length > 0){
			formValues["id"] = form.elements.id.value;
		}
		
		if (isValid){
			sendForm( formValues );
			$( p["modalWindowId"] ).modal("hide");
		} else{
			//e.preventDefault();
var msg = "<p>error in form..</p>";
_log("<div class='alert alert-warning'>" + msg + "</div>");
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
//console.log( p );

		//get creation date
		var now = new Date();
		var sYear = now.getFullYear();
		var sMonth = now.getMonth();
		var intMonth = parseInt( sMonth ) + 1;
		var sDate = now.getDate();
		var d = sYear + "-" + intMonth + "-" + sDate;
		
		var sHours = now.getHours();		
		var sMin = now.getMinutes();		
		var sSec = now.getSeconds();		
		var tm = sHours + ":" + sMin + ":" + sSec;
//console.log(d, tm);
		
		//var t = now.toTimeString();
	//console.log(d, t);
		p["creation_date"] = d +" "+ tm;
		
		//remove GMT (MSSQL error convert data)
		//2017-9-5 10:27:47 GMT+0700
		//var d = p["creation_date"].split("GMT");
		//p["creation_date"] = d[0];
		
		var url = p["url"];
		var params = {
			"action" : p["action"],
			"date" : p["creation_date"]
		};
		
		// if(typeof FormData === "undefined"){
// var msg = "<p>This browser not support object FormData! send (ajax) form data not possible... </p>";
// _log("<div class='alert alert-error'>" + msg + "</div>");
			// return false;
		// }
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

		runAjax( {
			"requestMethod" : p["requestMethod"], 
			"enctype" : p["enctype"],
			"url" : url, 
			"params" : params,
			//"formData" : new FormData( form_message ),
			"formData" : formData,
			"callback": function( log ){
				
// var msg = "<p>"+log+"</p>";
				// var _className = "alert-success";
				// if( log.indexOf("error") !== -1){
					// _className = "alert-danger";
				// }
// _log("<div class='alert " +_className+ "'>" + msg + "</div>");
				// loadNotes();
				parseLog({
					"jsonLog" : log,
					//"onSuccess" : function(){},
					//"onError" : function( errorCode ){},
					"callback" : function(){
						loadNotes();		
					}//end callback
				});	
				
			}//end callback()
		});

	}//end sendForm

	
	function testServer(){
		//start chain of tests
		_test({
			"nameTargetVar" : "supportPHP",
			"errorMsgID" : "errorPHP",
			"url" : _vars["testUrlPHP"],
			"testResult" : "4",//test success, result of adding 2+2 on PHP, string format!!!!
			"callback" : function(res){
				if( res ){
					loadNotes();
				} else {
					_testASPX();
				}
			}
		});

		function _testASPX(){
			_test({
				"nameTargetVar" : "supportASPX",
				"errorMsgID" : "errorASPX",
				"url" : _vars["testUrlASPX"],
				"testResult" : "4",//test success, result of adding 2+2, string format!!!!
				"callback" : function(res){
					if( res ){
var msg = "<p>test ASPX success, ASP.NET suppored by server <b>" + window.location.host + "</b></p>";
_log("<div class='alert alert-success'>" + msg + "</div>");
						//_vars["requestUrl"] = _vars["requestUrlASPX"];
						//loadNotes();
						_testMSSQL();
					} else {
						loadNotesXml();
					}
				}
			});
		}//end _testASPX()
		
		function _test( opt){
			var p = {
				"nameTargetVar" : 0,// name of target global var, true or false, requered parameter
				"url" : 0,//requered parameter
				"errorMsgID" : 0,//requered parameter
				"testResult" : 0,//requered parameter
				"callback": 0//requered parameter
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
	
			//test requered parameters
			for(var key in p ){
				if( p[key] === 0 ){
var msg = "<p>error, testServer(), not find requered arguments " + key +"</p>";
_log("<div class='alert alert-danger'>" + msg + "</div>");
					return false;
				}
			}
			
			var nameVar = p["nameTargetVar"];

			runAjax({
				"requestMethod" : "GET", 
				"url" : p["url"], 
				"onError" : _onerror,
				"callback": function( data ){
//console.log(data, typeof data, data.length, data[0]);
//console.log("data = " + data);
//console.log("data[0] = " + typeof data[0]);
//console.log("data.charAt(0) = " + data.charAt(0));

						if( !data || data.length === 0){
console.log("error in test(), not find 'data'.... ");			
							data = [];
							return false;
						}

						var test = data[0];
						if(!test){//fix IE, not support data[0]
							test = data.charAt(0);
						}
//console.log("test = " + test);

						if (test === p["testResult"]){//test success (result of adding 2+2 for PHP)
							_vars[nameVar] = true;
						} else {
							_error( p["errorMsgID"] );
						}
						
						if( typeof p["callback"] === "function"){
							p["callback"]( _vars[nameVar] );
							return false;
						} 
				}//end callback
			});

			function _onerror( xhr ){
				var all_headers = xhr.getAllResponseHeaders();
console.log( all_headers );
					if( typeof p["callback"] === "function"){
						_error( p["errorMsgID"] );
						p["callback"]( false );
					} 
			}//end _onerror()
			
		}//end _test()
		
		// function testPHP_headers(opt){
			// var p = {
				// "success": null,
				// "fail" : null
			// };
			// //extend options object
			// for(var key in opt ){
				// p[key] = opt[key];
			// }
	// //console.log(p);
			
			// //get server info
			// runAjax( {
				// "requestMethod" : "HEAD", 
				// "url" : _vars["requestUrl"], 
				// //"callback": function( data ){},
				// //"onError" : _onerror,
				// "onLoadEnd" : _onloadend
			// });
			
			// //function _onerror( xhr ){
			// //}//end _onerror()
			
			// function _onloadend( headers ){
				// var headersArr = [];
				// headersArr["items"] = [];
				// headersArr["lines"] = headers.split("\r\n");
				// for( var n = 0; n < headersArr["lines"].length; n++){
					// var header = headersArr["lines"][n];
					// if(header.length > 0){
						// var sp = header.split(": ");
						// var _key = sp[0].toUpperCase();
						// var _value = sp[1];
						// headersArr["items"][_key] = _value;
					// }
				// }//next
				// delete headersArr["lines"];
	// console.log(headersArr);

				// //test PHP support
				// if( headersArr["items"]["X-POWERED-BY"] &&
					// headersArr["items"]["X-POWERED-BY"].indexOf("PHP") !== -1
				// ){
					// if( typeof p["success"] === "function"){
						// p["success"]();
					// }
				// } else {
					// _error("errorPHP");
					// if( typeof p["fail"] === "function"){
						// p["fail"]();
					// }
				// }

	// Connection	"Keep-Alive"
	// Content-Encoding	"gzip"
	// Content-Length	"1483"
	// Content-Type	"text/html"
	// Date	"Tue, 29 Aug 2017 04:00:31 GMT"
	// Keep-Alive	"timeout=5, max=99"
	// Server	"Apache/2.2.22 (Debian)"
	// Vary	"Accept-Encoding"
	// X-Powered-By	"PHP/5.4.4-14+deb7u8"

	// Access-Control-Allow-Origin	"*"
	// Cache-Control	"private"
	// Content-Length	"10209"
	// Content-Type	"text/html; charset=utf-8"
	// Date	"Tue, 29 Aug 2017 04:21:35 GMT"
	// Server	"Microsoft-IIS/7.5"
	// X-Powered-By	"ASP.NET"

			// }//end _onloadend()
			
		// }//end testPHP_headers()

		function _testMSSQL(){
			runAjax({
				"requestMethod" : "GET", 
				"url" : _vars["testUrlMSSQL"], 
				"onError" : _onerror,
				"callback": function( data ){
console.log(data, typeof data, data.length);
					// try{
						// var jsonObj = JSON.parse( data, function(key, value) {
// //console.log( key, value );
							// return value;
						// });							
// //console.log( jsonObj, jsonObj.length, jsonObj[0]["error_code"] );

						// if( jsonObj.length === 1){
							// if( jsonObj[0]["error_code"] === "0"){
								// _vars["supportMSSQL"] = true;
								// _vars["requestUrl"] = _vars["requestUrlASPX"];
								// loadNotes();
							// } else {
// var msg = "";
// msg += "<p>error!</p>";
// msg += "<p>data: " + data + "</p>";
// _log("<div class='alert alert-danger'>" + msg + "</div>");
								// loadNotesXml();
							// }
						// } else {
// console.log( jsonObj, jsonObj.length );
						// }
						
						
					// } catch(error) {
// var msg = "";
// msg += "<p>error  JSON.parse server response data</p>";
// msg += "<p>" + error + "</p>";
// msg += "<p>data: " + data + "</p>";
// _log("<div class='alert alert-danger'>" + msg + "</div>");
						// loadNotesXml();
					// }//end catch
					parseLog({
						"jsonLog" : data,
						"onSuccess" : function(){
							_vars["supportMSSQL"] = true;
							_vars["requestUrl"] = _vars["requestUrlASPX"];
							loadNotes();		
						},
						"onError" : function( errorCode ){
console.log(errorCode);
							_error("errorMSSQL");
							loadNotesXml();
						}//,
						//"callback" : function(){
						//}//end callback
					});	

				}//end callback
			});

			function _onerror( xhr ){
				var all_headers = xhr.getAllResponseHeaders();
console.log( all_headers );
					// if( typeof p["callback"] === "function"){
						// _error( p["errorMsgID"] );
						// p["callback"]( false );
					// } 
			}//end _onerror()
			
		}//end _testMSSQL()
		
	}//end testServer()
	
	
	function loadNotes(){
//console.log( _vars["templates"] );
		_vars["messagesList"].innerHTML = "";
//_log("<p>-- loadNotes(), clear #messagesList</p>");

		//block overlay and wait window
		// var overlay = getById("overlay");
		// if( overlay ){
			// overlay.className="modal-backdrop in";
			// overlay.style.display="block";
		// }
		// var waitWindow = getById("wait-window");
		// if( waitWindow ){
			// waitWindow.className="modal-dialog";
			// waitWindow.style.display="block";
		// }
		
		var params = {
			"action" : "get_notes"
		};
		runAjax( {
			//"async" :  false,
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			"params" : params,
			"onError" : _onerror,
			"callback": function( data ){
//console.log(data.length, typeof data, data);				

				// //hide block overlay and wait window
				// if( overlay ){
					// //overlay.className="";
					// overlay.style.display="none";
				// }
				// if( waitWindow ){
					// waitWindow.style.display="none";
				// }
				
				if( data.length > 0){
						try{
							var jsonArr = JSON.parse( data, function(key, value) {
//console.log( key, value );
								return value;
							});							
//console.log( jsonArr, jsonArr.length, jsonArr[0]["error_code"] );
							if( !jsonArr[0]["error_code"] ){
								_drawNotes({
									"data": jsonArr
								});
							} else {
								parseLog({
									"jsonLog" : data, 
									"callback" : function(){
//console.log( jsonArr, jsonArr.length, jsonArr[0]["error_code"] );
									}
								});
							}
							
						} catch(error) {
var msg = "";
msg += "<p>loadNotes(), error  JSON.parse server response data</p>";
msg += "<p>" + error + "</p>";
msg += "<p>data: " + data + "</p>";
_log("<div class='alert alert-danger'>" + msg + "</div>");
							//loadNotesXml();
						}//end catch

				} else {
					_vars["messagesList"].innerHTML = "<h2>no added notes</h2>";
				}
				
			}//end callback()
		});

		function _onerror( xhr ){
			var all_headers = xhr.getAllResponseHeaders();
console.log( all_headers );
var msg = "";
msg += "<p>error load notes, url: "+_vars["requestUrl"]+"</p>";
_log("<div class='alert alert-danger'>" + msg + "</div>");
			loadNotesXml();
		}//end _onerror()
		
	}//end loadNotes()

	function loadNotesXml(){
		
		//hide CONTROL PANEL
		$("#control-btn").children("div").hide();
		_vars["hideControlPanel"]=true;
		
		_vars["messagesList"].innerHTML = "";
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["xmlUrl"], 
			"callback": function( data ){
//console.log(data.length, typeof data, data);				
				//_parseXML( data );
				obj = _parseXmlToObj(data);
//console.log(obj);				
				_drawNotes({
					"data": obj
				});
			},//end callback()
			"onError" : _onerror
		});
		
		function _onerror( xhr ){
var msg = "";
msg += "<p>error, " +_vars["xmlUrl"]+ " not found by server <b>" + window.location.host + "</b></p>";
_log("<div class='alert alert-danger'>" + msg + "</div>");
		}//end _onerror()
		
	}//end loadNotesXml()
	
	function _drawNotes( opt ){
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
			// if( items["text_message"] ){
				items["text_message"] = __filter( items["text_message"] );
			// } else {
				
				// if( items["text"] ){
					// items["text_message"] = __filter( items["text"] );
				// }
				
			// }
			
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
		
		//hide EDIT, DELETE btn
		if( _vars["hideControlPanel"] ){
			$(".btn-delete-note, .btn-edit-note").hide();			
		}
		
//filter
		function __filter(textMessage){
//console.log(textMessage);
			if( textMessage.length === 0){
console.log("error in __filter()");
				return false;
			}
			textMessage = textMessage
//.replace(/&/g, "&amp;")
//.replace(/"/g, "&quot;")
.replace(/\</g, "&lt;")
.replace(/\>/g, "&gt;")
.replace(/\[code\]/g, "<pre><!-- [code] -->")
.replace(/\[\/code\]/g, "<!-- [/code] --></pre>")
.replace(/\[br\]/g, "<!-- [br] --><br>");

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
			
			return textMessage.trim();
		}//end __filter()
		
	}//end _drawNotes()
	
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
		if( _vars["supportPHP"] ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : _vars["requestUrl"], 
				"params" : p,
				"callback": /*function( log ){
	var msg = "<p>"+log+"</p>";
	_log("<div class='alert alert-success'>" + msg + "</div>");
					loadNotes();
					if( typeof callback === "function"){
						callback();
					}
				}//end callback()*/ _postFunc
			});
		} else {
			//_error("errorPHP");
		}
		
		if( _vars["supportASPX"] ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : _vars["requestUrl"], 
				"params" : p,
				"callback": _postFunc
			});
		} else {
			//_error("errorASPX");
		}
		
		function _postFunc( data ){
			parseLog({
				"jsonLog" : data 
			});
			//loadNotes();
			if( typeof callback === "function"){
				callback();
			}
		}//end _postFunc()
		
	}//end seviceAction

	function parseLog( opt ){
		var p = {
			"jsonLog" : "",
			"onError": null,
			"onSuccess": null,
			"callback" : null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}	
//console.log( p );
		
		if( p["jsonLog"].length === 0){
var msg = "Warning! empty log....";
console.log(msg);
			p["jsonLog"] = "[{\"message\" : \""+msg+"\"}]";
		}
		
		try{
			var jsonArr = JSON.parse( p["jsonLog"], function(key, value) {
	//console.log( key, value );
				return value;
			});							
	//console.log( jsonArr, jsonArr.length);

			// if( jsonArr.length === 1){
				
				// var jsonObj = jsonArr[0];
	// //console.log( jsonObj, jsonObj["error_code"], jsonObj["error_code"].length);
				// var msg = "<p>" +jsonObj["message"]+ "</p>";
				
				// if( jsonObj["error_code"] && jsonObj["error_code"].length > 0 ){
					// msg += "<p>error code: " +jsonObj["error_code"]+ "</p>";
					// _log("<div class='alert alert-danger'>" + msg + "</div>");
				// } else {
					// _log("<div class='alert alert-success'>" + msg + "</div>");
					// loadNotes();		
				// }
				
			// } else {
	// console.log( jsonArr, jsonArr.length );
			// }
			
			var errorCode = 0;
			for( var n = 0; n < jsonArr.length; n++){
				var jsonObj = jsonArr[n];
//console.log( jsonObj );

				var msg = "<p>" +jsonObj["message"]+ "</p>";
				var _className = "alert-success";
				
				if( jsonObj["error_code"] && jsonObj["error_code"].length > 0 ){
					if( jsonObj["error_code"] !== "0"){
						msg += "<p>error code: " +jsonObj["error_code"]+ "</p>";
						_className = "alert-danger";
						//displayNotes = false;
						errorCode = jsonObj["error_code"];
					}
				}
				
				_log("<div class='alert "+_className+" '>" + msg + "</div>");
			}//next
			
//console.log(errorCode);			

			if( errorCode !== 0){
				if( typeof p["onError"] === "function"){
					p["onError"]( errorCode );
				}
			} else {
				if( typeof p["onSuccess"] === "function"){
					p["onSuccess"]();
				}
			}
			
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			
		} catch(error) {
	var msg = "";
	msg += "<p>error JSON.parse server response data</p>";
	msg += "<p>" + error + "</p>";
	msg += "<p>data: " + p["jsonLog"] + "</p>";
	_log("<div class='alert alert-danger'>" + msg + "</div>");
			//loadNotesXml();
		}//end catch
	
	}//end parseLog()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		}
	};
	
}//end _notes()
