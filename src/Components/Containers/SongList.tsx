/** @jsx jsx */

import React, { Component } from "react";
import { Song, CurrentView, SongReadiness } from "../../Actions/types";
import { SongItem } from "../Presentational/index";
import { connect } from "react-redux";
import { ReduxState } from "../../Stores/index";
import { List, Menu, Input, notification } from "antd";
import { Dispatch } from "redux";
import { SongQueueItem, SpotifySongItem } from "../Presentational/index";
import { jsx, css } from "@emotion/core";
import {
  scheduleSong,
  toggleSpotifySongReadiness,
  addSongsToQueue
} from "../../Actions/index";
import { LoginToSpotify } from "./Login";

const Search = Input.Search;
type SongListProps = {
  spotifySongs: Song[];
  availableSongs: Song[];
  songsQueue: Song[];
  setActiveSong: (song: Song) => void;
  toggleSongReadiness: (songId: string, songReadiness: SongReadiness) => void;
  currentView: CurrentView;
};

type SongListState = {
  offset: number;
  currentPage: number;
  window_height: number;
  window_width: number;
  searchbarValue: string;
};

class SongList extends Component<SongListProps, SongListState> {
  state = {
    offset: 0,
    currentPage: 1,
    window_height: window.innerHeight,
    window_width: window.innerWidth,
    searchbarValue: ""
  };

  getData = (songs: Song[]) => {
    if (this.state.searchbarValue.length === 0) {
      return songs;
    }
    return songs.filter(song => {
      const songName = song.name.toLowerCase();
      const artists = song.artists.toLowerCase();
      return (
        songName.includes(this.state.searchbarValue) ||
        artists.includes(this.state.searchbarValue)
      );
    });
  };

  render() {
    const songs = (() => {
      switch (this.props.currentView) {
        case CurrentView.QueueSongs:
          return this.getData(this.props.songsQueue);
        case CurrentView.SpotifySongs:
          return this.getData(this.props.spotifySongs);
        case CurrentView.AvailableSongs:
          return this.getData(this.props.availableSongs);
        default:
          return this.getData(this.props.availableSongs);
      }
    })();

    return (
      <div>
        <Search
          css={{
            ".ant-input-suffix": {
              marginRight: "1rem"
            }
          }}
          placeholder="filter songs..."
          size="default"
          name="domains"
          value={this.state.searchbarValue}
          onChange={(e: any) => {
            const { value } = e.target;
            this.setState({ searchbarValue: value });
          }}
          onSearch={(name: string) => {
            if (name.length == 0) {
              return;
            }
          }}
        />
        <span>
          <List
            locale={{
              emptyText:
                this.props.currentView === CurrentView.SpotifySongs ? (
                  <LoginToSpotify />
                ) : (
                  "There are no songs available"
                )
            }}
            bordered={false}
            size={"large"}
            itemLayout="horizontal"
            dataSource={songs}
            renderItem={(song: Song) => {
              switch (this.props.currentView) {
                case CurrentView.QueueSongs:
                  return (
                    <SongQueueItem
                      setActiveSong={this.props.setActiveSong}
                      song={song}
                    />
                  );
                case CurrentView.AvailableSongs:
                  return (
                    <SongItem
                      setActiveSong={this.props.setActiveSong}
                      song={song}
                    />
                  );
                case CurrentView.SpotifySongs:
                  return (
                    <SpotifySongItem
                      toggleSongReadiness={this.props.toggleSongReadiness}
                      setActiveSong={this.props.setActiveSong}
                      song={song}
                    />
                  );
                default:
                  return (
                    <SongItem
                      setActiveSong={this.props.setActiveSong}
                      song={song}
                    />
                  );
              }
            }}
            pagination={{
              total: songs.length,
              pageSize: window.innerHeight / 115,
              simple: true,
              showQuickJumper: true
            }}
          />
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    spotifySongs: state.spotifySongs,
    songsQueue: state.songsQueue,
    currentView: state.currentView,
    availableSongs: state.availableSongs
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    setActiveSong: (song: Song) => {
      // set song to be active, true indicates that we want to download it
      notification.success({
        description: song.formatted_name,
        message: "Successfully scheduled",
        duration: window.innerWidth >= 576 ? 2 : 1
      });
      scheduleSong(song);
      dispatch(addSongsToQueue([song]));
    },
    toggleSongReadiness: (songId: string, readiness: SongReadiness) => {
      dispatch(toggleSpotifySongReadiness(songId, readiness));
    }
  };
};

const SongListComponent = connect(
  mapStateToProps,
  dispatchToProps
)(SongList);

export { SongListComponent as SongList };
