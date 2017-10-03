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
		
		"requestUrl" : "upload/notes.xml",
		"exportUrl" : "",
		"requestRemoteAjaxUrl" : "http://graphic-art-collection.16mb.com/notes/",

		"tests" : [{
				"name" : "checkPHP",
				"url" : "api/test.php",
				"successMsg" : "test PHP success, suppored by server <b>" + window.location.host + "</b>...",
				"errorMsg" : "test PHP failed, PHP not suppored by server <b>" + window.location.host + "</b>...",
				"callback" : function(res){
					
						_vars["supportPHP"] = false;
						if( res[0] === "4" ){
							
							_vars["supportPHP"] = true;
							
							var msg = this["successMsg"];
							_log("<div class='alert alert-success'>" + msg + "</div>");
						} else {
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
						}
					}//end callback
				}, //end test
				
				{
				"name" : "checkMySQL",
				"url" : "api/test_mysql.php",
				"successMsg" : "test local MySQL success...",
				"errorMsg" : "test local MySQL failed, cannot connect to database server...",
				"callback" : function(res){
//console.log(res, typeof res);					
						_vars["supportMySQL"] = false;
						
						if( typeof res !== "string"){
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
							return;
						}

						parseLog({
							"successMsg" : this["successMsg"],
							"errorMsg" : this["errorMsg"],
							"jsonLog" : res,
							"onSuccess" : function(){
								_vars["supportMySQL"] = true;
								var msg = this["successMsg"];
								_log("<div class='alert alert-success'>" + msg + "</div>");
							},
							"onError" : function( errorCode  ){
//console.log(errorCode);
								var msg = this["errorMsg"];
								msg += ", "+errorCode;
								_log("<div class='alert alert-danger'>" + msg + "</div>");
							}//,
							//"callback" : function(){
							//}//end callback
						});	
					
					}//end callback
				}, //end test

				{
				"name" : "checkPostgreSQL",
				"url" : "api/test_postgresql.php",
				"successMsg" : "test local PostgreSQL success...",
				"errorMsg" : "test local PostgreSQL failed, cannot connect to database server...",
				"callback" : function(res){
//console.log(res, typeof res);					
						_vars["supportPostgreSQL"] = false;
						
						if( typeof res !== "string"){
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
							return;
						}

						parseLog({
							"successMsg" : this["successMsg"],
							"errorMsg" : this["errorMsg"],
							"jsonLog" : res,
							"onSuccess" : function(){
								_vars["supportPostgreSQL"] = true;
								var msg = this["successMsg"];
								_log("<div class='alert alert-success'>" + msg + "</div>");
							},
							"onError" : function( errorCode  ){
								var msg = this["errorMsg"];
								msg += ", "+errorCode;
								_log("<div class='alert alert-danger'>" + msg + "</div>");
							}//,
							//"callback" : function(){
							//}//end callback
						});	
					
					}//end callback
				}, //end test

				{
				"name" : "checkASPX",
				"url" : "api/test.aspx",
				"successMsg" : "test ASPX success, suppored by server <b>" + window.location.host + "</b>...",
				"errorMsg" : "test ASPX failed, ASP.NET not suppored by server <b>" + window.location.host + "</b>...",
				"callback" : function(res){
					
						_vars["supportASPX"] = false;
						if( res[0] === "4" ){
							
							_vars["supportASPX"] = true;

							var msg = this["successMsg"];
							_log("<div class='alert alert-success'>" + msg + "</div>");
						} else {
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
						}
					}//end callback
				}, //end test
				
				{
				"name" : "checkMSSQL",
				"url" : "api/test_mssql.aspx",
				"successMsg" : "test MSSQL success...",
				"errorMsg" : "test MSSQL failed, cannot connect to database server...",
				"callback" : function(res){
//console.log(res);					
						_vars["supportMSSQL"] = false;
						parseLog({
							"successMsg" : this["successMsg"],
							"errorMsg" : this["errorMsg"],
							"jsonLog" : res,
							"onSuccess" : function(){
								_vars["supportMSSQL"] = true;
								var msg = this["successMsg"];
								_log("<div class='alert alert-success'>" + msg + "</div>");
							},
							"onError" : function( errorCode ){
//console.log(errorCode);
								var msg = this["errorMsg"];
								msg += ", error code: "+errorCode;
								_log("<div class='alert alert-danger'>" + msg + "</div>");
							}//,
							//"callback" : function(){
							//}//end callback
						});	
					
					}//end callback
				}, //end test

				{
				"name" : "checkJAVA",
				"url" : "api/test_java.jsp",
				"successMsg" : "test JAVA success, suppored by server <b>" + window.location.host + "</b>...",
				"errorMsg" : "test JAVA failed, not suppored by server <b>" + window.location.host + "</b>...",
				"callback" : function(res){
//console.log("res", res.charAt(0) );
						if( res[0] === "4" ){
							_vars["supportJAVA"] = true;
							var msg = this["successMsg"];
							_log("<div class='alert alert-success'>" + msg + "</div>");
						} else {
							_vars["supportJAVA"] = false;
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
						}
					}//end callback
				}, //end test
				{
				"name" : "checkMySQL_java",
				"url" : "api/test_mysql.jsp",
				"successMsg" : "test local MySQL success...",
				"errorMsg" : "test local MySQL failed, cannot connect to database server...",
				"callback" : function(res){
console.log(res, typeof res);					
						
						_vars["supportMySQL_java"] = false;
						if( typeof res !== "string"){
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
							return;
						}

						parseLog({
							"successMsg" : this["successMsg"],
							"errorMsg" : this["errorMsg"],
							"jsonLog" : res,
							"onSuccess" : function(){
								_vars["supportMySQL_java"] = true;
								var msg = this["successMsg"];
								_log("<div class='alert alert-success'>" + msg + "</div>");
							},
							"onError" : function( errorCode  ){
console.log(errorCode);
								var msg = this["errorMsg"];
								msg += ", "+errorCode;
								_log("<div class='alert alert-danger'>" + msg + "</div>");
							}//,
							//"callback" : function(){
							//}//end callback
						});	
					
					}//end callback
				} //end test
				
		],//end tests
		
		"messages" : getById("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list")
		},
		"messagesList" : getById("messages"),		
		"controlPanel" : getById("control-btn"),
		"hideControlPanel" : false,
		"$num_notes" : getById("num-notes")
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

	// function _error( id ){
		// switch(id){
			// case "errorPHP":
				// var msg = "<p>test PHP failed, PHP not suppored by server <b>" + window.location.host + "</b>...</p>";
			// break
			// case "errorASPX":
				// var msg = "<p>test ASPX failed, ASP.NET not suppored by server <b>" + window.location.host + "</b>...</p>";
			// break
			// case "errorMSSQL":
				// var msg = "<p>test MSSQL failed, cannot connect to database server...</p>";
			// break
		// }//end switch()
		// _log("<div class='alert alert-danger'>" + msg + "</div>");
	// }//end _error()

	var _init = function(){
//console.log("init _notes");
		defineEvents();
		var startNumTest = 0;
		testServer( startNumTest );
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
			
			var $text_message = $("#note-" + note_id + " .text-message");
			
			//change out-code-url 
			var _copyHTML = $text_message.html();
//console.log(_copyHTML);			
			$text_message.children(".out-code-url").each(function(index, value){
//console.log( index + ": " + value );
//console.log( this );
//console.log( $(this) );
				var href = $(this).attr("href");
				var text = $(this).text();
				var code = "[url]" +href+" | "+text+ "[/url]";
//console.log( code );
				$(this)[0].outerHTML = code;
			});

			var text_message = $text_message.html();
			//var text_message = $text_message.text();
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
			
			$text_message.html( _copyHTML );
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
		_vars["$btn_export"] = btn_export;//copy to module global vars 
		
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
				
				if( _vars["$num_notes"].innerHTML === "0"){
					return;
				}

				if( _vars["supportPHP"]){
					var url= _vars["exportUrl"];
					window.location.assign(url);
				}
				
				//if( _vars["supportASPX"] ){
					if( _vars["supportMSSQL"] ){
						var url= _vars["exportUrl"];
						window.location.assign(url);
					}
				//}

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
			
			//remove old special symbols
			.replace(/\&amp;/g, "&")
			.replace(/\&lt;/g, "<")
			.replace(/\&gt;/g, ">")
			.replace(/\&quot;/g, "\"")
			
			//insert special symbols re-new
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
//return false;

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

	//async requests (one by one), server capabilities check
	function testServer( numTest ){

		var test = _vars["tests"][ numTest ];
		runAjax({
			"requestMethod" : "GET", 
			"url" : test["url"], 
			"onError" : _postReq,
			"callback": _postReq
		});
		
		function _postReq( data ){
// var all_headers = xhr.getAllResponseHeaders();
// console.log( all_headers );
//console.log(data, typeof data, data.length);
			if( typeof test["callback"] === "function"){
				test["callback"]( data );
			} 
			numTest++;
			if( numTest < _vars["tests"].length ){
			//if( numTest < 2 ){
				testServer( numTest );
			} else {
// console.log("PHP: " , _vars["supportPHP"]);
// console.log("ASPX: " , _vars["supportASPX"]);
// console.log("MSSQL: " , _vars["supportMSSQL"]);
// console.log("JAVA: " , _vars["supportJAVA"]);
				var noSupport = true;
				if( _vars["supportPHP"] ){
					if( _vars["supportMySQL"] ){
						noSupport = false;
						_vars["requestUrl"] = "api/notes_mysql.php";
						_vars["exportUrl"] = "api/notes_mysql.php?action=export_notes";
						loadNotes();
					}
					if( _vars["supportPostgreSQL"] ){
						noSupport = false;
						_vars["requestUrl"] = "api/notes_postgresql.php";
						_vars["exportUrl"] = "api/notes_postgresql.php?action=export_notes";
						loadNotes();
					}
				}
				
				if( _vars["supportASPX"] ){
					if( _vars["supportMSSQL"] ){
						noSupport = false;
						_vars["requestUrl"] = "api/notes_mssql.aspx";
						_vars["exportUrl"] = "api/notes_mssql.aspx?action=export_notes";
						loadNotes();
					}
				}

				if( _vars["supportJAVA"] ){
					if( _vars["supportMySQL_java"] ){
						noSupport = false;
						_vars["requestUrl"] = "notes-serv";
						_vars["exportUrl"] = "notes-serv?action=export_notes";
						loadNotes();
					}
				}
				
				if( noSupport ){
					loadNotesXml();
				}

			}
		}//end _postReq()
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
										_vars["messagesList"].innerHTML = "<h2>no added notes</h2>";
										_vars["$num_notes"].innerHTML  = "0";//set number of notes
										_vars["$btn_export"].className += " disabled";
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
					_vars["$num_notes"].innerHTML  = "0";//set number of notes
					_vars["$btn_export"].className += " disabled";
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
			"url" : _vars["requestUrl"], 
			"callback": function( data ){
//console.log(data.length, typeof data, data);				
				//_parseXML( data );
				xmlNotes = _parseXmlToObj(data);
//console.log(obj);				
				if( xmlNotes.length > 0 ){
					_drawNotes({
						"data": xmlNotes
					});
				} else {
					_vars["messagesList"].innerHTML = "<h2>no added notes</h2>";
					_vars["$num_notes"].innerHTML  = "0";//set number of notes
					_vars["$btn_export"].className += " disabled";
				}
				
			},//end callback()
			"onError" : _onerror
		});
		
		function _onerror( xhr ){
var msg = "";
msg += "<p>error, " +_vars["requestUrl"]+ " not found by server <b>" + window.location.host + "</b></p>";
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
		
		//set number of notes
		_vars["$num_notes"].innerHTML  = p["data"].length;
		_vars["$btn_export"].className = _vars["$btn_export"].className.replace(" disabled", "");
//console.log( _vars["$btn_export"].className );
		
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
			//var regexp = /\[\[(.*?)\]\]/g;
			
			//var textMessage = "[url]http://www.google.com|Это ссылка на Google[/url]";
			var regexp = /\[url\](.*?)\[\/url\]/g;
			
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
					//links["html"].push("<a href='"+_url+"'>"+_text+"</a>");
					links["html"].push("<a href='"+_url+"' class='out-code-url'>"+_text+"</a>");
				}//next
				
				for(var n = 0; n < links["nowrap"].length; n++){
					var linkText = links["nowrap"][n];
					var linkHtml = links["html"][n];
					//textMessage = textMessage.replace("[["+linkText+"]]", linkHtml);
					textMessage = textMessage.replace("[url]"+linkText+"[/url]", linkHtml);
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
			//p["jsonLog"] = "[{\"message\" : \""+msg+"\"}]";
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		try{
			var jsonArr = JSON.parse( p["jsonLog"], function(key, value) {
//console.log( key, value );
				return value;
			});							
//console.log( jsonArr, jsonArr.length);
			
			var errorCode = "0";
			//var _messagesStr = "";
			for( var n = 0; n < jsonArr.length; n++){
				var jsonObj = jsonArr[n];
//console.log( jsonObj );

				if( jsonObj["message"] && jsonObj["message"].length > 0 ){
					var msg_ = "<p>" +jsonObj["message"]+ "</p>";
					//_messagesStr += msg_;
					_log("<div class='alert alert-info'>" + msg_ + "</div>");
				}
				
				if( jsonObj["error_code"] && jsonObj["error_code"].length > 0 ){
					errorCode = jsonObj["error_code"];
					//if( errorCode !== "0"){
						//var _msg = "<p>error code: " +errorCode+ "</p>";
						//_log("<div class='alert alert-danger'>" + _msg + "</div>");
					//}
				}
				
			}//next
			
console.log(errorCode);			
//console.log(_messagesStr);			

			if( errorCode !== "0"){
				if( typeof p["onError"] === "function"){
					p["onError"]( errorCode );
				}
			} else {
				if( typeof p["onSuccess"] === "function"){
					p["onSuccess"]();
				}
			}
			
		} catch(error) {
			var msg = "";
			msg += "error JSON.parse server response data";
			msg += ", " + error;
			//msg += "<p>data: " + p["jsonLog"] + "</p>";
console.log(msg);
		//_log("<div class='alert alert-danger'>" + msg + "</div>");
			if( typeof p["onError"] === "function"){
				p["onError"]( msg );
			}
		}//end catch

		if( typeof p["callback"] === "function"){
			p["callback"]();
		}
		
	}//end parseLog()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		}
	};
	
}//end _notes()