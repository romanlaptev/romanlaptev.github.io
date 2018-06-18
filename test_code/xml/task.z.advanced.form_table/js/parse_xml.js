var xml_file = "xml/person_answer.xml";
var xml_data;

//------------------- html templates
var table_tpl ="<table class='table table-bordered'><thead><tr class='list-header success'>#thead</tr></thead><tbody>#records</tbody></table>";
var thead_tpl = "<th>#column_name</th>";
var record_tpl = "<tr>#columns</tr>";
var column_tpl = "<td class='list-body' valign='top' rowspan='#rowspan'>#data</td>";
var checkbox_tpl = "<td class='list-body' valign='top' rowspan='#rowspan'><input value='#data' type='checkbox' name='records_list_check2'></td>";

var sub_table_tpl ="<table class='table table-bordered'><tbody>#records</tbody></table>";
var sub_record_tpl = "<tr><td class='list-body' valign='top'>#data</td></tr>";
var sub_record_img_tpl = "<tr><td class='list-body text-center' valign='top'><img src='#data' width='160'></td></tr>";

$(document).ready(function()
{
//----------------- read xml
	get_xml (xml_file);

});//end ready

function get_xml( xml_file )
{
	$.ajax({
		type: "POST",
		url: xml_file,
		dataType: "xml",
		beforeSend: function (XMLHttpRequest) 
		{
//console.log("beforeSend function");
		},
		success: function(xml){
			xml_data = xml;
			parse_xml("#insert_data");
		},
		error:function( data, status, errorThrown )
		{
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
		},
		complete: function (XMLHttpRequest, textStatus) 
		{
console.log("complete function , status - " + textStatus);
		},

	});
}


function parse_xml( block )
{
	var html = table_tpl;
	var html_thead = "";
	var html_tbody = "";
	var html_records = "";
	var html_columns = "";
//---------------------------- form THEAD

	html_thead += thead_tpl.replace("#column_name", "" );
	html_thead += thead_tpl.replace("#column_name", "#" );
	$(xml_data).find('xlist2').find('column').each(function()
		{
			var column = $(this);
			html_thead += thead_tpl.replace("#column_name", column.attr('title') );
		}
	);
	html = html.replace("#thead", html_thead );

//------------------------- read xrecord
	$(xml_data).find('xdata').find('xrecord').each(function()
		{
			var pers_id = $(this).attr('number');
			var person_data = $(this).find('xb');

			html_columns = checkbox_tpl.replace("#data", pers_id);
			html_columns += column_tpl.replace("#data", pers_id);
			html_columns += get_person_fields( person_data );
			html_records += record_tpl.replace("#columns", html_columns );

		}
	);
	html = html.replace("#records", html_records );
	$(block).html( html ).show();
}


function get_person_fields( person_data )
{
//id из блока xform
//id="250127" name="pers_name"
	//id="250129" name="lastname"
	//id="250132" name="firstname"
	//id="250137" name="birthdate"
		//id="250140" name="dd"
		//id="250141" name="mm"
		//id="250142" name="yyyy"

	var lastname = $(person_data).find("#250129");
	var firstname = $(person_data).find("#250132");
	var birthdate_dd = $(person_data).find("#250140").text();
	if ( birthdate_dd.length <2 )
	{
		birthdate_dd = "0" + birthdate_dd ;
	}
	var birthdate_mm = $(person_data).find("#250141").text();
	if ( birthdate_mm.length <2 )
	{
		birthdate_mm = "0" + birthdate_mm;
	}
	var birthdate_yyyy = $(person_data).find("#250142").text();
	var birthdate = birthdate_dd + "." + birthdate_mm + "." + birthdate_yyyy;
//-----------------------
//id="250145" name="pers_adr" 
	//id="250150" name="address"
		//id="250152" name="city"
		//id="250154" name="street"
		//id="250156" name="building"
		//id="250159" name="apart"
	var pers_adr = $(person_data).find("#250145");
	var html_address = get_person_addr( pers_adr );
	var html_building = get_person_info( pers_adr, "#250156" );
	var html_apartment = get_person_info( pers_adr, "#250159" );

//-----------------------
//id="250162" name="fk"
	//id="250178" mime_type="image/jpeg" name="foto"
	//id="250175" name="notes"
	var fk = $(person_data).find("#250162");
	var html_photos = get_person_photos( fk, "250178" , sub_record_img_tpl);
	var html_notes = get_person_photos( fk, "250175" , sub_record_tpl);

	var html = "";
	html += column_tpl.replace("#data", firstname.text() );
	html += column_tpl.replace("#data", lastname.text() );
	html += column_tpl.replace("#data", birthdate );
	html += column_tpl.replace("#data", html_address);
	html += column_tpl.replace("#data", html_building);
	html += column_tpl.replace("#data", html_apartment);
	html += column_tpl.replace("#data", html_photos);
	html += column_tpl.replace("#data", html_notes);

	return html;
}


function get_person_addr( pers_adr )
{
	var html = "";
	var html_record = "";

	$(pers_adr).children("xbr").each(
		function()
		{
			var city = $(this).find("#250152").text();
			var street = $(this).find("#250154").text();
			var address = city + " "  + street;
//console.log ( address );
			html_record += sub_record_tpl.replace("#data", address);
		}
	);
	html = sub_table_tpl.replace("#records", html_record);
	return html;
}

function get_person_info( obj, id )
{
	var html = "";
	var html_record = "";

	$(obj).children("xbr").each(
		function()
		{
			var value = $(this).find(id).text();
			html_record += sub_record_tpl.replace("#data", value);
		}
	);
	html = sub_table_tpl.replace("#records", html_record);
	return html;
}

function get_person_photos( obj, test_id, record_tpl )
{
	var html = "";
	var html_record = "";

	$(obj).children("xbr").each(
		function()
		{
			var note  = $(this);
			$(note).find("xf").each(
				function()
				{
//alert ( $(this).html() );
					var id = $(this).attr("id");
					if ( id == test_id)
					{
						var value =$(this).text();
						html_record += record_tpl.replace("#data", value);
					}
				}
			);
		}
	);
	html = sub_table_tpl.replace("#records", html_record);
	return html;
}

