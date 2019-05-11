/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import React, { Component, FunctionComponent, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { Dispatch } from "redux";
import { store, ReduxState } from "./Stores/index";
import {
  saveToken,
  getTokenFromLocalStorage,
  Token,
  TokenStatus
} from "./Actions/index";
import { RouteComponentProps } from "react-router-dom";
import {
  MusicPlayer,
  PlayerContainer,
  AuthRedirection as AuthRedirectionComponent
} from "./Components/Containers/index";
import { fetchSpotifyData } from "./Functions";
import { MainMenu } from "./Components/Presentational/index";
interface AppProps extends RouteComponentProps {
  getTokenFromLocalStorage: () => void;
  socketConnected: boolean;
  token: Token;
}

export const App: FunctionComponent<AppProps> = props => {
  useEffect(() => {
    console.log(props.token.value);
    props.getTokenFromLocalStorage();
    fetchSpotifyData();
    props.history.push("/songs");
  }, [props.token.value]);
  return (
    <div className="App-header">
      <MainMenu />
      <Switch>
        <Route exact path="/auth" component={AuthRedirection} />
        <Route path="/songs" component={PlayerContainer} />
      </Switch>
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
