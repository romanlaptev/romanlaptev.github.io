/*
//Module Wfm
(function(){
	var Wfm = Wfm || function(options){

		// private variables and functions
		var _init = function(){
console.log("init!!!");
		};
		
		var _build = function(target){
			var html = "Table " + target + " is building....";
			return html;
		};
		
		// public interfaces
		return{
			init:	function(){ 
				return _init(); 
			},
			build:	function(target){ 
				return _build(target); 
			}
		};
	};
	window.Wfm = Wfm;
	Wfm().init();
})();
*/


$(document).ready(function(){
	
	var wfm = Wfm();
console.log ("wfm = ", wfm);

	$(document).ajaxStart(
		function(){ 
		  $('#ajaxBusy').show(); 
		}
	).ajaxStop(
		function()
		{ 
		  $('#ajaxBusy').hide();
		}
	);
	
});//end teady
