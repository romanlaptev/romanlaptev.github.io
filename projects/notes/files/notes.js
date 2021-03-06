var _notes = function ( opt ){
//console.log(arguments);
	var _vars = {
		"init_url" : "?q=load-xml-book",
		//"init_url" : "?q=load-notes",
		"requestUrl" : "upload/notes.xml",
		"exportUrl" : "",
		//"requestRemoteAjaxUrl" : "http://graphic-art-collection.16mb.com/notes/",
		
		"messages" : getById("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list"),
			"tpl-notes-list" : _getTpl("tpl-notes-list"),
			"tpl-linked-nodes" : _getTpl("tpl-linked-nodes")
		},
		"messagesList" : getById("messages"),
		"controlPanel" : getById("control-btn"),
		"log" :  getById("log"),

		"hideControlPanel" : false,
		"$num_notes" : getById("num-notes"),
		"breadcrumbs": [],
		
		"tests" : [{
			"name" : "checkPHP",
			"url" : "api/test.php",
			"successMsg" : "test PHP success, supported by server <b>" + window.location.host + "</b>...",
			"errorMsg" : "test PHP failed, PHP not supported by server <b>" + window.location.host + "</b>...",
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
				"name" : "checkASPX",
				"url" : "api/test.aspx",
				"successMsg" : "test ASPX success, supported by server <b>" + window.location.host + "</b>...",
				"errorMsg" : "test ASPX failed, ASP.NET not supported by server <b>" + window.location.host + "</b>...",
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
				"name" : "checkJAVA",
				"url" : "api/test_java.jsp",
				"successMsg" : "test JAVA success, supported by server <b>" + window.location.host + "</b>...",
				"errorMsg" : "test JAVA failed, not supported by server <b>" + window.location.host + "</b>...",
				"callback" : function( json ){
					
					try{
						var jsonObj = JSON.parse( json, function(key, value) {
//console.log( key, value );
							return value;
						});
						
						if( jsonObj["testResult"] === "4" ){
							_vars["supportJAVA"] = true;
							var msg = this["successMsg"];
							
							var n = 0;
							for( var key in jsonObj){
								if( key !== "testResult"){
									if( n > 0){
										msg += ", ";
									} else {
										msg += "<br>";
									}
									msg += key + " : " + jsonObj[key];
									n++;
								}
							}//next
							
							_log("<div class='alert alert-success'>" + msg + "</div>");
						} else {
							console.log( jsonObj);
							_vars["supportJAVA"] = false;
							var msg = this["errorMsg"];
							_log("<div class='alert alert-danger'>" + msg + "</div>");
						}
						
					} catch(error) {
						_vars["supportJAVA"] = false;
						var msg = this["errorMsg"];
						_log("<div class='alert alert-danger'>" + msg + "</div>");
					}//end catch
					
				}//end callback
			}, //end test
			
			{
				"name" : "checkMySQL",
				"url" : "api/test_mysql.php",
				"urlAltJava" : "api/test_mysql.jsp",
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
			
			// {
			// "name" : "checkMySQL_java",
			// "url" : "api/test_mysql.jsp",
			// "successMsg" : "test local MySQL success...",
			// "errorMsg" : "test local MySQL failed, cannot connect to database server...",
			// "callback" : function(res){
// //console.log(res, typeof res);
			
			// _vars["supportMySQL_java"] = false;
			// if( typeof res !== "string"){
			// var msg = this["errorMsg"];
			// _log("<div class='alert alert-danger'>" + msg + "</div>");
			// return;
			// }
			
			// parseLog({
			// "successMsg" : this["successMsg"],
			// "errorMsg" : this["errorMsg"],
			// "jsonLog" : res,
			// "onSuccess" : function(){
			// _vars["supportMySQL_java"] = true;
			// var msg = this["successMsg"];
			// _log("<div class='alert alert-success'>" + msg + "</div>");
			// },
			// "onError" : function( errorCode  ){
// console.log(errorCode);
			// var msg = this["errorMsg"];
			// msg += ", "+errorCode;
			// _log("<div class='alert alert-danger'>" + msg + "</div>");
			// }//,
			// //"callback" : function(){
			// //}//end callback
			// });
			
			// }//end callback
			// } //end test
//,
			{
				"name" : "checkPostgreSQL",
				"url" : "api/test_postgresql.php",
				"urlAltJava" : "api/test_postgresql.jsp",
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
			} //end test
			,
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
			} //end test
		
		]//end tests
		
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
	// var msg = "<p>test PHP failed, PHP not supported by server <b>" + window.location.host + "</b>...</p>";
	// break
	// case "errorASPX":
	// var msg = "<p>test ASPX failed, ASP.NET not supported by server <b>" + window.location.host + "</b>...</p>";
	// break
	// case "errorMSSQL":
	// var msg = "<p>test MSSQL failed, cannot connect to database server...</p>";
	// break
	// }//end switch()
	// _log("<div class='alert alert-danger'>" + msg + "</div>");
	// }//end _error()
	
	var _init = function(){
console.log("init _notes");
		_testing.defineEvents();
		//testServerMod();
		
		var parseUrl = window.location.search; 
		if( parseUrl.length > 0 ){
			_vars["GET"] = parseGetParams(); 
			_urlManager();
		} else {
				if( _vars["init_url"] ){
						//parseUrl = _vars["init_url"].substring(2);
						parseUrl = _vars["init_url"];
console.log(parseUrl);					
				}
				_vars["GET"] = parseGetParams( parseUrl ); 
				_urlManager();
			}
		
	};//end _init()
	
	function _getTpl( id ){
		var tpl = getById(id);
		return tpl.innerHTML;
	}//end _getTpl()
	
	
	function _defineEvents(){
//console.log("_defineEvents()");
		
		//ADD NEW NOTE
		document.forms["form_message"].onsubmit = function(e){
//console.log("Submit form", e, this);
			
			if( !_vars["supportPHP"] &&
				!_vars["supportASPX"] &&
				!_vars["supportJAVA"]){
				return false;
			}
			
			if( !_vars["supportMySQL"] &&
				!_vars["supportPostgreSQL"] &&
				!_vars["supportMSSQL"] &&
				!_vars["supportMySQL_java"]){
				return false;
			}
			
			checkForm({
				"form" : this,
				"modalWindowId" : "#newModal",
				"action" : "save_note"
			});
			
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
			
			if( !_vars["supportPHP"] &&
				!_vars["supportASPX"] &&
				!_vars["supportJAVA"]){
				return false;
			}
			
			if( !_vars["supportMySQL"] &&
				!_vars["supportPostgreSQL"] &&
				!_vars["supportMSSQL"] &&
				!_vars["supportMySQL_java"]){
				return false;
			}
			
			checkForm({
				"form" : this,
				"modalWindowId" : "#editModal",
				"action" : "edit_note"
			});
			
			return false;
		});//end event
		
		
		//UPLOAD
		document.forms["form_import"].onsubmit = function(e) {
			e.preventDefault();
			if( !_vars["supportPHP"] &&
				!_vars["supportASPX"] &&
				!_vars["supportJAVA"]){
				return false;
			}
			
			if( !_vars["supportMySQL"] &&
				!_vars["supportPostgreSQL"] &&
				!_vars["supportMSSQL"] &&
				!_vars["supportMySQL_java"]){
				return false;
			}
			_upload( document.forms["form_import"] );
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
		
		//PAGE NAVIGATION
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
					if ( target.href.indexOf("?q=") !== -1){
						
						if (event.preventDefault) {
							event.preventDefault();
						} else {
							event.returnValue = false;
						}
						
						//var search = target.href.split("?");
						//var parseStr = search[1];
//console.log( search, parseStr );
						var parseStr = target.href;
						if( parseStr.length > 0 ){
							_vars["GET"] = parseGetParams( parseStr ); 
							_urlManager( target );
						} else {
console.log( "Warning! error parse url in " + target.href );
						}
					}
				}
				
			}//end event
		}
		
