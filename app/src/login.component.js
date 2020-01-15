import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email === "heysaladin@gmail.com" &&
            this.state.password === "123qwe"
        ) {
            const cookies = new Cookies();
            cookies.set('myCat', 'Pacman', { path: '/' });
            console.log(cookies.get('myCat')); // Pacman
            this.props.history.push("/dashboard");
        } else {
            alert('WRONG!!!!');
        }
    }

    render() {
        const cookies = new Cookies();
        if (cookies.get('myCat') !== undefined) {
            this.props.history.push("/dashboard");
        }
        return (
            <div className="auth-wrapper" style={{ height: '100vh' }}>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChangeEmail} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChangePassword} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
