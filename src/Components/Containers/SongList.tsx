import React, { Component } from "react";
import { Song, setActiveSong } from "../../Actions/index";
import { SongItem, formatArtists } from "../Presentational/index";
import { connect } from "react-redux";
import { ReduxState } from "../../Stores/index";
import "antd/dist/antd.css";
import { List } from "antd";
import { Dispatch } from "redux";

type SongListProps = {
  songs: Song[];
  setActiveSong: (song: Song) => void;
};

type SongListState = {
  offset: number;
  currentPage: number;
  window_height: number;
  window_width: number;
};

class SongList extends Component<SongListProps, SongListState> {
  state = {
    offset: 0,
    currentPage: 1,
    window_height: window.innerHeight,
    window_width: window.innerWidth
  };

  render() {
    return (
      <div className="list-container">
        <List
          bordered={true}
          size={"large"}
          itemLayout="horizontal"
          dataSource={this.props.songs}
          renderItem={(song: Song) => (
            <SongItem setActiveSong={this.props.setActiveSong} song={song} />
          )}
          pagination={{
            total: this.props.songs.length,
            pageSize: 9,
            simple: true,
            showQuickJumper: true
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    songs: state.songs
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    setActiveSong: (song: Song) => {
      // set song to be active, true indicates that we want to push it onto previousSongs history
      // sendSong(song.name, formatArtists(song.artists));
      dispatch(setActiveSong(song, true));
    }
  };
};

const SongListComponent = connect(
  mapStateToProps,
  dispatchToProps
)(SongList);

export { SongListComponent as SongList };
