import React, { Component } from "react";
import { Song, Artist, SongReadiness } from "../../Actions/index";
import { List, Avatar, Icon } from "antd";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";

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

export class SongItem extends Component<SongProps> {
  render() {
    const { artists } = this.props.song;

    return (
      <List.Item
        className="list-item-song"
        onClick={() => {
          this.props.setActiveSong(this.props.song);
        }}
      >
        <List.Item.Meta
          avatar={<Avatar src={this.props.song.thumbnail_url} />}
          title={<span className="song-name">{this.props.song.name}</span>}
          description={artists}
        />
      </List.Item>
    );
  }
}

export class SongQueueItem extends Component<SongProps> {
  render() {
    const { artists } = this.props.song;
    return (
      <List.Item
        className="list-item-song"
        onClick={() => {
          this.props.setActiveSong(this.props.song);
        }}
      >
        {formatProgress(this.props.song.isReady)}
        <List.Item.Meta
          avatar={<Avatar src={this.props.song.thumbnail_url} />}
          title={<span className="song-name">{this.props.song.name}</span>}
          description={artists}
        />
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

function formatProgress(readiness: SongReadiness) {
  switch (readiness) {
    case SongReadiness.CANT_DOWNLOAD:
      return (
        <Icon
          title="Song can't be downloaded"
          type="close-circle"
          css={[progress, failed]}
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
