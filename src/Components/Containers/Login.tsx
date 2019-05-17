/** @jsx jsx */

import React, { Component } from "react";
import { jsx, css } from "@emotion/core";
import { RouteComponentProps } from "react-router";

interface AuthProps extends RouteComponentProps {
  saveToken: (token: string) => void;
}

const link = css({
  fontSize: "1.3rem",
  fontWeight: "bold"
});

export const LoginToSpotify = () => {
  const clientId = "d09edd82dac149a5b6f076515368e06d";
  const responseType = "token";
  const redirectURL = `http://rusty-radio/auth`;
  const linkToSpotifyAuth = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=${responseType}&scope=user-library-read`;

  return (
    <a css={link} href={linkToSpotifyAuth}>
      Login to your spotify account
    </a>
  );
};

export class AuthRedirection extends Component<AuthProps> {
  componentDidMount() {
    this.getToken(this.props);
  }
  getToken = (props: AuthProps) => {
    //get token from hash after redirection from spotify login page, after splitting it by = split it by & to remove next query parameter from it
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
