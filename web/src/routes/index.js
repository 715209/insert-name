import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import Navbar from "../components/Navbar";

import Home from "./Home";
class App extends Component {
    state = {
        isAuthenticating: true,
        isAuthenticated: false,
        user: null,
        username: "",
        password: "",
        email: ""
    };

    async componentDidMount() {
        // const url = `${process.env.REACT_APP_API}/v1/users/me`;
        // const response = await fetch(url, {
        //     credentials: "include",
        //     method: "GET"
        // });
        // const status = await response.status;
        // if (status === 200) {
        //     const data = await response.json();
        //     console.log(data);
        //     const { username, admin } = data.data;
        //     this.setState({
        //         isAuthenticating: false,
        //         isAuthenticated: true,
        //         user: {
        //             username,
        //             admin
        //         }
        //     });
        // } else {
        //     console.log("Not logged in");
        //     this.setState({
        //         isAuthenticating: false
        //     });
        // }
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    {/* <Navbar onLogout={this.handleLogout} {...this.state} /> */}

                    <Switch>
                        <Route path="/" exact component={Home} />
                        {/* <Route path="/browse" exact component={Browse} /> */}
                        {/* <Route
                            path="/login"
                            exact
                            render={props =>
                                this.state.isAuthenticated ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Login
                                        onLogin={this.handleLogin}
                                        onChange={this.handleFormChange}
                                        username={this.state.username}
                                        password={this.state.password}
                                        {...props}
                                    />
                                )
                            }
                        /> */}
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
