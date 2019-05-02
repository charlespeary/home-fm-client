import React, { FunctionComponent } from "react";
import { Menu } from "antd";
import { CurrentView } from "../../Actions";
import { ReduxState } from "../../Stores";
import { Dispatch } from "redux";
import { setView } from "../../Actions/currentView";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

type MenuProps = {
  setView: (view: CurrentView) => void;
  currentView: CurrentView;
};

function convertEnum(key: string): CurrentView {
  switch (key) {
    case "SongList":
      return CurrentView.SongList;
    case "SongQueue":
      return CurrentView.SongQueue;
    case "YoutubeSearch":
      return CurrentView.YoutubeSearch;
    default:
      return CurrentView.SongList;
  }
}

const MenuComponent: FunctionComponent<MenuProps> = props => {
  return (
    <Menu
      onSelect={e => {
        let view = convertEnum(e.key);
        props.setView(view);
      }}
      mode="horizontal"
    >
      <Menu.Item key={CurrentView.SongList}>
        <Link to="/songs">Your songs</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.SongQueue}>
        <Link to="/songs">Songs queue</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.YoutubeSearch}>
        <Link to="/songs/youtube_search">Search on youtube</Link>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = ({ currentView }: ReduxState) => {
  return {
    currentView
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setView: (view: CurrentView) => dispatch(setView(view))
  };
};

export const MainMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent);
