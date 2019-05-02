import React, { FunctionComponent } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { MainMenu } from "../Presentational/Menu";
import { Route, Switch } from "react-router-dom";
import { YoutubeSearch, SongList } from "./index";

const Player = styled.div({
  width: "100 %",
  height: "87vh",
  background: "#fff"
});

export const PlayerContainer: FunctionComponent = () => {
  return (
    <Player>
      <MainMenu />
      <Switch>
        <Route exact path="/songs/youtube_search" compononent={YoutubeSearch} />
        <Route exact path="/songs" component={SongList} />
      </Switch>
    </Player>
  );
};
