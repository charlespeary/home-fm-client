import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";

interface AuthProps extends RouteComponentProps {
  saveToken: (token: string) => void;
}

const linkContainer = css({
  height: "87vh",
  background: "#282828",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%"
});

const link = css({
  fontSize: "2rem"
});

export class Login extends Component<AuthProps> {
  clientId = "d09edd82dac149a5b6f076515368e06d";
  responseType = "token";
  redirectURL = `${window.location.origin}/auth`;
  linkToSpotifyAuth = `https://accounts.spotify.com/authorize?client_id=${
    this.clientId
  }&redirect_uri=${this.redirectURL}&response_type=${
    this.responseType
  }&scope=user-library-read`;

  render() {
    console.log(window.location);
    return (
      <div css={linkContainer}>
        <a css={link} href={this.linkToSpotifyAuth} className="App-link">
          Login to spotify
        </a>
      </div>
    );
  }
}

export class AuthRedirection extends Component<AuthProps> {
  componentDidMount() {
    this.getToken(this.props);
  }
  getToken = (props: AuthProps) => {
    // get token from hash after redirection from spotify login page, after splitting it by = split it by & to remove next query parameter from it
    const queryParams =
      props.location.hash === undefined ? "" : props.location.hash;
    const rawToken = queryParams.split("=")[1] || "";
    // token to return
    const token = rawToken.split("&")[0] || "";
    // save token to global store
    this.props.saveToken(token);
  };

  render() {
    return <div>Authenticated</div>;
  }
}
