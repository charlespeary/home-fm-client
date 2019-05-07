import React, { Component } from "react";
import { Song, setActiveSong, CurrentView } from "../../Actions/index";
import { SongItem } from "../Presentational/index";
import { connect } from "react-redux";
import { ReduxState } from "../../Stores/index";
import { List, Menu, Input, notification } from "antd";
import { Dispatch } from "redux";
import { addSongsToQueue } from "../../Actions/songsQueue";
import { SongQueueItem } from "../Presentational/Song";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { scheduleSong } from "../../Actions/activeSong";
import styled from "@emotion/styled";

const Search = Input.Search;
type SongListProps = {
  spotifySongs: Song[];
  availableSongs: Song[];
  songsQueue: Song[];
  setActiveSong: (song: Song) => void;
  currentView: CurrentView;
};

enum SelectedList {
  YourSongs = "YourSongs",
  SongsQueue = "SongsQueue"
}

type SongListState = {
  offset: number;
  currentPage: number;
  window_height: number;
  window_width: number;
  searchbarValue: string;
};

const ListContainer = styled.div({
  marginTop: "0.7rem"
});

class SongList extends Component<SongListProps, SongListState> {
  state = {
    offset: 0,
    currentPage: 1,
    window_height: window.innerHeight,
    window_width: window.innerWidth,
    selectedList: SelectedList.YourSongs,
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
        case CurrentView.SongQueue:
          return this.getData(this.props.songsQueue);
        case CurrentView.SongList:
          return this.getData(this.props.spotifySongs);
        case CurrentView.AvailableSongs:
          return this.getData(this.props.availableSongs);
        default:
          return this.getData(this.props.availableSongs);
      }
    })();
    this.props.currentView === CurrentView.SongQueue
      ? this.getData(this.props.songsQueue)
      : this.getData(this.props.availableSongs);
    return (
      <ListContainer>
        <Search
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
                this.props.currentView === CurrentView.SongQueue
                  ? "There are no songs scheduled in the queue"
                  : "There are no favourite songs in your spotify account."
            }}
            bordered={false}
            size={"large"}
            itemLayout="horizontal"
            dataSource={songs}
            renderItem={(song: Song) => {
              if (this.props.currentView === CurrentView.SongQueue) {
                return (
                  <SongQueueItem
                    setActiveSong={this.props.setActiveSong}
                    song={song}
                  />
                );
              } else {
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
              pageSize: window.innerHeight / 110,
              simple: true,
              showQuickJumper: true
            }}
          />
        </span>
      </ListContainer>
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
    }
  };
};

const SongListComponent = connect(
  mapStateToProps,
  dispatchToProps
)(SongList);

export { SongListComponent as SongList };
