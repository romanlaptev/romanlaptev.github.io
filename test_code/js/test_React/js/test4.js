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
		this.remove = this.remove.bind(this);		
	};
	
	//edit(e){
	edit = () =>{
console.log(arguments);		
//console.log(e.target);		
		this.setState({ edit: true });
console.log(this.props);		
	};

	remove(e){
//console.log(arguments);		
console.log(e.target);		
//console.log(this);		

		this.props.updateData({
			index: this.props.numTask,
			value: false
		});

	};

	save = () =>{
//console.log(this.refs);		
//console.log(this.refs.editTask.value);		
//console.log(arguments);		
//console.log( App );
		this.props.updateData({
			index: this.props.numTask,
			value: this.refs.editTask.value//,
			//editState: false
		});

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
					<textarea ref="editTask" className="form-control" defaultValue={this.props.children}></textarea>
				</div>
				<div className="panel-footer">
					<button onClick={this.save} className="btn btn-warning">Save</button>
				</div>
			</div>
		);
	};
	
	render(){
//console.log(this);		

		if( this.state.edit ){
			return this.rendEdit();
		} else {
			return this.rendNorm();
		}
		
	}
	
};//end class

//START App
class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			//edit: false,
			tasks: [ "task1", "task2", "task3"]
		};
	};
	
	updateData = (opt) => {
//console.log("updateData(), ", opt);

		var _tasks = this.state.tasks;
		var index = opt["index"];
		_tasks[ index ] = opt["value"];
//console.log( _tasks );		
	
		//to filter removed tasks
		var arr = _tasks.filter( function(n){ 
			return n
		}); 
//console.log( arr );
		
		this.setState({ 
			//edit: opt["editState"],
			tasks : arr
		});
		
//console.log( this );		
	};
	
	render(){
//console.log( this );		
//console.log(this.state.tasks.length);		
// for( var n = 0; n < this.state.tasks.length; n++){
// console.log( this.state.tasks[n] );
// }
		var _updateFunc = this.updateData;
		return(
			this.state.tasks.map(function( value, index){
//console.log(arguments);				
				return <Task key={index} numTask={index} updateData={_updateFunc}>{value}</Task>
			})
			
		);
	}
}//end class

ReactDOM.render(<App />, document.querySelector("#root") );