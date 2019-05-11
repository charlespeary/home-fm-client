/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import React, { FunctionComponent } from "react";
import { Menu } from "antd";
import { CurrentView } from "../../Actions/types";
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
    case "SpotifySongs":
      return CurrentView.SpotifySongs;
    case "QueueSongs":
      return CurrentView.QueueSongs;
    case "YoutubeSearch":
      return CurrentView.YoutubeSearch;
    case "AvailableSongs":
      return CurrentView.AvailableSongs;
    case "Config":
      return CurrentView.Config;
    default:
      return CurrentView.AvailableSongs;
  }
}

const MenuComponent: FunctionComponent<MenuProps> = (props: MenuProps) => {
  return (
    <Menu
      onSelect={e => {
        let view = convertEnum(e.key);
        // if I remove this console.log "React is not defined" error occurs xD
        props.setView(view);
      }}
      mode="horizontal"
    >
      <Menu.Item key={CurrentView.SpotifySongs}>
        <Link to="/songs">Spotify songs</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.QueueSongs}>
        <Link to="/songs">Songs queue</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.AvailableSongs}>
        <Link to="/songs">Available songs</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.YoutubeSearch}>
        <Link to="/youtube_search">Search on youtube</Link>
      </Menu.Item>
      <Menu.Item key={CurrentView.Config}>
        <Link to="/config">Config</Link>
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
