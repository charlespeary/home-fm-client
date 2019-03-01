import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, AuthRedirection as AuthRedirectionComponent, MusicPlayer } from "./Components/index";
import { Provider, connect } from 'react-redux';
import { Dispatch } from "redux";
import { store, ReduxState } from './Stores/index';
import { saveToken, getUserFavouriteSongs, Token, TokenStatus, Song } from './Actions/index';
import { getUserInformations } from './Actions/user';
import { RouteComponentProps } from "react-router-dom";
import { getUserAlbums } from './Actions/albums';
import { SongList } from './Components/Containers/index';
import { getTokenFromLocalStorage } from './Actions/auth';

interface AppProps extends RouteComponentProps {
  fetchUserInformations: () => void;
  fetchUserAlbums: () => void;
  fetchAlbumSongs: () => void;
  fetchFavouriteSongs: () => void;
  getTokenFromLocalStorage: () => void;
  token: Token;
  activeSong: Song;
}


class App extends Component<AppProps> {
  state = {
    didRouteChange: false
  }

  componentDidMount() {
    this.props.getTokenFromLocalStorage();
  }

  componentWillReceiveProps(props: AppProps) {
    // didRouteChange is used to prevent infinite loops of props updates caused due to changed props of react-router
    // if token got from local storage is expired redirect to login component
    if (props.token.status === TokenStatus.EXPIRED && !this.state.didRouteChange) {
      this.props.history.push("/login");
      this.setState({ didRouteChange: true });
    }
    // if token got from local storage is not expired fetch needed data and redirect to component that lists songs
    else if (props.token.value.length > 0 && !this.state.didRouteChange && props.token.status !== TokenStatus.EXPIRED) {
      this.props.fetchUserInformations();
      this.props.fetchUserAlbums();
      this.props.fetchFavouriteSongs();
      this.props.history.push("/songs");
      this.setState({ didRouteChange: true });
    } else {
      this.setState({ didRouteChange: false });

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
        <MusicPlayer activeSong={this.props.activeSong} />
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
    token: state.token,
    activeSong:state.activeSong
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
