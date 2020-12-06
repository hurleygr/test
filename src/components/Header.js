import React from 'react';
import Login from './Login';
import { Link } from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = { user: "Anonymous" }
    };
    componentDidMount() {
        const user = localStorage.getItem("user")
        if (user) {
            this.setState({ user: user });
        }
    };
    loginFunc(user) {
        this.setState({ user: user })
    };
    render() {
        return (
            <header style={{ position: 'fixed', width: "100%", top: "0px", marginBottom: "50px", backgroundColor: "black", color: "white" }}>
                <h1 style={{ display: "inline-block", marginLeft: "10px" }}> Not A Reddit Clone </h1>
                <h4 style={{ float: 'right', display: "inline-block", marginRight: "10px" }}> {"Logged in as: " + this.state.user} <Login func={this.loginFunc.bind(this)} /> </h4>
                <div>
                    <Link to="/home">
                        <button type="button">
                            Home
		</button>
                    </Link>
                    <Link to="/group">
                        <button type="button">
                            Groups
                </button>
                    </Link>
                    <Link to="/creategroup">
                        <button type="button">
                            Create Group
                </button>
                    </Link>
                </div>
            </header>

        );
    }
}
export default Header;
=======
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
          <div>
	   <Link to="/home">
		<button type="button">
		  Home
		</button>
	  </Link> 
	  <Link to="/group">
                <button type="button">
                  Groups
                </button>
          </Link>
	  <Link to="/creategroup">
                <button type="button">
                  Create Group
                </button>
          </Link>
	  </div>
            </header>
            
);
} }
export default Header;
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
