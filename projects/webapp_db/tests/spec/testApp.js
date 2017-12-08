//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "html";
//console.log( jasmine );
console.log( webApp.draw );


var _getRecords_ = webApp.iDBmodule.getRecords;
webApp.iDBmodule.getRecords = function( opt ){
console.log("run fake getRecords()");
console.log(opt);

	var storeName = opt["storeName"];
	var data = [];
	switch( storeName ){
		case "node":
var record = {
changed: "1491727695",
//checkResult: Array [ true ]
comment: "0",
created: "1336651468",
language: "ru",
moderate: "0",
nid: "20",
promote: "1",
status: "1",
sticky: "0",
title: "Ballet Mistress",
tnid: "0",
translate: "0",
type: "photogallery_image",
uid: "1",
vid: "20"
};
			data.push(record);
//console.log( data );
			if( typeof opt["callback"] == "function"){
				opt["callback"]( data );
			}
		break;
		
		case "node_revisions":
var record = {
body: "",
//checkResult: Array [ true ]
format: "1",
log: "",
nid: "20",
teaser: "",
timestamp: "1491727695",
title: "Ballet Mistress",
uid: "1",
vid: "20"
};
			data.push(record);
//console.log( data );
			if( typeof opt["callback"] == "function"){
				opt["callback"]( data );
			}
		break;
		
		case "content_node_field_instance":
var record = {
	field_name: "field_author",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_num_page",
	type_name: "photogallery_image"
 };
data.push(record);
			
record = {
	field_name: "field_img1_gallery",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_big_img",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_preview_img",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_title",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_test",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_content_location",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_original_img",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_info",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_preview_img_preset",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_termin_image",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_termin_images_location",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_filename",
	type_name: "photogallery_image"
 };
data.push(record);

record = {
	field_name: "field_zoom_img",
	type_name: "photogallery_image"
 };
data.push(record);

//console.log( data );
			if( typeof opt["callback"] == "function"){
				opt["callback"]( data );
			}
		break;
		
		case "content_type_photogallery_image":
var record = {
field_author_value: "Майкл Паркес",
field_big_img_value: "/site-content/albums/gallery_images/imagecache/w1024/gallery_images",
field_create_date_value: "1994",
field_filename_value: "ballet_mistress.jpg",
field_img1_gallery_data: "NULL",
field_img1_gallery_fid: "NULL",
field_img1_gallery_list: "NULL",
field_info_format: "NULL",
field_info_value: "NULL",
field_num_page_value: "1994",
field_original_img_value: "/site-content/albums/gallery_images",
field_preview_img_preset_value: "preview_gallery_img_portrait",
field_preview_img_value: "/site-content/albums/gallery_images/imagecache/preview_gallery_img/gallery_images",
field_test_value: "NULL",
field_title_value: "Ballet Mistress, 1994, Майкл Паркес",
field_zoom_img_value: "NULL",
nid: "20",
vid: "20"
};
			data.push(record);
			if( typeof opt["callback"] == "function"){
				opt["callback"]( data );
			}
		break;
		
	}//end switch()
};//end fake getRecords()
		
//console.log( webApp.iDBmodule.getRecords.toString() );
//console.log( _getRecords_.toString() );

/*
describe("test webapp", function(){
	
	beforeAll(function(){
console.log("beforeAll ", arguments);
//console.log( _kd.testing );
	});
	
	beforeEach(function(){
console.log("beforeEach ", arguments);
	});
	
	afterEach(function(){
console.log("afterEach ", arguments);
	});
	
	it("test init application , must be loaded HTML templates into memory.", function(){
		//expect( myName() ).toEqual("Roman");
		expect( true ).toBe(true);
	});
});
*/

describe("test application", function(){
	
	beforeAll(function(){
		//loadFixtures("test.index.html");
		// spyOn( webApp.iDBmodule, "getRecords" ).and.callFake( function(){
// console.log("test method .getRecords(), fake call", arguments);
		// });
	});
			
	it("test 1", function(){
		expect(true).toBe(true);
	});//end it
	
});//end describe