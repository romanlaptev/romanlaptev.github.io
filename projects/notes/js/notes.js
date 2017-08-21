window.onload = function(){
	var webNotes = _notes();
console.log( webNotes );	

	webNotes.init();
}//end load

var _notes = function ( opt ){
//console.log(arguments);	
	var _vars = {
		"requestUrl" : "api/notes_mysql.php",
		"requestRemoteUrl" : "http://graphic-art-collection.16mb.com/notes/notes.php",
		"messages" : getDOMobj("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list")
		},
		"messagesList" : getDOMobj("messages"),		
		"controlPanel" : getDOMobj("control-btn"),		
	};
	
	//correct for remote run
	if( window.location.hostname === "romanlaptev.github.io"){
		_vars["requestUrl"] = _vars["requestRemoteUrl"];
	}

	var _init = function(){
//console.log("init _notes");
		defineEvents();
		loadMessages();
		//define events
		document.forms["form_message"].onsubmit = function(e){  
//console.log("Submit form", e, this);
			_checkForm(this);
			return false;
		};
	};

	function _getTpl( id ){
		var tpl = getDOMobj(id);
		var html = tpl.innerHTML;
		return html;
	}//end _getTpl()
	

	function defineEvents(){
//console.log( _vars.messagesList );

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
								if( parseStr.indexOf("edit_message") !== -1 ||
									parseStr.indexOf("delete_message") !== -1){
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
		} else{
			//e.preventDefault();
	console.log("error in form..");
		}	
		return false;
		
	}//end _checkForm()	
	
	function sendForm( opt ){
		var p = {
			"creation_date" : "",
			"authorName" : "anonymous",
			"title" : "no subject",
			"textMessage" : "",
			"action": "save_message",
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
			"authorName" : p["authorName"],
			"title" : p["title"],
			"textMessage" : p["textMessage"],
			"date" : p["creation_date"]
		};
//test
//url="http://graphic-art-collection.16mb.com/php/test_mysql.php";
//params={};

		runAjax( {
			"requestMethod" : p["requestMethod"], 
			"enctype" : p["enctype"],
			"url" : url, 
			"params" : params,
			"callback": function( log ){
var msg = "<p>"+log+"</p>";
_log("<div class='alert alert-success'>" + msg + "</div>");

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
			"action" : "get_messages"
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
		
	}//end _insertMessages()
	
	function serviceAction(opt){
		var p = {
			"action" : "",
			"id" : null
		};
		
		//extend parameters object
		for(var key in opt ){
			p[key] = opt[key];
		}

		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			"params" : p,
			"callback": function( log ){
var msg = "<p>"+log+"</p>";
_log("<div class='alert alert-success'>" + msg + "</div>");
				loadMessages();
			}//end callback()
		});
		
	}//end seviceAction
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		}
	};
	
}//end _notes()
