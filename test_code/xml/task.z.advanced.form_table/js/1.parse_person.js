function form_table()
{
	var xml_file = "xml/person_answer.xml";
	var xml_data;

	//------------------- html templates
	var table_tpl ="<table class='table table-bordered'><thead><tr class='list-header success'>#thead</tr></thead><tbody>#records</tbody></table>";
	var thead_tpl = "<th>#column_name</th>";
	var record_tpl = "<tr>#columns</tr>";
	var column_rowspan_tpl = "<td class='list-body' valign='top' rowspan='#rowspan'>#data</td>";
	var column_tpl = "<td class='list-body' valign='top'>#data</td>";
	var checkbox_tpl = "<td class='list-body' valign='top' rowspan='#rowspan'><input value='#data' type='checkbox' name='records_list_check2'></td>";
	var column_img_tpl = "<td class='list-body text-center photo' valign='top'><img src='#data' width='160'></td>";
	var column_img_rw_tpl = "<td class='list-body text-center photo' valign='top' rowspan='#rowspan'><img src='#data' width='160'></td>";

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

				var html_columns = "";
				html_columns += get_person_fields( pers_id, person_data );
				html_records += record_tpl.replace("#columns", html_columns );

			}
		);
		html = html.replace("#records", html_records );
		$(block).html( html ).show();
	}


	function get_person_fields( pers_id, person_data )
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
		var address = get_person_addr( pers_adr );
	//-----------------------
	//id="250162" name="fk"
		//id="250178" mime_type="image/jpeg" name="foto"
		//id="250175" name="notes"
		var fk = $(person_data).find("#250162");
		var photos = get_person_photos( fk);

		var html = "";
		html += checkbox_tpl.replace("#data", pers_id);
		html += column_rowspan_tpl.replace("#data", pers_id);
		html += column_rowspan_tpl.replace("#data", firstname.text() );
		html += column_rowspan_tpl.replace("#data", lastname.text() );
		html += column_rowspan_tpl.replace("#data", birthdate );

		html += form_addr_first_line ( address );
		html += form_photo_first_line ( photos );

		if ( address.address.length > 1)
		{
			var num_rowspan = address.address.length;
			html = html.replace(/#rowspan/g, num_rowspan );
	//console.log(address.address.length);
	//console.log(photos.photos.length);
			for ( n1 = 1; n1 <( address.address.length ); n1++ )
			{
				html += "</tr>";
				html += column_tpl.replace("#data", address.address[n1]);
				html += column_tpl.replace("#data", address.building[n1]);
				html += column_tpl.replace("#data", address.apartment[n1]);

				if ( typeof(photos.photos[n1]) == "undefined")
				{
					html += column_tpl.replace("#data", "");
				}
				else
				{
					html += column_img_tpl.replace("#data", photos.photos[n1]);
				}

				if ( typeof(photos.notes[n1]) == "undefined")
					html += column_tpl.replace("#data", "");
				else
					html += column_tpl.replace("#data", photos.notes[n1]);
			}

		}

		return html;
	}


	function get_person_addr( pers_adr )
	{
		var addr_items = [];
		var build_items = [];
		var apart_items = [];
		$(pers_adr).children("xbr").each(
			function()
			{
				var city = $(this).find("#250152").text();
				var street = $(this).find("#250154").text();
				var address = city + " "  + street;
				var build = $(this).find("#250156").text();
				var apart = $(this).find("#250159").text();

				 addr_items.push( address );
				 build_items.push( build );
				 apart_items.push( apart );
			}
		);
		var addr_obj = {
			"address": addr_items,
			"building": build_items,
			"apartment": apart_items
		};
	//console.log ( addr_obj );
		return addr_obj;
	}

	function get_person_photos( obj )
	{
	//"250178" , sub_record_img_tpl
		//id="250178" mime_type="image/jpeg" name="foto"
		//id="250175" name="notes"
		var photo_items = [];
		var notes_items = [];

		$(obj).children("xbr").each(
			function()
			{
				var note  = $(this);
				$(note).find("xb").children("xbr").each(
					function()
					{
	//alert ( $(this).html() );
						var foto = $(this).find("#250178").text();
						var note = $(this).find("#250175").text();

						photo_items.push ( foto );
						notes_items.push ( note );
					}
				);
			}
		);
		var photos_obj ={
			"photos": photo_items,
			"notes": notes_items
		};
		return photos_obj;
	}


	function form_addr_first_line ( address )
	{
		var html = "";
		html += column_tpl.replace("#data", address.address[0] );
		html += column_tpl.replace("#data", address.building[0] );
		html += column_tpl.replace("#data", address.apartment[0] );
	//alert(html);
		return html;
	}

	function form_photo_first_line ( photos )
	{
		var html = "";
		html += column_img_tpl.replace("#data", photos.photos[0] );
		html += column_tpl.replace("#data", photos.notes[0] );
		return html;
	}

}//end form_table()
