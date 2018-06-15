/*	
	var PHONES = [
		{
			id: "motorola-xoom-with-wi-fi",
			name: 'Motorola XOOM\u2122 with Wi-Fi',
			imageUrl: "../../images/phones/motorola-xoom-with-wi-fi.0.jpg",
			"snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
		}, {
			id: "motorola-xoom",
			name: "motorola-xoom",
			imageUrl: "../../images/phones/motorola-xoom.0.jpg",
			"snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
		}, {
			id: "motorola-atrix-4g",
			name: "MOTOROLA ATRIX\u2122 4G",
			imageUrl: "../../images/phones/motorola-atrix-4g.0.jpg",
			"snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
		}, {
			id: "dell-streak-7",
			name: "Dell Streak 7",
			imageUrl: "../../images/phones/dell-streak-7.0.jpg",
			"snippet": "Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around."
		}
	];
*/

	var Phone = React.createClass({
		render: function(){
			return(
					<div className="panel-body">
						<div className="col-sm-3 col-md-3 col-lg-3 thumb">
							<img className="contact-image" src={this.props.image}/>
						</div>
						<div className="col-sm-9 col-md-9 col-lg-9">
								<div className="contact-name">{this.props.name}</div>
								<div className="snippet">{this.props.snippet}</div>
						</div>
					</div>
			);
		}
	});//end class
	
	var PhoneList = React.createClass({
		getInitialState: function(){
			return{
				displayedPhones: PHONES
			};
		},
		
		handleSearch: function(event){
			var searchQuery = event.target.value.toLowerCase();
			var displayedPhones = PHONES.filter( function( el ){
//console.log(el);
				var searchValue = el.name.toLowerCase();
				return searchValue.indexOf(searchQuery) !== -1
			});
			
			this.setState({
				displayedPhones: displayedPhones
			});
		},

		render: function(){
			return(
				<div className="phone-list">
					<input type="text" placeholder="enter phone name" className="form-control" onChange={ this.handleSearch} />
					
					<div class="phone panel panel-default">
						{
							this.state.displayedPhones.map(function(el){
//console.log(el);
								return <Phone
									key={el.id}
									name={el.name}
									snippet={el.snippet}
									image={el.imageUrl}
								/>;
							})
						}
					</div>
					
				</div>
			);
		}
		
	});//end class


	// class Hello extends React.Component {
		// render() {
			// return <h3>use ES6 capability</h3>;
		// }
	// }//end class
	
	ReactDOM.render(
		<PhoneList />,
		//<Hello/>,
		document.getElementById("content"), function(){
console.log( arguments );			
		}
	);
	
//console.log( PHONES[0] );			
	
    // ReactDOM.render(
		// <h1>Hello React, once more...</h1>,
		// document.getElementById("content"), function(){
// console.log( arguments );			
		// }
    // );