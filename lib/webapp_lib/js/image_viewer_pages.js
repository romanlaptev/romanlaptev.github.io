var filename_tpl = "page{num}.pdf.jpg";
//var filename_tpl = "p0{num}.jpg";
var all_page_num = 999;
var min_page_num = 1;
var max_page_num = all_page_num;

//var book_location = "file:///mnt/terra/clouds/0_data/lib/comp_books/program/js/js_prof";
//var book_location = "http://mycomp/lib/comp_books/program/js/js_prof";
var book_location = "";
var current_page_num = 1;
//book_location=file:///mnt/terra/clouds/0_data/lib/comp_books/program/js/js_prof&page_num=99
var xml_data;
var content;
var filelist;


//html templates
var book_content_url_tpl = "";

//-------------------- read GET params
var current_page = getenv("page_num");
if ( current_page )
{
	current_page_num = parseInt(current_page);
}
var book_location = getenv("book_location");


//-------------------- parse XML
var index_url = book_location + "/" + "index.xml";
xml_data = read_xml_file( index_url );


//--------------------- test!!!!!!!!!!!!!!!!!
var func_success = function ( data, status )
{
console.log("3ajax_success function, status - " + status);
	/*
	for(var p in data.childNodes)
	{
	//console.log( "data["+ p + "] = " + data[p] );
	console.log( data.childNodes[p] );
	}
	*/
//console.log("data - " + data);
	return data;
}//------------------------- end func
//xml_data = load_xml( index_url, func_success );

console.log("xml_data - " + xml_data );

//-------------------- read filelist
filelist = read_filelist( xml_data );
if (filelist.length > 0)
{
	all_page_num = filelist.length;
	max_page_num = all_page_num;
}
/*
for (var item in content)
{
	var section = content[item];
		var info = document.getElementById("info");
		if ( filename.nodeName == "filename")
		{      
console.log( filename.textContent );
			if (navigator.appName == 'Microsoft Internet Explorer')
			{
				info.innerHTML = filename.text;
			}
			else
			{
				info.innerHTML = filename.textContent;
			}

		} // ---------------------------------- end if
}
*/

$(document).ready(
	function()
	{
//------------------- init
		$("#info").hide();
		$(".wrap-book-content").hide();

		$("#current-page").val( current_page_num );
		update_preview_img( book_location );

		$("#num-pages").text( all_page_num );

//----------------- read templates
		book_content_url_tpl = $("#book-content").html();
		$("#book-content").empty();

//---------------------form content
		form_content();
//--------------------- get book title, author
		var author = xml_data.getElementsByTagName("author");
		var book_title = xml_data.getElementsByTagName("title");
		if ( book_title.length > 0)
		{
			$("#author").text( $(author).text() );
			$("#book-title").text( $(book_title).text() );
		}

		var book_filename = xml_data.getElementsByTagName("book_filename");
		if ( book_filename.length > 0)
		{
			$("#download-file").text( $(book_filename).text() );
			$("#download-file").attr("href", book_location + "/" + $(book_filename).text() );
		}
		else
		{
			$("#download-file").parent().hide();
		}


//------------------- list pages
		$("#prev-page").on("click",
			function()
			{
				current_page_num--;
				if ( current_page_num <= min_page_num)
				{
					current_page_num = min_page_num;
				}

				$("#current-page").val( current_page_num );
				update_preview_img( book_location );
				return false;
			}
		);
		$("#next-page").on("click",
			function()
			{
				current_page_num++;
				if ( current_page_num >= max_page_num)
				{
					current_page_num = max_page_num;
				}

				$("#current-page").val( current_page_num );
				update_preview_img( book_location );

				return false;
			}
		);

//------------------- submit
		$("form[name=jump_to_page]").on("submit",
			function()
			{
				current_page_num = $("#current-page").val();
				if ( current_page_num <= min_page_num)
				{
					current_page_num = min_page_num;
				}
				if ( current_page_num >= max_page_num)
				{
					current_page_num = max_page_num;
				}
				$("#current-page").val( current_page_num );
				update_preview_img( book_location );

				$(".wrap-book-content").hide();

				return false;
			}
		);

//------------------------------------
		$(".view-book-content").click(
			function()
			{
				$(".wrap-book-content").toggle();
			}
		);
		$("a[href=#close]").click(
			function()
			{
				var target = $(this).attr("data-target");
				$(target).hide();
			}
		);
		$("a[href^='page_num']").click(
			function()
			{
//console.log("Click!");
				var target = $(this).attr("data-target");
				$("#current-page").val( target );
				$("form[name=jump_to_page]").submit();

				return false;
			}
		);

//-------------------------------- scale page
		var normal_page_size = $(".wrapper").width();
		var scale_percent = 5;
		var pix_percent = normal_page_size / 100;
		var scale_pix = scale_percent * pix_percent;
		//var move_left = scale_pix / 2;

		$("#scale-page-more").click(
		  function()
		  {
		    
			var page_width = $(".preview-page").width() + scale_pix;
			$(".preview-page").css("width",page_width + "px");
			var pix_left = parseFloat( $(".preview-page").css("left") );
			//var new_left = Math.abs(pix_left) + move_left;
			//$(".preview-page").css("left","-"+new_left + "px");
		    
		  }
		);

		$("#scale-page-less").click(
		  function()
		  {
		    
			var page_width = $(".preview-page").width() - scale_pix;
			if ( page_width >= normal_page_size )
			{
				$(".preview-page").css("width",page_width + "px");
				var pix_left = parseFloat( $(".preview-page").css("left") );
				//var new_left = Math.abs(pix_left) - move_left;
				//$(".preview-page").css("left","-"+new_left + "px");
			}
		    
		  }
		);
		$("#scale-page-reset").click(
		  function()
		  {
		    
			$(".preview-page").css("width",normal_page_size + "px");
			//$(".preview-page").css("left","0");
		    
		  }
		);

	}
);//end ready

