import React, { Component } from "react";

class Home extends Component {
    state = {
        username: "715209",
        channel: {
            live: false,
            title: "Untitled stream"
        }
    };

    render() {
        return (
            <div>
                <h1>NOALBS login with twitch</h1>
            </div>
        );
    }
}

export default Home;