/*		
		//CLEAR LOG
		var btn_clear_log = getById("clear-log");
		if( btn_clear_log ){
			btn_clear_log.onclick = function(e){
				var log = getById("log");
				log.innerHTML = "";
				return false;
			}
		}
*/		
		//controlPanel buttons
		if( _vars.controlPanel ){
			_vars.controlPanel.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event, target.href );
//------------------					
				if( target.tagName === "A"){
					
					if (event.preventDefault) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					}
//------------------					
					if ( target.href.indexOf("#") !== -1){
//console.log( "TEST1" );
						
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
					
//------------------					
					if ( target.href.indexOf("?q=") !== -1){
//console.log( "TEST2" );
						
						//var search = target.href.split("?");
						//var parseStr = search[1];
//console.log( search, parseStr );
						var parseStr = target.href;
						if( parseStr.length > 0 ){
							_vars["GET"] = parseGetParams( parseStr ); 
							_urlManager( target );
						} else {
console.log( "Warning! error parse url in " + target.href );
						}
					}
//------------------					
						
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
				
				if( !_vars["supportPHP"] &&
					!_vars["supportASPX"] &&
					!_vars["supportJAVA"]){
					return false;
				}
				
				if( !_vars["supportMySQL"] &&
					!_vars["supportPostgreSQL"] &&
					!_vars["supportMSSQL"] &&
					!_vars["supportMySQL_java"]){
					return false;
				}
				
				var url= _vars["exportUrl"];
				window.location.assign(url);
				
			}//end event
		}
		
	}//end _defineEvents()
	
	
	
	function _urlManager( target ){
//console.log(target, _vars["GET"]);

		switch( _vars["GET"]["q"] ) {
/*
			
			case "hide-log":
				webApp.vars["log"].style.display="none";
			break;
			case "view-log":
				webApp.vars["log"].style.display="block";
			break;
			case "toggle-log":
//console.log(webApp.vars["log"]..style.display);
				if( webApp.vars["log"].style.display==="none"){
					webApp.vars["log"].style.display="block";
				} else {
					webApp.vars["log"].style.display="none";
				}
			break;
*/			
			case "clear-log":
				_vars["log"].innerHTML="";
			break;
			
			case "load-notes": 
				var startNumTest = 0;
				_testing.testServer( startNumTest );
			break;

			case "view-node": 
				var nodeObj = _getNode({
					"nid" : _vars["GET"]["nid"],
					"xml" : _vars["xmlObj"]
				});
//console.log(nodeObj);
				if( nodeObj ){
					_drawNode( nodeObj, _vars["messages"] );
					} else {
_vars["logMsg"] = "Not find node, nid:" + _vars["GET"]["nid"];
_log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
					}
			break;

			case "load-xml-book":
				_vars["requestUrl"] = "parse_notes/xml/export_mydb_notes.xml";
				loadBookXml();
			break;
			
			case "delete-note":
				serviceAction({
						"action" : _vars["GET"]["q"],
						"id": _vars["GET"]["id"]
					},
					function(){
						loadNotes();
					});
			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()
	
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
	var _testServer = function( numTest ){
		
		var test = _vars["tests"][ numTest ];
//change tst url
		if( test["name"] === "checkMySQL"){
			if( _vars["supportJAVA"] ){
				test["url"] = test["urlAltJava"];
			}
		}
		if( test["name"] === "checkPostgreSQL"){
			if( _vars["supportJAVA"] ){
				test["url"] = test["urlAltJava"];
			}
		}
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
//console.log(numTest );
				//if( numTest < 2 ){
				_testServer( numTest );
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
					if( _vars["supportMySQL"] ){
						noSupport = false;
						_vars["requestUrl"] = "notes-serv";
						_vars["exportUrl"] = "notes-serv?action=export_notes";
						loadNotes();
					}
					if( _vars["supportPostgreSQL"] ){
						noSupport = false;
						_vars["requestUrl"] = "notes-serv-postgres";
						_vars["exportUrl"] = "notes-serv-postgres?action=export_notes";
						loadNotes();
					}
				}
				
				if( noSupport ){
					loadNotesXml();
				}
				
			}
		}//end _postReq()
	}//end _testServer()
	
	// function testServerMod(){
	
	// //run test PHP
	// for( var n = 0; n < _vars["tests"].length; n++){
	// var test = _vars["tests"][ n ];
	// if( test["name"] === "checkPHP"){
	// runAjax({
	// "requestMethod" : "GET",
	// "url" : test["url"],
	// "onError" : _postReq,
	// "callback": _postReq
	// });
	// }
