   // рендеринг элемента
    ReactDOM.render(
		<h1>Hello React, once more...</h1>,
		document.getElementById("root2"), function(){
console.log( arguments );			
		}
    );

    ReactDOM.render(
        <h2>2 + 2 = {2 + 2}</h2>,
        document.getElementById("ex2")
    );
	
    const user = {
        id : 5,
        age: 33,
        firstName: 'Tom',
        lastName: 'Smit',
        getFullName: function(){ 
            return `${this.firstName} ${this.lastName}`;
        }
    };
    const userClassName = "user-info";
    const styleObj = {
        color:'red', 
        fontFamily:'Verdana'
    };
    ReactDOM.render(
        <div className={userClassName}  style={styleObj}>
                <p>Full name: {user.getFullName()}</p>
                <p>Age: {user.age}</p>
        </div>,
        document.getElementById("ex3")
    )	
	
	//https://metanit.com/web/react/1.2.php
    class Hello extends React.Component {
        render() {
            return <h1>use ES6 capability</h1>;
        }
    }
    ReactDOM.render(
        <Hello></Hello>,
        document.getElementById("ex4")
    );
	
	//https://abraxabra.ru/react.js/bystryy-start/react-js-otrisovka-elementov/
	function tick() {
		const element = (<h2>{new Date().toLocaleTimeString()}</h2>);
		ReactDOM.render(
			element,
			document.getElementById("ex-timer")
		);
	};
	setInterval(tick, 1000);

	//https://abraxabra.ru/react.js/bystryy-start/react-js-komponenty-i-svoystva/
	function Component (props) {
		return <p>Component, {props.name}</p>;
	}
	const element = <Component name="component 1" />;
	ReactDOM.render(
		element,
		document.getElementById("ex-component")
	);

	class Component2 extends React.Component {
		render() {
			return <h1>Hello, {this.props.name}</h1>;
		}
	};
	const element2 = <Component2 name="all !!!" />;
	ReactDOM.render(
		element2,
		document.getElementById("ex-component2")
	);
	
	
/*
	//https://habrahabr.ru/post/229629/
	var MenuExample = React.createClass({

		getInitialState: function(){
			return { focused: 0 };
		},

		clicked: function(index){
			// Обработчик клика обновит состояние
			// изменив индекс на сфокусированный элемент меню
			this.setState({focused: index});
		},

		render: function() {
			// Здесь мы читаем свойство items, которое было передано
			// атрибутом, при создании компонента
			var self = this;
			// Метод map пройдется по массиву элементов меню,
			// и возвратит массив с <li> элементами.
			return (
				<div>
					<ul>{ this.props.items.map(function(m, index){
			
						var style = '';
			
						if(self.state.focused == index){
							style = 'focused';
						}
			
						// Обратите внимание на использование метода bind(). Он делает
						// index доступным в функции clicked:
						return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;
					}) }
							
					</ul>
					<p>Selected: {this.props.items[this.state.focused]}</p>
				</div>
			);
		}//end render()
	});
	
	React.renderComponent(
		<MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
		document.body
	);	
*/