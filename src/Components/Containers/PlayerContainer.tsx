/** @jsx jsx */

import React, { FunctionComponent } from "react";
import { jsx, css } from "@emotion/core";
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
      <Route exact path="/songs" component={SongList} />
      <Route exact path="/songs/youtube_search" component={YoutubeSearch} />
    </Player>
  );
};
