window.onload = function(){
	var webChat = _chat();
console.log( webChat );	

	webChat.init();
}//end load

var _chat = function ( opt ){
//console.log(arguments);	
	var _vars = {
		"requestUrl" : "chat.php",
		"messages" : getDOMobj("messages"),
		"templates" : {
			"tpl-message-list" : _getTpl("tpl-message-list")
		}
	};

	var _init = function(){
//console.log("init chat");
		_loadMessages();
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
			"onProgress" : function(e){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
	console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
			},//end onProgress()
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

	function _loadMessages(){
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
		
		var params = {
			"action" : "get_messages"
		};
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			"params" : params,
			"onProgress" : function(e){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
	console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
			},//end onProgress()
			"callback": function( data ){
				// _insertMessages({
					// "data": data
				// });
			}//end callback()
		});
		
	}//end _loadMessages()

	function _insertMessages( opt ){
		var p = {
			"templateID": "tpl-message-list",
			"data" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);
		
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
					itemHtml = itemHtml.replace("{{"+key+"}}", items[key]);
				}
			}//next
			listHtml += itemHtml;
//console.log(listHtml);
			
		}//next
		
		_vars["messages"].innerHTML = listHtml;
		
	}//end _insertMessages()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		}
	};
	
}//end _chat()