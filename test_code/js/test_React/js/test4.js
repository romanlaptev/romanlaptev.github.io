/*
// class TestComponent extends React.Component {
	// render() {
// console.log( "create TestComponent, args = ", arguments );			
		// return ( 
			// <div>
				// <h1>Name: {this.props.name}</h1>
				// <h2>Age: {this.props.age}</h2>
			// </div>
		// ); 
		
	// }
// }//end class


//define component, functional variant
var TestComponent = function( opt ){
console.log( "create TestComponent, args = ", arguments );			
	return (
        <div>
          <h1>name: { opt.name }, age: { opt.age }</h1>
        </div>
	);
}//end TestComponent()

// function TestComponent(){
// console.log( "create TestComponent, args = ", arguments );			
	// return <h1>TestComponent...</h1>
// };
console.log( TestComponent );	


ReactDOM.render(
	<div>
		<TestComponent name="first man" age="18"/>
		<TestComponent name="second man" age="43"/>
	</div>,
	document.querySelector("#root"), 
	function(){
console.log( "post render, ", arguments );			
	}
);
*/

class Task extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			edit: false
		};
	};
	
	//edit(e){
	edit = () =>{
console.log(arguments);		
//console.log(e.target);		
		this.setState({ edit: true });
	};
	
	remove(e){
//console.log(arguments);		
console.log(e.target);		
	};

	save = () =>{
//console.log(arguments);		
		this.setState({ edit: false });
	};
	
	rendNorm = () => {
		return(
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3>task</h3>
				</div>
				<div className="panel-body">
					<p>{this.props.children}</p>
				</div>
				<div className="panel-footer">
					<button onClick={this.edit} className="btn btn-warning">Edit</button>
					<button onClick={this.remove} className="btn btn-danger pull-right">Remove</button>
				</div>
			</div>
		);
	};
	
	rendEdit = () => {
		return(
			<div className="panel panel-primary">
				<div className="panel-body">
					<textarea className="form-control" defaultValue={this.props.children}></textarea>
				</div>
				<div className="panel-footer">
					<button onClick={this.remove} className="btn btn-default">Save</button>
				</div>
			</div>
		);
	};
	
	render(){
console.log(this);		

		if( this.state.edit ){
			return this.rendEdit();
		} else {
			return this.rendNorm();
		}
		
	}
	
};//end class

//START App
class App extends React.Component {
	render(){
		return(
			<Task>000000000000</Task>
		);
	}
}//end class

ReactDOM.render(<App />, document.querySelector("#root") );