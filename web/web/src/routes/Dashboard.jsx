import React, { Component } from "react";
import styled from "styled-components";

const DashboardStyle = styled.div`
    width: 1000px;
    margin: auto;
`;

const CardStyle = styled.div`
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

class Dashboard extends Component {
    render() {
        return (
            <DashboardStyle>
                <h1>Dashboard</h1>

                <CardStyle>
                    <p>Connection status here?</p>
                    <h3>OBS: Connected</h3>
                    <h3>NGINX: Can't connect?</h3>
                </CardStyle>

                <CardStyle>
                    <h3>Logs here?</h3>
                </CardStyle>
            </DashboardStyle>
        );
    }
}

export default Dashboard;
