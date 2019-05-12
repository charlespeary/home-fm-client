/** @jsx jsx */

import React, { Component } from "react";
import { Song, Artist, SongReadiness } from "../../Actions/types";
import { List, Avatar, Icon, Switch, Button } from "antd";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { toggleSongNsfw } from "../../Functions/index";
import { deleteSongFromQueue } from "../../Actions/websocket";

interface SongProps {
  song: Song;
  setActiveSong: (song: Song) => void;
}

export function formatArtists(artists: Artist[]) {
  return artists
    .slice(0, 3)
    .map(artist => artist.name)
    .join(", ");
}

function formatText(description: string) {
  const maxNumberOfLetters = window.innerWidth / 25;
  if (description.length > maxNumberOfLetters) {
    return `${description.slice(0, maxNumberOfLetters)}...`;
  } else {
    return description;
  }
}

const NsfwSwitch = styled.div({
  marginRight: "1rem",
  ".ant-switch-checked": {
    background: "#e83752"
  }
});
export class SongItem extends Component<SongProps> {
  render() {
    const { artists, nsfw, id } = this.props.song;
    return (
      <List.Item className="list-item-song">
        <List.Item.Meta
          avatar={<Avatar src={this.props.song.thumbnail_url} />}
          title={
            <span className="song-name">
              {formatText(this.props.song.name)}
            </span>
          }
          description={formatText(artists)}
        />
        <Button
          onClick={() => {
            this.props.setActiveSong(this.props.song);
          }}
          css={ScheduleSongButton}
        >
          Schedule
        </Button>
        <NsfwSwitch title="is it safe for random play?">
          <Switch
            checked={nsfw}
            onChange={(isNsfw: boolean) => {
              toggleSongNsfw(parseInt(id), isNsfw);
            }}
          >
            NSFW
          </Switch>
        </NsfwSwitch>
      </List.Item>
    );
  }
}

const IconsContainer = styled.div({
  marginRight: "0.7rem"
});
export class SongQueueItem extends Component<SongProps> {
  state = {
    loading: false
  };
  render() {
    const { artists, uuid } = this.props.song;
    return (
      <List.Item className="list-item-song">
        <List.Item.Meta
          avatar={<Avatar src={this.props.song.thumbnail_url} />}
          title={
            <span className="song-name">
              {formatText(this.props.song.name)}
            </span>
          }
          description={formatText(artists)}
        />
        <IconsContainer>
          <Button
            // it is not a link, but link comes without borders and that is what I need
            loading={this.state.loading}
            type="link"
            css={{ fontSize: "24px", color: "#e83752" }}
            title="Delete from queue"
            icon={"delete"}
            onClick={() => {
              if (typeof uuid !== "undefined") {
                deleteSongFromQueue(uuid);
                this.setState({ loading: true });
              }
            }}
          />
          {formatProgress(this.props.song.isReady)}
        </IconsContainer>
      </List.Item>
    );
  }
}

const ScheduleSongButton = css({
  marginRight: "1rem"
});

type SpotifySongProps = {
  toggleSongReadiness: (
    songFormattedName: string,
    readiness: SongReadiness
  ) => void;
};
export class SpotifySongItem extends Component<SongProps & SpotifySongProps> {
  render() {
    const { artists, isReady, id } = this.props.song;
    const buttonMessage = (() => {
      switch (isReady) {
        case SongReadiness.READY:
          return "Schedule";
        case SongReadiness.DOWNLOADING:
          return "Downloading...";
        case SongReadiness.NOT_READY:
          return "Download and schedule";
      }
    })();

    return (
      <List.Item className="list-item-song">
        <List.Item.Meta
          avatar={<Avatar src={this.props.song.thumbnail_url} />}
          title={
            <span className="song-name">
              {formatText(this.props.song.name)}
            </span>
          }
          description={formatText(artists)}
        />
        <Button
          loading={isReady === SongReadiness.DOWNLOADING}
          onClick={() => {
            // if song isn't already downloaded, activate loading on it until server is done downloading it
            if (isReady !== SongReadiness.READY) {
              this.props.toggleSongReadiness(
                this.props.song.formatted_name,
                SongReadiness.DOWNLOADING
              );
            }
            this.props.setActiveSong(this.props.song);
          }}
          css={[
            ScheduleSongButton,
            // if song is available on the server already - paint this button green
            {
              background:
                isReady === SongReadiness.READY ? "#56e27a" : "initial"
            }
          ]}
        >
          {buttonMessage}
        </Button>
      </List.Item>
    );
  }
}

const failed = css({
  color: "#ba252f"
});

const success = css({
  color: "#15c455"
});

const progressBar = css({
  fontSize: 24
});

function formatProgress(readiness: SongReadiness) {
  switch (readiness) {
    case SongReadiness.CANT_DOWNLOAD:
      return (
        <Icon
          title="Song can't be downloaded"
          type="close-circle"
          css={[failed, progressBar]}
        />
      );
    case SongReadiness.NOT_READY:
      return (
        <Icon
          title="Downloading song"
          type="loading"
          css={[progressBar]}
          spin
        />
      );
    case SongReadiness.READY:
      return (
        <Icon
          type="check-circle"
          title="Song successfully downloaded"
          css={[success, progressBar]}
        />
      );
  }
}
