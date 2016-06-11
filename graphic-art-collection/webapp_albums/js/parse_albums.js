var Albums = function(){

	var xml_file = "xml/export_albums.xml";
	var index_page = "index.html";
	var category_pictures_path = "/site-content/albums/termin_images/imagecache/category_pictures/";
	var category_pictures_h100_path = "/site-content/albums/termin_images/imagecache/h100/";
	var num_albums_on_page = 6;

	if (window.location.href.indexOf("http") != -1)
	{
		var content_location = "";
		if (window.location.href.indexOf("google") != -1)
		{
			var content_location = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
		}
	}
	else
	{
		if (navigator.userAgent.indexOf ('Windows')!= -1) 
		{
			var content_location = "file:///f:/clouds/google_drive/0_sites";
		}
		if (navigator.userAgent.indexOf ('Linux')!= -1) 
		{
			var content_location = "file:///mnt/terra/clouds/google_drive/0_sites";
		}
	}	

	var tpl_list_albums_img_container = "";	
	var tpl_view_album_img_container = "";	
	var tpl_album_title = "";	
	var tpl_album_images_img_container = "";	

	var tpl_pager = "";	
	//----------------------------------------

	$(document).ready(
		function()
		{

			tpl_list_albums_img_container = $("#tpl-list-albums").html();
			$("#tpl-list-albums").remove();
		
			tpl_view_album_img_container = $("#tpl-view-album").html();
			$("#tpl-view-album").remove();
		
			tpl_album_title = $("#tpl-album-title").html();
			$("#tpl-album-title").remove();
			tpl_album_images_img_container = $("#tpl-album-images").html();
			$("#tpl-view-album").remove();
		
			tpl_pager = $("#tpl-pager").html();
			$("#tpl-pager").empty();
		
			var content = getenv("content");
	//console.log ("content = " + content);
			if (content == '' || content == 'list_albums')
			{
				list_albums(xml_file);
			}

			if (content == 'view_album')
			{
				view_album(xml_file, getenv("tid"));
				list_images(xml_file, getenv("tid"));
			}


			$(".pager li a").click(
				function()
				{
					$(".pages").hide();
				
					var active_page = $(this).attr("href");
					$(active_page).show();
					return false;
				}
			);
		
		}
	);//end ready
	//----------------------------------------

	function getenv(i)
	{
		if (!i.length) 
		{ 
			return false; 
		}  
		qStr = document.location.href;
		strpos = qStr.indexOf("?"+i+"=");

		if ( strpos ==-1) 
		{ 
			strpos = qStr.indexOf("&"+i+"="); 
		}

		if ( strpos == qStr.length || strpos ==-1 )
		{
			return false; 
		}

		val = qStr.substring( (strpos+i.length)+2, qStr.length);

		strpos = val.indexOf("&");

		if ( strpos !=-1 ) 
		{ 
			val = val.substring(0, strpos ); 
		}

		if ( !val.length ) 
		{ 
			return false; 
		}
		else 
		{ 
			return val; 
		}

	}//----------------------------------end func

	function createRequestObject() 
	{
		var request = false;
		if (window.XMLHttpRequest) 
		{ // Mozilla, Safari, Opera ...
			request = new XMLHttpRequest();
		} 

		if(!request)
		{ // IE
			request = new ActiveXObject("Microsoft.XMLHTTP");

		}

		if(!request)
		{
			request=new ActiveXObject('Msxml2.XMLHTTP');
		}

		return request;
	}

	 //**************************************
	//  ñîçäàòü îáúåêò XMLHttpRequest
	 //**************************************
	function getXMLDocument(url)  
	{  
	     var xml;  
	     if(window.XMLHttpRequest)  
	     {  
		 xml=new window.XMLHttpRequest();  
		 xml.open("GET", url, false);  
		 xml.send("");  
	//         alert (xml.responseText);
		 return xml.responseXML;  
	     }  
	     else  
		 if(window.ActiveXObject)  
		 {  
		     xml=new ActiveXObject("Microsoft.XMLDOM");  
		     xml.async=false;  
		     xml.load(url);  
		     return xml;  
		 }  
		 else  
		 {  
		     alert("Çàãðóçêà XML íå ïîääåðæèâàåòñÿ áðàóçåðîì");  
		     return null;  
		 }  
	}//-----------------------------------------------------------------end func


	function list_albums (url)
	{
	
		var xml=null;
		xml=getXMLDocument(url);

		var voc = xml.getElementsByTagName("taxonomy_vocabulary");
		var termins = voc.item(0).getElementsByTagName("termin");
	//console.log("Number of termins: " + termins.length);
	//console.log(termins.item(0).nodeName);
	//console.log(termins.item(0).textContent);

		//var  num_albums = 0;
		//var  num_page = 1;
		var list_main_albums = "";
		//var list_main_albums = "<div class='pages' id='page-"+num_page+"'>";
		//var pager = tpl_pager.replace(/#num-page/g, num_page);

		for (var n1 = 0; n1 < termins.length; n1++)  
		{
			termin_attr = termins.item(n1).attributes;
	//console.log("tid: " + termin_attr.getNamedItem("tid").nodeValue);
	//console.log("tid_parent: " + termin_attr.getNamedItem("tid_parent").nodeValue);
	//console.log("weight: " + termin_attr.getNamedItem("weight").nodeValue);
			if (termin_attr.getNamedItem("tid_parent").nodeValue == '0')
			{
				var termin = termins.item(n1).childNodes;
				for (var n2 = 0; n2 < termin.length; n2++)  
				{
					var a = termins.item(n1).childNodes[n2];
	//console.log(n2 + ".");
	//console.log(a.length);
	//console.log(a.nodeName);
					if (a.nodeName == "term_description")
					{      
						if (navigator.appName == 'Microsoft Internet Explorer')
						{
							var term_description = a.text;
						}
						else
						{
							var term_description = a.textContent;
						}
	//console.log('term_description' + term_description);
					}

					if (a.nodeName == "term_name")
					{      
						var tid = termin_attr.getNamedItem("tid").nodeValue;
	//console.log('tid' + tid);
						if (navigator.appName == 'Microsoft Internet Explorer')
						{
							var title_category = a.text;
						}
						else
						{
							var title_category = a.textContent;
						}
					}

				} // ---------------------------------- end for
	
				list_main_albums += tpl_list_albums_img_container
				.replace(/#view_album/g, index_page+"?content=view_album&tid=" + tid)
				.replace(/#category_pictures/g, content_location + category_pictures_path + term_description)
				.replace(/#category-title/g, title_category);

	//------------------ spit on page
	/*
				num_albums++;
				if (num_albums == num_albums_on_page)
				{
					num_page++;
					num_albums = 0;
					list_main_albums += "</div>\r\n<div class='pages' id='page-"+num_page+"'>";
					pager += tpl_pager.replace(/#num-page/g, num_page);
				}
	*/			
	//---------------------
			
			} // ---------------------------------- end if
		}//------------------ end for
	
		if (list_main_albums.length > 0)
		{
			$(".change-content #main-list-albums .content").html(list_main_albums);
			$(".change-content #main-list-albums").show();
			//$(".change-content #main-list-albums #page-1").show();
			//$(".change-content #main-list-albums #tpl-pager").html(pager);
		}

	//--------------------------------------- pager	
		$('#main-list-albums').pajinate({
		        items_per_page : 9,
		        num_page_links_to_display : 10,
		        start_page : 0,

		        item_container_id : '.content',
		        nav_panel_id : '.page_navigation',
		        nav_label_prev : 'prev',
		        nav_label_next : 'next',
		       wrap_around: true,
		       //show_first_last: true,
			show_first_last:false
		});
		$(".pagination a").wrap("<li></li>");
		$(".pagination span").remove();

	}//-----------------------------------------------------------------end func


	function view_album(url, parent_tid)
	{
		//$(".change-content").empty();
		var list_child_album = "";
	
		var xml=null;
		xml=getXMLDocument(url);

		var voc = xml.getElementsByTagName("taxonomy_vocabulary");
		var termins = voc.item(0).getElementsByTagName("termin");
	
		for (var n1 = 0; n1 < termins.length; n1++)  
		{
		termin_attr = termins.item(n1).attributes;

			if (termin_attr.getNamedItem("tid_parent").nodeValue == parent_tid)
			{
				var termin = termins.item(n1).childNodes;
				for (var n2 = 0; n2 < termin.length; n2++)  
				{
					var a = termins.item(n1).childNodes[n2];
					if (a.nodeName == "term_description")
					{      
						if (navigator.appName == 'Microsoft Internet Explorer')
						{
							var term_description = a.text;
						}
						else
						{
							var term_description = a.textContent;
						}
	//console.log('term_description = ' + term_description);
					}

					if (a.nodeName == "term_name")
					{      
						var tid = termin_attr.getNamedItem("tid").nodeValue;
						if (navigator.appName == 'Microsoft Internet Explorer')
						{
							var title_category = a.text;
						}
						else
						{
							var title_category = a.textContent;
						}
	//console.log('title_category = ' + title_category);
					}


				} // ---------------------------------- end for
			
				list_child_album += tpl_view_album_img_container
				.replace(/#view_album/g, index_page+"?content=view_album&tid=" + tid)
				.replace(/#category_pictures_h100/g, content_location + category_pictures_h100_path + term_description)
				.replace(/#album-title/g, title_category);

			} // ---------------------------------- end if
		} // ---------------------------------- end for
	
		if (list_child_album.length > 0)
		{
			$(".change-content #list-child-albums").html(list_child_album);
			$(".change-content #list-child-albums").show();
		}

	}  //-----------------------------------------------------------------end func

	function list_images(url, parent_tid)
	{
		var list_album_images = "";
		var xml=null;
		xml=getXMLDocument(url);

		var albums = xml.getElementsByTagName("album");
		for (var n1 = 0; n1 < albums.length; n1++)  
		{
		album_attr = albums.item(n1).attributes;
			if (album_attr.getNamedItem("tid").nodeValue == parent_tid)
			{
				var nodes = albums.item(n1).childNodes;


				list_album_images = tpl_album_title
				.replace(/#album-title/g, album_attr.getNamedItem("name").nodeValue);

				for (var n2 = 0; n2 < nodes.length; n2++)  
				{
					var a = albums.item(n1).childNodes[n2];
					if (a.nodeName == "node")
					{      
						var nnode = a.childNodes;
						for (var n3 = 0; n3 < nnode.length; n3++)  
						{
							if (nnode.item(n3).nodeName == "preview_img")
							{      
								if (navigator.appName == 'Microsoft Internet Explorer')
								{
									var preview_img = nnode.item(n3).text;
								}
								else
								{
									var preview_img = nnode.item(n3).textContent;
								}
							} // ---------------------------------- end if

							if (nnode.item(n3).nodeName == "big_img")
							{      
								if (navigator.appName == 'Microsoft Internet Explorer')
								{
									var big_img = nnode.item(n3).text;
								}
								else
								{
									var big_img = nnode.item(n3).textContent;
								}
							} // ---------------------------------- end if

							if (nnode.item(n3).nodeName == "field_title_value")
							{      
								if (navigator.appName == 'Microsoft Internet Explorer')
								{
									var field_title_value = nnode.item(n3).text;
								}
								else
								{
									var field_title_value = nnode.item(n3).textContent;
								}
							} // ---------------------------------- end if

						} // ---------------------------------- end for

						list_album_images += tpl_album_images_img_container
						.replace(/#gallery_images_w1024/g, content_location + big_img)
						.replace(/#preview_gallery_img/g, content_location + preview_img)
						.replace(/#image-title/g, field_title_value);
						
						//$(".change-content").append(album_images_img_container);

					} // ---------------------------------- end if

				} // ---------------------------------- end for

			}
		} // ---------------------------------- end for
		$(".change-content #list-album-images").html(list_album_images);
		$(".change-content #list-album-images").show();

	}//end  list_images()

	return "Graphic art collection";
}//end Albums


