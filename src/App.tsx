import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, AuthRedirection as AuthRedirectionComponent } from "./Components/index";
import { Provider, connect } from 'react-redux';
import { Dispatch } from "redux";
import { store, ReduxState } from './Stores/index';
import { saveToken } from './Actions/index';
import { fetchUserInformations } from './Actions/user';
import { RouteComponentProps } from "react-router-dom";

interface AppProps extends RouteComponentProps {
  fetchUserInformations: () => void;
}


class App extends Component<AppProps> {

  componentWillReceiveProps(props: any) {
    if (props.token.value.length > 0) {
      this.props.fetchUserInformations();
    }
  }

  render() {
    return (
      <div className="App-header">
        <Switch>
          <Route path="/auth" component={AuthRedirection} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    )
  }
}

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppCore />
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state: ReduxState, something: any) => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveToken: (token: string) => {
      dispatch(saveToken(token))
    },
    fetchUserInformations: async () => {
      dispatch(await fetchUserInformations())
    }
  }
}

const AppCore = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const AuthRedirection = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectionComponent);

export default Root;
