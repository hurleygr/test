import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLogin: false, showRegister: false, login: { username: null, password: null }, registration: { email: null, username: null, password: null } };

    }

    username_change(e) {

        this.setState({ registration: { ...this.state.registration, username: e.target.value } })
    };

    password_change(e) {
        this.setState({ registration: { ...this.state.registration, password: e.target.value } })
    };

    email_change(e) {
        this.setState({ registration: { ...this.state.registration, email: e.target.value } })
    };

    show_register() {
        this.setState({ showRegister: !(this.state.showRegister) })
    };

    close_register() {
        this.setState({ showRegister: false })
    };
    log_out() {
        localStorage.clear()
        this.props.func("Anonymous");
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
        localStorage.setItem("user", this.state.registration.username)
        this.props.func(this.state.registration.username)

        this.setState({ registration: clear_registration })

        this.close_register();
    };

    logInFunction(e) {
        e.preventDefault();
        this.props.func(this.state.login.username);
        this.close_login();
    }





    render() {
        return (
            <div>


                <button onClick={this.show_register.bind(this)}>
                    Register/Log In
            </button>
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
                        <input type="button" onClick={this.registerFunction.bind(this)} value="Submit" />
                    </form>
                    : null}


            </div>
        )
    }
};

export default Login;