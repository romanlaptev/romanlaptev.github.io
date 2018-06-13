	var CONTACTS = [
		{
			id: 1,
			name: 'Darth Vader',
			phoneNumber: '+250966666666',
			image: 'images/darth.gif'
		}, {
			id: 2,
			name: 'Princess Leia',
			phoneNumber: '+250966344466',
			image: 'images/leia.gif'
		}, {
			id: 3,
			name: 'Luke Skywalker',
			phoneNumber: '+250976654433',
			image: 'images/luke.gif'
		}, {
			id: 4,
			name: 'Chewbacca',
			phoneNumber: '+250456784935',
			image: 'images/chewbacca.gif'
		}
	];

	var Contact = React.createClass({
		render: function(){
			return(
				<li className="contact">
					<img className="contact-image" src={this.props.image} width="60px" height="60px" />
					<div className="contact-info">
							<div className="contact-name">{this.props.name}</div>
							<div className="contact-number">{this.props.phoneNumber}</div>
					</div>
				</li>
			);
		}
	});//end class
	
	var ContactsList = React.createClass({
	
		getInitialState: function(){
			return{
				displayedContacts: CONTACTS
			};
		},
		
		handleSearch: function(event){
			var searchQuery = event.target.value.toLowerCase();
			var displayedContacts = CONTACTS.filter( function( el ){
				var searchValue = el.name.toLowerCase();
				return searchValue.indexOf(searchQuery) !== -1
			});
			
			this.setState({
				displayedContacts: displayedContacts
			});
		},

		render: function(){
			return(
				<div className="contacts">
					<input type="text" placeholder="enter phone name" className="search-field" onChange={ this.handleSearch} />
					
					<ul className="contacts-list">
						{
							this.state.displayedContacts.map(function(el){
								return <Contact
									key={el.id}
									name={el.name}
									phoneNumber={el.phoneNumber}
									image={el.image}
								/>;
							})
						}
					</ul>
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
		<ContactsList />,
		//<Hello/>,
		document.getElementById("content"), function(){
console.log( arguments );			
		}
	);
	
    // ReactDOM.render(
		// <h1>Hello React, once more...</h1>,
		// document.getElementById("content"), function(){
// console.log( arguments );			
		// }
    // );
	