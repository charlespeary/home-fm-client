import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";

interface AuthProps extends RouteComponentProps {
    saveToken: (token: string) => void;
}

export class Login extends Component<AuthProps>  {

    clientId = "d09edd82dac149a5b6f076515368e06d";
    responseType = "token";
    redirectURL = "http://localhost:3000/auth";
    linkToSpotifyAuth = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectURL}&response_type=${this.responseType}&scope=user-library-read`;

    render() {
        return (
            <div>
                <LoginToSpotify linkToSpotifyAuth={this.linkToSpotifyAuth} />
            </div>
        )
    }
}


export class AuthRedirection extends Component<AuthProps> {

    componentDidMount() {
        this.getToken(this.props);
    }
    getToken = (props: AuthProps) => {
        // get token from hash after redirection from spotify login page, after splitting it by = split it by & to remove next query parameter from it
        const queryParams = props.location.hash === undefined ? "" : props.location.hash;
        const rawToken = queryParams.split("=")[1] || "";
        // token to return
        const token = rawToken.split("&")[0] || "";
        // save token to global store
        this.props.saveToken(token);
    }

    render() {
        return (
            <div>
                Authenticated
            </div>
        )
    }
}

interface LTSProps {
    linkToSpotifyAuth: string,
}

const LoginToSpotify: React.SFC<LTSProps> = (props) => {
    return <a
        href={props.linkToSpotifyAuth}
        className="App-link">
        Login to spotify
    </a>
}