function update_preview_img( book_location )
{
	if ( !book_location )
	{
		$("#info .message").text( "get param book_location is empty...stopping..." );
		$("#info").show();
		$("#info").fadeOut(7*1000,
			function()
			{
				$("#info").hide();
			}
		);

		return;
	}

	//$("#info .message").text( "download image book page...Wait!" );
	//$("#info").show();

	var current_page = current_page_num;
	if ( current_page_num <= 99 )
	{
		var current_page = "0" + current_page_num;
	}
	if ( current_page_num <= 9 )
	{
		var current_page = "00" + current_page_num;
	}

	if (filelist)
	{
		var a = filelist.item( current_page-1 );
//console.log( a.nodeName );
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var filename = a.text;
		}
		else
		{
			var filename = a.textContent;
		}
//console.log( filename );
		var preview_page = book_location + "/" + filename;
		$(".preview-page img").attr("src",preview_page);
	}
	else
	{

		var filename = filename_tpl.replace( "{num}", current_page );
		var preview_page = book_location + "/" + filename;
		$(".preview-page img").attr("src",preview_page);
	}
	//$("#info .message").text("");
	//$("#info").hide().fadeOut(3000);

	$("#scroll-to-top").click();
}


function read_xml_file( url )
{
//console.log( "function read_xml_file( "+ url +" )");
	var xml=null;
	try 
	{ 
		xml=getXMLDocument(url);
		return xml;
	} 
	catch(err)
	{
console.log( "err.description = " + err.description );
console.log( "err.message = " + err.message );
console.log( "err.name = " + err.name );
console.log( "err.filename = " + err.filename );
		return false;
	}  // ----------------------end try
	
}//-----------------------end func


/*
function read_xml_file( url )
{
console.log( "function read_xml_file( "+ url +" )");
	$.ajax ({
		type: "GET",
		url: url,
		dataType:"xml",
		//processData:false,
		success:function(data,status)
		{
//console.log("status - " + status);
			xml = data;
//console.log( "xml = "+ xml);
        		return xml;
		},
		error:function(data, status, errorThrown)
		{
console.log("status - " + status);
		}
	}
	);
	
}//-----------------------end func
*/

function read_filelist( xml )
{
	try 
	{ 
		var files = xml.getElementsByTagName("filename");
		return files;
	} 
	catch(err)
	{
console.log( "err.description = " + err.description );
console.log( "err.message = " + err.message );
console.log( "err.name = " + err.name );
console.log( "err.filename = " + err.filename );
		return false;
	}  // ----------------------end try
	
}//-----------------------end func

function form_content()
{
	var html="";
	$(xml_data).find('section').each(
		function()
		{
			var section = $(this);
			var url = section.attr('numpage');
			var link_title = section.text().trim();
			html += book_content_url_tpl
.replace( /#page-num/g, url)
.replace( /#link-title/g, link_title);
		}
	);//---------------------- end each
	if (html.length > 0)
	{
		$("#book-content").html( html );
		$(".view-book-content").show();
		$(".wrap-book-content").show();
	}

}//-----------------------end func

