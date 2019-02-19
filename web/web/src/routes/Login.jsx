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
      margin: 0;
    }

    p { 
        margin: 0; 
    }
`;

class Login extends PureComponent {
    render() {
        return (
            <LoginStyle>
                <div>
                    <h1>NOALBS</h1>
                    <p>APLHA VERSION</p>
                </div>
                <div>
                    <h2>
                        <a href="http://localhost:3001/v1/auth/twitch">Login with Twitch</a>
                    </h2>
                </div>
            </LoginStyle>
        );
    }
}

export default Login;
