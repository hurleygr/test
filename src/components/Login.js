import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = { showLogin: false, showLogOut: false, showRegister: false, login: { username: null, password: null }, registration: { email: null, username: null, password: null } };
        this.isValidUser = this.isValidUser.bind(this);
    }

    username_change(e) {

        this.setState({ registration: { ...this.state.registration, username: e.target.value } })
    };

    password_change(e) {
        this.setState({ registration: { ...this.state.registration, password: e.target.value } })
    };

    loginusername_change(e) {

        this.setState({ login: { ...this.state.login, username: e.target.value } })
    };

    loginpassword_change(e) {
        this.setState({ login: { ...this.state.login, password: e.target.value } })
    };

    email_change(e) {
        this.setState({ registration: { ...this.state.registration, email: e.target.value } })
=======
        this.state = {showLogin: false, showLogOut: false, showRegister: false, login: {username: null, password: null}, registration: {email: null, username: null, password: null}};
	this.isValidUser = this.isValidUser.bind(this);
    }
   
    username_change (e) {
        
        this.setState({registration: {...this.state.registration, username: e.target.value}})
    };

    password_change (e) {
        this.setState({registration: {...this.state.registration, password: e.target.value}})
    };

    loginusername_change (e) {
        
        this.setState({login: {...this.state.login, username: e.target.value}})
    };

    loginpassword_change (e) {
        this.setState({login: {...this.state.login, password: e.target.value}})
    };
	
    email_change (e) {
        this.setState({registration: {...this.state.registration, email: e.target.value}})
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
    };

    show_register() {
<<<<<<< HEAD
        this.setState({ showRegister: !(this.state.showRegister) })
    };

    show_logIn() {
        this.setState({ showLogin: !(this.state.showLogin) })
    };

=======
        this.setState({showRegister: !(this.state.showRegister)})
    };
    
    show_logIn() {
	 this.setState({showLogin: !(this.state.showLogin)})
    };
	
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
    close_register() {
        this.setState({ showRegister: false })
    };
    log_out() {
<<<<<<< HEAD
        localStorage.clear()
        this.props.func("Anonymous");
        this.setState({ showLogOut: false })
        window.location.reload(false);
    };
    registerFunction() {
        const clear_registration = { email: null, username: null, password: null };
        fetch('http://flip3.engr.oregonstate.edu:7272/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.registration.username,
                password: this.state.registration.password,
                email: this.state.registration.email
            })
        })
            .then(response => console.log(response))

            .catch(err => console.log(err))
        //this.props.func(this.state.registration.username)

        this.setState({ registration: clear_registration })

        this.close_register();
    };
    isValidUser(username, password) {
        return fetch('http://flip3.engr.oregonstate.edu:7272/login?username=' + username + '&password=' + password)

            .then((response) => response.json())
            // .then((data) => console.log(data))
            .catch(err => console.log(err))

    };
    async logInFunction(e) {
        e.preventDefault();
        console.log(this.state.login.username, this.state.login.password, "username and password")
        var u = await this.isValidUser(this.state.login.username, this.state.login.password)
        console.log("u", u)
        if (u) {
            localStorage.setItem("user", this.state.login.username)
            this.props.func(this.state.login.username)
        } else {
            alert("Invalid username or password")
        }
        this.setState({ showLogin: !(this.state.showLogin) })
        //this.setState({showLogin: false})

        window.location.reload(false);
=======
	localStorage.clear()
        this.props.func("Anonymous");
	this.setState({showLogOut: false})
	};
    registerFunction () {
        const clear_registration = {email: null, username: null, password: null};
        fetch('http://flip2.engr.oregonstate.edu:1135/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials' : true,
	          'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: this.state.registration.username,
              password: this.state.registration.password,
              email: this.state.registration.email
            })
          })
          .then(response => console.log(response))
	      
          .catch(err => console.log(err))
        //this.props.func(this.state.registration.username)

	this.setState({registration: clear_registration})
       
        this.close_register();
    };
    isValidUser(username, password) {
	  return fetch('http://flip2.engr.oregonstate.edu:1135/login?username=' + username + '&password=' + password)
            
          .then((response) => response.json())
	 // .then((data) => console.log(data))
	  .catch(err => console.log(err))
	    
}; 
     async logInFunction (e) {
        e.preventDefault();
	console.log(this.state.login.username, this.state.login.password, "username and password")
	var u = await this.isValidUser(this.state.login.username, this.state.login.password)
	console.log("u", u)
	if (u) {
		localStorage.setItem("user", this.state.login.username)
        	this.props.func(this.state.login.username)
  	} else {
		  alert("Invalid username or password")}
	this.setState({showLogin: !(this.state.showLogin)})	
//this.setState({showLogin: false})
    
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69
    };
    
    
    

