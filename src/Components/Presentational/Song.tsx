import React, { Component } from "react";
import { Song, Artist, SongReadiness } from "../../Actions/index";
import { List, Avatar, Icon, Switch, Button } from "antd";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { toggleSongNsfw } from "../../Functions/index";

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
  const maxNumberOfLetters = window.innerWidth / 10;
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

const ScheduleSongButton = css({
  marginRight: "1rem"
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
            defaultChecked={nsfw}
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

export class SongQueueItem extends Component<SongProps> {
  render() {
    const { artists } = this.props.song;
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
        {formatProgress(this.props.song.isReady)}
      </List.Item>
    );
  }
}

export class SpotifySongItem extends Component<SongProps> {
  render() {
    const { artists } = this.props.song;
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
          Download and schedule
        </Button>
      </List.Item>
    );
  }
}
const progress = css({
  fontSize: 24
});

const failed = css({
  color: "#ba252f"
});

const success = css({
  color: "#15c455"
});

const progressBar = css({
  marginRight: "1rem"
});

function formatProgress(readiness: SongReadiness) {
  switch (readiness) {
    case SongReadiness.CANT_DOWNLOAD:
      return (
        <Icon
          title="Song can't be downloaded"
          type="close-circle"
          css={[progress, failed, progressBar]}
        />
      );
    case SongReadiness.NOT_READY:
      return (
        <Icon title="Downloading song" type="loading" css={progress} spin />
      );
    case SongReadiness.READY:
      return (
        <Icon
          type="check-circle"
          title="Song successfully downloaded"
          css={[progress, success]}
        />
      );
  }
}
