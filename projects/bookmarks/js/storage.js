var indexedDatabase = null;
var webSqlDb = null;

//================================ STORAGE methods
var storage = {
	
	"init": function(){
//console.log("init storage");

		// var test = window.openDatabase  ? true : false;
		// var status = window.openDatabase  ? "success" : "error";
		// webApp.logMsg = "webSQL support: " + test;
	// func.logAlert( webApp.logMsg, status );
		
		// test = window["localStorage"]  ? true : false;
		// status = window["localStorage"]  ? "success" : "error";
		// webApp.logMsg = "localStorage support: " + test;
	// func.logAlert( webApp.logMsg, status );

		// test = window.indexedDB ? true : false;
		// status = window.indexedDB  ? "success" : "error";
		// webApp.logMsg = "indexedDB support: " + test;
	// func.logAlert( webApp.logMsg, status );

		if( webApp.vars["support"]["indexedDBsupport"]){
			indexedDatabase = iDBmodule();
//console.log("indexedDatabase module:", indexedDatabase);
		}
		if( webApp.vars["support"]["webSQLsupport"]){
			webSqlDb = webSQLmodule();
//console.log("webSQLmodule:", webSqlDb);
		}
	},
	
	//"checkAppData": function(opt){
		//return _checkAppData( opt );
	//},
	"saveAppData": function(opt){
		return _saveAppData( opt );
	},
	"getAppData": function(opt){
		return _getAppData( opt );
	}
	
};//end storage
//console.log("storage object:", storage);

/*
function _checkAppData( opt ){
//console.log("function _checkAppData()", opt);
	var p = {
		//"dbName" : webApp.vars["cache"]["dbName"],
		//"dataStoreName" : webApp.vars["cache"]["dataStoreName"],
		"callback" : null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	var _lastModified = false;
	
	//check data store key  ( bookmarks.json )
	indexedDatabase.getListStores({
		"dbName" : webApp.vars["cache"]["dbName"],
		"callback": function( listStores ){
//console.log("listStores: ", listStores);

			if( typeof listStores !== "undefined" &&
					listStores.length > 0){

					for( var n = 0; n < listStores.length; n++){
						if( listStores[n] === webApp.vars["cache"]["dataStoreName"] ){
							
indexedDatabase.getRecord({
	"dbName" : webApp.vars["cache"]["dbName"],
	"storeName" : webApp.vars["cache"]["dataStoreName"],
	"recordKey" : "lastModified",
	"callback" : function( data, runtime ){
//console.log(data);

		if(!data){
			if(typeof p["callback"] === "function"){
				p["callback"]( _lastModified );
			}
		} else {
			_lastModified = data;//"00-00-0000"
			if(typeof p["callback"] === "function"){
				p["callback"]( _lastModified );
			}
		}
		
	}
});
							break;
						}
					}//next

			} else {
				
				if(typeof p["callback"] === "function"){
					p["callback"]( _lastModified );
				}
				
			}

		}
	});

}//end _checkAppData()
*/