<<<<<<< HEAD
=======
render() {
    return (
        <div>
            
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69



    render() {
        return (
            <div>


                <button onClick={this.show_register.bind(this)}>
                    Register
            </button>
                <button onClick={this.show_logIn.bind(this)}>
                    Log In
            </button>
<<<<<<< HEAD
                <button onClick={this.log_out.bind(this)}>
                    Log Out
	    </button>
                {this.state.showRegister ?
                    <form onSubmit={this.registerFunction.bind(this)}>
                        <h2>Join:</h2>
                        <label style={{ marginRight: "20px" }}>
                            Email:
                <input type="text" name="email" onChange={this.email_change.bind(this)} />
                        </label>
                        <label>
                            Username:
                <input type="text" name="username" onChange={this.username_change.bind(this)} />
                        </label>
                        <label>
                            Password:
                <input type="text" name="password" onChange={this.password_change.bind(this)} />
                        </label>
                        <input type="button" onClick={this.registerFunction.bind(this)} value="Register" />
                    </form>
                    : null}

                {this.state.showLogin ?
                    <form onSubmit={this.logInFunction.bind(this)}>
                        <h2>Login:</h2>

                        <label>
                            Username:
                <input type="text" name="username" onChange={this.loginusername_change.bind(this)} />
                        </label>
                        <label>
                            Password:
                <input type="text" name="password" onChange={this.loginpassword_change.bind(this)} />
                        </label>
                        <input type="button" onClick={this.logInFunction.bind(this)} value="Login" />
                    </form>
                    : null}

            </div>
        )
    }
};
=======
	    <button onClick={this.show_logIn.bind(this)}>
                Log In
            </button>
	    <button onClick={this.log_out.bind(this)}>
		Log Out
	    </button>
        {this.state.showRegister ?
        <form onSubmit = {this.registerFunction.bind(this)}>
            <h2>Join:</h2>
            <label style = {{marginRight: "20px"}}>
                Email:
                <input type="text" name="email" onChange = {this.email_change.bind(this)} />
            </label>
            <label>
                Username:
                <input type="text" name="username" onChange = {this.username_change.bind(this)} />
            </label>
            <label>
                Password:
                <input type="text" name="password" onChange = {this.password_change.bind(this)} />
            </label>
            <input type="button" onClick={this.registerFunction.bind(this)} value="Submit"  />
        </form>
        : null}
	
	{this.state.showLogin ?
        <form onSubmit = {this.logInFunction.bind(this)}>
            <h2>Log In:</h2>
            
            <label>
                Username:
                <input type="text" name="username" onChange = {this.loginusername_change.bind(this)} />
            </label>
            <label>
                Password:
                <input type="text" name="password" onChange = {this.loginpassword_change.bind(this)} />
            </label>
            <input type="button" onClick={this.logInFunction.bind(this)} value="Submit"  />
        </form>
        : null}
        
        </div>
    )
}};
>>>>>>> 1d2d786608391f2097638fcf140c1acf024f1e69

export default Login;
