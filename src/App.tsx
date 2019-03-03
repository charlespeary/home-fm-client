import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Login,
  AuthRedirection as AuthRedirectionComponent
} from "./Components/index";
import { Provider, connect } from "react-redux";
import { Dispatch } from "redux";
import { store, ReduxState } from "./Stores/index";
import {
  saveToken,
  getUserFavouriteSongs,
  Token,
  TokenStatus,
  SongsState,
  getTokenFromLocalStorage,
  getUserAlbums,
  getUserInformations
} from "./Actions/index";
import { RouteComponentProps } from "react-router-dom";
import { SongList, MusicPlayer } from "./Components/Containers/index";

interface AppProps extends RouteComponentProps {
  fetchUserInformations: () => void;
  fetchUserAlbums: () => void;
  fetchAlbumSongs: () => void;
  fetchFavouriteSongs: () => void;
  getTokenFromLocalStorage: () => void;
  token: Token;
}

class App extends Component<AppProps> {
  state = {
    didRouteChange: false
  };

  componentDidMount() {
    this.props.getTokenFromLocalStorage();
  }

  componentWillReceiveProps(props: AppProps) {
    // didRouteChange is used to prevent infinite loops of props updates caused due to changed props of react-router
    // if token got from local storage is expired redirect to login component
    console.log(props.token);
    if (
      props.token.status === TokenStatus.EXPIRED &&
      !this.state.didRouteChange
    ) {
      this.props.history.push("/login");
      this.setState({ didRouteChange: true });
    }
    // if token got from local storage is not expired fetch needed data and redirect to component that lists songs
    else if (
      props.token.value.length > 0 &&
      !this.state.didRouteChange &&
      props.token.status !== TokenStatus.EXPIRED
    ) {
      this.props.fetchUserInformations();
      this.props.fetchUserAlbums();
      this.props.fetchFavouriteSongs();
      this.props.history.push("/songs");
      this.setState({ didRouteChange: true });
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
        <MusicPlayer />
      </div>
    );
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
  };
};

// DTP - dispatch to props
const appDTP = (dispatch: Dispatch) => {
  return {
    fetchUserInformations: async () => {
      dispatch(await getUserInformations());
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
