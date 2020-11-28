import React from 'react';
import Login from './Login';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: "Anonymous"}
    };
	componentDidMount() {
	  const user = localStorage.getItem("user")
	  if (user) {
	    this.setState({user:user});
	}};
	loginFunc(user) {
	  this.setState({user: user})
	};
render() {
    return (
            <header style = {{position: 'fixed', width: "100%", top: "0px", marginBottom: "50px", backgroundColor: "black", color:"white"}}>
            <h1 style = {{display: "inline-block", marginLeft: "10px"}}> Not A Reddit Clone </h1>
            <h4 style = {{float: 'right', display: "inline-block", marginRight: "10px"}}> {"Logged in as: " + this.state.user} <Login func={this.loginFunc.bind(this)}/> </h4>
            

            </header>
            
);
} }
export default Header;
