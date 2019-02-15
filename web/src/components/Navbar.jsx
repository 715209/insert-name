import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Navbar extends PureComponent {
    render() {
        return (
            <div>
                {!this.props.isAuthenticating && (
                    <React.Fragment>
                        {this.props.isAuthenticated ? (
                            <React.Fragment>
                                <img src={this.props.twitch.profile_image_url} alt="User Avatar" />
                                <p>{this.props.twitch.login}</p>
                                <Link to="#" onClick={this.props.onLogout}>
                                    Log out
                                </Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link to="/login">Login</Link>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Navbar;
