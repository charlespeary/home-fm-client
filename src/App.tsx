/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import React, { Component, FunctionComponent, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { Dispatch } from "redux";
import { store, ReduxState } from "./Stores/index";
import { saveToken, getTokenFromLocalStorage } from "./Actions/index";
import { Token } from "./Actions/types";
import { RouteComponentProps } from "react-router-dom";
import {
  MusicPlayer,
  AuthRedirection as AuthRedirectionComponent,
  YoutubeSearch,
  SongList,
  Config
} from "./Components/Containers/index";
import { fetchSpotifyData } from "./Functions";
import { MainMenu } from "./Components/Presentational/index";
import styled from "styled-components";
interface AppProps extends RouteComponentProps {
  getTokenFromLocalStorage: () => void;
  socketConnected: boolean;
  token: Token;
}

const Container = styled.div({
  width: "100 %",
  height: "80vh",
  background: "#fff"
});

export const App: FunctionComponent<AppProps> = props => {
  useEffect(() => {
    props.getTokenFromLocalStorage();
    fetchSpotifyData();
    props.history.push("/songs");
  }, [props.token.value]);
  return (
    <div className="App-header">
      <MainMenu />
      <Container>
        <Switch>
          <Route exact path="/auth" component={AuthRedirection} />
          <Route path="/songs" component={SongList} />
          <Route path="/youtube_search" component={YoutubeSearch} />
          <Route path="/config" component={Config} />
        </Switch>
      </Container>
      {props.socketConnected && <MusicPlayer />}
    </div>
  );
};

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={AppCore} />
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    token: state.token,
    socketConnected: state.websocketConnected
  };
};

// DTP - dispatch to props
const appDTP = (dispatch: Dispatch) => {
  return {
    getTokenFromLocalStorage: () => {
      dispatch(getTokenFromLocalStorage());
    }
  };
};

const AppCore = connect(
  mapStateToProps,
  appDTP
)(App);

// DTP - dispatch to props

const authRedirectionDTP = (dispatch: Dispatch) => {
  return {
    saveToken: (token: string) => {
      dispatch(saveToken(token));
    }
  };
};

const AuthRedirection = connect(
  mapStateToProps,
  authRedirectionDTP
)(AuthRedirectionComponent);

export default Root;
