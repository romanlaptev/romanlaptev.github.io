//(function(){
	
	var App =  App || function(){
	
		// private variables and functions

		_vars = {
			"logMsg" : "",
			
			"apiType": "yandexMaps",
			//"apiType": "googleMaps",
			//"apiType": "2GIS",
			//"apiType":  "OpenStreetMaps",
			//"apiType":  "ArcGIS",
			
			"ya_apiLink": "https://api-maps.yandex.ru/2.1/?apikey={{apiKey}}&lang=ru_RU",
			"ya_apiKey" : "6868d08d-fea9-41c7-8f32-f3a3a33495ed",
			//"ya_geocodeUrl" : "https://geocode-maps.yandex.ru/1.x/?apikey={{apiKey}}&geocode={{lng}},{{lat}}",
"ya_geocodeUrl" : "https://geocode-maps.yandex.ru/1.x/?apikey={{apiKey}}&format=json&geocode={{lng}},{{lat}}&kind=district",
//"ya_geocodeUrl" : "https://geocode-maps.yandex.ru/1.x/?apikey={{apiKey}}&format=json&geocode={{lng}},{{lat}}&kind=street",

			"google_apiLink": "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key={{apiKey}}&ver=3.exp",
//http://maps.google.com/maps/api/js?sensor=false			
			"google_apiKey" : "AIzaSyDit1piuzGn-N0JVzirMUcERxxWZ4DK4OI",
			
			//https://api.2gis.ru/doc/maps/ru/quickstart/
			"gis_apiLink": "https://maps.api.2gis.ru/2.0/loader.js?pkg=full",
			
			"os_apiLink": "https://openlayers.org/api/OpenLayers.js",
			//"os_apiLink": "js/api/OpenLayers.js",
			"os_geocodeUrl" : "https://nominatim.openstreetmap.org/reverse?\
format={{format}}\
&lat={{lat}}&lon={{lon}}\
&addressdetails={{addr_details}}\
&extratags={{extratags}}\
&namedetails={{namedetails}}\
",

			
			//"arcgis_apiLink": "https://js.arcgis.com/3.25/",
			//"arcgis_cssLink": "https://js.arcgis.com/3.25/esri/css/esri.css"
			"arcgis_apiLink": "https://js.arcgis.com/4.13/",
			"arcgis_cssLink": "https://js.arcgis.com/4.13/esri/css/main.css"
			
		};//end _vars

		var GPS_TIMEOUT_POSITION = 300; //(sec) time that is allowed to end finding position		
		
		var _init = function(){
//console.log("App initialize...");
			
			_vars["htmlObj"]={
				"latitude" : document.querySelector("#latitude"),
				"longitude" : document.querySelector("#longitude"),
				"accuracy" : document.querySelector("#accuracy"),
				"datetime" : document.querySelector("#datetime"),
				"altitude" : document.querySelector("#altitude"),
				"altitudeAccuracy" : document.querySelector("#altitude-accuracy"),
				"heading" : document.querySelector("#heading"),
				"speed" : document.querySelector("#speed"),
				"addresTitle": document.querySelector("#addr-title"),
				"addresText": document.querySelector("#addr-text"),

				"appModal": document.querySelector("#app-modal"),
				
				"map": document.querySelector("#show-map"),
				"mapID": "show-map",
				
				"modalTitle": document.querySelector("#modal-title"),
				"iconModalClose": document.querySelector("#icon-modal-close"),
				
				"waitOverlay": document.querySelector("#wait"),
				"btnGetCoord": document.querySelector("#btn-get-coords"),
				"btnGetAddr": document.querySelector("#btn-get-address"),
				"btnShowMap": document.querySelector("#btn-show-map"),
				
				"blockApiType": document.querySelector("#api-type")
			};
			
			_vars["htmlObj"]["addresTitle"].style.display="none";
			_vars["htmlObj"]["waitOverlay"].style.display="none";

//----------------------------------------- load map API
			_loadApi();

//-----------------------------------------
			_vars["htmlObj"]["btnGetCoord"].onclick = function(e){
//console.log(e);
				_waitWindow( "open" );
				_handleCoordinateBtn();
			}//end event
			
//-----------------------------------------
			func.addEvent( _vars["htmlObj"]["btnGetAddr"], "click", function(){
				
				if( !_vars["position"] ){
					_vars["logMsg"] = "Error, first you need to get the coordinates.";
					func.logAlert(_vars["logMsg"], "error");
					return false;
				}
				
				_waitWindow( "open" );
				_getAdress({
					lng: _vars["position"]["coords"].longitude,
					lat: _vars["position"]["coords"].latitude
				});
			
			});//end event
			
//-----------------------------------------
			_vars["htmlObj"]["btnShowMap"].onclick = function(e){
//console.log(e);
				if( !_vars["position"] ){
					_vars["logMsg"] = "Error, first you need to get the coordinates.";
					func.logAlert(_vars["logMsg"], "error");
					return false;
				}
				_handleMapBtn();
			}//end event
			
//-----------------------------------------
			_vars["htmlObj"]["iconModalClose"].onclick = function(e){
				_vars["htmlObj"]["appModal"].classList.remove("active");
				_destroyMap( _vars["apiType"] );
			}//end event

//-----------------------------------------
			func.addEvent( _vars["htmlObj"]["blockApiType"], "click", function(e){
//console.log( e.target );

				if( e.target.nodeName ===  "INPUT"){
//console.log( e.target.checked, e.target.value );
					_vars["apiType"] = e.target.value;
					_loadApi();
				}

				if( e.target.nodeName ===  "LABEL"){
//console.log( e.target );
//console.log( e.target.children["api_type"] );
//console.log( e.target.children["api_type"].value, e.target.children["api_type"].checked );
					_vars["apiType"] = e.target.children["api_type"].value;
					_loadApi();
          e.target.children["api_type"].checked = true;
          e.preventDefault();
          //e.stopPropagation();
				}
        
			});//end event

			
		};// end _init


		function _loadApi(){
			var script;
			switch ( _vars["apiType"]){
				
				case "yandexMaps":
					if( typeof ymaps === "undefined"){
/*						
						//var script = document.createElement('script');
						script.src = _vars["ya_apiLink"].replace("{{apiKey}}", _vars["ya_apiKey"]);
						_vars["apiUrl"] = _vars["ya_apiLink"].replace("{{apiKey}}", "***");
						_waitWindow( "open" );
						document.body.appendChild(script);
						//document.getElementsByTagName('head')[0].appendChild(script);
						
						script.onload = function() {
							//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load map API, url: " + _vars["apiUrl"];
func.logAlert(_vars["logMsg"],"success");
						 }
*/
						_waitWindow( "open" );
						var _url = _vars["ya_apiLink"].replace("{{apiKey}}", _vars["ya_apiKey"]);
						script = _loadScript(_url);
						script.onload = function() {
//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load Yandex map API";
func.logAlert(_vars["logMsg"],"success");
						 }
						script.onerror = function() {
							alert( "onerror " + this.src );
						};
					}
				break;
				
				case "googleMaps":
					if( typeof google === "undefined" ){
/*						
						script.src = _vars["google_apiLink"].replace("{{apiKey}}", _vars["google_apiKey"]);
						_vars["apiUrl"] = _vars["google_apiLink"].replace("{{apiKey}}", "***");
						_waitWindow( "open" );
						document.body.appendChild(script);
						
						script.onload = function() {
							//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load map API, url: " + _vars["apiUrl"]+", version: "+ google.maps.version;
func.logAlert(_vars["logMsg"],"success");
						 }
*/
						_waitWindow( "open" );
						var _url = _vars["google_apiLink"].replace("{{apiKey}}", _vars["google_apiKey"]);
						script = _loadScript(_url);
						script.onload = function() {
//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load googleMaps API, version: "+ google.maps.version;
func.logAlert(_vars["logMsg"],"success");
						 }
						script.onerror = function() {
							alert( "onerror " + this.src );
						};

					}
				break;

				case "2GIS":
					if( typeof DG === "undefined" ){
/*						
						script.src = _vars["gis_apiLink"];
						_vars["apiUrl"] = _vars["gis_apiLink"];
						_waitWindow( "open" );
						document.body.appendChild(script);
						
						script.onload = function() {
							//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load map API, url: " + _vars["apiUrl"]+", version: "+  DG.version;
func.logAlert(_vars["logMsg"],"success");
						 }
*/						
						_waitWindow( "open" );
						script = _loadScript( _vars["gis_apiLink"] );
						script.onload = function() {
//alert( "onload " + this.src);
							_waitWindow( "close" );
							DG.then(function () {
//console.log(DG);
_vars["logMsg"] = "load 2GIS map API, version: "+  DG.version;
func.logAlert(_vars["logMsg"],"success");
							});
						 }
						script.onerror = function() {
							alert( "onerror " + this.src );
						};
						 
					}
				break;

				case "OpenStreetMaps":
					if( typeof OpenLayers === "undefined" ){
/*						
						_vars["apiUrl"] = _vars["os_apiLink"];
						script.src = _vars["os_apiLink"];
						
						_waitWindow( "open" );
						document.body.appendChild(script);
						
						script.onload = function() {
console.log( OpenLayers );
						_waitWindow( "close" );
_vars["logMsg"] = "load map API, url: " + _vars["apiUrl"]+", version: "+OpenLayers.VERSION_NUMBER;
func.logAlert(_vars["logMsg"],"success");
						 }
*/
						_waitWindow( "open" );
						script = _loadScript( _vars["os_apiLink"] );
						script.onload = function() {
//alert( "onload " + this.src);
							_waitWindow( "close" );
_vars["logMsg"] = "load OpenStreetMaps API, version: "+OpenLayers.VERSION_NUMBER;
func.logAlert(_vars["logMsg"],"success");
						 }
						script.onerror = function() {
							alert( "onerror " + this.src );
						};
						 
					}
				break;

				case "ArcGIS":
					if( typeof dojo === "undefined" ){
						
						_waitWindow( "open" );
						var css = _loadCss( _vars["arcgis_cssLink"] );
						css.onload = function() {
	//alert( "onload " + this.src);
	_vars["logMsg"] = "load ArcGIS map API css";
	func.logAlert(_vars["logMsg"],"success");
						}
						
						script = _loadScript( _vars["arcgis_apiLink"] );
						script.onload = function() {
	//alert( "onload " + this.src);
							_waitWindow( "close" );
	_vars["logMsg"] = "load ArcGIS map API script, Dojo framework version: " + dojo.version.toString();
	func.logAlert(_vars["logMsg"],"success");
						}
						script.onerror = function() {
							alert( "onerror " + this.src );
						};
					}
				break;
				
				default:
_vars["logMsg"] = "error load map API, not defined or incorrect map API url..." ;
func.logAlert(_vars["logMsg"],"error");
				break;
			};//end switch
			
			
			function _loadCss(url) {
				var link = document.createElement("link");
				link.type = "text/css";
				link.rel = "stylesheet";
				link.href = url;
				document.getElementsByTagName("head")[0].appendChild(link);
				return link;
			};//end _loadCss()
			
			function _loadScript(url) {
				var script = document.createElement("script");
				script.src = url;
				script.type = "text/javascript";
				document.getElementsByTagName("head")[0].appendChild( script );
				return script;
			};//end _loadCss()
			
		}//end _loadApi()
		

		_getDateTime = function( timestamp ){
			var now = new Date( timestamp );
			_cDate = func.timeStampToDateStr(now);
//console.log(now, _cDate);
			return _cDate;
		};//end _getDateTime()
		
		
		var _handleCoordinateBtn = function(){

			_getCoordinates( success_fn, fail_fn );

			function success_fn( posObj ){
//console.log( "async navigator.geolocation.getCurrentPosition ");
//console.log( posObj);
// for(var item in posObj.coords){
	// console.log( item, posObj.coords[item] );
// }
				_vars["htmlObj"]["latitude"].innerHTML = posObj.coords.latitude;
				_vars["htmlObj"]["longitude"].innerHTML = posObj.coords.longitude;
				_vars["htmlObj"]["accuracy"].innerHTML = posObj.coords.accuracy;
				_vars["htmlObj"]["datetime"].innerHTML = _getDateTime( posObj.timestamp );
				
				_vars["htmlObj"]["altitude"].innerHTML = posObj.coords.altitude;
				_vars["htmlObj"]["altitudeAccuracy"].innerHTML = posObj.coords.altitudeAccuracy;
				_vars["htmlObj"]["heading"].innerHTML = posObj.coords.heading;
				_vars["htmlObj"]["speed"].innerHTML = posObj.coords.speed;
				
				_vars["position"] = posObj;
				
				_vars["logMsg"] = "Your coordinates were determined successfully.";
				func.logAlert(_vars["logMsg"], "success");
				_vars["htmlObj"]["btnShowMap"].classList.remove("disabled");
				
				// _getAdress({
					// lng: posObj.coords.longitude,
					// lat: posObj.coords.latitude
				// });

				_waitWindow( "close" );
				
			}//end success_fn()
			
			function fail_fn( error ){
				var errorTypes = {
					1: "Permission denied",
					2: "Position is not available",
					3: "Request timeout"
				};
				_vars["logMsg"] = "Error code: " + error.code + ", " + errorTypes[error.code] + ", " + error.message;
console.log(error);
				func.logAlert(_vars["logMsg"], "error");
			}//end fail_fn()

			
		};//_handleCoordinateBtn()
		

		var _handleMapBtn = function(opt){
			
			_waitWindow( "open" );
			switch ( _vars["apiType"]){
				
				case "yandexMaps":
console.log( ymaps );
console.log( "yandexMaps API version: " + ymaps.meta.version );
					ymaps.ready( initYandexMap );
				break;
				
				case "googleMaps":
console.log( google );
console.log( "googleMaps API version: " + google.maps.version );
//------------------------------- resize map wrapper (95% screen size)
					var _w = (window.innerWidth / 100) * 95;
//console.log( window.innerWidth, _w);
//_vars["logMsg"] = "window.innerWidth = " + window.innerWidth+"px, map width = "+ _w+"px (95% screen size)";
//func.logAlert(_vars["logMsg"],"info");
					_vars["htmlObj"]["map"].style.width = _w+"px";
//----------------------------
					_vars["htmlObj"]["modalTitle"].innerHTML = "googleMaps API version: " + google.maps.version;
					
					var lat = _vars["position"]["coords"].latitude.toFixed(5);// 55.03146
					var lng = _vars["position"]["coords"].longitude.toFixed(5);// 82.92317
					
					_vars.mapObj = new google.maps.Map( _vars["htmlObj"]["map"] , {
						zoom: 16,
						//center: new google.maps.LatLng(-34.397, 150.644),
						center: new google.maps.LatLng(lat, lng),
						mapTypeId: google.maps.MapTypeId.ROADMAP
						//mapTypeId: google.maps.MapTypeId.TERRAIN
					}); 
					
					_waitWindow( "close" );
					_vars["htmlObj"]["appModal"].classList.add("active");
				break;

				case "2GIS":
console.log("2GIS API version: " + DG.version);

//------------------------------- resize map wrapper (95% screen size)
					var _w = (window.innerWidth / 100) * 95;
//console.log( window.innerWidth, _w);
//_vars["logMsg"] = "window.innerWidth = " + window.innerWidth+"px, map width = "+ _w+"px (95% screen size)";
//func.logAlert(_vars["logMsg"],"info");
					_vars["htmlObj"]["map"].style.width = _w+"px";
//----------------------------
					_vars["htmlObj"]["modalTitle"].innerHTML = "2GIS Maps API version: " + DG.version;

					var lat = _vars["position"]["coords"].latitude.toFixed(5);// 55.03146
					var lng = _vars["position"]["coords"].longitude.toFixed(5);// 82.92317
					DG.then(function () {
						_vars.mapObj = DG.map( _vars["htmlObj"]["map"], {
							//center: [54.98, 82.89],
							center: [lat, lng],
							zoom: 16
						});
						DG.marker([lat, lng]).addTo( _vars.mapObj ).bindPopup("You are here...");
					});
					
					_waitWindow( "close" );
					_vars["htmlObj"]["appModal"].classList.add("active");
					
				break;

				case "OpenStreetMaps":
				
//------------------------------- resize map wrapper (95% screen size)
					var _w = (window.innerWidth / 100) * 95;
//console.log( window.innerWidth, _w);
//_vars["logMsg"] = "window.innerWidth = " + window.innerWidth+"px, map width = "+ _w+"px (95% screen size)";
//func.logAlert(_vars["logMsg"],"info");
					_vars["htmlObj"]["map"].style.width = _w+"px";
//----------------------------
					_vars["htmlObj"]["modalTitle"].innerHTML = "OpenStreet Maps API version: " + OpenLayers.VERSION_NUMBER;
				
//http://uralbash.ru/articles/2012/osm_example/
//https://wiki.openstreetmap.org/wiki/OpenLayers_Simple_Example
					_vars.mapObj = new OpenLayers.Map( _vars["htmlObj"]["mapID"] );
					var mapLayer = new OpenLayers.Layer.OSM();
					var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
					var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
					
					var lat = _vars["position"]["coords"].latitude.toFixed(5);// 55.03146
					var lng = _vars["position"]["coords"].longitude.toFixed(5);// 82.92317
					var position = new OpenLayers.LonLat( lng, lat ).transform( fromProjection, toProjection);
					
					_vars.mapObj.addLayer( mapLayer );
					//_vars.mapObj.zoomToMaxExtent();
					
					var zoom = 17; 
					_vars.mapObj.setCenter( position, zoom);

					_waitWindow( "close" );
					_vars["htmlObj"]["appModal"].classList.add("active");
				break;

				case "ArcGIS":
//------------------------------- resize map wrapper (95% screen size)
					var _w = (window.innerWidth / 100) * 95;
//console.log( window.innerWidth, _w);
//_vars["logMsg"] = "window.innerWidth = " + window.innerWidth+"px, map width = "+ _w+"px (95% screen size)";
//func.logAlert(_vars["logMsg"],"info");
					_vars["htmlObj"]["map"].style.width = _w+"px";
//----------------------------
					_vars["htmlObj"]["modalTitle"].innerHTML = "ArcGIS Maps API, Dojo framework version: " + dojo.version.toString();
				
					require([
					  "esri/Map",
					  "esri/views/MapView"
					], function(Map, MapView) {

					_vars.mapObj = new Map({
						//basemap: "topo-vector"
						basemap: "streets"
						//basemap: "topo"
					  });

					var lat = _vars["position"]["coords"].latitude.toFixed(5);// 55.03146
					var lng = _vars["position"]["coords"].longitude.toFixed(5);// 82.92317

					var view = new MapView({
						container: _vars["htmlObj"]["mapID"],
						map: _vars.mapObj,
						//center: [-118.71511,34.09042],
						center: [lng, lat],
						zoom: 15
					  });
//console.log(view);
//console.log(map.basemap.title);
//console.log(view.center.latitude);
view.when(function( e ){// This function will execute once the promise is resolved
console.log(e);			
	_waitWindow( "close" );
}, function( error ){// This function will execute if the promise is rejected due to an error
console.log(error);
	_vars["logMsg"] = "error creating ArcGIS map..." ;
	func.logAlert(_vars["logMsg"],"error");
});

						_vars["htmlObj"]["appModal"].classList.add("active");
					});
				
				break;

				default:
_vars["logMsg"] = "error create map, not defined or incorrect map API..." ;
func.logAlert(_vars["logMsg"],"error");
				break;
			};//end switch
			
		};//_handleMapBtn()



		var  _getCoordinates = function(success_fn, fail_fn){
//console.log(arguments);

			var opts = {
				enableHighAccuracy: true,  // high accuracy
				maximumAge: 0,  // no cache
				timeout: ( GPS_TIMEOUT_POSITION * 1000) // timeout
			};
			navigator.geolocation.getCurrentPosition(
				success_fn,
				fail_fn,
				opts);
		};//end _getCoordinates()
		
		
		var _getAdress = function(opt){
//console.log(opt);
			var p = {
				lng : null,
				lat : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			switch ( _vars["apiType"]){
				
				case "yandexMaps":
					var dataUrl = _vars["ya_geocodeUrl"]
					.replace( "{{apiKey}}", _vars["ya_apiKey"] )
					.replace( "{{lng}}", p["lng"] )
					.replace( "{{lat}}", p["lat"] );
		//console.log( dataUrl );		
					
					func.runAjaxCorrect( dataUrl, __postFunc );
				break;

				case "OpenStreetMaps":
//https://nominatim.org/release-docs/develop/api/Lookup/
//json_callback=<string>
//accept-language=<browser language string>
//email=<valid email address>
//debug=[0|1]
					var dataUrl = _vars["os_geocodeUrl"]
.replace( "{{format}}", "json" )//format=[xml|json|jsonv2|geojson|geocodejson]
.replace( "{{lat}}", p["lat"] )
.replace( "{{lon}}", p["lng"] )
.replace( "{{addr_details}}", 0 )//addressdetails=[0|1], Include a breakdown of the address into elements. (Default: 0)
.replace( "{{extratags}}", 0 )//extratags=[0|1], Include additional information in the result if available, e.g. wikipedia link, opening hours. (Default: 0)
.replace( "{{namedetails}}", 0 )//namedetails=[0|1], Include a list of alternative names in the results. These may include language variants, references, operator and brand. (Default: 0)					
//console.log( dataUrl );		
					func.runAjaxCorrect( dataUrl, __postFunc );
				break;
				
				case "googleMaps":
					//var google_map_pos = new google.maps.LatLng( p.lat, p.lng );
//console.log( google_map_pos );

					//var google_maps_geocoder = new google.maps.Geocoder();
					//google_maps_geocoder.geocode({ "latLng": google_map_pos },
						//function( results, status ) {
//console.log( results );
						//}
					//);
				case "2GIS":
				case "ArcGIS":
				default:
_vars["logMsg"] = "error getting address, not defined or incorrect map API..." ;
func.logAlert(_vars["logMsg"],"error");
					_waitWindow( "close" );
				break;
			};//end switch
			
			
			function __postFunc( data, runtime, xhr ) {
_vars["logMsg"] = "ajax load url: <b>" + dataUrl + "</b>, runtime: " + runtime +" sec";
console.log( _vars["logMsg"] );

//console.log( xhr.getAllResponseHeaders() );
				_vars["requestFormat"] = xhr.getResponseHeader("content-type");
				if( _vars["requestFormat"].indexOf("application/xml")  !== -1 || 
						_vars["requestFormat"].indexOf("text/xml") !== -1){
//console.log( "xhr.responseXML: ", xhr.responseXML );
					data = xhr.responseXML;
				}
				
//console.log( data );
//console.log( typeof data );
//console.log( data.length );
				if( data && data.length > 0){
					_parseAjax( data );
				} else {
_vars["logMsg"] = "error getting geolocation data..." ;
func.logAlert( _vars["logMsg"], "error");
					_waitWindow( "close" );
				}
				
			}//end __postFunc()

			function _parseAjax( data ){
				
				_vars["logMsg"] = "Your address was received.";
				func.logAlert(_vars["logMsg"], "success");
				
				if( _vars["requestFormat"].indexOf("application/xml") !== -1){
					_parseXML( data );
				}
				if( _vars["requestFormat"].indexOf("text/xml") !== -1){
					_parseXML( data );
				}
				
				if( _vars["requestFormat"].indexOf("application/json") !== -1){
					_parseJSON( data );
				}
				
			}//_parseAjax()


			function _parseXML(xml){
console.log("function _parseXML()");

_vars["xml"] = xml;

		var timeStart = new Date();

				try{
					xmlObj = func.convertXmlToObj( xml );
console.log(xmlObj);
		delete xml;
/*		
					webApp.vars["DB"]["nodes"] = _data_formNodesObj(xmlObj);
		//delete xmlObj;
					
					//_vars["hierarchyList"] = __formHierarchyList();
					//webApp.vars["loadDataRes"] = true;
		var timeEnd = new Date();
		var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
		webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
		_message( webApp.vars["logMsg"], "info");
		console.log( webApp.vars["logMsg"] );
*/
					_waitWindow( "close" );
				} catch(error) {
console.log( error );
_vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.logAlert( _vars["logMsg"], "error");
					_waitWindow( "close" );
				}//end catch

			}//end _parseXML()

			
			function _parseJSON( jsonStr ){
				try{
					var jsonObj = JSON.parse( jsonStr, function(key, value) {
			//console.log( key, value );
						return value;
					});
//console.log( jsonObj );
					var addrText = "";
					
					switch ( _vars["apiType"]){
						case "yandexMaps":
							var _result = jsonObj.response.GeoObjectCollection.featureMember;
							for( var n = 0; n < _result.length; n++){
								var _geoObj = _result[n]["GeoObject"];
		//console.log(_geoObj.name, _geoObj.description);
								addrText += _geoObj.metaDataProperty.GeocoderMetaData.text;
							}//next
	//console.log( addrText );
							_vars["htmlObj"]["addresTitle"].style.display = "block";
							_vars["htmlObj"]["addresText"].innerHTML = addrText;
						break;
						
						case "OpenStreetMaps":
							addrText = jsonObj["display_name"];
							_vars["htmlObj"]["addresTitle"].style.display = "block";
							_vars["htmlObj"]["addresText"].innerHTML = addrText;
						break;
					
						default:
	_vars["logMsg"] = "error parsing address, JSON format..." ;
	func.logAlert(_vars["logMsg"],"error");
						break;
					};//end switch
					
					_waitWindow( "close" );
					
				} catch(error) {
_vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
func.logAlert(_vars["logMsg"],"error");
					_waitWindow( "close" );
					//return;
				}//end catch

			}//end _parseJSON()
			
		};//end _getAdress()
		
		
//--------------------------------- yandex map API
//console.log("ymaps: ", ymaps);
		function initYandexMap(){ 
		
//------------------------------- resize map wrapper (95% screen size)
			var _w = (window.innerWidth / 100) * 95;
//console.log( window.innerWidth, _w);
//_vars["logMsg"] = "window.innerWidth = " + window.innerWidth+"px, map width = "+ _w+"px (95% screen size)";
//func.logAlert(_vars["logMsg"],"info");
			_vars["htmlObj"]["map"].style.width = _w+"px";
//----------------------------
			_vars["htmlObj"]["modalTitle"].innerHTML = "yandexMaps API version: " + ymaps.meta.version;
			
			var lat = _vars["position"]["coords"].latitude.toFixed(5);// 55.03146
			var lng = _vars["position"]["coords"].longitude.toFixed(5);// 82.92317
//console.log( lat, lng );
		
			_vars.mapObj = new ymaps.Map( _vars["htmlObj"]["map"], {
				//center: [55.76, 37.64],
				center: [ lat, lng],
				zoom: 15
			}, {
					searchControlProvider: 'yandex#search'
			}),
			
			myGeoObject = new ymaps.GeoObject({
				geometry: {
					type: "Point",
					coordinates: [ lat, lng ]
				},
				properties: {
					iconContent: "Your location...",
					hintContent: "hintContent..."
				}
			}, {
				preset: "islands#redCircleIcon", 
				draggable: false
			});
			
			_vars.mapObj.geoObjects.add( myGeoObject );
			
//console.log( "mapObj:", _vars.mapObj );
			_waitWindow( "close" );
			_vars["htmlObj"]["appModal"].classList.add("active");
		}//end initYandexMap()

			// ymaps.geolocation.get({
					// // Зададим способ определения геолокации    
					// // на основе ip пользователя.
					// provider: 'yandex',
					// // Включим автоматическое геокодирование результата.
					// autoReverseGeocode: true
				// })
				// .then(function (result) {
					// // Выведем результат геокодирования.
					// console.log(result.geoObjects.get(0)
						// .properties.get('metaDataProperty'));
				// });
	
			// var geolocation = ymaps.geolocation, mapObj = new ymaps.Map("map", {
					// center: [ lat, lng ],
					// zoom: 15
				// }, {
					// searchControlProvider: 'yandex#search'
				// });
			
			// // Сравним положение, вычисленное по ip пользователя и
			// // положение, вычисленное средствами браузера.
			// geolocation.get({
				// provider: 'yandex',
				// mapStateAutoApply: true
			// }).then(function (result) {
				// // Красным цветом пометим положение, вычисленное через ip.
				// result.geoObjects.options.set('preset', 'islands#redCircleIcon');
				// result.geoObjects.get(0).properties.set({
					// balloonContentBody: "you location by IP"
				// });
				// mapObj.geoObjects.add(result.geoObjects);
			// });

			// geolocation.get({
				// provider: 'browser',
				// mapStateAutoApply: true
			// }).then(function (result) {
				// // Синим цветом пометим положение, полученное через браузер.
				// // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
				// result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
				
				// result.geoObjects.get(0).properties.set({
					// balloonContentBody: "you location from browser data"
				// });

				// mapObj.geoObjects.add(result.geoObjects);
			// });
//--------------------------------------------------
		function _destroyMap( apiType){
			switch( apiType){
				case "yandexMaps":
					_vars.mapObj.destroy();
				break;
				
				case "googleMaps":
					_vars.mapObj = null;
					_vars["htmlObj"]["map"].innerHTML="";
				break;
				
				case "2GIS":
					_vars.mapObj.remove();
				break;
				
				case "OpenStreetMaps":
					_vars.mapObj.destroy();
				break;
				
				case "ArcGIS":
					_vars.mapObj = null;
					_vars["htmlObj"]["map"].innerHTML="";
				break;
				
				default:
		_vars["logMsg"] = "error, not defined or incorrect map API type" ;
		func.logAlert(_vars["logMsg"],"error");
				break;
				
			}//end switch
		}//end _destroyMap()


		function _waitWindow( state){
			
			switch (state){
				
				case "open":
					_vars["htmlObj"]["waitOverlay"].style.display="";
					_vars["htmlObj"]["waitOverlay"].classList.add("open");
				break;
				
				case "close":
				default:
					_vars["htmlObj"]["waitOverlay"].classList.remove("open");
					_vars["htmlObj"]["waitOverlay"].style.display="none";
				break;
				
			}//end switch
			
		}//end _waitWindow()
		
		// public interfaces
		return {
			vars:	_vars,
			init:	_init
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
		
	};//end App
	
//window.App = App;
//})();
