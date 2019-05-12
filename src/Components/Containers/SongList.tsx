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
import { useSwipeable, Swipeable } from "react-swipeable";

const Search = Input.Search;
type SongListProps = {
  spotifySongs: Song[];
  availableSongs: Song[];
  songsQueue: Song[];
  setActiveSong: (song: Song) => void;
  toggleSongReadiness: (
    songFormattedName: string,
    songReadiness: SongReadiness
  ) => void;
  currentView: CurrentView;
};

type SongListState = {
  currentPage: number;
  searchbarValue: string;
};

const ListStyling = css({
  ".ant-spin-nested-loading": {
    height: "80vh"
  }
});

class SongList extends Component<SongListProps, SongListState> {
  state = {
    currentPage: 1,
    searchbarValue: "",
    pageSize: window.innerHeight / 100
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
        <Swipeable
          onSwipedLeft={e => {
            if (
              Math.ceil(songs.length / this.state.pageSize) <
              this.state.currentPage + 1
            ) {
              return;
            } else {
              this.setState({ currentPage: this.state.currentPage + 1 });
            }
          }}
          onSwipedRight={e => {
            if (this.state.currentPage - 1 <= 0) {
              return;
            } else {
              this.setState({ currentPage: this.state.currentPage - 1 });
            }
          }}
        >
          <List
            locale={{
              emptyText:
                this.props.currentView === CurrentView.SpotifySongs ? (
                  <LoginToSpotify />
                ) : (
                  "There are no songs available"
                )
            }}
            css={ListStyling}
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
              current: this.state.currentPage,
              total: songs.length,
              pageSize: this.state.pageSize,
              simple: true,
              showQuickJumper: true,
              onChange: currentPage => this.setState({ currentPage })
            }}
          />
        </Swipeable>
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