// // checkMySQL  notes.js:1001:1
// // checkPostgreSQL  notes.js:1001:1
// // checkASPX  notes.js:1001:1
// // checkMSSQL  notes.js:1001:1
// // checkJAVA  notes.js:1001:1
// // checkMySQL_java
	// }//next
	
	// function _postReq( data ){
// console.log(data, typeof data, data.length);
	// // if( typeof test["callback"] === "function"){
	// // test["callback"]( data );
	// // }
	// }//end _postReq()
	
	// }//end testServerMod()
	
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
//console.log( xmlNotes);
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
	
	
	function loadBookXml(){

		//hide CONTROL PANEL
		$("#control-btn").children("div").hide();
		_vars["hideControlPanel"]=true;
		_vars["messagesList"].innerHTML = "";
		
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			
			"onProgress" : function( e ){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
				var loadProgressBar = getById("load-progress-bar");
				if( loadProgressBar ){
					//loadProgress.value = percentComplete;
					loadProgressBar.className = "progress-bar";
					loadProgressBar.style.width = percentComplete+"%";
					loadProgressBar.innerHTML = percentComplete+"%";
				}
			},//end callback function
			
			"onError" : function( xhr ){
//console.log( "onError ", xhr);
_vars["logMsg"] = "error, not load " + _vars["requestUrl"]
_log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			},//end callback function
			
			"onLoadEnd" : function( headers ){
//console.log( "onLoadEnd ", headers);
				if( _vars["waitWindow"] ){
					_vars["waitWindow"].style.display="none";
				}
			},//end callback function
			
			"callback": function( data, runtime ){
//console.log(data.length, typeof data, data );
_vars["logMsg"] = "load " + _vars["requestUrl"]  +", runtime: "+ runtime +" sec";
 _log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
// //console.log( "_postFunc(), " + typeof data );
// //console.log( data );
// //for( var key in data){
// //console.log(key +" : "+data[key]);
// //}

				if( data ){
					_vars["xmlObj"] = data;

					//set number of notes
					_vars["$num_notes"].innerHTML  = $( data ).find("node").length;
					
					//output main pages of book (plid=0)
					var nodeObj = _getNode({
						"plid" : "0",
						"xml" : _vars["xmlObj"]
					});
//console.log(nodeObj);
					if( nodeObj ){
						_drawNode( nodeObj, _vars["messages"] );
					} else {
_vars["logMsg"] = "Not find node";
_log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
					}
					
				} else {
_vars["logMsg"] = "error, no XML data in " + _vars["requestUrl"] ;
_log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				}
				
			}//end callback()
		});
	
	}//end loadBookXml()

	
	function _getNode( opt ){
		
		if( typeof window.jQuery !== "function"){
_vars["logMsg"] = "<p>jQuery failing....</p>";
_log("<div class='alert alert-error'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			return false;
		}
		
		var p = {
			"nid": null,
			"plid": null,
			"mlid": null,
			"title" : "",
			"xml" : null,
			"nodeObj" : false
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log( p );

		if(!p.xml){
_vars["logMsg"] = "XML undefined....";
//_log("<div class='alert alert-error'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			return false;
		}
		
		var testId = false;
		if( p.nid ){
			testId = "nid";
		}
		if( p.plid ){
			testId = "plid";
		}
		if( p.mlid ){
			testId = "mlid";
		}
		if( p.title ){
			testId = "title";
		}
		
		$( p.xml ).find("node").each(function( index, element ){
//console.log( index, element );			
//console.log( element.attributes );

			//if ( $(element).attr("plid") !== p.plid ){
			if ( $(element).attr( testId ) !== p[ testId ] ){
//console.log( $(element).attr(testId), p.plid );
				return;
			}
			
			//get attributes
			p.nodeObj = get_attr_to_obj( element.attributes ) ;
			
			//get child nodes (<body_value> .....etc...)
//console.log( $(element).children("body_value").text() );
			var nodeChildren = $(element).children();
			$(nodeChildren).each( function( index, child ){
//console.log( index, child );
//console.log( child.nodeName );
//console.log( $(child).html() );
				var key = child.nodeName;
				var value = $(child).html();
				p.nodeObj[key] = value;
			});//next

			//get linked nodes
			var mlid = $(element).attr("mlid");
			p.nodeObj["linkedNodes"] = _getLinkedNodes( mlid );
		});//next
		
		return p.nodeObj;
	}//end _getNode

	
	function _getLinkedNodes( mlid ){
		
		if( typeof window.jQuery !== "function"){
_vars["logMsg"] = "<p>jQuery failing....</p>";
_log("<div class='alert alert-error'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			return false;
		}
		
		var linkedNodes = [];
		$(_vars["xmlObj"]).find("node").each(function( index, element ){
			if ( $(element).attr("plid") === mlid ){
//console.log( $(element).attr("plid") );
				var nodeObj = get_attr_to_obj( element.attributes ) ;
				//for( var key in nodeObj){
//console.log(key, nodeObj[key]);
				//}//next
				linkedNodes.push( nodeObj );
			}
		});//next
		return linkedNodes;
	}//end _getLinkedNodes()

	function _formLinkedNodes( linkedNodes ){
			linkedHtml = "";
			for(var n = 0; n < linkedNodes.length; n++){
					var linkedNode = linkedNodes[n];
					linkHtml = _vars["templates"][ "tpl-linked-nodes"];

					for(var key in linkedNode){
						if( linkHtml.indexOf("{{"+key+"}}") !== -1 ){
							var key2 = "{{"+key+"}}";
							var value = linkedNode[key];
							linkHtml = linkHtml.replace(new RegExp(key2, 'g'), value);
						}
					}//next

					//linkedHtml += linkHtml.replace("{{title}}", n);
					linkedHtml += linkHtml;
			}//next
//console.log(linkedHtml);
			return linkedHtml;
	}//end _formLinkedNodes()

	function _drawNode(nodeObj, htmlContainer){
		var listHtml = "";
		var itemHtml = _vars["templates"][ "tpl-notes-list"];

		//form HTML
		for( var key in nodeObj){
//console.log(key, nodeObj[key]);

//---------------------------------- add linked page, form link				
			if( nodeObj["linkedNodes"].length > 0){
				linkedHtml = _formLinkedNodes( nodeObj["linkedNodes"] );
				itemHtml = itemHtml.replace("{{linked_nodes}}", linkedHtml);
//console.log(itemHtml);
			}
			
//------------------------------- insert data into template
			if( itemHtml.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, nodeObj[key]);
				var key2 = "{{"+key+"}}";
				itemHtml = itemHtml.replace(new RegExp(key2, 'g'), nodeObj[key]);
			}

		}//next
		
		itemHtml = itemHtml
		.replace("{{linked_nodes}}", "")
		.replace("{{body_value}}", "");
		
//-------------------------------- form breadcrumbs
		//add container link to breadcrumbs
		_vars["breadcrumbs"][ "key_" + nodeObj.nid ] = nodeObj["title"];
//console.log("add breadcrumb item, id: ", nodeObj.nid);
		
		//form breadcrumbs line
		var breadcrumbs = "";
		var clear = false;
		for( var item in _vars["breadcrumbs"] ){
			var itemID = item.replace("key_", "");
			
			if( clear ){//clear unuseful tail breadrumbs
				delete _vars["breadcrumbs"][item];
			} else {
				var itemTitle = _vars["breadcrumbs"][item];
				if( itemID !== nodeObj.nid ){
					//breadcrumbs += "<li><a href='#?q=view-node&nid="+itemID+"' class='btn btn-sm btn-info'>" + itemTitle + "</a></li>";
					breadcrumbs += "<a href='?q=view-node&nid="+itemID+"' class='btn btn-primary'>" + itemTitle + "</a>";
				} else {
					//breadcrumbs += "<li>" + itemTitle + "</li>";
					breadcrumbs += "<span class='btn btn-info active-item'>" + itemTitle + "</span>";
				}
			}
			
//console.log( itemID, nodeObj.nid, itemID === nodeObj.nid );
//console.log( typeof itemID, typeof nodeObj.nid );
			if( itemID === nodeObj.nid ){//detect unuseful tail breadrumbs
				clear = true;
			}
			
		}//next
//console.log( breadcrumbs );
		itemHtml = itemHtml.replace("{{breadcrumbs}}", breadcrumbs);
		
		listHtml += itemHtml;
//console.log(listHtml);

		htmlContainer.innerHTML = listHtml;
		//correct
		if( nodeObj["linkedNodes"].length === 0){
			$(".linked-nodes").remove();
		}
		
	}//end _drawNode()
	
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
		
		if( !_vars["supportPHP"] &&
			!_vars["supportASPX"] &&
			!_vars["supportJAVA"]){
			return false;
		}
		
		if( !_vars["supportMySQL"] &&
			!_vars["supportPostgreSQL"] &&
			!_vars["supportMSSQL"] &&
			!_vars["supportMySQL_java"]){
			return false;
		}
		runAjax( {
			"requestMethod" : "GET",
			"url" : _vars["requestUrl"],
			"params" : p,
			"callback": _postFunc
		});
		
		function _postFunc( data ){
			parseLog({
				"jsonLog" : data
			});
			//loadNotes();
			if( typeof callback === "function"){
				callback();
			}
		}//end _postFunc()
		
	}//end serviceAction
	
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
				
				if( jsonObj["error_code"] && jsonObj["error_code"].length > 0 ){
					errorCode = jsonObj["error_code"];
					if( errorCode !== "0"){
						var _msg = "error code: " +errorCode+ ", ";
						_msg += jsonObj["message"];
						_log("<div class='alert alert-danger'>" + _msg + "</div>");
					}
				} else {
					
					if( jsonObj["message"] && jsonObj["message"].length > 0 ){
						var msg_ = "<p>" +jsonObj["message"]+ "</p>";
						//_messagesStr += msg_;
						_log("<div class='alert alert-info'><small>" + msg_ + "</small></div>");
					}
					
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
	
	
	var _testing = {
		defineEvents : _defineEvents,
		testServer : _testServer
	};
	
	// public interfaces
	return{
		testing:	_testing,
		vars : _vars,
		init:	function(){
			return _init();
		}
	};
	
};//end _notes()
