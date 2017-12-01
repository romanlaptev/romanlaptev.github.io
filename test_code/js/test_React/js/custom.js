   // рендеринг элемента
    ReactDOM.render(
        <h1>Hello React, once more</h1>,  // элемент, который мы хотим создать
        document.getElementById("root2")    // где мы этот элемент хотим создать
    )

    ReactDOM.render(
        <h2>2 + 2 = {2 + 2}</h2>,
        document.getElementById("ex2")
    )
	
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
    )