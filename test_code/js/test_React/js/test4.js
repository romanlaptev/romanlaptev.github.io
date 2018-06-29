// class Block extends React.Component {
    // render() {
        // return ( <h3>itProger</h3> ); 
    // }
// }

//define component, functional variant
var TestComponent = function(){
console.log( "create TestComponent, args = ", arguments );			
	return (
<h1>TestComponent...</h1>	
	);
}//end TestComponent()

// function TestComponent(){
// console.log( "create TestComponent, args = ", arguments );			
	// return <h1>TestComponent...</h1>
// };

console.log( TestComponent );	

ReactDOM.render( 
	<TestComponent />, 
	document.querySelector("#root"), 
	function(){
console.log( "post render, ", arguments );			
	}
);

