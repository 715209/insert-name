import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";

import Dashboard from "./Dashboard";
import Login from "./Login";

class App extends Component {
    state = {
        isAuthenticating: true,
        isAuthenticated: false,
        admin: false,
        obs: null,
        twitch: null,
        twitchChat: null
    };

    handleLogout = async () => {
        try {
            const url = `${process.env.REACT_APP_API}/v1/auth/logout`;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                console.log("User logged out");
            } else {
                throw new Error("Something went wrong with logging out");
            }
        } catch (e) {
            console.log(e);
        }

        this.setState({
            isAuthenticated: false,
            user: null
        });
    };

    async componentDidMount() {
        const url = `${process.env.REACT_APP_API}/v1/users/me`;
        const response = await fetch(url, {
            credentials: "include",
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const { admin, obs, twitch, twitchChat } = data.data;
            this.setState({
                isAuthenticating: false,
                isAuthenticated: true,
                admin,
                obs,
                twitch,
                twitchChat
            });
        } else {
            console.log("Not logged in");
            this.setState({
                isAuthenticating: false
            });
        }
    }

    render() {
        if (this.state.isAuthenticating) {
            return null;
        }
        return (
            <Router>
                <React.Fragment>
                    {/* <Navbar onLogout={this.handleLogout} {...this.state} /> */}

                    <Switch>
                        <Route exact path="/" render={props => (this.state.isAuthenticated ? <Redirect to="/dashboard" /> : <Login />)} />
                        <Route
                            exact
                            path="/dashboard"
                            render={props => (this.state.isAuthenticated ? <Dashboard {...this.state} {...props} /> : <Redirect to="/" />)}
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
