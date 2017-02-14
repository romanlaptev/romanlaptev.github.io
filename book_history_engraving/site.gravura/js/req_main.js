var sitename = "";
var sitecontent = "";
if(location.href.indexOf("mycomp") === -1){
	var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk";
	var sitecontent = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
}


document.addEventListener("DOMContentLoaded", function(e){
console.log("DOMContentLoaded, ", e);
});//end dom load

//---------------------
function load_img_error( image ){
	var new_src = sitecontent + image.getAttribute("src");
console.log("Error loag image!, new source = " + new_src);
	image.src = new_src;
	
	//fix img link
	var link = image.parentNode.getAttribute("href");
console.log("parent link = " + link);
	image.parentNode.setAttribute("href", sitecontent + link );
	
}//end load_img_error()