function _saveAppData( opt ){
//console.log("function _saveAppData()", opt);
	var p = {
		"dataStoreType": null,
		"data": null,
		"callback" : null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

//for test
//p["dataStoreType"] = "localStorage";

	if( !p["data"] ){
console.log("warning!!!");
		return false;
	}

	if( p["dataStoreType"] && p["dataStoreType"].length > 0){
		switch ( p["dataStoreType"] ) {
		
			case "indexedDB":
indexedDatabase.clearStore({
	"dbName" : webApp.vars["cache"]["dbName"],
	"storeName" : webApp.vars["cache"]["dataStoreName"],
	"callback" : function( log, runtime ){
//console.log( arguments );
// webApp.vars.logMsg = "_clearStore(), "+ log + ", " +runtime + " sec";
		// if( indexedDatabase.dbInfo["iDBparams"]["runStatus"] === "error" ){
// webApp.vars.logMsg += "<br>"+ indexedDatabase.dbInfo["iDBparams"]["reason"];
// //webApp.vars.logMsg += "<br>"+ indexedDatabase.dbInfo["errorDescription"];
		// }
// func.logAlert( webApp.vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
//console.log( webApp.vars.logMsg );
//console.log( indexedDatabase.dbInfo );

		var storeData = [];
		//storeData.push( {"key": "lastModified", "value" : webApp.vars["cache"]["serverDate"]} );
		storeData.push( {"key": "jsonString", "value" : p["data"]} );

		indexedDatabase.addRecords({
				"dbName" : webApp.vars["cache"]["dbName"],
				"storeName" : webApp.vars["cache"]["dataStoreName"],
				"storeData" : storeData,
				"callback" : function( runtime ){
webApp.vars.logMsg = "Save data to cache, db: <b>"+ webApp.vars["cache"]["dbName"] + "</b>\
, store: <b>"+ webApp.vars["cache"]["dataStoreName"] +"</b>, runtime: " + runtime;
if( indexedDatabase.dbInfo["iDBparams"]["runStatus"] === "error" ){
webApp.vars.logMsg = indexedDatabase.dbInfo["errorDescription"];
}						
func.logAlert( webApp.vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
console.log( webApp.vars.logMsg );
			}
		});//end addRecords

	}
});//end clearStore
			break;
			
			case "webSQL":
try{
				//webSqlDb.dropTable( webApp.vars["cache"]["dataTableName"] );
				webSqlDb.clearTable({
					"tableName" : webApp.vars["cache"]["dataTableName"], 
					"callback": function( response ){
//console.log("Response: ", response);
						if( !response["executeSql"]){
webApp.logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
func.logAlert( webApp.logMsg, "error");
							__createAndSave( p["data"] );
						} else {
							__save( p["data"]);
						}
						
					}
				});

} catch(e){
console.log(e);
webApp.logMsg = "error, message: <b>" + e.message + "</b>";
func.logAlert( webApp.logMsg, "error");
}
			
			break;
			
			case "localStorage":
				var dataStoreName = webApp.vars["cache"]["dataStoreName"];
				window.localStorage.removeItem( dataStoreName );
				window.localStorage.setItem( dataStoreName, p["data"] );
webApp.vars.logMsg = "Save data to localStorage, data key: <b>"+ dataStoreName + "</b>";
runStatus = "success";
func.logAlert( webApp.vars.logMsg, runStatus );
				
			break;

			default:
			break;
		}//end switch
		
	}

			
	if(typeof p["callback"] === "function"){
		p["callback"]();
	}
	
	function __createAndSave( data){
		webSqlDb.createTable({
			"tableName" : webApp.vars["cache"]["dataTableName"], 
			"fieldsInfo" : webApp.vars["cache"]["dataTableFieldsInfo_webSQL"],
			"callback": function(  response  ){
		//console.log("Response: ", response);

				if( !response["executeSql"]){
		webApp.logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
		func.logAlert( webApp.logMsg, "error");
				} else {
					__save( data );
				}

			}
		});
	}//end _createAndSave()

	function __save( data ){
		var _record = {
			"jsonStr" : data
		};

		webSqlDb.insertRecord({
			"tableName" : webApp.vars["cache"]["dataTableName"], 
			"values" : _record,
			"callback": function( response ){
		//console.log("Response: ", response);
				if( !response["executeSql"]){
		webApp.logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
		func.logAlert( webApp.logMsg, "error");
				}
				
			}
		});
	}//end _save()
	
}//end _saveAppData()


function _getAppData( opt ){
//console.log("function _getAppData()", opt);
	var p = {
		"dataStoreType": null,
		"callback" : null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

//for test
//p["dataStoreType"] = "localStorage";

		switch ( p["dataStoreType"] ) {				
		
			case "indexedDB":
indexedDatabase.getRecord({
	"dbName" : webApp.vars["cache"]["dbName"],
	"storeName" : webApp.vars["cache"]["dataStoreName"],
	"recordKey" : "jsonString",
	"callback" : function( data, runtime ){
		
webApp.vars.logMsg = "Get data from indexedDB, db: <b>"+ webApp.vars["cache"]["dbName"] + "</b>\
, store: <b>"+ webApp.vars["cache"]["dataStoreName"] +"</b>, runtime: " + runtime;
			if( indexedDatabase.dbInfo["iDBparams"]["runStatus"] === "error" ){
webApp.vars.logMsg += "<br>"+ indexedDatabase.dbInfo["iDBparams"]["reason"];
webApp.vars.logMsg += "<br>"+ indexedDatabase.dbInfo["errorDescription"];
			}
func.logAlert( webApp.vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
//console.log( webApp.vars.logMsg );
//console.log( indexedDatabase.dbInfo );
//console.log( data );

		if(typeof p["callback"] === "function"){
			p["callback"]( data );
		}
		
	}
});
			break;
			
			case "webSQL":
				var data = false;
				try{
					
						webSqlDb.selectRecords({
							"tableName" : webApp.vars["cache"]["dataTableName"],
							"fields" : webApp.vars["cache"]["dataTableFieldsInfo_webSQL"],
							"callback": function( response ){
//console.log("Response: ", response);
								if( !response["executeSql"]){
webApp.logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
func.logAlert( webApp.logMsg, "error");
								} else {
//console.log("Response: ", response );
console.log("Response.rows.length: ", response["SQLResultSet"].rows.length );

									try{
											data = response["SQLResultSet"].rows.item(0)["jsonStr"];
webApp.vars.logMsg = "Get data from webSQL, db: <b>"+ webApp.vars["cache"]["dbName"] + "</b>\
, table: <b>"+ webApp.vars["cache"]["dataTableName"] +"</b>, runtime: " + response["runtime"];
func.logAlert( webApp.vars.logMsg, "success" );
									} catch(e){
console.log(e);

webApp.logMsg = "error, webSqlDb.selectRecords(), SELECT jsonStr FROM bookmarks_json, Response.rows.length:" + response["SQLResultSet"].rows.length;
func.logAlert( webApp.logMsg, "error");

webApp.logMsg = "<ul>DOMException";
webApp.logMsg += "<li><b>code: </b>" + e.code +"</li>";
webApp.logMsg += "<li><b>line: </b>" + e.line +"</li>";
webApp.logMsg += "<li><b>message: </b>" + e.message +"</li>";
webApp.logMsg += "<li><b>name: </b>" + e.name +"</li>";
webApp.logMsg += "<li><b>sourceURL: </b>" + e.sourceURL +"</li>";
webApp.logMsg += "</ul>";
func.logAlert( webApp.logMsg, "error");

									}

								}
								
								if(typeof p["callback"] === "function"){
									p["callback"]( data );
								}
								
							}
						});

				} catch(e){
console.log(e);
webApp.logMsg = "error, message: <b>" + e.message + "</b>";
func.logAlert( webApp.logMsg, "error");
					if(typeof p["callback"] === "function"){
						p["callback"]( data );
					}
				}
			
				
			break;
			
			case "localStorage":
				var dataStoreName = webApp.vars["cache"]["dataStoreName"];
				var jsonStr = window.localStorage[ dataStoreName ];
//console.log( jsonStr );

webApp.vars.logMsg = "Get data from localStorage, data key: <b>"+ dataStoreName + "</b>";
var runStatus = "error";
if( jsonStr && jsonStr.length > 0){
	runStatus = "success";
}
func.logAlert( webApp.vars.logMsg, runStatus );

				if(typeof p["callback"] === "function"){
					p["callback"]( jsonStr );
				}
			break;

			default:
			break;
		}//end switch
	
}//end _getAppData()

