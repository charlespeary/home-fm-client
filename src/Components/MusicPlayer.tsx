import React, { Component } from "react";
import { Song } from "../Actions/index";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoIosPlay,
  IoIosPause,
  IoIosRepeat,
  IoIosShuffle
} from "react-icons/io";
import { Button, Avatar, Slider } from "antd";
import { formatArtists } from "./Presentational";

type MusicPlayerProps = {
  activeSong: Song;
};

function isObjectEmpty(obj: any) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export class MusicPlayer extends Component<MusicPlayerProps> {
  state = {
    progress: 0
  };
  constructor(props: any) {
    super(props);
    setInterval(
      () => this.setState({ progress: this.state.progress + 0.2 }),
      1000
    );
  }
  render() {
    return (
      <div className="music-player-container">
        {!isObjectEmpty(this.props.activeSong) && (
          <ActiveSong activeSong={this.props.activeSong} />
        )}
        <div className="center-panel">
          <div className="functional-buttons">
            <Button ghost>
              <IoIosShuffle />
            </Button>
            <Button ghost>
              <IoIosSkipBackward />
            </Button>
            <Button ghost>
              <IoIosPlay />
            </Button>
            <Button ghost>
              <IoIosSkipForward />
            </Button>
            <Button ghost>
              <IoIosRepeat />
            </Button>
          </div>
          <div className="song-progress">
            {" "}
            <div style={{ width: "100%" }}>
              <Slider step={0.1} value={this.state.progress} min={0} max={100} />
            </div>
          </div>
        </div>
        <div className="song-volume">
          <VolumeSlider />
        </div>
      </div>
    );
  }
}

class VolumeSlider extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Slider defaultValue={100} />
      </div>
    );
  }
}

class ActiveSong extends Component<MusicPlayerProps> {
  render() {
    return (
      <div className="active-song">
        <Avatar
          size={50}
          shape={"square"}
          src={this.props.activeSong.album.images[0].url}
        />
        <div style={{ display: "inline-block", paddingLeft: "0.5rem" }}>
          <div style={{ fontSize: "0.9rem", width: "100%" }}>
            {this.props.activeSong.name}
          </div>
          <div style={{ fontSize: "0.7rem", width: "100%", color: "#b3b3b3" }}>
            {formatArtists(this.props.activeSong.artists)}
          </div>
        </div>
      </div>
    );
  }
}
