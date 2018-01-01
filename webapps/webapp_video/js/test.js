var webApp = {
	"vars" : {
		"app_title" : "Video collection",
		"log" : [],
		 "import" : {
			"data_url" : "db/_video.xml",
			"db_type" : "xml",
		}
	}
};//end webApp()
console.log(webApp);


_serverRequest({
	"callback": _afterRequest
});

			
function _afterRequest( data ){
console.log( data );
	__parseXML( data );
};//end _afterRequest();

	
function _serverRequest( opt ){
	var p = {
		//"date": null,
		"callback": null
	};
	
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
console.log(p);		

	__processRequest();

	function __processRequest(){
		
		//form url
		var url = webApp.vars["import"]["data_url"];
		
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
	}//end __processRequest()
	
}//end _serverRequest()


function __parseXML( xml ){
/*	
var xmlObj = {
	"database" : [
		"table" : [
			"record" : [
				"column"
			]
		]
	}
};
*/
	
	//var rootTagName = xml.documentElement.nodeName;
	var rootTagName = "database";
	var xmlDoc = xml.getElementsByTagName( rootTagName);
	var xmlObj = __parseChildNodes( xmlDoc.item(0).childNodes );
	//var xmlObj = __parseChildNodes( xmlDoc.item(0).childNodes.item(1).childNodes.item(1).childNodes );
console.log(xmlObj);				
//console.log( xmlDoc.item(0).childNodes.item(1).childNodes.item(1).childNodes.item(1).nodeName ) ;
	//return xmlObj;
	
	function __parseChildNodes( childNodes ){
		var nodesObj = [];
		for (var n = 0; n < childNodes.length; n++) {
			var _child = childNodes.item(n);
//console.log( "nodeType: "+ _child.nodeType);
			if ( _child.nodeType !== 1){// not Node.ELEMENT_NODE
				continue;
			}
console.log( "nodeName: "+ _child.nodeName);
//console.log( "text: "+ _child.text);
//console.log( "textContent: ", _child.textContent, _child.textContent.length);
//console.log( "childNodes: ", _child.childNodes);
//console.log( "childNodes.length: ", _child.childNodes.length);

			var attr = getXmlAttr(_child.attributes);
//console.log( "getXmlAttr : ", attr["name"] );
			var _name = attr["name"];

			if( _child.childNodes.length > 1){
				if( _name && _name.length > 0){
					nodesObj[_name] = __parseChildNodes( _child.childNodes );
				} else {
					nodesObj.push( __parseChildNodes( _child.childNodes ) );
				}
				
			} else {
console.log( "textContent: ", _child.textContent, _child.textContent.length);
console.log( "childNodes: ", _child.childNodes);
console.log( "childNodes.length: ", _child.childNodes.length);
//console.log( "attr : ", _child.attributes);
				if ("textContent" in _child){
					nodesObj[_name] = _child.textContent;
				} else {
					nodesObj[_name] = _child.text;
				}
			}
/*
			var _name = _child.nodeName;
			if ("textContent" in _child){
				nodeObj[_name] = _child.textContent;
			} else {
				nodeObj[_name] = _child.text;
			}
*/
		}//next

		return nodesObj;
	}//end __parseChildNodes()
	
}//end __parseXML()

function getXmlAttr( attr ){
	var item_attr = {};
	for(var item = 0; item < attr.length; item++) {
		item_attr[attr[item].name] = attr[item].value;
	}
	return item_attr;
}//end getXmlAttr()

