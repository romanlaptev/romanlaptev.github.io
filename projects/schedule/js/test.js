var logMsg;

//window.location.href="https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr";

//console.log("000000000000", webApp.vars["DB"]["dataUrl"]);

//$.getJSON(webApp.vars["DB"]["dataUrl"], function(){
//console.log(arguments);
//});
//my_func({a:1});

  var url = "https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr";
	//var url = "http://i5/webapps/";
	//var url="https://github.com/romanlaptev/romanlaptev.github.io/tree/master/test_code";

	var tmpElem = document.createElement("div");
	tmpElem.className = "container";

  tmpElem.innerHTML = '<iframe name="test_frame" id="test-frame" src="' + url + '" width="100%" height="40%" onload="getFrameInfo(this)">';

  var frame = tmpElem.firstChild;

	var debug = true;
	if (!debug) {
		frame.style.display = 'none';
	}

	document.body.appendChild(frame);

//for( var key in iframe.contentDocument){
//console.log(key, iframe.contentDocument[key]);
//}


function getFrameInfo( frame_tag ){
console.log( frame_tag );

	//var iframe = window.frames[ frame_tag.name ];
	var iframe = frame_tag.contentWindow;	

	logMsg = "<p class='alert alert-info'><b>Main page domain</b> = " + document.domain +"</p>";
	log.innerHTML += logMsg;
	
	try{
		logMsg = "<b>iframe location</b> = " + iframe.location;
		log.innerHTML += "<p class='alert alert-info'> " + logMsg + "</p>";
	}
	catch(e){
		logMsg = "<b>iframe location, access error</b>: " + e.message;
		log.innerHTML += "<p class='alert alert-danger'> " + logMsg + "</p>";
console.log(e);
	}

	try{
		logMsg = "<b>iframe.document</b> = " + iframe.document;
		logMsg += "<ul>";
		for(var item in iframe.document){
			logMsg += "<li>"+item +" : "+ iframe.document[item]+"</li>";
console.log( item +" = "+ iframe.document[item]);
		}
		logMsg += "</ul>";
		log.innerHTML += "<p class='alert alert-info'> " + logMsg + "</p>";
//alert( iframe_name.document.body.innerHTML );
	} catch(e) {
		logMsg = "<b>iframe.document, access error</b>: " + e.message;
		log.innerHTML += "<p class='alert alert-danger'> " + logMsg + "</p>";
console.log(e);
	}

	try{
		logMsg = "<b>frame_tag.contentDocument.body.innerHTML:</b>" + frame_tag.contentDocument.body.innerHTML;
		log.innerHTML += "<p class='alert alert-success'> " + logMsg + "</p>";
console.log( frame_tag.contentDocument.body.innerHTML );
	} catch(e) {
console.log(e);
	}
	
//      window.frames['content_frame'].document.write ('hello frame');
   //document.all.filelist.src="file:///mnt/terra/clouds/cloud_mail/music/";
   
//alert ( window.frames['filelist'].document.body.innerHTML );
//console.log( window.frames['filelist'].document.body.innerHTML );

//var iframe = document.getElementsByTagName('iframe')[0];
//var iframeDoc = iframe.contentWindow.document;
//alert ( iframeDoc.document.body.innerHTML );

	//alert($('#filelist').contents().find('body').html());		
/*
	var frame = window.frames['filelist'];		
	//var frame = frame2.context.body;		
	for (item in frame)
	{
console.log(  "frame["+ item +"] =" + frame[item] );
	}
*/
}//end getFrameInfo()