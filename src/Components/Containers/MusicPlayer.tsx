/** @jsx jsx */

import { jsx, css, keyframes } from "@emotion/core";
import React, { Component } from "react";
import { isObjectEmpty, skipSong } from "../../Actions/index";
import { Song } from "../../Actions/types";
import { Avatar, Button } from "antd";
import styled from "@emotion/styled";
import { ReduxState } from "../../Stores";
import { connect } from "react-redux";
import { Swipeable } from "react-swipeable";

const breakpoint = `@media (min-width: 1024px)`;

const ButtonContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

const MusicPlayerStyling = (isVisible: boolean) =>
  css({
    position: "fixed",
    bottom: isVisible ? "0rem" : "-5rem",
    transition: "bottom 0.3s linear",
    left: 0,
    right: 0,
    height: "5rem",
    padding: "1.25rem",
    background: "#282828",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [breakpoint]: {
      paddingLeft: "1.5rem",
      paddingRight: "4rem"
    }
  });

const ShowButton = css({
  position: "absolute",
  top: "-3rem",
  marginLeft: "auto",
  marginRight: "auto",
  left: "5%",
  transform: "translate(-50 %, -50 %)",
  [breakpoint]: {
    display: "none"
  }
});

const SwipeableArea = css({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "10rem"
});

type MusicPlayerProps = {
  activeSong: Song;
};

class MusicPlayer extends Component<MusicPlayerProps> {
  state = {
    progress: 0,
    playerVisible: true
  };

  render() {
    // const { duration_ms } = this.props.activeSong;
    const isSongSet = !isObjectEmpty(this.props.activeSong);

    return (
      <div css={MusicPlayerStyling(this.state.playerVisible)}>
        <Swipeable
          css={SwipeableArea}
          onSwipedUp={() => this.setState({ playerVisible: true })}
          onSwipedDown={() => this.setState({ playerVisible: false })}
        />
        <Button
          css={ShowButton}
          type="primary"
          icon={this.state.playerVisible ? "down-square" : "up-square"}
          onClick={() =>
            this.setState({ playerVisible: !this.state.playerVisible })
          }
        />
        {isSongSet && <ActiveSong activeSong={this.props.activeSong} />}
        <SkipSongButton />
      </div>
    );
  }
}

const SkipSongButton = () => (
  <ButtonContainer>
    <Button
      onClick={() => {
        skipSong();
      }}
    >
      SKIP SONG
    </Button>
  </ButtonContainer>
);

type ActiveSongProps = {
  activeSong: Song;
};

const activeSong = css({
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

class ActiveSong extends Component<ActiveSongProps> {
  render() {
    return (
      <div css={activeSong}>
        <Avatar
          size={50}
          shape={"square"}
          src={this.props.activeSong.thumbnail_url}
        />
        <div style={{ display: "inline-block", paddingLeft: "0.5rem" }}>
          <div style={{ fontSize: "0.9rem", width: "100%" }}>
            {this.props.activeSong.name}
          </div>
          <div style={{ fontSize: "0.7rem", width: "100%", color: "#b3b3b3" }}>
            {this.props.activeSong.artists}
          </div>
        </div>
      </div>
    );
  }
}

// Music player's dispatch to props and state to props
const mapStateToProps = (state: ReduxState) => {
  return {
    spotifySongs: state.spotifySongs,
    activeSong: state.activeSong
  };
};

export const MusicPlayerContainer = connect(mapStateToProps)(MusicPlayer);
