import React, { PureComponent } from "react";
import styled from "styled-components";

const LoginStyle = styled.div`
    display: grid;
    height:100%
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;

    h1 {
      font-size: 7em;
    }
`;

class Login extends PureComponent {
    render() {
        return (
            <LoginStyle>
                <h1>NOALBS</h1>
                <h2>
                    <a href="http://localhost:3001/v1/auth/twitch">Login with Twitch</a>
                </h2>
            </LoginStyle>
        );
    }
}

export default Login;
