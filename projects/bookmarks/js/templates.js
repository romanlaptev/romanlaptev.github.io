var templates = {
	
	"bootstrap_tpl" : {
		"container_tpl" : "<div class='panel panel-primary'>\
<div class='panel-heading'>\
<ul class='breadcrumb breadcrumb-custom'>{{breadcrumbs}}</ul></div>\
<div class='panel-body'>{{children}}</div>\
</div>",
		"folder_tpl" : "<div class='folder2'>\
<a class='' href='#q=view-container&id={{id}}' title='{{tooltip}}'>{{title}}</a>\
{{annos}}\
</div>",
		"link_tpl" : "<div class='link'>\
<a class='' href='{{uri}}' target='_blank' title='{{tooltip}}'>{{iconuri}}{{title}}</a>\
{{annos}}\
</div>",
		"annos_tpl" : "<div class='annos'>{{annos}}</div>",
		"iconuri_tpl" : "<img class='icon-uri' src='{{iconuri}}'/>",
		"tooltip_tpl" : "created: {{dateAdded}}, modified:{{lastModified}}",
		"breadcrumbs_item_tpl" : "<li><a href='#q=view-container&id={{id}}'>{{title}}</a></li>"
	},
		
	"materialize_tpl" : {
		"container_tpl" : "<div class='panel panel-primary'>\
		<div class='cyan darken-1 breadcrumb-custom'>\
			<ul class=''>\
				{{breadcrumbs}}\
			</ul>\
		</div>\
	<div class='card-panel'>{{children}}</div>\
</div>",
		"folder_tpl" : "<div class='folder2 collection'>\
<a class='collection-item' href='#q=view-container&id={{id}}' title='{{tooltip}}'>{{title}}</a>\
{{annos}}\
</div>",
		"link_tpl" : "<div class='link section'>\
<a class='' href='{{uri}}' target='_blank' title='{{tooltip}}'>{{iconuri}}{{title}}</a>\
{{annos}}\
</div>",
		"annos_tpl" : "<div class='annos'>{{annos}}</div>",
		"iconuri_tpl" : "<img class='icon-uri' src='{{iconuri}}'/>",
		"tooltip_tpl" : "created: {{dateAdded}}, modified:{{lastModified}}",
		"breadcrumbs_item_tpl" : "<li><a href='#q=view-container&id={{id}}' class='breadcrumb'>{{title}}</a></li>"
	}
		
}//end templates{}
console.log("templates:", templates);