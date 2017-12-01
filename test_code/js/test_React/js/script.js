var msg = "React version: " + React.version;
console.log( msg );	

window.onload = function(){
	var version = getById("version");
	version.innerHTML = React.version;
	
	ReactDOM.render(React.createElement(
	  'h1',
	  null,
	  'Hello, React!'
	), document.getElementById('root'));
	
	// ReactDOM.render(
	  // <h1>Hello, world!</h1>,
	  // document.getElementById('root')
	// );
	
//https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png	
	//React.render(<img src='http://.comlkevsb9' />, document.body);
	
}//end load


function getById(id){
	
	if( document.querySelector ){
		var obj = document.querySelector("#"+id);
		return obj;
	}
	
	if( document.getElementById ){
		var obj = document.getElementById(id);
		return obj;
	}
	
	if( document.all ){
		var obj = document.all[id];
		return obj;
	}
	
	//if( document.layers ){
		//var obj = document.layers[id];
		//return obj;
	//}
	
	return false;
}//end getById()
