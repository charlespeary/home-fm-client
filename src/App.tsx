import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, AuthRedirection as AuthRedirectionComponent } from "./Components/index";
import { Provider, connect } from 'react-redux';
import { Dispatch } from "redux";
import { store, ReduxState } from './Stores/index';
import { saveToken, getUserFavouriteSongs, Token } from './Actions/index';
import { getUserInformations } from './Actions/user';
import { RouteComponentProps } from "react-router-dom";
import { getUserAlbums } from './Actions/albums';
import { SongList } from './Components/Containers/index';
import { getTokenFromLocalStorage } from './Actions/auth';
import { token } from './Reducers';

interface AppProps extends RouteComponentProps {
  fetchUserInformations: () => void;
  fetchUserAlbums: () => void;
  fetchAlbumSongs: () => void;
  fetchFavouriteSongs: () => void;
  getTokenFromLocalStorage: () => void;
  token: Token;
}


class App extends Component<AppProps> {
  componentDidMount() {
    this.props.getTokenFromLocalStorage();
  }

  componentWillReceiveProps(props: AppProps) {
    if (props.token.value.length > 0) {
      this.props.fetchUserInformations();
      this.props.fetchUserAlbums();
      this.props.fetchFavouriteSongs();
      // prevent props update loop and redirect to songs with component to render them

    }
  }

  render() {
    return (
      <div className="App-header">
        <Switch>
          <Route path="/auth" component={AuthRedirection} />
          <Route path="/songs" component={SongList} />
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
          <Route path="/" component={AppCore} />
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    token: state.token
  }
}

// DTP - dispatch to props
const appDTP = (dispatch: Dispatch) => {
  return {
    fetchUserInformations: async () => {
      dispatch(await getUserInformations())
    },
    fetchUserAlbums: async () => {
      dispatch(await getUserAlbums());
    },
    fetchFavouriteSongs: async () => {
      await getUserFavouriteSongs(dispatch);
    },
    getTokenFromLocalStorage: () => {
      dispatch(getTokenFromLocalStorage());
    }
  }
}

const AppCore = connect(
  mapStateToProps,
  appDTP
)(App);

// DTP - dispatch to props

const authRedirectionDTP = (dispatch: Dispatch) => {
  return {
    saveToken: (token: string) => {
      dispatch(saveToken(token))
    },
  }
}

const AuthRedirection = connect(
  mapStateToProps,
  authRedirectionDTP
)(AuthRedirectionComponent);

export default Root;
